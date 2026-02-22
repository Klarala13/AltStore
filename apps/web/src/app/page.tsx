import type { Route } from "next";
import Link from "next/link";
import type { AppCardDto } from "@altstore/types";
import { AppCard } from "@/components/AppCard";
import { MOCK_APPS } from "@/lib/mock-data";

const HomePage = async () => {
  const apps: AppCardDto[] = MOCK_APPS;

  return (
    <>
      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Stats strip ── */}
      <StatsSection />

      {/* ── App grid ── */}
      <section className="mx-4 py-16 md:mx-16 md:py-20 lg:mx-24 xl:mx-32">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="font-display text-2xl font-semibold text-white">All Apps</h2>
          <CategoryBar />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {apps.map((app) => (
            <AppCard key={app.id} {...app} />
          ))}
        </div>
      </section>

      {/* ── Features grid ── */}
      <FeaturesSection />

      {/* ── FAQ ── */}
      <FaqSection />
    </>
  );
};

/* ──────────────────────────────── Hero ──────────────────────────────────── */

const HeroSection = () => (
  <section className="relative overflow-hidden pb-28 pt-28 md:pb-36 md:pt-36">
    {/* Radial lime glow from top-centre */}
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background: "radial-gradient(60% 55% at 50% -5%, rgba(30,255,0,0.12) 0%, transparent 70%)",
      }}
    />

    <div className="relative mx-auto max-w-4xl px-6 text-center">
      {/* Trust pill */}
      <div className="mb-8 flex items-center justify-center gap-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1eff00"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 7L13 17l-5-5" />
          <path d="M2 17l5-5" />
        </svg>
        <span className="text-sm font-medium text-zinc-400">
          Trusted by <span className="text-white">50,000+</span> users in Europe
        </span>
      </div>

      {/* Heading */}
      <h1 className="font-display text-[52px] font-extrabold leading-[1.08] tracking-tight text-white md:text-7xl lg:text-8xl">
        Everything you need to <span style={{ color: "#1eff00" }}>install</span>{" "}
        <span className="text-zinc-500">your apps</span>
      </h1>

      {/* Subtext */}
      <p className="mx-auto mt-7 max-w-lg text-base leading-7 text-zinc-400 md:text-lg">
        Every app virus-scanned before publishing. Your privacy protected by design. Open source,
        zero tracking.
      </p>

      {/* CTAs */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link href="/#apps" className="btn-primary px-7 py-3 text-base">
          Browse Apps
        </Link>
        <Link
          href={"/developers#how-it-works" as Route}
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
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </Link>
      </div>

      {/* Social proof */}
      <div className="mt-10 flex items-center justify-center gap-3">
        <span className="text-lg leading-none text-yellow-400">★★★★★</span>
        <span className="text-sm text-zinc-500">
          DMA-compliant &middot; EU Certified &middot; Open Source 2025
        </span>
      </div>
    </div>
  </section>
);

/* ──────────────────────────────── Stats ─────────────────────────────────── */

const STATS = [
  { value: "500+", label: "Apps available" },
  { value: "100%", label: "Virus scanned" },
  { value: "0", label: "Trackers" },
  { value: "GDPR", label: "Compliant" },
];

const StatsSection = () => (
  <section className="border-y border-zinc-800">
    {/* Header */}
    <div className="px-6 py-14 text-center">
      <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
        What We <span style={{ color: "#1eff00" }}>Offer</span>
      </h2>
      <p className="mx-auto mt-4 max-w-md text-base text-zinc-400">
        A marketplace built on transparency. Every number is real — no vanity metrics.
      </p>
    </div>

    {/* Stats grid */}
    <div className="grid grid-cols-2 border-t border-zinc-800 md:grid-cols-4">
      {STATS.map(({ value, label }, i) => (
        <div
          key={label}
          className={`px-8 py-10 text-center ${i < 3 ? "border-r border-zinc-800" : ""} ${i >= 2 ? "max-md:border-r-0" : ""}`}
        >
          <p className="font-display text-5xl font-extrabold" style={{ color: "#1eff00" }}>
            {value}
          </p>
          <p className="mt-2 text-sm text-zinc-500">{label}</p>
        </div>
      ))}
    </div>
  </section>
);

/* ─────────────────────────────── Category Bar ────────────────────────────── */

const CATEGORIES = [
  { label: "All", active: true },
  { label: "Productivity", active: false },
  { label: "Tools", active: false },
  { label: "Social", active: false },
  { label: "Entertainment", active: false },
];

const CategoryBar = () => (
  <div className="flex flex-wrap gap-2">
    {CATEGORIES.map(({ label, active }) => (
      <Link
        key={label}
        href={(active ? "/" : `/category/${label.toLowerCase()}`) as Route}
        className="rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200"
        style={{
          color: active ? "#000" : "#71717a",
          backgroundColor: active ? "#1eff00" : "transparent",
          border: "1px solid",
          borderColor: active ? "#1eff00" : "rgba(255,255,255,0.1)",
        }}
      >
        {label}
      </Link>
    ))}
  </div>
);

/* ──────────────────────────── Features Section ───────────────────────────── */

const FEATURES = [
  {
    icon: (
      <svg
        width="28"
        height="28"
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
    title: "Virus Scanned",
    description:
      "Every APK is automatically scanned with VirusTotal before it can be published. No exceptions.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
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
    title: "Privacy First",
    description:
      "No fingerprinting. No tracking. IPs are hashed and download logs are purged after 90 days.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
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
    title: "Open Source",
    description:
      "The platform is fully open source. Inspect the code, report issues, or contribute on GitHub.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
    title: "DMA Compliant",
    description:
      "Built from the ground up to meet EU Digital Markets Act requirements for alternative distribution.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3"
        />
      </svg>
    ),
    title: "Developer API",
    description:
      "Publish and manage apps programmatically. Full JWT-authenticated REST API with versioned endpoints.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
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
      "Generate a scannable QR code for any app version. Sideload instantly from any device camera.",
  },
];

const FeaturesSection = () => (
  <section className="border-y border-zinc-800">
    {/* Header */}
    <div className="px-6 py-16 text-center md:py-20">
      <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
        What We{" "}
        <span className="italic" style={{ color: "#1eff00" }}>
          Stand For
        </span>
      </h2>
      <p className="mx-auto mt-4 max-w-md text-base text-zinc-400">
        Built on principles that put users first — not algorithms, not ad revenue.
      </p>
    </div>

    {/* 3-col feature grid, full-bleed with border dividers */}
    <div className="grid grid-cols-1 border-t border-zinc-800 md:grid-cols-3">
      {FEATURES.map(({ icon, title, description }, i) => (
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
          {/* Green icon box — matches reference */}
          <div
            className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl"
            style={{
              background: "linear-gradient(135deg, #1eff00 0%, #15b100 100%)",
              color: "#000",
            }}
          >
            {icon}
          </div>
          <h3 className="font-display mb-3 text-xl font-semibold text-white">{title}</h3>
          <p className="text-sm leading-6 text-zinc-400">{description}</p>
        </div>
      ))}
    </div>
  </section>
);

/* ──────────────────────────────── FAQ Section ────────────────────────────── */

const FAQ_ITEMS = [
  {
    question: "Is AltStore legal in the EU?",
    answer:
      "Yes. AltStore operates under the EU Digital Markets Act (DMA), which requires Apple and Google to allow alternative app marketplaces in the European Union.",
  },
  {
    question: "How do you ensure apps are safe?",
    answer:
      "Every APK is scanned using VirusTotal's multi-engine API before it can be approved and published. Apps with any positive detection are automatically rejected.",
  },
  {
    question: "What data do you collect?",
    answer:
      "We collect the minimum required: a hashed (SHA-256) version of your IP for rate limiting, and download counts per app version. No personal profiles, no ad tracking. Download logs are deleted after 90 days.",
  },
  {
    question: "How do I publish my app?",
    answer:
      "Sign in with your developer account, upload your APK, fill in the store listing, and submit for review. Our automated scanner checks the binary immediately. Human review follows within 48 hours.",
  },
  {
    question: "Is the source code available?",
    answer:
      "Yes. AltStore is fully open source. You can inspect the code, submit issues, and contribute at our GitHub repository.",
  },
];

const FaqSection = () => (
  <section className="border-b border-zinc-800">
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* Left column — title */}
      <div className="flex flex-col justify-center border-b border-zinc-800 px-10 py-16 md:border-b-0 md:border-r md:px-14 md:py-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
          &quot;GENERAL&quot;
        </p>
        <h2 className="font-display text-4xl font-extrabold leading-tight text-white md:text-5xl">
          Asked Questions.
        </h2>
        <p className="mt-5 max-w-xs text-sm leading-6 text-zinc-400">
          Everything you need to know about AltStore, app safety, and how we protect your privacy.
        </p>
      </div>

      {/* Right column — accordion */}
      <div className="divide-y divide-zinc-800">
        {FAQ_ITEMS.map(({ question, answer }) => (
          <FaqItem key={question} question={question} answer={answer} />
        ))}
      </div>
    </div>
  </section>
);

const FaqItem = ({ question, answer }: { question: string; answer: string }) => (
  <details className="group px-8 py-6">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
      <span className="text-sm font-medium text-white md:text-base">{question}</span>
      <span
        className="flex-shrink-0 transition-transform duration-300 group-open:rotate-45"
        style={{ color: "#1eff00" }}
      >
        <svg
          width="22"
          height="22"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </span>
    </summary>
    <p className="mt-4 text-sm leading-6 text-zinc-400">{answer}</p>
  </details>
);

export default HomePage;
