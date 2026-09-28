import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { articles } from "@/components/home/ArticlesSection/articles-data";
import { FOCUS, cx } from "@/components/layout/Navbar/navbar-styles";

export const metadata: Metadata = { title: "مقالات" };

const badgeColor: Record<string, string> = {
  تحلیل: "bg-red-500",
  آموزش: "bg-purple-500",
  راهنما: "bg-success",
};

export default function ArticlesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "مقالات" }]} />

      <section className="mx-auto w-full max-w-page px-3 pb-16 sm:px-4">
        <header className="mb-6">
          <p className="text-kicker text-red-400">مجله‌ی گیمر</p>
          <h1 className="mt-1 font-display text-h3 font-bold text-text-primary sm:text-h2">
            آخرین مقالات
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-text-secondary">
            تحلیل، آموزش و راهنمای خرید و فعال‌سازی بازی‌ها.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={article.href}
              className={cx(
                "group flex flex-col gap-3 rounded-2xl border border-border-subtle bg-surface p-5",
                "transition-[border-color,transform,box-shadow] duration-base ease-standard",
                "hover:-translate-y-1 hover:border-red-500/50 hover:shadow-md",
                FOCUS,
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={cx(
                    "rounded-md px-2.5 py-0.5 text-[11px] font-bold text-text-inverse",
                    badgeColor[article.category] ?? "bg-accent-500",
                  )}
                >
                  {article.category}
                </span>
                <span className="text-xs text-text-tertiary">{article.date}</span>
              </div>

              <h2 className="font-display text-base font-bold text-text-primary transition-colors group-hover:text-red-400">
                {article.title}
              </h2>
              <p className="text-sm leading-7 text-text-secondary">{article.excerpt}</p>

              <span className="mt-auto pt-2 text-xs font-semibold text-text-secondary transition-colors group-hover:text-red-400">
                ادامه‌ی مطلب ←
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
