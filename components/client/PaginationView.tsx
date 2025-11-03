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
};

const PaginationView = ({ currentPage, totalPages }: PaginationViewProps) => {
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
      <Pagination className="text-white ">
        <PaginationContent>
          {hasPrevPage && (
            <PaginationItem>
              <PaginationPrevious href={hrefFor(currentPage - 1)} size={4} />
            </PaginationItem>
          )}
          {hasPrevPage && <PaginationEllipsis />}
          <PaginationItem>
            <PaginationLink
              className="text-white p-3"
              isActive
              size={4}
              href={hrefFor(currentPage)}
            >
              {currentPage}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            {hasNextPage && <PaginationEllipsis />}
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
