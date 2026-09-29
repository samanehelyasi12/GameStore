"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { cx } from "@/components/layout/Navbar/navbar-styles";
import type { ControllerProduct } from "./controllers-data";

const base = cx(
  "group overflow-hidden rounded-xl border border-border-subtle bg-surface/60 shadow-lg backdrop-blur-xl",
  "transition-all duration-base ease-standard hover:-translate-y-1 hover:border-accent-500/50 hover:shadow-accent",
);

const layoutClass = {
  rail: "w-[calc(50%-8px)] shrink-0 snap-start sm:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)]",
  grid: "flex h-full w-full flex-col",
} as const;

type ControllerCardProps = {
  product: ControllerProduct;
  /** `rail` = fixed width inside a horizontal scroller, `grid` = fluid cell. */
  layout?: keyof typeof layoutClass;
};

/**
 * Controller card — same model as the home game card: square image, name,
 * price and the cart badge. `href` is optional: on the list page the card
 * is not a link (it is already the destination), on home it links over.
 */
export default function ControllerCard({
  product,
  layout = "rail",
}: ControllerCardProps) {
  const body = (
    <>
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-slow ease-standard group-hover:scale-105"
        />
      </div>

      <div className="p-3">
        <h3 className="truncate text-sm font-medium text-text-primary">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="truncate text-xs font-bold text-accent-400 sm:text-sm">
            {formatPrice(product.price)}
          </span>
          <span
            aria-hidden="true"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-500 text-white transition-colors duration-base ease-standard group-hover:bg-accent-600"
          >
            <ShoppingCart className="size-3.5" />
          </span>
        </div>
      </div>
    </>
  );

  if (!product.href) {
    return (
      <article className={cx(base, layoutClass[layout])} id={product.id}>
        {body}
      </article>
    );
  }

  return (
    <Link href={product.href} data-card={layout === "rail" ? true : undefined} className={cx(base, layoutClass[layout])}>
      {body}
    </Link>
  );
}
