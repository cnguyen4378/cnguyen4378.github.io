import Link from "next/link";
import { getPublishedContent } from "@/lib/cms/content";

export default async function AdminProjectsPage() {
  const { projects, source } = await getPublishedContent();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.03em]">Projects</h1>
          <p className="mt-2 text-sm text-muted">
            Source: {source}. Full CRUD unlocks after Supabase is connected and seeded.
          </p>
        </div>
        <button type="button" className="btn btn-accent" disabled title="Connect Supabase first">
          New project
        </button>
      </div>

      <ul className="divide-y divide-border border-y border-border">
        {projects.map((project) => (
          <li key={project.id} className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted">{project.category}</p>
              <h2 className="text-xl font-medium tracking-[-0.02em] text-foreground">
                {project.title}
              </h2>
              <p className="mt-1 max-w-xl text-sm text-muted">{project.shortDescription}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted">
                {project.featured ? (
                  <span className="rounded-full bg-accent/15 px-2 py-0.5 text-accent">Featured</span>
                ) : null}
                <span className="rounded-full border border-border px-2 py-0.5">
                  {project.status}
                </span>
              </div>
            </div>
            <Link
              href={`/projects/${project.slug}`}
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              View public
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
