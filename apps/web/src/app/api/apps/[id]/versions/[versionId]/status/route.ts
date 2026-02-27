import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

/**
 * GET /api/apps/[id]/versions/[versionId]/status
 * Polls NestJS for the current scan status of a version.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; versionId: string }> }
): Promise<NextResponse> {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const accessToken = (session as { accessToken?: string }).accessToken;
  if (!accessToken) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id, versionId } = await params;

  const res = await fetch(`${process.env.API_URL}/apps/${id}/versions/${versionId}/status`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    next: { revalidate: 0 },
  });

  const data: unknown = await res.json();
  return NextResponse.json(data, { status: res.status });
}
