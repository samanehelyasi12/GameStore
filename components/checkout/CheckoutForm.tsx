"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, LockKeyhole, ShoppingCart } from "lucide-react";
import CartSummary from "@/components/cart/CartSummary";
import { useCart } from "@/components/cart/CartProvider";
import { useOrders } from "@/components/order/OrdersProvider";
import CheckoutAddressFields, {
  emptyCustomer,
  validateCustomer,
  type CustomerForm,
} from "@/components/checkout/CheckoutAddressFields";
import PaymentMethodPicker from "@/components/checkout/PaymentMethodPicker";
import { makeOrderId } from "@/lib/utils";
import type { Order, PaymentMethod } from "@/lib/types/order";
import { FOCUS, cx } from "@/components/layout/Navbar/navbar-styles";

/** Checkout body: customer info + payment method → creates the order. */
export default function CheckoutForm() {
  const router = useRouter();
  const { items, totals, hydrated, clearCart } = useCart();
  const { placeOrder } = useOrders();

  const [form, setForm] = useState<CustomerForm>(emptyCustomer);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerForm, string>>>({});
  const [method, setMethod] = useState<PaymentMethod>("zarinpal");
  const [submitting, setSubmitting] = useState(false);

  if (!hydrated) {
    return (
      <div className="rounded-2xl border border-border-subtle bg-surface p-10 text-center text-sm text-text-tertiary">
        در حال بررسی سبد خرید…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-border-subtle bg-surface px-6 py-14 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full border border-red-500/40 bg-red-subtle">
          <ShoppingCart className="size-6 text-red-400" aria-hidden />
        </span>
        <h2 className="mt-4 font-display text-h4 font-bold text-text-primary">
          سبد خرید خالی است
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-text-secondary">
          برای ادامه‌ی خرید ابتدا یک کالا به سبد اضافه کنید.
        </p>
        <Link
          href="/games"
          className={cx(
            "mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-red-500 px-6 text-sm font-bold text-text-inverse",
            "transition-colors duration-fast hover:bg-red-600",
            FOCUS,
          )}
        >
          رفتن به فروشگاه
        </Link>
      </div>
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const found = validateCustomer(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document
        .querySelector<HTMLElement>('[aria-invalid="true"]')
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);

    const order: Order = {
      id: makeOrderId(),
      items,
      subtotal: totals.subtotal,
      discount: totals.discount,
      total: totals.total,
      status: "pending",
      paymentMethod: method,
      customer: { ...form, name: form.name.trim(), country: "ایران" },
      createdAt: new Date().toISOString(),
      refId: null,
    };

    placeOrder(order);
    clearCart();

    // TODO(backend): replace this with the real gateway redirect
    // (send `order.id` to the gateway and read the callback on the result page).
    router.push(`/payment/result?order=${order.id}&status=OK`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start"
    >
      <div className="flex flex-col gap-5">
        {/* اطلاعات گیرنده */}
        <section className="rounded-2xl border border-border-subtle bg-surface p-5 sm:p-6">
          <h2 className="mb-4 font-display text-base font-bold text-text-primary">
            اطلاعات گیرنده
          </h2>

          <CheckoutAddressFields value={form} onChange={setForm} errors={errors} />
        </section>

        {/* روش پرداخت */}
        <section className="rounded-2xl border border-border-subtle bg-surface p-5 sm:p-6">
          <PaymentMethodPicker value={method} onChange={setMethod} />
        </section>
      </div>

      {/* خلاصه + دکمه‌ی پرداخت */}
      <CartSummary items={items} totals={totals} sticky>
        <button
          type="submit"
          disabled={submitting}
          className={cx(
            "flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-red-500 text-sm font-bold text-text-inverse",
            "transition-colors duration-fast ease-fast hover:bg-red-600",
            "disabled:cursor-not-allowed disabled:opacity-70",
            FOCUS,
          )}
        >
          {submitting ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : (
            <LockKeyhole className="size-4" aria-hidden />
          )}
          {submitting ? "در حال انتقال به درگاه…" : "پرداخت و ثبت سفارش"}
        </button>

        <p className="text-center text-xs text-text-tertiary">
          با ثبت سفارش،{" "}
          <Link href="/terms" className="text-accent-500 hover:underline">
            قوانین و مقررات
          </Link>{" "}
          فروشگاه را می‌پذیرید.
        </p>
      </CartSummary>
    </form>
  );
}
