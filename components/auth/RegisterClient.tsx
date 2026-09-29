"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell, RegisterForm } from "@/components/auth";
import type { RegisterValues } from "@/components/auth/RegisterForm";
import { useAuth } from "@/components/auth/AuthProvider";

/** Sign-up page — creates the session, then sends the user to the panel. */
export default function RegisterClient() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(values: RegisterValues) {
    try {
      setError(null);
      await signIn({ name: values.name, email: values.email, phone: values.phone });
      router.push("/account");
    } catch {
      setError("ثبت‌نام انجام نشد. دوباره تلاش کنید.");
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
        <RegisterForm onSubmit={handleSubmit} />
      </AuthShell>
    </>
  );
}
