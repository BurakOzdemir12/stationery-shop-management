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
import { useRouter, useSearchParams } from "next/navigation";
import { useConfirmAlertContext } from "@/app/[locale]/context/ConfirmAlertContext";
type ActionsCellProps = {
  id: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  t: (key: string) => string;
};
export default function ActionsCell({
  id,
  onEdit,
  onDelete,
  onViewDetails,
  t,
}: ActionsCellProps) {
  const { confirm } = useConfirmAlertContext();
  const [pending, setPending] = React.useState(false);
  const handleDelete = async (id: string) => {
    setPending(true);
    const ok = await confirm(t("confirmDelete"));
    if (!ok) {
      setPending(false);
      return;
    }
    try {
      const res = await deleteProduct(id);

      if (!res?.success) {
        setPending(false);
        throw new Error(t("productDeleteFail"));
      }
      onDelete?.(id);
      setPending(false);
      toast.success(t("productDeleted"));
    } catch (e) {
      console.log(e);
      setPending(false);
      toast.error(t("productDeleteFail"));
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
        <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer hover:bg-neutral-100"
          onClick={() => openDetails(id)}
        >
          {t("view")}
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
            {t("editProduct")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer hover:bg-neutral-100"
          onClick={() => handleDelete(id)}
        >
          {t("deleteProduct")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
