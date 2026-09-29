"use client";

import Image from "next/image";
import Link from "next/link";
import { PackageSearch } from "lucide-react";
import type { Order } from "@/lib/types/order";
import { formatDate, formatNumber } from "@/lib/utils";
import { statusMeta } from "@/components/order/OrderSummary";
import { resolveStage } from "@/lib/utils/fulfillment";
import { FOCUS, cx } from "@/components/layout/Navbar/navbar-styles";

const stageLabels: Record<string, string> = {
  processing: "در حال پردازش",
  preparing: "در حال آماده‌سازی",
  shipped: "ارسال شده",
  delivered: "تحویل داده شده",
};

/** One order row in the account panel's order list. */
export default function AccountOrderRow({
  order,
  isDemo = false,
  now,
}: {
  order: Order;
  isDemo?: boolean;
  now: number;
}) {
  const payment = statusMeta[order.status];
  const stage = resolveStage(order, now);

  return (
    <li className="rounded-xl border border-border-subtle bg-surface p-4 transition-colors duration-fast hover:border-border-strong">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-display text-sm font-bold tabular-nums text-text-primary">
            {order.id}
          </span>
          {isDemo ? (
            <span className="rounded-full border border-accent-500/40 bg-accent-subtle px-2 py-0.5 text-[10px] font-bold text-accent-400">
              نمونه
            </span>
          ) : null}
        </div>

        <span
          className={cx(
            "flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold",
            payment.className,
          )}
        >
          <span aria-hidden className={cx("size-2 rounded-full", payment.dot)} />
          {payment.label}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2">
        {order.items.slice(0, 4).map((item) => (
          <span
            key={item.id}
            title={item.title}
            className="relative size-11 shrink-0 overflow-hidden rounded-lg border border-border-subtle bg-media"
          >
            <Image src={item.coverImage} alt={item.title} fill sizes="44px" className="object-cover" />
          </span>
        ))}
        {order.items.length > 4 ? (
          <span className="text-xs font-semibold text-text-tertiary">
            +{formatNumber(order.items.length - 4)}
          </span>
        ) : null}

        <span className="ms-auto text-xs text-text-tertiary">{formatDate(order.createdAt)}</span>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle pt-3">
        <p className="text-sm">
          <span className="text-text-tertiary">مرحله: </span>
          <span className="font-semibold text-text-primary">
            {order.status === "paid" ? stageLabels[stage] : "—"}
          </span>
        </p>

        <p className="font-display text-sm font-bold tabular-nums text-red-400">
          {formatNumber(order.total)} <span className="text-[11px]">تومان</span>
        </p>
      </div>

      <div className="mt-3">
        <Link
          href={`/account/orders/${order.id}`}
          className={cx(
            "inline-flex h-9 w-full items-center justify-center rounded-lg border border-border-strong",
            "text-xs font-bold text-text-primary transition-colors duration-fast hover:border-red-500/60 hover:text-red-400",
            FOCUS,
          )}
        >
          پیگیری سفارش
        </Link>
      </div>
    </li>
  );
}

/** Shared empty state for the account panel. */
export function AccountEmpty({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="rounded-xl border border-border-subtle bg-surface px-6 py-14 text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-full border border-border-subtle bg-surface-raised">
        <PackageSearch className="size-6 text-text-tertiary" aria-hidden />
      </span>
      <h2 className="mt-4 font-display text-h4 font-bold text-text-primary">{title}</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-text-secondary">{description}</p>

      {action ? (
        <Link
          href={action.href}
          className={cx(
            "mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-red-500 px-6",
            "text-sm font-bold text-text-inverse transition-colors duration-fast hover:bg-red-600",
            FOCUS,
          )}
        >
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}
