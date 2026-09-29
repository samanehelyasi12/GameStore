import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";
import AccountMenu from "./AccountMenu";
import CyberFrame from "./CyberFrame";
import HudIconButton from "./HudIconButton";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/components/auth/AuthProvider";
import { FOCUS, GLOW, cx } from "./navbar-styles";

type NavbarActionsProps = {
  cartCount: number;
  searchOpen: boolean;
  onToggleSearch: () => void;
  onNavigate: () => void;
};

/** The "login" CTA — only while nobody is signed in. */
function SignedOutButton({ onNavigate }: { onNavigate: () => void }) {
  const { user, ready } = useAuth();

  if (!ready || user) return null;

  return (
    <Link href="/login" onClick={onNavigate} className={cx("hidden lg:block", FOCUS)}>
      <CyberFrame size="sm" wrapperClassName={GLOW.hover} className="bg-canvas">
        <span className="flex h-9 items-center gap-1.5 px-3 text-[13px] font-semibold text-text-primary transition-colors duration-fast hover:text-red-400">
          <User className="size-4" aria-hidden />
          ورود / ثبت‌نام
        </span>
      </CyberFrame>
    </Link>
  );
}

/** Left cluster (RTL end): theme, search, cart, divider, login. */
export default function NavbarActions({
  cartCount,
  searchOpen,
  onToggleSearch,
  onNavigate,
}: NavbarActionsProps) {
  return (
    <div className="flex items-center justify-end gap-2 lg:gap-2">
      <ThemeToggle className="hidden lg:flex" />

      <HudIconButton
        label="جستجو"
        aria-expanded={searchOpen}
        aria-controls="navbar-search"
        onClick={onToggleSearch}
      >
        <Search className="size-4" aria-hidden />
      </HudIconButton>

      <HudIconButton label="سبد خرید" href="/cart" badge={cartCount}>
        <ShoppingCart className="size-4" aria-hidden />
      </HudIconButton>

      <span aria-hidden className="mx-1 hidden h-6 w-px bg-border-strong lg:block" />

      {/* Signed out → login button · signed in → avatar + name + dropdown */}
      <div className="hidden lg:block">
        <AccountMenu onNavigate={onNavigate} />
      </div>

      <SignedOutButton onNavigate={onNavigate} />
    </div>
  );
}
