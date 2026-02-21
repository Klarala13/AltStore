import type { Metadata } from "next";
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
    <div className="mx-auto max-w-4xl px-6 py-16 md:px-12 md:py-24">
      <div className="flex items-start gap-6">
        <div
          className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl"
          style={{ background: "var(--bg-overlay)", border: "1px solid var(--border)" }}
        >
          {app.iconUrl ? (
            <img src={app.iconUrl} alt={app.name} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full" style={{ background: "var(--bg-overlay)" }} />
          )}
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
            {app.category}
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gradient">{app.name}</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
            {platformLabel}
            {app.latestVersion && ` · v${app.latestVersion}`}
            {app.latestFileSize && ` · ${app.latestFileSize}`}
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <button className="btn-primary">Download APK</button>
        <button className="btn-secondary">QR Code</button>
      </div>

      <div className="my-10 h-px" style={{ background: "var(--border)" }} />

      <section>
        <h2 className="mb-4 text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          About
        </h2>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {app.shortDesc}
        </p>
      </section>

      <div className="my-10 h-px" style={{ background: "var(--border)" }} />

      <section>
        <h2 className="mb-4 text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          Version History
        </h2>
        <div
          className="overflow-hidden rounded-xl"
          style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}
        >
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
        <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          v{version}
        </span>
        {isLatest && <span className="badge-green">Latest</span>}
      </div>
      <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
        {changelog}
      </p>
      <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
        {minOs} · {fileSize}
      </p>
    </div>
    <button className="btn-secondary flex-shrink-0 px-4 py-2 text-sm">Download</button>
  </div>
);

export default AppDetailPage;
