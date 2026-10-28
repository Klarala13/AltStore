import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

/**
 * POST /api/apps/[id]/images/upload-url — paso del alta de imagen de ficha.
 *
 * Solo mueve JSON. Los bytes de la imagen van del navegador al almacen
 * directamente, igual que el APK.
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
    const res = await fetch(`${process.env.API_URL}/apps/${id}/images/upload-url`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(await req.json()),
    });

    const data: unknown = await res.json().catch(() => ({ message: "Could not upload the image" }));
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ message: "Could not upload the image" }, { status: 502 });
  }
}
