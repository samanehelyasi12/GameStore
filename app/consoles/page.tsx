import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { consoleItems, consoleHref } from "@/lib/data/consoles";

export const metadata: Metadata = { title: "کنسول‌ها" };

export default function ConsolesIndexPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "کنسول‌ها" }]} />

      <section className="mx-auto w-full max-w-page px-3 pb-16 sm:px-4">
        <h1 className="mb-6 font-display text-h3 font-bold text-text-primary sm:text-h2">
          خرید کنسول
        </h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {consoleItems.map((c) => (
            <Link
              key={c.id}
              href={consoleHref(c.id)}
              className="group rounded-2xl border border-border-subtle bg-surface p-5 transition-[border-color,box-shadow,transform] duration-base ease-fast hover:-translate-y-1 hover:border-red-500/60 hover:shadow-[0_0_24px_color-mix(in_oklab,var(--color-red-500)_28%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
            >
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-red-400">
                کنسول
              </p>
              <h2 className="mb-1 text-lg font-bold text-text-primary">{c.label}</h2>
              <p className="text-sm text-text-secondary">{c.tagline}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
