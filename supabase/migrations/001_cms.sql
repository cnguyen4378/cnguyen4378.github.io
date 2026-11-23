-- Portfolio CMS schema
-- Run in Supabase SQL editor (or via supabase db push)

create extension if not exists "pgcrypto";

create type public.content_status as enum ('draft', 'published');
create type public.experience_status as enum ('upcoming', 'completed', 'ongoing');
create type public.project_visual as enum ('phone-chart', 'phone-map', 'phone-stories', 'terminal');

-- ---------------------------------------------------------------------------
-- Media library
-- ---------------------------------------------------------------------------
create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  path text not null unique,
  bucket text not null default 'media',
  filename text not null,
  alt text not null default '',
  category text not null default 'general',
  mime_type text,
  size_bytes integer,
  width integer,
  height integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Site settings (single row for published + draft copies via status)
-- ---------------------------------------------------------------------------
create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  status public.content_status not null,
  name text not null,
  short_name text not null,
  title text not null,
  description text not null,
  url text not null,
  email text not null,
  github text not null,
  linkedin text not null,
  headshot_path text,
  headline text not null,
  role_line text not null,
  about text not null,
  about_more text not null,
  contact_heading text not null,
  contact_note text not null,
  footer_note text not null,
  nav_links jsonb not null default '[]'::jsonb,
  life_photos jsonb not null default '[]'::jsonb,
  section_visibility jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  unique (status)
);

-- ---------------------------------------------------------------------------
-- Projects
-- ---------------------------------------------------------------------------
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  status public.content_status not null default 'draft',
  title text not null,
  category text not null,
  visual public.project_visual not null default 'phone-chart',
  short_description text not null,
  featured boolean not null default false,
  sort_order integer not null default 0,
  tech text[] not null default '{}',
  highlights text[] not null default '{}',
  case_study jsonb not null default '{}'::jsonb,
  cover_media_id uuid references public.media_assets (id) on delete set null,
  github_url text,
  demo_url text,
  external_url text,
  completed_on date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz,
  unique (slug, status)
);

create table public.project_media (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  media_id uuid not null references public.media_assets (id) on delete cascade,
  role text not null default 'gallery',
  sort_order integer not null default 0,
  unique (project_id, media_id, role)
);

-- ---------------------------------------------------------------------------
-- Experience
-- ---------------------------------------------------------------------------
create table public.experiences (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  status public.content_status not null default 'draft',
  org text not null,
  role text not null,
  period text not null,
  location text,
  experience_status public.experience_status not null default 'completed',
  summary text not null,
  responsibilities text[] not null default '{}',
  tools text[] not null default '{}',
  lessons text[] not null default '{}',
  logo_media_id uuid references public.media_assets (id) on delete set null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz,
  unique (slug, status)
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------
create index projects_status_featured_order_idx
  on public.projects (status, featured, sort_order);
create index experiences_status_order_idx
  on public.experiences (status, sort_order);
create index media_assets_category_idx
  on public.media_assets (category);

-- ---------------------------------------------------------------------------
-- Updated-at trigger
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger media_assets_updated_at
  before update on public.media_assets
  for each row execute function public.set_updated_at();

create trigger site_settings_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

create trigger projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

create trigger experiences_updated_at
  before update on public.experiences
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.media_assets enable row level security;
alter table public.site_settings enable row level security;
alter table public.projects enable row level security;
alter table public.project_media enable row level security;
alter table public.experiences enable row level security;

-- Public read: published content only
create policy "Public read published site_settings"
  on public.site_settings for select
  using (status = 'published');

create policy "Public read published projects"
  on public.projects for select
  using (status = 'published');

create policy "Public read published experiences"
  on public.experiences for select
  using (status = 'published');

create policy "Public read media"
  on public.media_assets for select
  using (true);

create policy "Public read project_media for published projects"
  on public.project_media for select
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_id and p.status = 'published'
    )
  );

-- Authenticated admin writes (tighten further with ADMIN_EMAIL check in server actions)
create policy "Admin all media"
  on public.media_assets for all
  to authenticated
  using (true)
  with check (true);

create policy "Admin all site_settings"
  on public.site_settings for all
  to authenticated
  using (true)
  with check (true);

create policy "Admin all projects"
  on public.projects for all
  to authenticated
  using (true)
  with check (true);

create policy "Admin all project_media"
  on public.project_media for all
  to authenticated
  using (true)
  with check (true);

create policy "Admin all experiences"
  on public.experiences for all
  to authenticated
  using (true)
  with check (true);

-- ---------------------------------------------------------------------------
-- Storage bucket (run after creating bucket `media` in dashboard, or:)
-- insert into storage.buckets (id, name, public) values ('media', 'media', true);
-- ---------------------------------------------------------------------------
