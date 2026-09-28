/**
 * Site-wide constants used by metadata / SEO helpers.
 *
 * The canonical origin comes from an environment variable so no production URL
 * is hardcoded. Set `NEXT_PUBLIC_SITE_URL` (e.g. https://gamestore.ir) in the
 * deployment environment; the localhost fallback is only for local dev.
 */
const DEV_ORIGIN = "http://localhost:3000";

function getSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!raw) return new URL(DEV_ORIGIN);

  try {
    return new URL(raw);
  } catch {
    return new URL(DEV_ORIGIN);
  }
}

export const siteUrl = getSiteUrl();

/** Persian brand name — used in titles, Open Graph and structured data. */
export const siteName = "گیم‌استور";

/** Latin brand name — used where the mark itself is rendered (logo lockups). */
export const siteNameLatin = "Game Store";

export const siteDescription =
  "خرید بازی اورجینال برای PS5، PS4، Xbox و PC با گارانتی فعال‌سازی، تحویل کلید کمتر از ۳۰ دقیقه و پشتیبانی ۲۴ ساعته.";

/** Root title (no template applied) — the fallback for `/`. */
export const siteTitle = `${siteName} | خرید بازی اورجینال PS5، PS4، Xbox و PC`;

/** Appended to every page title through `title.template`. */
export const siteTitleTemplate = `%s | ${siteName}`;

/**
 * Routes that must never be crawled or indexed: transactional flows and
 * account pages have no indexable content and would compete with the shop
 * pages in search results.
 */
export const nonIndexablePaths = [
  "/cart",
  "/checkout",
  "/order/",
  "/payment/",
  "/login",
  "/register",
  "/forgot-password",
];
