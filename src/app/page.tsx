import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Experience } from "@/components/sections/Experience";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { getFeaturedProjects, getPublishedContent } from "@/lib/cms/content";

export default async function HomePage() {
  const content = await getPublishedContent();
  const featured = getFeaturedProjects(content.projects);

  return (
    <>
      <Navbar site={content.site} />
      <main id="main">
        <Hero site={content.site} />
        <SelectedWork projects={featured} />
        <Experience items={content.experience} />
        <About site={content.site} />
        <Contact site={content.site} />
      </main>
      <Footer site={content.site} />
    </>
  );
}
