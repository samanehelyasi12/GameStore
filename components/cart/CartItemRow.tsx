import type { CartItem } from "@/lib/types";

type CartItemRowProps = {
  item: CartItem;
};

export default function CartItemRow({ item }: CartItemRowProps) {
  return (
    <li>
      <span>{item.game.title}</span>
      <span>{item.quantity}</span>
    </li>
  );
}