"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { formatNumber } from "@/lib/utils";
import type { CartItem } from "@/lib/types/cart";
import { FOCUS, cx } from "@/components/layout/Navbar/navbar-styles";

type CartItemRowProps = {
  item: CartItem;
};

const stepBtn = cx(
  "grid size-8 place-items-center rounded-md border border-border-strong text-text-secondary",
  "transition-colors duration-fast ease-fast hover:border-red-500/60 hover:text-red-400",
  "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border-strong disabled:hover:text-text-secondary",
  FOCUS,
);

export default function CartItemRow({ item }: CartItemRowProps) {
  const { setQuantity, removeItem } = useCart();
  const lineTotal = item.price * item.quantity;
  const saved = item.compareAtPrice ? (item.compareAtPrice - item.price) * item.quantity : 0;

  return (
    <li className="group relative flex gap-4 rounded-2xl border border-border-subtle bg-surface p-3 transition-[border-color,box-shadow] duration-base ease-standard hover:border-border-strong sm:items-center sm:p-4">
      <Link
        href={item.href}
        className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-media sm:size-28"
        tabIndex={-1}
        aria-hidden
      >
        <Image
          src={item.coverImage}
          alt=""
          fill
          sizes="112px"
          className="object-cover transition-transform duration-slow ease-standard group-hover:scale-105"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        {/* عنوان + حذف */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-text-primary sm:text-base">
              <Link
                href={item.href}
                className="transition-colors duration-fast hover:text-red-400"
              >
                {item.title}
              </Link>
            </h3>

            <p className="mt-1 text-xs text-text-tertiary">
              {formatNumber(item.price)} تومان
              {item.compareAtPrice ? (
                <>
                  {" · "}
                  <span className="text-text-tertiary line-through">
                    {formatNumber(item.compareAtPrice)}
                  </span>
                </>
              ) : null}
            </p>
          </div>

          <button
            type="button"
            onClick={() => removeItem(item.id)}
            aria-label={`حذف ${item.title} از سبد خرید`}
            className={cx(
              "grid size-9 shrink-0 place-items-center rounded-md text-text-tertiary",
              "transition-colors duration-fast ease-fast hover:bg-red-subtle hover:text-red-400",
              FOCUS,
            )}
          >
            <Trash2 className="size-4" aria-hidden />
          </button>
        </div>

        {/* تعداد + قیمت */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              aria-label="کاهش تعداد"
              className={stepBtn}
            >
              <Minus className="size-4" aria-hidden />
            </button>

            <span className="min-w-9 text-center text-sm font-bold tabular-nums text-text-primary">
              {formatNumber(item.quantity)}
            </span>

            <button
              type="button"
              onClick={() => setQuantity(item.id, item.quantity + 1)}
              disabled={item.quantity >= 9}
              aria-label="افزایش تعداد"
              className={stepBtn}
            >
              <Plus className="size-4" aria-hidden />
            </button>
          </div>

          <div className="text-end">
            <p className="text-base font-bold tabular-nums text-red-400">
              {formatNumber(lineTotal)} <span className="text-xs">تومان</span>
            </p>
            {saved > 0 ? (
              <p className="text-xs text-success">سود شما: {formatNumber(saved)} تومان</p>
            ) : null}
          </div>
        </div>
      </div>
    </li>
  );
}
