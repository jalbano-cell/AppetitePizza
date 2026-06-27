"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ExternalLink, Percent } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { fadeUp, staggerContainer } from "@/lib/animations";

const PARTNERS = [
  {
    name: "Uber Eats",
    slug: "ubereats",
    tagline: "Order in the Uber Eats app",
    href: "#",
    accentColor: "#06C167",
    bgClass: "hover:bg-[#06C167]/8",
    borderClass: "border-[#06C167]/15 hover:border-[#06C167]/35",
    textClass: "text-[#06C167]",
    dotClass: "bg-[#06C167]",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden>
        <rect width="40" height="40" rx="10" fill="#06C167" />
        <path d="M20 10c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10S25.523 10 20 10zm0 16a6 6 0 110-12 6 6 0 010 12z" fill="white" />
        <circle cx="20" cy="20" r="3" fill="white" />
      </svg>
    ),
  },
  {
    name: "DoorDash",
    slug: "doordash",
    tagline: "Order on DoorDash",
    href: "#",
    accentColor: "#FF3008",
    bgClass: "hover:bg-[#FF3008]/8",
    borderClass: "border-[#FF3008]/15 hover:border-[#FF3008]/35",
    textClass: "text-[#FF3008]",
    dotClass: "bg-[#FF3008]",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden>
        <rect width="40" height="40" rx="10" fill="#FF3008" />
        <path d="M12 20c0-4.418 3.582-8 8-8h6v4h-6a4 4 0 000 8h6v4h-6c-4.418 0-8-3.582-8-8z" fill="white" />
      </svg>
    ),
  },
  {
    name: "SkipTheDishes",
    slug: "skip",
    tagline: "Order on SkipTheDishes",
    href: "#",
    accentColor: "#F96329",
    bgClass: "hover:bg-[#F96329]/8",
    borderClass: "border-[#F96329]/15 hover:border-[#F96329]/35",
    textClass: "text-[#F96329]",
    dotClass: "bg-[#F96329]",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" aria-hidden>
        <rect width="40" height="40" rx="10" fill="#F96329" />
        <path d="M10 24l4-8h12l4 8H10zm6-5h8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="15" cy="27" r="2" fill="white" />
        <circle cx="25" cy="27" r="2" fill="white" />
      </svg>
    ),
  },
];

export function DeliveryPartners() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" as any });

  return (
    <section className="py-28 bg-black relative overflow-hidden" ref={ref}>
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(193,58,27,0.04)_0%,transparent_70%)] pointer-events-none" />

      <Container narrow>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-14">
            <Badge variant="muted" className="mb-5">Also Available On</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4 tracking-tight">
              Order Your Way
            </h2>
            <p className="text-stone text-lg max-w-md mx-auto">
              Find us on all major delivery platforms — or skip the fees and order pickup directly.
            </p>
          </motion.div>

          {/* Pickup-first callout */}
          <motion.div variants={fadeUp} className="mb-10">
            <div className="relative bg-brand/6 border border-brand/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-brand/15 flex items-center justify-center flex-shrink-0">
                <Percent size={22} className="text-brand" />
              </div>
              <div className="flex-1">
                <p className="text-cream font-semibold text-lg mb-0.5">Save on delivery fees</p>
                <p className="text-stone text-sm">
                  Order pickup directly through Appetite and keep more in your pocket — no platform cuts, no surge pricing.
                </p>
              </div>
              <Link
                href="/order"
                className="flex items-center gap-2 bg-brand hover:bg-flame text-cream font-semibold px-5 py-3 rounded-xl transition-all text-sm whitespace-nowrap flex-shrink-0 shadow-lg shadow-brand/20"
              >
                Order Pickup <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          {/* Partner cards */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {PARTNERS.map((p) => (
              <motion.a
                key={p.slug}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`group flex flex-col gap-4 p-5 rounded-2xl border bg-white/2 transition-all duration-200 cursor-pointer ${p.bgClass} ${p.borderClass}`}
              >
                <div className="flex items-start justify-between">
                  {p.icon}
                  <ExternalLink size={14} className="text-muted group-hover:text-stone transition-colors" />
                </div>
                <div>
                  <p className={`font-bold text-base ${p.textClass}`}>{p.name}</p>
                  <p className="text-muted text-xs mt-0.5">{p.tagline}</p>
                </div>
                <div className={`h-0.5 w-8 rounded-full ${p.dotClass} opacity-40`} />
              </motion.a>
            ))}
          </motion.div>

          {/* Fine print */}
          <motion.p variants={fadeUp} className="text-center text-muted text-xs mt-8">
            Prices on third-party platforms may differ. Links will be activated once our pages go live.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
