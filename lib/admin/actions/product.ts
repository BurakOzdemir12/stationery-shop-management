"use server";

import { products, users } from "@/database/schema";
import { db } from "@/database/drizzle";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/guard";
import { toast } from "react-hot-toast";
import { revalidatePath } from "next/cache";

export const createProduct = async (params: ProductParams) => {
  await requireAdmin();
  try {
    const newProduct = await db
      .insert(products)
      .values({
        ...params,
      })
      .returning();
    return {
      success: true,
      data: JSON.parse(JSON.stringify(newProduct[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "An error occurred while creating the product",
    };
  }
};
export const updateProduct = async (id: string, params: ProductParams) => {
  await requireAdmin();
  try {
    const updatedProduct = await db
      .update(products)
      .set({ ...params })
      .where(eq(products.id, id))
      .returning();
    return {
      success: true,
      data: JSON.parse(JSON.stringify(updatedProduct[0])),
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: "An error occurred while updating the product",
    };
  }
};
export const deleteProduct = async (id: string) => {
  await requireAdmin();
  try {
    await db.delete(products).where(eq(products.id, id));
    revalidatePath("/admin/products");

    return { success: true };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: "An error occurred while deleting the product",
    };
  }
};
