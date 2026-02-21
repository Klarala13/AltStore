import type { Metadata } from "next";
import { LoginButton } from "@/components/LoginButton";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to AltStore",
};

const LoginPage = () => {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col items-center justify-center px-6">
      <div className="w-full text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Sign in</h1>
        <p className="mt-3 text-sm text-gray-500">
          Access your developer dashboard or track your downloads.
        </p>
      </div>

      <div className="mt-10 w-full space-y-3">
        <LoginButton />
      </div>

      <p className="mt-8 text-xs text-gray-400">
        By signing in you agree to our{" "}
        <a href="/terms" className="underline hover:text-gray-600">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="underline hover:text-gray-600">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
};

export default LoginPage;
