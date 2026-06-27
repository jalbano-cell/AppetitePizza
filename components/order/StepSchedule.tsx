"use client";

import { useState, useEffect, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { generatePickupDates, generatePickupTimes } from "@/lib/orderUtils";
import type { PickupDate, PickupTime } from "@/types/order";
import { cn } from "@/lib/utils";

type Props = {
  pickupDate: PickupDate | null;
  pickupTime: PickupTime | null;
  onChangDate: (d: PickupDate) => void;
  onChangeTime: (t: PickupTime) => void;
  onNext: () => void;
  onBack: () => void;
};

export function StepSchedule({ pickupDate, pickupTime, onChangDate, onChangeTime, onNext, onBack }: Props) {
  const dates = useMemo(() => generatePickupDates(), []);
  const times = useMemo(
    () => (pickupDate ? generatePickupTimes(pickupDate.isToday) : []),
    [pickupDate]
  );

  // Auto-select first time when date changes
  useEffect(() => {
    if (times.length > 0 && !pickupTime) {
      onChangeTime(times[0]);
    }
  }, [times]);

  const canProceed = !!pickupDate && !!pickupTime;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-bold text-cream mb-1">When do you want it?</h2>
        <p className="text-stone text-sm">Choose a pickup date and time.</p>
      </div>

      {/* Date picker */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">Date</p>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {dates.map((d) => (
            <button
              key={d.value}
              onClick={() => { onChangDate(d); onChangeTime(null as any); }}
              className={cn(
                "flex flex-col items-center justify-center py-3 px-1 rounded-xl border text-xs font-medium transition-all",
                pickupDate?.value === d.value
                  ? "border-brand bg-brand/12 text-cream"
                  : "border-white/8 bg-white/3 text-stone hover:border-white/18 hover:text-cream"
              )}
            >
              <span className="font-semibold">{d.shortLabel}</span>
              {!d.isToday && d.label !== "Tomorrow" && (
                <span className="text-[10px] text-muted mt-0.5 hidden sm:block">
                  {d.label.split(", ")[1] ?? ""}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Time picker */}
      {pickupDate && (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">Time</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-1">
            {times.map((t) => (
              <button
                key={t.value}
                onClick={() => onChangeTime(t)}
                className={cn(
                  "py-3 px-4 rounded-xl border text-sm font-medium transition-all text-left",
                  pickupTime?.value === t.value
                    ? "border-brand bg-brand/12 text-cream"
                    : "border-white/8 bg-white/3 text-stone hover:border-white/18 hover:text-cream",
                  t.isASAP && "font-semibold"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="px-5 py-3.5 rounded-xl border border-white/10 text-stone hover:text-cream hover:border-white/20 text-sm font-medium transition-all"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="flex-1 flex items-center justify-between bg-brand hover:bg-flame disabled:opacity-40 disabled:cursor-not-allowed text-cream font-semibold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-brand/20 hover:shadow-flame/25 group"
        >
          <span>Continue</span>
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
