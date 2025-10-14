"use server";

import { products } from "@/database/schema";
import { db } from "@/database/drizzle";

export const createProduct = async (params: ProductParams) => {
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
