import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Create Account — AltStore",
  description: "Create your AltStore account.",
};

const RegisterPage = () => {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center px-6 py-16">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(50% 50% at 50% 0%, rgba(30,255,0,0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <AuthForm defaultMode="register" />
    </div>
  );
};

export default RegisterPage;
