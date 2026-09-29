import type { FulfillmentStage, Order } from "@/lib/types/order";
import { formatDateTime } from "@/lib/utils";

/**
 * =====================================================================
 * Fulfilment — «جریان آماده‌سازی تا ارسال»
 * ---------------------------------------------------------------------
 * وضعیت پرداخت (`OrderStatus`) فقط نتیجه‌ی تراکنش را نشان می‌دهد. مرحله‌ی
 * ارسال یک مسیر جداگانه است: پردازش ← آماده‌سازی ← ارسال ← تحویل.
 * =====================================================================
 */

export type StageMeta = {
  id: FulfillmentStage;
  label: string;
  description: string;
};

export const FULFILLMENT_STAGES: StageMeta[] = [
  { id: "processing", label: "پردازش و تأیید", description: "پرداخت شما تأیید و سفارش در سیستم ثبت شد." },
  { id: "preparing", label: "آماده‌سازی", description: "اقلام سفارش در انبار در حال آماده‌سازی و بسته‌بندی است." },
  { id: "shipped", label: "ارسال شد", description: "بسته تحویل شرکت حمل شد و کد رهگیری صادر گردید." },
  { id: "delivered", label: "تحویل داده شد", description: "سفارش به دست شما رسید. از خریدتان لذت ببرید!" },
];

const STAGE_ORDER: FulfillmentStage[] = ["processing", "preparing", "shipped", "delivered"];

export function stageIndex(stage: FulfillmentStage) {
  return STAGE_ORDER.indexOf(stage);
}

/** Demo-only: how long each stage takes once the payment succeeded. */
const STAGE_DURATION_MS: Record<FulfillmentStage, number> = {
  processing: 20 * 60 * 1000, //  20 minutes
  preparing: 4 * 60 * 60 * 1000, //   4 hours
  shipped: 2 * 24 * 60 * 60 * 1000, // 2 days
  delivered: 3 * 24 * 60 * 60 * 1000, // 3 days
};

/**
 * Derives the fulfilment stage from the order's own timeline.
 *
 * Real orders (which carry an explicit `fulfillmentStage`) are returned
 * untouched. Everything else is *simulated from elapsed time*, so the demo
 * can actually show a moving progress bar from «آماده‌سازی» to «ارسال»
 * without a backend. TODO(backend): delete this and read the API value.
 */
export function resolveStage(order: Order, now: number = Date.now()): FulfillmentStage {
  if (order.fulfillmentStage) return order.fulfillmentStage;

  // An unpaid / dead order never advances.
  if (order.status !== "paid") return "processing";

  const created = new Date(order.createdAt).getTime();
  if (Number.isNaN(created)) return "processing";

  let elapsed = now - created;
  for (const stage of STAGE_ORDER) {
    if (elapsed < STAGE_DURATION_MS[stage]) return stage;
    elapsed -= STAGE_DURATION_MS[stage];
  }
  return "delivered";
}

/** True while the order is still moving through the pipeline. */
export function isInFlight(order: Order, now: number = Date.now()) {
  return order.status === "paid" && resolveStage(order, now) !== "delivered";
}

/**
 * The timestamp a stage was reached.
 *
 * `shippedAt` / `deliveredAt` win when the order actually carries them —
 * the earlier stages are always derived from the order timeline, so the
 * progress bar never shows the same time for several steps.
 */
export function stageTimestamp(
  order: Order,
  stage: FulfillmentStage,
  now: number = Date.now(),
): string | null {
  if (order.status !== "paid") return null;

  if (stage === "shipped" && order.shippedAt) return order.shippedAt;
  if (stage === "delivered" && order.deliveredAt) return order.deliveredAt;

  const created = new Date(order.createdAt).getTime();
  if (Number.isNaN(created)) return null;

  // Walk the timeline, accumulating each stage's duration.
  let elapsed = now - created;
  let cursor = created;

  for (const item of STAGE_ORDER) {
    if (elapsed < STAGE_DURATION_MS[item]) return null; // not reached yet
    if (item === stage) return new Date(cursor).toISOString();
    elapsed -= STAGE_DURATION_MS[item];
    cursor += STAGE_DURATION_MS[item];
  }
  return null;
}

/** Human ETA for the next stage, e.g. "تا ۲ روز دیگر". */
export function nextStageEta(order: Order, now: number = Date.now()): string | null {
  if (order.status !== "paid") return null;

  const current = resolveStage(order, now);
  if (current === "delivered") return null;

  const next = STAGE_ORDER[stageIndex(current) + 1];
  if (!next) return null;

  const remaining = STAGE_ORDER.slice(0, stageIndex(current) + 1).reduce(
    (sum, stage) => sum + STAGE_DURATION_MS[stage],
    0,
  );
  const target = new Date(order.createdAt).getTime() + remaining;
  const diff = target - now;
  if (Number.isNaN(diff) || diff <= 0) return null;

  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));

  if (days > 0) return `حدود ${days.toLocaleString("fa-IR")} روز دیگر`;
  if (hours > 0) return `حدود ${hours.toLocaleString("fa-IR")} ساعت دیگر`;
  return "کمتر از یک ساعت دیگر";
}

/** Label of the stage's reach time, formatted for display. */
export function formatStageTime(order: Order, stage: FulfillmentStage, now: number = Date.now()) {
  const iso = stageTimestamp(order, stage, now);
  return iso ? formatDateTime(iso) : null;
}
