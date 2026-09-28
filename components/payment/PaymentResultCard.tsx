"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Loader2,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import { useOrders } from "@/components/order/OrdersProvider";
import { formatNumber } from "@/lib/utils";
import { FOCUS, cx } from "@/components/layout/Navbar/navbar-styles";

type PaymentResultCardProps = {
  /** Gateway callback status: "OK" | "NOK" | anything else. */
  status: string | null;
  orderId: string | null;
};

/** Result page body — finalises the order status like a gateway callback. */
export default function PaymentResultCard({ status, orderId }: PaymentResultCardProps) {
  const { getOrder, updateStatus, hydrated } = useOrders();
  const [finalizing, setFinalizing] = useState(false);

  const success = status?.toUpperCase() === "OK";
  const order = orderId ? getOrder(orderId) : undefined;

  // Simulate the gateway confirming the payment, then mark the order paid.
  useEffect(() => {
    if (!order || !success || order.status === "paid") return;

    const frame = requestAnimationFrame(() => setFinalizing(true));
    const timer = setTimeout(() => {
      updateStatus(order.id, "paid", `A${Date.now().toString(36).toUpperCase()}`);
      setFinalizing(false);
    }, 900);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [order, success, updateStatus]);

  if (!hydrated) {
    return (
      <div className="rounded-2xl border border-border-subtle bg-surface p-10 text-center text-sm text-text-tertiary">
        در حال بررسی نتیجه‌ی پرداخت…
      </div>
    );
  }

  if (!orderId) {
    return (
      <Shell icon="info" title="سفارشی برای نمایش پیدا نشد">
        <p className="text-sm text-text-secondary">
          نشانی وارد‌شده معتبر نیست. لطفاً از صفحه‌ی سبد خرید دوباره اقدام کنید.
        </p>
        <Actions>
          <ActionLink href="/cart" primary>
            رفتن به سبد خرید
          </ActionLink>
        </Actions>
      </Shell>
    );
  }

  if (!order) {
    return (
      <Shell icon="info" title="سفارش پیدا نشد">
        <p className="text-sm text-text-secondary">
          سفارش با شماره‌ی <span className="tabular-nums">{orderId}</span> در این مرورگر ذخیره
          نشده است. سفارش‌ها فقط روی همان دستگاهی نگهداری می‌شوند که خرید را انجام داده‌اید.
        </p>
        <Actions>
          <ActionLink href="/games" primary>
            بازگشت به فروشگاه
          </ActionLink>
        </Actions>
      </Shell>
    );
  }

  if (!success) {
    return (
      <Shell icon="fail" title="پرداخت ناموفق بود">
        <p className="text-sm text-text-secondary">
          تراکنش شما توسط درگاه بانکی تأیید نشد یا لغو شد. مبلغی از حساب شما کسر نشده است.
        </p>

        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <Row label="شماره‌ی سفارش" value={<span className="tabular-nums">{order.id}</span>} />
          <Row label="مبلغ" value={`${formatNumber(order.total)} تومان`} />
        </dl>

        <Actions>
          <ActionLink href="/checkout" primary>
            تلاش دوباره
          </ActionLink>
          <ActionLink href="/cart">بازگشت به سبد خرید</ActionLink>
        </Actions>
      </Shell>
    );
  }

  return (
    <Shell icon="success" title="پرداخت با موفقیت انجام شد">
      <p className="text-sm text-text-secondary">
        سفارش شما ثبت شد و کلید فعال‌سازی پس از بررسی، به ایمیل و شماره‌ی موبایل ثبت‌شده ارسال
        می‌شود.
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <Row label="شماره‌ی سفارش" value={<span className="tabular-nums">{order.id}</span>} />
        <Row label="مبلغ پرداختی" value={`${formatNumber(order.total)} تومان`} />
        <Row label="وضعیت" value={finalizing ? "در حال تأیید…" : "پرداخت‌شده"} />
        <Row label="کد پیگیری" value={<span className="tabular-nums">{order.refId ?? "—"}</span>} />
      </dl>

      <Actions>
        <ActionLink href={`/order/${order.id}`} primary>
          مشاهده‌ی جزئیات سفارش
        </ActionLink>
        <ActionLink href="/games">ادامه‌ی خرید</ActionLink>
      </Actions>
    </Shell>
  );
}

/* ── pieces ─────────────────────────────────────────────── */

function Shell({
  icon,
  title,
  children,
}: {
  icon: "success" | "fail" | "info";
  title: string;
  children: React.ReactNode;
}) {
  const Icon = icon === "success" ? CheckCircle2 : icon === "fail" ? XCircle : Loader2;
  const tone =
    icon === "success"
      ? "border-success/50 bg-success/10 text-success"
      : icon === "fail"
        ? "border-red-500/50 bg-red-subtle text-red-400"
        : "border-border-subtle bg-surface-raised text-text-tertiary";

  return (
    <div className="mx-auto max-w-narrow rounded-2xl border border-border-subtle bg-surface p-6 text-center sm:p-10">
      <span className={cx("mx-auto grid size-16 place-items-center rounded-full border", tone)}>
        <Icon className={cx("size-7", icon === "info" && "animate-spin")} aria-hidden />
      </span>

      <h2 className="mt-5 font-display text-h3 font-bold text-text-primary">{title}</h2>

      <div className="mt-2">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border-subtle bg-canvas/50 p-3 text-start">
      <dt className="text-xs text-text-tertiary">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-text-primary">{value}</dd>
    </div>
  );
}

function Actions({ children }: { children: React.ReactNode }) {
  return <div className="mt-7 flex flex-wrap items-center justify-center gap-3">{children}</div>;
}

function ActionLink({
  href,
  primary,
  children,
}: {
  href: string;
  primary?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cx(
        "flex h-11 items-center justify-center gap-2 rounded-lg px-6 text-sm font-bold",
        "transition-colors duration-fast ease-fast",
        primary
          ? "bg-red-500 text-text-inverse hover:bg-red-600"
          : "border border-border-strong text-text-primary hover:border-red-500/60 hover:text-red-400",
        FOCUS,
      )}
    >
      {!primary ? <ShoppingBag className="size-4" aria-hidden /> : null}
      {children}
    </Link>
  );
}
