"use client";

import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import type { SiteContent } from "@/lib/cms/types";
import { easeOut } from "@/lib/animations";

type HeroProps = {
  site: SiteContent;
};

export function Hero({ site }: HeroProps) {
  const reduce = useReducedMotion();

  const enter = (delay: number) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.35, delay } }
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, ease: easeOut, delay },
        };

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-[calc(var(--nav-h)+2rem)]"
      aria-label="Introduction"
    >
      <div className="atmosphere" aria-hidden="true" />

      <div className="container-page relative z-10">
        <motion.h1
          className="display text-[clamp(2.5rem,7.5vw,6rem)] text-foreground"
          {...enter(0.08)}
        >
          {site.name}
        </motion.h1>

        <motion.p
          className="mt-4 max-w-[20ch] text-[clamp(1.25rem,2.6vw,2.15rem)] font-semibold tracking-[-0.03em] leading-[1.15] text-foreground/90 md:mt-5"
          {...enter(0.22)}
        >
          {site.headline}
        </motion.p>

        <motion.p
          className="mt-5 max-w-xl text-[0.9375rem] text-muted md:mt-6 md:text-base"
          {...enter(0.36)}
        >
          {site.roleLine}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap items-center gap-5 md:mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0.25 : 0.6, delay: 0.45, ease: easeOut }}
        >
          <a href="#work" className="btn btn-accent">
            View work
          </a>
          <a
            href="#work"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-200 ease-[var(--ease-out)] hover:text-foreground"
          >
            Scroll
            <ChevronDown size={14} strokeWidth={1.75} className="hero-cue" aria-hidden />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
