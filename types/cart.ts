import type { MenuItem } from "@/data/menu";

export type PriceOption = {
  label: string;
  priceAdd: number;
};

export type CartCustomization = {
  size?: PriceOption;
  crust?: PriceOption;
  extras: PriceOption[];
  removed: string[];
  combo?: PriceOption;
  dip?: PriceOption;
  notes: string;
};

export type CartItem = {
  cartId: string;
  menuItemId: string;
  name: string;
  category: string;
  accentColor: string;
  basePrice: number;
  quantity: number;
  customizations: CartCustomization;
  unitPrice: number; // base + all customization additions
};

export type CartState = {
  items: CartItem[];
  isOpen: boolean;
  selectedItem: MenuItem | null;
};

export type CartAction =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; cartId: string }
  | { type: "UPDATE_QUANTITY"; cartId: string; quantity: number }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_ITEM_MODAL"; item: MenuItem }
  | { type: "CLOSE_ITEM_MODAL" }
  | { type: "CLEAR_CART" };

export const EMPTY_CUSTOMIZATION: CartCustomization = {
  size: undefined,
  crust: undefined,
  extras: [],
  removed: [],
  combo: undefined,
  dip: undefined,
  notes: "",
};

export const HST_RATE = 0.13;

export function calcUnitPrice(basePrice: number, c: CartCustomization): number {
  return (
    basePrice +
    (c.size?.priceAdd ?? 0) +
    (c.crust?.priceAdd ?? 0) +
    c.extras.reduce((s, e) => s + e.priceAdd, 0) +
    (c.combo?.priceAdd ?? 0) +
    (c.dip?.priceAdd ?? 0)
  );
}

export function summarizeCustomizations(c: CartCustomization): string {
  const parts: string[] = [];
  if (c.size) parts.push(c.size.label);
  if (c.crust) parts.push(c.crust.label);
  if (c.extras.length > 0) parts.push(c.extras.map((e) => `+${e.label}`).join(", "));
  if (c.removed.length > 0) parts.push(c.removed.map((r) => `No ${r}`).join(", "));
  if (c.combo) parts.push(c.combo.label);
  if (c.dip) parts.push(c.dip.label);
  return parts.join(" · ");
}

export function formatPrice(n: number): string {
  return `$${n.toFixed(2)}`;
}
