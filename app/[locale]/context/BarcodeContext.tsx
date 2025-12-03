"use client";
import React, { createContext, useContext, useState } from "react";
type BarcodeCtx = {
  scannedCode: string;
  setScannedCode: React.Dispatch<React.SetStateAction<string>>;
  isScannerActive: boolean;
  setIsScannerActive: React.Dispatch<React.SetStateAction<boolean>>;
};
const Ctx = createContext<BarcodeCtx | null>(null);
export function BarcodeContext({ children }: { children: React.ReactNode }) {
  const [scannedCode, setScannedCode] = useState("");
  const [isScannerActive, setIsScannerActive] = useState(false);

  return (
    <Ctx.Provider
      value={{
        scannedCode,
        setScannedCode,
        isScannerActive,
        setIsScannerActive,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
export function useBarcodeContext() {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error("useBarcode must be used within a BarcodeContext");
  }
  return ctx;
}
