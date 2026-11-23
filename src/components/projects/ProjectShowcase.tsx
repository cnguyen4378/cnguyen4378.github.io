"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { Reveal } from "@/components/animations/Reveal";
import type { ProjectContent } from "@/lib/cms/types";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

type ProjectShowcaseProps = {
  project: ProjectContent;
  index: number;
};

export function ProjectShowcase({ project, index }: ProjectShowcaseProps) {
  const rootRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const visual = visualRef.current;
      if (!root || !visual) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(visual, { scale: 1 });
        return;
      }

      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      gsap.fromTo(
        visual,
        { scale: isDesktop ? 0.78 : 0.9 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=90%",
            scrub: 0.6,
          },
        },
      );
    },
    { scope: rootRef, dependencies: [project.slug] },
  );

  const odd = index % 2 === 1;

  return (
    <article
      ref={rootRef}
      className="relative md:min-h-[125vh]"
      aria-labelledby={`project-${project.slug}`}
    >
      <div className="flex items-center overflow-hidden py-16 md:sticky md:top-0 md:min-h-[100svh] md:py-20">
        <div className="container-page grid w-full items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal
            className={cn(
              "lg:col-span-5",
              odd ? "lg:order-2 lg:col-start-8" : "lg:order-1 lg:col-start-1",
            )}
          >
            <p className="mb-3 text-sm text-muted">{project.category}</p>
            <h3
              id={`project-${project.slug}`}
              className="display display-md text-foreground"
            >
              {project.title}
            </h3>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted">
              {project.caseStudy.problem}
            </p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-foreground/85">
              {project.shortDescription}
            </p>

            {project.highlights.length > 0 ? (
              <ul className="mt-5 space-y-2 text-sm text-muted">
                {project.highlights.slice(0, 3).map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border px-3 py-1 text-[0.75rem] text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <Link href={`/projects/${project.slug}`} className="btn">
                View case study
                <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden />
              </Link>
            </div>
          </Reveal>

          <div
            className={cn(
              "lg:col-span-6",
              odd ? "lg:order-1 lg:col-start-1" : "lg:order-2 lg:col-start-7",
            )}
          >
            <div className="relative overflow-hidden rounded-[1.75rem] bg-surface ring-1 ring-border">
              <div
                className="pointer-events-none absolute inset-0 opacity-80"
                style={{
                  background:
                    "radial-gradient(60% 50% at 50% 30%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 70%)",
                }}
                aria-hidden
              />
              <div
                ref={visualRef}
                className="relative flex min-h-[min(52vh,480px)] origin-center items-center justify-center px-6 py-14 will-change-transform md:min-h-[560px] md:px-10"
              >
                <ProjectVisual kind={project.visual} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
