import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://altstore.eu";

async function fetchAllAppSlugs(): Promise<string[]> {
  try {
    // Fetch all active apps (up to 200 — enough for sitemap; extend with pagination if needed)
    const res = await fetch(`${process.env.API_URL}/apps?limit=200`, {
      next: { revalidate: 3600 },
      headers: { "X-Internal-Key": process.env.INTERNAL_API_KEY ?? "" },
    });
    if (!res.ok) return [];
    const data: { items: { slug: string }[] } = await res.json();
    return data.items.map((a) => a.slug);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await fetchAllAppSlugs();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    {
      url: `${SITE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const appRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE_URL}/apps/${slug}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...appRoutes];
}
