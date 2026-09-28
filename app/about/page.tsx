import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { aboutFeatures } from "@/components/home/AboutSection/about-data";
import { FOCUS, cx } from "@/components/layout/Navbar/navbar-styles";

export const metadata: Metadata = { title: "درباره ما" };

const stats = [
  { value: "+۱۲ سال", label: "تجربه در بازار بازی" },
  { value: "+۴۵ هزار", label: "سفارش موفق" },
  { value: "+۲۰ هزار", label: "کاربر فعال" },
  { value: "۲۴/۷", label: "پشتیبانی" },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "درباره ما" }]} />

      <section className="mx-auto w-full max-w-page px-3 pb-16 sm:px-4">
        <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-media">
          <Image
            src="/images/about/characters.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <span
            aria-hidden
            className="absolute inset-0"
            style={{ backgroundImage: "var(--gradient-hero)" }}
          />

          <div className="relative p-6 sm:p-10">
            <p className="text-kicker text-red-400">درباره‌ی ما</p>
            <h1 className="mt-1 max-w-2xl font-display text-h3 font-bold text-text-primary sm:text-h2">
              فروشگاه تخصصی بازی، کنسول و لوازم گیمینگ
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary sm:text-base">
              کار ما این است که خرید بازی اورجینال را ساده، سریع و مطمئن کنیم؛ از لحظه‌ی انتخاب تا
              تحویل کلید فعال‌سازی، کنار شما هستیم.
            </p>
          </div>
        </div>

        {/* آمار */}
        <ul className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((stat) => (
            <li
              key={stat.label}
              className="rounded-xl border border-border-subtle bg-surface p-4 text-center"
            >
              <p className="font-display text-h4 font-bold tabular-nums text-red-400">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-text-tertiary">{stat.label}</p>
            </li>
          ))}
        </ul>

        {/* ارزش‌ها */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {aboutFeatures.map((feature) => (
            <section
              key={feature.id}
              className="rounded-xl border border-border-subtle bg-surface p-5"
            >
              <h2 className="font-display text-base font-bold text-text-primary">
                {feature.title}
              </h2>
              <p className="mt-2 text-sm text-text-secondary">{feature.description}</p>
            </section>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/games"
            className={cx(
              "flex h-11 items-center justify-center rounded-lg bg-red-500 px-6 text-sm font-bold text-text-inverse",
              "transition-colors duration-fast hover:bg-red-600",
              FOCUS,
            )}
          >
            مشاهده‌ی فروشگاه
          </Link>
          <Link
            href="/contact"
            className={cx(
              "flex h-11 items-center justify-center rounded-lg border border-border-strong px-6 text-sm font-semibold text-text-primary",
              "transition-colors duration-fast hover:border-red-500/60 hover:text-red-400",
              FOCUS,
            )}
          >
            تماس با ما
          </Link>
        </div>
      </section>
    </>
  );
}
