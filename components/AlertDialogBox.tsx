"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useConfirmAlertContext } from "@/app/[locale]/context/ConfirmAlertContext";

const AlertDialogBox = () => {
  const { open, title, description, close } = useConfirmAlertContext();

  return (
    <AlertDialog open={open} onOpenChange={(v) => !v && close(false)}>
      <AlertDialogContent className="border-0 bg-black/90">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            {title ?? "Are you sure?"}
          </AlertDialogTitle>
          {description && (
            <AlertDialogDescription className="text-white">
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="btn-del" onClick={() => close(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="btn-pri" onClick={() => close(true)}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default AlertDialogBox;
