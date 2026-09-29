import type { FulfillmentStage, Order, OrderStatus, PaymentMethod } from "@/lib/types/order";
import { products } from "@/lib/data/products";
import type { CartItem } from "@/lib/types/cart";

/**
 * =====================================================================
 * Demo orders — «سفارش‌های نمونه»
 * ---------------------------------------------------------------------
 * بک‌اند وجود ندارد و سفارش‌ها فقط در localStorage همان مرورگر ذخیره
 * می‌شوند. برای اینکه پنل کاربری از ابتدا قابل بررسی باشد، چند سفارش
 * نمونه با وضعیت‌های مختلف اینجا تعریف شده است.
 *
 * این‌ها فقط وقتی نمایش داده می‌شوند که کاربر سفارش واقعی نداشته باشد،
 * و همیشه با برچسب «نمونه» مشخص هستند.
 * TODO(backend): این فایل را کامل حذف کنید و از API بخوانید.
 * =====================================================================
 */

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

const CUSTOMER = {
  name: "آرش محمدی",
  email: "arash@example.com",
  phone: "09121234567",
  province: "تهران",
  city: "تهران",
  houseNumber: "۱۲",
  address: "خیابان ولی‌عصر، کوچه بهار، پلاک ۲۴",
  postalCode: "1599912345",
  country: "ایران",
};

function toItem(productId: string, quantity: number): CartItem {
  const product = products.find((p) => p.id === productId);
  if (!product) throw new Error(`Unknown demo product: ${productId}`);

  return {
    id: product.id,
    slug: product.slug,
    title: product.title,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    coverImage: product.coverImage,
    href: `/games/${product.slug}`,
    quantity,
  };
}

function buildOrder({
  id,
  itemSpecs,
  hoursAgo,
  status,
  stage,
  paymentMethod,
  refId,
  trackingCode,
}: {
  id: string;
  itemSpecs: Array<[string, number]>;
  hoursAgo: number;
  status: OrderStatus;
  stage?: FulfillmentStage;
  paymentMethod: PaymentMethod;
  refId?: string;
  trackingCode?: string;
}): Order {
  const items = itemSpecs.map(([productId, quantity]) => toItem(productId, quantity));

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = items.reduce(
    (sum, item) =>
      sum + (item.compareAtPrice ? (item.compareAtPrice - item.price) * item.quantity : 0),
    0,
  );

  const createdAt = new Date(Date.now() - hoursAgo * HOUR).toISOString();
  const shippedAt = stage && stageIndexAtLeast(stage, "shipped")
    ? new Date(Date.now() - Math.max(1, hoursAgo - 30) * HOUR).toISOString()
    : null;
  const deliveredAt = stage === "delivered"
    ? new Date(Date.now() - Math.max(1, hoursAgo - 54) * HOUR).toISOString()
    : null;

  return {
    id,
    items,
    subtotal,
    discount,
    total: subtotal - discount,
    status,
    paymentMethod,
    customer: CUSTOMER,
    createdAt,
    refId: refId ?? null,
    fulfillmentStage: stage,
    shippedAt,
    deliveredAt,
    trackingCode: trackingCode ?? null,
  };
}

function stageIndexAtLeast(stage: FulfillmentStage, target: FulfillmentStage) {
  const order: FulfillmentStage[] = ["processing", "preparing", "shipped", "delivered"];
  return order.indexOf(stage) >= order.indexOf(target);
}

export const DEMO_ORDERS: Order[] = [
  buildOrder({
    id: "GS-1404-2841",
    itemSpecs: [["elden-ring", 1]],
    hoursAgo: 30,
    status: "paid",
    stage: "shipped",
    paymentMethod: "zarinpal",
    refId: "7745129034",
    trackingCode: "بسته پیشتاز ۸۴۵۶۷۱۲۰۳",
  }),
  buildOrder({
    id: "GS-1404-3177",
    itemSpecs: [["gta-6", 1], ["red-dead-redemption-2", 1]],
    hoursAgo: 8,
    status: "paid",
    stage: "preparing",
    paymentMethod: "zarinpal",
    refId: "7745988112",
  }),
  buildOrder({
    id: "GS-1403-9002",
    itemSpecs: [["god-of-war-ragnarok", 1], ["resident-evil-4", 1], ["final-fantasy-7-rebirth", 1]],
    hoursAgo: 24 * 12,
    status: "paid",
    stage: "delivered",
    paymentMethod: "wallet",
    refId: "7733009911",
    trackingCode: "پست پیشتاز ۹۹۱۲۲۳۴۵۶",
  }),
  buildOrder({
    id: "GS-1404-4488",
    itemSpecs: [["devil-may-cry-5", 1]],
    hoursAgo: 5,
    status: "pending",
    paymentMethod: "direct-debit",
  }),
];
