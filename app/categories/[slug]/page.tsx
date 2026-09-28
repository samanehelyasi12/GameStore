import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GamesBrowser from "@/components/games/GamesBrowser";
import { categoryItems } from "@/components/home/CategorySlider/categories-data";
import { getProductsByGenre } from "@/lib/data/products";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getCategory(slug: string) {
  return categoryItems.find((c) => c.id === slug);
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  return { title: category ? `بازی‌های ${category.label}` : "دسته‌بندی" };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) notFound();

  const raw = await searchParams;
  const search = Object.fromEntries(
    Object.entries(raw).map(([key, value]) => [
      key,
      Array.isArray(value) ? (value[0] ?? "") : (value ?? ""),
    ]),
  ) as Record<string, string>;

  const list = search.sale === "true"
    ? getProductsByGenre(slug).filter((p) => p.compareAtPrice !== null)
    : getProductsByGenre(slug);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "دسته‌بندی‌ها", href: "/categories" },
          { label: category.label },
        ]}
      />

      <section className="mx-auto w-full max-w-page px-3 pb-16 sm:px-4">
        <header className="mb-6">
          <p className="text-kicker text-red-400">دسته‌بندی</p>
          <h1 className="mt-1 font-display text-h3 font-bold text-text-primary sm:text-h2">
            بازی‌های <span className="text-red-400">{category.label}</span>
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            {list.length} بازی در این دسته موجود است — همه با گارانتی و تحویل فوری.
          </p>
        </header>

        <GamesBrowser
          products={list}
          initialGenre={slug}
          searchParams={search}
        />
      </section>
    </>
  );
}
