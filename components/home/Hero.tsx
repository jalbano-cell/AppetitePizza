"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, MoonStar } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { fadeUp, staggerContainer } from "@/lib/animations";

const TRUST_ITEMS = ["No account needed", "Ready in ~15 min", "Pay online or in person"];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Background photo */}
      <Image
        src="/hero-bg.jpg"
        alt=""
        fill
        priority
        quality={90}
        className="object-cover object-[60%_center]"
        aria-hidden
      />

      {/* Dark overlays for readability */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" aria-hidden />

      <Container className="relative z-10 pt-36 pb-24">
        <div className="max-w-2xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} className="mb-8">
              <Badge variant="brand">
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse inline-block" />
                Now Open for Pickup
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-6xl sm:text-7xl lg:text-7xl xl:text-8xl font-bold text-cream leading-[1.02] tracking-tight mb-6"
            >
              Pizza Worth
              <br />
              <em className="text-brand not-italic">Ordering</em> Twice.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-stone text-lg md:text-xl leading-relaxed mb-10"
            >
              Fresh dough. Real toppings. Wood-fired in minutes.{" "}
              <span className="text-cream/80">Skip the delivery fees</span> and pick it up hot.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-10">
              <Button href="/order" size="lg" className="group">
                Order Pickup
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Button>
              <Button href="/menu" variant="secondary" size="lg">
                View Menu
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center flex-wrap gap-y-2">
              {/* Halal badge — visually distinct from trust items */}
              <span className="flex items-center">
                <span className="flex items-center gap-1.5 bg-green-900/25 border border-green-700/30 rounded-full px-2.5 py-1 text-green-400 text-xs font-medium">
                  <MoonStar size={11} aria-hidden />
                  Halal Certified
                </span>
                <span className="mx-4 text-white/15 select-none" aria-hidden>|</span>
              </span>

              {TRUST_ITEMS.map((item, i) => (
                <span key={item} className="flex items-center text-stone/75 text-sm">
                  <Check size={12} className="text-brand mr-1.5 flex-shrink-0" aria-hidden />
                  {item}
                  {i < TRUST_ITEMS.length - 1 && (
                    <span className="mx-4 text-white/15 select-none" aria-hidden>|</span>
                  )}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden
      >
        <span className="text-muted text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-stone/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
