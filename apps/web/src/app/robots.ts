import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

/**
 * There was no robots.txt at all — /robots.txt returned the 404 page.
 *
 * That mattered more than it looks: /sitemap.xml existed and was correct, but
 * nothing pointed a crawler at it. robots.txt is the one file every crawler
 * fetches first, and it is where a sitemap is normally declared.
 *
 * The URL comes from getSiteUrl(), the same source as the sitemap and the
 * canonicals, so it follows the production domain instead of hardcoding one.
 * Hardcoding a domain here is exactly what sent the sitemap to altstore.eu —
 * a domain nobody here owned.
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Nothing here is secret, but none of it belongs in search results:
        // signed-in areas, the auth callbacks and the internal API proxies.
        disallow: ["/api/", "/dashboard/", "/admin/", "/login", "/register"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
