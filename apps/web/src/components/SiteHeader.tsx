import Link from "next/link";
import { NavLink } from "@/components/SiteNav";
import { MobileNav } from "@/components/SiteNav";
import { HeaderAuth } from "@/components/HeaderAuth";

/**
 * Site-wide header shell — Server Component.
 * Only NavLink (active state) and MobileNav (drawer) cross the client boundary;
 * the static shell stays on the server.
 */
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
