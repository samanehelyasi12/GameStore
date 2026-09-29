"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell, LoginForm } from "@/components/auth";
import type { LoginValues } from "@/components/auth/LoginForm";
import { useAuth } from "@/components/auth/AuthProvider";

/**
 * Sign-in page. The form does the real (demo) session work; this page only
 * redirects afterwards. Swap `signIn` for your auth request and the rest
 * of the app keeps working unchanged.
 */
export default function LoginClient() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(values: LoginValues) {
    try {
      setError(null);
      await signIn({ name: values.identifier, email: values.identifier });
      router.push("/account");
    } catch {
      setError("ورود انجام نشد. دوباره تلاش کنید.");
    }
  }

  return (
    <>
      {error ? (
        <p role="alert" className="mb-4 text-sm text-red-400">
          {error}
        </p>
      ) : null}

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
        <LoginForm onSubmit={handleSubmit} />
      </AuthShell>
    </>
  );
}
