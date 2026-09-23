import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = { title: "فروشگاه" };

export default function GamesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "فروشگاه" }]} />

      <section className="mx-auto w-full max-w-page px-3 pb-16 sm:px-4">
        <h1 className="mb-6 font-display text-h3 font-bold text-text-primary sm:text-h2">
          همه‌ی بازی‌ها
        </h1>

        {/* TODO: game grid + filters (console, genre, price, search) go here */}
      </section>
    </>
  );
}
