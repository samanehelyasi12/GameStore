import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { categoryItems } from "@/components/home/CategorySlider/categories-data";
import { getProductsByGenre } from "@/lib/data/products";
import { FOCUS, cx } from "@/components/layout/Navbar/navbar-styles";

export const metadata: Metadata = { title: "دسته‌بندی‌ها" };

export default function CategoriesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "دسته‌بندی‌ها" }]} />

      <section className="mx-auto w-full max-w-page px-3 pb-16 sm:px-4">
        <header className="mb-6">
          <p className="text-kicker text-red-400">دسته‌بندی‌ها</p>
          <h1 className="mt-1 font-display text-h3 font-bold text-text-primary sm:text-h2">
            بازی را از ژانر انتخاب کن
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-text-secondary">
            هر ژانر، مجموعه‌ای از بازی‌های اورجینال با بهترین قیمت و گارانتی فعال‌سازی.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categoryItems.map((cat) => {
            const count = getProductsByGenre(cat.id).length;

            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.id}`}
                className={cx(
                  "group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border-subtle bg-media",
                  "transition-[border-color,transform] duration-base ease-standard",
                  "hover:-translate-y-1 hover:border-red-500/50",
                  FOCUS,
                )}
              >
                <Image
                  src={cat.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 300px, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-slow ease-standard group-hover:scale-105"
                />
                <span
                  aria-hidden
                  className="absolute inset-0"
                  style={{ backgroundImage: "var(--gradient-card)" }}
                />

                <span className="absolute inset-x-0 bottom-0 p-4">
                  <span className="block font-display text-base font-bold text-text-primary">
                    {cat.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-text-secondary">
                    {count} بازی
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
