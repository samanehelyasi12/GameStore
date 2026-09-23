"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { navItems, type NavItem } from "./navbar-data";
import { CLIP, FOCUS, GLOW, cx } from "./navbar-styles";

type DesktopNavProps = {
  categoriesOpen: boolean;
  onToggleCategories: () => void;
  onHoverCategories: () => void;
  onNavigate: () => void;
};

const item = cx(
  "relative flex h-8 items-center gap-1 px-3 text-[13px] font-semibold text-text-secondary",
  "transition-[color,background-color] duration-fast ease-fast",
  "hover:text-red-400",
  GLOW.text,
  "after:absolute after:inset-x-3 after:bottom-0.5 after:h-px after:origin-center after:scale-x-0",
  "after:bg-red-500 after:transition-transform after:duration-fast hover:after:scale-x-100",
  FOCUS,
);

const activeItem = cx(
  CLIP.chip,
  "bg-red-600 text-white after:hidden hover:text-white",
  "shadow-none",
);

function isActive(entry: Extract<NavItem, { kind: "link" }>, pathname: string) {
  if (entry.match === "exact") return pathname === entry.href;
  if (entry.match === "prefix") return pathname.startsWith(entry.href.split("?")[0]);
  return false;
}

export default function DesktopNav({
  categoriesOpen,
  onToggleCategories,
  onHoverCategories,
  onNavigate,
}: DesktopNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="منوی اصلی" className="hidden items-center gap-1 lg:flex">
      {navItems.map((entry) =>
        entry.kind === "link" ? (
          <Link
            key={entry.href}
            href={entry.href}
            onClick={onNavigate}
            aria-current={isActive(entry, pathname) ? "page" : undefined}
            className={cx(item, isActive(entry, pathname) && activeItem)}
          >
            {entry.label}
          </Link>
        ) : (
          <button
            key="categories"
            type="button"
            aria-expanded={categoriesOpen}
            aria-controls="navbar-categories"
            onClick={onToggleCategories}
            onPointerEnter={(e) => e.pointerType === "mouse" && onHoverCategories()}
            className={cx(
              item,
              (categoriesOpen || pathname.startsWith("/categories") || pathname.startsWith("/consoles")) &&
                "text-red-400 after:scale-x-100",
            )}
          >
            {entry.label}
            <ChevronDown
              aria-hidden
              className={cx(
                "size-3.5 transition-transform duration-fast",
                categoriesOpen && "rotate-180",
              )}
            />
          </button>
        ),
      )}
    </nav>
  );
}
