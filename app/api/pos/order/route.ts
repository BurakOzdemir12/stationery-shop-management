import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/admin/actions/order";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const items = (body?.items ?? []) as OrderItemIn[];

  try {
    const order = await createOrder(items);
    return NextResponse.json(order, { status: 201 });
  } catch (e) {
    const message = (e as Error).message;

    if (message === "EMPTY_CART") {
      return NextResponse.json({ error: "Empty cart" }, { status: 400 });
    }
    if (message === "INVALID_ITEM") {
      return NextResponse.json({ error: "Invalid item data" }, { status: 400 });
    }
    if (message === "PRODUCT_NOT_FOUND") {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    if (message === "INSUFFICIENT_STOCK") {
      return NextResponse.json(
        { error: "Insufficient stock" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Order failed", message },
      { status: 400 },
    );
  }
}
