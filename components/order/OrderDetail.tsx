"use client";

import Link from "next/link";
import { PackageSearch } from "lucide-react";
import OrderSummary from "@/components/order/OrderSummary";
import { useOrders } from "@/components/order/OrdersProvider";
import { FOCUS, cx } from "@/components/layout/Navbar/navbar-styles";

type OrderDetailProps = {
  orderId: string;
};

/** Reads the order from the client store (mock until the API is connected). */
export default function OrderDetail({ orderId }: OrderDetailProps) {
  const { getOrder, hydrated } = useOrders();

  if (!hydrated) {
    return (
      <div className="rounded-2xl border border-border-subtle bg-surface p-10 text-center text-sm text-text-tertiary">
        در حال بارگذاری سفارش…
      </div>
    );
  }

  const order = getOrder(orderId);

  if (!order) {
    return (
      <div className="rounded-2xl border border-border-subtle bg-surface px-6 py-14 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full border border-border-subtle bg-surface-raised">
          <PackageSearch className="size-6 text-text-tertiary" aria-hidden />
        </span>
        <h2 className="mt-4 font-display text-h4 font-bold text-text-primary">
          سفارشی با این شماره پیدا نشد
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-text-secondary">
          سفارش‌ها در این نسخه‌ی نمایشی فقط روی همان مرورگری ذخیره می‌شوند که خرید در آن انجام
          شده است. پس از اتصال بک‌اند، همه‌ی سفارش‌ها از سرور خوانده می‌شوند.
        </p>

        <Link
          href="/games"
          className={cx(
            "mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-red-500 px-6 text-sm font-bold text-text-inverse",
            "transition-colors duration-fast hover:bg-red-600",
            FOCUS,
          )}
        >
          بازگشت به فروشگاه
        </Link>
      </div>
    );
  }

  return <OrderSummary order={order} />;
}
