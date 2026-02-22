import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import { AuthProvider } from "@/components/AuthProvider";
import { SiteHeader } from "@/components/SiteNav";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AltStore — European App Marketplace",
    template: "%s | AltStore",
  },
  description:
    "DMA-compliant alternative app marketplace for Android apps in the EU. Secure, open, and privacy-first.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

// ---------------------------------------------------------------------------
// Skip link — visually hidden until focused by keyboard
// ---------------------------------------------------------------------------

const SkipLink = () => (
  <a
    href="#content"
    className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-black focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-[#1eff00]"
  >
    Skip to content
  </a>
);

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

const FooterGroup = ({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: Route }[];
}) => (
  <div>
    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">{title}</p>
    <ul className="space-y-2">
      {links.map(({ label, href }) => (
        <li key={label}>
          <Link
            href={href}
            className="text-sm text-zinc-400 transition-colors duration-150 hover:text-white"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => (
  <footer className="mt-32 border-t border-zinc-800">
    <div className="mx-4 md:mx-16 lg:mx-24 xl:mx-32">
      {/* Top row */}
      <div className="flex flex-col gap-8 py-12 md:flex-row md:justify-between">
        <div className="max-w-xs">
          <Link href="/" className="font-display text-lg font-bold text-white">
            AltStore
          </Link>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            A DMA-compliant alternative app marketplace for the EU. Every app scanned. Zero
            tracking.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          <FooterGroup
            title="Marketplace"
            links={[
              { label: "Browse Apps", href: "/" },
              { label: "Categories", href: "/categories" as Route },
              { label: "New Releases", href: "/new" as Route },
            ]}
          />
          <FooterGroup
            title="Developers"
            links={[
              { label: "Submit App", href: "/developers" },
              { label: "API Docs", href: "/docs" as Route },
              { label: "Sign In", href: "/login" },
            ]}
          />
          <FooterGroup
            title="Legal"
            links={[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "GDPR", href: "/gdpr" },
            ]}
          />
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex flex-col items-start justify-between gap-3 border-t border-zinc-800 py-6 md:flex-row md:items-center">
        <p className="text-xs text-zinc-500">
          &copy; {new Date().getFullYear()} AltStore. DMA-compliant &middot; EU.
        </p>
        <span className="badge-accent text-xs">EU Marketplace</span>
      </div>
    </div>
  </footer>
);

// ---------------------------------------------------------------------------
// Root layout
// ---------------------------------------------------------------------------

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white antialiased">
        <SkipLink />
        <AuthProvider>
          <SiteHeader />
          <main id="content">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
