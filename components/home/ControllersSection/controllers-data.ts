export type ControllerPlatform = "ps5" | "ps4" | "xbox" | "pc";

export interface ControllerProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  href: string;
}

export interface ControllerTab {
  id: ControllerPlatform;
  label: string;
}

export const CONTROLLER_TABS: ControllerTab[] = [
  { id: "ps5", label: "PS5" },
  { id: "ps4", label: "PS4" },
  { id: "xbox", label: "Xbox" },
  { id: "pc", label: "PC" },
];

/**
 * Put images at: public/images/controllers/<id>.webp
 * TODO: replace with API fetch by platform when backend is ready.
 */
export const CONTROLLER_PRODUCTS: Record<ControllerPlatform, ControllerProduct[]> = {
  ps5: [
    { id: "dualsense", name: "دسته PS5 DualSense", price: 3200000, image: "/images/controllers/dualsense-white.webp", href: "/controllers#dualsense" },
    { id: "dualsense-white", name: "دسته PS5 DualSense سفید", price: 3350000, image: "/images/controllers/dualsense-white.webp", href: "/controllers#dualsense-white" },
    { id: "dualsense-spadger", name: "دسته PS5 DualSense اسپایدرمن", price: 3600000, image: "/images/controllers/dualsense-white.webp", href: "/controllers#dualsense-spadger" },
    { id: "dualsense-edge", name: "دسته PS5 DualSense Edge", price: 7900000, image: "/images/controllers/dualsense-white.webp", href: "/controllers#dualsense-edge" },
  ],
  ps4: [
    { id: "dualshock4", name: "دسته PS4 DualShock 4", price: 1890000, image: "/images/controllers/dualshock4.webp", href: "/controllers#dualshock4" },
    { id: "dualshock4-white", name: "دسته PS4 DualShock 4 سفید", price: 1950000, image: "/images/controllers/dualshock4.webp", href: "/controllers#dualshock4-white" },
    { id: "dualshock4-pro", name: "دسته PS4 DualShock 4 Pro", price: 3400000, image: "/images/controllers/dualshock4.webp", href: "/controllers#dualshock4-pro" },
  ],
  xbox: [
    { id: "xbox-wireless", name: "دسته Xbox Wireless", price: 2900000, image: "/images/controllers/xbox-wireless.webp", href: "/controllers#xbox-wireless" },
    { id: "xbox-series-s", name: "دسته Xbox Series S", price: 2950000, image: "/images/controllers/xbox-wireless.webp", href: "/controllers#xbox-series-s" },
    { id: "xbox-elite-2", name: "دسته Xbox Elite Series 2", price: 6900000, image: "/images/controllers/xbox-wireless.webp", href: "/controllers#xbox-elite-2" },
  ],
  pc: [
    { id: "xbox-pc", name: "دسته Xbox سازگار با PC", price: 2850000, image: "/images/controllers/steelseries.webp", href: "/controllers#xbox-pc" },
    { id: "logitech-g710", name: "دسته Logitech G710", price: 4100000, image: "/images/controllers/steelseries.webp", href: "/controllers#logitech-g710" },
    { id: "steelseries", name: "دسته SteelSeries Apex 3", price: 5600000, image: "/images/controllers/steelseries.webp", href: "/controllers#steelseries" },
  ],
};

export const ALL_CONTROLLER_PRODUCTS: ControllerProduct[] = CONTROLLER_TABS.flatMap(
  (tab) => CONTROLLER_PRODUCTS[tab.id],
);
