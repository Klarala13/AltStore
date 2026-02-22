import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MOCK_APPS } from "@/lib/mock-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params;
  const app = MOCK_APPS.find((a) => a.slug === slug);
  if (!app) return {};
  return {
    title: `${app.name} — Download APK`,
    description: app.shortDesc,
  };
};

const AppDetailPage = async ({ params }: Props) => {
  const { slug } = await params;
  const app = MOCK_APPS.find((a) => a.slug === slug);
  if (!app) notFound();

  const platformLabel =
    app.platform === "BOTH" ? "Android · iOS" : app.platform === "ANDROID" ? "Android" : "iOS";

  return (
    <div className="mx-4 py-16 md:mx-16 md:py-24 lg:mx-24 xl:mx-32">
      <div className="mx-auto max-w-3xl">
        {/* ── App header ── */}
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
                <span className="font-display text-2xl font-bold text-zinc-600" aria-hidden="true">
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
              {app.latestVersion && ` · v${app.latestVersion}`}
              {app.latestFileSize && ` · ${app.latestFileSize}`}
            </p>
          </div>
        </div>

        {/* ── CTAs ── */}
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

        {/* ── About ── */}
        <section>
          <h2 className="font-display mb-4 text-lg font-semibold text-white">About</h2>
          <p className="text-base leading-7 text-zinc-400">{app.shortDesc}</p>
        </section>

        <div className="section-divider my-10" />

        {/* ── Security badge ── */}
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
              This APK was scanned by VirusTotal (70+ engines) and passed with no threats detected.
            </p>
          </div>
        </div>

        <div className="section-divider my-10" />

        {/* ── Version history ── */}
        <section>
          <h2 className="font-display mb-4 text-lg font-semibold text-white">Version History</h2>
          <div className="overflow-hidden rounded-2xl border border-zinc-800">
            <VersionRow
              version={app.latestVersion ?? "1.0.0"}
              isLatest
              changelog="Initial release available."
              minOs="Android 8.0+"
              fileSize={app.latestFileSize ?? "–"}
            />
          </div>
        </section>

        <div className="section-divider my-10" />

        {/* ── CTA banner ── */}
        <div
          className="relative overflow-hidden rounded-2xl p-8 text-center md:p-12"
          style={{
            background: "linear-gradient(135deg, rgba(30,255,0,0.10) 0%, rgba(0,0,0,0) 60%)",
            border: "1px solid rgba(30,255,0,0.2)",
          }}
        >
          {/* Glow dot */}
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
                  d="M3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
                />
              </svg>
              Generate QR Code
            </button>
          </div>
          {/* Trust note */}
          <p className="relative mt-6 text-xs text-zinc-600">
            Scanned by VirusTotal (70+ engines) &middot; GDPR compliant &middot; No account needed
          </p>
        </div>
      </div>
    </div>
  );
};

interface VersionRowProps {
  version: string;
  isLatest: boolean;
  changelog: string;
  minOs: string;
  fileSize: string;
}

const VersionRow = ({ version, isLatest, changelog, minOs, fileSize }: VersionRowProps) => (
  <div className="flex items-start justify-between gap-4 p-5">
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <span className="font-display text-sm font-semibold text-white">v{version}</span>
        {isLatest && <span className="badge-accent text-xs">Latest</span>}
      </div>
      <p className="mt-1 text-sm text-zinc-400">{changelog}</p>
      <p className="mt-1 text-xs text-zinc-600">
        {minOs} &middot; {fileSize}
      </p>
    </div>
    <button
      type="button"
      aria-disabled="true"
      title="Download coming soon"
      className="btn-secondary flex-shrink-0 cursor-not-allowed px-4 py-2 text-sm opacity-60"
    >
      Download
    </button>
  </div>
);

export default AppDetailPage;
