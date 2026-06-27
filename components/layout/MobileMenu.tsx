"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { useFocusTrap } from "@/hooks/useFocusTrap";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const trapRef = useFocusTrap<HTMLDivElement>(open);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on route change
  useEffect(() => { onClose(); }, [pathname]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm md:hidden"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            ref={trapRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-charcoal border-l border-white/5 md:hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <Image
                src="/logo-white.png"
                alt="Appetite Pizza"
                width={130}
                height={40}
                className="h-8 w-auto"
              />
              <button
                onClick={onClose}
                className="p-2 text-stone hover:text-cream transition-colors rounded-lg hover:bg-white/5"
                aria-label="Close navigation menu"
              >
                <X size={20} aria-hidden />
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="flex-1 flex flex-col p-6 gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className="block py-4 text-lg font-medium text-cream/70 hover:text-cream border-b border-white/5 transition-colors aria-[current=page]:text-cream"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="p-6 border-t border-white/5">
              <Button href="/order" size="lg" className="w-full justify-center">
                Order Pickup
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
