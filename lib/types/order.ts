import type { CartItem } from "@/lib/types/cart";

export type OrderStatus = "pending" | "paid" | "failed" | "canceled";

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
};
