import type { CartItem } from "./cart";

export type OrderStep = "review" | "schedule" | "info" | "payment" | "confirmation";

export const STEP_META: { key: OrderStep; label: string }[] = [
  { key: "review", label: "Review" },
  { key: "schedule", label: "Pickup Time" },
  { key: "info", label: "Your Info" },
  { key: "payment", label: "Payment" },
];

export type PickupDate = {
  label: string;
  shortLabel: string;
  value: string; // YYYY-MM-DD
  isToday: boolean;
};

export type PickupTime = {
  label: string;
  value: string;
  isASAP?: boolean;
};

export type CustomerInfo = {
  name: string;
  phone: string;
  email: string;
  notes: string;
};

export type PaymentMethod = "online" | "inperson";
export type OnlinePaymentType = "apple" | "google" | "card";

export type PlacedOrder = {
  orderNumber: string;
  items: CartItem[];
  pickupDate: PickupDate;
  pickupTime: PickupTime;
  customer: CustomerInfo;
  paymentMethod: PaymentMethod;
  onlinePaymentType?: OnlinePaymentType;
  subtotal: number;
  tax: number;
  total: number;
  estimatedPrepMinutes: number;
  placedAt: Date;
};
