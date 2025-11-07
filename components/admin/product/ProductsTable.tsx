"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ColumnDef,
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useBarcodeContext } from "@/app/context/BarcodeContext";
import CameraBarcodeScanner from "@/components/admin/barcode/CameraBarcodeScanner";
import { FaDeleteLeft } from "react-icons/fa6";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalPages: number;
  currentPage: number;
}

const ProductsTable = <TData, TValue>({
  columns,
  data,
  totalPages,
  currentPage,
}: DataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    pageCount: totalPages,
  });

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const hrefFor = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(page));
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams],
  );
  const initialName = useMemo(
    () => searchParams.get("query") || "",
    [searchParams],
  );
  const initialBarcode = useMemo(
    () => searchParams.get("barcode") || "",
    [searchParams],
  );

  const [name, setName] = useState(initialName);
  const [barcode, setBarcode] = useState(initialBarcode);
  const prevFiltersRef = useRef({ name: initialName, barcode: initialBarcode });

  useEffect(() => {
    const t = setTimeout(() => {
      const prev = prevFiltersRef.current;
      const changed = prev.name !== name || prev.barcode !== barcode;

      if (!changed) return;

      const params = new URLSearchParams(searchParams.toString());
      if (name) params.set("query", name);
      else params.delete("query");

      if (barcode) params.set("barcode", barcode);
      else params.delete("barcode");

      params.delete("page");

      prevFiltersRef.current = { name, barcode };
      router.replace(`${pathname}?${params.toString()}`);

      // router.push(`${pathname}?${params.toString()}`);
    }, 300);
    return () => clearTimeout(t);
  }, [name, barcode, pathname, router, searchParams]);

  const { setScannedCode, isScannerActive, setIsScannerActive } =
    useBarcodeContext();
  const [openScan, setOpenScan] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <div className="flex lg:justify-start justify-center lg:flex-row flex-col gap-6">
        <div>
          <h1 className="">Filter with Product Name</h1>
          <Input
            className="m-3 mx-0 bg-input text-xl font-semibold"
            placeholder="Enter product name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <span className="flex flex-row gap-5 items-center">
            <h1>Filter with Barcode</h1>

            {/*<CameraBarcodeScanner*/}
            {/*  className="btn-pri text-sm"*/}
            {/*  title="Scan"*/}
            {/*  open={openScan}*/}
            {/*  onOpenChange={setOpenScan}*/}
            {/*  // type="filter"*/}
            {/*  onDetected={(code) => {*/}
            {/*    setBarcode(code);*/}
            {/*    setScannedCode(code);*/}
            {/*    setOpenScan(false);*/}
            {/*  }}*/}
            {/*/>*/}

            {/*{isScannerActive ? (*/}
            {/*  <Button*/}
            {/*    onClick={() => setIsScannerActive(false)}*/}
            {/*    className="btn-del"*/}
            {/*  >*/}
            {/*    Cancel Scan*/}
            {/*  </Button>*/}
            {/*) : (*/}
            {/*  <Button*/}
            {/*    hidden={!barcode}*/}
            {/*    className="btn-del"*/}
            {/*    onClick={() => {*/}
            {/*      setBarcode("");*/}
            {/*      setScannedCode("");*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    Reset*/}
            {/*  </Button>*/}
            {/*)}*/}
          </span>

          <Input
            className="m-3 mx-0 bg-input text-xl font-semibold"
            placeholder="Enter Barcode..."
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
        </div>
        <Button
          hidden={!barcode && !name}
          className="btn-del"
          onClick={() => {
            setBarcode("");
            setScannedCode("");
            setName("");
          }}
        >
          Reset Filters
        </Button>
      </div>

      <div className="overflow-hidden">
        <Table>
          <TableHeader className="bg-primary-opac">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="bg-neutral-100">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="align-middle justify-items-center"
                  key={row.id}
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

        <div className="flex flex-row justify-between items-center mt-8">
          <div className="items-center justify-start">
            <p>
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
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
              href={hrefFor(currentPage + 1)}
              prefetch={false}
            >
              <Button className="btn-pri" size="sm" disabled={!hasNextPage}>
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
