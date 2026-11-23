import { cacheLife, cacheTag } from "next/cache";
import { isSupabaseConfigured } from "@/lib/cms/env";
import { getStaticPortfolio } from "@/lib/cms/static-content";
import type {
  ContentStatus,
  ExperienceContent,
  PortfolioContent,
  ProjectCaseStudy,
  ProjectContent,
  ProjectVisual,
  SiteContent,
} from "@/lib/cms/types";
import { createPublicClient } from "@/lib/supabase/public";
import { createClient } from "@/lib/supabase/server";

type SiteRow = {
  name: string;
  short_name: string;
  title: string;
  description: string;
  url: string;
  email: string;
  github: string;
  linkedin: string;
  headshot_path: string | null;
  headline: string;
  role_line: string;
  about: string;
  about_more: string;
  contact_heading: string;
  contact_note: string;
  footer_note: string;
  nav_links: SiteContent["navLinks"];
  life_photos: SiteContent["lifePhotos"];
};

type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  category: string;
  visual: ProjectVisual;
  short_description: string;
  featured: boolean;
  sort_order: number;
  tech: string[];
  highlights: string[];
  case_study: ProjectCaseStudy;
  github_url: string | null;
  demo_url: string | null;
  external_url: string | null;
  status: ContentStatus;
};

type ExperienceRow = {
  id: string;
  slug: string;
  org: string;
  role: string;
  period: string;
  location: string | null;
  experience_status: ExperienceContent["status"];
  summary: string;
  responsibilities: string[];
  tools: string[];
  lessons: string[];
  sort_order: number;
  status: ContentStatus;
};

function mapSite(row: SiteRow): SiteContent {
  return {
    name: row.name,
    shortName: row.short_name,
    title: row.title,
    description: row.description,
    url: row.url,
    email: row.email,
    github: row.github,
    linkedin: row.linkedin,
    headshot: row.headshot_path || "/profile.jpg",
    headline: row.headline,
    roleLine: row.role_line,
    about: row.about,
    aboutMore: row.about_more,
    contactHeading: row.contact_heading,
    contactNote: row.contact_note,
    footerNote: row.footer_note,
    navLinks: row.nav_links ?? [],
    lifePhotos: row.life_photos ?? [],
  };
}

function mapProject(row: ProjectRow): ProjectContent {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    visual: row.visual,
    shortDescription: row.short_description,
    featured: row.featured,
    sortOrder: row.sort_order,
    tech: row.tech ?? [],
    highlights: row.highlights ?? [],
    caseStudy: row.case_study,
    githubUrl: row.github_url,
    demoUrl: row.demo_url,
    externalUrl: row.external_url,
    status: row.status,
  };
}

function mapExperience(row: ExperienceRow): ExperienceContent {
  return {
    id: row.id,
    slug: row.slug,
    org: row.org,
    role: row.role,
    period: row.period,
    location: row.location ?? undefined,
    status: row.experience_status,
    summary: row.summary,
    responsibilities: row.responsibilities ?? [],
    tools: row.tools ?? [],
    lessons: row.lessons ?? [],
    sortOrder: row.sort_order,
    publishStatus: row.status,
  };
}

async function loadFromDatabase(
  status: ContentStatus,
  options: { withSession?: boolean } = {},
): Promise<PortfolioContent | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    // Published public reads must not touch cookies(), or Cache Components blocks prerender.
    const supabase = options.withSession
      ? await createClient()
      : createPublicClient();

    const [siteResult, projectsResult, experienceResult] = await Promise.all([
      supabase.from("site_settings").select("*").eq("status", status).maybeSingle(),
      supabase
        .from("projects")
        .select("*")
        .eq("status", status)
        .order("sort_order", { ascending: true }),
      supabase
        .from("experiences")
        .select("*")
        .eq("status", status)
        .order("sort_order", { ascending: true }),
    ]);

    if (siteResult.error || !siteResult.data) return null;
    if (projectsResult.error || experienceResult.error) return null;

    return {
      site: mapSite(siteResult.data as SiteRow),
      projects: ((projectsResult.data ?? []) as ProjectRow[]).map(mapProject),
      experience: ((experienceResult.data ?? []) as ExperienceRow[]).map(mapExperience),
      source: "database",
    };
  } catch {
    return null;
  }
}

/** Public site: published content only. Falls back to static seed data. */
export async function getPublishedContent(): Promise<PortfolioContent> {
  "use cache";
  cacheLife("hours");
  cacheTag("portfolio-published");

  const fromDb = await loadFromDatabase("published");
  return fromDb ?? getStaticPortfolio();
}

/** Authenticated preview: draft if present, else published/static. */
export async function getPreviewContent(): Promise<PortfolioContent> {
  const draft = await loadFromDatabase("draft", { withSession: true });
  if (draft) return draft;
  return getPublishedContent();
}

export function getFeaturedProjects(projects: ProjectContent[]) {
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getProjectBySlug(projects: ProjectContent[], slug: string) {
  return projects.find((project) => project.slug === slug);
}
