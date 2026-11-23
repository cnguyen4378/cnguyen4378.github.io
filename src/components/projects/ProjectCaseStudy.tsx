import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import type { ProjectCaseStudy as CaseStudy, ProjectContent } from "@/lib/cms/types";

const sections: Array<{
  key: keyof CaseStudy;
  title: string;
  list?: boolean;
}> = [
  { key: "problem", title: "Problem" },
  { key: "motivation", title: "Motivation" },
  { key: "solution", title: "Solution" },
  { key: "architecture", title: "Technical architecture", list: true },
  { key: "decisions", title: "Key decisions", list: true },
  { key: "challenges", title: "Challenges", list: true },
  { key: "outcomes", title: "Outcomes", list: true },
  { key: "lessons", title: "Lessons learned", list: true },
];

export function ProjectCaseStudy({
  project,
  email,
}: {
  project: ProjectContent;
  email: string;
}) {
  return (
    <article className="pb-24">
      <header className="border-b border-border bg-surface/40">
        <div className="container-page py-10 md:py-14">
          <Link href="/#work" className="link-quiet inline-flex items-center gap-2 text-sm">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to work
          </Link>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="text-sm text-muted">{project.category}</p>
              <h1 className="display display-lg mt-3 text-foreground">{project.title}</h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                {project.shortDescription}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-center py-4 lg:col-span-5 lg:col-start-8">
              <div className="w-full max-w-md rounded-[1.75rem] bg-background/60 px-6 py-12 ring-1 ring-border">
                <ProjectVisual kind={project.visual} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container-page mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <aside className="space-y-8 lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <div>
            <h2 className="text-sm font-medium text-foreground">Highlights</h2>
            <ul className="mt-3 space-y-2">
              {project.highlights.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <a
            href={`mailto:${email}?subject=${encodeURIComponent(`About ${project.title}`)}`}
            className="btn"
          >
            Ask about this project
            <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden />
          </a>
        </aside>

        <div className="space-y-12 lg:col-span-7 lg:col-start-6">
          {sections.map((section) => {
            const value = project.caseStudy[section.key];
            return (
              <section key={section.key} aria-labelledby={`${project.slug}-${section.key}`}>
                <h2
                  id={`${project.slug}-${section.key}`}
                  className="text-xl font-semibold tracking-[-0.02em] text-foreground"
                >
                  {section.title}
                </h2>
                {section.list && Array.isArray(value) ? (
                  <ul className="mt-4 space-y-3">
                    {value.map((item) => (
                      <li key={item} className="flex gap-3 text-[1rem] leading-relaxed text-muted">
                        <span className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted">
                    {value as string}
                  </p>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </article>
  );
}
