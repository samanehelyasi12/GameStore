import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CalendarDays, ChevronLeft } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { articles } from "@/components/home/ArticlesSection/articles-data";
import { FOCUS, cx } from "@/components/layout/Navbar/navbar-styles";

type ArticleDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function getArticle(slug: string) {
  return articles.find((article) => article.href === `/articles/${slug}`);
}

export async function generateMetadata({
  params,
}: ArticleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  return { title: article ? article.title : "مقاله" };
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  const others = articles.filter((item) => item.id !== article.id);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "مقالات", href: "/articles" },
          { label: article.title },
        ]}
      />

      <article className="mx-auto w-full max-w-narrow px-3 pb-16 sm:px-4">
        <span className="inline-block rounded-md bg-red-500 px-2.5 py-0.5 text-[11px] font-bold text-text-inverse">
          {article.category}
        </span>

        <h1 className="mt-3 font-display text-h3 font-bold text-text-primary sm:text-h2">
          {article.title}
        </h1>

        <p className="mt-2 flex items-center gap-1.5 text-xs text-text-tertiary">
          <CalendarDays className="size-4" aria-hidden />
          {article.date}
        </p>

        <p className="mt-6 text-base leading-8 text-text-secondary">{article.excerpt}</p>

        <div className="mt-6 rounded-xl border border-border-subtle bg-surface p-5 text-sm leading-8 text-text-tertiary">
          متن کامل این مقاله هنوز منتشر نشده است. به‌زودی نسخه‌ی کامل در همین صفحه قرار می‌گیرد.
        </div>

        <Link
          href="/articles"
          className={cx(
            "mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary",
            "transition-colors duration-fast hover:text-red-400",
            FOCUS,
          )}
        >
          <ChevronLeft className="size-4" aria-hidden />
          بازگشت به مقالات
        </Link>

        {others.length > 0 ? (
          <section className="mt-10 border-t border-border-subtle pt-6">
            <h2 className="mb-3 font-display text-base font-bold text-text-primary">
              مقالات دیگر
            </h2>

            <ul className="flex flex-col gap-2">
              {others.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border-subtle bg-surface px-4 py-3 text-sm transition-colors duration-fast hover:border-red-500/50"
                  >
                    <span className="truncate text-text-primary">{item.title}</span>
                    <span className="shrink-0 text-xs text-text-tertiary">{item.date}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </>
  );
}
