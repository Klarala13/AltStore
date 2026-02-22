import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppCard } from "@/components/AppCard";
import { MOCK_APPS } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "New Releases",
  description: "The latest apps added to AltStore — EU's DMA-compliant app marketplace.",
};

// In production this would be sorted by createdAt desc from the API.
// For now, reverse the mock array to simulate newest-first order.
const NEW_APPS = [...MOCK_APPS].reverse();

const NewReleasesPage = () => (
  <>
    {/* Header */}
    <section className="border-b border-zinc-800 px-6 py-16 md:px-16 lg:px-24 xl:px-32">
      <div className="flex items-center gap-3">
        <span
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-lg"
          style={{ background: "rgba(30,255,0,0.1)", color: "#1eff00" }}
        >
          ✦
        </span>
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          New Releases
        </span>
      </div>
      <h1 className="font-display mt-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
        Just <span style={{ color: "#1eff00" }}>Added</span>
      </h1>
      <p className="mt-3 max-w-md text-base text-zinc-400">
        The most recently published apps on AltStore — all virus-scanned before listing.
      </p>
    </section>

    {/* Featured — first app */}
    <section className="border-b border-zinc-800 px-6 py-12 md:px-16 lg:px-24 xl:px-32">
      <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-500">
        Featured New Release
      </p>
      <Link
        href={`/apps/${NEW_APPS[0].slug}`}
        className="group flex flex-col gap-6 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 transition-colors duration-200 hover:border-zinc-600 md:flex-row"
      >
        {/* Cover */}
        <div className="relative h-52 w-full flex-shrink-0 overflow-hidden bg-zinc-900 md:h-auto md:w-80">
          {NEW_APPS[0].coverUrl ? (
            <Image
              src={NEW_APPS[0].coverUrl}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(30,255,0,0.08) 0%, transparent 100%)",
              }}
            >
              <span className="font-display text-7xl font-bold text-zinc-700">
                {NEW_APPS[0].name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center p-8">
          <span className="badge-outline mb-4 self-start">{NEW_APPS[0].category}</span>
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
            {NEW_APPS[0].name}
          </h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">{NEW_APPS[0].shortDesc}</p>
          <div className="mt-6 flex items-center gap-4 text-xs text-zinc-500">
            {NEW_APPS[0].latestVersion && <span>v{NEW_APPS[0].latestVersion}</span>}
            {NEW_APPS[0].latestFileSize && <span>{NEW_APPS[0].latestFileSize}</span>}
            {NEW_APPS[0].totalDownloads && (
              <span>{NEW_APPS[0].totalDownloads.toLocaleString("en-EU")} downloads</span>
            )}
          </div>
        </div>
      </Link>
    </section>

    {/* Full grid */}
    <section className="px-6 py-12 md:px-16 lg:px-24 xl:px-32">
      <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-500">
        All Recent Additions
      </p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {NEW_APPS.slice(1).map((app) => (
          <AppCard key={app.id} {...app} />
        ))}
      </div>
    </section>
  </>
);

export default NewReleasesPage;
