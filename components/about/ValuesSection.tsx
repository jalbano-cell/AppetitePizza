"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Leaf, Zap, Heart, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { staggerContainer, fadeUp } from "@/lib/animations";

const VALUES: { Icon: LucideIcon; title: string; body: string }[] = [
  {
    Icon: Award,
    title: "Quality First",
    body: "We'd rather make fewer pizzas than rush one. Every order gets the same attention whether it's a Tuesday at noon or a Friday at 9 PM.",
  },
  {
    Icon: Leaf,
    title: "Real Ingredients",
    body: "Fresh. Local where possible. Never frozen. The food we serve is the food we'd eat — because most days, we do.",
  },
  {
    Icon: Zap,
    title: "Respect Your Time",
    body: "Order pickup. Skip the wait. We'll have it hot and ready when you walk in — not 5 minutes after you arrive.",
  },
  {
    Icon: Heart,
    title: "Community",
    body: "We're neighbours first, restaurant second. This place exists because of the people who keep coming back. We don't forget that.",
  },
];

export function ValuesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 bg-charcoal border-y border-white/5" ref={ref}>
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} className="mb-16 text-center">
            <SectionHeader
              eyebrow="What We Stand For"
              title="The Things We Won't Compromise On"
              align="center"
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {VALUES.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeUp}
                whileHover={{ borderColor: "rgba(193,58,27,0.18)" }}
                className="group p-7 rounded-2xl border border-white/5 bg-black/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-brand/8 border border-brand/10 group-hover:bg-brand/12 group-hover:border-brand/20 flex items-center justify-center mb-5 transition-colors duration-300">
                  <value.Icon size={18} className="text-brand" aria-hidden />
                </div>
                <h3 className="font-display text-xl font-bold text-cream mb-3">
                  {value.title}
                </h3>
                <p className="text-stone text-sm leading-relaxed">{value.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
