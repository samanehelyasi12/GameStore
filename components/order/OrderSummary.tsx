"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Mail, MapPin, Phone, User } from "lucide-react";
import type { Order, OrderStatus } from "@/lib/types/order";
import { formatDateTime, formatNumber } from "@/lib/utils";
import { cx } from "@/components/layout/Navbar/navbar-styles";

type OrderSummaryProps = {
  order: Order;
  /** Show the per-item list (off for compact summaries). */
  showItems?: boolean;
};

export const statusMeta: Record<
  OrderStatus,
  { label: string; className: string; dot: string }
> = {
  pending: {
    label: "در انتظار پرداخت",
    className: "border-warning/40 bg-warning/10 text-warning",
    dot: "bg-warning",
  },
  paid: {
    label: "پرداخت‌شده",
    className: "border-success/40 bg-success/10 text-success",
    dot: "bg-success",
  },
  failed: {
    label: "پرداخت ناموفق",
    className: "border-red-500/40 bg-red-subtle text-red-400",
    dot: "bg-red-500",
  },
  canceled: {
    label: "لغو شده",
    className: "border-border-subtle bg-surface-raised text-text-tertiary",
    dot: "bg-text-tertiary",
  },
};

export const paymentMethodLabels: Record<Order["paymentMethod"], string> = {
  zarinpal: "درگاه زرین‌پال",
  "direct-debit": "کارت به کارت",
  wallet: "کیف پول گیم‌استور",
};

export default function OrderSummary({ order, showItems = true }: OrderSummaryProps) {
  const status = statusMeta[order.status];

  return (
    <div className="flex flex-col gap-5">
      {/* سربرگ */}
      <header className="rounded-2xl border border-border-subtle bg-surface p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-kicker text-red-400">شماره‌ی سفارش</p>
            <p className="mt-1 font-display text-h3 font-bold tabular-nums text-text-primary">
              {order.id}
            </p>

            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-tertiary">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-4" aria-hidden />
                {formatDateTime(order.createdAt)}
              </span>
              <span>روش پرداخت: {paymentMethodLabels[order.paymentMethod]}</span>
              {order.refId ? <span className="tabular-nums">کد پیگیری: {order.refId}</span> : null}
            </p>
          </div>

          <span
            className={cx(
              "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold",
              status.className,
            )}
          >
            <span aria-hidden className={cx("size-2 rounded-full", status.dot)} />
            {status.label}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        {/* اقلام سفارش */}
        {showItems ? (
          <section className="rounded-2xl border border-border-subtle bg-surface p-5 sm:p-6">
            <h2 className="mb-4 font-display text-base font-bold text-text-primary">
              اقلام سفارش
            </h2>

            <ul className="flex flex-col gap-3">
              {order.items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 rounded-xl border border-border-subtle p-3"
                >
                  <span className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-media">
                    <Image
                      src={item.coverImage}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </span>

                  <span className="min-w-0 flex-1">
                    <Link
                      href={item.href}
                      className="truncate text-sm font-semibold text-text-primary transition-colors hover:text-red-400"
                    >
                      {item.title}
                    </Link>
                    <span className="mt-1 block text-xs text-text-tertiary">
                      تعداد: <span className="tabular-nums">{formatNumber(item.quantity)}</span> ×{" "}
                      {formatNumber(item.price)} تومان
                    </span>
                  </span>

                  <span className="shrink-0 text-sm font-bold tabular-nums text-red-400">
                    {formatNumber(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* اطلاعات مشتری + مبالغ */}
        <aside className="flex flex-col gap-5">
          <section className="rounded-2xl border border-border-subtle bg-surface p-5">
            <h2 className="mb-4 font-display text-base font-bold text-text-primary">
              اطلاعات گیرنده
            </h2>

            <ul className="flex flex-col gap-3 text-sm text-text-secondary">
              <li className="flex items-start gap-2">
                <User className="mt-0.5 size-4 shrink-0 text-red-500" aria-hidden />
                {order.customer.name}
              </li>
              <li className="flex items-start gap-2" dir="ltr">
                <Phone className="mt-0.5 size-4 shrink-0 text-red-500" aria-hidden />
                <span className="text-start">{order.customer.phone}</span>
              </li>
              <li className="flex items-start gap-2 break-all">
                <Mail className="mt-0.5 size-4 shrink-0 text-red-500" aria-hidden />
                <span className="text-start">{order.customer.email}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-red-500" aria-hidden />
                <span>
                  {order.customer.city}، {order.customer.address} — کد پستی{" "}
                  <span className="tabular-nums">{order.customer.postalCode}</span>
                </span>
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-border-subtle bg-surface p-5">
            <h2 className="mb-4 font-display text-base font-bold text-text-primary">
              صورتحساب
            </h2>

            <div className="flex flex-col gap-2.5 text-sm">
              <div className="flex items-center justify-between text-text-secondary">
                <span>جمع کالاها</span>
                <span className="tabular-nums">{formatNumber(order.subtotal)} تومان</span>
              </div>

              {order.discount > 0 ? (
                <div className="flex items-center justify-between text-success">
                  <span>تخفیف</span>
                  <span className="tabular-nums">{formatNumber(order.discount)} تومان</span>
                </div>
              ) : null}

              <div className="mt-1 flex items-end justify-between border-t border-border-subtle pt-4">
                <span className="font-display text-base font-bold text-text-primary">
                  مبلغ کل
                </span>
                <span className="font-display text-h4 font-bold tabular-nums text-red-400">
                  {formatNumber(order.total)} <span className="text-xs">تومان</span>
                </span>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
