"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, User } from "lucide-react";
import NavPanel from "./NavPanel";
import ThemeToggle from "./ThemeToggle";
import { consoles, genres, categoryHref, consoleHref, navItems, type ConsoleId } from "./navbar-data";
import { FOCUS, cx } from "./navbar-styles";

type MobileMenuProps = { open: boolean; onNavigate: () => void };

const row = cx(
  "flex h-12 w-full items-center justify-between rounded-md px-3 text-sm font-semibold text-text-primary",
  "transition-colors duration-fast hover:bg-red-subtle hover:text-red-400",
  FOCUS,
);

export default function MobileMenu({ open, onNavigate }: MobileMenuProps) {
  const [catOpen, setCatOpen] = useState(false);
  const [active, setActive] = useState<ConsoleId>("ps5");

  return (
    <NavPanel id="navbar-mobile" open={open} className="lg:hidden">
      <nav
        aria-label="منوی موبایل"
        className="flex max-h-[calc(100dvh-6rem)] flex-col gap-1 overflow-y-auto p-3"
      >
        {navItems.map((entry) =>
          entry.kind === "link" ? (
            <Link key={entry.href} href={entry.href} onClick={onNavigate} className={row}>
              {entry.label}
            </Link>
          ) : (
            <div key="categories">
              <button
                type="button"
                aria-expanded={catOpen}
                onClick={() => setCatOpen((v) => !v)}
                className={row}
              >
                {entry.label}
                <ChevronDown
                  aria-hidden
                  className={cx("size-4 transition-transform duration-fast", catOpen && "rotate-180")}
                />
              </button>

              {catOpen && (
                <div className="mx-2 mb-2 mt-1 border-s-2 border-red-500/60 ps-3">
                  <div className="flex gap-2 py-2">
                    {consoles.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        aria-pressed={active === c.id}
                        onClick={() => setActive(c.id)}
                        className={cx(
                          "h-9 flex-1 rounded-md border border-border-strong px-2 text-xs font-semibold text-text-secondary",
                          "transition-colors duration-fast",
                          active === c.id && "border-red-500 bg-red-subtle text-red-400",
                          FOCUS,
                        )}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                  <Link
                    href={consoleHref(active)}
                    onClick={onNavigate}
                    className={cx(
                      "mb-2 flex h-9 items-center justify-center rounded-md border border-red-500/50 text-xs font-bold text-red-400 transition-colors duration-fast hover:bg-red-subtle",
                      FOCUS,
                    )}
                  >
                    خرید کنسول {consoles.find((c) => c.id === active)?.label}
                  </Link>

                  <ul className="grid grid-cols-2 gap-1.5">
                    {genres.map(({ id, label, icon: Icon }) => (
                      <li key={id}>
                        <Link
                          href={categoryHref(id)}
                          onClick={onNavigate}
                          className={cx(
                            "flex h-10 items-center gap-2 rounded-md bg-canvas px-3 text-xs font-semibold text-text-secondary",
                            "transition-colors duration-fast hover:bg-red-subtle hover:text-red-400",
                            FOCUS,
                          )}
                        >
                          <Icon aria-hidden className="size-4 text-red-500" />
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ),
        )}

        <div className="mt-2 flex items-center justify-between gap-3 border-t border-border-subtle pt-3">
          <Link
            href="/login"
            onClick={onNavigate}
            className={cx(
              "flex h-10 flex-1 items-center justify-center gap-2 rounded-md bg-red-600 text-sm font-bold text-white",
              "transition-colors duration-fast hover:bg-red-500",
              FOCUS,
            )}
          >
            <User aria-hidden className="size-4" />
            ورود / ثبت‌نام
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </NavPanel>
  );
}
