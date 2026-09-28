import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import type { ReactNode } from "react";

export const metadata: Metadata = { title: "قوانین و مقررات" };

const sections: { title: string; body: ReactNode }[] = [
  {
    title: "۱. معرفی و پذیرش قوانین",
    body: "استفاده از فروشگاه به معنی پذیرش کامل این قوانین است. ثبت‌نام و تکمیل هر سفارش به معنی موافقت شما با شرایط زیر است.",
  },
  {
    title: "۲. حساب کاربری",
    body: "اطلاعات وارد‌شده در هنگام ثبت‌نام باید صحیح باشد. مسئولیت نگهداری رمز عبور بر عهده‌ی کاربر است و فروشگاه هرگز رمز عبور شما را از طریق تماس یا پیام دریافت نمی‌کند.",
  },
  {
    title: "۳. قیمت‌ها و پرداخت",
    body: "تمام قیمت‌ها به تومان و شامل مالیات و عوارض هستند. پرداخت از طریق درگاه‌های بانکی معتبر انجام می‌شود و سفارش پس از تأیید تراکنش نهایی می‌گردد.",
  },
  {
    title: "۴. تحویل و فعال‌سازی",
    body: "محصولات دیجیتال به‌صورت کلید فعال‌سازی تحویل داده می‌شوند. زمان تحویل کلید معمولاً کمتر از ۳۰ دقیقه و برای سفارش‌های حجیم تا ۲۴ ساعت کاری است.",
  },
  {
    title: "۵. گارانتی محصولات",
    body: "تمام بازی‌ها اورجینال بوده و دارای گارانتی فعال‌سازی هستند. در صورت بروز مشکل در فعال‌سازی، پشتیبانی فنی فروشگاه رسیدگی می‌کند.",
  },
  {
    title: "۶. مرجوعی و لغو سفارش",
    body: "به دلیل ماهیت دیجیتال محصولات، امکان مرجوعی پس از تحویل کلید وجود ندارد. سفارش‌های پرداخت‌نشده پس از ۳۰ دقیقه به‌صورت خودکار لغو می‌شوند.",
  },
  {
    title: "۷. تغییرات",
    body: "فروشگاه می‌تواند این قوانین را به‌روزرسانی کند. نسخه‌ی معتبر، همین صفحه است که در زمان خرید مشاهده می‌کنید.",
  },
];

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "قوانین و مقررات" }]} />

      <section className="mx-auto w-full max-w-narrow px-3 pb-16 sm:px-4">
        <header className="mb-6">
          <p className="text-kicker text-red-400">مستندات</p>
          <h1 className="mt-1 font-display text-h3 font-bold text-text-primary sm:text-h2">
            قوانین و مقررات
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
          این متن نمونه است و پیش از انتشار باید توسط مشاور حقوقی بازبینی شود.
        </p>
      </section>
    </>
  );
}
