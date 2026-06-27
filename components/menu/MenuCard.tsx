"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { fadeUp } from "@/lib/animations";
import { useCart } from "@/context/CartContext";
import type { MenuItem } from "@/data/menu";

export function MenuCard({ item }: { item: MenuItem }) {
  const { dispatch } = useCart();

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.22 }}
      className="group flex flex-col rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 bg-charcoal transition-colors cursor-pointer"
      onClick={() => dispatch({ type: "OPEN_ITEM_MODAL", item })}
      role="article"
      aria-label={`${item.name} — ${item.category}`}
    >
      {/* Image area */}
      <div
        className="relative h-44 overflow-hidden flex-shrink-0"
        aria-hidden
        style={{
          background: `radial-gradient(ellipse at 45% 40%, ${item.accentColor}1A 0%, transparent 60%), linear-gradient(180deg, #1a1714 0%, #0d0a08 100%)`,
        }}
      >
        {/* Background emoji */}
        <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-[0.14] blur-[3px] select-none">
          {item.category === "Pizza" && "🍕"}
          {item.category === "Sides" && "🍟"}
          {item.category === "Drinks" && "🥤"}
          {item.category === "Desserts" && "🍮"}
        </div>

        {/* Subtle pizza ring for pizzas */}
        {item.category === "Pizza" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-24 h-24 rounded-full border transition-transform duration-500 group-hover:scale-110"
              style={{
                borderColor: `${item.accentColor}15`,
                background: `radial-gradient(ellipse at 45% 40%, ${item.accentColor}0C 0%, transparent 70%)`,
              }}
            />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {item.popular && <Badge variant="brand">Popular</Badge>}
          {item.featured && !item.popular && <Badge variant="gold">Featured</Badge>}
        </div>

        {/* Price — top right */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm border border-white/8 rounded-full px-2.5 py-1 text-cream text-xs font-semibold">
          ${item.price % 1 === 0 ? item.price : item.price.toFixed(2)}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-display text-lg font-bold text-cream leading-tight">
            {item.name}
          </h3>
          <p className="text-stone text-xs leading-relaxed mt-1.5 line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Tags */}
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {item.tags.map((tag) => (
              <Badge key={tag} variant="muted" className="text-[10px]">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {item.customizable && (
          <p className="text-muted text-[11px] flex items-center gap-1">
            <span className="text-brand">↳</span> Customizable
          </p>
        )}

        {/* Add to Cart */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch({ type: "OPEN_ITEM_MODAL", item });
          }}
          className="mt-auto w-full flex items-center justify-between gap-2 bg-white/5 hover:bg-brand/15 border border-white/8 hover:border-brand/30 text-stone hover:text-cream rounded-xl px-4 py-2.5 text-xs font-semibold transition-all group-hover:border-white/12"
        >
          <span>Add to Cart</span>
          <Plus size={14} className="text-brand" />
        </button>
      </div>
    </motion.div>
  );
}
