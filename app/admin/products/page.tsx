import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductsTable from "@/components/admin/ProductsTable";
import { getPaginatedAdminProducts } from "@/lib/queries/products";
import { parseProductSearchParams } from "@/lib/search/parseProductParams";
import { adminProductColumns } from "@/components/admin/product/AdminProductColumns";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const parsed = parseProductSearchParams(searchParams);
  const { rows } = await getPaginatedAdminProducts({
    ...parsed,
  });

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
      <div className="">
        <ProductsTable columns={adminProductColumns} data={rows} />
      </div>
    </section>
  );
};
export default Page;
