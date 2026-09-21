"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import NavPanel from "./NavPanel";
import { FOCUS, cx } from "./navbar-styles";

type SearchPanelProps = { open: boolean; onClose: () => void };

export default function SearchPanel({ open, onClose }: SearchPanelProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/games?q=${encodeURIComponent(q)}`);
    onClose();
  }

  return (
    <NavPanel id="navbar-search" open={open}>
      <form onSubmit={onSubmit} role="search" className="flex items-center gap-3 p-4">
        <Search aria-hidden className="size-5 shrink-0 text-red-500" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          placeholder="جستجوی بازی، کنسول یا ژانر..."
          className={cx(
            "h-11 min-w-0 flex-1 rounded-md border border-border-strong bg-canvas px-4 text-sm",
            "text-text-primary placeholder:text-text-tertiary",
            "transition-[border-color,box-shadow] duration-fast focus:border-red-500",
            "focus:shadow-[0_0_10px_color-mix(in_oklab,var(--color-red-500)_35%,transparent)] focus:outline-none",
          )}
        />
        <button
          type="submit"
          className={cx(
            "h-11 rounded-md bg-red-600 px-5 text-sm font-bold text-white transition-colors duration-fast hover:bg-red-500",
            FOCUS,
          )}
        >
          جستجو
        </button>
      </form>
    </NavPanel>
  );
}
