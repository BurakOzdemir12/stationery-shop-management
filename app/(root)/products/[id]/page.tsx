import React, { Suspense } from "react";
import { db } from "@/database/drizzle";
import { products } from "@/database/schema";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { IKImage } from "imagekitio-react";
import ProductDetail from "@/components/client/ProductDetail";
import { auth } from "@/auth";
import { isAvailableToRequest } from "@/lib/actions/stockRequest";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const session = await auth();
  const productId = params.id;
  const userId = session?.user?.id;
  const productRows = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);

  let existingRequest = null;
  if (userId) {
    existingRequest = await isAvailableToRequest({ productId, userId });
  }

  const product = productRows[0];
  if (!product) {
    notFound();
  }
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductDetail
          session={session}
          {...product}
          existingRequest={!!existingRequest}
        />
      </Suspense>
    </div>
  );
};
export default Page;
