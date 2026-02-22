import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppCard } from "@/components/AppCard";
import { MOCK_APPS } from "@/lib/mock-data";

type Props = { params: Promise<{ slug: string }> };

const toLabel = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
const toCategory = (slug: string) => slug.toUpperCase();

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params;
  const label = toLabel(slug);
  return {
    title: `${label} Apps`,
    description: `Browse ${label} apps on AltStore — EU's DMA-compliant app marketplace. Virus-scanned, GDPR-compliant.`,
  };
};

export const generateStaticParams = () => {
  const slugs = Array.from(new Set(MOCK_APPS.map((a) => a.category.toLowerCase())));
  return slugs.map((slug) => ({ slug }));
};

const CategoryPage = async ({ params }: Props) => {
  const { slug } = await params;
  const category = toCategory(slug);
  const apps = MOCK_APPS.filter((a) => a.category === category);

  if (apps.length === 0) notFound();

  const label = toLabel(slug);

  return (
    <>
      {/* Header */}
      <section className="border-b border-zinc-800 px-6 py-16 md:px-16 lg:px-24 xl:px-32">
        <a
          href="/categories"
          className="mb-5 inline-flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-white"
        >
          <svg
            width="14"
            height="14"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          All Categories
        </a>

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Category
            </p>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              {label} <span style={{ color: "#1eff00" }}>Apps</span>
            </h1>
            <p className="mt-3 text-base text-zinc-400">
              {apps.length} {apps.length === 1 ? "app" : "apps"} in this category
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 py-12 md:px-16 lg:px-24 xl:px-32">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {apps.map((app) => (
            <AppCard key={app.id} {...app} />
          ))}
        </div>

        {/* Browse other categories */}
        <div className="mt-16 border-t border-zinc-800 pt-10">
          <p className="mb-5 text-sm text-zinc-500">Browse other categories</p>
          <div className="flex flex-wrap gap-3">
            {Array.from(new Set(MOCK_APPS.map((a) => a.category)))
              .filter((c) => c !== category)
              .map((c) => (
                <a
                  key={c}
                  href={`/category/${c.toLowerCase()}`}
                  className="rounded-full border border-zinc-800 px-4 py-1.5 text-xs font-medium text-zinc-400 transition-all duration-200 hover:border-zinc-600 hover:text-white"
                >
                  {toLabel(c)}
                </a>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryPage;
