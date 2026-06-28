"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { TESTIMONIALS } from "@/data/testimonials";
import { staggerContainer, fadeUp } from "@/lib/animations";

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} className="text-gold" fill="currentColor" aria-hidden />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: (typeof TESTIMONIALS)[0] }) {
  const initials = testimonial.name.split(" ").map((n) => n[0]).join("");

  return (
    <motion.div
      variants={fadeUp}
      className="relative flex flex-col gap-5 p-7 rounded-2xl bg-charcoal border border-white/5 hover:border-white/[0.09] transition-all duration-300 overflow-hidden"
    >
      {/* Decorative large opening quote */}
      <div
        className="absolute -top-3 right-5 font-display text-[120px] leading-none text-white/[0.032] select-none pointer-events-none"
        aria-hidden
      >
        &ldquo;
      </div>

      <StarRating count={testimonial.rating} />

      <blockquote className="text-cream/80 text-[15px] leading-relaxed font-medium flex-1 relative z-10">
        {testimonial.quote}
      </blockquote>

      <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center flex-shrink-0">
            <span className="text-brand text-[10px] font-bold leading-none">{initials}</span>
          </div>
          <div>
            <p className="text-cream text-sm font-semibold">{testimonial.name}</p>
            <p className="text-stone text-xs mt-0.5">{testimonial.location}</p>
          </div>
        </div>
        {testimonial.item && (
          <span className="text-[11px] text-muted bg-white/4 border border-white/6 rounded-full px-2.5 py-1 flex-shrink-0">
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
