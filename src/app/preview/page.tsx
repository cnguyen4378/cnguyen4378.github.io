import { Suspense } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Experience } from "@/components/sections/Experience";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { requireAdmin } from "@/lib/cms/auth";
import { getFeaturedProjects, getPreviewContent } from "@/lib/cms/content";

export const metadata = {
  robots: { index: false, follow: false },
  title: "Preview",
};

async function PreviewContent() {
  await connection();

  const admin = await requireAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  const content = await getPreviewContent();
  const featured = getFeaturedProjects(content.projects);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] border-b border-accent/30 bg-background/90 px-4 py-2 text-center text-xs text-accent backdrop-blur">
        Draft preview — not public · source: {content.source}
      </div>
      <div className="pt-8">
        <Navbar site={content.site} />
        <main id="main">
          <Hero site={content.site} />
          <SelectedWork projects={featured} />
          <Experience items={content.experience} />
          <About site={content.site} />
          <Contact site={content.site} />
        </main>
        <Footer site={content.site} />
      </div>
    </>
  );
}

export default function PreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh items-center justify-center bg-background text-sm text-muted">
          Loading preview…
        </div>
      }
    >
      <PreviewContent />
    </Suspense>
  );
}
