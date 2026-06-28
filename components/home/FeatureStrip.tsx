"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Flame, Zap, Leaf, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FEATURES } from "@/lib/constants";
import { staggerContainer, fadeUp } from "@/lib/animations";

const FEATURE_ICONS: LucideIcon[] = [Flame, Zap, Leaf];

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
          {FEATURES.map((feature, i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                className="relative flex items-start gap-5 px-8 py-10 md:py-4 first:pl-0 last:pr-0"
              >
                {/* Subtle number watermark */}
                <span
                  className="absolute top-4 right-6 font-display text-5xl font-bold text-white/[0.03] leading-none select-none hidden md:block"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-10 h-10 rounded-xl bg-brand/8 border border-brand/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={18} className="text-brand" aria-hidden />
                </div>
                <div>
                  <h3 className="text-cream font-semibold text-base mb-1.5">{feature.title}</h3>
                  <p className="text-stone text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
