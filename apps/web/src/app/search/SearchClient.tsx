"use client";

import { useState, useEffect, useTransition, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AppCard } from "@/components/AppCard";
import type { AppCardDto } from "@altstore/types";

interface SearchResult {
  items: AppCardDto[];
  total: number;
  page: number;
  limit: number;
}

interface Props {
  initialQ: string;
  initialCategory: string | undefined;
  categories: string[];
}

const toLabel = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();

export const SearchClient = ({ initialQ, initialCategory, categories }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useState(initialQ);
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory ?? "ALL");
  const [results, setResults] = useState<AppCardDto[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchResults = useCallback(async (q: string, category: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ q, limit: "40" });
      if (category && category !== "ALL") params.set("category", category);
      const res = await fetch(`/api/search?${params.toString()}`);
      if (!res.ok) throw new Error("Search failed");
      const data: SearchResult = await res.json();
      setResults(data.items);
      setTotal(data.total);
    } catch {
      setResults([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, []);

  // Sync URL params when query/category changes
  const updateUrl = useCallback(
    (q: string, category: string) => {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (category && category !== "ALL") params.set("category", category);
      const qs = params.toString();
      startTransition(() => {
        router.replace(`${pathname}${qs ? `?${qs}` : ""}` as never, { scroll: false });
      });
    },
    [pathname, router]
  );

  // Debounced search on query change
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchResults(query, activeCategory);
      updateUrl(query, activeCategory);
    }, 250);
    return () => clearTimeout(timeout);
  }, [query, activeCategory, fetchResults, updateUrl]);

  // Initial fetch on mount
  useEffect(() => {
    fetchResults(initialQ, initialCategory ?? "ALL");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasFilters = query !== "" || activeCategory !== "ALL";

  return (
    <>
      {/* Search input */}
      <div className="mt-8 flex max-w-xl items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 transition-colors duration-200 focus-within:border-[#1eff00]">
        <svg
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          className="flex-shrink-0 text-zinc-500"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, category, or description…"
          className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
          autoFocus
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="flex-shrink-0 text-zinc-600 transition-colors hover:text-zinc-400"
            aria-label="Clear search"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Category filter chips */}
      <div className="mt-5 flex flex-wrap gap-2">
        {["ALL", ...categories].map((cat) => {
          const active = cat === activeCategory;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200"
              style={{
                color: active ? "#000" : "#71717a",
                backgroundColor: active ? "#1eff00" : "transparent",
                border: "1px solid",
                borderColor: active ? "#1eff00" : "rgba(255,255,255,0.1)",
              }}
            >
              {cat === "ALL" ? "All" : toLabel(cat)}
            </button>
          );
        })}
      </div>

      {/* Results */}
      <section className="px-6 py-12 md:px-16 lg:px-24 xl:px-32">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-zinc-500">
            {loading || isPending ? (
              <span>Searching…</span>
            ) : total === 0 ? (
              "No apps found"
            ) : (
              <>
                {total} app{total !== 1 ? "s" : ""} found
                {query && (
                  <span className="ml-1">
                    for <span className="text-white">&ldquo;{query}&rdquo;</span>
                  </span>
                )}
              </>
            )}
          </p>
          {hasFilters && (
            <button
              onClick={() => {
                setQuery("");
                setActiveCategory("ALL");
              }}
              className="text-xs text-zinc-500 underline underline-offset-2 transition-colors hover:text-white"
            >
              Clear filters
            </button>
          )}
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((app) => (
              <AppCard key={app.id} {...app} />
            ))}
          </div>
        ) : (
          !loading && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <svg
                width="48"
                height="48"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.2}
                className="mb-4 text-zinc-700"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
              <p className="text-base font-medium text-zinc-400">No results found</p>
              <p className="mt-1 text-sm text-zinc-600">
                Try a different keyword or clear your filters.
              </p>
            </div>
          )
        )}
      </section>
    </>
  );
};
