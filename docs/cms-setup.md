# Portfolio CMS setup

## 1. Create Supabase project

1. Create a project at [supabase.com](https://supabase.com)
2. Copy project URL + anon key + service role key
3. Copy `.env.example` → `.env.local` and fill values
4. Set `ADMIN_EMAIL` to your login email

## 2. Database + storage

1. Open Supabase SQL editor
2. Run `supabase/migrations/001_cms.sql`
3. Create a **public** Storage bucket named exactly `media`
4. Run `supabase/migrations/002_storage_media_policies.sql` (public read + authenticated write)  
   Admin uploads also work via signed URLs when `SUPABASE_SERVICE_ROLE_KEY` is set
5. Authentication → Users → add your admin user (email/password)

## 3. Seed + verify

1. `pnpm next dev`
2. Open `/admin/login` and sign in
3. On Overview, click **Seed from current site data**
4. Confirm `/` still looks the same (source may switch to `database`)
5. Use `/preview` for draft preview (admin only)

## Security notes

- Never commit `.env.local`
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser
- Public queries only return `status = 'published'`
- Admin mutations check session email against `ADMIN_EMAIL`
