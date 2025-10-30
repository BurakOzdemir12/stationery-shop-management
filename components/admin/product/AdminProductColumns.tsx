"use client";
import React from "react";
import type { ColumnDef } from "@tanstack/table-core";
import type { AdminProductRow } from "@/lib/queries/products";
import MoneyCell from "@/components/admin/product/cells/MoneyCell";
import DateCell from "@/components/admin/product/cells/DateCell";
import StockCell from "@/components/admin/product/cells/StockCell";
import BarcodeCell from "@/components/admin/product/cells/BarcodeCell";
import ActionsCell from "@/components/admin/product/cells/ActionsCell";
import { Checkbox } from "@/components/ui/checkbox";

const selectColumn: ColumnDef<AdminProductRow> = {
  id: "select",
  header: ({ table }) => (
    <Checkbox
      className="border-2 border-white m-3 mx-1 p-0 align-middle"
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      className="border-2 border-primary m-3 mx-1 p-0 align-middle"
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  ),
  enableSorting: false,
  enableHiding: false,
};
export const adminProductColumns: ColumnDef<AdminProductRow>[] = [
  selectColumn,

  { header: "Name", accessorKey: "name" },
  { header: "Category", accessorKey: "category" },
  { header: "Brand", accessorKey: "brand" },
  {
    header: "Stock",
    accessorKey: "stock",
    cell: ({ getValue }) => <StockCell value={getValue() as number} />,
  },
  {
    header: "Sale Price",
    accessorKey: "sale_price",
    cell: ({ getValue }) => <MoneyCell value={getValue() as number} />,
  },
  {
    header: "Purchase Price",
    accessorKey: "purchase_price",
    cell: ({ getValue }) => (
      <MoneyCell value={getValue() as number} tone="muted" />
    ),
  },
  {
    header: "Barcode",
    accessorKey: "barcode",
    cell: ({ getValue }) => (
      <BarcodeCell value={getValue() as string | null} tone="muted" />
    ),
  },
  { header: "Code", accessorKey: "code" },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ getValue }) => <DateCell value={getValue() as Date | null} />,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    enableSorting: false,
    cell: ({ row }) => (
      <ActionsCell id={(row.original as AdminProductRow).id} />
    ),
  },
];
