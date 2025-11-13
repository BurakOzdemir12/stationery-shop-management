import { db } from "@/database/drizzle";
import { products, requests, users } from "@/database/schema";
import { desc, eq } from "drizzle-orm";

export async function getAllRequestsByUser(userId: string) {
  if (!userId) {
    throw new Error("INVALID_REQUEST");
  }

  try {
    const res = await db
      .select()
      .from(requests)
      .where(eq(requests.userId, userId));

    return res;
  } catch (e) {
    console.error("getAllRequestsByUser error:", e);
    return [];
  }
}
export async function getAllRequestsWithProductsAndUsers() {
  const result = await db
    .select({
      id: requests.id,
      userId: users.id,
      userName: users.fullName,
      status: requests.status,
      productId: products.id,
      productName: products.name,
      productBrand: products.brand,
      productStock: products.stock,
      createdAt: requests.createdAt,
    })
    .from(requests)
    .leftJoin(products, eq(requests.productId, products.id))
    .leftJoin(users, eq(requests.userId, users.id));

  return result;
}
