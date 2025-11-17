"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { IKImage } from "imagekitio-react";
import config from "@/lib/config";
import { getCoreRowModel } from "@tanstack/table-core";
import MoneyCell from "@/components/admin/product/cells/MoneyCell";
import BarcodeCell from "@/components/admin/product/cells/BarcodeCell";
import { adminProductColumns } from "@/components/admin/product/AdminProductColumns";
import StockCell from "@/components/admin/product/cells/StockCell";
import { deleteProduct } from "@/lib/admin/actions/product";
import { toast } from "react-hot-toast";
type ProductDetailSheetProps = {
  id?: string;
  product?: Product | null;
  onClose?: () => void;
};
const ProductDetailSheet = ({
  id,
  product,
  onClose,
}: ProductDetailSheetProps) => {
  const open = !!id;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleOpenChange = (o: boolean) => {
    if (o) return;
    onClose?.();
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.delete("view");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };
  const handleDelete = async (id: string | undefined) => {
    const ok = confirm("Delete this product?");
    if (!ok) return;
    try {
      const res = await deleteProduct(id!);
      if (!res?.success) {
        throw new Error("Failed to delete product");
      }
      toast.success("Product deleted successfully");
      handleOpenChange(false);
    } catch (e) {
      toast.error("Failed to delete product");
    }
  };
  return (
    <div>
      <Sheet open={open} onOpenChange={handleOpenChange}>
        {/*<SheetTrigger >*/}
        {/*  <Button variant="outline">Open</Button>*/}
        {/*</SheetTrigger>*/}
        <SheetContent
          className="w-[500px] overflow-auto overflow-x-hidden bg-stone-200 "
          side="right"
        >
          <SheetHeader className="flex flex-row   justify-between w-fit">
            <SheetTitle className=" w-fit">{product?.name}</SheetTitle>
            <Link href={`products/edit/${id}`} prefetch={false} className={``}>
              <Button className="btn-edit">Edit</Button>
            </Link>
            <Button
              onClick={() => handleDelete(product?.id)}
              className="btn-del"
            >
              Delete
            </Button>
          </SheetHeader>
          <div className="">
            <IKImage
              path={product?.image || ""}
              urlEndpoint={config.env.imagekit.urlEndpoint || ""}
              alt="product image"
              className=" object-contain w-full"
            />
          </div>
          <div className="grid flex-1  auto-rows-min gap-6 px-3">
            <div className="grid grid-cols-2 gap-5 p-2 border-1 border-border bg-card rounded-xl ">
              <h1 className="font-extralight  col-span-1">Barcode</h1>
              <p className="font-semibold col-span-1">
                <BarcodeCell value={product?.barcode ?? 0} tone="default" />
              </p>
              <h1 className="font-extralight col-span-1">Purchase Price</h1>
              <p className="font-semibold col-span-1">
                <MoneyCell
                  tone="muted"
                  value={Number(product?.purchase_price ?? 0)}
                />
              </p>
              <h1 className="font-extralight col-span-1">Sale Price</h1>
              <p className="font-semibold col-span-1">
                <MoneyCell
                  tone="default"
                  value={Number(product?.sale_price ?? 0)}
                />
              </p>
              <h1 className="font-extralight col-span-1">Stock Price</h1>
              <p className="font-semibold col-span-1">
                <StockCell value={Number(product?.stock ?? 0)} />
              </p>
            </div>
            <div className="grid gap-3 p-2 border-1 border-border bg-card rounded-xl">
              <h1 className="font-extralight">Description</h1>
              <SheetDescription>{product?.description ?? 0}</SheetDescription>
            </div>
          </div>
          <SheetFooter>
            {/*<Button type="submit">Save changes</Button>*/}
            <SheetClose asChild>
              <Button
                className="hover:bg-red-400 cursor-pointer"
                variant="outline"
              >
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default ProductDetailSheet;
