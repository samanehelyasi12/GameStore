import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { AuthShell, LoginForm } from "@/components/auth";

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
        <AuthShell
          title="ورود به حساب کاربری"
          subtitle="برای ادامه خرید وارد حساب خودت شو."
          footer={
            <>
              حساب کاربری نداری؟{" "}
              <Link
                href="/register"
                className="font-semibold text-red-400 transition-colors duration-fast hover:text-red-300"
              >
                ثبت‌نام
              </Link>
            </>
          }
        >
          <LoginForm />
        </AuthShell>
      </section>
    </>
  );
}
