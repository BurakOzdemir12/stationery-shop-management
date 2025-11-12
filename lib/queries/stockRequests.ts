import { db } from "@/database/drizzle";
import { requests } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function getAllRequestsByUser(userId: string) {
  if (!userId) {
    throw new Error("INVALID_REQUEST");
  }

  try {
    const allRequests = await db
      .select()
      .from(requests)
      .where(eq(requests.userId, userId));

    return allRequests;
  } catch (e) {
    console.error("getAllRequestsByUser error:", e);
    return [];
  }
}
