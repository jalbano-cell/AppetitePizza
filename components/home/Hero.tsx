"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { PizzaVisual } from "@/components/shared/PizzaVisual";
import { fadeUp, staggerContainer } from "@/lib/animations";

const TRUST_ITEMS = ["No account needed", "Ready in ~15 min", "Pay online or in person"];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-[25%] left-[35%] w-[700px] h-[700px] rounded-full bg-brand/[0.07] blur-[160px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-[-5%] w-[500px] h-[500px] rounded-full bg-flame/[0.04] blur-[120px]" />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.018] pointer-events-none"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(rgba(250,245,238,1) 1px, transparent 1px), linear-gradient(90deg, rgba(250,245,238,1) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <Container className="relative z-10 pt-36 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-4 items-center">
          {/* ── Left: Copy ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
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

            <motion.div variants={fadeUp} className="flex flex-wrap gap-x-5 gap-y-2">
              {TRUST_ITEMS.map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-muted text-sm">
                  <span className="text-brand text-xs">✓</span>
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Visual ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="hidden lg:flex justify-center items-center"
          >
            <PizzaVisual />
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
