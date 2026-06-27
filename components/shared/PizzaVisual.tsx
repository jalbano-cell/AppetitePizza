"use client";

import { motion } from "framer-motion";

const INGREDIENTS = [
  { label: "San Marzano", style: { top: "8%", right: "10%" } },
  { label: "Buffalo Mozz", style: { top: "38%", right: "-4%" } },
  { label: "Stone Oven", style: { bottom: "28%", left: "-2%" } },
  { label: "Fresh Daily", style: { bottom: "8%", left: "18%" } },
  { label: "Made Fresh", style: { top: "20%", left: "2%" } },
] as const;

export function PizzaVisual() {
  return (
    <div className="relative w-[460px] h-[460px] flex items-center justify-center select-none">
      {/* Outer spinning dashed ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-dashed border-white/5"
      />

      {/* Middle ring — counter-spin */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute w-[360px] h-[360px] rounded-full border border-white/[0.06]"
      />

      {/* Glow layer */}
      <div className="absolute w-[260px] h-[260px] rounded-full bg-brand/10 blur-[60px]" />

      {/* Pizza body */}
      <div className="relative w-[240px] h-[240px] rounded-full flex items-center justify-center"
        style={{
          background:
            "radial-gradient(ellipse at 45% 40%, #3D1208 0%, #1A0804 50%, #090300 100%)",
          boxShadow: "0 0 0 1px rgba(193,58,27,0.12), inset 0 0 40px rgba(0,0,0,0.8)",
        }}
      >
        {/* Crust ring */}
        <div
          className="absolute inset-2 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at 45% 35%, #5C2010 0%, #2A0E06 60%, transparent 100%)",
            boxShadow: "inset 0 0 20px rgba(0,0,0,0.6)",
          }}
        />

        {/* Inner cheese layer */}
        <div
          className="absolute inset-8 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at 50% 45%, #6B3A10 0%, #3D1C06 60%, #1A0A00 100%)",
          }}
        />

        {/* Slice marks */}
        {[0, 45, 90, 135].map((deg) => (
          <div
            key={deg}
            className="absolute w-px bg-black/30 origin-bottom"
            style={{
              height: "50%",
              bottom: "50%",
              left: "50%",
              transform: `translateX(-50%) rotate(${deg}deg)`,
            }}
          />
        ))}

        {/* Brand dot */}
        <div className="relative z-10 w-8 h-8 rounded-full bg-brand/20 border border-brand/20 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-brand/60" />
        </div>
      </div>

      {/* Floating ingredient chips */}
      {INGREDIENTS.map((ingredient, i) => (
        <motion.div
          key={ingredient.label}
          animate={{ y: [0, -7, 0] }}
          transition={{
            duration: 2.8 + i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.25,
          }}
          className="absolute bg-charcoal/90 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5 text-xs font-medium text-cream/60 whitespace-nowrap shadow-xl"
          style={ingredient.style as React.CSSProperties}
        >
          {ingredient.label}
        </motion.div>
      ))}
    </div>
  );
}
