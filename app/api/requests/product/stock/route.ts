// If you need to use http for mobile apps or n8n 3rd party integration, use endpoints
import { NextRequest, NextResponse } from "next/server";
import { stockRequest } from "@/lib/actions/stockRequest";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  const productId = body?.productId as string | undefined;
  if (!productId) {
    return NextResponse.json(
      {
        error: "Product ID is required",
      },
      { status: 400 },
    );
  }
  try {
    const res = await stockRequest({
      productId,
      userId: session.user.id,
    });
    return NextResponse.json(res, { status: 201 });
  } catch (e) {
    const message = (e as Error).message;

    if (message === "EXISTING_REQUEST") {
      return NextResponse.json({ error: "Already requested" }, { status: 400 });
    }
    if (message === "INVALID_REQUEST") {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      {
        error: "Request failed",
        message,
      },
      { status: 500 },
    );
  }
}
