"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import type { Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimateInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  margin?: string;
};

export function AnimateIn({
  children,
  className,
  delay = 0,
  margin = "-60px",
}: AnimateInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: margin as any });

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delayChildren: delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type AnimateItemProps = {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
};

export function AnimateItem({ children, className, variants = fadeUp }: AnimateItemProps) {
  return (
    <motion.div variants={variants} className={cn(className)}>
      {children}
    </motion.div>
  );
}
