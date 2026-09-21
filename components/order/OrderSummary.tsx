import type { Order } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

type OrderSummaryProps = {
  order: Order;
};

export default function OrderSummary({ order }: OrderSummaryProps) {
  return (
    <div>
      <p>Order #{order.id}</p>
      <p>Status: {order.status}</p>
      <p>Total: {formatPrice(order.total)}</p>
    </div>
  );
}