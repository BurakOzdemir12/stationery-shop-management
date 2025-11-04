"use client";
import React, { useEffect, useState } from "react";
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

import "react-barcode-scanner/polyfill";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useBarcode } from "@/app/context/BarcodeContext";
import GlobalBarcodeScanner from "@/components/admin/barcode/GlobalBarcodeScanner";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalPages: number;
  currentPage: number;
}

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
  const { setScannedCode, scannedCode, isScannerActive, setIsScannerActive } =
    useBarcode();
  // const [scannedCode, setScannedCode] = useState("");
  // const [isScannerActive, setIsScannerActive] = useState(false);

  useEffect(() => {
    table.getColumn("barcode")?.setFilterValue(scannedCode || "");
  }, [scannedCode, table]);
  const [openScan, setOpenScan] = useState(false);

  return (
    <div className="flex flex-col w-full   ">
      <div className="flex lg:justify-start justify-center lg:flex-row lg flex-col gap-6  ">
        <div className="">
          <h1 className="mt-2">Filter with Product Name</h1>
          <Input
            className="  m-4 mx-0 bg-input text-xl font-semibold"
            placeholder="Enter product name..."
            value={(table.getColumn("name")?.getFilterValue() as string) || ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
          />
        </div>
        <div className="">
          <span className="flex flex-row gap-5 items-center">
            <h1>Filter with Barcode</h1>
            <GlobalBarcodeScanner
              className="btn-pri text-sm "
              title="Scan"
              open={openScan}
              onOpenChange={setOpenScan}
              onDetected={(code) => {
                table.getColumn("barcode")?.setFilterValue(code);
                setOpenScan(false);
              }}
            />

            {isScannerActive ? (
              <Button
                onClick={() => setIsScannerActive(false)}
                className="btn-del"
              >
                Cancel Scan
              </Button>
            ) : (
              <Button
                hidden={!table.getColumn("barcode")?.getFilterValue()}
                className="btn-del"
                onClick={() => {
                  setScannedCode("");
                  table.getColumn("barcode")?.setFilterValue("");
                }}
              >
                Reset
              </Button>
            )}
          </span>

          <Input
            className="   m-3 mx-0 bg-input text-xl font-semibold"
            placeholder="Enter Barcode..."
            value={
              (table.getColumn("barcode")?.getFilterValue() as string) || ""
            }
            onChange={(event) =>
              table.getColumn("barcode")?.setFilterValue(event.target.value)
            }
          />
        </div>
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
              <Button
                className="btn-pri"
                size="sm"
                disabled={!hasPrevPage}
                hidden={!hasPrevPage}
              >
                Previous page
              </Button>
            </Link>
            <Link
              hidden={!hasNextPage}
              aria-disabled={hasNextPage}
              href={hrefFor(currentPage + 1)}
              prefetch={false}
            >
              <Button
                className="btn-pri"
                size="sm"
                disabled={currentPage >= totalPages}
              >
                Next page
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductsTable;
