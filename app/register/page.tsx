import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import RegisterClient from "@/components/auth/RegisterClient";

export const metadata: Metadata = {
  title: "ساخت حساب کاربری",
  description:
    "ساخت حساب کاربری در گیم‌استور برای خرید سریع‌تر بازی‌های اورجینال، پیگیری سفارش و دریافت کلید فعال‌سازی.",
  // Account page — no indexable content, must stay out of search results.
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "ثبت‌نام" }]} />

      <section className="mx-auto w-full max-w-page px-3 pb-16 sm:px-4">
        <RegisterClient />
      </section>
    </>
  );
}
