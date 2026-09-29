"use client";

import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { useOrders } from "@/components/order/OrdersProvider";
import { DEMO_ORDERS } from "@/lib/data/demo-orders";
import OrderProgress from "@/components/account/OrderProgress";
import OrderReceipt from "@/components/account/OrderReceipt";
import { statusMeta } from "@/components/order/OrderSummary";
import { AccountEmpty } from "@/components/account/AccountOrderRow";
import { FOCUS, cx } from "@/components/layout/Navbar/navbar-styles";

/** One order: shipping flow, delivery address and printable receipt. */
export default function AccountOrderDetail({ orderId }: { orderId: string }) {
  const { orders, hydrated } = useOrders();

  if (!hydrated) {
    return (
      <div className="rounded-xl border border-border-subtle bg-surface p-10 text-center text-sm text-text-tertiary">
        در حال بارگذاری سفارش…
      </div>
    );
  }

  const usingDemo = orders.length === 0;
  const list = usingDemo ? DEMO_ORDERS : orders;
  const order = list.find((o) => o.id === orderId);

  if (!order) {
    return (
      <AccountEmpty
        title="سفارشی با این شماره پیدا نشد"
        description="شماره‌ی سفارش را بررسی کنید. در این نسخه‌ی نمایشی، سفارش‌ها فقط روی همان مرورگری ذخیره می‌شوند که خرید در آن انجام شده است."
        action={{ href: "/account/orders", label: "بازگشت به سفارش‌ها" }}
      />
    );
  }

  const now = Date.now();
  const payment = statusMeta[order.status];

  return (
    <div className="flex flex-col gap-5">
      {/* سربرگ */}
      <header>
        <Link
          href="/account/orders"
          className={cx(
            "inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary",
            "transition-colors duration-fast hover:text-red-400",
            FOCUS,
          )}
        >
          <ArrowRight className="size-3.5" aria-hidden />
          بازگشت به سفارش‌ها
        </Link>

        <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-kicker text-red-400">سفارش</p>
            <h1 className="mt-1 font-display text-h3 font-bold tabular-nums text-text-primary">
              {order.id}
            </h1>
          </div>

          <span
            className={cx(
              "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold",
              payment.className,
            )}
          >
            <span aria-hidden className={cx("size-2 rounded-full", payment.dot)} />
            {payment.label}
          </span>
        </div>
      </header>

      {/* جریان آماده‌سازی تا ارسال */}
      {order.status === "paid" ? (
        <OrderProgress order={order} now={now} />
      ) : (
        <p className="rounded-xl border border-warning/40 bg-warning/10 px-4 py-3 text-sm text-warning">
          {order.status === "pending"
            ? "این سفارش هنوز پرداخت نشده است؛ پس از پرداخت، مراحل آماده‌سازی و ارسال اینجا نمایش داده می‌شود."
            : "این سفارش پرداخت نشده و وارد جریان ارسال نشده است."}
        </p>
      )}

      {/* آدرس تحویل */}
      <section className="rounded-xl border border-border-subtle bg-surface p-5">
        <h2 className="mb-3 flex items-center gap-2 font-display text-base font-bold text-text-primary">
          <MapPin className="size-4 text-red-500" aria-hidden />
          آدرس تحویل
        </h2>
        <p className="text-sm leading-7 text-text-secondary">
          {order.customer.province}، {order.customer.city}، {order.customer.address} — واحد{" "}
          <span className="tabular-nums">{order.customer.houseNumber}</span>
          <br />
          کد پستی: <span className="tabular-nums">{order.customer.postalCode}</span>
          {" · "}گیرنده: {order.customer.name}
        </p>
      </section>

      {/* رسید */}
      <OrderReceipt order={order} />

      {usingDemo ? (
        <p className="text-center text-xs text-text-tertiary">
          این یک سفارش نمونه است (بک‌اند متصل نیست).
        </p>
      ) : null}
    </div>
  );
}
