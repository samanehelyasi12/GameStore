import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, Package } from "lucide-react";

export type AccountTab = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

/** Single source of truth for the account panel's navigation. */
export const ACCOUNT_TABS: AccountTab[] = [
  {
    href: "/account",
    label: "پیشخوان",
    description: "خلاصه‌ی خریدها و آمار شما",
    icon: LayoutDashboard,
  },
  {
    href: "/account/orders",
    label: "سفارش‌های من",
    description: "پیگیری جریان آماده‌سازی تا ارسال",
    icon: Package,
  },
];
