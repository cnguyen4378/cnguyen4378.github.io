import { getPublishedContent } from "@/lib/cms/content";
import { isSupabaseConfigured } from "@/lib/cms/env";

export default async function AdminSettingsPage() {
  const { site, source } = await getPublishedContent();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-[-0.03em]">Site Settings</h1>
        <p className="mt-2 text-sm text-muted">SEO, identity, and integrations.</p>
      </div>
      <div className="rounded-2xl border border-border p-6 text-sm">
        <p>
          <span className="text-muted">Content source:</span>{" "}
          <span className="text-foreground">{source}</span>
        </p>
        <p className="mt-3">
          <span className="text-muted">Supabase:</span>{" "}
          <span className="text-foreground">
            {isSupabaseConfigured() ? "configured" : "not configured"}
          </span>
        </p>
        <p className="mt-3">
          <span className="text-muted">Site title:</span>{" "}
          <span className="text-foreground">{site.title}</span>
        </p>
        <p className="mt-3">
          <span className="text-muted">Description:</span>{" "}
          <span className="text-foreground">{site.description}</span>
        </p>
      </div>
    </div>
  );
}
