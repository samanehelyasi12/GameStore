/**
 * Site-wide cyber background: black base + slow red / (purple|blue) streaks.
 * Pure CSS (Tailwind) — no images, no JS. Fixed behind everything.
 *
 * Two layers (dark + light) cross-fade when the theme toggles, driven by
 * the `dark:` variant, so it stays in sync with the existing toggle button.
 */

/* ── Settings ─────────────────────────────────────────────── */
const SECONDARY: "purple" | "blue" = "purple"; // change to "blue" for red + blue

/* Streak colors (dark = bright on black, light = soft tint on paper) */
const RED = {
  soft: { dark: "via-red-500/35", light: "via-red-500/15" },
  line: { dark: "via-red-500/70", light: "via-red-500/35" },
};
const SEC = {
  purple: {
    soft: { dark: "via-purple-500/35", light: "via-purple-500/15" },
    line: { dark: "via-purple-400/60", light: "via-purple-500/30" },
  },
  blue: {
    soft: { dark: "via-accent-500/35", light: "via-accent-500/15" },
    line: { dark: "via-accent-400/60", light: "via-accent-500/30" },
  },
}[SECONDARY];

type Streak = {
  top: string;
  h: string;
  blur: string;
  anim: string;
  color: { dark: string; light: string };
  desktopOnly?: boolean;
};

const streaks: Streak[] = [
  { top: "top-[4%]", h: "h-44", blur: "blur-3xl", anim: "animate-streak-a", color: RED.soft },
  { top: "top-[22%]", h: "h-px", blur: "blur-[1px]", anim: "animate-streak-b", color: RED.line },
  { top: "top-[38%]", h: "h-52", blur: "blur-3xl", anim: "animate-streak-c", color: SEC.soft },
  { top: "top-[55%]", h: "h-px", blur: "blur-[1px]", anim: "animate-streak-a", color: SEC.line, desktopOnly: true },
  { top: "top-[68%]", h: "h-40", blur: "blur-3xl", anim: "animate-streak-b", color: RED.soft, desktopOnly: true },
  { top: "top-[86%]", h: "h-48", blur: "blur-3xl", anim: "animate-streak-c", color: SEC.soft },
];

const join = (...p: Array<string | false | undefined>) => p.filter(Boolean).join(" ");

function Layer({ tone }: { tone: "dark" | "light" }) {
  const dark = tone === "dark";

  return (
    <div
      className={join(
        "absolute inset-0 overflow-hidden transition-opacity duration-[700ms] ease-standard",
        dark
          ? "bg-[radial-gradient(120%_80%_at_50%_-10%,#111827_0%,#05070b_55%)] opacity-0 dark:opacity-100"
          : "bg-[radial-gradient(120%_80%_at_50%_-10%,#ffffff_0%,#eceff6_60%)] opacity-100 dark:opacity-0",
      )}
    >
      {/* Streaks */}
      {streaks.map((s, i) => (
        <div
          key={i}
          className={join(
            "absolute -left-[20%] w-[140%] -rotate-[28deg]",
            s.top,
            s.desktopOnly && "hidden md:block",
          )}
        >
          <div
            className={join(
              "bg-linear-to-r from-transparent to-transparent will-change-transform",
              s.h,
              s.blur,
              s.anim,
              dark ? s.color.dark : s.color.light,
            )}
          />
        </div>
      ))}

      {/* Faint HUD grid, faded toward the edges */}
      <div
        className={join(
          "absolute inset-0 bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]",
          dark
            ? "bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)]"
            : "bg-[linear-gradient(to_right,rgba(15,18,26,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,18,26,0.05)_1px,transparent_1px)]",
        )}
      />

      {/* Vignette */}
      <div
        className={join(
          "absolute inset-0",
          dark
            ? "bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.6)_100%)]"
            : "bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(15,18,26,0.07)_100%)]",
        )}
      />
    </div>
  );
}

export default function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <Layer tone="dark" />
      <Layer tone="light" />
    </div>
  );
}