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
type PaginationViewProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

const PaginationView = ({
  currentPage,
  totalPages,
  basePath,
}: PaginationViewProps) => {
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;
  return (
    <div>
      <Pagination className="text-white ">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={!hasPrevPage}
              href={`${basePath}?page=${currentPage - 1}#all-products`}
              className={!hasPrevPage ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          {hasPrevPage && <PaginationEllipsis />}
          <PaginationItem>
            <PaginationLink
              className="text-white"
              href={`${basePath}?page=${currentPage}#all-products`}
              isActive
            >
              {currentPage}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            {hasNextPage && <PaginationEllipsis />}
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href={`${basePath}?page=${currentPage + 1}#all-products`}
              aria-disabled={!hasNextPage}
              className={!hasNextPage ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
export default PaginationView;
