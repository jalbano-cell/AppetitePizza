import type { Metadata } from "next";
import Image from "next/image";
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
      <section className="relative pt-44 pb-28 overflow-hidden bg-black">
        {/* Background photo */}
        <Image
          src="/menu-hero.jpg"
          alt="Pizza being placed into a wood-fired stone oven"
          fill
          priority
          quality={90}
          className="object-cover object-center"
        />

        {/* Dark overlays */}
        <div className="absolute inset-0 bg-black/65 pointer-events-none" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25 pointer-events-none" aria-hidden />

        {/* Bottom fade into menu content */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" aria-hidden />

        <Container className="relative z-10">
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
