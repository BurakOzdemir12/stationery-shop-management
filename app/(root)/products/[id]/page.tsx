import React from "react";
import { db } from "@/database/drizzle";
import { products } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { IKImage } from "imagekitio-react";
import ProductDetail from "@/components/ProductDetail";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const productDetails = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);
  if (!productDetails) redirect("/404");
  return (
    <div>
      <ProductDetail {...productDetails[0]} />
    </div>
  );
};
export default Page;
