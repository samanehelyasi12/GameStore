import type { Metadata } from "next";
import RequireAuth from "@/components/account/RequireAuth";
import AccountOrders from "@/components/account/AccountOrders";

export const metadata: Metadata = {
  title: "سفارش‌های من",
  robots: { index: false, follow: false, nocache: true },
};

export default function AccountOrdersPage() {
  return (
    <RequireAuth>
      <AccountOrders />
    </RequireAuth>
  );
}
