import { SearchClient } from "./SearchClient";

interface Props {
  searchParams: Promise<{ q?: string; category?: string }>;
}

const CATEGORIES = [
  "PRODUCTIVITY",
  "SOCIAL",
  "ENTERTAINMENT",
  "TOOLS",
  "EDUCATION",
  "HEALTH",
  "FINANCE",
  "GAMES",
  "PHOTOGRAPHY",
  "NAVIGATION",
  "OTHER",
];

const SearchPage = async ({ searchParams }: Props) => {
  const { q = "", category } = await searchParams;

  return (
    <>
      <section className="border-b border-zinc-800 px-6 py-16 md:px-16 lg:px-24 xl:px-32">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
          Search <span style={{ color: "#1eff00" }}>Apps</span>
        </h1>
        <p className="mt-3 max-w-md text-base text-zinc-400">
          Find apps by name, description, category, or tag.
        </p>

        <SearchClient initialQ={q} initialCategory={category} categories={CATEGORIES} />
      </section>
    </>
  );
};

export default SearchPage;
