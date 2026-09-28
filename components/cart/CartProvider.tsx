"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { AddableProduct, CartItem, CartTotals } from "@/lib/types/cart";

const STORAGE_KEY = "gamestore.cart.v1";
const MAX_QTY = 9;

type CartContextValue = {
  items: CartItem[];
  totals: CartTotals;
  /** False until localStorage has been read (avoids SSR mismatch). */
  hydrated: boolean;
  /** Id of the product just added — drives the "added" state of the button. */
  lastAddedId: string | null;
  addItem: (product: AddableProduct, quantity?: number) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  toggleItem: (product: AddableProduct) => void;
  clearCart: () => void;
  hasItem: (id: string) => boolean;
  quantityOf: (id: string) => number;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartItem =>
        !!item && typeof item.id === "string" && typeof item.price === "number",
    );
  } catch {
    return [];
  }
}

function clampQty(quantity: number) {
  return Math.min(MAX_QTY, Math.max(1, Math.round(quantity)));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);

  // Hydrate once, on the client, after the first paint (localStorage is an
  // external store, so this runs outside of the render pass).
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setItems(readStorage());
      setHydrated(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // Persist on every change (after hydration only).
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage full / private mode — the cart simply stays in memory */
    }
  }, [items, hydrated]);

  // Keep tabs in sync.
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) setItems(readStorage());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addItem = useCallback((product: AddableProduct, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: clampQty(item.quantity + quantity) }
            : item,
        );
      }
      return [...current, { ...product, quantity: clampQty(quantity) }];
    });
    setLastAddedId(product.id);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: clampQty(quantity) } : item,
      ),
    );
  }, []);

  const toggleItem = useCallback((product: AddableProduct) => {
    setItems((current) =>
      current.some((item) => item.id === product.id)
        ? current.filter((item) => item.id !== product.id)
        : [...current, { ...product, quantity: 1 }],
    );
    setLastAddedId(product.id);
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totals = useMemo<CartTotals>(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const compareTotal = items.reduce(
      (sum, item) => sum + (item.compareAtPrice ?? item.price) * item.quantity,
      0,
    );
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    return { subtotal, discount: compareTotal - subtotal, total: subtotal, count };
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totals,
      hydrated,
      lastAddedId,
      addItem,
      removeItem,
      setQuantity,
      toggleItem,
      clearCart,
      hasItem: (id) => items.some((item) => item.id === id),
      quantityOf: (id) => items.find((item) => item.id === id)?.quantity ?? 0,
    }),
    [items, totals, hydrated, lastAddedId, addItem, removeItem, setQuantity, toggleItem, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

export { MAX_QTY };
