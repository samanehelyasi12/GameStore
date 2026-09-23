import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { consoleItems } from "@/lib/data/consoles";

type ConsolePageProps = { params: Promise<{ slug: string }> };

function getConsole(slug: string) {
  return consoleItems.find((c) => c.id === slug);
}

export async function generateMetadata({
  params,
}: ConsolePageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getConsole(slug);
  return { title: item ? `خرید کنسول ${item.label}` : "کنسول" };
}

export default async function ConsolePage({ params }: ConsolePageProps) {
  const { slug } = await params;
  const item = getConsole(slug);

  if (!item) notFound();

  return (
    <>
      <Breadcrumbs
        items={[{ label: "کنسول‌ها", href: "/consoles" }, { label: item.label }]}
      />

      <section className="mx-auto w-full max-w-page px-3 pb-16 sm:px-4">
        <h1 className="mb-2 font-display text-h3 font-bold text-text-primary sm:text-h2">
          خرید کنسول <span className="text-red-400">{item.label}</span>
        </h1>
        <p className="mb-6 text-text-secondary">{item.tagline}</p>

        {/* TODO: console product grid (bundles, storage options, price) goes here */}
      </section>
    </>
  );
}
