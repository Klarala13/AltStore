"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type Mode = "login" | "register";

interface AuthFormProps {
  defaultMode?: Mode;
}

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true" className="shrink-0">
    <path
      fill="#4285F4"
      d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
    />
    <path
      fill="#34A853"
      d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
    />
    <path
      fill="#FBBC05"
      d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"
    />
    <path
      fill="#EA4335"
      d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="shrink-0"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const AppleIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="shrink-0"
  >
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const inputClass =
  "w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 transition-colors duration-150 hover:border-zinc-700 focus:border-zinc-600 focus:outline-none";

const GENERIC_ERROR = "Something went wrong. Please try again.";

const AuthForm = ({ defaultMode = "login" }: AuthFormProps) => {
  const router = useRouter();
  const isLogin = defaultMode === "login";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          setError("Invalid email or password.");
          return;
        }

        router.push("/");
        router.refresh();
      } else {
        // Register via Next.js API route → NestJS
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            name,
            password,
            // Default values required by NestJS DTO — developer type selection
            // can be added to the form in a later iteration
            type: "INDIVIDUAL",
            country: "EU",
          }),
        });

        if (res.status === 409) {
          setError("An account with this email already exists.");
          return;
        }

        if (!res.ok) {
          setError(GENERIC_ERROR);
          return;
        }

        // Auto sign-in after successful registration
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          // Registration succeeded but auto-login failed — redirect to login
          router.push("/login");
          return;
        }

        router.push("/");
        router.refresh();
      }
    } catch {
      setError(GENERIC_ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-sm">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 -top-24 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(30,255,0,0.12) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Card */}
      <div className="relative rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 backdrop-blur-sm">
        {/* Header */}
        <div className="mb-6 text-center">
          <span className="font-display text-2xl font-bold text-white">AltStore</span>
          <p className="mt-1.5 text-sm text-zinc-400">
            {isLogin
              ? "Welcome back. Sign in to your account."
              : "Create an account to get started."}
          </p>
        </div>

        {/* Mode toggle tabs — Register navigates, Sign In navigates */}
        <div className="mb-6 flex rounded-lg border border-zinc-800 bg-zinc-900/60 p-1">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-all duration-200 ${
              isLogin ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => router.push("/register")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-all duration-200 ${
              !isLogin ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Register
          </button>
        </div>

        {/* Error banner */}
        {error && (
          <div
            role="alert"
            className="mb-4 rounded-lg border border-red-900/60 bg-red-950/40 px-3.5 py-2.5 text-sm text-red-400"
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div>
              <label htmlFor="auth-name" className="mb-1.5 block text-xs font-medium text-zinc-400">
                Full Name
              </label>
              <input
                id="auth-name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
                className={inputClass}
              />
            </div>
          )}

          <div>
            <label htmlFor="auth-email" className="mb-1.5 block text-xs font-medium text-zinc-400">
              Email
            </label>
            <input
              id="auth-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className={inputClass}
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="auth-password" className="block text-xs font-medium text-zinc-400">
                Password
              </label>
              {isLogin && (
                <a
                  href="/forgot-password"
                  className="text-xs text-zinc-500 transition-colors hover:text-zinc-300"
                >
                  Forgot password?
                </a>
              )}
            </div>
            <input
              id="auth-password"
              type="password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              placeholder={isLogin ? "Your password" : "Create a password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className={inputClass}
            />
          </div>

          {!isLogin && (
            <div>
              <label
                htmlFor="auth-confirm-password"
                className="mb-1.5 block text-xs font-medium text-zinc-400"
              >
                Repeat Password
              </label>
              <input
                id="auth-confirm-password"
                type="password"
                autoComplete="new-password"
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
                className={inputClass}
              />
            </div>
          )}

          {/* Remember me */}
          <label className="flex cursor-pointer items-center gap-2.5">
            <span className="relative flex h-[18px] w-[18px] shrink-0">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
                className="peer h-[18px] w-[18px] cursor-pointer appearance-none rounded border border-zinc-700 bg-zinc-900 transition-colors duration-150 checked:border-[var(--accent)] checked:bg-[var(--accent)] hover:border-zinc-500"
              />
              <svg
                className="pointer-events-none absolute inset-0 m-auto h-3 w-3 opacity-0 transition-opacity peer-checked:opacity-100"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 6l3 3 5-5"
                  stroke="#000"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-sm text-zinc-400">Remember me</span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary mt-1 w-full py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? isLogin
                ? "Signing in…"
                : "Creating account…"
              : isLogin
                ? "Sign In"
                : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-xs text-zinc-600">or continue with</span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        {/* Social logins — equal width and height */}
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            disabled={loading}
            className="btn-secondary flex h-11 flex-1 items-center justify-center gap-2.5 text-sm disabled:opacity-60"
          >
            <GoogleIcon />
            Google
          </button>
          <button
            type="button"
            disabled={loading}
            className="btn-secondary flex h-11 flex-1 items-center justify-center gap-2.5 text-sm disabled:opacity-60"
          >
            <GitHubIcon />
            GitHub
          </button>
          <button
            type="button"
            disabled={loading}
            className="btn-secondary flex h-11 flex-1 items-center justify-center gap-2.5 text-sm disabled:opacity-60"
          >
            <AppleIcon />
            Apple
          </button>
        </div>

        {/* Toggle hint */}
        <p className="mt-5 text-center text-xs text-zinc-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => router.push(isLogin ? "/register" : "/login")}
            className="font-medium text-zinc-400 underline-offset-2 transition-colors hover:text-white hover:underline"
          >
            {isLogin ? "Register" : "Sign in"}
          </button>
        </p>
      </div>

      {/* Legal */}
      <p className="mt-5 text-center text-xs text-zinc-600">
        By continuing you agree to our{" "}
        <Link
          href="/terms"
          className="text-zinc-500 underline-offset-2 transition-colors hover:text-zinc-300 hover:underline"
        >
          Terms
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="text-zinc-500 underline-offset-2 transition-colors hover:text-zinc-300 hover:underline"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
};

export { AuthForm };
