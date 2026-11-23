export const easeOut = [0.16, 1, 0.3, 1] as const;

export const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
};

export const fadeUpTransition = (delay = 0) => ({
  duration: 0.7,
  ease: easeOut,
  delay,
});

export const viewportOnce = { once: true, margin: "-80px" as const };
