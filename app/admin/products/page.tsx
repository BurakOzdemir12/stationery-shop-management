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
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const sp = await searchParams;
  const parsed = parseProductSearchParams(sp);

  const viewIdParam = sp.view;
  const viewId =
    typeof viewIdParam === "string"
      ? viewIdParam
      : Array.isArray(viewIdParam)
        ? viewIdParam[0]
        : undefined;

  const barcodeParam = sp.barcode;
  const barcode =
    typeof barcodeParam === "string"
      ? barcodeParam
      : Array.isArray(barcodeParam)
        ? barcodeParam[0]
        : undefined;
  const [{ rows, totalPages }, product] = await Promise.all([
    getPaginatedAdminProducts({
      ...parsed,
      barcode,
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
