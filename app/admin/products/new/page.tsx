import React from "react";
import { Button } from "@/components/ui/button";
import ProductForm from "@/components/admin/forms/ProductForm";
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <Button className="btn-pri" asChild>
        <Link href="/admin/products">Back to Products</Link>
      </Button>
      <section className="w-full max-2-2xl">
        <ProductForm type="create" />
      </section>
    </div>
  );
};
export default Page;
