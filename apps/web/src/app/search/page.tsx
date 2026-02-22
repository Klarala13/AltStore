"use client";

import { useState, useMemo } from "react";
import { AppCard } from "@/components/AppCard";
import { MOCK_APPS } from "@/lib/mock-data";
import type { AppCardDto } from "@altstore/types";

const ALL_CATEGORIES = ["All", ...Array.from(new Set(MOCK_APPS.map((a) => a.category)))];

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const results: AppCardDto[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MOCK_APPS.filter((app) => {
      const matchesCategory = activeCategory === "All" || app.category === activeCategory;
      const matchesQuery =
        q === "" ||
        app.name.toLowerCase().includes(q) ||
        app.shortDesc.toLowerCase().includes(q) ||
        app.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  return (
    <>
      {/* ── Page header ── */}
      <section className="border-b border-zinc-800 px-6 py-16 md:px-16 lg:px-24 xl:px-32">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
          Search <span style={{ color: "#1eff00" }}>Apps</span>
        </h1>
        <p className="mt-3 max-w-md text-base text-zinc-400">
          Browse all {MOCK_APPS.length} apps or search by name, description, or category.
        </p>

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
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Category filter chips */}
        <div className="mt-5 flex flex-wrap gap-2">
          {ALL_CATEGORIES.map((cat) => {
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
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Results ── */}
      <section className="px-6 py-12 md:px-16 lg:px-24 xl:px-32">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-zinc-500">
            {results.length === 0
              ? "No apps found"
              : `${results.length} app${results.length !== 1 ? "s" : ""} found`}
            {query && (
              <span className="ml-1">
                for <span className="text-white">&ldquo;{query}&rdquo;</span>
              </span>
            )}
          </p>
          {(query || activeCategory !== "All") && (
            <button
              onClick={() => {
                setQuery("");
                setActiveCategory("All");
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
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <svg
              width="48"
              height="48"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.2}
              className="mb-4 text-zinc-700"
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
        )}
      </section>
    </>
  );
};

export default SearchPage;
