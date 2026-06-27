import { Hero } from "@/components/home/Hero";
import { FeatureStrip } from "@/components/home/FeatureStrip";
import { MenuPreview } from "@/components/home/MenuPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { DeliveryPartners } from "@/components/home/DeliveryPartners";
import { CTABanner } from "@/components/home/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <MenuPreview />
      <Testimonials />
      <DeliveryPartners />
      <CTABanner />
    </>
  );
}
