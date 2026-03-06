import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Link from "next/link";
import type { Route } from "next";
import { authOptions } from "@/lib/auth";

const NAV_ITEMS: { href: Route; label: string; icon: React.ReactNode }[] = [
  {
    href: "/admin" as Route,
    label: "Review Queue",
    icon: (
      <svg
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.75}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
  },
  {
    href: "/admin/security-logs" as Route,
    label: "Security Logs",
    icon: (
      <svg
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.75}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
];

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  // Check isAdmin flag embedded in session token
  const isAdmin = (session as { isAdmin?: boolean }).isAdmin;
  if (!isAdmin) redirect("/");

  return (
    <div className="flex min-h-[calc(100vh-65px)]">
      <aside className="hidden w-56 shrink-0 flex-col border-r border-zinc-800/60 bg-zinc-950 lg:flex">
        <div className="flex flex-col gap-1 px-3 py-6">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-zinc-600">
            Admin Panel
          </p>
          {NAV_ITEMS.map(({ href, label, icon }) => (
            <Link
              key={String(href)}
              href={href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition-colors duration-150 hover:bg-white/5 hover:text-white"
            >
              {icon}
              {label}
            </Link>
          ))}
        </div>

        <div className="mt-auto border-t border-zinc-800/60 px-3 py-4">
          <div className="rounded-lg px-3 py-2">
            <p className="truncate text-xs font-medium text-zinc-300">
              {session.user?.name ?? session.user?.email}
            </p>
            <p className="mt-0.5 truncate text-xs text-zinc-600">Administrator</p>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1 px-4 py-8 md:px-8 lg:px-12">{children}</div>
    </div>
  );
};

export default AdminLayout;
