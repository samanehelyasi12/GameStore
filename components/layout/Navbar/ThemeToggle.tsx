"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { FOCUS, cx } from "./navbar-styles";

/**
 * Both icons are always rendered; the active one is chosen by the
 * `dark:` variant (data-theme), so there is no SSR/hydration mismatch.
 */
export default function ThemeToggle({ className }: { className?: string }) {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="تغییر تم روشن / تیره"
      className={cx(
        "flex h-9 items-center gap-0.5 rounded-full border border-red-500/40 bg-canvas p-0.5",
        "transition-[border-color,box-shadow] duration-fast hover:border-red-500",
        "hover:shadow-[0_0_10px_color-mix(in_oklab,var(--color-red-500)_35%,transparent)]",
        "lg:h-10",
        FOCUS,
        className,
      )}
    >
      <span className="grid size-8 place-items-center rounded-full bg-red-600 text-white transition-colors duration-fast dark:bg-transparent dark:text-text-tertiary lg:size-9">
        <Sun className="size-4" aria-hidden />
      </span>
      <span className="grid size-8 place-items-center rounded-full text-text-tertiary transition-colors duration-fast dark:bg-red-600 dark:text-white lg:size-9">
        <Moon className="size-4" aria-hidden />
      </span>
    </button>
  );
}
