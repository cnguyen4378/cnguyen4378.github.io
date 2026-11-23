import Link from "next/link";
import { SeedButton } from "@/components/admin/SeedButton";
import { getPublishedContent } from "@/lib/cms/content";
import { isSupabaseConfigured } from "@/lib/cms/env";

export default async function AdminOverviewPage() {
  const content = await getPublishedContent();
  const featured = content.projects.filter((p) => p.featured).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-[-0.03em] text-foreground">
          Overview
        </h1>
        <p className="mt-2 text-sm text-muted">
          Manage portfolio content without touching source code.
        </p>
      </div>

      {!isSupabaseConfigured() ? (
        <div className="rounded-2xl border border-border bg-surface/40 p-6">
          <h2 className="text-lg font-medium text-foreground">Connect Supabase</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            The public site still reads from static data. To enable editing, uploads, drafts,
            and publishing, add your Supabase credentials to{" "}
            <code className="text-accent">.env.local</code> (see{" "}
            <code className="text-accent">.env.example</code>), run the SQL migration, then
            create your admin Auth user.
          </p>
          <p className="mt-4 text-sm text-muted">
            Content source right now:{" "}
            <span className="text-foreground">{content.source}</span>
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-surface/40 p-6">
          <h2 className="text-lg font-medium text-foreground">Seed database</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            Copy the current static portfolio into Supabase as published + draft rows. Safe to
            re-run; it upserts by slug/status.
          </p>
          <div className="mt-4">
            <SeedButton />
          </div>
          <p className="mt-4 text-sm text-muted">
            Content source right now:{" "}
            <span className="text-foreground">{content.source}</span>
          </p>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Projects", value: content.projects.length, href: "/admin/projects" },
          { label: "Featured", value: featured, href: "/admin/projects" },
          { label: "Experience", value: content.experience.length, href: "/admin/experience" },
        ].map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl border border-border bg-transparent p-5 transition-colors duration-150 hover:border-white/20 hover:bg-white/[0.03]"
          >
            <p className="text-sm text-muted">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-foreground">
              {card.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-border p-6">
        <h2 className="text-lg font-medium text-foreground">Next steps</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted">
          <li>1. Connect Supabase and run `supabase/migrations/001_cms.sql`</li>
          <li>2. Seed published content from the current portfolio data</li>
          <li>3. Edit projects, experience, and homepage copy in the sidebar</li>
          <li>4. Preview drafts, then publish</li>
        </ul>
      </div>
    </div>
  );
}
