"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const HeaderAuth = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="h-7 w-20 animate-pulse rounded-lg" style={{ background: "var(--bg-overlay)" }} />;
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm" style={{ color: "var(--text-muted)" }}>
          {session.user?.name}
        </span>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="sign-out-btn text-sm"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <Link href="/login" className="btn-secondary px-4 py-1.5 text-sm">
      Sign in
    </Link>
  );
};

export { HeaderAuth };
