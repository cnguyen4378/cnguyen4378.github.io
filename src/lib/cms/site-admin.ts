import { getStaticSite } from "@/lib/cms/static-content";
import type { LifePhoto, NavLink, SiteContent } from "@/lib/cms/types";
import { isSupabaseConfigured } from "@/lib/cms/env";
import { createAdminClient } from "@/lib/supabase/admin";
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
  nav_links: NavLink[];
  life_photos: LifePhoto[];
};

export function mapSiteRow(row: SiteRow): SiteContent {
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

export function siteToRow(site: SiteContent, status: "draft" | "published") {
  return {
    status,
    name: site.name,
    short_name: site.shortName,
    title: site.title,
    description: site.description,
    url: site.url,
    email: site.email,
    github: site.github,
    linkedin: site.linkedin,
    headshot_path: site.headshot,
    headline: site.headline,
    role_line: site.roleLine,
    about: site.about,
    about_more: site.aboutMore,
    contact_heading: site.contactHeading,
    contact_note: site.contactNote,
    footer_note: site.footerNote,
    nav_links: site.navLinks,
    life_photos: site.lifePhotos,
    section_visibility: {},
  };
}

async function db() {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return createAdminClient();
  }
  return createClient();
}

/** Prefer draft for editing; fall back to published, then static. */
export async function getEditableSite(): Promise<{
  site: SiteContent;
  source: "draft" | "published" | "static";
}> {
  if (!isSupabaseConfigured()) {
    return { site: getStaticSite(), source: "static" };
  }

  try {
    const supabase = await db();
    const draft = await supabase
      .from("site_settings")
      .select("*")
      .eq("status", "draft")
      .maybeSingle();

    if (!draft.error && draft.data) {
      return { site: mapSiteRow(draft.data as SiteRow), source: "draft" };
    }

    const published = await supabase
      .from("site_settings")
      .select("*")
      .eq("status", "published")
      .maybeSingle();

    if (!published.error && published.data) {
      return { site: mapSiteRow(published.data as SiteRow), source: "published" };
    }
  } catch {
    // fall through
  }

  return { site: getStaticSite(), source: "static" };
}
