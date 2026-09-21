"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import NavPanel from "./NavPanel";
import { consoles, genres, gamesHref, type ConsoleId } from "./navbar-data";
import { FOCUS, GLOW, cx } from "./navbar-styles";

type CategoriesPanelProps = { open: boolean; onNavigate: () => void };

/** Desktop mega menu: consoles on the side, genres for the chosen console. */
export default function CategoriesPanel({ open, onNavigate }: CategoriesPanelProps) {
  const [active, setActive] = useState<ConsoleId>("ps5");
  const current = consoles.find((c) => c.id === active)!;

  return (
    <NavPanel id="navbar-categories" open={open} className="hidden lg:block">
      <div className="grid grid-cols-[220px_1fr] gap-6 p-5">
        <div className="flex flex-col gap-1.5 border-e border-border-subtle pe-5">
          <p className="mb-1 text-xs font-semibold tracking-wide text-text-tertiary">کنسول</p>
          {consoles.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={active === c.id}
              onPointerEnter={() => setActive(c.id)}
              onFocus={() => setActive(c.id)}
              onClick={() => setActive(c.id)}
              className={cx(
                "flex h-11 items-center gap-2 rounded-md border border-transparent px-3 text-sm font-semibold",
                "text-text-secondary transition-[color,background-color,border-color] duration-fast",
                "hover:text-text-primary",
                active === c.id && "border-red-500/50 bg-red-subtle text-red-400",
                FOCUS,
              )}
            >
              <Gamepad2 className="size-4" aria-hidden />
              {c.label}
            </button>
          ))}
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-bold text-text-primary">
              ژانرهای <span className="text-red-400">{current.label}</span>
            </p>
            <Link
              href={gamesHref(active)}
              onClick={onNavigate}
              className={cx(
                "flex items-center gap-1 text-xs font-semibold text-text-secondary transition-colors hover:text-red-400",
                FOCUS,
              )}
            >
              مشاهده همه
              <ArrowLeft className="size-3.5" aria-hidden />
            </Link>
          </div>

          <ul className="grid grid-cols-3 gap-2">
            {genres.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <Link
                  href={gamesHref(active, id)}
                  onClick={onNavigate}
                  className={cx(
                    "group flex h-12 items-center gap-3 rounded-md border border-border-subtle bg-canvas px-3",
                    "text-sm font-semibold text-text-secondary",
                    "transition-[color,border-color,background-color,box-shadow] duration-fast",
                    "hover:border-red-500/70 hover:bg-red-subtle hover:text-text-primary",
                    `hover:${GLOW.box}`,
                    FOCUS,
                  )}
                >
                  <Icon
                    aria-hidden
                    className="size-4 text-red-500 transition-transform duration-fast group-hover:scale-110"
                  />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </NavPanel>
  );
}
