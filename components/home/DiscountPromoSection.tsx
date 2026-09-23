"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * =====================================================================
 * DiscountPromoSection
 * ---------------------------------------------------------------------
 * - ۴ آیکن اعتماد (ارسال سریع / پرداخت امن / پشتیبانی ۲۴-۷ / ضمانت اصالت)
 * - بنر تخفیف اصلی (عکسی که فرستادید) + ساعت‌شمار زنده + دکمه CTA روش
 *
 * TODO بک‌اند: فقط DISCOUNT_END_DATE باید از API بیاد (تاریخ پایان کمپین).
 * خودِ شمارش معکوس (useEffect پایین) کاملاً فرانتی می‌مونه.
 * =====================================================================
 */

// TODO: این تاریخ رو با تاریخ واقعی پایان کمپین (از بک‌اند) جایگزین کنید
const DISCOUNT_END_DATE = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000);

const TRUST_ITEMS = [
  {
    label: "ارسال سریع",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25h-6c-.621 0-1.125.504-1.125 1.125v8.25c0 .621.504 1.125 1.125 1.125h1.5" />
      </svg>
    ),
  },
  {
    label: "پرداخت امن",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    label: "پشتیبانی ۲۴/۷",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 9.75V6.75a4.5 4.5 0 1 0-9 0v3M4.5 9.75h1.5a1.5 1.5 0 0 1 1.5 1.5v3.75a1.5 1.5 0 0 1-1.5 1.5H4.5a1.5 1.5 0 0 1-1.5-1.5v-3.75a1.5 1.5 0 0 1 1.5-1.5Zm13.5 0h1.5a1.5 1.5 0 0 1 1.5 1.5v3.75a1.5 1.5 0 0 1-1.5 1.5h-1.5a1.5 1.5 0 0 1-1.5-1.5v-3.75a1.5 1.5 0 0 1 1.5-1.5Zm-1.5 8.25v.75a2.25 2.25 0 0 1-2.25 2.25h-1.5" />
      </svg>
    ),
  },
  {
    label: "ضمانت اصالت",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
];

function useCountdown(target: Date) {
  const [remaining, setRemaining] = useState(() => Math.max(0, target.getTime() - Date.now()));

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(Math.max(0, target.getTime() - Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  const totalSeconds = Math.floor(remaining / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export default function DiscountPromoSection() {
  const { days, hours, minutes, seconds } = useCountdown(DISCOUNT_END_DATE);

  return (
    <section className="mx-auto max-w-page px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      
      <h2 className="mb-6 text-h2 flex justify-center  font-display text-text-primary">
        
        پیشنهاد لحظه‌ای
      </h2>

      <div className="flex flex-col gap-4 lg:flex-row-reverse lg:gap-5">
        {/* ۴ آیکن اعتماد */}
        <div className="grid grid-cols-2 gap-3 lg:w-[280px] lg:shrink-0 lg:grid-cols-2">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center justify-center gap-2 rounded-xl border border-border-subtle bg-surface px-3 py-5 text-center"
            >
              <span className="text-accent-400">{item.icon}</span>
              <span className="text-xs font-medium text-text-secondary">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* بنر تخفیف + ساعت‌شمار + دکمه */}
        <div className="relative flex-1 overflow-hidden rounded-2xl">
          <div className="relative aspect-[1512/553] w-full">
            <Image
              src="/images/promo/discount-banner.webp"
              alt="تخفیف‌های ویژه و شگفت‌انگیز، تا ۳۰٪ تخفیف"
              fill
              sizes="(min-width: 1024px) 900px, 100vw"
              className="object-cover object-center"
              priority
            />
          </div>

          {/* ساعت‌شمار + دکمه، زیر متن «۳۰٪ تخفیف» روی خودِ عکس */}
          <div className="absolute bottom-4 right-4 z-10 flex flex-wrap items-center gap-3 sm:bottom-6 sm:right-8 sm:gap-4">
            
            <Link
              href="/discounts"
              className="inline-flex items-center justify-center rounded-lg bg-red-500 px-4 py-2.5 text-xs font-medium text-white shadow-lg transition-colors duration-base ease-standard hover:bg-red-600 sm:px-5 sm:text-sm"
            >
              مشاهده تخفیف‌ها
            </Link>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {[

                { value: seconds, label: "ثانیه" },
                { value: minutes, label: "دقیقه" },
                { value: hours, label: "ساعت" },
                { value: days, label: "روز" },
                
                
              ].map((unit) => (
                <div
                  key={unit.label}
                  className="flex w-11 flex-col items-center rounded-lg border border-white/15 bg-black/50 py-1.5 backdrop-blur-md sm:w-14 sm:py-2"
                >
                  <span className="text-sm font-bold text-white sm:text-lg">
                    {unit.value.toLocaleString("fa-IR", { minimumIntegerDigits: 2 })}
                  </span>
                  <span className="text-[9px] text-white/60 sm:text-[10px]">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}