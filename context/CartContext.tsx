"use client";

import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";
import type { CartState, CartAction, CartItem } from "@/types/cart";
import { HST_RATE } from "@/types/cart";

// ─── Reducer ─────────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      // Merge if identical cartId (same item + same customization fingerprint)
      const existing = state.items.findIndex((i) => i.cartId === action.item.cartId);
      if (existing >= 0) {
        const items = [...state.items];
        items[existing] = {
          ...items[existing],
          quantity: items[existing].quantity + action.item.quantity,
        };
        return { ...state, items, isOpen: true, selectedItem: null };
      }
      return {
        ...state,
        items: [...state.items, action.item],
        isOpen: true,
        selectedItem: null,
      };
    }

    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.cartId !== action.cartId) };

    case "UPDATE_QUANTITY": {
      if (action.quantity < 1) {
        return { ...state, items: state.items.filter((i) => i.cartId !== action.cartId) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.cartId === action.cartId ? { ...i, quantity: action.quantity } : i
        ),
      };
    }

    case "OPEN_CART":
      return { ...state, isOpen: true };

    case "CLOSE_CART":
      return { ...state, isOpen: false };

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };

    case "OPEN_ITEM_MODAL":
      return { ...state, selectedItem: action.item, isOpen: false };

    case "CLOSE_ITEM_MODAL":
      return { ...state, selectedItem: null };

    case "CLEAR_CART":
      return { ...state, items: [] };

    default:
      return state;
  }
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  selectedItem: null,
};

// ─── Context ──────────────────────────────────────────────────────────────────

type CartContextValue = {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  itemCount: number;
  subtotal: number;
  tax: number;
  total: number;
};

const CartContext = createContext<CartContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

function announce(message: string) {
  if (typeof window === "undefined") return;
  const el = document.getElementById("live-announcer");
  if (!el) return;
  el.textContent = "";
  requestAnimationFrame(() => { el.textContent = message; });
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const itemCount = state.items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = state.items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
  const tax = subtotal * HST_RATE;
  const total = subtotal + tax;

  // Announce state changes to screen readers
  const wrappedDispatch: typeof dispatch = (action) => {
    if (action.type === "ADD_ITEM") {
      announce(`${action.item.name} added to cart`);
    } else if (action.type === "REMOVE_ITEM") {
      announce("Item removed from cart");
    } else if (action.type === "CLEAR_CART") {
      announce("Cart cleared");
    }
    dispatch(action);
  };

  return (
    <CartContext.Provider value={{ state, dispatch: wrappedDispatch, itemCount, subtotal, tax, total }}>
      {children}
    </CartContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
