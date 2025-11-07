// export const runtime = "nodejs";
//
// import { NextResponse } from "next/server";
// import { db } from "@/database/drizzle";
// import { orderItems, orders, products } from "@/database/schema";
// import { and, eq, gte, sql } from "drizzle-orm";
//
// type OrderItemIn = {
//   productId: string;
//   quantity: number;
// };
//
// export async function POST(req: Request) {
//   const body = await req.json().catch(() => null);
//   const items = (body?.items ?? []) as OrderItemIn[];
//
//   if (!Array.isArray(items) || items.length === 0) {
//     return NextResponse.json({ error: "Empty cart" }, { status: 400 });
//   }
//   try {
//     const res = await db.transaction(async (tx) => {
//       let totalPrice = 0;
//       let totalItems = 0;
//       const orderLines: Array<{
//         orderId?: string;
//         productId: string;
//         productName: string;
//         unitPrice: number;
//         quantity: number;
//         subTotal: number;
//         barcodeSnapshot?: string | null;
//       }> = [];
//
//       for (const item of items) {
//         if (
//           !item.productId ||
//           !item.quantity ||
//           // item.unitPrice < 0 ||
//           item.quantity <= 0
//         ) {
//           return NextResponse.json(
//             { error: "Invalid item data" },
//             { status: 400 },
//           );
//         }
//
//         const [p] = await tx
//           .select()
//           .from(products)
//           .where(eq(products.id, item.productId))
//           .limit(1);
//
//         if (!p) throw new Error("Product not found");
//         if (p.stock < item.quantity) throw new Error("Insufficient stock");
//
//         const updated = await tx
//           .update(products)
//           .set({ stock: sql`${products.stock} - ${item.quantity}` })
//           .where(
//             and(
//               eq(products.id, item.productId),
//               gte(products.stock, item.quantity),
//             ),
//           )
//           .returning({ id: products.id });
//
//         if (updated.length === 0) {
//           throw new Error("Concurrent stock update failed");
//         }
//         const unit = Number(p.sale_price || 0);
//         const subTotal = unit * item.quantity;
//
//         totalPrice += subTotal;
//         totalItems += item.quantity;
//
//         orderLines.push({
//           productId: p.id,
//           productName: p.name,
//           unitPrice: unit,
//           quantity: item.quantity,
//           subTotal,
//           barcodeSnapshot: p.barcode ?? null,
//         });
//       }
//       const [newOrder] = await tx
//         .insert(orders)
//         .values({
//           totalPrice: Number(totalPrice.toFixed(2)),
//           totalItems,
//           status: "PAID",
//         })
//         .returning({ id: orders.id });
//
//       await tx.insert(orderItems).values(
//         orderLines.map((l) => ({
//           ...l,
//           orderId: newOrder.id,
//         })),
//       );
//
//       // return { orderId: newOrder.id, totalPrice, totalItems };
//       return newOrder;
//     });
//     return NextResponse.json(res);
//   } catch (e) {
//     return NextResponse.json(
//       { error: "Order failed", message: (e as Error).message },
//       { status: 400 },
//     );
//   }
// }

import { NextResponse } from "next/server";
import { orderItems, orders, products } from "@/database/schema";
import { and, eq, gte, sql } from "drizzle-orm";
import { db } from "@/database/drizzle";

type OrderItemIn = {
  productId: string;
  quantity: number;
};

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const items = (body?.items ?? []) as OrderItemIn[];

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Empty cart" }, { status: 400 });
  }

  try {
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
    }> = [];

    for (const item of items) {
      if (!item.productId || !item.quantity || item.quantity <= 0) {
        return NextResponse.json(
          { error: "Invalid item data" },
          { status: 400 },
        );
      }

      const [p] = await db
        .select()
        .from(products)
        .where(eq(products.id, item.productId))
        .limit(1);

      if (!p) throw new Error("Product not found");

      // Stok düş – yeterli stok varsa
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
          name: products.name,
          barcode: products.barcode,
        });

      if (updated.length === 0) {
        throw new Error("Insufficient stock");
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
      });
    }

    const [newOrder] = await db
      .insert(orders)
      .values({
        totalPrice: Number(totalPrice.toFixed(2)),
        totalItems,
        status: "PAID",
      })
      .returning({ id: orders.id });

    await db.insert(orderItems).values(
      orderLines.map((l) => ({
        ...l,
        orderId: newOrder.id,
      })),
    );

    return NextResponse.json({ id: newOrder.id });
  } catch (e) {
    return NextResponse.json(
      { error: "Order failed", message: (e as Error).message },
      { status: 400 },
    );
  }
}
