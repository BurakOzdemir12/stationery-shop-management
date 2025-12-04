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
import { useConfirmAlertContext } from "@/app/[locale]/context/ConfirmAlertContext";
import { useTranslations } from "next-intl";

const RequestDataTable = ({ requests }: { requests: RequestType[] }) => {
  const t = useTranslations("RequestPage");
  const [isPending, setPending] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const { confirm } = useConfirmAlertContext();

  const handleStatusChange = async (id: string) => {
    setPending(true);
    const ok = await confirm(t("confirmChange"));
    if (!ok) {
      setPending(false);
      return;
    }
    const res = updateRequestStatus(id);
    if (!res) {
      toast.error(t("failedChange"));
      setPending(false);
      return;
    }
    setPending(false);

    toast.success(t("successChange"));
  };
  const handleDelete = async (id: string) => {
    setDeleting(true);

    const ok = await confirm(t("confirmDelete"));
    if (!ok) {
      setDeleting(false);
      return;
    }
    const res = deleteRequest(id);
    if (!res) {
      setDeleting(false);

      toast.error(t("failedDelete"));
      return;
    }
    setDeleting(false);

    toast.success(t("successDelete"));
  };
  return (
    <Table className="">
      <TableCaption>{t("tableCaption")}</TableCaption>
      <TableHeader className="bg-primary-opac ">
        <TableRow>
          <TableHead className="w-[100px]">{t("user")}</TableHead>
          <TableHead> {t("status")}</TableHead>
          <TableHead> {t("product")}</TableHead>
          <TableHead className="text-left">{t("requestedAt")}</TableHead>
          <TableHead className="text-center"> {t("actions")}</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {requests.length > 0 &&
          requests.map((req) => (
            <TableRow key={req.id}>
              <TableCell className="font-medium ">{req.userName}</TableCell>
              <TableCell
                className={`${isPending && !isDeleting && "text-success-opac"} font-semibold text-lg`}
              >
                {req.status === "PENDING"
                  ? t("pending")
                  : req.status === "ANSWERED"
                    ? t("seen")
                    : req.status === "RESTOCKED"
                      ? t("stocked")
                      : ""}
              </TableCell>
              <TableCell>
                {req.productName}/ {req.productBrand}
              </TableCell>
              <TableCell className="text-left">
                <DateCell value={req.createdAt} />
              </TableCell>
              <TableCell className="flex flex-row gap-2  justify-end">
                <Button
                  disabled={isPending}
                  className="btn-pri"
                  onClick={() => handleStatusChange(req.id)}
                >
                  {t("changeStatus")}
                </Button>
                <Button
                  className="btn-del"
                  onClick={() => handleDelete(req.id)}
                >
                  {t("deleteRequest")}
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={0}>
            {t("totalRequests")} {requests.length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
export default RequestDataTable;
