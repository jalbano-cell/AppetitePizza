"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { staggerContainer, fadeUp } from "@/lib/animations";

const STATS = [
  { value: "3+", label: "Years Open", sub: "Est. 2021" },
  { value: "50k+", label: "Pizzas Served", sub: "And counting" },
  { value: "15", label: "Fresh Ingredients", sub: "On rotation" },
  { value: "100%", label: "Zero Compromises", sub: "On quality" },
];

export function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-20 bg-black" ref={ref}>
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/5 border border-white/5 rounded-2xl overflow-hidden"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="flex flex-col items-center justify-center text-center py-10 px-6 bg-charcoal/50 hover:bg-charcoal transition-colors"
            >
              <span className="font-display text-5xl lg:text-6xl font-bold text-cream leading-none mb-2">
                {stat.value}
              </span>
              <span className="text-cream/70 text-sm font-medium mt-1">{stat.label}</span>
              <span className="text-muted text-xs mt-1">{stat.sub}</span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
