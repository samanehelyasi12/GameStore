"use client";

import Image from "next/image";
import { Printer, Receipt } from "lucide-react";
import type { Order } from "@/lib/types/order";
import { formatDateTime, formatNumber } from "@/lib/utils";
import { paymentMethodLabels } from "@/components/order/OrderSummary";
import { FOCUS, cx } from "@/components/layout/Navbar/navbar-styles";

/**
 * Printable receipt for one order. Everything except the print button is
 * hidden when printing (see the `print:` utilities and globals.css).
 */
export default function OrderReceipt({ order }: { order: Order }) {
  return (
    <section className="rounded-xl border border-border-subtle bg-surface p-5">
      <header className="mb-5 flex flex-wrap items-start justify-between gap-3 border-b border-border-subtle pb-4">
        <div>
          <h2 className="flex items-center gap-2 font-display text-base font-bold text-text-primary">
            <Receipt className="size-4 text-red-500" aria-hidden />
            رسید خرید
          </h2>
          <p className="mt-1 text-xs tabular-nums text-text-tertiary">
            {order.id} · {formatDateTime(order.createdAt)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className={cx(
            "inline-flex h-9 items-center gap-2 rounded-lg border border-border-strong px-3",
            "text-xs font-semibold text-text-primary transition-colors duration-fast hover:border-red-500/60 hover:text-red-400",
            "print:hidden",
            FOCUS,
          )}
        >
          <Printer className="size-4" aria-hidden />
          چاپ رسید
        </button>
      </header>

      {/* اقلام */}
      <table className="w-full border-collapse text-start text-sm">
        <thead>
          <tr className="border-b border-border-subtle text-xs text-text-tertiary">
            <th scope="col" className="pb-2 text-start font-semibold">کالا</th>
            <th scope="col" className="pb-2 text-center font-semibold">تعداد</th>
            <th scope="col" className="pb-2 text-end font-semibold">مبلغ</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => (
            <tr key={item.id} className="border-b border-border-subtle last:border-0">
              <td className="py-3">
                <span className="flex items-center gap-3">
                  <span className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-media">
                    <Image src={item.coverImage} alt="" fill sizes="40px" className="object-cover" />
                  </span>
                  <span className="min-w-0 truncate text-text-primary">{item.title}</span>
                </span>
              </td>
              <td className="py-3 text-center tabular-nums text-text-secondary">
                {formatNumber(item.quantity)}
              </td>
              <td className="py-3 text-end tabular-nums text-text-secondary">
                {formatNumber(item.price * item.quantity)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* مبالغ */}
      <dl className="mt-4 flex flex-col gap-2 text-sm">
        <div className="flex items-center justify-between text-text-secondary">
          <dt>جمع کالاها</dt>
          <dd className="tabular-nums">{formatNumber(order.subtotal)} تومان</dd>
        </div>

        {order.discount > 0 ? (
          <div className="flex items-center justify-between text-success">
            <dt>تخفیف</dt>
            <dd className="tabular-nums">{formatNumber(order.discount)} تومان</dd>
          </div>
        ) : null}

        <div className="mt-1 flex items-end justify-between border-t border-border-subtle pt-3">
          <dt className="font-display font-bold text-text-primary">مبلغ قابل پرداخت</dt>
          <dd className="font-display text-base font-bold tabular-nums text-red-400">
            {formatNumber(order.total)} <span className="text-xs">تومان</span>
          </dd>
        </div>
      </dl>

      <p className="mt-4 border-t border-border-subtle pt-3 text-xs text-text-tertiary">
        روش پرداخت: {paymentMethodLabels[order.paymentMethod]}
        {order.refId ? ` — کد پیگیری: ${order.refId}` : ""}
      </p>
    </section>
  );
}
