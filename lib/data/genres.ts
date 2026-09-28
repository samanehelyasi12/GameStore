/**
 * Single source of truth for genres.
 *
 * The id → Persian label mapping used to be written three times: in the navbar
 * genre list, in the category-slider data and in the product catalogue. Only
 * the mapping and the landing-page helper are centralised here — each UI keeps
 * its own list so the rendered *order* stays exactly as it was.
 */

/**
 * Canonical genre labels keyed by genre id.
 *
 * `shooting` has no landing page (it is referenced by catalogue entries only),
 * so it keeps a label here without appearing in any genre menu.
 */
export const genreLabels: Record<string, string> = {
  action: "اکشن",
  horror: "ترسناک",
  rpg: "نقش‌آفرینی",
  fighting: "مبارزه",
  sports: "ورزشی",
  multiplayer: "چندنفره",
  adventure: "ماجراجویی",
  "open-world": "جهان باز",
  racing: "مسابقه‌ای",
  shooting: "تیراندازی",
};

/** Label for a genre id, falling back to the raw id (as the UI always has). */
export function genreLabel(id: string): string {
  return genreLabels[id] ?? id;
}

/** Each genre has its own landing page at /categories/[slug]. */
export function categoryHref(id: string): string {
  return `/categories/${id}`;
}

/** Card artwork for a genre lives at public/images/categories/<id>.webp. */
export function categoryImage(id: string): string {
  return `/images/categories/${id}.webp`;
}
