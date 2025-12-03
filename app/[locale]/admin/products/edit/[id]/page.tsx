import React from "react";
import { Button } from "@/components/ui/button";
import ProductForm from "@/components/admin/forms/ProductForm";
import { getProductById } from "@/lib/queries/products";
import { notFound } from "next/navigation";
import Link from "next/link";

const Page = async ({ params }: { params: { id: string } }) => {
  const product = await getProductById(params.id);
  if (!product) notFound();

  return (
    <div>
      <Link href="/admin/products" className="">
        <Button className="btn-pri">Back to Products</Button>
      </Link>
      <section className="w-full max-2-2xl">
        <ProductForm type="edit" id={product.id} {...product} />
      </section>
    </div>
  );
};
export default Page;
