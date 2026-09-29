"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingBag, PackageCheck, Clock, Wallet } from "lucide-react";
import { useOrders } from "@/components/order/OrdersProvider";
import { DEMO_ORDERS } from "@/lib/data/demo-orders";
import AccountOrderRow, { AccountEmpty } from "@/components/account/AccountOrderRow";
import type { Order } from "@/lib/types/order";
import { isInFlight, resolveStage } from "@/lib/utils/fulfillment";
import { formatNumber } from "@/lib/utils";
import { FOCUS, cx } from "@/components/layout/Navbar/navbar-styles";

const statCard = cx(
  "rounded-xl border border-border-subtle bg-surface p-4",
  "transition-colors duration-fast hover:border-border-strong",
);

/** Dashboard: totals, the order currently in flight, and recent orders. */
export default function AccountOverview() {
  const { orders, hydrated } = useOrders();

  if (!hydrated) {
    return (
      <div className="rounded-xl border border-border-subtle bg-surface p-10 text-center text-sm text-text-tertiary">
        در حال بارگذاری پنل کاربری…
      </div>
    );
  }

  // Fall back to the demo book so the panel is reviewable before a purchase.
  const usingDemo = orders.length === 0;
  const list: Order[] = usingDemo ? DEMO_ORDERS : orders;
  const now = Date.now();

  const paid = list.filter((o) => o.status === "paid");
  const totalSpent = paid.reduce((sum, o) => sum + o.total, 0);
  const totalSaved = paid.reduce((sum, o) => sum + o.discount, 0);
  const delivered = paid.filter((o) => resolveStage(o, now) === "delivered").length;
  const inFlight = paid.filter((o) => isInFlight(o, now));

  const stats = [
    { icon: ShoppingBag, label: "سفارش موفق", value: formatNumber(paid.length) },
    { icon: Wallet, label: "مجموع خرید", value: `${formatNumber(totalSpent)} تومان` },
    { icon: Clock, label: "در جریان", value: formatNumber(inFlight.length) },
    { icon: PackageCheck, label: "تحویل شده", value: formatNumber(delivered) },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* عنوان */}
      <header>
        <p className="text-kicker text-red-400">پیشخوان</p>
        <h1 className="mt-1 font-display text-h3 font-bold text-text-primary sm:text-h2">
          سلام، خوش آمدید 👋
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          خلاصه‌ی خریدها، وضعیت سفارش‌های در جریان و رسیدهای شما در یک نگاه.
        </p>
      </header>

      {usingDemo ? (
        <p className="rounded-lg border border-accent-500/30 bg-accent-subtle px-4 py-3 text-xs text-accent-400">
          این نسخه‌ی نمایشی است و بک‌اندی متصل نیست؛ برای اینکه بتوانید پنل را ببینید، چند سفارش
          نمونه نمایش داده می‌شود. به‌محض ثبت اولین خرید، سفارش‌های واقعی شما اینجا می‌آید.
        </p>
      ) : null}

      {/* آمار */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className={statCard}>
            <span className="grid size-9 place-items-center rounded-lg bg-red-subtle text-red-400">
              <Icon className="size-4" aria-hidden />
            </span>
            <p className="mt-3 text-xs text-text-tertiary">{label}</p>
            <p className="mt-1 font-display text-h4 font-bold tabular-nums text-text-primary">
              {value}
            </p>
          </div>
        ))}
      </div>

      {totalSaved > 0 ? (
        <p className="text-xs text-text-tertiary">
          با خرید از گیم‌استور <span className="font-bold text-success">{formatNumber(totalSaved)} تومان</span>{" "}
          سود کرده‌اید.
        </p>
      ) : null}

      {list.length === 0 ? (
        <AccountEmpty
          title="هنوز سفارشی ثبت نکرده‌اید"
          description="اولین خرید خود را انجام دهید تا سفارش‌ها و رسیدها اینجا نمایش داده شود."
          action={{ href: "/games", label: "رفتن به فروشگاه" }}
        />
      ) : (
        <>
          {/* سفارش در جریان */}
          {inFlight.length > 0 ? (
            <section>
              <h2 className="mb-3 font-display text-base font-bold text-text-primary">
                سفارش در جریان
              </h2>
              <ul className="flex flex-col gap-3">
                {inFlight.slice(0, 2).map((order) => (
                  <li key={order.id}>
                    <OrderMiniCard order={order} now={now} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* آخرین سفارش‌ها */}
          <section>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="font-display text-base font-bold text-text-primary">
                آخرین سفارش‌ها
              </h2>
              <Link
                href="/account/orders"
                className={cx(
                  "inline-flex items-center gap-1.5 text-xs font-bold text-red-400",
                  "transition-colors duration-fast hover:text-red-500",
                  FOCUS,
                )}
              >
                مشاهده همه
                <ArrowLeft className="size-3.5" aria-hidden />
              </Link>
            </div>

            <ul className="flex flex-col gap-3">
              {list.slice(0, 3).map((order) => (
                <AccountOrderRow
                  key={order.id}
                  order={order}
                  now={now}
                  isDemo={usingDemo}
                />
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}

/** Compact card for the order that is currently moving through the flow. */
function OrderMiniCard({ order, now }: { order: Order; now: number }) {
  const stage = resolveStage(order, now);

  const stageText: Record<string, string> = {
    processing: "در حال پردازش و تأیید",
    preparing: "در حال آماده‌سازی و بسته‌بندی",
    shipped: "ارسال شده — در راه شما",
    delivered: "تحویل داده شد",
  };

  return (
    <Link
      href={`/account/orders/${order.id}`}
      className={cx(
        "flex items-center gap-4 rounded-xl border border-border-subtle bg-surface p-4",
        "transition-colors duration-fast hover:border-red-500/50",
        FOCUS,
      )}
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-red-subtle text-red-400">
        <PackageCheck className="size-5" aria-hidden />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block font-display text-sm font-bold tabular-nums text-text-primary">
          {order.id}
        </span>
        <span className="mt-0.5 block text-xs text-text-secondary">
          {stageText[stage]}
        </span>
      </span>

      <ArrowLeft className="size-4 shrink-0 text-text-tertiary" aria-hidden />
    </Link>
  );
}
