"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { staggerContainer, fadeUp, slideInLeft, slideInRight } from "@/lib/animations";

export function StorySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 bg-black" ref={ref}>
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          {/* Left: Text */}
          <motion.div variants={slideInLeft}>
            <SectionHeader
              eyebrow="Our Story"
              eyebrowVariant="brand"
              title={
                <>
                  Born From a
                  <br />
                  <em className="text-brand not-italic">Simple Obsession.</em>
                </>
              }
            />

            <div className="space-y-5 mt-8 text-stone text-[15px] leading-relaxed">
              <p>
                We got tired of pizza that was just{" "}
                <em className="text-cream/60">fine.</em> Decent enough. Forgettable.
                The kind you order when nothing else is open.
              </p>
              <p>
                So we started making our own — fresh dough every morning, ingredients we
                actually believe in, and a stone oven that runs at the temperature it's supposed to.
                Not &ldquo;close enough.&rdquo; Exactly right.
              </p>
              <p>
                Appetite started with one belief: if you care about what you put in your body,
                you deserve a pizza made by people who feel the same way.
              </p>
              <p className="text-cream/70">
                Every order. Made fresh. No shortcuts. That&apos;s the whole thing.
              </p>
            </div>

            {/* Accent line */}
            <div className="flex items-center gap-4 mt-10">
              <div className="w-12 h-px bg-brand" />
              <span className="text-brand text-sm font-medium">Est. 2021</span>
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div variants={slideInRight} className="relative">
            {/* Main image placeholder */}
            <div
              className="relative h-[480px] rounded-2xl overflow-hidden border border-white/5"
              style={{
                background:
                  "radial-gradient(ellipse at 40% 30%, #3D1208 0%, #1A0804 40%, #090300 80%, #050200 100%)",
              }}
            >
              {/* Abstract visual */}
              <div className="absolute inset-0 flex items-center justify-center opacity-25">
                <div
                  className="w-64 h-64 rounded-full"
                  style={{
                    background: "radial-gradient(ellipse at 45% 40%, #5C2010 0%, #2A0E06 50%, transparent 80%)",
                    boxShadow: "0 0 0 1px rgba(193,58,27,0.08), 0 0 80px rgba(193,58,27,0.12)",
                  }}
                />
              </div>

              {/* Overlay text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <p className="font-display text-5xl font-bold text-cream/10 leading-tight tracking-tight">
                  Made with
                  <br />
                  Intention.
                </p>
              </div>

              {/* Corner accents */}
              <div className="absolute top-5 left-5 w-8 h-8 border-t border-l border-brand/20 rounded-tl-lg" />
              <div className="absolute bottom-5 right-5 w-8 h-8 border-b border-r border-brand/20 rounded-br-lg" />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-charcoal border border-white/8 rounded-2xl p-5 shadow-2xl"
            >
              <p className="font-display text-4xl font-bold text-cream">50k+</p>
              <p className="text-stone text-sm mt-1">Pizzas served</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
