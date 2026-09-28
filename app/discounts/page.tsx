import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GamesBrowser from "@/components/games/GamesBrowser";
import { getSaleProducts } from "@/lib/data/products";
import { discountPercent, formatNumber } from "@/lib/utils";

export const metadata: Metadata = { title: "تخفیف‌ها" };

type DiscountsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function DiscountsPage({ searchParams }: DiscountsPageProps) {
  const raw = await searchParams;
  const search = Object.fromEntries(
    Object.entries(raw).map(([key, value]) => [
      key,
      Array.isArray(value) ? (value[0] ?? "") : (value ?? ""),
    ]),
  ) as Record<string, string>;

  const list = getSaleProducts();
  const best = list.reduce(
    (max, item) =>
      Math.max(max, item.compareAtPrice ? discountPercent(item.price, item.compareAtPrice) : 0),
    0,
  );

  return (
    <>
      <Breadcrumbs items={[{ label: "فروشگاه", href: "/games" }, { label: "تخفیف‌ها" }]} />

      <section className="mx-auto w-full max-w-page px-3 pb-16 sm:px-4">
        {/* بنر تخفیف */}
        <div className="relative mb-6 overflow-hidden rounded-2xl border border-border-subtle bg-surface">
          <Image
            src="/images/promo/discount-banner.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-canvas via-canvas/85 to-canvas/30"
          />

          <div className="relative p-6 sm:p-8">
            <p className="text-kicker text-red-400">پیشنهاد شگفت‌انگیز</p>
            <h1 className="mt-1 font-display text-h3 font-bold text-text-primary sm:text-h2">
              تخفیف‌های فعال فروشگاه
            </h1>
            <p className="mt-2 max-w-xl text-sm text-text-secondary">
              تا {formatNumber(best)}٪ تخفیف روی بازی‌های منتخب — فقط تا پایان هفته.
            </p>
          </div>
        </div>

        <GamesBrowser products={list} activeSale searchParams={{ ...search, sale: "true" }} />
      </section>
    </>
  );
}
