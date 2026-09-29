"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useOrders } from "@/components/order/OrdersProvider";
import { DEMO_ORDERS } from "@/lib/data/demo-orders";
import AccountOrderRow, { AccountEmpty } from "@/components/account/AccountOrderRow";
import type { Order } from "@/lib/types/order";
import { FOCUS, cx } from "@/components/layout/Navbar/navbar-styles";

type FilterKey = "all" | "in-flight" | "delivered" | "pending";

const FILTERS: { id: FilterKey; label: string }[] = [
  { id: "all", label: "همه" },
  { id: "in-flight", label: "در جریان" },
  { id: "delivered", label: "تحویل شده" },
  { id: "pending", label: "در انتظار پرداخت" },
];

const chip = cx(
  "flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold",
  "transition-colors duration-fast",
);

const iconButton = cx(
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border-strong",
  "bg-canvas/60 text-text-secondary transition-colors duration-fast hover:border-red-500/60 hover:text-red-400",
  FOCUS,
);

/** All of the user's orders, with a status filter and a search box. */
export default function AccountOrders() {
  const { orders, hydrated } = useOrders();
  const [filter, setFilter] = useState<FilterKey>("all");
  const [term, setTerm] = useState("");

  const now = Date.now();

  const { usingDemo, list } = useMemo(() => {
    const demo = orders.length === 0;
    return { usingDemo: demo, list: demo ? DEMO_ORDERS : orders };
  }, [orders]);

  const query = term.trim().toLowerCase();

  const counts = useMemo(() => {
    const paid = list.filter((o) => o.status === "paid");
    return {
      all: list.length,
      "in-flight": paid.filter((o) => o.status === "paid" && o.fulfillmentStage !== "delivered").length,
      delivered: paid.filter((o) => o.fulfillmentStage === "delivered").length,
      pending: list.filter((o) => o.status === "pending").length,
    } as Record<FilterKey, number>;
  }, [list]);

  const filtered = useMemo(() => {
    let result = [...list];

    if (filter === "in-flight") {
      result = result.filter((o) => o.status === "paid" && o.fulfillmentStage !== "delivered");
    } else if (filter === "delivered") {
      result = result.filter((o) => o.fulfillmentStage === "delivered");
    } else if (filter === "pending") {
      result = result.filter((o) => o.status === "pending");
    }

    if (query) {
      result = result.filter(
        (o) =>
          o.id.toLowerCase().includes(query) ||
          o.items.some(
            (item) =>
              // Titles are Persian ("جی‌تی‌ای ۶"), so the slug is matched too
              // — otherwise "GTA" or "elden" would find nothing.
              item.title.toLowerCase().includes(query) ||
              item.slug.toLowerCase().includes(query),
          ),
      );
    }

    return result;
  }, [list, filter, query]);

  // Every hook above must run before this early return.
  if (!hydrated) {
    return (
      <div className="rounded-xl border border-border-subtle bg-surface p-10 text-center text-sm text-text-tertiary">
        در حال بارگذاری سفارش‌ها…
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-kicker text-red-400">سفارش‌ها</p>
        <h1 className="mt-1 font-display text-h3 font-bold text-text-primary sm:text-h2">
          سفارش‌های من
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          جریان هر سفارش را از آماده‌سازی تا تحویل دنبال کنید و رسید خرید را ببینید.
        </p>
      </header>

      {usingDemo ? (
        <p className="rounded-lg border border-accent-500/30 bg-accent-subtle px-4 py-3 text-xs text-accent-400">
          بک‌اند متصل نیست؛ این سفارش‌ها نمونه هستند تا پنل قابل بررسی باشد.
        </p>
      ) : null}

      {/* جستجو + فیلتر */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            aria-hidden
            className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-text-tertiary"
          />
          <input
            type="search"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="جستجوی شماره سفارش یا نام بازی…"
            aria-label="جستجوی سفارش"
            className={cx(
              "h-11 w-full rounded-md border border-border-strong bg-canvas/60 ps-10 pe-4",
              "text-sm text-text-primary placeholder:text-text-tertiary",
              "focus:border-red-500 focus:outline-none",
            )}
          />
        </div>

        <span className={iconButton} aria-hidden>
          <SlidersHorizontal className="size-4" />
        </span>
      </div>

      {/* چیپ‌های فیلتر */}
      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((item) => {
          const active = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              aria-pressed={active}
              className={cx(
                chip,
                FOCUS,
                active
                  ? "border-red-500 bg-red-subtle text-red-400"
                  : "border-border-subtle text-text-secondary hover:border-red-500/50 hover:text-red-400",
              )}
            >
              {item.label}
              <span className="tabular-nums opacity-70">({counts[item.id]})</span>
            </button>
          );
        })}
      </div>

      {/* نتیجه‌ها */}
      {filtered.length === 0 ? (
        <AccountEmpty
          title="سفارشی با این مشخصات پیدا نشد"
          description="فیلتر یا عبارت جستجو را تغییر دهید تا سفارش‌های دیگر نمایش داده شوند."
        />
      ) : (
        <>
          <p className="text-xs text-text-tertiary">
            {filtered.length.toLocaleString("fa-IR")} سفارش نمایش داده می‌شود
          </p>

          <ul className="flex flex-col gap-3">
            {filtered.map((order: Order) => (
              <AccountOrderRow
                key={order.id}
                order={order}
                now={now}
                isDemo={usingDemo}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
