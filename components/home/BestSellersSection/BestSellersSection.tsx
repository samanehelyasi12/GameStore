"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { bestSellerItems, formatToman } from "./bestsellers-data";

export default function BestSellersSection() {
  const [activeId, setActiveId] = useState(bestSellerItems[0].id);
  const active =
    bestSellerItems.find((item) => item.id === activeId) ?? bestSellerItems[0];

  return (
    <section className="mx-auto w-full max-w-page px-3 sm:px-4">
      {/* تایتل بیرون از باکس، بالا و وسط */}
      <div className="mb-6 flex flex-col items-center gap-2 text-center">
        <span className="h-1 w-10 rounded-full bg-red-500" />
        <h2 className="font-display text-h3 font-bold text-text-primary sm:text-h2">
          پرفروش‌ترین‌ها
        </h2>
      </div>

      <div className="relative flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface md:h-[460px] md:flex-row">
        {/* پنل بزرگ: عکس تمیز + متن هر بازی */}
        <div className="relative order-1 h-[420px] w-full sm:h-[380px] md:h-full md:flex-1">
          <Image
            key={active.image}
            src={active.image}
            alt={active.title}
            fill
            priority
            sizes="(min-width: 768px) 68vw, 100vw"
             className="object-cover object-left lg:object-center"
          />

          {/* گرادیانت فقط پشت متن، نه روی کل عکس */}
          <div className="absolute inset-x-0 bottom-0 z-[1] h-[65%] bg-gradient-to-t from-canvas via-canvas/70 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-3 p-5 sm:p-8">
            <h3 className="font-display text-h3 font-bold text-text-primary sm:text-h2">
              {active.title}
            </h3>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-text-secondary">
              {active.genres.map((genre, i) => (
                <span key={genre} className="flex items-center gap-2">
                  {i > 0 && <span className="size-1 rounded-full bg-text-tertiary" />}
                  {genre}
                </span>
              ))}
            </div>

            <p className="max-w-xl text-sm leading-7 text-text-secondary sm:text-base">
              {active.description}
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-3">
              <p className="text-lg font-bold text-red-400 sm:text-h4">
                {formatToman(active.price)}
              </p>

              <Link
                href={active.href}
                className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-bold text-text-inverse transition-colors duration-fast ease-fast hover:bg-red-600"
              >
                <ShoppingCart aria-hidden className="size-4" />
                افزودن به سبد خرید
              </Link>
            </div>
          </div>
        </div>

        {/* لیست رتبه‌بندی — اسکرول حرفه‌ای */}
        <div className="relative order-2 flex w-full shrink-0 flex-col border-t border-border-subtle md:w-[320px] md:border-t-0 md:border-s md:border-border-subtle">
          <ul
            className="
              flex flex-col gap-1 overflow-y-auto p-3
              scroll-smooth snap-y snap-mandatory
              [mask-image:linear-gradient(to_bottom,transparent,black_16px,black_calc(100%-16px),transparent)]
              [scrollbar-width:thin] [scrollbar-color:var(--color-red-500)_transparent]
              [&::-webkit-scrollbar]:w-1.5
              [&::-webkit-scrollbar-track]:bg-transparent
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-red-500/60
              [&::-webkit-scrollbar-thumb:hover]:bg-red-500
              max-h-[320px] md:max-h-full
            "
          >
            {bestSellerItems.map((item, i) => {
              const isActive = item.id === activeId;
              return (
                <li key={item.id} className="snap-start">
                  <button
                    type="button"
                    onClick={() => setActiveId(item.id)}
                    className={`flex w-full items-center gap-3 rounded-lg p-2 text-start transition-colors duration-fast ease-fast ${
                      isActive
                        ? "border border-red-400 bg-red-subtle"
                        : "border border-transparent hover:bg-surface-raised"
                    }`}
                  >
                    <span
                      className={`w-6 shrink-0 text-center font-display text-h4 font-bold ${
                        isActive ? "text-red-400" : "text-text-tertiary"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span className="relative size-12 shrink-0 overflow-hidden rounded-md bg-surface-raised">
                      <Image
                        src={item.thumb}
                        alt={item.title}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </span>

                    <span className="flex flex-col overflow-hidden">
                      <span className="truncate text-sm font-semibold text-text-primary">
                        {item.title}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {formatToman(item.price)}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}