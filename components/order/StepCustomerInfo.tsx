"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { CustomerInfo } from "@/types/order";
import { formatPhone } from "@/lib/orderUtils";
import { cn } from "@/lib/utils";

type Props = {
  info: CustomerInfo;
  onChange: (info: CustomerInfo) => void;
  onNext: () => void;
  onBack: () => void;
};

const inputClass =
  "w-full bg-black/40 border border-white/8 rounded-xl px-4 py-3 text-cream text-sm placeholder:text-muted/50 outline-none focus:border-brand/40 focus:ring-1 focus:ring-brand/20 transition-all";

const errorInputClass = "border-red-500/40 focus:border-red-500/60 focus:ring-red-500/20";

export function StepCustomerInfo({ info, onChange, onNext, onBack }: Props) {
  const [touched, setTouched] = useState({ name: false, phone: false });

  const set = (k: keyof CustomerInfo, v: string) => onChange({ ...info, [k]: v });

  const nameErr = touched.name && !info.name.trim() ? "Name is required" : "";
  const phoneErr =
    touched.phone && info.phone.replace(/\D/g, "").length < 10
      ? "Enter a valid 10-digit phone number"
      : "";

  const canProceed = !!info.name.trim() && info.phone.replace(/\D/g, "").length === 10;

  function handleNext() {
    setTouched({ name: true, phone: true });
    if (canProceed) onNext();
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-bold text-cream mb-1">Your details</h2>
        <p className="text-stone text-sm">So we know when your order is ready.</p>
      </div>

      <div className="space-y-5">
        {/* Name */}
        <div className="space-y-1.5">
          <label htmlFor="customer-name" className="text-xs font-semibold uppercase tracking-widest text-muted flex items-center gap-1.5">
            Name <span className="text-brand" aria-hidden>*</span>
          </label>
          <input
            id="customer-name"
            type="text"
            autoComplete="name"
            value={info.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            placeholder="Jane Smith"
            aria-required="true"
            aria-invalid={!!nameErr}
            aria-describedby={nameErr ? "name-error" : undefined}
            className={cn(inputClass, nameErr && errorInputClass)}
          />
          {nameErr && <p id="name-error" role="alert" className="text-red-400 text-xs">{nameErr}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label htmlFor="customer-phone" className="text-xs font-semibold uppercase tracking-widest text-muted flex items-center gap-1.5">
            Phone <span className="text-brand" aria-hidden>*</span>
          </label>
          <input
            id="customer-phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={info.phone}
            onChange={(e) => set("phone", formatPhone(e.target.value))}
            onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
            placeholder="(416) 555-0100"
            aria-required="true"
            aria-invalid={!!phoneErr}
            aria-describedby={phoneErr ? "phone-error" : undefined}
            className={cn(inputClass, phoneErr && errorInputClass)}
          />
          {phoneErr && <p id="phone-error" role="alert" className="text-red-400 text-xs">{phoneErr}</p>}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="customer-email" className="text-xs font-semibold uppercase tracking-widest text-muted">
            Email <span className="text-muted/60 text-[10px] normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="customer-email"
            type="email"
            autoComplete="email"
            value={info.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="jane@example.com"
            className={inputClass}
          />
        </div>

        {/* Notes */}
        <div className="space-y-1.5">
          <label htmlFor="customer-notes" className="text-xs font-semibold uppercase tracking-widest text-muted">
            Order Notes <span className="text-muted/60 text-[10px] normal-case tracking-normal">(optional)</span>
          </label>
          <textarea
            id="customer-notes"
            rows={3}
            value={info.notes}
            onChange={(e) => set("notes", e.target.value)}
            placeholder="Allergies, special requests, extra napkins…"
            className={cn(inputClass, "resize-none leading-relaxed")}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-3.5 rounded-xl border border-white/10 text-stone hover:text-cream hover:border-white/20 text-sm font-medium transition-all"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="flex-1 flex items-center justify-between bg-brand hover:bg-flame text-cream font-semibold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-brand/20 hover:shadow-flame/25 group"
        >
          <span>Choose Payment</span>
          <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
