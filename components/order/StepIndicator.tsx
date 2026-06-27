"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { STEP_META, type OrderStep } from "@/types/order";

const FLOW_STEPS = STEP_META; // review → schedule → info → payment

export function StepIndicator({ current }: { current: OrderStep }) {
  const currentIdx = FLOW_STEPS.findIndex((s) => s.key === current);

  return (
    <div className="flex items-center gap-0">
      {FLOW_STEPS.map((step, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <div key={step.key} className="flex items-center flex-1 last:flex-none">
            {/* Dot */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300",
                  done && "border-brand bg-brand text-cream",
                  active && "border-brand bg-brand/15 text-brand",
                  !done && !active && "border-white/15 bg-transparent text-muted"
                )}
              >
                {done ? <Check size={13} strokeWidth={3} /> : <span>{i + 1}</span>}
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium hidden sm:block whitespace-nowrap",
                  active ? "text-cream" : done ? "text-stone" : "text-muted"
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {i < FLOW_STEPS.length - 1 && (
              <div className="flex-1 mx-2 mb-4">
                <div
                  className={cn(
                    "h-px transition-all duration-500",
                    done ? "bg-brand" : "bg-white/10"
                  )}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
