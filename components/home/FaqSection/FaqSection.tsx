"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { faqItems } from "./faq-data";

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <section className="relative mx-auto max-w-page overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:flex-row-reverse lg:items-center lg:gap-16">
        {/* دسته کنسول — سمت راست، با شکل‌های هندسی شناور پشتش */}
        <div className="relative mx-auto w-full max-w-[380px] shrink-0 lg:mx-0 lg:max-w-[440px]">
          {/* شکل‌های هندسی متحرک پشت دسته */}
          <ShapeFloating className="left-2 top-4 size-10 sm:size-12" delay="0s" duration="6s">
            <TriangleShape />
          </ShapeFloating>
          <ShapeFloating className="right-4 top-0 size-14 sm:size-16" delay="0.8s" duration="7s">
            <CircleShape />
          </ShapeFloating>
          <ShapeFloating className="bottom-6 right-10 size-9 sm:size-11" delay="1.4s" duration="5.5s">
            <SquareShape />
          </ShapeFloating>
          <ShapeFloating className="bottom-16 left-0 size-8 sm:size-9" delay="2s" duration="6.5s">
            <CircleShape small />
          </ShapeFloating>

          {/* گلوی قرمز پشت دسته */}
          <div className="absolute inset-0 -z-10 rounded-full bg-red-500/10 blur-3xl" aria-hidden />

          <div className="relative animate-[float-controller_5s_ease-in-out_infinite]">
            <Image
              src="/images/faq/controller.webp"
              alt="دسته کنسول"
              width={700}
              height={620}
              className="h-auto w-full object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.5)]"
              priority
            />
          </div>
        </div>

        {/* متن + آکاردئون — سمت چپ */}
        <div className="flex flex-1 flex-col">
          {/* هدر — وسط‌چین مثل عکس */}
          <div className="mx-auto mb-10 flex max-w-lg flex-col items-center gap-3 text-center lg:mx-0 lg:items-start lg:text-right">
            <span className="flex items-center gap-1.5 text-sm font-bold text-red-400">
              سوالات متداول
            </span>
            <h2 className="font-display text-h3 font-bold text-text-primary sm:text-h2">
              هر سوالی داری، اینجا جوابشه!
            </h2>
            <p className="text-sm leading-7 text-text-secondary sm:text-base">
              ما تمام تلاشمون رو کردیم تا پرتکرارترین سوالات شما رو پاسخ
              بدیم. اگر سوال خودتون رو پیدا نکردید، از طریق پشتیبانی با ما
              در ارتباط باشید.
            </p>
          </div>

          {/* آکاردئون */}
          <div className="flex flex-col gap-3">
            {faqItems.map((item) => {
              const isOpen = item.id === openId;
              return (
                <div
                  key={item.id}
                  className={`overflow-hidden rounded-xl border transition-colors duration-base ease-standard ${
                    isOpen ? "border-red-400/40 bg-red-subtle" : "border-border-subtle bg-surface"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-4 text-start sm:px-5"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-base ease-standard ${
                        isOpen
                          ? "border-red-400 bg-red-500 text-text-inverse"
                          : "border-border-strong text-text-secondary"
                      }`}
                    >
                      {isOpen ? <Minus className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}
                    </span>
                    <span className="flex-1 text-sm font-semibold text-text-primary sm:text-base">
                      {item.question}
                    </span>
                  </button>

                  <div
                    className="grid transition-all duration-base ease-standard"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-4 pb-4 text-sm leading-7 text-text-secondary sm:px-5 sm:text-base">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-controller {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-14px) rotate(1.5deg);
          }
        }
        @keyframes float-shape {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-16px) translateX(6px) rotate(12deg);
          }
        }
      `}</style>
    </section>
  );
}

function ShapeFloating({
  className,
  delay,
  duration,
  children,
}: {
  className: string;
  delay: string;
  duration: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`pointer-events-none absolute ${className}`}
      style={{ animation: `float-shape ${duration} ease-in-out infinite`, animationDelay: delay }}
      aria-hidden
    >
      {children}
    </div>
  );
}

function TriangleShape() {
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full">
      <path
        d="M24 6 L42 40 L6 40 Z"
        fill="none"
        stroke="var(--color-red-400)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CircleShape({ small }: { small?: boolean }) {
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full">
      <circle
        cx="24"
        cy="24"
        r={small ? 14 : 18}
        fill="none"
        stroke="var(--color-red-400)"
        strokeWidth="4"
      />
    </svg>
  );
}

function SquareShape() {
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full">
      <rect
        x="8"
        y="8"
        width="32"
        height="32"
        rx="4"
        fill="none"
        stroke="var(--color-red-400)"
        strokeWidth="4"
      />
    </svg>
  );
}