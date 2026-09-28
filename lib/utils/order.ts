/**
 * Order-domain helpers.
 *
 * These used to live in `lib/utils/format.ts`, but they generate order numbers
 * rather than format anything for display. Moved verbatim — same output.
 */

/** Order number, e.g. "GS-1405-4821". */
export function makeOrderId(): string {
  const now = new Date();
  const jalaliYear = toJalaliYear(now);
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `GS-${jalaliYear}-${rand}`;
}

/**
 * Approximate Solar Hijri year — enough for a human-readable order number.
 * Nowruz falls on 20/21 March, so the year rolls over there.
 */
function toJalaliYear(date: Date): number {
  const gy = date.getFullYear();
  const month = date.getMonth(); // 0-based
  const day = date.getDate();
  const afterNowruz = month > 2 || (month === 2 && day >= 20);
  return gy - (afterNowruz ? 621 : 622);
}
