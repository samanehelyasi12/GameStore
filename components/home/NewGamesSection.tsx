"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { formatPrice } from "@/lib/utils";
import { products, type Product } from "@/lib/data/products";

/**
 * =====================================================================
 * NewGamesSection — بخش «بازی‌های جدید» صفحه اصلی
 * ---------------------------------------------------------------------
 * - متن + دکمه «مشاهده همه» سمت راست (لینک به فروشگاه: /games)
 * - خط جداکننده عمودی بین متن و کارت‌ها
 * - ۹ کارت شیشه‌ای بازی در یک اسلایدر افقی (CSS scroll-snap، بدون
 *   کتابخانه خارجی)؛ در دسکتاپ تقریباً ۴ تا هم‌زمان دیده می‌شن.
 * - هر کارت فقط: عکس (بدون بج/قلب روش)، اسم بازی، قیمت + آیکن خرید.
 *
 * داده از «کاتالوگ واحد محصولات» خوانده می‌شود تا عنوان کارت، قیمت و
 * صفحه‌ی مقصد همگی یکی باشند.
 * TODO(backend): همین نگاشت را با fetch از API جایگزین کنید.
 * =====================================================================
 */

/**
 * نمایش مختصرِ یک محصول برای کارت این اسلایدر. مشتق‌شده از `Product` تا
 * مدل داده‌ی این بخش با کاتالوگ اصلی ناهم‌خوان نباشد.
 */
type NewGameCard = Pick<Product, "id" | "slug" | "title" | "price" | "coverImage"> & {
  href: string;
};

const newGameCards: NewGameCard[] = products.map((product) => ({
  id: product.id,
  slug: product.slug,
  title: product.title,
  price: product.price,
  coverImage: product.coverImage,
  href: `/games/${product.slug}`,
}));

export default function NewGamesSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCards = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 16 : scroller.clientWidth * 0.8;
    scroller.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-page px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-10">
        {/* متن سمت راست */}
        <div className="flex shrink-0 flex-col justify-center text-center lg:w-56 lg:text-right">
          <h2 className="mb-2 text-h2 font-display text-text-primary">
            بازی‌های جدید
          </h2>
          <p className="mb-5 text-sm text-text-secondary">
            تجربه‌ای تازه از دنیای بازی
          </p>
          <Link
            href="/games"
            className="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm font-medium text-text-primary transition-colors duration-base ease-standard hover:border-accent-500 hover:text-accent-400 lg:mx-0"
          >
            مشاهده همه
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* خط جداکننده */}
        <div className="hidden w-px self-stretch bg-border-subtle lg:block" aria-hidden="true" />

        {/* کارت‌ها */}
        <div className="relative min-w-0 flex-1">
          {/* فلش‌ها: راست = قبلی (راست‌گرد)، چپ = بعدی (چپ‌گرد) — هماهنگ با اسلایدر هیرو */}
          <div className="mb-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              aria-label="بازی‌های قبلی"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-surface text-text-primary transition-colors duration-base ease-standard hover:border-accent-500 hover:text-accent-400"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              aria-label="بازی‌های بعدی"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-surface text-text-primary transition-colors duration-base ease-standard hover:border-accent-500 hover:text-accent-400"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 4.5l-7.5 7.5 7.5 7.5" />
              </svg>
            </button>
          </div>

          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {newGameCards.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GameCard({ game }: { game: NewGameCard }) {
  return (
    <Link
      href={game.href}
      data-card
      className="group w-[calc(50%-8px)] shrink-0 snap-start overflow-hidden rounded-xl border border-border-subtle bg-surface/60 shadow-lg backdrop-blur-xl transition-all duration-base ease-standard hover:-translate-y-1 hover:border-accent-500/50 hover:shadow-accent sm:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)]"
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={game.coverImage}
          alt={game.title}
          fill
          sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-slow ease-standard group-hover:scale-105"
        />
      </div>

      <div className="p-3">
        <h3 className="truncate text-sm font-medium text-text-primary">
          {game.title}
        </h3>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="truncate text-xs font-bold text-accent-400 sm:text-sm">
            {formatPrice(game.price)}
          </span>
          <AddToCartButton
            variant="icon"
            product={{
              id: game.id,
              slug: game.slug,
              title: game.title,
              price: game.price,
              compareAtPrice: null,
              coverImage: game.coverImage,
              href: game.href,
            }}
          />
        </div>
      </div>
    </Link>
  );
}