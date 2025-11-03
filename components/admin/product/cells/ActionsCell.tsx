"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { deleteProduct } from "@/lib/admin/actions/product";
import { toast } from "react-hot-toast";
import ProductDetailSheet from "@/components/admin/product/ProductDetailSheet";
import { useRouter, useSearchParams } from "next/navigation";
type ActionsCellProps = {
  id: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onViewDetails?: (id: string) => void; // eklendi
};
export default function ActionsCell({
  id,
  onEdit,
  onDelete,
  onViewDetails,
}: ActionsCellProps) {
  const handleDelete = async (id: string) => {
    const ok = confirm("Delete this row?");
    if (!ok) return;
    try {
      const res = await deleteProduct(id);

      if (!res?.success) {
        throw new Error("Failed to delete product");
      }
      onDelete?.(id);
      toast.success("Product deleted successfully");
    } catch (e) {
      console.log(e);
      toast.error("Failed to delete product");
    }
  };
  const router = useRouter();
  const searchParams = useSearchParams();

  const openDetails = (pid: string) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.set("view", pid);
    router.push(`/admin/products?${params.toString()}`, { scroll: false });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer ">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer hover:bg-neutral-100"
          onClick={() => openDetails(id)}
        >
          View Details
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer hover:bg-neutral-100"
          // onClick={() => (onEdit ? onEdit(id) : console.log("edit", id))}
        >
          <Link
            onClick={() => onEdit?.(id)}
            prefetch={false}
            className="w-full h-full"
            href={`/admin/products/edit/${id}`}
          >
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer hover:bg-neutral-100"
          onClick={() => handleDelete(id)}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
