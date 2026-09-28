import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { AuthShell, RegisterForm } from "@/components/auth";

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
        <AuthShell
          title="ساخت حساب کاربری"
          subtitle="در چند ثانیه عضو شو و خریدت را سریع‌تر و امن‌تر انجام بده."
          footer={
            <>
              قبلاً ثبت‌نام کرده‌ای؟{" "}
              <Link
                href="/login"
                className="font-semibold text-red-400 transition-colors duration-fast hover:text-red-300"
              >
                وارد شو
              </Link>
            </>
          }
        >
          <RegisterForm />
        </AuthShell>
      </section>
    </>
  );
}
