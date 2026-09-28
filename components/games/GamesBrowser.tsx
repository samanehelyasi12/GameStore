"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/games/ProductCard";
import { categoryItems } from "@/components/home/CategorySlider/categories-data";
import { cx } from "@/components/layout/Navbar/navbar-styles";
import type { Product } from "@/lib/data/products";

type SortKey = "default" | "cheap" | "expensive" | "rating";

const sortLabels: Record<SortKey, string> = {
  default: "پیش‌فرض",
  cheap: "ارزان‌ترین",
  expensive: "گران‌ترین",
  rating: "بیشترین امتیاز",
};

const rail = cx(
  "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold",
  "transition-colors duration-fast ease-fast",
);

/** Sort + search + genre chips for the shop / category / discount pages. */
export default function GamesBrowser({
  products,
  initialQuery = "",
  initialGenre = null,
  activeSale = false,
  searchParams = {},
}: {
  products: Product[];
  initialQuery?: string;
  initialGenre?: string | null;
  activeSale?: boolean;
  /** Current query string of the page (so filters survive sorting/search). */
  searchParams?: Record<string, string>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [term, setTerm] = useState(initialQuery);
  const [syncedQuery, setSyncedQuery] = useState(initialQuery);

  // Keep the search box in sync when the URL changes (back/forward, chips).
  if (initialQuery !== syncedQuery) {
    setSyncedQuery(initialQuery);
    setTerm(initialQuery);
  }

  const sort = (searchParams.sort as SortKey) ?? "default";
  const baseParams = (next: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(next).forEach(([key, value]) => {
      if (value === null || value === "") params.delete(key);
      else params.set(key, value);
    });
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  const sorted = [...products].sort((a, b) => {
    if (sort === "cheap") return a.price - b.price;
    if (sort === "expensive") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* نوار ابزار */}
      <div className="flex flex-col gap-3 rounded-2xl border border-border-subtle bg-surface p-4 sm:flex-row sm:items-center">
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            router.push(baseParams({ q: term.trim() || null }));
          }}
          className="relative flex-1"
        >
          <Search
            aria-hidden
            className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-text-tertiary"
          />
          <input
            type="search"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="جستجوی نام بازی..."
            aria-label="جستجوی بازی"
            className="h-11 w-full rounded-md border border-border-strong bg-canvas/60 pe-4 ps-10 text-sm text-text-primary placeholder:text-text-tertiary focus:border-red-500 focus:outline-none focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-red-500)_22%,transparent)]"
          />
        </form>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="ms-1 size-4  shrink-0 text-text-tertiary" aria-hidden />
          <label htmlFor="sort" className="sr-only">
            مرتب‌سازی
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => router.push(baseParams({ sort: e.target.value }))}
            className="h-11 rounded-md border  border-border-strong bg-canvas/60 ps-3 pe-4 text-sm font-semibold text-text-primary focus:border-red-500 focus:outline-none"
          >
            {Object.entries(sortLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* چیپ‌های ژانر */}
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={baseParams({ genre: null })}
          className={cx(
            rail,
            !initialGenre
              ? "border-red-500 bg-red-subtle text-red-400"
              : "border-border-subtle text-text-secondary hover:border-red-500/50 hover:text-red-400",
          )}
        >
          همه
        </Link>

        {categoryItems.map((cat) => {
          const active = initialGenre === cat.id;
          return (
            <Link
              key={cat.id}
              href={baseParams({ genre: cat.id })}
              className={cx(
                rail,
                active
                  ? "border-red-500 bg-red-subtle text-red-400"
                  : "border-border-subtle text-text-secondary hover:border-red-500/50 hover:text-red-400",
              )}
            >
              {cat.label}
            </Link>
          );
        })}

        {activeSale ? (
          <span className="flex items-center rounded-full border border-red-500 bg-red-500 px-3 py-1.5 text-xs font-bold text-white">
            تخفیف‌دارها
          </span>
        ) : null}
      </div>

      {/* نتیجه‌ها */}
      {sorted.length === 0 ? (
        <div className="rounded-2xl border border-border-subtle bg-surface px-6 py-14 text-center">
          <h2 className="font-display text-h4 font-bold text-text-primary">
            محصولی پیدا نشد
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-text-secondary">
            فیلترها را تغییر بده یا عبارت دیگری را جستجو کن.
          </p>
          <Link
            href={pathname}
            className="mt-5 inline-flex h-11 items-center justify-center rounded-lg border border-border-strong px-5 text-sm font-semibold text-text-primary transition-colors duration-fast hover:border-red-500/60 hover:text-red-400"
          >
            حذف فیلترها
          </Link>
        </div>
      ) : (
        <>
          <p className="text-xs text-text-tertiary">
            {sorted.length} محصول نمایش داده می‌شود
          </p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {sorted.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
