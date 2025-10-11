import React from "react";
import { Button } from "@/components/ui/button";
import ProductForm from "@/components/admin/forms/ProductForm";

const Page = () => {
  return (
    <div>
      <Button className="btn-pri">Go Back</Button>
      <section className="w-full max-2-2xl">
        <ProductForm />
      </section>
    </div>
  );
};
export default Page;
