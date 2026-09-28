"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { CheckCircle2, ShieldCheck, Tag, Truck } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import type { CartItem, CartTotals } from "@/lib/types/cart";
import { FOCUS, cx } from "@/components/layout/Navbar/navbar-styles";

type CartSummaryProps = {
  items: CartItem[];
  totals: CartTotals;
  title?: string;
  /** Sticky on desktop (checkout rail). */
  sticky?: boolean;
  children?: ReactNode;
};

const perks = [
  { icon: ShieldCheck, text: "پرداخت امن از طریق درگاه بانکی" },
  { icon: Truck, text: "تحویل کلید فعال‌سازی کمتر از ۳۰ دقیقه" },
  { icon: CheckCircle2, text: "گارانتی معتبر روی تمام محصولات" },
];

/** Order summary panel — shared by the cart and the checkout page. */
export default function CartSummary({
  items,
  totals,
  title = "خلاصه‌ی سفارش",
  sticky = false,
  children,
}: CartSummaryProps) {
  return (
    <aside
      className={cx(
        "flex flex-col gap-5 rounded-2xl border border-border-subtle bg-surface p-5",
        sticky && "lg:sticky lg:top-28",
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border-subtle pb-4">
        <h2 className="font-display text-base font-bold text-text-primary">{title}</h2>
        <span className="rounded-full border border-border-subtle px-2.5 py-0.5 text-xs font-semibold text-text-secondary">
          {formatNumber(totals.count)} کالا
        </span>
      </div>

      <ul className="flex flex-col gap-3 text-sm">
        {items.slice(0, 4).map((item) => (
          <li key={item.id} className="flex items-center justify-between gap-3">
            <span className="truncate text-text-secondary">{item.title}</span>
            <span className="shrink-0 tabular-nums text-text-tertiary">
              ×{formatNumber(item.quantity)}
            </span>
          </li>
        ))}
        {items.length > 4 ? (
          <li className="text-xs text-text-tertiary">
            و {formatNumber(items.length - 4)} کالای دیگر
          </li>
        ) : null}
      </ul>

      <div className="flex flex-col gap-2.5 border-t border-border-subtle pt-4 text-sm">
        <div className="flex items-center justify-between text-text-secondary">
          <span>جمع کالاها</span>
          <span className="tabular-nums">{formatNumber(totals.subtotal)} تومان</span>
        </div>

        {totals.discount > 0 ? (
          <div className="flex items-center justify-between text-success">
            <span className="flex items-center gap-1.5">
              <Tag className="size-4" aria-hidden />
              تخفیف
            </span>
            <span className="tabular-nums">
              {formatNumber(totals.discount)} تومان
            </span>
          </div>
        ) : null}

        <div className="flex items-center justify-between text-text-secondary">
          <span>هزینه‌ی ارسال</span>
          <span className="text-success">رایگان (دیجیتال)</span>
        </div>

        <div className="mt-1 flex items-end justify-between border-t border-border-subtle pt-4">
          <span className="font-display text-base font-bold text-text-primary">
            مبلغ قابل پرداخت
          </span>
          <span className="font-display text-h4 font-bold tabular-nums text-red-400">
            {formatNumber(totals.total)} <span className="text-xs">تومان</span>
          </span>
        </div>
      </div>

      {children}

      <ul className="flex flex-col gap-2.5 border-t border-border-subtle pt-4">
        {perks.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-2 text-xs text-text-tertiary">
            <Icon className="size-4 shrink-0 text-red-500" aria-hidden />
            {text}
          </li>
        ))}
      </ul>
    </aside>
  );
}

/** Primary CTA used by the cart / checkout pages. */
export function SummaryAction({
  href,
  children,
  disabled,
  className,
}: {
  href: string;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={disabled ? "#" : href}
      aria-disabled={disabled || undefined}
      className={cx(
        "flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-red-500 text-sm font-bold text-text-inverse",
        "transition-colors duration-fast ease-fast hover:bg-red-600",
        disabled && "pointer-events-none opacity-50",
        className,
        FOCUS,
      )}
    >
      {children}
    </Link>
  );
}
