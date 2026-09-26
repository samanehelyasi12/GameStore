export type ConditionGrade = "excellent" | "good" | "fair";

export interface UsedConsole {
  id: string;
  name: string;
  brand: "PS5" | "PS4" | "Xbox";
  condition: ConditionGrade;
  conditionScore: number; // درصد سلامت ظاهری از ۱۰۰
  warrantyMonths: number;
  price: number;
  originalPrice: number;
  image: string;
  href: string;
}

export const CONDITION_LABELS: Record<ConditionGrade, { label: string; color: string }> = {
  excellent: { label: "در حد نو", color: "bg-success" },
  good: { label: "خوب", color: "bg-accent-500" },
  fair: { label: "قابل قبول", color: "bg-warning" },
};

/**
 * Put images at: public/images/used-consoles/<id>.webp
 * TODO: replace with API fetch when backend is ready.
 */
export const usedConsoles: UsedConsole[] = [
  {
    id: "used-ps5-1",
    name: "کنسول PS5 Standard - استوک آمریکا",
    brand: "PS5",
    condition: "excellent",
    conditionScore: 95,
    warrantyMonths: 6,
    price: 21900000,
    originalPrice: 28900000,
    image: "/images/used-consoles/used-ps5-1.webp",
    href: "/used-consoles/used-ps5-1",
  },
  {
    id: "used-ps5-2",
    name: "کنسول PS5 Digital - استوک اروپا",
    brand: "PS5",
    condition: "good",
    conditionScore: 85,
    warrantyMonths: 3,
    price: 18500000,
    originalPrice: 25900000,
    image: "/images/used-consoles/used-ps5-2.webp",
    href: "/used-consoles/used-ps5-2",
  },
  {
    id: "used-ps4-1",
    name: "کنسول PS4 Pro - استوک ژاپن",
    brand: "PS4",
    condition: "good",
    conditionScore: 82,
    warrantyMonths: 3,
    price: 9900000,
    originalPrice: 16900000,
    image: "/images/used-consoles/used-ps4-1.webp",
    href: "/used-consoles/used-ps4-1",
  },
  {
    id: "used-xbox-1",
    name: "کنسول Xbox Series X - استوک آمریکا",
    brand: "Xbox",
    condition: "excellent",
    conditionScore: 92,
    warrantyMonths: 6,
    price: 22900000,
    originalPrice: 29900000,
    image: "/images/used-consoles/used-xbox-1.webp",
    href: "/used-consoles/used-xbox-1",
  },
  {
    id: "used-ps4-2",
    name: "کنسول PS4 Slim - استوک کارکرده",
    brand: "PS4",
    condition: "fair",
    conditionScore: 68,
    warrantyMonths: 1,
    price: 7200000,
    originalPrice: 12900000,
    image: "/images/used-consoles/used-ps4-2.webp",
    href: "/used-consoles/used-ps4-2",
  },
  {
    id: "used-xbox-2",
    name: "کنسول Xbox Series S - استوک اروپا",
    brand: "Xbox",
    condition: "good",
    conditionScore: 88,
    warrantyMonths: 3,
    price: 13900000,
    originalPrice: 18900000,
    image: "/images/used-consoles/used-xbox-2.webp",
    href: "/used-consoles/used-xbox-2",
  },
];

export function formatToman(price: number) {
  return `${price.toLocaleString("fa-IR")} تومان`;
}

export function discountPercent(price: number, originalPrice: number) {
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}