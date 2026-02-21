import type { AppCardDto } from "@altstore/types";
import { AppCard } from "@/components/AppCard";
import { MOCK_APPS } from "@/lib/mock-data";

const HomePage = async () => {
  const apps: AppCardDto[] = MOCK_APPS;

  return (
    <div className="mx-auto max-w-6xl px-6 md:px-8">
      <section
        className="py-24 md:py-32"
        style={{
          background:
            "radial-gradient(70% 60% at center 0%, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0) 70%)",
        }}
      >
        <div className="mb-8 flex justify-center">
          <span className="badge-green">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: "#62ffb3" }}
            />
            DMA-compliant &middot; EU
          </span>
        </div>

        <h1
          className="text-center text-5xl font-semibold tracking-tight md:text-6xl lg:text-7xl"
          style={{ color: "#f8f8f8", lineHeight: 1.1 }}
        >
          Apps you can trust.
          <br />
          <span style={{ color: "#555" }}>Downloaded safely.</span>
        </h1>

        <p
          className="mx-auto mt-6 max-w-lg text-center text-base leading-relaxed"
          style={{ color: "#666" }}
        >
          Every app scanned before publishing. Your privacy protected by design.
          Open source, zero tracking.
        </p>

        <div className="mt-10 flex items-center justify-center gap-3">
          <a href="/" className="btn-primary">
            Browse apps
          </a>
          <a href="/login" className="btn-secondary">
            For developers
          </a>
        </div>
      </section>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />

      <section className="py-16 md:py-20">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-lg font-semibold" style={{ color: "#f8f8f8" }}>
            All Apps
          </h2>
          <CategoryBar />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {apps.map((app) => (
            <AppCard key={app.id} {...app} />
          ))}
        </div>
      </section>
    </div>
  );
};

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
      <a
        key={label}
        href={active ? "/" : `/category/${label.toLowerCase()}`}
        className="rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-150"
        style={{
          color: active ? "#f8f8f8" : "#777",
          backgroundColor: active ? "rgba(255,255,255,0.08)" : "transparent",
          border: "1px solid",
          borderColor: active ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.07)",
        }}
      >
        {label}
      </a>
    ))}
  </div>
);

export default HomePage;
