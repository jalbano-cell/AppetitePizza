import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { OrderFlow } from "@/components/order/OrderFlow";

export const metadata: Metadata = {
  title: "Order Pickup",
  description: "Order fresh pizza for pickup directly from Appetite Pizza.",
};

export default function OrderPage() {
  return (
    <section className="pt-32 pb-24 min-h-screen">
      <Container>
        <div className="mb-10">
          <p className="text-muted text-xs uppercase tracking-widest font-semibold mb-2">
            Appetite Pizza
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-cream">
            Order Pickup
          </h1>
        </div>
        <OrderFlow />
      </Container>
    </section>
  );
}
