import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Headphones, ShieldCheck, Truck } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import AddToCartButton from "@/components/cart/AddToCartButton";
import ConsoleCard from "@/components/consoles/ConsoleCard";
import {
  CONSOLE_PRODUCTS,
  CONSOLE_TABS,
  findConsoleProduct,
  type ConsoleBrand,
} from "@/components/home/ConsolesSection/consoles-data";
import { consoleItems } from "@/lib/data/consoles";
import { formatPrice } from "@/lib/utils";

type ConsolePageProps = { params: Promise<{ slug: string }> };

/** The brand a console product belongs to, e.g. "ps5-standard" → "ps5". */
function brandOfProductId(id: string): ConsoleBrand | undefined {
  return CONSOLE_TABS.find((tab) => id.startsWith(tab.id))?.id;
}

export async function generateMetadata({
  params,
}: ConsolePageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = findConsoleProduct(slug);
  if (product) return { title: product.name };

  const brand = consoleItems.find((c) => c.id === slug);
  return { title: brand ? `خرید کنسول ${brand.label}` : "کنسول" };
}

const perks = [
  { icon: ShieldCheck, text: "ضمانت اصالت و سلامت دستگاه" },
  { icon: Truck, text: "ارسال به سراسر کشور" },
  { icon: Headphones, text: "پشتیبانی پیش از خرید" },
];

export default async function ConsolePage({ params }: ConsolePageProps) {
  const { slug } = await params;
  const product = findConsoleProduct(slug);

  // A console product detail page.
  if (product) {
    const brand = brandOfProductId(product.id);
    const related = brand
      ? CONSOLE_PRODUCTS[brand].filter((p) => p.id !== product.id).slice(0, 4)
      : [];

    return (
      <>
        <Breadcrumbs
          items={[
            { label: "کنسول‌ها", href: "/consoles" },
            { label: brand ? consoleItems.find((c) => c.id === brand)?.label ?? "" : "", href: brand ? `/consoles/${brand}` : undefined },
            { label: product.name },
          ]}
        />

        <section className="mx-auto w-full max-w-page px-3 pb-16 sm:px-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:items-start">
            {/* تصویر */}
            <div className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-2xl border border-border-subtle bg-media lg:mx-0 lg:max-w-none">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover"
              />
            </div>

            {/* اطلاعات */}
            <div className="flex flex-col gap-5">
              <header>
                <h1 className="font-display text-h3 font-bold text-text-primary sm:text-h2">
                  {product.name}
                </h1>
                <p className="mt-3 text-sm leading-7 text-text-secondary">
                  این دستگاه پیش از ارسال تست می‌شود و همراه با کابل و لوازم اصلی تحویل داده
                  می‌شود.
                </p>
              </header>

              <div className="rounded-2xl border border-border-subtle bg-surface p-5">
                <p className="font-display text-h2 font-bold text-accent-400">
                  {formatPrice(product.price)}
                </p>

                <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                  <AddToCartButton
                    variant="solid"
                    className="w-full sm:flex-1"
                    product={{
                      id: product.id,
                      slug: product.id,
                      title: product.name,
                      price: product.price,
                      compareAtPrice: null,
                      coverImage: product.image,
                      href: product.href,
                    }}
                  />

                  <Link
                    href="/cart"
                    className="flex h-11 w-full items-center justify-center rounded-lg border border-border-strong px-5 text-sm font-semibold text-text-primary transition-colors duration-fast hover:border-accent-500/60 hover:text-accent-400 sm:w-auto"
                  >
                    مشاهده‌ی سبد خرید
                  </Link>
                </div>
              </div>

              <ul className="flex flex-wrap gap-x-5 gap-y-2 rounded-2xl border border-border-subtle bg-surface p-5 text-xs text-text-tertiary">
                {perks.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-1.5">
                    <Icon className="size-3.5 text-accent-500" aria-hidden />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {related.length > 0 ? (
            <section className="mt-12">
              <h2 className="mb-4 font-display text-h4 font-bold text-text-primary">
                کنسول‌های مشابه
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {related.map((item) => (
                  <ConsoleCard key={item.id} product={item} href={item.href} layout="grid" />
                ))}
              </div>
            </section>
          ) : null}
        </section>
      </>
    );
  }

  // A console brand page — the products are listed as cards here.
  const brand = consoleItems.find((c) => c.id === slug);
  if (!brand) notFound();

  const list = CONSOLE_PRODUCTS[brand.id as ConsoleBrand] ?? [];

  return (
    <>
      <Breadcrumbs
        items={[{ label: "کنسول‌ها", href: "/consoles" }, { label: brand.label }]}
      />

      <section className="mx-auto w-full max-w-page px-3 pb-16 sm:px-4">
        <header className="mb-6">
          <p className="text-kicker text-accent-400">کنسول‌ها</p>
          <h1 className="mt-1 font-display text-h3 font-bold text-text-primary sm:text-h2">
            خرید کنسول <span className="text-accent-400">{brand.label}</span>
          </h1>
          <p className="mt-2 text-sm text-text-secondary">{brand.tagline}</p>
        </header>

        {list.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {list.map((product) => (
              <ConsoleCard key={product.id} product={product} href={product.href} layout="grid" />
            ))}
          </div>
        ) : null}
      </section>
    </>
  );
}
