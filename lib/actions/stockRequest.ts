"use server";
import { db } from "@/database/drizzle";
import { requests } from "@/database/schema";
import { and, eq, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import ratelimit from "@/lib/ratelimit";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function stockRequest({ productId, userId }: RequestParams) {
  if (!productId || !userId) {
    throw new Error("INVALID_REQUEST");
  }

  const key = `stockRequest:${userId}:${productId}`;
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(key || ip);
  if (!success) {
    throw new Error("RATE_LIMIT_EXCEEDED");
  }

  if (await isAvailableToRequest({ productId, userId })) {
    throw new Error("EXISTING_REQUEST");
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
}: RequestParams) {
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
          or(eq(requests.status, "PENDING"), eq(requests.status, "ANSWERED")),
        ),
      )
      .limit(1);
    return !!existingRequest;
  } catch (e) {
    console.log(e);
    return false;
  }
}
