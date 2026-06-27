"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import type {
  OrderStep, CustomerInfo, PaymentMethod, PlacedOrder, PickupDate, PickupTime, OnlinePaymentType,
} from "@/types/order";
import { generateOrderNumber } from "@/lib/orderUtils";
import { StepIndicator } from "./StepIndicator";
import { StepReview } from "./StepReview";
import { StepSchedule } from "./StepSchedule";
import { StepCustomerInfo } from "./StepCustomerInfo";
import { StepPayment } from "./StepPayment";
import { OrderConfirmation } from "./OrderConfirmation";
import { OrderSummaryPanel } from "./OrderSummaryPanel";

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

const STEPS: OrderStep[] = ["review", "schedule", "info", "payment"];

export function OrderFlow() {
  const { state: cartState, subtotal, tax, total, dispatch } = useCart();

  const [step, setStep] = useState<OrderStep>("review");
  const [direction, setDirection] = useState(1);
  const [pickupDate, setPickupDate] = useState<PickupDate | null>(null);
  const [pickupTime, setPickupTime] = useState<PickupTime | null>(null);
  const [customer, setCustomer] = useState<CustomerInfo>({ name: "", phone: "", email: "", notes: "" });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("online");
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  function go(next: OrderStep) {
    const cur = STEPS.indexOf(step);
    const nxt = STEPS.indexOf(next);
    setDirection(nxt > cur ? 1 : -1);
    setStep(next);
  }

  async function handlePlaceOrder(type?: OnlinePaymentType) {
    // Simulate network delay (replace with real Stripe call from lib/stripe.ts)
    await new Promise((r) => setTimeout(r, 1500));

    const order: PlacedOrder = {
      orderNumber: generateOrderNumber(),
      items: [...cartState.items],
      pickupDate: pickupDate!,
      pickupTime: pickupTime!,
      customer,
      paymentMethod,
      onlinePaymentType: type,
      subtotal,
      tax,
      total,
      estimatedPrepMinutes: 15 + Math.floor(cartState.items.length * 2.5),
      placedAt: new Date(),
    };

    dispatch({ type: "CLEAR_CART" });
    setPlacedOrder(order);
    setStep("confirmation");
  }

  const showSidebar = step !== "review" && step !== "confirmation";

  if (step === "confirmation" && placedOrder) {
    return (
      <div className="max-w-xl mx-auto">
        <OrderConfirmation order={placedOrder} />
      </div>
    );
  }

  return (
    <div className="flex gap-10 items-start">
      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Back + step indicator */}
        <div className="flex items-center gap-4 mb-8">
          {step !== "review" ? (
            <button
              onClick={() => {
                const prev = STEPS[STEPS.indexOf(step) - 1];
                if (prev) go(prev);
              }}
              className="p-2 rounded-full hover:bg-white/6 text-stone hover:text-cream transition-colors flex-shrink-0"
              aria-label="Go back"
            >
              <ArrowLeft size={18} />
            </button>
          ) : (
            <Link
              href="/menu"
              className="p-2 rounded-full hover:bg-white/6 text-stone hover:text-cream transition-colors flex-shrink-0"
              aria-label="Back to menu"
            >
              <ArrowLeft size={18} />
            </Link>
          )}
          <div className="flex-1">
            <StepIndicator current={step} />
          </div>
        </div>

        {/* Animated step content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === "review" && (
              <StepReview onNext={() => go("schedule")} />
            )}
            {step === "schedule" && (
              <StepSchedule
                pickupDate={pickupDate}
                pickupTime={pickupTime}
                onChangDate={setPickupDate}
                onChangeTime={setPickupTime}
                onNext={() => go("info")}
                onBack={() => go("review")}
              />
            )}
            {step === "info" && (
              <StepCustomerInfo
                info={customer}
                onChange={setCustomer}
                onNext={() => go("payment")}
                onBack={() => go("schedule")}
              />
            )}
            {step === "payment" && (
              <StepPayment
                paymentMethod={paymentMethod}
                onChangeMethod={setPaymentMethod}
                total={total}
                onPlace={handlePlaceOrder}
                onBack={() => go("info")}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sticky summary panel — desktop only, steps 2-4 */}
      {showSidebar && (
        <div className="hidden lg:block w-80 flex-shrink-0 sticky top-32">
          <OrderSummaryPanel pickupDate={pickupDate} pickupTime={pickupTime} />
        </div>
      )}
    </div>
  );
}
