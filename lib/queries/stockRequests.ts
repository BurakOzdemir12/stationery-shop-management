import { db } from "@/database/drizzle";
import { requests } from "@/database/schema";
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
export async function getAllRequests() {
  try {
    const res = await db
      .select()
      .from(requests)
      .orderBy(desc(requests.createdAt));
    return res;
  } catch (e) {
    console.error("getAllRequests error:", e);
    return [];
  }
}
