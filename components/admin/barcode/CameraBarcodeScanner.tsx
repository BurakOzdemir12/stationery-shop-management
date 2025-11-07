"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useBarcodeContext } from "@/app/context/BarcodeContext";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaBarcode } from "react-icons/fa";
import { getProductByBarcode } from "@/lib/queries/products";
type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDetected: (code: string) => void;
  title?: string;
  width?: number;
  height?: number;
  className?: string;
};
type ScanResult = {
  getText?: () => string;
  text?: string;
  rawValue?: string;
} | null;
const CameraBarcodeScanner = ({
  open,
  onOpenChange,
  onDetected,
  title = "Scan your code",
  width = 600,
  height = 360,
  className,
}: Props) => {
  const { scannedCode } = useBarcodeContext();
  const InnerScanner = dynamic(() => import("react-qr-barcode-scanner"), {
    ssr: false,
  });
  const router = useRouter();

  const handleUpdate = (_err: unknown, result: ScanResult) => {
    const code: string | null =
      result?.getText?.() ?? result?.text ?? result?.rawValue ?? null;
    if (!code) return;
    onDetected(String(code));
  };

  return (
    <div className="">
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild className={className}>
          <Button className="">{title}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle className="flex gap-5 items-center">
            Scan your code <FaBarcode className="size-8" />
          </DialogTitle>
          <InnerScanner onUpdate={handleUpdate} />
          {scannedCode}
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default CameraBarcodeScanner;
