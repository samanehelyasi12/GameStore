"use client";

import { CreditCard, Landmark, Wallet } from "lucide-react";
import type { PaymentMethod } from "@/lib/types/order";
import { cx } from "@/components/layout/Navbar/navbar-styles";

export const paymentMethods: {
  id: PaymentMethod;
  label: string;
  description: string;
  icon: typeof CreditCard;
  badge?: string;
}[] = [
  {
    id: "zarinpal",
    label: "درگاه بانکی زرین‌پال",
    description: "پرداخت با تمام کارت‌های عضو شتاب؛ تأیید آنی سفارش.",
    icon: CreditCard,
    badge: "پیشنهادی",
  },
  {
    id: "direct-debit",
    label: "کارت به کارت",
    description: "واریز دستی و ارسال رسید؛ تأیید پس از بررسی پشتیبانی.",
    icon: Landmark,
  },
  {
    id: "wallet",
    label: "کیف پول گیم‌استور",
    description: "پرداخت از موجودی حساب کاربری شما.",
    icon: Wallet,
  },
];

type PaymentMethodPickerProps = {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
};

/** Radio-card list of payment methods. */
export default function PaymentMethodPicker({
  value,
  onChange,
}: PaymentMethodPickerProps) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold text-text-secondary">
        روش پرداخت
      </legend>

      <div className="flex flex-col gap-2.5">
        {paymentMethods.map(({ id, label, description, icon: Icon, badge }) => {
          const active = value === id;
          return (
            <label
              key={id}
              className={cx(
                "flex cursor-pointer items-start gap-3 rounded-xl border p-4",
                "transition-[border-color,background-color] duration-fast ease-fast",
                active
                  ? "border-red-500 bg-red-subtle"
                  : "border-border-subtle bg-surface hover:border-border-strong",
              )}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={id}
                checked={active}
                onChange={() => onChange(id)}
                className="sr-only"
              />

              <span
                className={cx(
                  "mt-0.5 grid size-9 shrink-0 place-items-center rounded-md border",
                  active
                    ? "border-red-500/50 bg-red-500/10 text-red-400"
                    : "border-border-subtle bg-surface-raised text-text-tertiary",
                )}
              >
                <Icon className="size-4" aria-hidden />
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-text-primary">{label}</span>
                  {badge ? (
                    <span className="rounded-full border border-red-500/40 px-2 py-0.5 text-[11px] font-bold text-red-400">
                      {badge}
                    </span>
                  ) : null}
                </span>
                <span className="mt-1 block text-xs text-text-tertiary">
                  {description}
                </span>
              </span>

              <span
                aria-hidden
                className={cx(
                  "mt-1 grid size-5 shrink-0 place-items-center rounded-full border",
                  active ? "border-red-500" : "border-border-strong",
                )}
              >
                {active ? <span className="size-2.5 rounded-full bg-red-500" /> : null}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
