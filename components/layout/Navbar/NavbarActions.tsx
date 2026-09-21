import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";
import CyberFrame from "./CyberFrame";
import HudIconButton from "./HudIconButton";
import ThemeToggle from "./ThemeToggle";
import { FOCUS, GLOW, cx } from "./navbar-styles";

type NavbarActionsProps = {
  cartCount: number;
  searchOpen: boolean;
  onToggleSearch: () => void;
  onNavigate: () => void;
};

/** Left cluster (RTL end): theme, search, cart, divider, login. */
export default function NavbarActions({
  cartCount,
  searchOpen,
  onToggleSearch,
  onNavigate,
}: NavbarActionsProps) {
  return (
    <div className="flex items-center justify-end gap-2 lg:gap-3">
      <ThemeToggle className="hidden lg:flex" />

      <HudIconButton
        label="جستجو"
        aria-expanded={searchOpen}
        aria-controls="navbar-search"
        onClick={onToggleSearch}
      >
        <Search className="size-[18px]" aria-hidden />
      </HudIconButton>

      <HudIconButton label="سبد خرید" href="/cart" badge={cartCount}>
        <ShoppingCart className="size-[18px]" aria-hidden />
      </HudIconButton>

      <span aria-hidden className="mx-1 hidden h-7 w-px bg-border-strong lg:block" />

      <Link
        href="/login"
        onClick={onNavigate}
        className={cx("hidden lg:block", FOCUS)}
      >
        <CyberFrame size="sm" wrapperClassName={GLOW.hover} className="bg-canvas">
          <span className="flex h-10 items-center gap-2 px-4 text-sm font-semibold text-text-primary transition-colors duration-fast hover:text-red-400">
            <User className="size-[18px]" aria-hidden />
            ورود / ثبت‌نام
          </span>
        </CyberFrame>
      </Link>
    </div>
  );
}
