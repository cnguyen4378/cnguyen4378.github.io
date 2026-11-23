export const easeOut = [0.23, 1, 0.32, 1] as const;
export const easeInOut = [0.77, 0, 0.175, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const fadeOnly = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const revealTransition = (delay = 0) => ({
  duration: 0.7,
  ease: easeOut,
  delay,
});

export const viewportOnce = { once: true, margin: "-12% 0px" as const };
