"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { CartItem } from "./CartItem";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/types/cart";
import Link from "next/link";

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-5 py-16 px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-white/5 border border-white/8 flex items-center justify-center" aria-hidden>
        <ShoppingBag size={22} className="text-stone" />
      </div>
      <div>
        <p className="text-cream font-semibold mb-1">Your cart is empty</p>
        <p className="text-stone text-sm">Add something delicious to get started.</p>
      </div>
      <button
        onClick={onClose}
        className="text-sm font-medium text-brand hover:text-flame transition-colors flex items-center gap-1"
      >
        Browse the Menu <ArrowRight size={13} aria-hidden />
      </button>
    </div>
  );
}

export function CartDrawer() {
  const { state, dispatch, itemCount, subtotal, tax, total } = useCart();
  const isOpen = state.isOpen;
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const trapRef = useFocusTrap<HTMLDivElement>(isOpen);
  const previousFocus = useRef<HTMLElement | null>(null);

  const close = () => dispatch({ type: "CLOSE_CART" });

  // Lock scroll and save/restore focus
  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      previousFocus.current?.focus();
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const drawerClass = isDesktop
    ? "fixed top-0 right-0 bottom-0 w-[420px] border-l border-white/6 flex flex-col"
    : "fixed bottom-0 left-0 right-0 max-h-[90vh] rounded-t-3xl border-t border-white/6 flex flex-col";

  const panelAnim = isDesktop
    ? { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } }
    : { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping cart">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />

          {/* Drawer */}
          <motion.div
            ref={trapRef}
            {...panelAnim}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className={cn("relative z-10 bg-charcoal shadow-2xl", drawerClass)}
          >
            {/* Mobile drag handle */}
            {!isDesktop && (
              <div className="flex justify-center pt-3 pb-1 flex-shrink-0" aria-hidden>
                <div className="w-10 h-1 rounded-full bg-white/10" />
              </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/6 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={18} className="text-brand" aria-hidden />
                <h2 className="font-display text-lg font-bold text-cream">Your Cart</h2>
                {itemCount > 0 && (
                  <span
                    className="bg-brand text-cream text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
                    aria-label={`${itemCount} items`}
                  >
                    {itemCount}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {state.items.length > 0 && (
                  <button
                    onClick={() => dispatch({ type: "CLEAR_CART" })}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-red-500/12 flex items-center justify-center text-muted hover:text-red-400 transition-colors"
                    aria-label="Clear all items from cart"
                  >
                    <Trash2 size={13} aria-hidden />
                  </button>
                )}
                <button
                  onClick={close}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-stone hover:text-cream transition-colors"
                  aria-label="Close cart"
                >
                  <X size={16} aria-hidden />
                </button>
              </div>
            </div>

            {/* Item list */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-5" role="list" aria-label="Cart items">
              {state.items.length === 0 ? (
                <EmptyCart onClose={close} />
              ) : (
                <div>
                  {state.items.map((item) => (
                    <CartItem key={item.cartId} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Summary + CTA */}
            {state.items.length > 0 && (
              <div className="flex-shrink-0 border-t border-white/6 px-5 py-5 space-y-4">
                <div className="space-y-2" aria-label="Order totals">
                  <div className="flex justify-between text-sm text-stone">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-stone">
                    <span>HST (13%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="h-px bg-white/6" aria-hidden />
                  <div className="flex justify-between font-semibold text-cream">
                    <span>Total</span>
                    <span className="font-display text-lg">{formatPrice(total)}</span>
                  </div>
                </div>

                <Link
                  href="/order"
                  onClick={close}
                  className="flex items-center justify-between w-full bg-brand hover:bg-flame text-cream font-semibold px-5 py-3.5 rounded-xl transition-all shadow-lg shadow-brand/20 hover:shadow-flame/25 group"
                >
                  <span>Proceed to Pickup</span>
                  <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                </Link>

                <p className="text-center text-muted text-[11px]">
                  Select pickup time at checkout
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
