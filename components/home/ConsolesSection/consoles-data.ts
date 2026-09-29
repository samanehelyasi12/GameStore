export type ConsoleBrand = "ps5" | "ps4" | "xbox";

export interface ConsoleProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  href: string;
}

export const CONSOLE_TABS: { id: ConsoleBrand; label: string }[] = [
  { id: "ps5", label: "PS5" },
  { id: "ps4", label: "PS4" },
  { id: "xbox", label: "Xbox" },
];

/**
 * Put images at: public/images/consoles/<id>.webp
 * TODO: replace with API fetch by brand when backend is ready.
 */
export const CONSOLE_PRODUCTS: Record<ConsoleBrand, ConsoleProduct[]> = {
  ps5: [
    { id: "ps5-standard", name: "کنسول PS5 Standard", price: 28900000, image: "/images/consoles/ps5_stardarn.webp", href: "/consoles/ps5-standard" },
    { id: "ps5-digital", name: "کنسول PS5 Digital Edition", price: 25900000, image: "/images/consoles/ps5_digital.webp", href: "/consoles/ps5-digital" },
    { id: "ps5-pro", name: "کنسول PS5 Pro", price: 39900000, image: "/images/consoles/ps5_digital.webp", href: "/consoles/ps5-pro" },
  ],
  ps4: [
    { id: "ps4-slim", name: "کنسول PS4 Slim", price: 12900000, image: "/images/consoles/ps4_slim.webp", href: "/consoles/ps4-slim" },
    { id: "ps4-pro", name: "کنسول PS4 Pro", price: 16900000, image: "/images/consoles/ps4_pro.webp", href: "/consoles/ps4-pro" },
  ],
  xbox: [
    { id: "xbox-series-x", name: "کنسول Xbox Series X", price: 29900000, image: "/images/consoles/xbox_x.webp", href: "/consoles/xbox-series-x" },
    { id: "xbox-series-s", name: "کنسول Xbox Series S", price: 18900000, image: "/images/consoles/xbox_s.webp", href: "/consoles/xbox-series-s" },
  ],
};

/** Every console product across all brands, flattened. */
export const ALL_CONSOLE_PRODUCTS: ConsoleProduct[] = CONSOLE_TABS.flatMap(
  (tab) => CONSOLE_PRODUCTS[tab.id],
);

export function findConsoleProduct(id: string) {
  return ALL_CONSOLE_PRODUCTS.find((p) => p.id === id);
}
