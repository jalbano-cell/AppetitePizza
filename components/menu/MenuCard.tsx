"use client";

import Image from "next/image";
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
      className="group flex flex-col rounded-2xl overflow-hidden border border-white/5 hover:border-brand/15 bg-charcoal transition-all duration-300 cursor-pointer"
      onClick={() => dispatch({ type: "OPEN_ITEM_MODAL", item })}
      role="article"
      aria-label={`${item.name} — ${item.category}`}
    >
      {/* Image area */}
      <div className="relative h-44 overflow-hidden flex-shrink-0 bg-black" aria-hidden>
        <Image
          src={`/menu/${item.id}.jpg`}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Gradient overlay for badge readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

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
