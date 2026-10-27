import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

/**
 * POST /api/apps/[id]/versions/complete — confirma la subida; el API verifica el objeto en R2.
 *
 * Solo mueve JSON. El APK va del navegador a R2 directamente, porque el cuerpo
 * de una funcion de Vercel esta limitado a 4,5 MB y ningun APK real cabe.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  if (!process.env.API_URL) {
    return NextResponse.json({ message: "API_URL is not configured" }, { status: 500 });
  }

  const session = await getServerSession(authOptions);
  const accessToken = (session as { accessToken?: string } | null)?.accessToken;
  if (!accessToken) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    const res = await fetch(`${process.env.API_URL}/apps/${id}/versions/complete`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(await req.json()),
    });

    const data: unknown = await res
      .json()
      .catch(() => ({ message: "Could not finish the upload" }));
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ message: "Could not finish the upload" }, { status: 502 });
  }
}
