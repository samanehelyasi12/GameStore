import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import PaymentResultCard from "@/components/payment/PaymentResultCard";

export const metadata: Metadata = {
  title: "نتیجه‌ی پرداخت و ثبت سفارش",
  // Gateway callback page — never indexable, and must not be cached.
  robots: { index: false, follow: false, nocache: true },
};

type PaymentResultPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function PaymentResultPage({ searchParams }: PaymentResultPageProps) {
  const params = await searchParams;
  const status = first(params.status) ?? null;
  const order = first(params.order) ?? null;

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "سبد خرید", href: "/cart" },
          { label: "تکمیل سفارش", href: "/checkout" },
          { label: "نتیجه‌ی پرداخت" },
        ]}
      />

      <section className="mx-auto w-full max-w-page px-3 pb-16 sm:px-4">
        <header className="mb-6 flex flex-col gap-4">
          <h1 className="font-display text-h3 font-bold text-text-primary sm:text-h2">
            نتیجه‌ی پرداخت
          </h1>

          <CheckoutSteps current="result" />
        </header>

        <PaymentResultCard status={status} orderId={order} />
      </section>
    </>
  );
}
