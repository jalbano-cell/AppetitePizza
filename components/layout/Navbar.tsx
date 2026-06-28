"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";
import { useCart } from "@/context/CartContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, dispatch } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          scrolled
            ? "bg-black/92 backdrop-blur-xl border-b border-white/8 shadow-[0_1px_0_0_rgba(255,255,255,0.04)] py-0"
            : "bg-transparent py-2"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              aria-label="Appetite Pizza — Home"
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <Image
                src="/logo.png"
                alt="Appetite Pizza"
                width={309}
                height={101}
                className="h-10 w-auto"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200 relative",
                    pathname === link.href
                      ? "text-cream"
                      : "text-stone hover:text-cream"
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-brand rounded-full" aria-hidden />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA + Cart */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => dispatch({ type: "TOGGLE_CART" })}
                className="relative p-2.5 rounded-full hover:bg-white/8 text-stone hover:text-cream transition-colors"
                aria-label={itemCount > 0 ? `Open cart, ${itemCount} item${itemCount !== 1 ? "s" : ""}` : "Open cart"}
              >
                <ShoppingBag size={20} aria-hidden />
                {itemCount > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 bg-brand text-cream text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none"
                    aria-hidden
                  >
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </button>
              <Button href="/order" size="sm">
                Order Pickup
              </Button>
            </div>

            {/* Mobile: Cart + Hamburger */}
            <div className="md:hidden flex items-center gap-1">
              <button
                onClick={() => dispatch({ type: "TOGGLE_CART" })}
                className="relative p-2 text-stone hover:text-cream transition-colors"
                aria-label={itemCount > 0 ? `Open cart, ${itemCount} item${itemCount !== 1 ? "s" : ""}` : "Open cart"}
              >
                <ShoppingBag size={20} aria-hidden />
                {itemCount > 0 && (
                  <span
                    className="absolute top-0.5 right-0.5 bg-brand text-cream text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center leading-none"
                    aria-hidden
                  >
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </button>
              <button
                className="p-2 text-cream hover:text-cream/70 transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                <Menu size={22} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
