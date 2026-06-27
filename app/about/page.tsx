import type { Metadata } from "next";
import { StorySection } from "@/components/about/StorySection";
import { ValuesSection } from "@/components/about/ValuesSection";
import { StatsSection } from "@/components/about/StatsSection";
import { TeamSection } from "@/components/about/TeamSection";
import { CTABanner } from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Appetite Pizza — who we are, what we stand for, and why we care so much about getting it right.",
  openGraph: {
    title: "About | Appetite Pizza",
    description: "The story behind Appetite — fresh dough, real ingredients, a stone oven we refuse to rush.",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Page hero */}
      <section className="pt-40 pb-20 bg-black border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-5">
            About Us
          </p>
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-cream leading-[1.02] tracking-tight max-w-4xl">
            We Make Pizza
            <br />
            <em className="text-brand not-italic">People Come Back</em> For.
          </h1>
          <p className="text-stone text-lg md:text-xl mt-6 max-w-xl leading-relaxed">
            Fresh dough. Real ingredients. A stone oven we refuse to rush.
            That&apos;s the whole story.
          </p>
        </div>
      </section>

      <StorySection />
      <ValuesSection />
      <StatsSection />
      <TeamSection />
      <CTABanner />
    </>
  );
}
