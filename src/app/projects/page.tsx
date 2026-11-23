import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getPublishedContent } from "@/lib/cms/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work from Carter Nguyen — AI tools, campus products, and intelligent infrastructure.",
};

export default async function ProjectsIndexPage() {
  const content = await getPublishedContent();

  return (
    <>
      <Navbar site={content.site} />
      <main id="main" className="pt-[var(--nav-h)]">
        <div className="container-page py-14 md:py-20">
          <h1 className="display display-lg max-w-[12ch] text-foreground">Projects</h1>
          <p className="lede mt-5">
            Case studies for shipped and in-progress work. Details live in structured data so
            updates stay honest and easy.
          </p>

          <ul className="mt-14 divide-y divide-border border-y border-border">
            {content.projects.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group flex flex-col justify-between gap-4 py-7 transition-colors duration-200 ease-[var(--ease-out)] sm:flex-row sm:items-center"
                >
                  <div>
                    <p className="text-sm text-muted">{project.category}</p>
                    <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-foreground transition-colors duration-200 group-hover:text-accent md:text-3xl">
                      {project.title}
                    </h2>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                      {project.shortDescription}
                    </p>
                  </div>
                  <span className="inline-flex size-11 items-center justify-center rounded-full border border-border text-muted transition-transform duration-200 ease-[var(--ease-out)] group-hover:border-accent/40 group-hover:text-foreground group-hover:rotate-45">
                    <ArrowUpRight className="h-5 w-5" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer site={content.site} />
    </>
  );
}
