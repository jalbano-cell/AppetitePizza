"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { MenuCard } from "./MenuCard";
import { MENU_ITEMS, MENU_CATEGORIES, type MenuCategory } from "@/data/menu";
import { staggerContainer } from "@/lib/animations";
import { AnimatePresence } from "framer-motion";

export function MenuContent() {
  const [active, setActive] = useState<MenuCategory>("All");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const filtered =
    active === "All" ? MENU_ITEMS : MENU_ITEMS.filter((item) => item.category === active);

  return (
    <div ref={ref}>
      {/* Sticky category bar */}
      <div className="sticky top-[79px] z-30 bg-black/90 backdrop-blur-lg border-b border-white/5 py-4">
        <Container>
          <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  active === cat
                    ? "bg-brand text-cream shadow-lg shadow-brand/20"
                    : "bg-white/5 text-stone hover:bg-white/8 hover:text-cream border border-white/5"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* Grid */}
      <Container className="py-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filtered.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-stone">Nothing here yet.</div>
        )}
      </Container>
    </div>
  );
}
