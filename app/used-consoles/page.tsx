import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Truck } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import {
  CONDITION_LABELS,
  discountPercent,
  usedConsoles,
} from "@/components/home/UsedConsolesSection/used-consoles-data";
import { formatPrice } from "@/lib/utils";
import { FOCUS, cx } from "@/components/layout/Navbar/navbar-styles";

export const metadata: Metadata = { title: "کنسول استوک" };

type ConsoleBrand = "PS5" | "PS4" | "Xbox";

const brandLogo: Record<ConsoleBrand, string> = {
  PS5: "/images/logos/ps5.webp",
  PS4: "/images/logos/ps4.png",
  Xbox: "/images/logos/xbox.png",
};

export default function UsedConsolesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "کنسول استوک" }]} />

      <section className="mx-auto w-full max-w-page px-3 pb-16 sm:px-4">
        <header className="mb-6">
          <p className="text-kicker text-red-400">کنسول استوک</p>
          <h1 className="mt-1 font-display text-h3 font-bold text-text-primary sm:text-h2">
            کنسول‌های کارکرده با گارانتی
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-text-secondary">
            تمام دستگاه‌ها پیش از ارسال تست می‌شوند و با سلامت ظاهری مشخص و گارانتی فروشگاه عرضه
            می‌شوند.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {usedConsoles.map((item) => {
            const percent = discountPercent(item.price, item.originalPrice);
            const condition = CONDITION_LABELS[item.condition];

            return (
              <article
                key={item.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface transition-[border-color,transform] duration-base ease-standard hover:-translate-y-1 hover:border-red-500/50"
              >
                <div className="relative grid h-40 place-items-center bg-media">
                  <Image
                    src={brandLogo[item.brand]}
                    alt={item.brand}
                    width={160}
                    height={70}
                    className="max-h-20 w-auto object-contain"
                  />

                  {percent > 0 ? (
                    <span className="absolute end-3 top-3 rounded-full bg-red-500 px-2.5 py-0.5 text-[11px] font-bold text-white">
                      ٪{percent.toLocaleString("fa-IR")} تخفیف
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div>
                    <h2 className="font-display text-base font-bold text-text-primary">
                      {item.name}
                    </h2>
                    <p className="mt-1 text-xs text-text-tertiary">
                      سلامت ظاهری:{" "}
                      <span className="font-bold tabular-nums text-text-secondary">
                        {item.conditionScore.toLocaleString("fa-IR")}٪
                      </span>
                    </p>
                  </div>

                  <ul className="flex flex-wrap items-center gap-2 text-xs">
                    <li className="rounded-full border border-border-subtle px-2.5 py-1 font-semibold text-text-secondary">
                      {condition.label}
                    </li>
                    <li className="rounded-full border border-border-subtle px-2.5 py-1 font-semibold text-text-secondary">
                      گارانتی {item.warrantyMonths.toLocaleString("fa-IR")} ماهه
                    </li>
                  </ul>

                  <div className="mt-auto flex items-end justify-between gap-3 border-t border-border-subtle pt-4">
                    <div>
                      <p className="text-xs text-text-tertiary line-through">
                        {formatPrice(item.originalPrice)}
                      </p>
                      <p className="font-display text-base font-bold tabular-nums text-red-400">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <Link
                      href="/contact"
                      className={cx(
                        "flex h-10 items-center justify-center rounded-lg border border-border-strong px-4 text-xs font-bold text-text-primary",
                        "transition-colors duration-fast hover:border-red-500/60 hover:text-red-400",
                        FOCUS,
                      )}
                    >
                      استعلام قیمت
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-text-tertiary">
          <li className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-red-500" aria-hidden />
            گارانتی بازگشت وجه تا ۷ روز
          </li>
          <li className="flex items-center gap-1.5">
            <Truck className="size-3.5 text-red-500" aria-hidden />
            ارسال به سراسر کشور
          </li>
        </ul>
      </section>
    </>
  );
}
