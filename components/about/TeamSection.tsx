"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { TEAM } from "@/data/testimonials";
import { staggerContainer, fadeUp } from "@/lib/animations";

function TeamCard({ member }: { member: (typeof TEAM)[0] }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group flex flex-col items-center text-center p-6"
    >
      {/* Avatar */}
      <div className="relative w-24 h-24 rounded-full overflow-hidden mb-5 ring-2 ring-white/5 group-hover:ring-brand/20 transition-all duration-300">
        <div className="absolute inset-0" style={{ background: member.gradient }} />
        <div className="absolute inset-0 flex items-center justify-center font-display text-xl font-bold text-cream/50">
          {member.initials}
        </div>
      </div>

      <h3 className="font-display text-xl font-bold text-cream">{member.name}</h3>
      <p className="text-brand text-xs font-semibold uppercase tracking-widest mt-1.5 mb-3">
        {member.role}
      </p>
      <p className="text-stone text-sm leading-relaxed max-w-xs">{member.bio}</p>
    </motion.div>
  );
}

export function TeamSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 bg-charcoal" ref={ref}>
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <SectionHeader
              eyebrow="The Team"
              title="The People Behind Every Slice"
              subtitle="Small team. High standards. Obsessive about the craft."
              align="center"
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {TEAM.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
