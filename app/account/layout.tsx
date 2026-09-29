import type { ReactNode } from "react";
import AccountNav from "@/components/account/AccountNav";

type AccountLayoutProps = { children: ReactNode };

export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <section className="mx-auto w-full max-w-page px-3 pb-16 pt-6 sm:px-4 sm:pt-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[264px_minmax(0,1fr)] lg:items-start">
        {/* نوار کناری */}
        <aside className="lg:sticky lg:top-24">
          <div className="rounded-2xl border border-border-subtle bg-surface p-4">
            <p className="text-kicker text-red-400">پنل کاربری</p>
            <p className="mt-1 font-display text-h4 font-bold text-text-primary">
              حساب من
            </p>
          </div>

          <AccountNav />
        </aside>

        {/* محتوا */}
        <div className="min-w-0">
          <div className="rounded-2xl border border-border-subtle bg-surface/60 p-5 backdrop-blur-xl sm:p-6">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
