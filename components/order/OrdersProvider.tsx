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
import type { Order } from "@/lib/types/order";

const STORAGE_KEY = "gamestore.orders.v1";
const MAX_ORDERS = 20;

type OrdersContextValue = {
  orders: Order[];
  hydrated: boolean;
  placeOrder: (order: Order) => Order;
  getOrder: (id: string) => Order | undefined;
  updateStatus: (id: string, status: Order["status"], refId?: string | null) => void;
};

const OrdersContext = createContext<OrdersContextValue | null>(null);

function readStorage(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Order[]) : [];
  } catch {
    return [];
  }
}

/**
 * Client-side order book. The checkout flow writes here so /order/[id] and
 * /payment/result can read the order back. Replace with the orders API.
 */
export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setOrders(readStorage());
      setHydrated(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch {
      /* ignore quota errors — the demo keeps working in memory */
    }
  }, [orders, hydrated]);

  const placeOrder = useCallback((order: Order) => {
    setOrders((current) => [order, ...current].slice(0, MAX_ORDERS));
    return order;
  }, []);

  const updateStatus = useCallback(
    (id: string, status: Order["status"], refId?: string | null) => {
      setOrders((current) =>
        current.map((order) =>
          order.id === id
            ? { ...order, status, refId: refId ?? order.refId }
            : order,
        ),
      );
    },
    [],
  );

  const value = useMemo<OrdersContextValue>(
    () => ({
      orders,
      hydrated,
      placeOrder,
      getOrder: (id) => orders.find((order) => order.id === id),
      updateStatus,
    }),
    [orders, hydrated, placeOrder, updateStatus],
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders(): OrdersContextValue {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used inside <OrdersProvider>");
  return ctx;
}
