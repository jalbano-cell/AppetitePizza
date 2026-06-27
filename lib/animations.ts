import type { Variants } from "framer-motion";

// Custom easing curves
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT_QUART = [0.22, 1, 0.36, 1] as const;

// ─── Framer Motion Variants ───────────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT_QUART },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: EASE_OUT_QUART },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045, delayChildren: 0 },
  },
};

// Shared spring config for overlays / drawers
export const SPRING_SNAPPY = { type: "spring", damping: 30, stiffness: 300 } as const;
export const SPRING_SOFT = { type: "spring", damping: 40, stiffness: 220 } as const;

// ─── GSAP Utilities ───────────────────────────────────────────────────────────

export async function registerGSAP() {
  if (typeof window === "undefined") return null;

  const { gsap } = await import("gsap");
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");

  gsap.registerPlugin(ScrollTrigger);

  return { gsap, ScrollTrigger };
}

export async function revealOnScroll(
  targets: string | Element | Element[],
  options?: {
    y?: number;
    duration?: number;
    stagger?: number;
    start?: string;
  }
) {
  const result = await registerGSAP();
  if (!result) return;

  const { gsap, ScrollTrigger } = result;
  const { y = 32, duration = 0.75, stagger = 0.1, start = "top 88%" } = options ?? {};

  gsap.fromTo(
    targets,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: "power3.out",
      scrollTrigger: { trigger: targets as Element, start },
    }
  );
}
