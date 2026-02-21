import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MOCK_APPS } from "@/lib/mock-data";

interface Props {
  params: { slug: string };
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const app = MOCK_APPS.find((a) => a.slug === params.slug);
  if (!app) return {};
  return {
    title: `${app.name} — Download APK`,
    description: app.shortDesc,
  };
};

const AppDetailPage = async ({ params }: Props) => {
  const app = MOCK_APPS.find((a) => a.slug === params.slug);
  if (!app) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:px-12 md:py-24">
      {/* Hero */}
      <div className="flex items-start gap-6">
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100">
          {app.iconUrl ? (
            <img src={app.iconUrl} alt={app.name} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-gray-200" />
          )}
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            {app.category}
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{app.name}</h1>
          <p className="mt-1 text-sm text-gray-500">
            {app.platform === "BOTH" ? "Android · iOS" : app.platform === "ANDROID" ? "Android" : "iOS"}
            {app.latestVersion && ` · v${app.latestVersion}`}
            {app.latestFileSize && ` · ${app.latestFileSize}`}
          </p>
        </div>
      </div>

      {/* Download CTA */}
      <div className="mt-10 flex flex-wrap gap-4">
        <button className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700">
          Download APK
        </button>
        <button className="rounded-lg border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 transition hover:border-gray-400">
          QR Code
        </button>
      </div>

      <hr className="my-10 border-gray-200" />

      {/* Description */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-gray-900">About</h2>
        <p className="text-base leading-relaxed text-gray-600">{app.shortDesc}</p>
      </section>

      <hr className="my-10 border-gray-200" />

      {/* Version history placeholder */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Version History</h2>
        <div className="rounded-xl border border-gray-200 divide-y divide-gray-200">
          <VersionRow
            version={app.latestVersion ?? "1.0.0"}
            isLatest
            changelog="Initial release available."
            minOs="Android 8.0+"
            fileSize={app.latestFileSize ?? "–"}
          />
        </div>
      </section>
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
        <span className="text-sm font-semibold text-gray-900">v{version}</span>
        {isLatest && (
          <span className="rounded-full bg-gray-900 px-2 py-0.5 text-xs text-white">Latest</span>
        )}
      </div>
      <p className="mt-1 text-sm text-gray-500">{changelog}</p>
      <p className="mt-1 text-xs text-gray-400">
        {minOs} · {fileSize}
      </p>
    </div>
    <button className="flex-shrink-0 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 transition hover:border-gray-400">
      Download
    </button>
  </div>
);

export default AppDetailPage;
