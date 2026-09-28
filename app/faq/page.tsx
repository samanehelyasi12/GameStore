import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { faqItems } from "@/components/home/FaqSection/faq-data";

export const metadata: Metadata = { title: "سوالات متداول" };

export default function FaqPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "سوالات متداول" }]} />

      <section className="mx-auto w-full max-w-narrow px-3 pb-16 sm:px-4">
        <header className="mb-6">
          <p className="text-kicker text-red-400">راهنما</p>
          <h1 className="mt-1 font-display text-h3 font-bold text-text-primary sm:text-h2">
            سوالات متداول
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            پاسخ پرتکرارترین سؤال‌های کاربران درباره‌ی خرید، پرداخت و فعال‌سازی.
          </p>
        </header>

        <div className="flex flex-col gap-3">
          {faqItems.map((item) => (
            <details
              key={item.id}
              className="group rounded-xl border border-border-subtle bg-surface transition-colors duration-fast open:border-red-500/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-sm font-semibold text-text-primary">
                {item.question}
                <ChevronDown
                  aria-hidden
                  className="size-4 shrink-0 text-red-500 transition-transform duration-fast group-open:rotate-180"
                />
              </summary>

              <p className="border-t border-border-subtle px-4 py-4 text-sm leading-7 text-text-secondary">
                {item.answer}
              </p>
            </details>
          ))}
        </div>

        <p className="mt-6 rounded-xl border border-border-subtle bg-surface px-4 py-4 text-sm text-text-secondary">
          پاسخ سؤال خود را پیدا نکردید؟{" "}
          <Link href="/contact" className="font-semibold text-red-400 hover:underline">
            با پشتیبانی تماس بگیرید
          </Link>
          .
        </p>
      </section>
    </>
  );
}
