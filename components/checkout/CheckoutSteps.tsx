import { Check } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { cx } from "@/components/layout/Navbar/navbar-styles";

export type StepKey = "cart" | "checkout" | "result";

const steps: { key: StepKey; label: string }[] = [
  { key: "cart", label: "سبد خرید" },
  { key: "checkout", label: "اطلاعات و پرداخت" },
  { key: "result", label: "تأیید نهایی" },
];

const order: StepKey[] = ["cart", "checkout", "result"];

/** Horizontal RTL stepper for the cart → checkout → result flow. */
export default function CheckoutSteps({ current }: { current: StepKey }) {
  const currentIndex = order.indexOf(current);

  return (
    <ol className="flex flex-wrap items-center gap-2 text-xs sm:gap-3">
      {steps.map((step, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;

        return (
          <li key={step.key} className="flex items-center gap-2 sm:gap-3">
            <span
              aria-current={active ? "step" : undefined}
              className={cx(
                "flex items-center gap-2 rounded-full border px-3 py-1.5 font-semibold transition-colors duration-fast",
                active && "border-red-500 bg-red-subtle text-red-400",
                done && "border-success/40 bg-success/10 text-success",
                !active && !done && "border-border-subtle text-text-tertiary",
              )}
            >
              <span
                className={cx(
                  "grid size-5 place-items-center rounded-full text-[11px] tabular-nums",
                  active && "bg-red-500 text-white",
                  done && "bg-success text-white",
                  !active && !done && "bg-surface-raised text-text-tertiary",
                )}
              >
                {done ? <Check className="size-3" aria-hidden /> : formatNumber(i + 1)}
              </span>
              {step.label}
            </span>

            {i < steps.length - 1 ? (
              <span aria-hidden className="h-px w-4 bg-border-subtle sm:w-8" />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
