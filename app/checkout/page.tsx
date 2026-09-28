import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "تکمیل سفارش",
  // Transactional page — no indexable content, must stay out of search results.
  robots: { index: false, follow: false, nocache: true },
};

export default function CheckoutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "سبد خرید", href: "/cart" }, { label: "تکمیل سفارش" }]} />

      <section className="mx-auto w-full max-w-page px-3 pb-16 sm:px-4">
        <header className="mb-6 flex flex-col gap-4">
          <div>
            <p className="text-kicker text-red-400">گام پرداخت</p>
            <h1 className="mt-1 font-display text-h3 font-bold text-text-primary sm:text-h2">
              تکمیل اطلاعات و پرداخت
            </h1>
          </div>

          <CheckoutSteps current="checkout" />
        </header>

        <CheckoutForm />
      </section>
    </>
  );
}
