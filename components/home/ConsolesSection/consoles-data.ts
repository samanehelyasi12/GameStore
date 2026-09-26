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
    { id: "ps5-standard", name: "کنسول PS5 Standard", price: 28900000, image: "/images/consoles/ps5-standard.webp", href: "/consoles/ps5-standard" },
    { id: "ps5-digital", name: "کنسول PS5 Digital Edition", price: 25900000, image: "/images/consoles/ps5-digital.webp", href: "/consoles/ps5-digital" },
    { id: "ps5-pro", name: "کنسول PS5 Pro", price: 39900000, image: "/images/consoles/ps5-pro.webp", href: "/consoles/ps5-pro" },
    { id: "ps5-slim", name: "کنسول PS5 Slim", price: 27500000, image: "/images/consoles/ps5-slim.webp", href: "/consoles/ps5-slim" },
    { id: "ps5-dualsense", name: "دسته PS5 DualSense", price: 3200000, image: "/images/consoles/ps5-dualsense.webp", href: "/consoles/ps5-dualsense" },
    { id: "ps5-bundle-spiderman", name: "باندل PS5 اسپایدرمن ۲", price: 32900000, image: "/images/consoles/ps5-bundle-spiderman.webp", href: "/consoles/ps5-bundle-spiderman" },
  ],
  ps4: [
    { id: "ps4-slim", name: "کنسول PS4 Slim", price: 12900000, image: "/images/consoles/ps4-slim.webp", href: "/consoles/ps4-slim" },
    { id: "ps4-pro", name: "کنسول PS4 Pro", price: 16900000, image: "/images/consoles/ps4-pro.webp", href: "/consoles/ps4-pro" },
    { id: "ps4-dualshock", name: "دسته PS4 DualShock 4", price: 1890000, image: "/images/consoles/ps4-dualshock.webp", href: "/consoles/ps4-dualshock" },
    { id: "ps4-bundle-fifa", name: "باندل PS4 فیفا ۲۳", price: 14500000, image: "/images/consoles/ps4-bundle-fifa.webp", href: "/consoles/ps4-bundle-fifa" },
  ],
  xbox: [
    { id: "xbox-series-x", name: "کنسول Xbox Series X", price: 29900000, image: "/images/consoles/xbox-series-x.webp", href: "/consoles/xbox-series-x" },
    { id: "xbox-series-s", name: "کنسول Xbox Series S", price: 18900000, image: "/images/consoles/xbox-series-s.webp", href: "/consoles/xbox-series-s" },
    { id: "xbox-controller", name: "دسته Xbox Wireless", price: 2900000, image: "/images/consoles/xbox-controller.webp", href: "/consoles/xbox-controller" },
    { id: "xbox-bundle-forza", name: "باندل Xbox فورتزا ۵", price: 32900000, image: "/images/consoles/xbox-bundle-forza.webp", href: "/consoles/xbox-bundle-forza" },
    { id: "xbox-elite", name: "دسته Xbox Elite Series 2", price: 6900000, image: "/images/consoles/xbox-elite.webp", href: "/consoles/xbox-elite" },
  ],
};