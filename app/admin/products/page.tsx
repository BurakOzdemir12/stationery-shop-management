import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <section className="bg-white p-5 rounded-2xl w-full">
      <div className="flex flex-wrap items-center justify-between gap-5 ">
        <h2 className="font-inter font-bold text-xl ">Products</h2>
        <Button className="btn-pri" asChild>
          <Link href="/admin/products/new" className="text-white text-[19px]">
            + New Product
          </Link>
        </Button>
      </div>
    </section>
  );
};
export default Page;
