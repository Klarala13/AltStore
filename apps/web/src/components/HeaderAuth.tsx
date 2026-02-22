"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const HeaderAuth = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div
        className="h-7 w-20 animate-pulse rounded-lg bg-white/5"
        role="status"
        aria-busy="true"
        aria-label="Loading sign-in status"
      />
    );
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-500">{session.user?.name}</span>
        <button onClick={() => signOut({ callbackUrl: "/" })} className="sign-out-btn text-sm">
          Sign out
        </button>
      </div>
    );
  }

  return (
    <Link href="/login" className="btn-primary px-4 py-2 text-sm">
      Sign in
    </Link>
  );
};

export { HeaderAuth };
