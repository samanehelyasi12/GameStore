"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ACCOUNT_TABS } from "./account-nav-data";
import { FOCUS, cx } from "@/components/layout/Navbar/navbar-styles";

/** Sidebar navigation of the account panel. Marks the current section. */
export default function AccountNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="منوی پنل کاربری" className="mt-3">
      <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
        {ACCOUNT_TABS.map((tab) => {
          const active =
            tab.href === "/account" ? pathname === "/account" : pathname.startsWith(tab.href);
          const Icon = tab.icon;

          return (
            <li key={tab.href} className="shrink-0 lg:shrink">
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={cx(
                  "group flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors duration-fast",
                  FOCUS,
                  active
                    ? "border-red-500/50 bg-red-subtle"
                    : "border-border-subtle bg-surface hover:border-border-strong",
                )}
              >
                <span
                  className={cx(
                    "grid size-9 shrink-0 place-items-center rounded-lg transition-colors duration-fast",
                    active
                      ? "bg-red-500 text-white"
                      : "bg-surface-raised text-text-tertiary group-hover:text-red-400",
                  )}
                >
                  <Icon className="size-4" aria-hidden />
                </span>

                <span className="min-w-0">
                  <span
                    className={cx(
                      "block text-sm font-semibold",
                      active ? "text-red-400" : "text-text-primary",
                    )}
                  >
                    {tab.label}
                  </span>
                  <span className="mt-0.5 hidden text-xs text-text-tertiary lg:block">
                    {tab.description}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
