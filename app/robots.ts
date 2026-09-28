import type { MetadataRoute } from "next";
import { siteUrl, nonIndexablePaths } from "@/lib/data";

/**
 * Crawl rules.
 *
 * Transactional and account pages carry no indexable content, so they are
 * blocked from crawling entirely — this keeps them out of the crawl budget and
 * guarantees they never enter the index.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: nonIndexablePaths,
      },
    ],
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
    host: siteUrl.origin,
  };
}
