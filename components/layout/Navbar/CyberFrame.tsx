import type { ReactNode } from "react";
import { CLIP, cx } from "./navbar-styles";

type CyberFrameProps = {
  size?: "sm" | "lg";
  children: ReactNode;
  /** Applied to the outer wrapper — use for glow / hover drop-shadow. */
  wrapperClassName?: string;
  /** Applied to the inner surface. */
  className?: string;
};

/**
 * Angled 1px HUD border built from two nested clip-path layers
 * (border layer + surface layer). No images.
 */
export default function CyberFrame({
  size = "sm",
  children,
  wrapperClassName,
  className,
}: CyberFrameProps) {
  return (
    <div className={cx("transition-[filter] duration-fast ease-fast", wrapperClassName)}>
      <div
        className={cx(
          CLIP[size],
          "bg-linear-to-l from-red-600/80 via-red-500/25 to-red-600/80 p-px",
        )}
      >
        <div className={cx(CLIP[size], "relative h-full bg-surface", className)}>
          {children}
        </div>
      </div>
    </div>
  );
}
