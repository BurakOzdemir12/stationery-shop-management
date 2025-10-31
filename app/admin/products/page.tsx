import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductsTable from "@/components/admin/ProductsTable";
import {
  getPaginatedAdminProducts,
  getProductById,
} from "@/lib/queries/products";
import { parseProductSearchParams } from "@/lib/search/parseProductParams";
import { adminProductColumns } from "@/components/admin/product/AdminProductColumns";
import ProductDetailSheet from "@/components/admin/ProductDetailSheet";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const parsed = parseProductSearchParams(searchParams);
  const viewIdParam = searchParams.view;
  const viewId =
    typeof viewIdParam === "string"
      ? viewIdParam
      : Array.isArray(viewIdParam)
        ? viewIdParam[0]
        : undefined;

  const [{ rows }, product] = await Promise.all([
    getPaginatedAdminProducts({
      ...parsed,
    }),
    viewId ? getProductById(viewId) : Promise.resolve(null),
  ]);

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
      <ProductDetailSheet id={viewId} product={product} />
    </section>
  );
};
export default Page;
