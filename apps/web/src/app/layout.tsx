import type { Metadata } from "next";
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
      <body className="min-h-screen bg-white">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

const Header = () => (
  <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
      <a href="/" className="text-lg font-semibold tracking-tight text-gray-900">
        AltStore
      </a>
      <nav className="hidden items-center gap-8 md:flex">
        <a href="/category/productivity" className="text-sm text-gray-500 transition hover:text-gray-900">
          Apps
        </a>
        <a href="/search" className="text-sm text-gray-500 transition hover:text-gray-900">
          Search
        </a>
        <a href="/login" className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white transition hover:bg-gray-700">
          Sign in
        </a>
      </nav>
    </div>
  </header>
);

const Footer = () => (
  <footer className="mt-24 border-t border-gray-200 bg-white">
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <p className="text-sm font-semibold text-gray-900">AltStore</p>
        <p className="text-sm text-gray-400">
          DMA-compliant marketplace &middot; EU &middot;{" "}
          <a href="/privacy" className="underline hover:text-gray-600">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  </footer>
);

export default RootLayout;
