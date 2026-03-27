import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { AppDetailDto } from "@altstore/types";
import { DownloadActions } from "@/components/DownloadActions";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getApp(slug: string): Promise<AppDetailDto | null> {
  const res = await fetch(`${process.env.API_URL}/apps/${slug}`, {
    next: { revalidate: 60 },
    headers: { "X-Internal-Key": process.env.INTERNAL_API_KEY ?? "" },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch app: ${res.status}`);
  return res.json();
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params;
  const app = await getApp(slug);
  if (!app) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://altstore.eu";
  const canonical = `${siteUrl}/apps/${slug}`;

  return {
    title: `${app.name} — Download APK`,
    description: app.shortDesc,
    alternates: { canonical },
    openGraph: {
      title: `${app.name} — Download APK | AltStore`,
      description: app.shortDesc,
      url: canonical,
      siteName: "AltStore",
      images: app.iconUrl ? [{ url: app.iconUrl, width: 512, height: 512, alt: app.name }] : [],
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${app.name} — Download APK | AltStore`,
      description: app.shortDesc,
      images: app.iconUrl ? [app.iconUrl] : [],
    },
  };
};

const AppDetailPage = async ({ params }: Props) => {
  const { slug } = await params;
  const app = await getApp(slug);
  if (!app) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://altstore.eu";
  const platformLabel =
    app.platform === "BOTH" ? "Android · iOS" : app.platform === "ANDROID" ? "Android" : "iOS";

  const latestVersion = app.versions?.[0] ?? null;

  // Schema.org SoftwareApplication JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.shortDesc,
    url: `${siteUrl}/apps/${slug}`,
    applicationCategory: app.category,
    operatingSystem: app.platform === "IOS" ? "iOS" : "Android",
    ...(latestVersion && {
      softwareVersion: latestVersion.versionName,
      fileSize: latestVersion.fileSize,
    }),
    ...(app.rating != null && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: app.rating,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    author: {
      "@type": "Organization",
      name: app.developer.name,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-4 py-16 md:mx-16 md:py-24 lg:mx-24 xl:mx-32">
        <div className="mx-auto max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-950/40 p-6 md:p-8">
          <div className="flex items-start gap-5">
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl border border-zinc-800 bg-white/5">
              {app.iconUrl ? (
                <Image
                  src={app.iconUrl}
                  alt={`${app.name} icon`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="font-display text-xl font-bold text-zinc-600" aria-hidden="true">
                    {app.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
                {app.category}
              </p>
              <h1 className="font-display mt-1 text-3xl font-bold tracking-tight text-white">
                {app.name}
              </h1>
              <p className="mt-1 text-sm text-zinc-400">
                {platformLabel}
                {latestVersion && ` · v${latestVersion.versionName}`}
                {latestVersion && ` · ${latestVersion.fileSize}`}
              </p>
              <p className="mt-3 text-sm text-zinc-500">{app.shortDesc}</p>
            </div>
          </div>

          <div className="mt-6">
            {latestVersion ? (
              <DownloadActions versionId={latestVersion.id} appName={app.name} />
            ) : (
              <p className="text-sm text-zinc-500">No approved versions yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AppDetailPage;
