"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const HeaderAuth = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="h-8 w-20 animate-pulse rounded-lg bg-gray-100" />;
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">{session.user?.name}</span>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="text-sm text-gray-500 transition hover:text-gray-900"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white transition hover:bg-gray-700"
    >
      Sign in
    </Link>
  );
};

export { HeaderAuth };
