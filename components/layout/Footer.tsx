import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { HalalSeal } from "@/components/shared/HalalSeal";
import { FOOTER_LINKS, SITE_NAME } from "@/lib/constants";

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal border-t border-white/5">
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              aria-label="Appetite Pizza — Home"
              className="block mb-4 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/logo.png"
                alt="Appetite Pizza"
                width={180}
                height={59}
                className="h-9 w-auto"
              />
            </Link>
            <p className="text-stone text-sm leading-relaxed max-w-xs">
              Handcrafted pizza made for pickup. Skip the fees. Taste the difference.
            </p>
            <div className="flex gap-2 mt-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 flex items-center justify-center text-stone hover:text-cream transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>

            {/* Halal certification seal */}
            <div className="mt-8 flex items-center gap-3">
              <HalalSeal size={48} />
              <div>
                <p className="text-green-400 text-xs font-semibold leading-tight">Halal Certified</p>
                <p className="text-green-100/40 text-[11px] leading-tight mt-0.5">All meats certified &amp; ethically sourced</p>
              </div>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-cream text-xs font-semibold uppercase tracking-widest mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.explore.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-stone hover:text-cream text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Order */}
          <div>
            <h4 className="text-cream text-xs font-semibold uppercase tracking-widest mb-5">
              Order
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.order.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-stone hover:text-cream text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-cream text-xs font-semibold uppercase tracking-widest mb-5">
              Legal
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.legal.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-stone hover:text-cream text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-stone text-sm">
            © {year} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-muted text-sm">Made with care. Served with pride.</p>
        </div>
      </Container>
    </footer>
  );
}
