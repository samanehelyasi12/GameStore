"use client";

import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import Avatar from "@/components/auth/Avatar";
import { useAuth } from "@/components/auth/AuthProvider";
import { FOCUS, cx } from "@/components/layout/Navbar/navbar-styles";

/**
 * The account panel is private: it only renders its children once somebody
 * is signed in. Until then the visitor gets a "sign in" screen instead of
 * an empty dashboard.
 */
export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuth();

  if (!ready) {
    return (
      <div className="rounded-xl border border-border-subtle bg-surface p-10 text-center text-sm text-text-tertiary">
        در حال بررسی نشست شما…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-xl border border-border-subtle bg-surface px-6 py-14 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full border border-border-subtle bg-surface-raised">
          <LockKeyhole className="size-6 text-text-tertiary" aria-hidden />
        </span>

        <h1 className="mt-4 font-display text-h4 font-bold text-text-primary">
          برای دیدن پنل کاربری وارد شوید
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-text-secondary">
          سفارش‌ها، رسیدها و وضعیت ارسال فقط برای کاربران واردشده نمایش داده می‌شود.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
          <Link
            href="/login"
            className={cx(
              "inline-flex h-11 w-full items-center justify-center rounded-lg bg-red-500 px-6",
              "text-sm font-bold text-text-inverse transition-colors duration-fast hover:bg-red-600 sm:w-auto",
              FOCUS,
            )}
          >
            ورود به حساب
          </Link>
          <Link
            href="/register"
            className={cx(
              "inline-flex h-11 w-full items-center justify-center rounded-lg border border-border-strong px-6",
              "text-sm font-bold text-text-primary transition-colors duration-fast hover:border-red-500/60 hover:text-red-400 sm:w-auto",
              FOCUS,
            )}
          >
            ساخت حساب جدید
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* شناسنامه‌ی کاربر در بالای هر صفحه‌ی پنل */}
      <header className="mb-5 flex items-center gap-3 border-b border-border-subtle pb-5">
        <Avatar name={user.name} size="lg" />
        <div className="min-w-0">
          <h1 className="truncate font-display text-h3 font-bold text-text-primary">
            {user.name}
          </h1>
          <p dir="ltr" className="truncate text-start text-sm text-text-tertiary">
            {user.email}
          </p>
        </div>
      </header>

      {children}
    </>
  );
}
