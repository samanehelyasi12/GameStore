import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { categoryItems } from "@/components/home/CategorySlider/categories-data";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) notFound();

  return (
    <>
      <Breadcrumbs items={[{ label: category.label }]} />

      <section className="mx-auto w-full max-w-page px-3 pb-16 sm:px-4">
        <h1 className="mb-6 font-display text-h3 font-bold text-text-primary sm:text-h2">
          بازی‌های <span className="text-red-400">{category.label}</span>
        </h1>

        {/* TODO: game grid for this category goes here */}
      </section>
    </>
  );
}
