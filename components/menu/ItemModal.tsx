"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { QuantitySelector } from "./QuantitySelector";
import {
  SIZES, CRUSTS, EXTRA_TOPPINGS, COMBO_UPGRADES, DIPS, ITEMS_WITH_DIPS,
} from "@/data/customizations";
import { PIZZA_DEFAULT_TOPPINGS } from "@/data/pizzaToppings";
import { cn } from "@/lib/utils";
import {
  EMPTY_CUSTOMIZATION, calcUnitPrice, formatPrice,
  type CartCustomization, type PriceOption,
} from "@/types/cart";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useFocusTrap } from "@/hooks/useFocusTrap";

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-cream text-sm font-semibold whitespace-nowrap">{title}</span>
        <div className="flex-1 h-px bg-white/6" />
      </div>
      {children}
    </div>
  );
}

// ─── Pill button ──────────────────────────────────────────────────────────────

function Pill({
  label,
  sub,
  selected,
  onClick,
}: {
  label: string;
  sub?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center px-3 py-2.5 rounded-xl border text-xs font-medium transition-all",
        selected
          ? "border-brand bg-brand/12 text-cream"
          : "border-white/8 bg-white/3 text-stone hover:border-white/18 hover:text-cream"
      )}
    >
      <span>{label}</span>
      {sub && (
        <span className={selected ? "text-brand/80 mt-0.5" : "text-muted mt-0.5"}>{sub}</span>
      )}
    </button>
  );
}

// ─── Topping chip ─────────────────────────────────────────────────────────────

function ToppingChip({
  label,
  selected,
  strikethrough,
  sub,
  onClick,
}: {
  label: string;
  selected: boolean;
  strikethrough?: boolean;
  sub?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border text-xs transition-all text-left",
        selected && !strikethrough && "border-brand bg-brand/10 text-cream",
        selected && strikethrough && "border-red-500/30 bg-red-500/8 text-red-400",
        !selected && "border-white/8 bg-white/3 text-stone hover:border-white/15 hover:text-cream"
      )}
    >
      <span className={cn(selected && strikethrough && "line-through")}>{label}</span>
      <span className={cn(
        "flex-shrink-0",
        selected && !strikethrough && "text-brand",
        selected && strikethrough && "text-red-400/70",
        !selected && "text-muted"
      )}>
        {selected && !strikethrough && <Check size={11} />}
        {selected && strikethrough && "✕"}
        {!selected && sub}
      </span>
    </button>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

export function ItemModal() {
  const { state, dispatch } = useCart();
  const item = state.selectedItem;
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isOpen = !!item;
  const trapRef = useFocusTrap<HTMLDivElement>(isOpen);
  const previousFocus = useRef<HTMLElement | null>(null);

  const [qty, setQty] = useState(1);
  const [custom, setCustom] = useState<CartCustomization>(EMPTY_CUSTOMIZATION);

  // Reset state and save/restore focus
  useEffect(() => {
    if (item) {
      previousFocus.current = document.activeElement as HTMLElement;
      setQty(1);
      setCustom({
        ...EMPTY_CUSTOMIZATION,
        size: item.category === "Pizza" ? SIZES[1] : undefined,
        crust: item.category === "Pizza" ? CRUSTS[1] : undefined,
      });
    } else {
      previousFocus.current?.focus();
    }
  }, [item?.id]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = item ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [item]);

  const close = useCallback(() => dispatch({ type: "CLOSE_ITEM_MODAL" }), [dispatch]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && close();
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close, isOpen]);

  if (!item) return null;

  const isPizza = item.category === "Pizza";
  const hasDip = ITEMS_WITH_DIPS.has(item.id);
  const defaultToppings = isPizza ? (PIZZA_DEFAULT_TOPPINGS[item.id] ?? []) : [];

  const unitPrice = calcUnitPrice(item.price, custom);
  const totalPrice = unitPrice * qty;

  const set = <K extends keyof CartCustomization>(key: K, val: CartCustomization[K]) =>
    setCustom((p) => ({ ...p, [key]: val }));

  function toggleExtra(opt: PriceOption) {
    const has = custom.extras.some((e) => e.label === opt.label);
    set("extras", has ? custom.extras.filter((e) => e.label !== opt.label) : [...custom.extras, opt]);
  }

  function toggleRemoved(topping: string) {
    const has = custom.removed.includes(topping);
    set("removed", has ? custom.removed.filter((r) => r !== topping) : [...custom.removed, topping]);
  }

  function addToCart() {
    if (!item) return;
    const cartId = `${item.id}-${Date.now().toString(36)}`;
    dispatch({
      type: "ADD_ITEM",
      item: {
        cartId,
        menuItemId: item.id,
        name: item.name,
        category: item.category,
        accentColor: item.accentColor,
        basePrice: item.price,
        quantity: qty,
        customizations: custom,
        unitPrice,
      },
    });
  }

  const overlayAnim = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
  const panelAnim = isDesktop
    ? { initial: { opacity: 0, scale: 0.95, y: 10 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 10 } }
    : { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } };

  return (
    <AnimatePresence>
      {item && (
        <div
          className="fixed inset-0 z-[60] flex items-end md:items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={`Customize ${item?.name}`}
        >
          {/* Backdrop */}
          <motion.div
            {...overlayAnim}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            ref={trapRef}
            {...panelAnim}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className={cn(
              "relative z-10 bg-charcoal border-white/8 flex flex-col shadow-2xl",
              isDesktop
                ? "w-full max-w-lg rounded-2xl border max-h-[88vh]"
                : "w-full rounded-t-3xl border-t max-h-[93vh]"
            )}
          >
            {/* Drag handle (mobile) */}
            {!isDesktop && (
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-white/10" />
              </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/6 flex-shrink-0">
              <div className="flex-1 min-w-0 pr-3">
                <h2 className="font-display text-xl font-bold text-cream truncate">{item.name}</h2>
                <p className="text-muted text-xs mt-0.5">{item.category}</p>
              </div>
              <button
                onClick={close}
                className="w-8 h-8 rounded-full bg-white/6 hover:bg-white/12 flex items-center justify-center text-stone hover:text-cream transition-colors flex-shrink-0"
                aria-label="Close customization"
              >
                <X size={16} aria-hidden />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {/* Image + description */}
              <div className="h-44 relative flex-shrink-0 bg-black overflow-hidden">
                <Image
                  src={`/menu/${item.id}.jpg`}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>

              <div className="px-5 pt-5 pb-3 space-y-1">
                <p className="font-display text-2xl font-bold text-cream">
                  {formatPrice(item.price)}
                </p>
                <p className="text-stone text-sm leading-relaxed">{item.description}</p>
              </div>

              <div className="px-5 pb-6 space-y-6">
                {/* ── Size ── */}
                {isPizza && (
                  <Section title="Size">
                    <div className="grid grid-cols-4 gap-2">
                      {SIZES.map((s) => (
                        <Pill
                          key={s.label}
                          label={s.label.split('"')[0] + '"'}
                          sub={s.priceAdd > 0 ? `+$${s.priceAdd}` : "base"}
                          selected={custom.size?.label === s.label}
                          onClick={() => set("size", s)}
                        />
                      ))}
                    </div>
                  </Section>
                )}

                {/* ── Crust ── */}
                {isPizza && (
                  <Section title="Crust">
                    <div className="grid grid-cols-2 gap-2">
                      {CRUSTS.map((c) => (
                        <Pill
                          key={c.label}
                          label={c.label}
                          sub={c.priceAdd > 0 ? `+$${c.priceAdd}` : undefined}
                          selected={custom.crust?.label === c.label}
                          onClick={() => set("crust", c)}
                        />
                      ))}
                    </div>
                  </Section>
                )}

                {/* ── Remove Toppings ── */}
                {isPizza && defaultToppings.length > 0 && (
                  <Section title="Remove Toppings">
                    <div className="grid grid-cols-2 gap-2">
                      {defaultToppings.map((t) => (
                        <ToppingChip
                          key={t}
                          label={t}
                          selected={custom.removed.includes(t)}
                          strikethrough
                          onClick={() => toggleRemoved(t)}
                        />
                      ))}
                    </div>
                    <p className="text-muted text-[11px]">Tap a topping to remove it</p>
                  </Section>
                )}

                {/* ── Extra Toppings ── */}
                {isPizza && (
                  <Section title="Extra Toppings">
                    <div className="grid grid-cols-2 gap-2">
                      {EXTRA_TOPPINGS.map((t) => (
                        <ToppingChip
                          key={t.label}
                          label={t.label}
                          selected={custom.extras.some((e) => e.label === t.label)}
                          sub={`+$${t.priceAdd}`}
                          onClick={() => toggleExtra(t)}
                        />
                      ))}
                    </div>
                  </Section>
                )}

                {/* ── Combo Upgrade ── */}
                {isPizza && (
                  <Section title="Upgrade to a Combo">
                    <div className="space-y-2">
                      <button
                        onClick={() => set("combo", undefined)}
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all",
                          !custom.combo
                            ? "border-brand bg-brand/10 text-cream"
                            : "border-white/8 bg-white/3 text-stone hover:border-white/15"
                        )}
                      >
                        <span className="font-medium">No Combo</span>
                        {!custom.combo && <Check size={14} className="text-brand" />}
                      </button>
                      {COMBO_UPGRADES.map((c) => (
                        <button
                          key={c.label}
                          onClick={() => set("combo", custom.combo?.label === c.label ? undefined : c)}
                          className={cn(
                            "w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all",
                            custom.combo?.label === c.label
                              ? "border-brand bg-brand/10 text-cream"
                              : "border-white/8 bg-white/3 text-stone hover:border-white/15 hover:text-cream"
                          )}
                        >
                          <span className="font-medium">{c.label}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-muted text-xs">+${c.priceAdd}</span>
                            {custom.combo?.label === c.label && <Check size={14} className="text-brand" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </Section>
                )}

                {/* ── Dip ── */}
                {hasDip && (
                  <Section title="Add a Dip">
                    <div className="grid grid-cols-3 gap-2">
                      {DIPS.map((d) => (
                        <Pill
                          key={d.label}
                          label={d.label}
                          sub={`+$${d.priceAdd}`}
                          selected={custom.dip?.label === d.label}
                          onClick={() =>
                            set("dip", custom.dip?.label === d.label ? undefined : d)
                          }
                        />
                      ))}
                    </div>
                  </Section>
                )}

                {/* ── Kitchen Notes ── */}
                <Section title="Notes for Kitchen">
                  <textarea
                    rows={2}
                    value={custom.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    placeholder="Allergies, special requests…"
                    className="w-full bg-black/40 border border-white/8 rounded-xl px-4 py-3 text-cream text-sm placeholder:text-muted outline-none focus:border-brand/40 focus:ring-1 focus:ring-brand/20 transition-all resize-none leading-relaxed"
                  />
                </Section>
              </div>
            </div>

            {/* Sticky footer */}
            <div className="flex-shrink-0 px-5 py-4 border-t border-white/6 bg-charcoal flex items-center gap-4">
              <QuantitySelector value={qty} onChange={setQty} />
              <button
                onClick={addToCart}
                className="flex-1 flex items-center justify-between gap-3 bg-brand hover:bg-flame text-cream font-semibold px-5 py-3 rounded-xl transition-all shadow-lg shadow-brand/20 hover:shadow-flame/25"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag size={16} />
                  Add to Cart
                </span>
                <span>{formatPrice(totalPrice)}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
