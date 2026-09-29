import type { CartItem } from "@/lib/types/cart";

export type OrderStatus = "pending" | "paid" | "failed" | "canceled";

/**
 * Fulfilment stages a *paid* order moves through. Separate from
 * `OrderStatus`, which only describes the payment outcome.
 */
export type FulfillmentStage =
  | "processing"
  | "preparing"
  | "shipped"
  | "delivered";

export type PaymentMethod = "zarinpal" | "direct-debit" | "wallet";

export type OrderCustomer = {
  name: string;
  email: string;
  phone: string;
  province: string;
  city: string;
  /** پلاک و واحد */
  houseNumber: string;
  address: string;
  postalCode: string;
  country: string;
};

export type Order = {
  /** Human-readable order number, e.g. "GS-1403-4821". */
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  customer: OrderCustomer;
  /** ISO timestamp. */
  createdAt: string;
  /** Gateway reference (Authority) — filled after the payment callback. */
  refId?: string | null;
  /**
   * Current fulfilment stage. Optional so orders created before this field
   * existed still load; treat `undefined` as "processing".
   */
  fulfillmentStage?: FulfillmentStage;
  /** ISO timestamp the order was handed to the courier. */
  shippedAt?: string | null;
  /** ISO timestamp the order was delivered. */
  deliveredAt?: string | null;
  /** Courier tracking code (e.g. پست پیشتاز). */
  trackingCode?: string | null;
};
