import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import AuthShell from "@/components/auth/AuthShell";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "بازیابی رمز عبور",
  description:
    "در صورت فراموشی رمز عبور حساب کاربری گیم‌استور، ایمیل یا نام کاربری خود را وارد کنید تا لینک بازیابی برایتان ارسال شود.",
  // Account page — no indexable content, must stay out of search results.
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "ورود", href: "/login" }, { label: "بازیابی رمز عبور" }]} />

      <section className="mx-auto w-full max-w-page px-3 pb-16 sm:px-4">
        <AuthShell
          title="بازیابی رمز عبور"
          subtitle="ایمیل یا نام کاربری‌ات را وارد کن تا لینک بازیابی برایت بفرستیم."
          footer={
            <>
              رمز عبور را به خاطر سپردی؟{" "}
              <Link
                href="/login"
                className="font-semibold text-red-400 transition-colors duration-fast hover:text-red-300"
              >
                ورود
              </Link>
            </>
          }
        >
          <ForgotPasswordForm />
        </AuthShell>
      </section>
    </>
  );
}
