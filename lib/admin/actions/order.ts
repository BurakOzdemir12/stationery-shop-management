import { orderItems, orders, products } from "@/database/schema";
import { and, eq, gte, sql } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { applyOrderToRevenueReports } from "@/lib/admin/actions/budgetReport";

type OrderItemIn = {
  productId: string;
  quantity: number;
};

export async function createOrder(items: OrderItemIn[]) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("EMPTY_CART");
  }

  let totalPrice = 0;
  let totalItems = 0;
  const orderLines: Array<{
    orderId?: string;
    productId: string;
    productName: string;
    unitPrice: number;
    quantity: number;
    subTotal: number;
    barcodeSnapshot?: string | null;
    unitPurchasePrice?: number | null;
  }> = [];

  for (const item of items) {
    if (!item.productId || !item.quantity || item.quantity <= 0) {
      throw new Error("INVALID_ITEM");
    }

    const [p] = await db
      .select()
      .from(products)
      .where(eq(products.id, item.productId))
      .limit(1);

    if (!p) throw new Error("PRODUCT_NOT_FOUND");

    const updated = await db
      .update(products)
      .set({ stock: sql`${products.stock} - ${item.quantity}` })
      .where(
        and(
          eq(products.id, item.productId),
          gte(products.stock, item.quantity),
        ),
      )
      .returning({
        id: products.id,
        sale_price: products.sale_price,
        purchase_price: products.purchase_price,
        name: products.name,
        barcode: products.barcode,
      });

    if (updated.length === 0) {
      throw new Error("INSUFFICIENT_STOCK");
    }

    const unit = Number(updated[0].sale_price || 0);
    const subTotal = unit * item.quantity;

    totalPrice += subTotal;
    totalItems += item.quantity;

    orderLines.push({
      productId: item.productId,
      productName: updated[0].name,
      unitPrice: unit,
      quantity: item.quantity,
      subTotal,
      barcodeSnapshot: updated[0].barcode ?? null,
      unitPurchasePrice: updated[0].purchase_price ?? null,
    });
  }

  const [newOrder] = await db
    .insert(orders)
    .values({
      totalPrice: Number(totalPrice.toFixed(2)),
      totalItems,
      status: "PAID",
    })
    .returning({ id: orders.id, createdAt: orders.createdAt });

  await db.insert(orderItems).values(
    orderLines.map((l) => ({
      ...l,
      orderId: newOrder.id,
    })),
  );
  await applyOrderToRevenueReports({
    createdAt: newOrder.createdAt,
    totalPrice: Number(totalPrice.toFixed(2)),
    orderLines,
  });
  return {
    id: newOrder.id,
  };
}
