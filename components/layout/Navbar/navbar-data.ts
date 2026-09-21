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

export type ConsoleId = "ps5" | "ps4" | "xbox";

export const consoles: { id: ConsoleId; label: string }[] = [
  { id: "ps5", label: "PlayStation 5" },
  { id: "ps4", label: "PlayStation 4" },
  { id: "xbox", label: "Xbox" },
];

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

/** Adjust to match how /games reads its filters. */
export function gamesHref(console: ConsoleId, genre?: string) {
  const params = new URLSearchParams({ console });
  if (genre) params.set("genre", genre);
  return `/games?${params.toString()}`;
}
