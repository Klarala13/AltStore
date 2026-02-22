import type { Metadata } from "next";
import { AuthProvider } from "@/components/AuthProvider";
import { HeaderAuth } from "@/components/HeaderAuth";
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

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white antialiased">
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
};

const Header = () => (
  <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/50 backdrop-blur-sm">
    <div className="mx-4 flex items-center justify-between py-4 md:mx-16 lg:mx-24 xl:mx-32">
      <a href="/" className="font-display text-lg font-bold tracking-tight text-white">
        AltStore
      </a>
      <nav className="hidden items-center gap-8 md:flex">
        <NavLink href="/">Apps</NavLink>
        <NavLink href="/search">Search</NavLink>
        <NavLink href="/developers">Developers</NavLink>
      </nav>
      <div className="flex items-center gap-3">
        <HeaderAuth />
      </div>
    </div>
  </header>
);

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-sm font-medium text-zinc-300 transition-colors duration-200 hover:text-white"
  >
    {children}
  </a>
);

const Footer = () => (
  <footer className="mt-32 border-t border-gray-800">
    <div className="mx-4 md:mx-16 lg:mx-24 xl:mx-32">
      {/* Top row */}
      <div className="flex flex-col gap-8 py-12 md:flex-row md:justify-between">
        <div className="max-w-xs">
          <a href="/" className="font-display text-lg font-bold text-white">
            AltStore
          </a>
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
              { label: "Categories", href: "/categories" },
              { label: "New Releases", href: "/new" },
            ]}
          />
          <FooterGroup
            title="Developers"
            links={[
              { label: "Submit App", href: "/developers" },
              { label: "API Docs", href: "/docs" },
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
      <div className="flex flex-col items-start justify-between gap-3 border-t border-gray-800 py-6 md:flex-row md:items-center">
        <p className="text-xs text-zinc-500">
          &copy; {new Date().getFullYear()} AltStore. DMA-compliant &middot; EU.
        </p>
        <span className="badge-accent text-xs">EU Marketplace</span>
      </div>
    </div>
  </footer>
);

const FooterGroup = ({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) => (
  <div>
    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">{title}</p>
    <ul className="space-y-2">
      {links.map(({ label, href }) => (
        <li key={label}>
          <a
            href={href}
            className="text-sm text-zinc-400 transition-colors duration-150 hover:text-white"
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default RootLayout;
