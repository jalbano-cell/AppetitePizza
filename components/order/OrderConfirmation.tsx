"use client";

import { motion } from "framer-motion";
import { Check, Clock, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { PlacedOrder } from "@/types/order";
import { formatPrice, summarizeCustomizations } from "@/types/cart";
import { pickupDisplayLabel } from "@/lib/orderUtils";
import { cn } from "@/lib/utils";

const PAYMENT_LABELS: Record<string, string> = {
  online_apple: "Apple Pay",
  online_google: "Google Pay",
  online_card: "Credit / Debit Card",
  inperson: "Pay at Pickup",
};

export function OrderConfirmation({ order }: { order: PlacedOrder }) {
  const payKey = order.paymentMethod === "inperson"
    ? "inperson"
    : `online_${order.onlinePaymentType ?? "card"}`;
  const payLabel = PAYMENT_LABELS[payKey] ?? "Card";
  const pickup = pickupDisplayLabel(order.pickupDate, order.pickupTime);

  return (
    <div className="max-w-lg mx-auto text-center space-y-8 py-8">
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 14, stiffness: 200 }}
        className="mx-auto w-20 h-20 rounded-full bg-brand/15 border-2 border-brand flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", damping: 12 }}
        >
          <Check size={32} className="text-brand" strokeWidth={3} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="space-y-2"
      >
        <p className="text-stone text-sm uppercase tracking-widest font-medium">Order Confirmed</p>
        <h1 className="font-display text-4xl font-bold text-cream">{order.orderNumber}</h1>
        <p className="text-stone text-sm">Show this number when you arrive.</p>
      </motion.div>

      {/* Details cards */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left"
      >
        <div className="bg-charcoal border border-white/6 rounded-2xl p-4 space-y-1">
          <div className="flex items-center gap-2 text-muted text-xs font-semibold uppercase tracking-widest mb-2">
            <Clock size={12} /> Pickup Time
          </div>
          <p className="text-cream font-semibold text-sm">{pickup}</p>
          <p className="text-muted text-xs">Est. prep: ~{order.estimatedPrepMinutes} min</p>
        </div>

        <div className="bg-charcoal border border-white/6 rounded-2xl p-4 space-y-1">
          <div className="flex items-center gap-2 text-muted text-xs font-semibold uppercase tracking-widest mb-2">
            <MapPin size={12} /> Pickup At
          </div>
          <p className="text-cream font-semibold text-sm">Appetite Pizza</p>
          <p className="text-muted text-xs">123 Queen Street West, Toronto</p>
        </div>
      </motion.div>

      {/* Order summary */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        className="bg-charcoal border border-white/6 rounded-2xl p-5 text-left space-y-4"
      >
        <h3 className="font-display font-bold text-cream">Order Summary</h3>

        <div className="divide-y divide-white/5 space-y-0">
          {order.items.map((item) => {
            const summary = summarizeCustomizations(item.customizations);
            return (
              <div key={item.cartId} className="flex justify-between gap-3 py-3 text-sm">
                <div className="flex gap-2 min-w-0">
                  <span className="text-brand font-semibold">{item.quantity}×</span>
                  <div className="min-w-0">
                    <p className="text-cream truncate">{item.name}</p>
                    {summary && <p className="text-muted text-[11px] mt-0.5">{summary}</p>}
                  </div>
                </div>
                <span className="text-stone whitespace-nowrap">
                  {formatPrice(item.unitPrice * item.quantity)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="border-t border-white/6 pt-4 space-y-2">
          <div className="flex justify-between text-sm text-stone">
            <span>Subtotal</span><span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-stone">
            <span>HST (13%)</span><span>{formatPrice(order.tax)}</span>
          </div>
          <div className="flex justify-between font-semibold text-cream">
            <span>Total</span>
            <span className="font-display text-lg">{formatPrice(order.total)}</span>
          </div>
        </div>

        <div className="border-t border-white/6 pt-3 flex justify-between text-sm">
          <span className="text-muted">Payment</span>
          <span className="text-cream">{payLabel}</span>
        </div>
      </motion.div>

      {/* Instructions */}
      {order.paymentMethod === "inperson" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="bg-gold/6 border border-gold/15 rounded-2xl px-5 py-4 text-left"
        >
          <p className="text-cream text-sm font-semibold mb-1">Payment at pickup</p>
          <p className="text-stone text-sm">
            Please have your order number ready. We accept cash, Visa, Mastercard, and Amex at the counter.
          </p>
        </motion.div>
      )}

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex gap-3"
      >
        <Link
          href="/menu"
          className="flex-1 text-center py-3.5 rounded-xl border border-white/10 text-stone hover:text-cream hover:border-white/20 text-sm font-medium transition-all"
        >
          Order Again
        </Link>
        <Link
          href="/"
          className="flex-1 flex items-center justify-center gap-2 bg-brand hover:bg-flame text-cream font-semibold py-3.5 rounded-xl transition-all text-sm"
        >
          Back to Home <ArrowRight size={14} />
        </Link>
      </motion.div>
    </div>
  );
}
