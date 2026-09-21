import type { CartItem } from "@/lib/types/cart";

export type OrderStatus = "pending" | "paid" | "failed";

export type OrderCustomer = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export type Order = {
  id: number;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  customer: OrderCustomer;
  createdAt: string;
};