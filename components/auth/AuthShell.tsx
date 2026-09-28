import type { ReactNode } from "react";
import { Crown, Headphones, ShieldCheck, Zap } from "lucide-react";
import { CLIP, GLOW, cx } from "@/components/layout/Navbar/navbar-styles";

type AuthShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  /** Small line under the form, e.g. "no account? register". */
  footer?: ReactNode;
};

const features = [
  { icon: Zap, text: "تحویل فوری و بدون انتظار" },
  { icon: ShieldCheck, text: "پرداخت امن و مطمئن" },
  { icon: Headphones, text: "پشتیبانی ۲۴ ساعته" },
];

/**
 * Shared auth layout (login / register): angled HUD frame, form on the
 * right (RTL first column), decorative brand panel on the left (desktop).
 * The brand panel stays dark in both themes, like the site's media surfaces.
 */
export default function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className={cx("mx-auto max-w-[1000px]", GLOW.frame)}>
      <div className={cx(CLIP.lg, "bg-linear-to-l from-red-600/80 via-red-500/25 to-red-600/80 p-px")}>
        <div className={cx(CLIP.lg, "grid overflow-hidden bg-canvas/85 backdrop-blur-xl lg:grid-cols-2")}>
          {/* Form side */}
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <h1 className="font-display text-h2 font-bold text-text-primary">{title}</h1>
            {subtitle ? (
              <p className="mt-2 text-sm text-text-secondary">{subtitle}</p>
            ) : null}

            <div className="mt-8">{children}</div>

            {footer ? (
              <div className="mt-6 border-t border-border-subtle pt-5 text-center text-sm text-text-secondary">
                {footer}
              </div>
            ) : null}
          </div>

          {/* Brand side (desktop only) */}
          <aside
            className="relative hidden flex-col justify-between overflow-hidden p-10 text-white lg:flex"
            style={{ backgroundColor: "#07090e" }}
          >
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(90% 70% at 15% 0%, rgba(229,72,77,0.34), transparent 60%), radial-gradient(80% 70% at 100% 100%, rgba(130,87,229,0.30), transparent 60%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-70"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
                maskImage: "radial-gradient(ellipse at center, black 30%, transparent 78%)",
                WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 78%)",
              }}
            />
            <span
              aria-hidden
              className="absolute inset-y-8 start-0 w-px bg-linear-to-b from-transparent via-red-500 to-transparent shadow-[0_0_10px_var(--color-red-500)]"
            />

            <div className="relative flex items-center gap-2">
              <Crown className="size-5 text-red-500" aria-hidden />
              <span
                dir="ltr"
                className="-skew-x-6 font-display text-2xl font-black uppercase tracking-tight"
              >
                GAME <span className="text-red-500">STORE</span>
              </span>
            </div>

            <div className="relative">
              <p className="text-h2 font-bold leading-tight">
                به دنیای بازی‌های <span className="text-red-500">واقعی</span> خوش آمدید
              </p>
              <p className="mt-3 max-w-xs text-sm text-white/70">
                بازی‌های محبوب PS5، PS4 و Xbox با بهترین قیمت، همین‌جا.
              </p>
            </div>

            <ul className="relative space-y-3">
              {features.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm text-white/80">
                  <span className="grid size-9 place-items-center rounded-md border border-red-500/40 bg-red-500/10 text-red-400">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}
