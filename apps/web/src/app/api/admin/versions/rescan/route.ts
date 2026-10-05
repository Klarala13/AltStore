import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

/**
 * POST /api/admin/versions/rescan
 * Thin proxy → NestJS POST /admin/versions/rescan (requires admin).
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const isAdmin = (session as { isAdmin?: boolean }).isAdmin;
  if (!isAdmin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const accessToken = (session as { accessToken?: string }).accessToken;
  if (!accessToken) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body: unknown = await req.json();

  const res = await fetch(`${process.env.API_URL}/admin/versions/rescan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  const data: unknown = await res.json().catch(() => ({ message: "Unexpected response" }));
  return NextResponse.json(data, { status: res.status });
}
