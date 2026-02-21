import type { AppCardDto } from "@altstore/types";
import { AppCard } from "@/components/AppCard";
import { MOCK_APPS } from "@/lib/mock-data";

// Server Component — will fetch from NestJS API once backend is ready
const HomePage = async () => {
  const apps: AppCardDto[] = MOCK_APPS;

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
      {/* Hero */}
      <section className="mb-16 md:mb-24">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-gray-400">
          EU Alternative Marketplace
        </p>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl">
          Apps you can trust.
          <br />
          Downloaded safely.
        </h1>
        <p className="mt-6 max-w-xl text-base text-gray-500">
          DMA-compliant. Every app scanned before publishing. Your privacy protected by design.
        </p>
      </section>

      {/* Category filters */}
      <CategoryBar />

      {/* App grid */}
      <section>
        <h2 className="mb-8 text-2xl font-semibold text-gray-900">All Apps</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {apps.map((app) => (
            <AppCard key={app.id} {...app} />
          ))}
        </div>
      </section>
    </div>
  );
};

const CATEGORIES = [
  { label: "All", href: "/" },
  { label: "Productivity", href: "/category/productivity" },
  { label: "Tools", href: "/category/tools" },
  { label: "Social", href: "/category/social" },
  { label: "Entertainment", href: "/category/entertainment" },
  { label: "Education", href: "/category/education" },
];

const CategoryBar = () => (
  <div className="mb-10 flex flex-wrap gap-2">
    {CATEGORIES.map(({ label, href }) => (
      <a
        key={label}
        href={href}
        className="rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-600 transition hover:border-gray-400 hover:text-gray-900"
      >
        {label}
      </a>
    ))}
  </div>
);

export default HomePage;
