import { getStaticPortfolio } from "@/lib/cms/static-content";
import { createAdminClient } from "@/lib/supabase/admin";

/** Seeds published (+ matching draft) rows from static portfolio data. Idempotent upserts by unique status/slug. */
export async function seedCmsFromStatic() {
  const content = getStaticPortfolio();
  const supabase = createAdminClient();

  for (const status of ["published", "draft"] as const) {
    const { error: siteError } = await supabase.from("site_settings").upsert(
      {
        status,
        name: content.site.name,
        short_name: content.site.shortName,
        title: content.site.title,
        description: content.site.description,
        url: content.site.url,
        email: content.site.email,
        github: content.site.github,
        linkedin: content.site.linkedin,
        headshot_path: content.site.headshot,
        headline: content.site.headline,
        role_line: content.site.roleLine,
        about: content.site.about,
        about_more: content.site.aboutMore,
        contact_heading: content.site.contactHeading,
        contact_note: content.site.contactNote,
        footer_note: content.site.footerNote,
        nav_links: content.site.navLinks,
        life_photos: content.site.lifePhotos,
        section_visibility: {},
      },
      { onConflict: "status" },
    );
    if (siteError) throw siteError;

    for (const project of content.projects) {
      const { error } = await supabase.from("projects").upsert(
        {
          slug: project.slug,
          status,
          title: project.title,
          category: project.category,
          visual: project.visual,
          short_description: project.shortDescription,
          featured: project.featured,
          sort_order: project.sortOrder,
          tech: project.tech,
          highlights: project.highlights,
          case_study: project.caseStudy,
          published_at: status === "published" ? new Date().toISOString() : null,
        },
        { onConflict: "slug,status" },
      );
      if (error) throw error;
    }

    for (const item of content.experience) {
      const { error } = await supabase.from("experiences").upsert(
        {
          slug: item.slug,
          status,
          org: item.org,
          role: item.role,
          period: item.period,
          location: item.location ?? null,
          experience_status: item.status,
          summary: item.summary,
          responsibilities: item.responsibilities,
          tools: item.tools,
          lessons: item.lessons,
          sort_order: item.sortOrder,
          published_at: status === "published" ? new Date().toISOString() : null,
        },
        { onConflict: "slug,status" },
      );
      if (error) throw error;
    }
  }

  return { ok: true as const };
}
