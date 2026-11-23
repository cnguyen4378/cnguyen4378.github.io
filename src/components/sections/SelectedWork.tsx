import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { Reveal } from "@/components/animations/Reveal";
import type { ProjectContent } from "@/lib/cms/types";

export function SelectedWork({ projects }: { projects: ProjectContent[] }) {
  return (
    <section id="work" className="relative" aria-labelledby="work-heading">
      <div className="container-page section pb-8 md:pb-12">
        <Reveal>
          <h2 id="work-heading" className="display display-lg max-w-[12ch] text-foreground">
            Selected work
          </h2>
          <p className="lede mt-5">
            Campus products and AI systems — each one framed like a product story, not a card grid.
          </p>
        </Reveal>
      </div>

      <div className="space-y-0">
        {projects.map((project, index) => (
          <ProjectShowcase key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
