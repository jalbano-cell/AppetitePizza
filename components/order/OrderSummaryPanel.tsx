"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/types/cart";
import { pickupDisplayLabel } from "@/lib/orderUtils";
import type { PickupDate, PickupTime } from "@/types/order";
import { cn } from "@/lib/utils";

type Props = {
  pickupDate?: PickupDate | null;
  pickupTime?: PickupTime | null;
  className?: string;
};

export function OrderSummaryPanel({ pickupDate, pickupTime, className }: Props) {
  const { state, subtotal, tax, total } = useCart();

  return (
    <div className={cn("bg-charcoal border border-white/6 rounded-2xl p-5 space-y-5", className)}>
      {/* Header */}
      <div className="flex items-center gap-2 pb-4 border-b border-white/6">
        <ShoppingBag size={16} className="text-brand" />
        <h3 className="font-display font-bold text-cream text-base">Order Summary</h3>
      </div>

      {/* Items */}
      <div className="space-y-3">
        {state.items.map((item) => (
          <div key={item.cartId} className="flex items-start justify-between gap-3 text-sm">
            <div className="flex items-start gap-2 min-w-0">
              <span className="bg-brand/15 text-brand text-[10px] font-bold w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                {item.quantity}
              </span>
              <div className="min-w-0">
                <p className="text-cream truncate">{item.name}</p>
                {item.customizations.size && (
                  <p className="text-muted text-[11px]">{item.customizations.size.label}</p>
                )}
              </div>
            </div>
            <span className="text-stone whitespace-nowrap">{formatPrice(item.unitPrice * item.quantity)}</span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-white/6 pt-4 space-y-2">
        <div className="flex justify-between text-sm text-stone">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-stone">
          <span>HST (13%)</span>
          <span>{formatPrice(tax)}</span>
        </div>
        <div className="flex justify-between font-semibold text-cream pt-1">
          <span>Total</span>
          <span className="font-display text-lg">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Pickup info */}
      {pickupDate && pickupTime && (
        <div className="border-t border-white/6 pt-4">
          <p className="text-muted text-[11px] uppercase tracking-widest mb-1">Pickup</p>
          <p className="text-cream text-sm font-medium">
            {pickupDisplayLabel(pickupDate, pickupTime)}
          </p>
        </div>
      )}
    </div>
  );
}
