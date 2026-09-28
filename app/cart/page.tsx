import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CartView from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "سبد خرید",
  // Transactional page — no indexable content, must stay out of search results.
  robots: { index: false, follow: false, nocache: true },
};

export default function CartPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "سبد خرید" }]} />

      <section className="mx-auto w-full max-w-page px-3 pb-16 sm:px-4">
        <header className="mb-6">
          <p className="text-kicker text-red-400">سبد خرید</p>
          <h1 className="mt-1 font-display text-h3 font-bold text-text-primary sm:text-h2">
            کالاهای انتخابی شما
          </h1>
        </header>

        <CartView />
      </section>
    </>
  );
}
