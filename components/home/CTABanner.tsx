"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { staggerContainer, fadeUp } from "@/lib/animations";

export function CTABanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-32 overflow-hidden bg-black">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-brand/10 blur-[140px]" />
        <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[320px] h-[320px] rounded-full bg-flame/5 blur-[100px]" />
      </div>

      {/* Grain overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.022] pointer-events-none" aria-hidden />

      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

      <Container narrow>
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-brand text-sm font-semibold uppercase tracking-widest mb-6"
          >
            Skip The Wait. Skip The Fees.
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-[1.05] tracking-tight mb-6"
          >
            Ready to Order?
          </motion.h2>

          <motion.p variants={fadeUp} className="text-stone text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            No delivery apps. No platform markups. Just great pizza — ordered in seconds,
            picked up fresh.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="/order" size="lg" className="group">
              Order Pickup Now
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Button>
            <Button href="/menu" variant="secondary" size="lg">
              Browse the Menu
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}
