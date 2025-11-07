"use client";
import React, { useCallback } from "react";

import { usePosCartContext } from "@/app/context/PosCartContext";
import { useBarcodeContext } from "@/app/context/BarcodeContext";
import { usePathname, useRouter } from "next/navigation";
import UsbBarcodeListener from "@/components/admin/barcode/UsbBarcodeListener";
import { toast } from "react-hot-toast";

export default function GlobalUsbBarcodeListener() {
  const pathname = usePathname();
  const router = useRouter();

  const { onAdd } = usePosCartContext();
  const { setScannedCode } = useBarcodeContext();
  const handleDetected = useCallback(
    async (code: string) => {
      try {
        const res = await fetch(
          `/api/products/by-barcode?code=${encodeURIComponent(code)}`,
          { cache: "no-store" },
        );
        if (!res.ok) {
          toast.error(`Product didn't found`, {
            position: "top-center",
            style: { backgroundColor: "red", color: "white" },
            iconTheme: {
              primary: "white",
              secondary: "#FF0000",
            },
          });
          return;
        }

        const product: Product = await res.json();
        const { id, name, image, sale_price, stock, brand } = product;

        onAdd({ id, name, image, sale_price, stock, brand }, 1);
        setScannedCode(code);
        if (pathname !== "/admin/pos") {
          router.push(`/admin/pos?barcode=${encodeURIComponent(code)}`);
        }
      } catch (e) {
        console.error(e);
      }
    },
    [onAdd, setScannedCode, pathname, router],
  );
  return <UsbBarcodeListener onDetected={handleDetected} />;
}
