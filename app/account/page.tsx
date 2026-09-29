import type { Metadata } from "next";
import RequireAuth from "@/components/account/RequireAuth";
import AccountOverview from "@/components/account/AccountOverview";

export const metadata: Metadata = {
  title: "پنل کاربری",
  // Private area — never indexable.
  robots: { index: false, follow: false, nocache: true },
};

export default function AccountPage() {
  return (
    <RequireAuth>
      <AccountOverview />
    </RequireAuth>
  );
}
