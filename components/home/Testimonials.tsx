"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { TESTIMONIALS } from "@/data/testimonials";
import { staggerContainer, fadeUp } from "@/lib/animations";

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-gold text-sm">
          ★
        </span>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: (typeof TESTIMONIALS)[0] }) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col gap-5 p-7 rounded-2xl bg-charcoal border border-white/5 hover:border-white/10 transition-colors"
    >
      <StarRating count={testimonial.rating} />

      <blockquote className="text-cream/85 text-[15px] leading-relaxed font-medium flex-1">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div>
          <p className="text-cream text-sm font-semibold">{testimonial.name}</p>
          <p className="text-stone text-xs mt-0.5">{testimonial.location}</p>
        </div>
        {testimonial.item && (
          <span className="text-[11px] text-muted bg-white/4 border border-white/6 rounded-full px-2.5 py-1">
            {testimonial.item}
          </span>
        )}
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 bg-charcoal border-y border-white/5">
      <Container>
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} className="mb-14 text-center">
            <SectionHeader
              eyebrow="Reviews"
              title="What People Are Saying"
              subtitle="Don't take our word for it."
              align="center"
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
