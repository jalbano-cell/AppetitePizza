"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { FEATURES } from "@/lib/constants";
import { staggerContainer, fadeUp } from "@/lib/animations";

export function FeatureStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-charcoal border-y border-white/5 py-14">
      <Container>
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5"
        >
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex items-start gap-5 px-8 py-8 md:py-2 first:pl-0 last:pr-0"
            >
              <span className="text-4xl flex-shrink-0 mt-0.5" role="img" aria-label={feature.title}>
                {feature.icon}
              </span>
              <div>
                <h3 className="text-cream font-semibold text-base mb-1">{feature.title}</h3>
                <p className="text-stone text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
