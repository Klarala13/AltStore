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
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="min-h-screen" style={{ backgroundColor: "#000", color: "#f8f8f8" }}>
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
  <header
    className="sticky top-0 z-50 backdrop-blur-md"
    style={{ backgroundColor: "rgba(0,0,0,0.75)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
  >
    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
      <a href="/" className="text-sm font-semibold tracking-tight" style={{ color: "#f8f8f8" }}>
        AltStore
      </a>
      <nav className="hidden items-center gap-7 md:flex">
        <NavLink href="/">Apps</NavLink>
        <NavLink href="/search">Search</NavLink>
        <HeaderAuth />
      </nav>
    </div>
  </header>
);

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-sm transition-colors duration-150 hover:text-[#f8f8f8]"
    style={{ color: "#a0a0a0" }}
  >
    {children}
  </a>
);

const Footer = () => (
  <footer className="mt-32" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
    <div className="mx-auto max-w-6xl px-6 py-10 md:px-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <span className="text-sm font-semibold" style={{ color: "#f8f8f8" }}>
          AltStore
        </span>
        <div className="flex items-center gap-6">
          <FooterLink href="/privacy">Privacy Policy</FooterLink>
          <FooterLink href="/terms">Terms</FooterLink>
          <span className="text-xs" style={{ color: "#444" }}>
            DMA-compliant &middot; EU
          </span>
        </div>
      </div>
    </div>
  </footer>
);

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-xs transition-colors duration-150 hover:text-[#a0a0a0]"
    style={{ color: "#555" }}
  >
    {children}
  </a>
);

export default RootLayout;
