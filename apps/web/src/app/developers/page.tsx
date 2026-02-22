import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Developers",
  description:
    "Publish your Android app on AltStore — the DMA-compliant EU marketplace. JWT API, automated virus scanning, and instant QR installs.",
};

/* ─────────────────────────── Page ─────────────────────────────── */

const DevelopersPage = () => (
  <>
    <HeroSection />
    <HowItWorksSection />
    <FeaturesSection />
    <ApiSnippetSection />
    <CtaSection />
  </>
);

/* ─────────────────────────── Hero ─────────────────────────────── */

const HeroSection = () => (
  <section className="relative overflow-hidden border-b border-zinc-800 pb-24 pt-24 md:pb-32 md:pt-32">
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background: "radial-gradient(55% 45% at 50% -5%, rgba(30,255,0,0.10) 0%, transparent 70%)",
      }}
    />
    <div className="relative mx-auto max-w-4xl px-6 text-center">
      <span className="badge-outline mb-8 inline-flex">For Developers</span>

      <h1 className="font-display text-[48px] font-extrabold leading-[1.08] tracking-tight text-white md:text-6xl lg:text-7xl">
        Reach millions of <span style={{ color: "#1eff00" }}>EU users</span>
        <br />
        <span className="text-zinc-500">without the gatekeepers.</span>
      </h1>

      <p className="mx-auto mt-7 max-w-lg text-base leading-7 text-zinc-400 md:text-lg">
        AltStore is the DMA-compliant alternative marketplace for Android in Europe. Submit your
        app, pass our automated security scan, and go live — no committee approval, no revenue
        share.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link href="/login" className="btn-primary px-7 py-3 text-base">
          Submit Your App
        </Link>
        <a
          href="#how-it-works"
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-transparent px-7 py-3 text-base font-medium text-white transition-all duration-200 hover:border-zinc-500 hover:bg-white/5"
        >
          See How It Works
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </a>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500">
        {["Free to list", "No revenue share", "48h review", "Full REST API"].map((tag) => (
          <span key={tag} className="flex items-center gap-1.5">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1eff00"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            {tag}
          </span>
        ))}
      </div>
    </div>
  </section>
);

/* ───────────────────────── How It Works ───────────────────────── */

const STEPS = [
  {
    number: "01",
    title: "Create a developer account",
    description:
      "Sign in with your existing account or register as a developer. Verification takes less than a minute — no forms, no documents, no wait.",
    cta: { label: "Sign in", href: "/login" },
  },
  {
    number: "02",
    title: "Upload your APK & fill the listing",
    description:
      "Upload your binary, add screenshots, a description, and a privacy policy URL. Our automated VirusTotal scan runs the moment your file lands — results in under 60 seconds.",
    cta: null,
  },
  {
    number: "03",
    title: "Go live in 48 hours",
    description:
      "Once the automated scan passes, a human reviewer checks your listing. Approval typically takes under 48 hours. After approval your app is instantly available to all EU users on AltStore.",
    cta: null,
  },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="border-b border-zinc-800">
    <div className="px-6 py-16 text-center md:py-20">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">Process</p>
      <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
        How It <span style={{ color: "#1eff00" }}>Works</span>
      </h2>
      <p className="mx-auto mt-4 max-w-md text-base text-zinc-400">
        Three steps from your local build to European users&apos; devices.
      </p>
    </div>

    <div className="grid grid-cols-1 border-t border-zinc-800 md:grid-cols-3">
      {STEPS.map(({ number, title, description, cta }, i) => (
        <div
          key={number}
          className={[
            "flex flex-col p-10 md:p-12",
            i < 2 ? "border-b border-zinc-800 md:border-b-0 md:border-r" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <span
            className="font-display mb-6 text-5xl font-extrabold leading-none"
            style={{ color: "#1eff00", opacity: 0.25 }}
          >
            {number}
          </span>
          <h3 className="font-display mb-3 text-xl font-semibold text-white">{title}</h3>
          <p className="text-sm leading-6 text-zinc-400">{description}</p>
          {cta && (
            <Link
              href={cta.href as Route}
              className="btn-primary mt-8 self-start px-5 py-2.5 text-sm"
            >
              {cta.label}
            </Link>
          )}
        </div>
      ))}
    </div>
  </section>
);

/* ──────────────────────── Developer Features ──────────────────── */

const DEV_FEATURES = [
  {
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
        />
      </svg>
    ),
    title: "Full REST API",
    description:
      "Manage apps, upload versions, and read analytics programmatically. JWT-authenticated with versioned endpoints. CI/CD ready.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 12c0 6.627 5.373 12 12 12s12-5.373 12-12a12 12 0 00-.598-3.75M15 3.036A11.959 11.959 0 0120.402 6"
        />
      </svg>
    ),
    title: "Automated Security Scan",
    description:
      "Every binary is checked against VirusTotal's 70+ antivirus engines on upload. Results surface in your dashboard in under 60 seconds.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
        />
      </svg>
    ),
    title: "Instant QR Install",
    description:
      "Every published version gets a signed download URL and a QR code. Users scan and install in one tap — no link copying, no clipboard.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zm9.75-4.875C12.75 7.629 13.254 7.125 13.875 7.125h2.25c.621 0 1.125.504 1.125 1.125v11.625c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.25zm-4.875 9C7.875 16.629 8.379 16.125 9 16.125h2.25c.621 0 1.125.504 1.125 1.125v2.625c0 .621-.504 1.125-1.125 1.125H9a1.125 1.125 0 01-1.125-1.125V17.25z"
        />
      </svg>
    ),
    title: "Download Analytics",
    description:
      "See download counts per version, per day. All stats are GDPR-compliant — aggregated, no personal data, no fingerprinting.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
    ),
    title: "Signed Download URLs",
    description:
      "APKs are served via time-limited signed URLs from Cloudflare R2. Your binary is never exposed at a guessable public path.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
        />
      </svg>
    ),
    title: "Open Source Platform",
    description:
      "AltStore is fully open source. Inspect exactly how your data is handled, report issues, or contribute improvements on GitHub.",
  },
];

const FeaturesSection = () => (
  <section className="border-b border-zinc-800">
    <div className="px-6 py-16 text-center md:py-20">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
        Built for developers
      </p>
      <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
        Everything you <span style={{ color: "#1eff00" }}>need</span>
      </h2>
      <p className="mx-auto mt-4 max-w-md text-base text-zinc-400">
        From first upload to production analytics — no third-party tools required.
      </p>
    </div>

    <div className="grid grid-cols-1 border-t border-zinc-800 md:grid-cols-3">
      {DEV_FEATURES.map(({ icon, title, description }, i) => (
        <div
          key={title}
          className={[
            "p-10 md:p-12",
            i % 3 !== 2 ? "md:border-r md:border-zinc-800" : "",
            i >= 3 ? "border-t border-zinc-800" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div
            className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl"
            style={{
              background: "linear-gradient(135deg, #1eff00 0%, #15b100 100%)",
              color: "#000",
            }}
          >
            {icon}
          </div>
          <h3 className="font-display mb-3 text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm leading-6 text-zinc-400">{description}</p>
        </div>
      ))}
    </div>
  </section>
);

/* ────────────────────────── API Snippet ───────────────────────── */

const ApiSnippetSection = () => (
  <section className="border-b border-zinc-800">
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* Left — copy */}
      <div className="flex flex-col justify-center border-b border-zinc-800 px-10 py-16 md:border-b-0 md:border-r md:px-14 md:py-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Developer API
        </p>
        <h2 className="font-display text-4xl font-extrabold leading-tight text-white">
          Automate your releases.
        </h2>
        <p className="mt-5 max-w-xs text-sm leading-6 text-zinc-400">
          Push a new APK version directly from your CI/CD pipeline. The API handles upload,
          scanning, and listing updates — no dashboard required.
        </p>
        <Link href={"/docs" as Route} className="btn-primary mt-8 self-start px-6 py-2.5 text-sm">
          Read the API docs
        </Link>
      </div>

      {/* Right — code block */}
      <div className="flex items-center bg-zinc-950 px-8 py-12 md:px-12">
        <pre className="w-full overflow-x-auto rounded-xl border border-zinc-800 bg-black p-6 text-xs leading-6 text-zinc-300">
          <code>{`# Upload a new version via the REST API
curl -X POST https://api.altstore.eu/v1/apps/my-app/versions \\
  -H "Authorization: Bearer $ALTSTORE_TOKEN" \\
  -F "apk=@app-release.apk" \\
  -F "versionName=2.1.0" \\
  -F "changelog=Bug fixes and performance improvements"

# Response
{
  "id": "ver_01HXYZ…",
  "status": "scanning",
  "uploadedAt": "2026-02-22T09:41:00Z"
}`}</code>
        </pre>
      </div>
    </div>
  </section>
);

/* ──────────────────────────── CTA ─────────────────────────────── */

const CtaSection = () => (
  <section className="px-6 py-24 text-center md:py-32">
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background: "radial-gradient(40% 30% at 50% 100%, rgba(30,255,0,0.07) 0%, transparent 70%)",
      }}
    />
    <div className="relative mx-auto max-w-2xl">
      <h2 className="font-display text-4xl font-extrabold text-white md:text-5xl">
        Ready to reach the EU?
      </h2>
      <p className="mx-auto mt-5 max-w-md text-base text-zinc-400">
        Submit your first app today. No fees, no gatekeepers — just your app and millions of EU
        users.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link href="/login" className="btn-primary px-8 py-3 text-base">
          Get started — it&apos;s free
        </Link>
        <Link
          href={"/docs" as Route}
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-8 py-3 text-base font-medium text-white transition-all duration-200 hover:border-zinc-500 hover:bg-white/5"
        >
          View API docs
        </Link>
      </div>
    </div>
  </section>
);

export default DevelopersPage;
