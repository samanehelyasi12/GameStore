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

export type NavItem =
  | { kind: "link"; label: string; href: string; match: "exact" | "prefix" | "none" }
  | { kind: "categories"; label: string };

export const navItems: NavItem[] = [
  { kind: "link", label: "خانه", href: "/", match: "exact" },
  { kind: "link", label: "فروشگاه", href: "/games", match: "prefix" },
  { kind: "categories", label: "دسته‌بندی‌ها" },
  { kind: "link", label: "تخفیف‌ها", href: "/games?sale=true", match: "none" },
];

export type { ConsoleId } from "@/lib/data/consoles";
export { consoleItems as consoles, consoleHref } from "@/lib/data/consoles";

export const genres: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "action", label: "اکشن", icon: Zap },
  { id: "horror", label: "ترسناک", icon: Ghost },
  { id: "rpg", label: "نقش‌آفرینی", icon: ScrollText },
  { id: "fighting", label: "مبارزه", icon: Swords },
  { id: "sports", label: "ورزشی", icon: Trophy },
  { id: "multiplayer", label: "چندنفره", icon: Users },
  { id: "adventure", label: "ماجراجویی", icon: Compass },
  { id: "open-world", label: "جهان باز", icon: Globe },
  { id: "racing", label: "مسابقه‌ای", icon: Car },
];

/** Each genre has its own landing page — matches app/categories/[slug]. */
export function categoryHref(genre: string) {
  return `/categories/${genre}`;
}
