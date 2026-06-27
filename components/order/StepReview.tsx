"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag, Pencil } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice, summarizeCustomizations } from "@/types/cart";
import { cn } from "@/lib/utils";

type Props = {
  onNext: () => void;
};

export function StepReview({ onNext }: Props) {
  const { state, subtotal, tax, total, dispatch } = useCart();
  const empty = state.items.length === 0;

  if (empty) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center gap-5">
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/8 flex items-center justify-center">
          <ShoppingBag size={22} className="text-stone" />
        </div>
        <div>
          <p className="text-cream font-semibold mb-1">Your cart is empty</p>
          <p className="text-stone text-sm">Add some items from the menu before ordering.</p>
        </div>
        <Link
          href="/menu"
          className="flex items-center gap-2 bg-brand hover:bg-flame text-cream font-semibold px-5 py-3 rounded-xl transition-all text-sm"
        >
          Browse Menu <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-cream">Your Order</h2>
        <Link
          href="/menu"
          className="flex items-center gap-1.5 text-sm text-muted hover:text-cream transition-colors"
        >
          <Pencil size={13} />
          Edit
        </Link>
      </div>

      {/* Item list */}
      <div className="bg-charcoal border border-white/6 rounded-2xl overflow-hidden divide-y divide-white/5">
        {state.items.map((item) => {
          const summary = summarizeCustomizations(item.customizations);
          return (
            <div key={item.cartId} className="flex items-start gap-3 p-4">
              <div
                className="w-1 self-stretch rounded-full flex-shrink-0 min-h-[2rem]"
                style={{ backgroundColor: `${item.accentColor}60` }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <p className="text-cream text-sm font-semibold">{item.name}</p>
                  <p className="text-cream text-sm font-semibold whitespace-nowrap">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </p>
                </div>
                {summary && (
                  <p className="text-muted text-[11px] mt-0.5 line-clamp-1">{summary}</p>
                )}
                {item.customizations.notes && (
                  <p className="text-muted text-[11px] italic mt-0.5 line-clamp-1">
                    &ldquo;{item.customizations.notes}&rdquo;
                  </p>
                )}
                <p className="text-stone text-xs mt-1">Qty: {item.quantity}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Totals */}
      <div className="bg-charcoal border border-white/6 rounded-2xl p-4 space-y-2">
        <div className="flex justify-between text-sm text-stone">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-stone">
          <span>HST (13%)</span>
          <span>{formatPrice(tax)}</span>
        </div>
        <div className="h-px bg-white/6" />
        <div className="flex justify-between font-semibold text-cream">
          <span>Total</span>
          <span className="font-display text-xl">{formatPrice(total)}</span>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onNext}
        className="w-full flex items-center justify-between bg-brand hover:bg-flame text-cream font-semibold px-6 py-4 rounded-xl transition-all shadow-lg shadow-brand/20 hover:shadow-flame/25 group"
      >
        <span>Schedule Pickup</span>
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}
