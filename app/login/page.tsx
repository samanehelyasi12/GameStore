import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import LoginClient from "@/components/auth/LoginClient";

export const metadata: Metadata = {
  title: "ورود به حساب کاربری",
  description:
    "ورود به حساب کاربری گیم‌استور برای مشاهده سبد خرید، پیگیری سفارش و دسترسی به کلیدهای فعال‌سازی بازی.",
  // Account page — no indexable content, must stay out of search results.
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "ورود" }]} />

      <section className="mx-auto w-full max-w-page px-3 pb-16 sm:px-4">
        <LoginClient />
      </section>
    </>
  );
}
