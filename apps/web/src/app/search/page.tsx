import { MOCK_APPS } from "@/lib/mock-data";
import { SearchClient } from "./SearchClient";

const SearchPage = () => (
  <>
    {/* ── Page header — static, server-rendered ── */}
    <section className="border-b border-zinc-800 px-6 py-16 md:px-16 lg:px-24 xl:px-32">
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
        Search <span style={{ color: "#1eff00" }}>Apps</span>
      </h1>
      <p className="mt-3 max-w-md text-base text-zinc-400">
        Browse all {MOCK_APPS.length} apps or search by name, description, or category.
      </p>

      {/* Search input, filter chips, and results — interactive, client boundary */}
      <SearchClient />
    </section>
  </>
);

export default SearchPage;
