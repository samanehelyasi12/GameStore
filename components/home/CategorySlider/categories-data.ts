import { categoryImage, genreLabel } from "@/lib/data/genres";

/**
 * Genre ids in the order the slider renders them. Labels and image paths are
 * derived from the single source of truth in lib/data/genres, so the two
 * files can never drift apart.
 */
export type CategoryItem = { id: string; label: string; image: string };

const CATEGORY_IDS = [
  "adventure",
  "racing",
  "action",
  "rpg",
  "horror",
  "sports",
  "fighting",
  "multiplayer",
  "open-world",
] as const;

export const categoryItems: CategoryItem[] = CATEGORY_IDS.map((id) => ({
  id,
  label: genreLabel(id),
  image: categoryImage(id),
}));
