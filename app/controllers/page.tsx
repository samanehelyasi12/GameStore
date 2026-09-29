import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ControllersBrowser from "@/components/home/ControllersSection/ControllersBrowser";

export const metadata: Metadata = { title: "دسته‌های بازی" };

export default function ControllersPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "دسته‌های بازی" }]} />

      <section className="mx-auto w-full max-w-page px-3 pb-16 sm:px-4">
        <header className="mb-6">
          <p className="text-kicker text-accent-400">لوازم جانبی</p>
          <h1 className="mt-1 font-display text-h3 font-bold text-text-primary sm:text-h2">
            خرید دسته بازی
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-text-secondary">
            گیم‌پد اورجینال PS5، PS4، Xbox و PC با گارانتی و ارسال به سراسر کشور.
          </p>
        </header>

        <ControllersBrowser />
      </section>
    </>
  );
}
