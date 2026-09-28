import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GamesBrowser from "@/components/games/GamesBrowser";
import { getSaleProducts, products } from "@/lib/data/products";

export const metadata: Metadata = { title: "فروشگاه" };

type GamesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function GamesPage({ searchParams }: GamesPageProps) {
  const raw = await searchParams;
  const search = Object.fromEntries(
    Object.entries(raw).map(([key, value]) => [
      key,
      Array.isArray(value) ? (value[0] ?? "") : (value ?? ""),
    ]),
  ) as Record<string, string>;

  const query = (search.q ?? "").trim().toLowerCase();
  const genre = search.genre ?? "";
  const sale = search.sale === "true" || search.discount !== undefined;

  let list = products;
  if (sale) list = getSaleProducts();
  if (genre) list = list.filter((p) => p.genres.includes(genre));
  if (query) {
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.genres.some((g) => g.includes(query)) ||
        p.platforms.some((platform) => platform.toLowerCase().includes(query)),
    );
  }

  return (
    <>
      <Breadcrumbs items={[{ label: "فروشگاه" }]} />

      <section className="mx-auto w-full max-w-page px-3 pb-16 sm:px-4">
        <header className="mb-6">
          <p className="text-kicker text-red-400">فروشگاه</p>
          <h1 className="mt-1 font-display text-h3 font-bold text-text-primary sm:text-h2">
            همه‌ی بازی‌ها
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-text-secondary">
            بازی‌های اورجینال برای PS5، PS4، Xbox و PC با گارانتی فعال‌سازی و تحویل فوری.
          </p>
        </header>

        <GamesBrowser
          products={list}
          initialQuery={search.q ?? ""}
          initialGenre={genre || null}
          activeSale={sale}
          searchParams={search}
        />
      </section>
    </>
  );
}
