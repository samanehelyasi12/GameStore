"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import type { AddableProduct } from "@/lib/types/cart";
import { FOCUS, cx } from "@/components/layout/Navbar/navbar-styles";

type AddToCartButtonProps = {
  product: AddableProduct;
  /** `icon` = round card badge · `solid` = full CTA · `outline` = secondary. */
  variant?: "icon" | "solid" | "outline";
  quantity?: number;
  label?: string;
  className?: string;
  /** Keep the parent <Link> from navigating when the button is clicked. */
  stopPropagation?: boolean;
};

const ADDED_MS = 1600;

const shapes = {
  icon: "grid size-7 shrink-0 place-items-center rounded-full",
  solid: "flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-bold",
  outline: "flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold",
} as const;

const colors = {
  icon: "bg-accent-500 text-white hover:bg-accent-600",
  solid: "bg-red-500 text-text-inverse hover:bg-red-600",
  outline:
    "border border-border-strong text-text-primary hover:border-red-500/60 hover:text-red-400",
} as const;

const ADDED_STYLE = "bg-success text-white hover:bg-success";

/**
 * The real "add to cart" control. Works inside product cards (icon variant)
 * and as a page-level CTA (solid / outline). Feedback is a short "added"
 * state — the cart count badge in the navbar updates instantly.
 */
export default function AddToCartButton({
  product,
  variant = "solid",
  quantity = 1,
  label = "افزودن به سبد خرید",
  className,
  stopPropagation = true,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (stopPropagation) {
      event.preventDefault();
      event.stopPropagation();
    }
    addItem(product, quantity);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), ADDED_MS);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={variant === "icon" ? `افزودن ${product.title} به سبد خرید` : undefined}
      className={cx(
        shapes[variant],
        added ? ADDED_STYLE : colors[variant],
        "transition-[color,background-color,border-color,transform] duration-base ease-standard active:scale-95 active:translate-y-px",
        className,
        FOCUS,
      )}
    >
      {added ? (
        <Check className={variant === "icon" ? "size-3.5" : "size-4"} aria-hidden />
      ) : (
        <ShoppingCart className={variant === "icon" ? "size-3.5" : "size-4"} aria-hidden />
      )}
      {variant === "icon" ? null : <span>{added ? "به سبد اضافه شد" : label}</span>}
      {variant === "icon" ? <span className="sr-only">{added ? "افزوده شد" : "افزودن به سبد خرید"}</span> : null}
    </button>
  );
}
