import Link from "next/link";
import { Home, SearchX } from "lucide-react";
import { FOCUS, cx } from "@/components/layout/Navbar/navbar-styles";

export default function NotFound() {
  return (
    <section className="mx-auto w-full max-w-narrow px-3 py-20 text-center sm:px-4 sm:py-28">
      <span className="mx-auto grid size-16 place-items-center rounded-full border border-red-500/40 bg-red-subtle">
        <SearchX className="size-7 text-red-400" aria-hidden />
      </span>

      <p className="mt-6 font-display text-display-xl font-bold tabular-nums text-text-primary">
        ۴۰۴
      </p>

      <h1 className="mt-2 font-display text-h3 font-bold text-text-primary">
        این صفحه پیدا نشد
      </h1>
      <p className="mx-auto mt-2 max-w-md text-sm text-text-secondary">
        ممکن است نشانی را اشتباه وارد کرده باشید یا صفحه جابه‌جا شده باشد.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className={cx(
            "flex h-11 items-center justify-center gap-2 rounded-lg bg-red-500 px-6 text-sm font-bold text-text-inverse",
            "transition-colors duration-fast hover:bg-red-600",
            FOCUS,
          )}
        >
          <Home className="size-4" aria-hidden />
          بازگشت به خانه
        </Link>
        <Link
          href="/games"
          className={cx(
            "flex h-11 items-center justify-center rounded-lg border border-border-strong px-6 text-sm font-semibold text-text-primary",
            "transition-colors duration-fast hover:border-red-500/60 hover:text-red-400",
            FOCUS,
          )}
        >
          مشاهده‌ی فروشگاه
        </Link>
      </div>
    </section>
  );
}
