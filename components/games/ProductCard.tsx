"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { discountPercent, formatNumber } from "@/lib/utils";
import type { Product } from "@/lib/data/products";
import { genreLabels } from "@/lib/data/products";
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

/** Game card — MASTER §9.5 (2:3 poster, scrim, sale badge, hover CTA). */
export default function ProductCard({ product, layout = "grid" }: ProductCardProps) {
  const percent = product.compareAtPrice
    ? discountPercent(product.price, product.compareAtPrice)
    : 0;

  return (
    <article
      className={cx(
        "group flex flex-col overflow-hidden rounded-xl border border-border-subtle bg-surface/60 backdrop-blur-xl",
        "transition-[border-color,box-shadow,transform] duration-base ease-standard",
        "hover:-translate-y-1 hover:border-red-500/50 hover:shadow-md",
        layout === "grid" ? "w-full" : "w-[calc(50%-8px)] shrink-0 sm:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)]",
      )}
    >
      <Link
        href={`/games/${product.slug}`}
        className="relative block aspect-[2/3] w-full overflow-hidden bg-media"
        tabIndex={-1}
        aria-hidden
      >
        <Image
          src={product.coverImage}
          alt=""
          fill
          sizes="(min-width: 1024px) 260px, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-slow ease-standard group-hover:scale-105"
        />

        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3"
          style={{ backgroundImage: "var(--gradient-card)" }}
        />

        {/* بج تخفیف */}
        {percent > 0 ? (
          <span className="absolute start-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-[11px] font-bold text-white">
            ٪{formatNumber(percent)} تخفیف
          </span>
        ) : null}

        {/* امتیاز */}
        <span className="absolute end-2 top-2 flex items-center gap-1 rounded-full border border-border-subtle bg-canvas/80 px-2 py-0.5 text-[11px] font-bold tabular-nums text-text-primary">
          <Star className="size-3 text-gold-500" aria-hidden />
          {formatNumber(product.rating)}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <div>
          <h3 className="truncate text-sm font-semibold text-text-primary">
            <Link
              href={`/games/${product.slug}`}
              className="transition-colors duration-fast hover:text-red-400"
            >
              {product.title}
            </Link>
          </h3>
          <p className="mt-1 truncate text-xs text-text-tertiary">
            {product.genres.map((g) => genreLabels[g] ?? g).join(" · ")}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2">
          <div className="min-w-0">
            {product.compareAtPrice ? (
              <p className="text-xs text-text-tertiary line-through">
                {formatNumber(product.compareAtPrice)}
              </p>
            ) : null}
            <p className="truncate text-sm font-bold tabular-nums text-red-400 sm:text-base">
              {formatNumber(product.price)}{" "}
              <span className="text-[11px] font-medium text-text-tertiary">تومان</span>
            </p>
          </div>

          <AddToCartButton variant="icon" product={toAddable(product)} />
        </div>
      </div>
    </article>
  );
}
