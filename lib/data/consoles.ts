export type ConsoleId = "ps5" | "ps4" | "xbox";

export type ConsoleItem = {
  id: ConsoleId;
  label: string;
  shortLabel: string;
  tagline: string;
};

export const consoleItems: ConsoleItem[] = [
  { id: "ps5", label: "PlayStation 5", shortLabel: "PS5", tagline: "نسل جدید بازی، بدون توقف" },
  { id: "ps4", label: "PlayStation 4", shortLabel: "PS4", tagline: "کتابخونه‌ی عظیم بازی با بهترین قیمت" },
  { id: "xbox", label: "Xbox Series", shortLabel: "Xbox", tagline: "قدرت و سرعت در کنار Game Pass" },
];

export function consoleHref(id: ConsoleId | string) {
  return `/consoles/${id}`;
}
