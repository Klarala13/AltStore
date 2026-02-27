import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Link from "next/link";
import type { Route } from "next";
import { authOptions } from "@/lib/auth";

// ---------------------------------------------------------------------------
// Sidebar nav items
// ---------------------------------------------------------------------------

const NAV_ITEMS: { href: Route; label: string; icon: React.ReactNode }[] = [
  {
    href: "/dashboard" as Route,
    label: "My Apps",
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
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />
      </svg>
    ),
  },
  {
    href: "/dashboard/apps/new" as Route,
    label: "Submit App",
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
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
];

// ---------------------------------------------------------------------------
// Dashboard layout — server component, auth guard
// ---------------------------------------------------------------------------

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const developerName = session.user?.name ?? session.user?.email ?? "Developer";

  return (
    <div className="flex min-h-[calc(100vh-65px)]">
      {/* Sidebar */}
      <aside className="hidden w-56 shrink-0 flex-col border-r border-zinc-800/60 bg-zinc-950 lg:flex">
        <div className="flex flex-col gap-1 px-3 py-6">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-zinc-600">
            Developer Portal
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
            <p className="truncate text-xs font-medium text-zinc-300">{developerName}</p>
            <p className="mt-0.5 truncate text-xs text-zinc-600">{session.user?.email}</p>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="min-w-0 flex-1 px-4 py-8 md:px-8 lg:px-12">{children}</div>
    </div>
  );
};

export default DashboardLayout;
