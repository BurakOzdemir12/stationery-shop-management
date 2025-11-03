"use server";

import { requireAdmin } from "@/lib/guard";
import { db } from "@/database/drizzle";
import { services } from "@/database/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createService = async (params: ServiceParams) => {
  await requireAdmin();
  try {
    const newService = await db
      .insert(services)
      .values({ ...params })
      .returning();
    if (newService) revalidatePath("/admin/services");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newService[0])),
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: "An error occurred while creating the service",
    };
  }
};
export const updateService = async (id: string, params: ServiceParams) => {
  await requireAdmin();
  try {
    const updatedService = await db
      .update(services)
      .set({ ...params })
      .where(eq(services.id, id))
      .returning();
    revalidatePath("/admin/services");
    return {
      success: true,
      data: JSON.parse(JSON.stringify(updatedService[0])),
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: "An error occurred while updating the service",
    };
  }
};
export const deleteService = async (id: string) => {
  await requireAdmin();
  try {
    await db.delete(services).where(eq(services.id, id));
    revalidatePath("/admin/services");
    return { success: true };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: "An error occurred while deleting the service",
    };
  }
};
