"use client";

import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/data/products";
import { cx } from "@/components/layout/Navbar/navbar-styles";

type ProductCardProps = {
  product: Product;
  /** `rail` = fixed width inside a horizontal scroller, `grid` = fluid cell. */
  layout?: "grid" | "rail";
};

function toAddable(product: Product) {
  return {
    id: product.id,
    slug: product.slug,
    title: product.title,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    coverImage: product.coverImage,
    href: `/games/${product.slug}`,
  };
}

/**
 * The single game card for the whole site.
 *
 * Home (`NewGamesSection`) is the master design: glass card, square cover,
 * name, price and the add-to-cart icon. Shop / category / discount pages use
 * this same component so a game looks identical everywhere.
 */
export default function ProductCard({ product, layout = "grid" }: ProductCardProps) {
  return (
    <Link
      href={`/games/${product.slug}`}
      data-card={layout === "rail" ? true : undefined}
      className={cx(
        "group overflow-hidden rounded-xl border border-border-subtle bg-surface/60 shadow-lg backdrop-blur-xl",
        "transition-all duration-base ease-standard hover:-translate-y-1 hover:border-accent-500/50 hover:shadow-accent",
        layout === "grid"
          ? "flex h-full w-full flex-col"
          : "w-[calc(50%-8px)] shrink-0 snap-start sm:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)]",
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={product.coverImage}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-slow ease-standard group-hover:scale-105"
        />
      </div>

      <div className="p-3">
        <h3 className="truncate text-sm font-medium text-text-primary">
          {product.title}
        </h3>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="truncate text-xs font-bold text-accent-400 sm:text-sm">
            {formatPrice(product.price)}
          </span>
          <AddToCartButton variant="icon" product={toAddable(product)} />
        </div>
      </div>
    </Link>
  );
}
