import { Reveal } from "@/components/animations/Reveal";
import type { ExperienceContent } from "@/lib/cms/types";
import { cn } from "@/lib/cn";

const statusLabel: Record<ExperienceContent["status"], string> = {
  upcoming: "Incoming",
  completed: "Completed",
  ongoing: "Ongoing",
};

const spotlightSlugs = ["deloitte", "dark-wolf", "jmu-research", "jmu"];

export function Experience({ items }: { items: ExperienceContent[] }) {
  const spotlight = items.filter((item) => spotlightSlugs.includes(item.slug));
  const list = spotlight.length > 0 ? spotlight : items;

  return (
    <section id="experience" className="section border-t border-border" aria-labelledby="experience-heading">
      <div className="container-page">
        <Reveal>
          <h2 id="experience-heading" className="display display-lg max-w-[14ch] text-foreground">
            Experience
          </h2>
          <p className="lede mt-5">Roles that shaped how I build — and what I’m headed toward next.</p>
        </Reveal>

        <ul className="mt-14 divide-y divide-border md:mt-20">
          {list.map((item, i) => (
            <li key={item.id} className="py-8 md:py-10">
              <Reveal delay={i * 0.06}>
                <div className="grid gap-4 md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-4">
                    <p className="text-[0.8125rem] text-muted">{item.period}</p>
                    <p
                      className={cn(
                        "mt-2 inline-flex rounded-full px-2.5 py-0.5 text-[0.6875rem] font-medium tracking-wide",
                        item.status === "upcoming"
                          ? "bg-accent/15 text-accent"
                          : "bg-white/[0.04] text-muted",
                      )}
                    >
                      {statusLabel[item.status]}
                    </p>
                  </div>

                  <div className="md:col-span-8">
                    <h3 className="text-xl font-semibold tracking-[-0.025em] text-foreground md:text-2xl">
                      {item.org}
                    </h3>
                    <p className="mt-1 text-[0.9375rem] text-muted">{item.role}</p>
                    <p className="mt-4 max-w-2xl text-[1rem] leading-relaxed text-foreground/85">
                      {item.summary}
                    </p>

                    {item.status !== "upcoming" && item.responsibilities.length > 0 ? (
                      <ul className="mt-5 max-w-2xl space-y-2.5">
                        {item.responsibilities.slice(0, 3).map((line) => (
                          <li key={line} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                            <span className="mt-2 size-1 shrink-0 rounded-full bg-border" aria-hidden />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {item.tools.length > 0 ? (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.tools.slice(0, 6).map((tool) => (
                          <span
                            key={tool}
                            className="rounded-full border border-border px-2.5 py-0.5 text-[0.6875rem] text-muted"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
