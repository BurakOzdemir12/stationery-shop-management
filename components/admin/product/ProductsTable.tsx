"use client";
import React, { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
} from "@tanstack/table-core";
import { flexRender, useReactTable } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarcodeScanner, useScanning } from "react-barcode-scanner";
import dynamic from "next/dynamic";

import "react-barcode-scanner/polyfill";
import { getPaginatedAdminProducts } from "@/lib/queries/products";
import { usePathname, useSearchParams } from "next/navigation";
import { parseProductSearchParams } from "@/lib/search/parseProductParams";
import Link from "next/link";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalPages: number;
  currentPage: number;
}
// function getScannedText(payload: unknown): string | null {
//   if (!payload) return null;
//   if (typeof payload === "string") return payload;
//   if (Array.isArray(payload)) {
//     const first: any = payload[0];
//     return first?.rawValue ?? first?.text ?? null;
//   }
//   const anyPayload = payload as any;
//   return anyPayload?.rawValue ?? anyPayload?.text ?? null;
// }
//------------------------------------------------------------------------------
const ProductsTable = <TData, TValue>({
  columns,
  data,
  totalPages,
  currentPage,
}: DataTableProps<TData, TValue>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: { columnFilters },
    pageCount: totalPages,
  });
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;
  const hrefFor = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  };
  // const BarcodeScanner = dynamic(
  //   () => {
  //     import("react-barcode-scanner/polyfill");
  //     return import("react-barcode-scanner").then((mod) => mod.BarcodeScanner);
  //   },
  //   { ssr: false },
  // );
  // const [scannedCode, setScannedCode] = useState<string | null>(null);
  return (
    <div className="flex flex-col w-full   ">
      <div className="flex flex-row gap-6  ">
        <span>
          <h1>Filter with Product Name</h1>
          <Input
            className="w-fit min-w-[350px] m-3 mx-0 bg-input text-xl font-semibold"
            placeholder="Enter product name..."
            value={(table.getColumn("name")?.getFilterValue() as string) || ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
          />
        </span>
        <span>
          <h1>Filter with Barcode</h1>
          <Input
            className="w-fit min-w-[350px] m-3 mx-0 bg-input text-xl font-semibold"
            placeholder="Enter Barcode..."
            value={
              (table.getColumn("barcode")?.getFilterValue() as string) || ""
            }
            onChange={(event) =>
              table.getColumn("barcode")?.setFilterValue(event.target.value)
            }
          />
        </span>
        {/*<div className="w-100 h-100 hidden">*/}
        {/*  <BarcodeScanner*/}
        {/*    className="w-fit h-min hidden"*/}
        {/*    options={{*/}
        {/*      delay: 1500,*/}
        {/*      formats: [*/}
        {/*        "code_128",*/}
        {/*        "code_39",*/}
        {/*        "code_93",*/}
        {/*        "codabar",*/}
        {/*        "ean_13",*/}
        {/*        "ean_8",*/}
        {/*        "itf",*/}
        {/*        "qr_code",*/}
        {/*        "upc_a",*/}
        {/*        "upc_e",*/}
        {/*      ],*/}
        {/*    }}*/}
        {/*    onCapture={(payload) => {*/}
        {/*      const text = getScannedText(payload);*/}
        {/*      if (text) {*/}
        {/*        setScannedCode(text);*/}
        {/*        console.log("Scanned:", text);*/}
        {/*      } else {*/}
        {/*        console.log("Scan payload:", payload);*/}
        {/*      }*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div className="min-w-48 p-3 rounded-md bg-white border hidden">*/}
        {/*  <div className="text-xs text-muted-foreground">Son taranan</div>*/}
        {/*  <div className="text-lg font-mono">{scannedCode ?? "-"}</div>*/}
        {/*</div>*/}
      </div>
      <div className="overflow-hidden    ">
        <Table className="">
          <TableHeader className="  bg-primary-opac">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-neutral-100">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="align-middle justify-items-center "
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex flex-row justify-between items-center  mt-8 ">
          <div className="items-center justify-start ">
            <p>
              {table.getFilteredSelectedRowModel().rows.length} of {""}
              {table.getFilteredRowModel().rows.length} row(s) selected
            </p>
          </div>
          <div className="space-x-2 flex items-center justify-end">
            <Link
              aria-hidden={!hasPrevPage}
              href={hrefFor(currentPage - 1)}
              prefetch={false}
            >
              <Button variant="outline" size="sm" disabled={currentPage <= 1}>
                Previous
              </Button>
            </Link>
            <Link
              hidden={!hasNextPage}
              aria-disabled={hasNextPage}
              href={hrefFor(currentPage + 1)}
              prefetch={false}
            >
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage >= totalPages}
              >
                Next
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductsTable;
