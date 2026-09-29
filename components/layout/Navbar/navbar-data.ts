import {
  Car,
  Compass,
  Ghost,
  Globe,
  ScrollText,
  Swords,
  Trophy,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { genreLabel } from "@/lib/data/genres";

export type NavItem =
  | { kind: "link"; label: string; href: string; match: "exact" | "prefix" | "none" }
  | { kind: "categories"; label: string };

export const navItems: NavItem[] = [
  { kind: "link", label: "خانه", href: "/", match: "exact" },
  { kind: "link", label: "فروشگاه", href: "/games", match: "prefix" },
  { kind: "categories", label: "دسته‌بندی‌ها" },
  { kind: "link", label: "دسته‌های بازی", href: "/controllers", match: "prefix" },
  { kind: "link", label: "تخفیف‌ها", href: "/discounts", match: "prefix" },
];

export type { ConsoleId } from "@/lib/data/consoles";
export { consoleItems as consoles, consoleHref } from "@/lib/data/consoles";

/** `categoryHref` now lives with the rest of the genre helpers. */
export { categoryHref } from "@/lib/data/genres";

/**
 * Genre menu, in the order the navbar renders it. Only the icon is declared
 * here; ids and Persian labels come from the single source of truth so this
 * list cannot drift from the catalogue.
 */
const GENRE_ICONS: { id: string; icon: LucideIcon }[] = [
  { id: "action", icon: Zap },
  { id: "horror", icon: Ghost },
  { id: "rpg", icon: ScrollText },
  { id: "fighting", icon: Swords },
  { id: "sports", icon: Trophy },
  { id: "multiplayer", icon: Users },
  { id: "adventure", icon: Compass },
  { id: "open-world", icon: Globe },
  { id: "racing", icon: Car },
];

export const genres: { id: string; label: string; icon: LucideIcon }[] =
  GENRE_ICONS.map(({ id, icon }) => ({ id, label: genreLabel(id), icon }));
