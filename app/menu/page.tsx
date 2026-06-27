import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { MenuContent } from "@/components/menu/MenuContent";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse our full menu — wood-fired pizzas, sides, drinks, and desserts. All made fresh, fully customizable.",
  openGraph: {
    title: "Menu | Appetite Pizza",
    description: "Wood-fired pizzas, sides, drinks, and desserts. All made fresh to order.",
  },
};

export default function MenuPage() {
  return (
    <>
      {/* Page hero */}
      <section className="pt-40 pb-16 bg-black border-b border-white/5">
        <Container>
          <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-5">
            The Menu
          </p>
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-cream leading-[1.02] tracking-tight">
            Straight From
            <br />
            <em className="text-brand not-italic">The Oven.</em>
          </h1>
          <p className="text-stone text-lg md:text-xl mt-6 max-w-xl leading-relaxed">
            Everything made to order. Customize to your heart&apos;s content.
            Sizes, toppings, extras — it&apos;s your pizza.
          </p>
        </Container>
      </section>

      {/* Menu with sticky filter */}
      <section className="bg-black min-h-screen">
        <MenuContent />
      </section>
    </>
  );
}
