/**
 * Genre ids match navbar-data.ts genres — keep them in sync.
 * Put images at: public/images/categories/<id>.png
 */
export type CategoryItem = { id: string; label: string; image: string };

export const categoryItems: CategoryItem[] = [
  { id: "adventure", label: "ماجراجویی", image: "/images/categories/adventure.webp" },
  { id: "racing", label: "مسابقه‌ای", image: "/images/categories/racing.webp" },
  { id: "action", label: "اکشن", image: "/images/categories/action.webp" },
  { id: "rpg", label: "نقش‌آفرینی", image: "/images/categories/rpg.webp" },
  { id: "horror", label: "ترسناک", image: "/images/categories/horror.webp" },
  { id: "sports", label: "ورزشی", image: "/images/categories/sports.webp" },
  { id: "fighting", label: "مبارزه", image: "/images/categories/fighting.webp" },
  { id: "multiplayer", label: "چندنفره", image: "/images/categories/multiplayer.webp" },
  { id: "open-world", label: "جهان باز", image: "/images/categories/open-world.webp" },
];

/** Each category has its own page at /categories/[slug]. */
export function categoryHref(id: string) {
  return `/categories/${id}`;
}