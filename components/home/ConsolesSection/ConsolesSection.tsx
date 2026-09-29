"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { CONSOLE_TABS, CONSOLE_PRODUCTS, type ConsoleBrand } from "./consoles-data";
import ConsoleCard from "@/components/consoles/ConsoleCard";

/**
 * =====================================================================
 * ConsolesSection — بخش «کنسول‌ها» صفحه اصلی
 * ---------------------------------------------------------------------
 * ساختار عیناً از NewGamesSection کپی شده (متن سمت راست + خط جداکننده +
 * اسلایدر کارت شیشه‌ای snap)، با یک تفاوت: بالای کارت‌ها سه تب
 * PS5 / PS4 / Xbox هست که با کلیک، کل لیست کارت‌ها عوض می‌شه.
 * =====================================================================
 */

export default function ConsolesSection() {
  const [activeBrand, setActiveBrand] = useState<ConsoleBrand>("ps5");
  const scrollerRef = useRef<HTMLDivElement>(null);

  const products = CONSOLE_PRODUCTS[activeBrand];

  const scrollByCards = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 16 : scroller.clientWidth * 0.8;
    scroller.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const handleTabChange = (brand: ConsoleBrand) => {
    setActiveBrand(brand);
    scrollerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-page px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-10">
        {/* متن سمت راست */}
        <div className="flex shrink-0 flex-col justify-center text-center lg:w-56 lg:text-right">
          <h2 className="mb-2 text-h2 font-display text-text-primary">
            کنسول‌ها
          </h2>
          <p className="mb-5 text-sm text-text-secondary">
            پلتفرم مورد علاقه‌ات رو انتخاب کن
          </p>
          <Link
            href="/consoles"
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

        {/* تب‌ها + فلش‌ها + کارت‌ها */}
        <div className="relative min-w-0 flex-1">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            {/* تب‌های برند */}
            <div className="flex items-center gap-2 rounded-full border border-border-subtle bg-surface p-1">
              {CONSOLE_TABS.map((tab) => {
                const isActive = tab.id === activeBrand;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabChange(tab.id)}
                    aria-pressed={isActive}
                    className={`rounded-full px-4 py-1.5 text-sm font-bold transition-colors duration-base ease-standard ${
                      isActive
                        ? "bg-red-500 text-text-inverse"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* فلش‌ها */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scrollByCards(-1)}
                aria-label="محصولات قبلی"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-surface text-text-primary transition-colors duration-base ease-standard hover:border-accent-500 hover:text-accent-400"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollByCards(1)}
                aria-label="محصولات بعدی"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-surface text-text-primary transition-colors duration-base ease-standard hover:border-accent-500 hover:text-accent-400"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 4.5l-7.5 7.5 7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>

          <div
            key={activeBrand}
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {products.map((product) => (
              <ConsoleCard key={product.id} product={product} href={product.href} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
