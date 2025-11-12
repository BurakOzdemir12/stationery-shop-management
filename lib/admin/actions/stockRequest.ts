"use server";

import { db } from "@/database/drizzle";
import { requests } from "@/database/schema";
import { eq, sql } from "drizzle-orm";
import { requireAdmin } from "@/lib/guard";
import { revalidatePath } from "next/cache";

export const updateRequestStatus = async (requestId: string) => {
  await requireAdmin();
  if (!requestId) {
    return { success: false, message: "INVALID_REQUEST" };
  }
  try {
    const row = await db
      .update(requests)
      .set({
        status: sql`
          CASE ${requests.status}
            WHEN 'PENDING'::request_status   THEN 'ANSWERED'::request_status
            WHEN 'ANSWERED'::request_status  THEN 'RESTOCKED'::request_status
            WHEN 'RESTOCKED'::request_status  THEN 'PENDING'::request_status
            ELSE ${requests.status}  
          END
        `,
      })
      .where(eq(requests.id, requestId))
      .returning({ status: requests.status });

    revalidatePath("/admin/requests");
    return {
      success: true,
      data: JSON.parse(JSON.stringify(row[0]?.status)),
    };
    // return row?.status;
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "An error occurred while updating the request status",
    };
  }
};
export const deleteRequest = async (requestId: string) => {
  await requireAdmin();
  if (!requestId) {
    return { success: false, message: "INVALID_REQUEST" };
  }
  try {
    await db.delete(requests).where(eq(requests.id, requestId));
    revalidatePath("/admin/requests");
    return { success: true, code: 200 };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "An error occurred while deleting the request",
    };
  }
};
