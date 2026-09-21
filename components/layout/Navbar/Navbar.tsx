"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { Menu, X } from "lucide-react";
import CategoriesPanel from "./CategoriesPanel";
import CyberFrame from "./CyberFrame";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";
import NavbarActions from "./NavbarActions";
import NavbarLogo from "./NavbarLogo";
import SearchPanel from "./SearchPanel";
import { FOCUS, GLOW, cx } from "./navbar-styles";

type Panel = "categories" | "search" | "mobile" | null;

type NavbarProps = { cartCount?: number };

export default function Navbar({ cartCount = 0 }: NavbarProps) {
  const [panel, setPanel] = useState<Panel>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const close = () => setPanel(null);
  const toggle = (next: Exclude<Panel, null>) =>
    setPanel((cur) => (cur === next ? null : next));

  // Close on outside pointer press.
  useEffect(() => {
    if (!panel) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setPanel(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [panel]);

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") setPanel(null);
  }

  return (
    <header className="sticky top-0 z-50 px-2 pt-2 sm:px-4">
      <div
        ref={rootRef}
        onKeyDown={onKeyDown}
        onPointerLeave={(e) =>
          e.pointerType === "mouse" && setPanel((cur) => (cur === "categories" ? null : cur))
        }
        className="relative mx-auto max-w-page"
      >
        <CyberFrame size="lg" wrapperClassName={GLOW.frame} className="bg-canvas">
          {/* HUD accents */}
          <span
            aria-hidden
            className={cx("pointer-events-none absolute bottom-0 start-5 h-0.5 w-14 bg-red-500", GLOW.line)}
          />
          <span
            aria-hidden
            className={cx("pointer-events-none absolute bottom-0 end-5 h-0.5 w-14 bg-red-500", GLOW.line)}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-l from-transparent via-red-500/50 to-transparent"
          />

          {/* 1fr | auto | 1fr keeps the logo exactly centered */}
          <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 lg:h-16 lg:px-9">
            <div className="flex items-center justify-start">
              <button
                type="button"
                aria-label={panel === "mobile" ? "بستن منو" : "باز کردن منو"}
                aria-expanded={panel === "mobile"}
                aria-controls="navbar-mobile"
                onClick={() => toggle("mobile")}
                className={cx(
                  "grid size-9 place-items-center rounded-full border border-red-500/40 text-text-primary",
                  "transition-[border-color,color] duration-fast hover:border-red-500 hover:text-red-400 lg:hidden",
                  FOCUS,
                )}
              >
                {panel === "mobile" ? (
                  <X className="size-5" aria-hidden />
                ) : (
                  <Menu className="size-5" aria-hidden />
                )}
              </button>

              <DesktopNav
                categoriesOpen={panel === "categories"}
                onToggleCategories={() => toggle("categories")}
                onHoverCategories={() => setPanel("categories")}
                onNavigate={close}
              />
            </div>

            <NavbarLogo />

            <NavbarActions
              cartCount={cartCount}
              searchOpen={panel === "search"}
              onToggleSearch={() => toggle("search")}
              onNavigate={close}
            />
          </div>
        </CyberFrame>

        {/* Panels live outside the clipped frame so they aren't cut off */}
        <CategoriesPanel open={panel === "categories"} onNavigate={close} />
        <SearchPanel open={panel === "search"} onClose={close} />
        <MobileMenu open={panel === "mobile"} onNavigate={close} />
      </div>
    </header>
  );
}
