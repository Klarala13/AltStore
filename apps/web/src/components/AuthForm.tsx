"use client";

import { useState } from "react";
import { useEffect } from "react";
import type { Route } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getProviders, signIn } from "next-auth/react";

type Mode = "login" | "register";

interface AuthFormProps {
  defaultMode?: Mode;
  callbackUrl?: string;
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

const inputClass =
  "w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 transition-colors duration-150 hover:border-zinc-700 focus:border-zinc-600 focus:outline-none";

const GENERIC_ERROR = "Something went wrong. Please try again.";

const AuthForm = ({ defaultMode = "login", callbackUrl = "/" }: AuthFormProps) => {
  const router = useRouter();
  const isLogin = defaultMode === "login";
  const callbackQuery =
    callbackUrl === "/" ? "" : `?callbackUrl=${encodeURIComponent(callbackUrl)}`;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [providers, setProviders] = useState<Record<string, { id: string }> | null>(null);

  useEffect(() => {
    let mounted = true;

    void getProviders().then((nextProviders) => {
      if (mounted) {
        setProviders((nextProviders ?? null) as Record<string, { id: string }> | null);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const hasProvider = (providerId: string): boolean => Boolean(providers?.[providerId]);

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

        router.push(callbackUrl as Route);
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
          router.push(`/login${callbackQuery}` as Route);
          return;
        }

        router.push(callbackUrl as Route);
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
          <span className="font-display text-2xl font-bold text-white">Appia</span>
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
            onClick={() => router.push(`/login${callbackQuery}` as Route)}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-all duration-200 ${
              isLogin ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => router.push(`/register${callbackQuery}` as Route)}
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

        {/* Google is the only social provider for the MVP. GitHub and Apple were
            removed rather than left disabled: a dead button on the sign-up
            screen costs users. Re-adding them is a button plus their env vars —
            auth.ts still registers each provider when its credentials exist. */}
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl })}
          disabled={loading || !hasProvider("google")}
          className="btn-secondary flex h-11 w-full items-center justify-center gap-2.5 text-sm disabled:opacity-60"
        >
          <GoogleIcon />
          Google
        </button>

        {providers && !hasProvider("google") && (
          <p className="mt-3 text-xs text-zinc-500">
            Google sign-in is temporarily unavailable. Use your email and password.
          </p>
        )}

        {/* Toggle hint */}
        <p className="mt-5 text-center text-xs text-zinc-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() =>
              router.push(`${isLogin ? "/register" : "/login"}${callbackQuery}` as Route)
            }
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
