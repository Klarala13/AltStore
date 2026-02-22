import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Documentation",
  description:
    "AltStore REST API reference — upload apps, manage versions, and read analytics with JWT authentication.",
};

const ENDPOINTS = [
  {
    group: "Apps",
    items: [
      { method: "GET", path: "/v1/apps", description: "List all published apps with pagination" },
      { method: "GET", path: "/v1/apps/:slug", description: "Get a single app by slug" },
      { method: "POST", path: "/v1/apps", description: "Create a new app listing (developer)" },
      { method: "PATCH", path: "/v1/apps/:slug", description: "Update app metadata (developer)" },
      { method: "DELETE", path: "/v1/apps/:slug", description: "Delete an app and all versions" },
    ],
  },
  {
    group: "Versions",
    items: [
      {
        method: "GET",
        path: "/v1/apps/:slug/versions",
        description: "List all versions of an app",
      },
      {
        method: "POST",
        path: "/v1/apps/:slug/versions",
        description: "Upload a new APK version (triggers VirusTotal scan)",
      },
      {
        method: "GET",
        path: "/v1/apps/:slug/versions/:id",
        description: "Get version details including scan result",
      },
      { method: "DELETE", path: "/v1/apps/:slug/versions/:id", description: "Delete a version" },
    ],
  },
  {
    group: "Downloads",
    items: [
      {
        method: "POST",
        path: "/v1/apps/:slug/versions/:id/download",
        description: "Request a signed download URL (5-minute TTL)",
      },
      {
        method: "GET",
        path: "/v1/apps/:slug/versions/:id/qr",
        description: "Get a QR code PNG for the latest signed URL",
      },
    ],
  },
  {
    group: "Analytics",
    items: [
      {
        method: "GET",
        path: "/v1/apps/:slug/analytics",
        description: "Download counts per version per day (GDPR-safe, aggregated)",
      },
    ],
  },
  {
    group: "Developer Account",
    items: [
      { method: "GET", path: "/v1/developer/me", description: "Get your developer profile" },
      {
        method: "POST",
        path: "/v1/developer/tokens",
        description: "Create a new API token",
      },
      {
        method: "DELETE",
        path: "/v1/developer/tokens/:id",
        description: "Revoke an API token",
      },
    ],
  },
];

const METHOD_COLORS: Record<string, { bg: string; text: string }> = {
  GET: { bg: "rgba(59,130,246,0.12)", text: "#93c5fd" },
  POST: { bg: "rgba(30,255,0,0.1)", text: "#86efac" },
  PATCH: { bg: "rgba(251,191,36,0.1)", text: "#fde68a" },
  DELETE: { bg: "rgba(239,68,68,0.12)", text: "#fca5a5" },
};

const DocsPage = () => (
  <>
    {/* Header */}
    <section className="border-b border-zinc-800 px-6 py-16 md:px-16 lg:px-24 xl:px-32">
      <span className="badge-outline mb-6 inline-flex">v1 · REST API</span>
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
        API <span style={{ color: "#1eff00" }}>Reference</span>
      </h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-zinc-400">
        The AltStore REST API lets you automate everything: create listings, upload APKs, read
        analytics, and manage your developer account programmatically.
      </p>

      {/* Quick info pills */}
      <div className="mt-8 flex flex-wrap gap-3">
        {[
          { label: "Base URL", value: "https://api.altstore.eu" },
          { label: "Auth", value: "Bearer JWT" },
          { label: "Format", value: "JSON" },
          { label: "Version", value: "v1" },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex items-center gap-2 rounded-full border border-zinc-800 px-4 py-1.5 text-xs"
          >
            <span className="text-zinc-500">{label}:</span>
            <span className="font-mono font-medium text-white">{value}</span>
          </div>
        ))}
      </div>
    </section>

    <div className="px-6 py-12 md:px-16 lg:px-24 xl:px-32">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[260px_1fr]">
        {/* Sidebar nav */}
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-6">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Getting Started
              </p>
              <ul className="space-y-2 text-sm text-zinc-400">
                {["Authentication", "Rate Limiting", "Error Codes", "Pagination"].map((item) => (
                  <li key={item}>
                    <a href="#getting-started" className="transition-colors hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {ENDPOINTS.map(({ group }) => (
              <div key={group}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  {group}
                </p>
                <ul className="space-y-2 text-sm text-zinc-400">
                  {ENDPOINTS.find((e) => e.group === group)!.items.map((item) => (
                    <li key={item.path}>
                      <a
                        href={`#${group.toLowerCase()}`}
                        className="font-mono text-xs transition-colors hover:text-white"
                      >
                        {item.path}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="min-w-0 space-y-14">
          {/* Authentication */}
          <section id="getting-started">
            <h2 className="font-display mb-5 text-2xl font-semibold text-white">Authentication</h2>
            <p className="mb-4 text-sm leading-6 text-zinc-400">
              All write endpoints require a valid JWT token. Pass it as a{" "}
              <code className="rounded bg-zinc-900 px-1.5 py-0.5 font-mono text-xs text-zinc-300">
                Bearer
              </code>{" "}
              token in the{" "}
              <code className="rounded bg-zinc-900 px-1.5 py-0.5 font-mono text-xs text-zinc-300">
                Authorization
              </code>{" "}
              header. Tokens are created from your{" "}
              <a
                href="/login"
                className="text-white underline underline-offset-2 hover:text-[#1eff00]"
              >
                developer dashboard
              </a>
              .
            </p>
            <pre className="overflow-x-auto rounded-xl border border-zinc-800 bg-black p-6 text-xs leading-6 text-zinc-300">
              <code>{`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}</code>
            </pre>
          </section>

          {/* Endpoint groups */}
          {ENDPOINTS.map(({ group, items }) => (
            <section key={group} id={group.toLowerCase()}>
              <h2 className="font-display mb-5 text-2xl font-semibold text-white">{group}</h2>
              <div className="space-y-3">
                {items.map(({ method, path, description }) => {
                  const colors = METHOD_COLORS[method] ?? {
                    bg: "rgba(255,255,255,0.06)",
                    text: "#a1a1aa",
                  };
                  return (
                    <div
                      key={path}
                      className="flex flex-col gap-2 rounded-xl border border-zinc-800 bg-zinc-950 p-5 sm:flex-row sm:items-center sm:gap-5"
                    >
                      <span
                        className="w-16 flex-shrink-0 rounded-md px-2.5 py-1 text-center font-mono text-xs font-bold"
                        style={{ background: colors.bg, color: colors.text }}
                      >
                        {method}
                      </span>
                      <code className="flex-1 font-mono text-sm text-white">{path}</code>
                      <p className="text-sm text-zinc-500 sm:text-right">{description}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}

          {/* Coming soon note */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center">
            <p className="text-sm font-medium text-zinc-400">
              Full request/response schemas, code examples, and an interactive playground are coming
              soon.
            </p>
            <p className="mt-2 text-sm text-zinc-600">
              In the meantime, reach us at{" "}
              <a
                href="mailto:api@altstore.eu"
                className="text-white underline underline-offset-2 hover:text-[#1eff00]"
              >
                api@altstore.eu
              </a>
            </p>
          </div>
        </main>
      </div>
    </div>
  </>
);

export default DocsPage;
