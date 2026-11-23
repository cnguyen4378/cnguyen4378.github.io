import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudy } from "@/components/projects/ProjectCaseStudy";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getProjectBySlug, getPublishedContent } from "@/lib/cms/content";
import { getProjectSlugs } from "@/data/projects";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const content = await getPublishedContent();
  const project = getProjectBySlug(content.projects, slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.shortDescription,
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const content = await getPublishedContent();
  const project = getProjectBySlug(content.projects, slug);
  if (!project) notFound();

  return (
    <>
      <Navbar site={content.site} />
      <main id="main" className="pt-[var(--nav-h)]">
        <ProjectCaseStudy project={project} email={content.site.email} />
      </main>
      <Footer site={content.site} />
    </>
  );
}
