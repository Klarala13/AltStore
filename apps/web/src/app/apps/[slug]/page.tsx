import type { Metadata, Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { AppDetailDto } from "@appia/types";
import { DownloadActions } from "@/components/DownloadActions";
import { RatingForm } from "@/components/RatingForm";
import { RatingsList } from "@/components/RatingsList";
import { ScreenshotGallery } from "@/components/ScreenshotGallery";
import { VersionAccordion } from "@/components/VersionAccordion";
import { getSiteUrl } from "@/lib/site-url";

interface Props {
  params: Promise<{ slug: string }>;
}

const toLabel = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

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

  const siteUrl = getSiteUrl();
  const canonical = `${siteUrl}/apps/${slug}`;

  return {
    title: `${app.name} — Download APK`,
    description: app.shortDesc,
    alternates: { canonical },
    openGraph: {
      title: `${app.name} — Download APK | Appia`,
      description: app.shortDesc,
      url: canonical,
      siteName: "Appia",
      images: app.iconUrl ? [{ url: app.iconUrl, width: 512, height: 512, alt: app.name }] : [],
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${app.name} — Download APK | Appia`,
      description: app.shortDesc,
      images: app.iconUrl ? [app.iconUrl] : [],
    },
  };
};

const AppDetailPage = async ({ params }: Props) => {
  const { slug } = await params;
  const app = await getApp(slug);
  if (!app) notFound();

  const siteUrl = getSiteUrl();
  const platformLabel =
    app.platform === "BOTH" ? "Android · iOS" : app.platform === "ANDROID" ? "Android" : "iOS";

  const versions = app.versions ?? [];
  const latestVersion = versions[0] ?? null;

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

  const infoLinks = [
    app.websiteUrl && { label: "Website", href: app.websiteUrl },
    app.sourceUrl && { label: "Source code", href: app.sourceUrl },
    { label: "Privacy policy", href: app.privacyUrl },
  ].filter((link): link is { label: string; href: string } => Boolean(link));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-4 py-12 md:mx-16 md:py-16 lg:mx-24 xl:mx-32">
        <div className="mx-auto max-w-3xl space-y-12">
          <nav aria-label="Breadcrumb" className="text-xs text-zinc-500">
            <Link href="/" className="transition-colors hover:text-white">
              Apps
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <Link
              href={`/category/${app.category.toLowerCase()}` as Route}
              className="transition-colors hover:text-white"
            >
              {toLabel(app.category)}
            </Link>
          </nav>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-6 md:p-8">
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
                    <span
                      className="font-display text-xl font-bold text-zinc-600"
                      aria-hidden="true"
                    >
                      {app.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h1 className="font-display text-3xl font-bold tracking-tight text-white">
                  {app.name}
                </h1>
                <p className="mt-1 text-sm text-zinc-400">
                  {app.developer.name}
                  {app.developer.verified && (
                    <span className="ml-2 text-xs text-[#1eff00]">Verified developer</span>
                  )}
                </p>
                <p className="mt-1 text-sm text-zinc-500">
                  {platformLabel}
                  {latestVersion && ` · v${latestVersion.versionName}`}
                  {app.rating != null && ` · ★ ${app.rating.toFixed(1)}`}
                </p>
                <p className="mt-3 text-sm text-zinc-400">{app.shortDesc}</p>
              </div>
            </div>

            <div className="mt-6">
              {latestVersion ? (
                <DownloadActions
                  versionId={latestVersion.id}
                  appName={app.name}
                  fileSize={latestVersion.fileSize}
                />
              ) : (
                <p className="text-sm text-zinc-500">
                  This app is still in review. Check back soon.
                </p>
              )}
            </div>

            <p className="mt-6 border-t border-zinc-800 pt-4 text-xs text-zinc-500">
              Scanned for malware and reviewed by a person before publishing.
            </p>
          </div>

          <ScreenshotGallery screenshots={app.screenshots ?? []} appName={app.name} />

          {app.description && (
            <section>
              <h2 className="font-display mb-4 text-lg font-semibold text-white">About</h2>
              <p className="whitespace-pre-line text-sm leading-7 text-zinc-400">
                {app.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {infoLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 underline underline-offset-2 transition-colors hover:text-white"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {versions.length > 0 && (
            <section>
              <h2 className="font-display mb-4 text-lg font-semibold text-white">
                Version history
              </h2>
              <VersionAccordion versions={versions} />
            </section>
          )}

          <div id="reviews" className="scroll-mt-24 space-y-6">
            <RatingsList appSlug={slug} />
            <RatingForm appSlug={slug} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppDetailPage;
