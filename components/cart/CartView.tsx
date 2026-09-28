"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingCart, Trash2 } from "lucide-react";
import CartItemRow from "@/components/cart/CartItemRow";
import CartSummary, { SummaryAction } from "@/components/cart/CartSummary";
import { useCart } from "@/components/cart/CartProvider";
import { formatNumber } from "@/lib/utils";
import { FOCUS, cx } from "@/components/layout/Navbar/navbar-styles";

/** Cart page body — client because the cart lives in localStorage. */
export default function CartView() {
  const { items, totals, hydrated, clearCart } = useCart();

  if (!hydrated) {
    return (
      <div className="rounded-2xl border border-border-subtle bg-surface p-10 text-center text-sm text-text-tertiary">
        در حال بارگذاری سبد خرید…
      </div>
    );
  }

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
      {/* لیست کالاها */}
      <section aria-label="کالاهای سبد خرید">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-sm text-text-secondary">
            <span className="font-bold tabular-nums text-text-primary">
              {formatNumber(totals.count)}
            </span>{" "}
            کالا در سبد خرید شما
          </p>

          <button
            type="button"
            onClick={clearCart}
            className={cx(
              "flex items-center gap-1.5 text-xs font-semibold text-text-tertiary",
              "transition-colors duration-fast hover:text-red-400",
              FOCUS,
            )}
          >
            <Trash2 className="size-4" aria-hidden />
            حذف همه
          </button>
        </div>

        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}
        </ul>

        <Link
          href="/games"
          className={cx(
            "mt-6 inline-flex items-center gap-2 text-sm font-semibold text-text-secondary",
            "transition-colors duration-fast hover:text-red-400",
            FOCUS,
          )}
        >
          <ArrowLeft className="size-4" aria-hidden />
          ادامه‌ی خرید
        </Link>
      </section>

      {/* خلاصه‌ی سفارش */}
      <CartSummary items={items} totals={totals}>
        <SummaryAction href="/checkout">
          <ShoppingCart className="size-4" aria-hidden />
          ادامه‌ی فرآیند خرید
        </SummaryAction>

        <p className="text-center text-xs text-text-tertiary">
          با ادامه‌ی فرآیند خرید،{" "}
          <Link href="/terms" className="text-accent-500 hover:underline">
            قوانین و مقررات
          </Link>{" "}
          را می‌پذیرید.
        </p>
      </CartSummary>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="rounded-2xl border border-border-subtle bg-surface px-6 py-16 text-center">
      <span className="mx-auto grid size-16 place-items-center rounded-full border border-red-500/40 bg-red-subtle">
        <ShoppingCart className="size-7 text-red-400" aria-hidden />
      </span>

      <h2 className="mt-5 font-display text-h3 font-bold text-text-primary">
        سبد خرید شما خالی است
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-text-secondary">
        از فروشگاه یا بخش پرفروش‌ترین‌ها یک بازی یا کنسول انتخاب کنید تا اینجا نمایش داده شود.
      </p>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/games"
          className={cx(
            "flex h-11 items-center justify-center gap-2 rounded-lg bg-red-500 px-6 text-sm font-bold text-text-inverse",
            "transition-colors duration-fast hover:bg-red-600",
            FOCUS,
          )}
        >
          مشاهده‌ی فروشگاه
        </Link>
        <Link
          href="/"
          className={cx(
            "flex h-11 items-center justify-center rounded-lg border border-border-strong px-6 text-sm font-semibold text-text-primary",
            "transition-colors duration-fast hover:border-red-500/60 hover:text-red-400",
            FOCUS,
          )}
        >
          بازگشت به خانه
        </Link>
      </div>
    </div>
  );
}
