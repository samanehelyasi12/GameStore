"use client";

import { Check, Clock, PackageCheck, Truck, PackageSearch } from "lucide-react";
import type { FulfillmentStage, Order } from "@/lib/types/order";
import {
  FULFILLMENT_STAGES,
  formatStageTime,
  nextStageEta,
  resolveStage,
  stageIndex,
} from "@/lib/utils/fulfillment";
import { cx } from "@/components/layout/Navbar/navbar-styles";

const STAGE_ICON: Record<FulfillmentStage, typeof Check> = {
  processing: Clock,
  preparing: PackageSearch,
  shipped: Truck,
  delivered: PackageCheck,
};

const card = cx(
  "rounded-xl border border-border-subtle bg-surface p-5",
  "backdrop-blur-xl",
);

function dot(state: "done" | "current" | "todo") {
  if (state === "done") {
    return cx(
      "grid size-9 place-items-center rounded-full bg-success text-white",
      "shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-success)_18%,transparent)]",
    );
  }
  if (state === "current") {
    return cx(
      "grid size-9 place-items-center rounded-full bg-red-500 text-white",
      "shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-red-500)_22%,transparent)]",
    );
  }
  return "grid size-9 place-items-center rounded-full border border-border-subtle bg-surface-raised text-text-tertiary";
}

/**
 * Vertical (mobile) / horizontal (desktop) progress bar for a paid order:
 * پردازش ← آماده‌سازی ← ارسال ← تحویل. Completed steps are filled, the
 * current one is highlighted, the rest stay muted.
 */
export default function OrderProgress({
  order,
  now = Date.now(),
}: {
  order: Order;
  now?: number;
}) {
  const current = resolveStage(order, now);
  const currentIndex = stageIndex(current);
  const eta = nextStageEta(order, now);

  return (
    <section className={cx(card, "mb-5")}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-base font-bold text-text-primary">
            وضعیت ارسال
          </h2>
          <p className="mt-1 text-xs text-text-tertiary">
            {order.trackingCode ? `کد رهگیری: ${order.trackingCode}` : "هنوز کد رهگیری صادر نشده"}
          </p>
        </div>

        {order.status === "paid" && eta ? (
          <span className="rounded-full border border-accent-500/40 bg-accent-subtle px-3 py-1.5 text-xs font-bold text-accent-400">
            مرحله‌ی بعد: {eta}
          </span>
        ) : null}
      </div>

      <ol className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-0">
        {FULFILLMENT_STAGES.map((stage, index) => {
          const done = index < currentIndex;
          const active = index === currentIndex;
          const time = done || active ? formatStageTime(order, stage.id, now) : null;
          const Icon = STAGE_ICON[stage.id];
          const state = done ? "done" : active ? "current" : "todo";

          return (
            <li
              key={stage.id}
              className="flex flex-1 gap-3 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
            >
              {/* نشانه + خط رابط */}
              <div className="flex flex-col items-center lg:flex-row">
                <span className={dot(state)}>
                  {done ? (
                    <Check className="size-4" aria-hidden />
                  ) : (
                    <Icon className="size-4" aria-hidden />
                  )}
                </span>

                {index < FULFILLMENT_STAGES.length - 1 ? (
                  <>
                    {/* عمودی در موبایل */}
                    <span
                      aria-hidden
                      className={cx(
                        "my-1 w-0.5 flex-1 lg:hidden",
                        index < currentIndex ? "bg-success" : "bg-border-subtle",
                      )}
                    />
                    {/* افقی در دسکتاپ */}
                    <span
                      aria-hidden
                      className={cx(
                        "mx-2 hidden h-0.5 w-10 lg:block",
                        index < currentIndex ? "bg-success" : "bg-border-subtle",
                      )}
                    />
                  </>
                ) : null}
              </div>

              <div className="lg:mt-3">
                <p
                  className={cx(
                    "text-sm font-bold",
                    done
                      ? "text-success"
                      : active
                        ? "text-text-primary"
                        : "text-text-tertiary",
                  )}
                >
                  {stage.label}
                </p>
                <p className="mt-1 max-w-[220px] text-xs text-text-tertiary">
                  {time ?? stage.description}
                </p>
                {active && time ? (
                  <p className="mt-1 text-xs font-semibold text-red-400">مرحله‌ی فعلی</p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
