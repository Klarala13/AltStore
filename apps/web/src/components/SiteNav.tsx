"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { HeaderAuth } from "@/components/HeaderAuth";

// ---------------------------------------------------------------------------
// NavLink — desktop nav item with active-page indicator
// ---------------------------------------------------------------------------

export const NavLink = ({ href, children }: { href: Route; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={[
        "text-sm font-medium transition-colors duration-200",
        isActive ? "text-white" : "text-zinc-300 hover:text-white",
      ].join(" ")}
    >
      {children}
    </Link>
  );
};

// ---------------------------------------------------------------------------
// Mobile navigation drawer
// ---------------------------------------------------------------------------

const NAV_LINKS: { href: Route; label: string }[] = [
  { href: "/", label: "Apps" },
  { href: "/search", label: "Search" },
  { href: "/developers", label: "Developers" },
];

export const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Close drawer on route change — setState in effect is intentional here
  // (synchronising drawer state with external navigation events)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  // Close on Escape; prevent body scroll while open
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Hamburger trigger — visible only below md */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        className="flex items-center justify-center rounded-lg p-2 text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1eff00] md:hidden"
      >
        <svg
          width="22"
          height="22"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={[
          "fixed right-0 top-0 z-50 flex h-full w-72 flex-col border-l border-zinc-800 bg-zinc-950 transition-transform duration-300 ease-in-out md:hidden",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
          <Link href="/" className="font-display text-lg font-bold text-white">
            AltStore
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="rounded-lg p-2 text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1eff00]"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 px-4 py-6" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={String(href)}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-150",
                  isActive
                    ? "bg-white/5 text-white"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Sign-in CTA at bottom */}
        <div className="mt-auto border-t border-zinc-800 px-6 py-6">
          <Link href="/login" className="btn-primary w-full justify-center">
            Sign in
          </Link>
        </div>
      </div>
    </>
  );
};

// ---------------------------------------------------------------------------
// Header — composed from server-safe shell + client sub-components
// ---------------------------------------------------------------------------

export const SiteHeader = () => (
  <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/50 backdrop-blur-sm">
    <div className="mx-4 flex items-center justify-between py-4 md:mx-16 lg:mx-24 xl:mx-32">
      <Link href="/" className="font-display text-lg font-bold tracking-tight text-white">
        AltStore
      </Link>
      <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
        <NavLink href="/">Apps</NavLink>
        <NavLink href="/search">Search</NavLink>
        <NavLink href="/developers">Developers</NavLink>
      </nav>
      <div className="flex items-center gap-3">
        <HeaderAuth />
        <MobileNav />
      </div>
    </div>
  </header>
);
