import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { FOCUS, GLOW, cx } from "./navbar-styles";

type Common = {
  label: string;
  children: ReactNode;
  badge?: number;
  className?: string;
};

type HudIconButtonProps =
  | (Common & { href: string } & { onClick?: never })
  | (Common & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">);

const base = cx(
  "relative grid size-9 place-items-center rounded-full border border-red-500/40 bg-canvas",
  "text-text-primary transition-[color,border-color,box-shadow,background-color] duration-fast ease-fast",
  "hover:border-red-500 hover:bg-red-subtle hover:text-red-400",
  `hover:${GLOW.box}`,
  "active:scale-95 lg:size-9",
  FOCUS,
);

/** Round icon button (button or link) with optional counter badge. */
export default function HudIconButton(props: HudIconButtonProps) {
  const { label, children, badge, className } = props;

  const content = (
    <>
      {children}
      {badge ? (
        <span
          aria-hidden
          className="absolute -end-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[11px] font-bold leading-none text-white"
        >
          {badge > 99 ? "99+" : badge}
        </span>
      ) : null}
    </>
  );

  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        aria-label={badge ? `${label} (${badge})` : label}
        className={cx(base, className)}
      >
        {content}
      </Link>
    );
  }

  const { label: _l, children: _c, badge: _b, className: _cn, href: _h, ...rest } =
    props as Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
  return (
    <button type="button" aria-label={label} className={cx(base, className)} {...rest}>
      {content}
    </button>
  );
}
