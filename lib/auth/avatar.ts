/**
 * =====================================================================
 * Avatar — «آواتار خودکار»
 * ---------------------------------------------------------------------
 * کاربر عکسی آپلود نمی‌کند؛ آواتار از روی نام/ایمیل او به‌صورت تصویر
 * ساخته‌شده از یک سرویس خارجی ساخته می‌شود.
 *
 * تصاویر از کجا می‌آیند؟
 * ─────────────────────
 * ۱) آواتار کاربر  : آدرس ساخته‌شده توسط DiceBear (این فایل) — فایلی در
 *                   پروژه نیست و چیزی برای اضافه‌کردن وجود ندارد.
 * ۲) اگر خواستی آواتار واقعی باشد، عکس‌ها را در این مسیر بگذار:
 *       public/images/avatars/<userId>.webp
 *    و در `avatarUrl` همین مسیر را برگردان. (الان این پوشه وجود ندارد.)
 *
 * اگر اینترنت نبود یا سرویس خطا داد، `Avatar` خودش به حروف اول نام
 * برمی‌گردد، پس آواتار هیچ‌وقت خالی نمی‌ماند.
 * =====================================================================
 */

const DICEBEAR_BASE = "https://api.dicebear.com/9.x";

/** Style set that matches the site's dark/cyber identity. */
export const AVATAR_STYLE = "notionists-neutral";

/** Deterministic avatar URL for a user — same seed always yields the same face. */
export function avatarUrl(seed: string): string {
  const clean = encodeURIComponent(seed.trim().toLowerCase());
  return `${DICEBEAR_BASE}/${AVATAR_STYLE}/svg?seed=${clean}&backgroundType=gradientLinear`;
}

/**
 * First letters of the name for the offline fallback, e.g.
 * "آرش محمدی" → "آم" · "Ali Reza" → "AR" · "sara" → "sa".
 */
export function initials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2);
  return `${words[0][0]}${words[1][0]}`;
}

/**
 * One of six brand-safe colours, picked from the name so a user always gets
 * the same avatar tint. Index comes from the string, not a random source.
 */
const AVATAR_TINTS = [
  "bg-red-500",
  "bg-accent-500",
  "bg-success",
  "bg-warning",
  "bg-purple-500",
  "bg-gold-500",
] as const;

export function avatarTint(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return AVATAR_TINTS[hash % AVATAR_TINTS.length];
}
