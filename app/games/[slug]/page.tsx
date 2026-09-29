import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, Headphones, ShieldCheck, Star, Zap } from "lucide-react";
import Image from "next/image";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import AddToCartButton from "@/components/cart/AddToCartButton";
import ProductCard from "@/components/games/ProductCard";
import { getProduct, genreLabels, products } from "@/lib/data/products";
import { discountPercent, formatNumber } from "@/lib/utils";
import { FOCUS, cx } from "@/components/layout/Navbar/navbar-styles";

type GameDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: GameDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = getProduct(slug);
  return { title: game ? game.title : "بازی" };
}

const perks = [
  { icon: Zap, text: "تحویل کلید کمتر از ۳۰ دقیقه" },
  { icon: ShieldCheck, text: "اورجینال با گارانتی فعال‌سازی" },
  { icon: Headphones, text: "پشتیبانی ۲۴ ساعته" },
];

export default async function GameDetailPage({ params }: GameDetailPageProps) {
  const { slug } = await params;
  const game = getProduct(slug);

  if (!game) notFound();

  const percent = game.compareAtPrice
    ? discountPercent(game.price, game.compareAtPrice)
    : 0;

  const related = products
    .filter((p) => p.id !== game.id && p.genres.some((g) => game.genres.includes(g)))
    .slice(0, 4);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "فروشگاه", href: "/games" },
          { label: game.title },
        ]}
      />

      <section className="mx-auto w-full max-w-page px-3 pb-16 sm:px-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:items-start">
          {/* پوستر */}
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[420px] overflow-hidden rounded-2xl border border-border-subtle bg-media lg:mx-0 lg:max-w-none">
            <Image
              src={game.coverImage}
              alt={`کاور ${game.title}`}
              fill
              priority
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-cover"
            />
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/3"
              style={{ backgroundImage: "var(--gradient-card)" }}
            />
          </div>

          {/* اطلاعات */}
          <div className="flex flex-col gap-5">
            <header>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display text-h3 font-bold text-text-primary sm:text-h2">
                  {game.title}
                </h1>
                <span className="flex items-center gap-1 rounded-full border border-border-subtle bg-surface px-2.5 py-1 text-xs font-bold tabular-nums text-text-primary">
                  <Star className="size-3.5 text-gold-500" aria-hidden />
                  {formatNumber(game.rating)}
                </span>
              </div>

              <p className="mt-3 text-sm leading-7 text-text-secondary">
                {game.shortDescription}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                {game.genres.map((g) => (
                  <Link
                    key={g}
                    href={`/categories/${g}`}
                    className="rounded-full border border-border-subtle px-3 py-1 font-semibold text-text-secondary transition-colors duration-fast hover:border-red-500/50 hover:text-red-400"
                  >
                    {genreLabels[g] ?? g}
                  </Link>
                ))}
                <span className="rounded-full border border-border-subtle px-3 py-1 font-semibold text-text-tertiary">
                  {game.platforms.join(" / ")}
                </span>
                <span className="rounded-full border border-border-subtle px-3 py-1 font-semibold text-text-tertiary">
                  انتشار: {game.releaseDate}
                </span>
              </div>
            </header>

            {/* قیمت و خرید */}
            <div className="rounded-2xl border border-border-subtle bg-surface p-5">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  {game.compareAtPrice ? (
                    <p className="text-sm text-text-tertiary">
                      <span className="line-through">
                        {formatNumber(game.compareAtPrice)} تومان
                      </span>
                      <span className="ms-2 rounded-full bg-red-500 px-2 py-0.5 text-[11px] font-bold text-white">
                        ٪{formatNumber(percent)} تخفیف
                      </span>
                    </p>
                  ) : null}

                  <p className="font-display text-h2 font-bold tabular-nums text-red-400">
                    {formatNumber(game.price)}{" "}
                    <span className="text-sm font-medium text-text-tertiary">تومان</span>
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                <AddToCartButton
                  variant="solid"
                  className="w-full sm:flex-1"
                  product={{
                    id: game.id,
                    slug: game.slug,
                    title: game.title,
                    price: game.price,
                    compareAtPrice: game.compareAtPrice,
                    coverImage: game.coverImage,
                    href: `/games/${game.slug}`,
                  }}
                />

                <Link
                  href="/cart"
                  className={cx(
                    "flex h-11 w-full items-center justify-center rounded-lg border border-border-strong px-5 text-sm font-semibold text-text-primary sm:w-auto",
                    "transition-colors duration-fast hover:border-red-500/60 hover:text-red-400",
                    FOCUS,
                  )}
                >
                  مشاهده‌ی سبد خرید
                </Link>
              </div>
            </div>

            {/* ویژگی‌ها */}
            <section className="rounded-2xl border border-border-subtle bg-surface p-5">
              <h2 className="mb-3 font-display text-base font-bold text-text-primary">
                ویژگی‌های محصول
              </h2>

              <ul className="flex flex-col gap-2.5 text-sm text-text-secondary">
                {game.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-red-500" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>

              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-border-subtle pt-4">
                {perks.map(({ icon: Icon, text }) => (
                  <li
                    key={text}
                    className="flex items-center gap-1.5 text-xs text-text-tertiary"
                  >
                    <Icon className="size-3.5 text-red-500" aria-hidden />
                    {text}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* پیشنهاد مشابه */}
        {related.length > 0 ? (
          <section className="mt-12">
            <h2 className="mb-4 font-display text-h4 font-bold text-text-primary">
              بازی‌های مشابه
            </h2>

            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {related.map((item) => (
                <li key={item.id} className="h-full">
                  <ProductCard product={item} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </section>
    </>
  );
}
