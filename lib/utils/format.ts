const FA = "fa-IR";

/** Persian digits with tabular alignment, e.g. 1299000 → "۱٬۲۹۹٬۰۰۰". */
export function formatNumber(value: number): string {
  return value.toLocaleString(FA);
}

/** Price label with the currency, e.g. "۱٬۲۹۹٬۰۰۰ تومان". */
export function formatPrice(value: number): string {
  return `${formatNumber(value)} تومان`;
}

/**
 * Zero-padded Persian digits, e.g. 7 → "۰۷". Used by countdown timers so
 * every unit always occupies the same width.
 */
export function formatPaddedNumber(value: number): string {
  return value.toLocaleString(FA, { minimumIntegerDigits: 2 });
}

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  return new Intl.DateTimeFormat(FA, { dateStyle: "medium" }).format(date);
}

export function formatDateTime(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  return new Intl.DateTimeFormat(FA, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

/** Percentage saved vs the original price (rounded, Latin digits). */
export function discountPercent(price: number, compareAtPrice: number): number {
  if (compareAtPrice <= 0) return 0;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}
