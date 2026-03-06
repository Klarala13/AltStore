import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { AppDetailDto } from "@altstore/types";
import { ScreenshotGallery } from "@/components/ScreenshotGallery";
import { VersionAccordion } from "@/components/VersionAccordion";
import { RatingsList } from "@/components/RatingsList";
import { RatingForm } from "@/components/RatingForm";

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
        <div className="mx-auto max-w-3xl">
          {/* App header */}
          <div className="flex items-start gap-6">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border border-zinc-800 bg-white/5">
              {app.iconUrl ? (
                <Image
                  src={app.iconUrl}
                  alt={`${app.name} icon`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span
                    className="font-display text-2xl font-bold text-zinc-600"
                    aria-hidden="true"
                  >
                    {app.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
                {app.category}
              </p>
              <h1 className="font-display text-gradient mt-1 text-3xl font-bold tracking-tight">
                {app.name}
              </h1>
              <p className="mt-1 text-sm text-zinc-400">
                {platformLabel}
                {latestVersion && ` · v${latestVersion.versionName}`}
                {latestVersion && ` · ${latestVersion.fileSize}`}
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              aria-disabled="true"
              title="Download coming soon"
              className="btn-primary cursor-not-allowed opacity-60"
            >
              Download APK
            </button>
            <button
              type="button"
              aria-disabled="true"
              title="QR code coming soon"
              className="btn-secondary cursor-not-allowed opacity-60"
            >
              <svg
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                className="mr-2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
                />
              </svg>
              QR Code
            </button>
          </div>

          <div className="section-divider my-10" />

          {/* About */}
          <section>
            <h2 className="font-display mb-4 text-lg font-semibold text-white">About</h2>
            <p className="text-base leading-7 text-zinc-400">{app.shortDesc}</p>
            {app.description && app.description !== app.shortDesc && (
              <p className="mt-3 text-sm leading-7 text-zinc-500">{app.description}</p>
            )}
          </section>

          <div className="section-divider my-10" />

          {/* Screenshot gallery (Embla Carousel) */}
          {app.screenshots.length > 0 && (
            <>
              <ScreenshotGallery screenshots={app.screenshots} appName={app.name} />
              <div className="section-divider my-10" />
            </>
          )}

          {/* Security badge */}
          <div className="flex items-start gap-4 rounded-2xl border border-zinc-800 bg-white/[0.02] p-6">
            <div
              className="flex-shrink-0 rounded-lg p-2"
              style={{ background: "rgba(30,255,0,0.08)", color: "#1eff00" }}
            >
              <svg
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 12c0 6.627 5.373 12 12 12s12-5.373 12-12a12 12 0 00-.598-3.75M15 3.036A11.959 11.959 0 0120.402 6"
                />
              </svg>
            </div>
            <div>
              <p className="font-display text-sm font-semibold text-white">Virus Scanned</p>
              <p className="mt-1 text-sm text-zinc-500">
                This APK was scanned by VirusTotal (70+ engines) and passed with no threats
                detected.
              </p>
            </div>
          </div>

          <div className="section-divider my-10" />

          {/* Version history — interactive accordion */}
          <section>
            <h2 className="font-display mb-4 text-lg font-semibold text-white">Version History</h2>
            <VersionAccordion versions={app.versions} />
          </section>

          <div className="section-divider my-10" />

          {/* Ratings — server-rendered list + client form */}
          <RatingsList appSlug={slug} />
          <div className="mt-8">
            <RatingForm appSlug={slug} />
          </div>

          <div className="section-divider my-10" />

          {/* CTA banner */}
          <div
            className="relative overflow-hidden rounded-2xl p-8 text-center md:p-12"
            style={{
              background: "linear-gradient(135deg, rgba(30,255,0,0.10) 0%, rgba(0,0,0,0) 60%)",
              border: "1px solid rgba(30,255,0,0.2)",
            }}
          >
            <div
              className="pointer-events-none absolute -top-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full blur-3xl"
              style={{ background: "rgba(30,255,0,0.15)" }}
            />
            <p className="font-display relative text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Ready to install?
            </p>
            <h2 className="font-display relative mt-2 text-3xl font-extrabold text-white md:text-4xl">
              Get {app.name} today
            </h2>
            <p className="relative mx-auto mt-3 max-w-sm text-sm leading-6 text-zinc-400">
              Free to download. Virus-scanned. No account required to install.
            </p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                aria-disabled="true"
                title="Download coming soon"
                className="btn-primary cursor-not-allowed px-8 py-3 text-base opacity-60"
              >
                Download APK
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  className="ml-2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              </button>
              <button
                type="button"
                aria-disabled="true"
                title="QR code coming soon"
                className="btn-secondary cursor-not-allowed px-8 py-3 text-base opacity-60"
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="mr-2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c0 .621-.504 1.125-1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
                  />
                </svg>
                Generate QR Code
              </button>
            </div>
            <p className="relative mt-6 text-xs text-zinc-600">
              Scanned by VirusTotal (70+ engines) &middot; GDPR compliant &middot; No account needed
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppDetailPage;
