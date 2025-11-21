"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";
type PaginationViewProps = {
  currentPage: number;
  totalPages: number;
  type: "products" | "pos";
};

const PaginationView = ({
  currentPage,
  totalPages,
  type,
}: PaginationViewProps) => {
  const pathname = usePathname();
  const search = useSearchParams();
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;
  const anchor = "#all-products";

  const hrefFor = (page: number) => {
    const params = new URLSearchParams(search.toString());
    params.set("page", String(page));
    return `${pathname}?${params.toString()}${anchor}`;
  };
  return (
    <div>
      <Pagination
        className={`${type === "products" ? "text-white" : "text-black"}`}
      >
        <PaginationContent>
          {hasPrevPage && (
            <div className="flex gap-2 items-center">
              <PaginationItem>
                <PaginationPrevious href={hrefFor(currentPage - 1)} size={4} />
              </PaginationItem>
              <PaginationLink href={hrefFor(1)} size={6}>
                {totalPages - (totalPages - 1)}
              </PaginationLink>
            </div>
          )}
          {hasPrevPage && <PaginationEllipsis />}
          <PaginationItem>
            <PaginationLink
              className=" p-2 font-extrabold text-xl"
              isActive
              size={4}
              href={hrefFor(currentPage)}
            >
              {currentPage}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            {hasNextPage && (
              <div className="flex gap-2 items-center">
                <PaginationEllipsis />
                <PaginationLink href={hrefFor(totalPages)} size={6}>
                  {totalPages}
                </PaginationLink>
              </div>
            )}
          </PaginationItem>
          {hasNextPage && (
            <PaginationItem>
              <PaginationNext href={hrefFor(currentPage + 1)} size={4} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
export default PaginationView;
