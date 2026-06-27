"use client";

import { useState } from "react";
import { CreditCard, Loader2, Lock, Store } from "lucide-react";
import type { PaymentMethod, OnlinePaymentType } from "@/types/order";
import { formatCardNumber, formatExpiry } from "@/lib/orderUtils";
import { formatPrice } from "@/types/cart";
import { cn } from "@/lib/utils";

type Props = {
  paymentMethod: PaymentMethod;
  onChangeMethod: (m: PaymentMethod) => void;
  total: number;
  onPlace: (type: OnlinePaymentType | undefined) => Promise<void>;
  onBack: () => void;
};

const inputClass =
  "w-full bg-black/40 border border-white/8 rounded-xl px-4 py-3 text-cream text-sm placeholder:text-muted/50 outline-none focus:border-brand/40 focus:ring-1 focus:ring-brand/20 transition-all font-mono";

// ── Express payment buttons ───────────────────────────────────────────────────

function ApplePayButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 bg-white text-black rounded-xl py-3.5 font-semibold text-sm hover:bg-white/90 transition-all"
    >
      {/* Apple logo (SVG) */}
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden>
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <span>Pay with Apple Pay</span>
    </button>
  );
}

function GooglePayButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 bg-[#1a73e8] hover:bg-[#1558b0] text-white rounded-xl py-3.5 font-semibold text-sm transition-all"
    >
      {/* Google "G" */}
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden>
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      <span>Pay with Google Pay</span>
    </button>
  );
}

// ── Card form ─────────────────────────────────────────────────────────────────

function CardForm({
  onSubmit,
  loading,
  total,
}: {
  onSubmit: () => void;
  loading: boolean;
  total: number;
}) {
  const [num, setNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [touched, setTouched] = useState({ num: false, expiry: false, cvc: false, name: false });

  const rawNum = num.replace(/\D/g, "");
  const rawExp = expiry.replace(/\D/g, "");

  const errors = {
    num: touched.num && rawNum.length < 16 ? "Enter a 16-digit card number" : "",
    expiry: touched.expiry && rawExp.length < 4 ? "Enter expiry as MM/YY" : "",
    cvc: touched.cvc && cvc.replace(/\D/g, "").length < 3 ? "Enter 3-digit CVC" : "",
    name: touched.name && !name.trim() ? "Enter name as it appears on card" : "",
  };

  const valid = rawNum.length === 16 && rawExp.length === 4 && cvc.replace(/\D/g, "").length >= 3 && !!name.trim();

  function handleSubmit() {
    setTouched({ num: true, expiry: true, cvc: true, name: true });
    if (valid) onSubmit();
  }

  return (
    <div className="space-y-4 mt-4">
      {/* Card number */}
      <div className="space-y-1.5">
        <label htmlFor="card-number" className="text-xs font-semibold uppercase tracking-widest text-muted">Card Number</label>
        <div className="relative">
          <input
            id="card-number"
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            value={num}
            onChange={(e) => setNum(formatCardNumber(e.target.value))}
            onBlur={() => setTouched((t) => ({ ...t, num: true }))}
            placeholder="1234 5678 9012 3456"
            aria-required="true"
            aria-invalid={!!errors.num}
            aria-describedby={errors.num ? "card-num-error" : undefined}
            className={cn(inputClass, "pr-12", errors.num && "border-red-500/40")}
          />
          <CreditCard size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
        </div>
        {errors.num && <p id="card-num-error" role="alert" className="text-red-400 text-xs">{errors.num}</p>}
      </div>

      {/* Expiry + CVC */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label htmlFor="card-expiry" className="text-xs font-semibold uppercase tracking-widest text-muted">Expiry</label>
          <input
            id="card-expiry"
            type="text"
            inputMode="numeric"
            autoComplete="cc-exp"
            value={expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            onBlur={() => setTouched((t) => ({ ...t, expiry: true }))}
            placeholder="MM/YY"
            aria-required="true"
            aria-invalid={!!errors.expiry}
            className={cn(inputClass, errors.expiry && "border-red-500/40")}
          />
          {errors.expiry && <p role="alert" className="text-red-400 text-[11px]">{errors.expiry}</p>}
        </div>
        <div className="space-y-1.5">
          <label htmlFor="card-cvc" className="text-xs font-semibold uppercase tracking-widest text-muted">CVC</label>
          <input
            id="card-cvc"
            type="text"
            inputMode="numeric"
            autoComplete="cc-csc"
            value={cvc}
            onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
            onBlur={() => setTouched((t) => ({ ...t, cvc: true }))}
            placeholder="123"
            aria-required="true"
            aria-invalid={!!errors.cvc}
            className={cn(inputClass, errors.cvc && "border-red-500/40")}
          />
          {errors.cvc && <p role="alert" className="text-red-400 text-[11px]">{errors.cvc}</p>}
        </div>
      </div>

      {/* Name on card */}
      <div className="space-y-1.5">
        <label htmlFor="card-name" className="text-xs font-semibold uppercase tracking-widest text-muted">Name on Card</label>
        <input
          id="card-name"
          type="text"
          autoComplete="cc-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          placeholder="Jane Smith"
          aria-required="true"
          aria-invalid={!!errors.name}
          className={cn(inputClass, "font-sans", errors.name && "border-red-500/40")}
        />
        {errors.name && <p role="alert" className="text-red-400 text-xs">{errors.name}</p>}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-brand hover:bg-flame disabled:opacity-50 text-cream font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-brand/20"
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <>
            <Lock size={14} />
            Pay {formatPrice(total)}
          </>
        )}
      </button>

      <p className="text-center text-muted text-[11px] flex items-center justify-center gap-1">
        <Lock size={10} /> Secured by Stripe · PCI DSS compliant
      </p>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function StepPayment({ paymentMethod, onChangeMethod, total, onPlace, onBack }: Props) {
  const [onlineType, setOnlineType] = useState<"express" | "card">("express");
  const [loading, setLoading] = useState(false);

  async function handlePlace(type?: OnlinePaymentType) {
    setLoading(true);
    await onPlace(type);
    setLoading(false);
  }

  return (
    <div className="space-y-7">
      <div>
        <h2 className="font-display text-2xl font-bold text-cream mb-1">How would you like to pay?</h2>
        <p className="text-stone text-sm">Your order total is{" "}
          <span className="text-cream font-semibold">{formatPrice(total)}</span> including HST.
        </p>
      </div>

      {/* Method toggle */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onChangeMethod("online")}
          className={cn(
            "flex flex-col items-center gap-2 py-5 rounded-2xl border transition-all",
            paymentMethod === "online"
              ? "border-brand bg-brand/10 text-cream"
              : "border-white/8 bg-white/3 text-stone hover:border-white/18"
          )}
        >
          <CreditCard size={20} />
          <span className="text-sm font-semibold">Pay Online</span>
        </button>
        <button
          onClick={() => onChangeMethod("inperson")}
          className={cn(
            "flex flex-col items-center gap-2 py-5 rounded-2xl border transition-all",
            paymentMethod === "inperson"
              ? "border-gold/40 bg-gold/8 text-cream"
              : "border-white/8 bg-white/3 text-stone hover:border-white/18"
          )}
        >
          <Store size={20} />
          <span className="text-sm font-semibold">Pay In Person</span>
        </button>
      </div>

      {/* Online payment */}
      {paymentMethod === "online" && (
        <div className="space-y-5">
          {/* Express options */}
          <div className="space-y-3">
            <ApplePayButton onClick={() => handlePlace("apple")} />
            <GooglePayButton onClick={() => handlePlace("google")} />
          </div>

          {/* Or pay with card */}
          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-xs text-muted font-medium">or pay with card</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          <CardForm
            onSubmit={() => handlePlace("card")}
            loading={loading}
            total={total}
          />
        </div>
      )}

      {/* In-person */}
      {paymentMethod === "inperson" && (
        <div className="space-y-5">
          <div className="bg-gold/6 border border-gold/15 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Store size={18} className="text-gold" />
              <p className="text-cream font-semibold">Pay when you arrive</p>
            </div>
            <p className="text-stone text-sm leading-relaxed">
              Your order will be ready at pickup. We accept{" "}
              <span className="text-cream">cash, Visa, Mastercard, and Amex</span> at the counter.
            </p>
          </div>

          <button
            onClick={() => handlePlace(undefined)}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gold/90 hover:bg-gold disabled:opacity-50 text-black font-bold py-4 rounded-xl transition-all shadow-lg shadow-gold/20"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : "Confirm Order"}
          </button>
        </div>
      )}

      {/* Back */}
      <button
        onClick={onBack}
        disabled={loading}
        className="w-full text-center text-sm text-muted hover:text-stone transition-colors"
      >
        ← Back to Your Info
      </button>
    </div>
  );
}
