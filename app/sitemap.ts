import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/data";
import { products } from "@/lib/data/products";
import { consoleItems, consoleHref } from "@/lib/data/consoles";
import { categoryItems } from "@/components/home/CategorySlider/categories-data";
import { articles } from "@/components/home/ArticlesSection/articles-data";

/**
 * Sitemap containing only public, indexable, content-bearing routes.
 *
 * Transactional flows (`/cart`, `/checkout`, `/order/*`, `/payment/*`) and
 * account pages (`/login`, `/register`, `/forgot-password`) are intentionally
 * excluded — they are blocked in `robots.ts` and marked `noindex`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  /** Static pages, ordered by importance. */
  const staticRoutes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }[] = [
    { path: "/", changeFrequency: "daily", priority: 1 },
    { path: "/games", changeFrequency: "daily", priority: 0.9 },
    { path: "/discounts", changeFrequency: "daily", priority: 0.9 },
    { path: "/categories", changeFrequency: "weekly", priority: 0.8 },
    { path: "/consoles", changeFrequency: "weekly", priority: 0.8 },
    { path: "/used-consoles", changeFrequency: "weekly", priority: 0.7 },
    { path: "/articles", changeFrequency: "weekly", priority: 0.7 },
    { path: "/faq", changeFrequency: "monthly", priority: 0.6 },
    { path: "/about", changeFrequency: "monthly", priority: 0.5 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.5 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: new URL(route.path, siteUrl).toString(),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Product detail pages
  for (const product of products) {
    entries.push({
      url: new URL(`/games/${product.slug}`, siteUrl).toString(),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // Genre landing pages
  for (const category of categoryItems) {
    entries.push({
      url: new URL(`/categories/${category.id}`, siteUrl).toString(),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  // Console landing pages
  for (const item of consoleItems) {
    entries.push({
      url: new URL(consoleHref(item.id), siteUrl).toString(),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Articles
  for (const article of articles) {
    entries.push({
      url: new URL(article.href, siteUrl).toString(),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
