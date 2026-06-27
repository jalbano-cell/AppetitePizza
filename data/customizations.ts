import type { PriceOption } from "@/types/cart";

export const SIZES: PriceOption[] = [
  { label: '10" Small', priceAdd: 0 },
  { label: '12" Medium', priceAdd: 3 },
  { label: '14" Large', priceAdd: 5 },
  { label: '16" XL', priceAdd: 8 },
];

export const CRUSTS: PriceOption[] = [
  { label: "Thin Crust", priceAdd: 0 },
  { label: "Classic", priceAdd: 0 },
  { label: "Thick Crust", priceAdd: 0 },
  { label: "Stuffed Crust", priceAdd: 2 },
];

export const EXTRA_TOPPINGS: PriceOption[] = [
  { label: "Pepperoni", priceAdd: 1.5 },
  { label: "Italian Sausage", priceAdd: 1.5 },
  { label: "Bacon", priceAdd: 1.5 },
  { label: "Ham", priceAdd: 1.5 },
  { label: "Mushrooms", priceAdd: 1.5 },
  { label: "Green Peppers", priceAdd: 1.5 },
  { label: "Red Onion", priceAdd: 1.5 },
  { label: "Black Olives", priceAdd: 1.5 },
  { label: "Jalapeños", priceAdd: 1.5 },
  { label: "Pineapple", priceAdd: 1.5 },
  { label: "Anchovies", priceAdd: 1.5 },
  { label: "Extra Cheese", priceAdd: 2.0 },
];

export const COMBO_UPGRADES: PriceOption[] = [
  { label: "Add Garlic Bread", priceAdd: 5 },
  { label: "Add Chicken Wings", priceAdd: 12 },
  { label: "Add Caesar Salad", priceAdd: 9 },
  { label: "Add Mozzarella Sticks", priceAdd: 8 },
];

export const DIPS: PriceOption[] = [
  { label: "Garlic Butter", priceAdd: 0.75 },
  { label: "Ranch", priceAdd: 0.75 },
  { label: "Marinara", priceAdd: 0.75 },
  { label: "Buffalo", priceAdd: 0.75 },
  { label: "BBQ", priceAdd: 0.75 },
];

/** Item IDs that offer dip selection */
export const ITEMS_WITH_DIPS = new Set([
  "margherita", "pepperoni", "bbq-chicken", "four-cheese",
  "prosciutto", "diavola", "vegetariana", "the-works",
  "garlic-bread", "wings", "mozza-sticks",
]);
