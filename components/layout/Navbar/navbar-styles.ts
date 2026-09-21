/** Tiny class joiner (no extra dependency). */
export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/* ── Tunable Cyber/HUD tokens ─────────────────────────────────
   Change colors / glow here; everything else reads from these. */

/** Angled clip-paths (corner cut: sm = 8px, lg = 16px). */
export const CLIP = {
  sm: "[clip-path:polygon(8px_0,100%_0,100%_calc(100%_-_8px),calc(100%_-_8px)_100%,0_100%,0_8px)]",
  lg: "[clip-path:polygon(16px_0,calc(100%_-_16px)_0,100%_16px,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,16px_100%,0_calc(100%_-_16px),0_16px)]",
  /** Parallelogram chip used for nav items. */
  chip: "[clip-path:polygon(10px_0,100%_0,calc(100%_-_10px)_100%,0_100%)]",
  /** Trapezoid behind the logo. */
  logo: "[clip-path:polygon(0_0,100%_0,calc(100%_-_26px)_100%,26px_100%)]",
} as const;

/** Soft red glow (box-shadow) and hover glow (drop-shadow, works with clip-path). */
export const GLOW = {
  box: "shadow-[0_0_10px_color-mix(in_oklab,var(--color-red-500)_35%,transparent)]",
  frame: "drop-shadow-[0_0_8px_color-mix(in_oklab,var(--color-red-500)_28%,transparent)]",
  hover: "hover:drop-shadow-[0_0_8px_color-mix(in_oklab,var(--color-red-500)_65%,transparent)]",
  text: "hover:[text-shadow:0_0_10px_color-mix(in_oklab,var(--color-red-500)_70%,transparent)]",
  line: "shadow-[0_0_8px_var(--color-red-500)]",
} as const;

/** Shared focus style for interactive items. */
export const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400";
