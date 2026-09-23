import Link from "next/link";
import { ChevronLeft, House } from "lucide-react";

export type Crumb = { label: string; href?: string };

/**
 * Cyber-styled breadcrumb trail: "خانه / اکشن" — separators point the
 * way reading flows in RTL (home → deeper page = visually leftward),
 * last crumb is the current page (not a link, red accent, aria-current).
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: "خانه", href: "/" }, ...items];

  return (
    <nav aria-label="مسیر صفحه" className="mx-auto w-full max-w-page px-3 sm:px-4">
      <ol className="flex flex-wrap items-center gap-1.5 py-4 text-sm">
        {all.map((crumb, i) => {
          const isLast = i === all.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && (
                <ChevronLeft
                  aria-hidden
                  className="size-3.5 shrink-0 text-text-tertiary"
                />
              )}

              {isLast || !crumb.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className="font-semibold text-red-400"
                >
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="flex items-center gap-1 font-medium text-text-secondary transition-colors duration-fast ease-fast hover:text-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 focus-visible:rounded-sm"
                >
                  {i === 0 && <House aria-hidden className="size-3.5" />}
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
