import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import OrderDetail from "@/components/order/OrderDetail";

type OrderPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: OrderPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `جزئیات سفارش ${id}`,
    // Per-order private page — must never be crawled or indexed.
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params;

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "سبد خرید", href: "/cart" },
          { label: "تکمیل سفارش", href: "/checkout" },
          { label: "جزئیات سفارش" },
        ]}
      />

      <section className="mx-auto w-full max-w-page px-3 pb-16 sm:px-4">
        <h1 className="mb-6 font-display text-h3 font-bold text-text-primary sm:text-h2">
          جزئیات سفارش
        </h1>

        <OrderDetail orderId={id} />
      </section>
    </>
  );
}
