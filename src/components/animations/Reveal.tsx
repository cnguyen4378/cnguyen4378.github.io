"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { fadeOnly, fadeUp, revealTransition, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "header" | "p" | "h2" | "h3";
  fadeOnly?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  fadeOnly: onlyFade = false,
}: RevealProps) {
  const reduce = useReducedMotion();
  const Component = motion.create(as);
  const variants = onlyFade || reduce ? fadeOnly : fadeUp;

  return (
    <Component
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants}
      transition={revealTransition(delay)}
    >
      {children}
    </Component>
  );
}
