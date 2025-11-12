import { db } from "@/database/drizzle";
import { requests } from "@/database/schema";
import { and, eq } from "drizzle-orm";

type RequestProps = {
  productId: string;
  userId: string;
};

export async function stockRequest({ productId, userId }: RequestProps) {
  if (!productId || !userId) {
    throw new Error("INVALID_REQUEST");
  }
  if (await isAvailableToRequest({ productId, userId })) {
    throw new Error("EXISTING_REQUEST");

    // return;
  }

  try {
    const [newRes] = await db
      .insert(requests)
      .values({
        productId,
        userId,
        status: "PENDING",
      })
      .returning({ id: requests.id });
    return newRes;
  } catch (e) {
    console.log(e);
  }
}

export async function isAvailableToRequest({
  productId,
  userId,
}: RequestProps) {
  if (!productId || !userId) {
    throw new Error("INVALID_REQUEST");
  }
  try {
    const [existingRequest] = await db
      .select()
      .from(requests)
      .where(
        and(
          eq(requests.userId, userId),
          eq(requests.productId, productId),
          eq(requests.status, "PENDING"),
        ),
      )
      .limit(1);
    return existingRequest;
  } catch (e) {
    console.log(e);
    return false;
  }
}
