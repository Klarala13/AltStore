import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";
import { safeCallbackUrl } from "@/lib/safe-callback-url";

export const metadata: Metadata = {
  title: "Sign In — Appia",
  description: "Sign in to your Appia account.",
};

interface Props {
  searchParams: Promise<{ callbackUrl?: string | string[] }>;
}

const LoginPage = async ({ searchParams }: Props) => {
  const { callbackUrl } = await searchParams;
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center px-6 py-16">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(50% 50% at 50% 0%, rgba(30,255,0,0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <AuthForm defaultMode="login" callbackUrl={safeCallbackUrl(callbackUrl)} />
    </div>
  );
};

export default LoginPage;
