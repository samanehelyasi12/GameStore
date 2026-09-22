import Link from "next/link";
import { Crown } from "lucide-react";
import { CLIP, FOCUS, cx } from "./navbar-styles";

/** Center logo on a raised trapezoid plate (pure CSS, no image). */
export default function NavbarLogo() {
  return (
    <Link
      href="/"
      aria-label="GAME STORE — صفحه اصلی"
      className={cx("group relative flex h-full items-center justify-center px-9 lg:px-16", FOCUS)}
    >
      <span
        aria-hidden
        className={cx(
          CLIP.logo,
          "absolute inset-0 bg-surface-raised transition-colors duration-base group-hover:bg-red-subtle",
        )}
      />
      <span
        aria-hidden
        className="absolute inset-x-8 bottom-0 h-0.5 bg-red-500 shadow-[0_0_8px_var(--color-red-500)]"
      />
      <span className="relative flex flex-col items-center leading-none">
        <Crown className="mb-0.5 size-3.5 text-red-500 lg:size-4" aria-hidden />
        <span
          dir="ltr"
          className="-skew-x-6 font-display text-lg font-black uppercase tracking-tight text-text-primary sm:text-xl lg:text-[26px]"
        >
          GAME <span className="text-red-500">STORE</span>
        </span>
        <span
          dir="ltr"
          className=" hidden text-[8px] font-semibold uppercase tracking-[0.32em] text-text-secondary sm:block"
        >
          For true gamers
        </span>
      </span>
    </Link>
  );
}
