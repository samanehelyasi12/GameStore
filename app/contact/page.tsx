import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = { title: "تماس با ما" };

const channels = [
  { icon: Phone, label: "تلفن پشتیبانی", value: "۰۲۱-۱۲۳۴۵۶۷۸" },
  { icon: Mail, label: "ایمیل", value: "support@gamestore.ir" },
  { icon: MapPin, label: "نشانی", value: "تهران، خیابان ولیعصر، پلاک ۱۲۳" },
  { icon: Clock, label: "ساعت پاسخگویی", value: "شنبه تا چهارشنبه، ۹ تا ۱۹" },
];

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "تماس با ما" }]} />

      <section className="mx-auto w-full max-w-page px-3 pb-16 sm:px-4">
        <header className="mb-6">
          <p className="text-kicker text-red-400">پشتیبانی</p>
          <h1 className="mt-1 font-display text-h3 font-bold text-text-primary sm:text-h2">
            تماس با ما
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-text-secondary">
            سؤالی درباره‌ی سفارش، گارانتی یا فعال‌سازی بازی دارید؟ از هر کدام از راه‌های زیر با ما در
            تماس باشید.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <ContactForm />

          <aside className="flex flex-col gap-5">
            <ul className="flex flex-col gap-3 rounded-2xl border border-border-subtle bg-surface p-5">
              {channels.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-start gap-3 text-sm">
                  <span className="grid size-9 shrink-0 place-items-center rounded-md border border-red-500/40 bg-red-500/10 text-red-400">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-text-tertiary">{label}</span>
                    <span className="block font-semibold text-text-primary">{value}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-media">
              <Image
                src="/images/faq/controller.webp"
                alt=""
                width={640}
                height={360}
                className="h-40 w-full object-cover"
              />
              <span
                aria-hidden
                className="absolute inset-0"
                style={{ backgroundImage: "var(--gradient-card)" }}
              />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="flex items-center gap-1.5 text-sm font-bold text-text-primary">
                  <Send className="size-4 text-red-500" aria-hidden />
                  پاسخ سریع‌تر با تلگرام
                </p>
                <p className="mt-1 text-xs text-text-secondary">
                  سؤال‌های پرتکرار را در کانال پشتیبانی ببینید.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
