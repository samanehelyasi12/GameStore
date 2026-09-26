"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  usedConsoles,
  CONDITION_LABELS,
  formatToman,
  discountPercent,
} from "./used-consoles-data";

/**
 * =====================================================================
 * UsedConsolesSection — کنسول استوک
 * ---------------------------------------------------------------------
 * ساختار عیناً از ConsolesSection/NewGamesSection: متن سمت راست + خط
 * جداکننده + فلش‌های بالای اسلایدر + کارت‌های افقی snap.
 * بدون فیلتر — همه‌ی کنسول‌های استوک در یک اسلایدر، برای همه‌ی سایزها.
 * تفاوت: کارت افقی (نه عمودی) با بج تخفیف/وضعیت/گارانتی مخصوص استوک.
 * =====================================================================
 */

export default function UsedConsolesSection() {
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
          <div className="mx-auto mb-2 flex items-center gap-2 lg:mx-0">
            <h2 className="text-h2 font-display text-text-primary">
              کنسول استوک
            </h2>
          </div>
          <span className="mx-auto mb-2 inline-flex w-fit items-center rounded-full bg-accent-subtle px-3 py-1 text-xs font-bold text-accent-400 lg:mx-0">
            تا ۳۵٪ ارزان‌تر
          </span>
          <p className="mb-5 text-sm text-text-secondary">
            کنسول‌های دست دوم، تست‌شده و گارانتی‌دار
          </p>
          <Link
            href="/used-consoles"
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

        {/* فلش‌ها + کارت‌ها */}
        <div className="relative min-w-0 flex-1">
          <div className="mb-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              aria-label="قبلی"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-surface text-text-primary transition-colors duration-base ease-standard hover:border-accent-500 hover:text-accent-400"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              aria-label="بعدی"
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
            {usedConsoles.map((console) => (
              <UsedConsoleCard key={console.id} console={console} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function UsedConsoleCard({ console }: { console: (typeof usedConsoles)[number] }) {
  const conditionMeta = CONDITION_LABELS[console.condition];
  const discount = discountPercent(console.price, console.originalPrice);

  return (
    <Link
      href={console.href}
      data-card
      className="group w-[calc(50%-8px)] shrink-0 snap-start overflow-hidden rounded-xl border border-border-subtle bg-surface/60 shadow-lg backdrop-blur-xl transition-all duration-base ease-standard hover:-translate-y-1 hover:border-accent-500/50 hover:shadow-accent sm:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)]"
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={console.image}
          alt={console.name}
          fill
          sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-slow ease-standard group-hover:scale-105"
        />
        <span className="absolute end-2 top-2 rounded-md bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-text-inverse">
          {discount}٪-
        </span>
      </div>

      <div className="p-3">
        <h3 className="truncate text-sm font-medium text-text-primary">
          {console.name}
        </h3>

        <div className="mt-1.5 flex items-center gap-1.5 text-xs">
          <span className={`rounded-md px-1.5 py-0.5 font-bold text-text-inverse ${conditionMeta.color}`}>
            {conditionMeta.label}
          </span>
          <span className="text-text-tertiary">{console.warrantyMonths} ماه گارانتی</span>
        </div>

        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="truncate text-xs font-bold text-accent-400 sm:text-sm">
              {formatToman(console.price)}
            </span>
            <span className="truncate text-[10px] text-text-tertiary line-through">
              {formatToman(console.originalPrice)}
            </span>
          </div>
          <span
            aria-hidden="true"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-500 text-white transition-colors duration-base ease-standard group-hover:bg-accent-600"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}