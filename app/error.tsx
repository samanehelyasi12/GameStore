"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { FOCUS, cx } from "@/components/layout/Navbar/navbar-styles";

export default function RootError({ reset }: { reset: () => void }) {
  useEffect(() => {
    // TODO(backend): report the error to the monitoring service (Sentry / OTLP).
  }, []);

  return (
    <section className="mx-auto w-full max-w-narrow px-3 py-20 text-center sm:px-4 sm:py-28">
      <span className="mx-auto grid size-16 place-items-center rounded-full border border-red-500/40 bg-red-subtle">
        <AlertTriangle className="size-7 text-red-400" aria-hidden />
      </span>

      <h1 className="mt-6 font-display text-h3 font-bold text-text-primary">
        مشکلی پیش آمد
      </h1>
      <p className="mx-auto mt-2 max-w-md text-sm text-text-secondary">
        بارگذاری این بخش با خطا مواجه شد. دوباره تلاش کنید؛ اگر مشکل ادامه داشت با پشتیبانی تماس
        بگیرید.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className={cx(
            "flex h-11 items-center justify-center gap-2 rounded-lg bg-red-500 px-6 text-sm font-bold text-text-inverse",
            "transition-colors duration-fast hover:bg-red-600",
            FOCUS,
          )}
        >
          <RotateCcw className="size-4" aria-hidden />
          تلاش دوباره
        </button>
        <Link
          href="/"
          className={cx(
            "flex h-11 items-center justify-center rounded-lg border border-border-strong px-6 text-sm font-semibold text-text-primary",
            "transition-colors duration-fast hover:border-red-500/60 hover:text-red-400",
            FOCUS,
          )}
        >
          بازگشت به خانه
        </Link>
      </div>
    </section>
  );
}
