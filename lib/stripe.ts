// Stripe integration — ready to activate.
//
// To go live:
//   npm install @stripe/stripe-js @stripe/react-stripe-js
//   Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in .env.local
//   Set STRIPE_SECRET_KEY in .env.local (server only)
//   Uncomment the real implementations below and remove the stubs.

export const STRIPE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";

// ── Client-side Stripe loader ─────────────────────────────────────────────────
// Replace with:
//   import { loadStripe } from "@stripe/stripe-js";
//   return loadStripe(STRIPE_PUBLISHABLE_KEY);
export async function getStripe() {
  // const { loadStripe } = await import("@stripe/stripe-js");
  // return loadStripe(STRIPE_PUBLISHABLE_KEY);
  return null;
}

// ── Payment Intent ────────────────────────────────────────────────────────────
// Replace with a call to your /api/stripe/create-payment-intent route.
// That route calls: stripe.paymentIntents.create({ amount, currency: "cad" })
export async function createPaymentIntent(totalCents: number): Promise<{ clientSecret: string | null }> {
  // const res = await fetch("/api/stripe/create-payment-intent", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ amount: totalCents }),
  // });
  // return res.json();
  return { clientSecret: null };
}

// ── Payment Request (Apple Pay / Google Pay) ──────────────────────────────────
// Replace with:
//   const stripe = await getStripe();
//   return stripe?.paymentRequest({
//     country: "CA", currency: "cad",
//     total: { label: "Appetite Pizza", amount: totalCents },
//     requestPayerName: true, requestPayerPhone: true,
//   }) ?? null;
export async function createPaymentRequest(_totalCents: number) {
  return null;
}

// ── Confirm Card Payment ──────────────────────────────────────────────────────
// Replace with:
//   const stripe = await getStripe();
//   return stripe?.confirmCardPayment(clientSecret, {
//     payment_method: { card: elements.getElement(CardNumberElement) },
//   });
export async function confirmCardPayment(_clientSecret: string) {
  return { error: null, paymentIntent: { status: "succeeded" } };
}
