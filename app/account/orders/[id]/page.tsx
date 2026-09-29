import type { Metadata } from "next";
import RequireAuth from "@/components/account/RequireAuth";
import AccountOrderDetail from "@/components/account/AccountOrderDetail";

type AccountOrderPageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: AccountOrderPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `سفارش ${id}`,
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function AccountOrderPage({ params }: AccountOrderPageProps) {
  const { id } = await params;

  return (
    <RequireAuth>
      <AccountOrderDetail orderId={id} />
    </RequireAuth>
  );
}
