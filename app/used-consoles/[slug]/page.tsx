import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Truck } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { formatPrice } from "@/lib/utils";
import {
  CONDITION_LABELS,
  discountPercent,
  usedConsoles,
} from "@/components/home/UsedConsolesSection/used-consoles-data";

type UsedConsolePageProps = { params: Promise<{ slug: string }> };

function getUsedConsole(slug: string) {
  return usedConsoles.find((c) => c.id === slug);
}

export async function generateMetadata({
  params,
}: UsedConsolePageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getUsedConsole(slug);
  return { title: item ? item.name : "کنسول استوک" };
}

export default async function UsedConsolePage({ params }: UsedConsolePageProps) {
  const { slug } = await params;
  const item = getUsedConsole(slug);

  if (!item) notFound();

  const percent = discountPercent(item.price, item.originalPrice);
  const condition = CONDITION_LABELS[item.condition];

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "کنسول استوک", href: "/used-consoles" },
          { label: item.name },
        ]}
      />

      <section className="mx-auto w-full max-w-page px-3 pb-16 sm:px-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:items-start">
          {/* تصویر */}
          <div className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-2xl border border-border-subtle bg-media lg:mx-0 lg:max-w-none">
            <Image
              src={item.image}
              alt={item.name}
              fill
              priority
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-cover"
            />
            {percent > 0 ? (
              <span className="absolute start-3 top-3 rounded-full bg-red-500 px-2.5 py-0.5 text-[11px] font-bold text-white">
                ٪{percent.toLocaleString("fa-IR")} تخفیف
              </span>
            ) : null}
          </div>

          {/* اطلاعات */}
          <div className="flex flex-col gap-5">
            <header>
              <h1 className="font-display text-h3 font-bold text-text-primary sm:text-h2">
                {item.name}
              </h1>
              <p className="mt-3 text-sm leading-7 text-text-secondary">
                این دستگاه کارکرده است، پیش از ارسال تست می‌شود و با گارانتی فروشگاه عرضه
                می‌شود.
              </p>
            </header>

            <div className="rounded-2xl border border-border-subtle bg-surface p-5">
              <ul className="mb-4 flex flex-wrap items-center gap-2 text-xs">
                <li className="rounded-full border border-border-subtle px-2.5 py-1 font-semibold text-text-secondary">
                  وضعیت: {condition.label}
                </li>
                <li className="rounded-full border border-border-subtle px-2.5 py-1 font-semibold text-text-secondary">
                  سلامت ظاهری:{" "}
                  <span className="font-bold tabular-nums">
                    {item.conditionScore.toLocaleString("fa-IR")}٪
                  </span>
                </li>
                <li className="rounded-full border border-border-subtle px-2.5 py-1 font-semibold text-text-secondary">
                  گارانتی {item.warrantyMonths.toLocaleString("fa-IR")} ماهه
                </li>
              </ul>

              <p className="text-xs text-text-tertiary line-through">
                {formatPrice(item.originalPrice)}
              </p>
              <p className="font-display text-h2 font-bold text-accent-400">
                {formatPrice(item.price)}
              </p>

              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                <Link
                  href="/used-consoles"
                  className="flex h-11 w-full items-center justify-center rounded-lg border border-border-strong px-5 text-sm font-semibold text-text-primary transition-colors duration-fast hover:border-accent-500/60 hover:text-accent-400 sm:w-auto"
                >
                  بازگشت به کنسول استوک
                </Link>
              </div>
            </div>

            <ul className="flex flex-wrap gap-x-5 gap-y-2 rounded-2xl border border-border-subtle bg-surface p-5 text-xs text-text-tertiary">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-accent-500" aria-hidden />
                گارانتی بازگشت وجه تا ۷ روز
              </li>
              <li className="flex items-center gap-1.5">
                <Truck className="size-3.5 text-accent-500" aria-hidden />
                ارسال به سراسر کشور
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
