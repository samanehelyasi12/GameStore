import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import type { ReactNode } from "react";

export const metadata: Metadata = { title: "حریم خصوصی" };

const sections: { title: string; body: ReactNode }[] = [
  {
    title: "۱. چه اطلاعاتی جمع‌آوری می‌کنیم؟",
    body: "نام، ایمیل، شماره‌ی موبایل، نشانی و اطلاعات سفارش شما. این اطلاعات فقط برای پردازش سفارش و پشتیبانی استفاده می‌شود.",
  },
  {
    title: "۲. کوکی‌ها",
    body: "برای نگهداری سبد خرید و وضعیت ورود شما از کوکی و حافظه‌ی محلی مرورگر استفاده می‌کنیم. با پاک کردن داده‌های مرورگر، سبد خرید پاک می‌شود.",
  },
  {
    title: "۳. اشتراک‌گذاری اطلاعات",
    body: "اطلاعات شما در اختیار هیچ شخص یا شرکت سومی قرار نمی‌گیرد، مگر درگاه پرداخت برای انجام تراکنش و سرویس‌های پیام‌رسان برای ارسال رسید.",
  },
  {
    title: "۴. امنیت",
    body: "ارتباطات سایت رمزنگاری می‌شود و اطلاعات کارت بانکی هرگز روی سرورهای فروشگاه ذخیره نمی‌شود.",
  },
  {
    title: "۵. حقوق شما",
    body: "می‌توانید درخواست حذف حساب، اصلاح اطلاعات یا دریافت نسخه‌ی پشتیبان داده‌های خود را ثبت کنید.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "حریم خصوصی" }]} />

      <section className="mx-auto w-full max-w-narrow px-3 pb-16 sm:px-4">
        <header className="mb-6">
          <p className="text-kicker text-red-400">مستندات</p>
          <h1 className="mt-1 font-display text-h3 font-bold text-text-primary sm:text-h2">
            حریم خصوصی
          </h1>
        </header>

        <div className="flex flex-col gap-3">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-xl border border-border-subtle bg-surface p-5"
            >
              <h2 className="font-display text-base font-bold text-text-primary">
                {section.title}
              </h2>
              <p className="mt-2 text-sm leading-7 text-text-secondary">{section.body}</p>
            </section>
          ))}
        </div>

        <p className="mt-6 text-xs text-text-tertiary">
          این متن نمونه است و باید پیش از انتشار با وضعیت واقعی کسب‌وکار تطبیق داده شود.
        </p>
      </section>
    </>
  );
}
