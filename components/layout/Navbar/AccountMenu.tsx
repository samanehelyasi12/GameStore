"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LayoutDashboard, LogOut, User as UserIcon } from "lucide-react";
import Avatar from "@/components/auth/Avatar";
import { useAuth } from "@/components/auth/AuthProvider";
import { FOCUS, cx } from "@/components/layout/Navbar/navbar-styles";

const item = cx(
  "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold",
  "transition-colors duration-fast",
  FOCUS,
);

/**
 * Navbar account cluster: avatar + name, and a small dropdown holding
 * «پنل کاربری» and «خروج». Opens on hover (pointer devices) and stays
 * open on click / keyboard, which is what touch and keyboard users need.
 */
export default function AccountMenu({ onNavigate }: { onNavigate?: () => void }) {
  const { user, ready, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close on outside click and on Escape.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  if (!ready) {
    return <span aria-hidden className="block h-9 w-24 rounded-lg bg-surface-raised" />;
  }

  if (!user) return null;

  const scheduleClose = () => {
    if (pinned) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const handleLogout = () => {
    signOut();
    setOpen(false);
    onNavigate?.();
  };

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        onClick={() => {
          setPinned((value) => !value);
          setOpen((value) => !value);
        }}
        onFocus={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={cx(
          "flex h-9 items-center gap-2 rounded-full border border-border-subtle bg-canvas ps-1 pe-3",
          "transition-colors duration-fast hover:border-red-500/50",
          FOCUS,
        )}
      >
        <Avatar name={user.name} size="sm" />
        <span className="max-w-24 truncate text-[13px] font-semibold text-text-primary">
          {user.name}
        </span>
      </button>

      {/* منوی کوچک */}
      <div
        role="menu"
        aria-label="حساب کاربری"
        hidden={!open}
        className={cx(
          "absolute end-0 top-[calc(100%+8px)] z-50 w-60 overflow-hidden rounded-xl",
          "border border-border-subtle bg-surface shadow-xl",
        )}
      >
        <div className="flex items-center gap-3 border-b border-border-subtle p-3">
          <Avatar name={user.name} size="md" />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-text-primary">{user.name}</p>
            <p dir="ltr" className="truncate text-start text-xs text-text-tertiary">
              {user.email}
            </p>
          </div>
        </div>

        <div className="p-1.5">
          <Link
            href="/account"
            role="menuitem"
            onClick={() => {
              onNavigate?.();
              setOpen(false);
            }}
            className={cx(item, "text-text-secondary hover:bg-red-subtle hover:text-red-400")}
          >
            <LayoutDashboard className="size-4" aria-hidden />
            پنل کاربری
          </Link>

          <Link
            href="/account/orders"
            role="menuitem"
            onClick={() => {
              onNavigate?.();
              setOpen(false);
            }}
            className={cx(item, "text-text-secondary hover:bg-red-subtle hover:text-red-400")}
          >
            <UserIcon className="size-4" aria-hidden />
            سفارش‌های من
          </Link>

          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className={cx(
              item,
              "border-t border-border-subtle text-text-secondary hover:bg-red-subtle hover:text-red-400",
              "mt-1 w-full rounded-none px-3 pt-2.5",
            )}
          >
            <LogOut className="size-4" aria-hidden />
            خروج از حساب
          </button>
        </div>
      </div>
    </div>
  );
}
