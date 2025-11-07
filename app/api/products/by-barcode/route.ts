import { NextResponse } from "next/server";
import { getProductByBarcode } from "@/lib/queries/products";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "code is required" }, { status: 400 });
  }
  const product = await getProductByBarcode(code);
  if (!product) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}
