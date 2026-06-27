"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FEATURED_ITEMS } from "@/data/menu";
import { staggerContainer, fadeUp } from "@/lib/animations";

function PreviewCard({ item, index }: { item: (typeof FEATURED_ITEMS)[0]; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="group relative rounded-2xl overflow-hidden border border-white/5 bg-charcoal flex flex-col"
    >
      {/* Image placeholder */}
      <div
        className="relative h-52 overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at 45% 40%, ${item.accentColor}22 0%, transparent 65%), linear-gradient(180deg, #1a1714 0%, #0d0a08 100%)`,
        }}
      >
        {/* Pizza circle suggestion */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-28 h-28 rounded-full border transition-transform duration-500 group-hover:scale-110"
            style={{
              borderColor: `${item.accentColor}18`,
              background: `radial-gradient(ellipse at 45% 40%, ${item.accentColor}14 0%, transparent 70%)`,
            }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-20 blur-[2px] select-none">
          🍕
        </div>

        {/* Index number watermark */}
        <div className="absolute top-4 left-4 font-display text-7xl font-bold text-white/[0.04] leading-none select-none">
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Tags */}
        <div className="absolute top-4 right-4 flex flex-wrap gap-1.5 justify-end">
          {item.popular && <Badge variant="brand">Popular</Badge>}
          {item.featured && !item.popular && <Badge variant="gold">Featured</Badge>}
          {item.tags.slice(0, 1).map((t) => (
            <Badge key={t} variant="muted">{t}</Badge>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-display text-xl font-bold text-cream leading-tight">{item.name}</h3>
          <span className="text-cream font-semibold text-lg flex-shrink-0">
            ${item.price.toFixed(0)}
          </span>
        </div>
        <p className="text-stone text-sm leading-relaxed line-clamp-2 flex-1">{item.description}</p>

        {item.customizable && (
          <p className="text-muted text-xs mt-3 flex items-center gap-1">
            <span className="text-brand">↳</span> Sizes & toppings customizable
          </p>
        )}
      </div>
    </motion.div>
  );
}

export function MenuPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 bg-black">
      <Container>
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <motion.div variants={fadeUp}>
              <SectionHeader
                eyebrow="From The Oven"
                eyebrowVariant="brand"
                title={
                  <>
                    A Few of Our
                    <br />
                    <em className="text-brand not-italic">Favourites</em>
                  </>
                }
                subtitle="Crafted fresh. Customized to you. Ready when you are."
              />
            </motion.div>

            <motion.div variants={fadeUp} className="flex-shrink-0">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 text-sm font-medium text-stone hover:text-cream transition-colors group"
              >
                See full menu
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>

          {/* Cards */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {FEATURED_ITEMS.map((item, i) => (
              <PreviewCard key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
