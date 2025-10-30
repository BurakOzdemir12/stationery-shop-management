"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
type ActionsCellProps = {
  id: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};
export default function ActionsCell({
  id,
  onEdit,
  onDelete,
}: ActionsCellProps) {
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

        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(id)}>
          View Details
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => (onEdit ? onEdit(id) : console.log("edit", id))}
        >
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            const ok = confirm("Delete this row?");
            if (ok) {
              onDelete ? onDelete(id) : console.log("delete", id);
            }
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
