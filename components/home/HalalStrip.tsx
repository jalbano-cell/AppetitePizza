"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { HalalSeal } from "@/components/shared/HalalSeal";
import { fadeUp, staggerContainer } from "@/lib/animations";

const HALAL_POINTS = [
  "All meats Halal certified",
  "Ethically sourced, no exceptions",
  "No cross-contamination",
];

export function HalalStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="bg-[#060f07] border-y border-green-900/25 py-12">
      <Container>
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col sm:flex-row items-center gap-8 md:gap-14"
        >
          {/* Seal */}
          <motion.div variants={fadeUp} className="flex-shrink-0">
            <HalalSeal size={96} />
          </motion.div>

          {/* Vertical divider */}
          <div className="hidden sm:block w-px self-stretch bg-green-900/30" aria-hidden />

          {/* Text */}
          <motion.div variants={fadeUp} className="flex-1 text-center sm:text-left">
            <p className="text-green-600/70 text-[11px] font-semibold uppercase tracking-[0.18em] mb-2">
              Certification
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight mb-3">
              Proudly Halal Certified
            </h2>
            <p className="text-green-100/45 text-sm leading-relaxed max-w-md">
              Every item on our menu meets the highest Halal standards. All meats are
              fully certified and ethically sourced — no exceptions, no compromise.
            </p>
          </motion.div>

          {/* Certification points */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-3 flex-shrink-0 text-center sm:text-left"
          >
            {HALAL_POINTS.map((point) => (
              <div key={point} className="flex items-center justify-center sm:justify-start gap-2.5 text-sm text-green-400/75">
                <span className="w-4 h-4 rounded-full bg-green-900/40 border border-green-700/35 flex items-center justify-center flex-shrink-0">
                  <Check size={9} className="text-green-400" aria-hidden />
                </span>
                {point}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
