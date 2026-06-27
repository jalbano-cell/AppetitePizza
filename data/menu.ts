export type MenuCategory = "All" | "Pizza" | "Sides" | "Drinks" | "Desserts";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Exclude<MenuCategory, "All">;
  tags: string[];
  featured?: boolean;
  popular?: boolean;
  customizable?: boolean;
  accentColor: string;
};

export const MENU_CATEGORIES: MenuCategory[] = ["All", "Pizza", "Sides", "Drinks", "Desserts"];

export const MENU_ITEMS: MenuItem[] = [
  // ── Pizzas ──────────────────────────────────────────────────────────
  {
    id: "margherita",
    name: "Margherita",
    description: "San Marzano tomato, buffalo mozzarella, fresh basil, extra virgin olive oil",
    price: 14,
    category: "Pizza",
    tags: ["Vegetarian"],
    popular: true,
    customizable: true,
    accentColor: "#C13A1B",
  },
  {
    id: "pepperoni",
    name: "Classic Pepperoni",
    description: "Rich tomato base, mozzarella, house-made pepperoni, cracked chili flakes",
    price: 16,
    category: "Pizza",
    tags: [],
    popular: true,
    customizable: true,
    accentColor: "#C13A1B",
  },
  {
    id: "bbq-chicken",
    name: "BBQ Chicken",
    description: "Smoky BBQ base, roasted chicken, red onion, fresh cilantro, mozzarella",
    price: 18,
    category: "Pizza",
    tags: [],
    featured: true,
    customizable: true,
    accentColor: "#D4A820",
  },
  {
    id: "four-cheese",
    name: "Four Cheese",
    description: "Mozzarella, gorgonzola, taleggio, aged parmesan, finished with a honey drizzle",
    price: 18,
    category: "Pizza",
    tags: ["Vegetarian"],
    customizable: true,
    accentColor: "#D4A820",
  },
  {
    id: "prosciutto",
    name: "Prosciutto & Arugula",
    description: "White base, prosciutto di Parma, wild arugula, shaved parmesan, lemon zest",
    price: 22,
    category: "Pizza",
    tags: ["Premium"],
    featured: true,
    customizable: true,
    accentColor: "#C13A1B",
  },
  {
    id: "diavola",
    name: "Diavola",
    description: "Spicy 'nduja, crushed tomato, mozzarella, Calabrian chili, wildflower honey",
    price: 18,
    category: "Pizza",
    tags: ["Spicy"],
    customizable: true,
    accentColor: "#E85422",
  },
  {
    id: "vegetariana",
    name: "Vegetariana",
    description: "Roasted zucchini, peppers, red onion, olives, feta, cherry tomato confit",
    price: 16,
    category: "Pizza",
    tags: ["Vegetarian", "Vegan Option"],
    customizable: true,
    accentColor: "#4A7C59",
  },
  {
    id: "the-works",
    name: "The Works",
    description: "Every topping we have. You know the one. You've thought about it before.",
    price: 21,
    category: "Pizza",
    tags: [],
    popular: true,
    customizable: true,
    accentColor: "#C13A1B",
  },

  // ── Sides ────────────────────────────────────────────────────────────
  {
    id: "garlic-bread",
    name: "Garlic Bread",
    description: "Stone-baked with house garlic butter and fresh herbs",
    price: 6,
    category: "Sides",
    tags: ["Vegetarian"],
    popular: true,
    customizable: false,
    accentColor: "#D4A820",
  },
  {
    id: "wings",
    name: "Chicken Wings",
    description: "Crispy wings — buffalo, honey garlic, or BBQ. Your call.",
    price: 14,
    category: "Sides",
    tags: [],
    popular: true,
    customizable: true,
    accentColor: "#D4A820",
  },
  {
    id: "caesar",
    name: "Caesar Salad",
    description: "Romaine, house Caesar dressing, parmesan crisps, anchovy optional",
    price: 11,
    category: "Sides",
    tags: ["Vegetarian"],
    customizable: true,
    accentColor: "#D4A820",
  },
  {
    id: "mozza-sticks",
    name: "Mozzarella Sticks",
    description: "Golden-fried pulled mozzarella, served with house marinara",
    price: 9,
    category: "Sides",
    tags: ["Vegetarian"],
    customizable: false,
    accentColor: "#D4A820",
  },

  // ── Drinks ───────────────────────────────────────────────────────────
  {
    id: "pop",
    name: "Pop (Can)",
    description: "Coke, Diet Coke, Sprite, or Ginger Ale",
    price: 2.5,
    category: "Drinks",
    tags: [],
    customizable: false,
    accentColor: "#79706A",
  },
  {
    id: "sparkling",
    name: "Sparkling Water",
    description: "San Pellegrino 500ml",
    price: 3,
    category: "Drinks",
    tags: [],
    customizable: false,
    accentColor: "#79706A",
  },
  {
    id: "lemonade",
    name: "Fresh Lemonade",
    description: "Squeezed daily, lightly sweetened with honey, hint of mint",
    price: 4.5,
    category: "Drinks",
    tags: [],
    popular: true,
    customizable: false,
    accentColor: "#D4A820",
  },
  {
    id: "iced-tea",
    name: "Iced Tea",
    description: "House-brewed black tea, lemon, not too sweet",
    price: 4,
    category: "Drinks",
    tags: [],
    customizable: false,
    accentColor: "#79706A",
  },

  // ── Desserts ─────────────────────────────────────────────────────────
  {
    id: "tiramisu",
    name: "Tiramisu",
    description: "Classic Italian — espresso-soaked, mascarpone cream, cocoa-dusted",
    price: 8,
    category: "Desserts",
    tags: [],
    popular: true,
    customizable: false,
    accentColor: "#C13A1B",
  },
  {
    id: "lava-cake",
    name: "Chocolate Lava Cake",
    description: "Warm dark chocolate centre, house vanilla gelato, Maldon sea salt",
    price: 9,
    category: "Desserts",
    tags: ["Featured"],
    featured: true,
    customizable: false,
    accentColor: "#E85422",
  },
  {
    id: "cannoli",
    name: "Cannoli",
    description: "Two-piece, house ricotta filling, crushed pistachios, citrus zest",
    price: 7,
    category: "Desserts",
    tags: [],
    customizable: false,
    accentColor: "#D4A820",
  },
];

export const FEATURED_ITEMS = MENU_ITEMS.filter((item) => item.featured).slice(0, 3);
