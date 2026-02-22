import type { Metadata } from "next";
import { LoginButton } from "@/components/LoginButton";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to AltStore",
};

const LoginPage = () => {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center px-6">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(50% 50% at 50% 0%, rgba(30,255,0,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Card */}
        <div className="rounded-2xl border border-gray-800 bg-white/[0.02] p-8">
          <div className="mb-8 text-center">
            <span className="font-display text-2xl font-bold text-white">AltStore</span>
            <p className="mt-2 text-sm text-zinc-400">
              Sign in to access your developer dashboard or track downloads.
            </p>
          </div>

          <LoginButton />

          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-800" />
            <span className="text-xs text-zinc-600">or continue as guest</span>
            <div className="h-px flex-1 bg-gray-800" />
          </div>

          <a
            href="/"
            className="mt-4 flex w-full items-center justify-center rounded-lg py-2.5 text-sm text-zinc-500 transition-colors duration-150 hover:text-zinc-300"
          >
            Browse apps without signing in
          </a>
        </div>

        {/* Legal note */}
        <p className="mt-6 text-center text-xs text-zinc-600">
          By signing in you agree to our{" "}
          <a href="/terms" className="text-zinc-400 underline transition-colors hover:text-white">
            Terms
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-zinc-400 underline transition-colors hover:text-white">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
