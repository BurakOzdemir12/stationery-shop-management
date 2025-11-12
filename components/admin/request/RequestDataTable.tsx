"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DateCell from "@/components/admin/product/cells/DateCell";
import ActionsCell from "@/components/admin/product/cells/ActionsCell";
import { Button } from "@/components/ui/button";
import {
  deleteRequest,
  updateRequestStatus,
} from "@/lib/admin/actions/stockRequest";
import { toast } from "react-hot-toast";
import AlertDialogBox from "@/components/AlertDialogBox";
import { useConfirmAlertContext } from "@/app/context/ConfirmAlertContext";

const RequestDataTable = ({ requests }: { requests: RequestType[] }) => {
  const [isPending, setPending] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const { confirm } = useConfirmAlertContext();

  const handleStatusChange = async (id: string) => {
    setPending(true);
    const ok = await confirm("Are you sure you want to change this request?");
    if (!ok) {
      setPending(false);
      return;
    }
    const res = updateRequestStatus(id);
    if (!res) {
      toast.error("Failed to change status");
      setPending(false);
      return;
    }
    setPending(false);

    toast.success("Request status updated successfully");
  };
  const handleDelete = async (id: string) => {
    setDeleting(true);

    const ok = await confirm("Are you sure you want to change this request?");
    if (!ok) {
      setDeleting(false);
      return;
    }
    const res = deleteRequest(id);
    if (!res) {
      setDeleting(false);

      toast.error("Failed to delete request");
      return;
    }
    setDeleting(false);

    toast.success("Request deleted successfully");
  };
  return (
    <Table className="">
      <TableCaption>A List of your stock requests</TableCaption>
      <TableHeader className="bg-primary-opac ">
        <TableRow>
          <TableHead className="w-[100px]">User</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Product</TableHead>
          <TableHead className="text-left">Request Send Date</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((req) => (
          <TableRow key={req.id}>
            <TableCell className="font-medium">{req.userId}</TableCell>
            <TableCell
              className={`${isPending && !isDeleting && "text-success-opac"} font-semibold text-lg`}
            >
              {req.status}
            </TableCell>
            <TableCell>{req.productId}</TableCell>
            <TableCell className="text-left">
              <DateCell value={req.createdAt} />
            </TableCell>
            <TableCell className="flex flex-row gap-2  justify-end">
              <Button
                disabled={isPending}
                className="btn-pri"
                onClick={() => handleStatusChange(req.id)}
              >
                Change Status
              </Button>
              <Button className="btn-del" onClick={() => handleDelete(req.id)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={0}>Total Request: {requests.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
export default RequestDataTable;
