import Image from "next/image";
import Link from "next/link";
import { aboutFeatures } from "./about-data";
import { Heart, Users, Star, ArrowLeft } from "lucide-react";

const FEATURE_ICONS: Record<string, typeof Heart> = {
  love: Heart,
  team: Users,
  support: Star,
};

export default function AboutSection() {
  return (
    <section className="relative mx-auto max-w-page px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      {/* بک‌گراند با لبه‌ی ناهموار (مثل چکه‌ی رنگ روی دیوار) — با SVG mask */}
      <div
        className="absolute inset-0 bg-surface"
        style={{
          WebkitMaskImage: "url('/images/about/splatter-mask.svg')",
          maskImage: "url('/images/about/splatter-mask.svg')",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-l from-red-subtle via-transparent to-transparent opacity-60"
        style={{
          WebkitMaskImage: "url('/images/about/splatter-mask.svg')",
          maskImage: "url('/images/about/splatter-mask.svg')",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-10 py-8 lg:flex-row-reverse lg:items-center lg:gap-16 lg:py-12">
        {/* عکس کاراکترهای شما — همون فایل، بدون برش/کج‌کردن */}
        <div className="relative w-full max-w-[560px] shrink-0 lg:max-w-[520px]">
          <Image
            src="/images/about/characters.webp"
            alt="کاراکترهای محبوب بازی"
            width={1311}
            height={1077}
            className="h-auto w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            priority
          />
        </div>

        {/* متن سمت چپ در دسکتاپ */}
        <div className="flex flex-col items-center px-4 text-center lg:items-start lg:px-0 lg:text-right">
          <span className="mb-2 text-sm font-bold text-red-400">درباره ما</span>

          <h2 className="mb-4 font-display text-h3 font-bold text-text-primary sm:text-h2">
            ما عاشق <span className="text-red-400">بازی</span> هستیم
          </h2>

          <p className="mb-8 max-w-md text-sm leading-7 text-text-secondary sm:text-base">
            گیم‌استور با تیمی از گیمرها و علاقه‌مندان به صنعت بازی تأسیس شد
            تا فضایی حرفه‌ای، امن و دوستانه برای همه‌ی گیمرها فراهم کند. ما
            به قدرت بازی‌ها برای ایجاد ارتباط، سرگرمی و حتی وحدت فردی باور
            داریم.
          </p>

          {/* ویژگی‌ها */}
          <div className="mb-9 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {aboutFeatures.map((feature) => {
              const Icon = FEATURE_ICONS[feature.id];
              return (
                <div key={feature.id} className="flex flex-col items-center gap-2 text-center lg:items-start lg:text-right">
                  <span className="flex size-11 items-center justify-center rounded-full border border-red-400/40 bg-red-subtle text-red-400">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="text-sm font-bold text-text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-text-secondary">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* دکمه سه‌بعدی حرفه‌ای */}
          <Link
            href="/about"
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-b from-red-400 to-red-600 px-8 py-4 text-sm font-bold text-text-inverse shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_-4px_0_rgba(0,0,0,0.25)_inset,0_10px_24px_rgba(229,72,77,0.4)] transition-all duration-fast ease-fast hover:-translate-y-1 hover:shadow-[0_1px_0_rgba(255,255,255,0.3)_inset,0_-4px_0_rgba(0,0,0,0.25)_inset,0_16px_30px_rgba(229,72,77,0.55)] active:translate-y-0 active:shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_-2px_0_rgba(0,0,0,0.25)_inset,0_4px_12px_rgba(229,72,77,0.35)]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-slow ease-standard group-hover:translate-x-full" />
            <span className="relative">بیشتر بدانید</span>
            <ArrowLeft className="relative size-4 transition-transform duration-fast ease-fast group-hover:-translate-x-1.5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}