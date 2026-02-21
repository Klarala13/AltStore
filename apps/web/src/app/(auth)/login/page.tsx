import type { Metadata } from "next";
import { LoginButton } from "@/components/LoginButton";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to AltStore",
};

const LoginPage = () => {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col items-center justify-center px-6">
      <div
        className="w-full rounded-2xl p-8"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Sign in to AltStore
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            Access your developer dashboard or track your downloads.
          </p>
        </div>

        <div className="space-y-3">
          <LoginButton />
        </div>

        <p className="mt-6 text-center text-xs" style={{ color: "var(--text-muted)" }}>
          By signing in you agree to our{" "}
          <a
            href="/terms"
            className="underline transition-colors duration-150"
            style={{ color: "var(--text-secondary)" }}
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="underline transition-colors duration-150"
            style={{ color: "var(--text-secondary)" }}
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
