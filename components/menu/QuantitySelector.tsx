"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type QuantitySelectorProps = {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
};

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 20,
  size = "md",
}: QuantitySelectorProps) {
  const btnBase = cn(
    "flex items-center justify-center rounded-full border transition-all select-none",
    size === "sm"
      ? "w-7 h-7 text-xs"
      : "w-9 h-9 text-sm"
  );

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={cn(
          btnBase,
          "border-white/10 bg-white/5 text-stone hover:border-white/20 hover:text-cream disabled:opacity-30 disabled:cursor-not-allowed"
        )}
        aria-label="Decrease quantity"
      >
        <Minus size={size === "sm" ? 12 : 14} />
      </button>

      <span
        className={cn(
          "font-semibold text-cream tabular-nums text-center",
          size === "sm" ? "w-5 text-sm" : "w-6 text-base"
        )}
      >
        {value}
      </span>

      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={cn(
          btnBase,
          "border-white/10 bg-white/5 text-stone hover:border-brand/40 hover:bg-brand/10 hover:text-cream disabled:opacity-30 disabled:cursor-not-allowed"
        )}
        aria-label="Increase quantity"
      >
        <Plus size={size === "sm" ? 12 : 14} />
      </button>
    </div>
  );
}
