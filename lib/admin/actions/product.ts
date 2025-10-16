"use server";

import { products, users } from "@/database/schema";
import { db } from "@/database/drizzle";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const createProduct = async (params: ProductParams) => {
  const session = await auth();
  const isAdmin = await db
    .select({ isAdmin: users.role })
    .from(users)
    .where(eq(users.id, session?.user?.id))
    .limit(1)
    .then((res) => res[0]?.isAdmin === "ADMIN");

  if (!isAdmin || !session) redirect("/");
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
