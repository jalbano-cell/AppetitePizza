"use client";

import { X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { QuantitySelector } from "@/components/menu/QuantitySelector";
import { formatPrice, summarizeCustomizations, type CartItem as CartItemType } from "@/types/cart";
import { cn } from "@/lib/utils";

export function CartItem({ item }: { item: CartItemType }) {
  const { dispatch } = useCart();
  const summary = summarizeCustomizations(item.customizations);

  return (
    <div className="flex gap-3 py-4 border-b border-white/5 last:border-0 group">
      {/* Color dot */}
      <div
        className="w-1 flex-shrink-0 rounded-full self-stretch min-h-[2.5rem]"
        style={{ backgroundColor: `${item.accentColor}60` }}
      />

      <div className="flex-1 min-w-0 space-y-2">
        {/* Name + remove */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-cream text-sm font-semibold leading-tight truncate">
              {item.name}
            </p>
            {summary && (
              <p className="text-muted text-[11px] mt-1 leading-relaxed line-clamp-2">
                {summary}
              </p>
            )}
            {item.customizations.notes && (
              <p className="text-muted text-[11px] mt-0.5 italic line-clamp-1">
                &ldquo;{item.customizations.notes}&rdquo;
              </p>
            )}
          </div>
          <button
            onClick={() => dispatch({ type: "REMOVE_ITEM", cartId: item.cartId })}
            className="w-6 h-6 rounded-full bg-white/5 hover:bg-red-500/15 flex items-center justify-center text-muted hover:text-red-400 transition-colors flex-shrink-0"
            aria-label={`Remove ${item.name}`}
          >
            <X size={11} />
          </button>
        </div>

        {/* Qty + price */}
        <div className="flex items-center justify-between">
          <QuantitySelector
            size="sm"
            value={item.quantity}
            onChange={(q) => dispatch({ type: "UPDATE_QUANTITY", cartId: item.cartId, quantity: q })}
          />
          <div className="text-right">
            <p className="text-cream text-sm font-semibold">
              {formatPrice(item.unitPrice * item.quantity)}
            </p>
            {item.quantity > 1 && (
              <p className="text-muted text-[10px]">{formatPrice(item.unitPrice)} ea.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
