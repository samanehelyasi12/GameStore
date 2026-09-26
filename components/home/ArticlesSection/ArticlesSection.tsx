import Image from "next/image";
import Link from "next/link";
import { articles } from "./articles-data";

export default function ArticlesSection() {
  return (
    <section className="mx-auto max-w-page px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-surface">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-canvas via-surface to-surface" />

        {/* دکمه: موبایل => گوشه پایین پنل، از sm به بالا => گوشه بالا-چپ (مثل قبل) */}
        <Link
          href="/articles"
          className="absolute bottom-3 left-4 z-30 inline-flex items-center gap-1.5 rounded-full border border-border-strong px-3 py-1.5 text-[11px] font-bold text-text-primary transition-colors duration-base ease-standard hover:border-red-400 hover:text-red-400 sm:bottom-auto sm:left-6 sm:top-6 sm:px-5 sm:py-2.5 sm:text-sm lg:left-10 lg:top-8"
        >
          مشاهده همه مقالات
          <svg
            className="h-3 w-3 sm:h-4 sm:w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </Link>

        {/* تایتل وسط */}
        <div className="mx-auto flex max-w-xl flex-col items-center gap-1.5 px-4  text-center sm:pt-16 lg:pt-10">
          <h2 className="font-display text-h4 font-bold text-text-primary sm:text-h3 lg:text-h2">
            آخرین <span className="text-red-400">مقالات</span>
          </h2>
          <p className="text-xs text-text-secondary sm:text-sm lg:text-base">
            تحلیل، آموزش و اخبار دنیای بازی‌ها در یک نگاه
          </p>
          <span className="mt-1 h-1 w-12 rounded-full bg-red-500 lg:w-14" />
        </div>

        {/* ردیف: سرباز اول در کد (= راست در RTL) + کارت‌ها بعدش (= چپ) — بدون فاصله از تایتل */}
        {/* پاهای سرباز چسبیده به لبه پایین سکشن (pb ندارد) و لبه کارت اول زیر دست سرباز می‌رود.
            نسبت‌ها درصدی‌اند تا در هر عرضی، لبه کارت دقیقاً زیر انگشت‌های سرباز بیفتد. */}
        <div className="-mt-[2vw] flex items-end gap-[1.5vw] px-[2vw]">
          {/* سرباز — همیشه سمت راست چون اول در کد است؛ z-10 یعنی دستش روی کارت می‌افتد.
              aspect = نسبت خود عکس، پس بالای سر سرباز فضای خالی نمی‌ماند. */}
          <div className="relative z-10 aspect-[1236/1272] w-[90%] shrink-0 sm:w-[86%] md:w-[80%] lg:w-[50%] xl:w-[47%]">
            <Image
              src="/images/articles/ghost-soldier.webp"
              alt=""
              fill
              sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 35vw, 90vw"
              className="object-contain object-bottom drop-shadow-[0_16px_30px_rgba(0,0,0,0.5)]"
            />
          </div>

          {/* کارت‌ها — موبایل/تبلت: فقط یک کارت، دسکتاپ: ۳ ستون.
              ماژین منفی افقی => لبه کارت زیر دست سرباز می‌رود.
              mb/translate-y => کارت‌ها کمی بالاتر از لبه پایین (روی موبایل mb جای دکمه پایین را خالی می‌کند). */}
          <div className="-ms-[38%] mb-11 min-w-0 flex-1  sm:-ms-[36%] sm:mb-0 sm:translate-y-[-vw] md:-ms-[33.5%] md:translate-y-[-6vw] lg:-ms-[21%] lg:translate-y-[-5vw] xl:-ms-[20%] xl:translate-y-[-3.3vw]">
            <div className="flex gap-[1.2vw] lg:grid lg:grid-cols-3">
              {articles.slice(0, 3).map((article, i) => (
                <div
                  key={article.id}
                  className={`min-w-0 flex-1 lg:flex-none ${i > 0 ? "hidden lg:block" : ""}`}
                >
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArticleCard({ article }: { article: (typeof articles)[number] }) {
  const badgeColor: Record<string, string> = {
    تحلیل: "bg-red-500",
    آموزش: "bg-purple-500",
    راهنما: "bg-success",
  };

  return (
    <Link
      href={article.href}
      className="group block min-w-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] shadow-xl backdrop-blur-2xl transition-all duration-base ease-standard hover:-translate-y-1 hover:border-red-400/40 hover:bg-white/[0.06] hover:shadow-accent"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(min-width: 1024px) 300px, 60vw"
          className="object-cover transition-transform duration-slow ease-standard group-hover:scale-105"
        />
        <span
          className={`absolute right-2 top-2 rounded-md px-2 py-0.5 text-[10px] font-bold text-text-inverse sm:right-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-xs ${
            badgeColor[article.category] ?? "bg-accent-500"
          }`}
        >
          {article.category}
        </span>
      </div>

      <div className="p-2 sm:p-3 lg:p-4">
        <h3 className="mb-1 truncate font-display text-[11px] font-bold text-text-primary sm:mb-2 sm:text-xs lg:text-base">
          {article.title}
        </h3>
        <p className="mb-2 line-clamp-2 text-[10px] text-text-secondary sm:mb-4 sm:text-xs">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between text-[10px] text-text-tertiary sm:text-xs">
          <span className="truncate">{article.date}</span>
          <span className="flex shrink-0 items-center gap-1 font-semibold text-text-secondary transition-colors duration-fast ease-fast group-hover:text-red-400">
            مطالعه
            <svg
              className="h-3 w-3 sm:h-3.5 sm:w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
