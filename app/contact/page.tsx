import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Appetite Pizza. Find us, call us, or just come in.",
};

export default function ContactPage() {
  return (
    <>
      {/* Page hero */}
      <section className="pt-40 pb-20 bg-black border-b border-white/5">
        <Container>
          <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-5">
            Contact
          </p>
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-cream leading-[1.02] tracking-tight">
            Come Say Hello.
          </h1>
          <p className="text-stone text-lg md:text-xl mt-6 max-w-lg leading-relaxed">
            Questions, catering inquiries, feedback — we&apos;re real people and we actually read these.
          </p>
        </Container>
      </section>

      {/* Main content */}
      <section className="py-24 bg-black">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Info column */}
            <div>
              <h2 className="font-display text-2xl font-bold text-cream mb-6">Find Us</h2>
              <ContactInfo />
            </div>

            {/* Form column */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-cream mb-6">Send a Message</h2>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      {/* Map placeholder */}
      <section className="pb-24 bg-black">
        <Container>
          <div
            className="relative h-64 md:h-80 rounded-2xl overflow-hidden border border-white/5 flex items-center justify-center"
            style={{
              background:
                "radial-gradient(ellipse at 50% 60%, rgba(193,58,27,0.06) 0%, transparent 60%), #1a1714",
            }}
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-12 h-12 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center">
                <MapPin size={20} className="text-brand" />
              </div>
              <div>
                <p className="text-cream font-semibold text-sm">123 Main Street</p>
                <p className="text-stone text-xs mt-1">Your City, ON  A1B 2C3</p>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-brand hover:text-flame transition-colors border border-brand/20 hover:border-flame/30 rounded-full px-4 py-2"
              >
                Get Directions →
              </a>
            </div>

            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-white/8 rounded-tl" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-white/8 rounded-br" />
          </div>
        </Container>
      </section>
    </>
  );
}
