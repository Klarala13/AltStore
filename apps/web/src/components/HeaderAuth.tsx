"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const HeaderAuth = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div
        className="hidden h-7 w-20 animate-pulse rounded-lg bg-white/5 md:block"
        role="status"
        aria-busy="true"
        aria-label="Loading sign-in status"
      />
    );
  }

  if (session) {
    return (
      <div className="hidden items-center gap-4 md:flex">
        <Link
          href="/dashboard"
          className="text-sm text-zinc-400 transition-colors duration-150 hover:text-white"
        >
          My apps
        </Link>
        <button onClick={() => signOut({ callbackUrl: "/" })} className="sign-out-btn text-sm">
          Sign out
        </button>
      </div>
    );
  }

  return (
    <Link href="/login" className="btn-primary hidden px-4 py-2 text-sm md:inline-flex">
      Sign in
    </Link>
  );
};

export { HeaderAuth };
