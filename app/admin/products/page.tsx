import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductsTable from "@/components/admin/product/ProductsTable";
import {
  getPaginatedAdminProducts,
  getProductById,
} from "@/lib/queries/products";
import { parseProductSearchParams } from "@/lib/search/parseProductParams";
import { adminProductColumns } from "@/components/admin/product/AdminProductColumns";
import ProductDetailSheet from "@/components/admin/product/ProductDetailSheet";
import TypographyH2 from "@/components/ui/TypographyH2";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const params = await searchParams;
  const parsed = parseProductSearchParams(params);
  const viewIdParam = await params.view;
  const viewId =
    typeof viewIdParam === "string"
      ? viewIdParam
      : Array.isArray(viewIdParam)
        ? viewIdParam[0]
        : undefined;

  const [{ rows, totalPages }, product] = await Promise.all([
    getPaginatedAdminProducts({
      ...parsed,
    }),
    viewId ? getProductById(viewId) : Promise.resolve(null),
  ]);

  return (
    <div className="bg-white p-5 rounded-2xl w-full">
      <div className="flex flex-wrap items-center justify-between gap-5 ">
        <TypographyH2 title="Products" />
        <Button className="btn-pri" asChild>
          <Link href="/admin/products/new" className="text-white text-[19px]">
            + New Product
          </Link>
        </Button>
      </div>
      <div className="">
        <ProductsTable
          columns={adminProductColumns}
          data={rows}
          totalPages={totalPages}
          currentPage={parsed.currentPage}
        />
      </div>
      <ProductDetailSheet id={viewId} product={product} />
    </div>
  );
};
export default Page;
