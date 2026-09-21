import type { ReactNode } from "react";
import CyberFrame from "./CyberFrame";
import { cx } from "./navbar-styles";

type NavPanelProps = {
  id: string;
  open: boolean;
  children: ReactNode;
  className?: string;
};

/** Animated dropdown surface shared by mega menu, search and mobile menu. */
export default function NavPanel({ id, open, children, className }: NavPanelProps) {
  return (
    <div
      id={id}
      inert={!open}
      aria-hidden={!open}
      data-open={open}
      className={cx(
        "absolute inset-x-0 top-full z-40 origin-top pt-2",
        "transition-[opacity,transform,visibility] duration-fast ease-standard",
        "invisible -translate-y-1 opacity-0",
        "data-[open=true]:visible data-[open=true]:translate-y-0 data-[open=true]:opacity-100",
        className,
      )}
    >
      <CyberFrame
        size="lg"
        wrapperClassName="drop-shadow-[0_16px_28px_rgba(0,0,0,0.55)]"
        className="bg-surface-raised"
      >
        {children}
      </CyberFrame>
    </div>
  );
}
