"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Session } from "next-auth";
import CameraBarcodeScanner from "@/components/admin/barcode/CameraBarcodeScanner";
import { useRouter } from "next/navigation";
import { useBarcodeContext } from "@/app/[locale]/context/BarcodeContext";
import { usePosCartContext } from "@/app/[locale]/context/PosCartContext";

const Header = ({ session }: { session: Session }) => {
  const [isScanOpen, setOpenScan] = React.useState(false);
  const { setScannedCode } = useBarcodeContext();
  const { onAdd } = usePosCartContext();
  const router = useRouter();

  return (
    <header className="admin-header bg-white border-neutral-300 border-r-1 border-b-1 ">
      <div className=" p-3  grid grid-cols-3   gap-5 ">
        <div className="search-bar col-span-1 align-middle  "></div>
        <div className="pos-screen col-span-1">
          {/*If you don't have any usb barcode reader/scanner you can use your laptop or usb camera for adding Product to your pos.
          // !You have to scan it with clear light otherwise it won't work. */}

          {/*<CameraBarcodeScanner*/}
          {/*  className="btn-pri text-xl"*/}
          {/*  title="Scan Product"*/}
          {/*  open={isScanOpen}*/}
          {/*  onOpenChange={setOpenScan}*/}
          {/*  // type="pos"*/}
          {/*  onDetected={async (code) => {*/}
          {/*    try {*/}
          {/*      const res = await fetch(*/}
          {/*        `/api/products/by-barcode?code=${encodeURIComponent(code)}`,*/}
          {/*        { cache: "no-store" },*/}
          {/*      );*/}
          {/*      if (!res.ok) throw new Error("Product not found");*/}

          {/*      const product: Product = await res.json();*/}
          {/*      const { id, name, image, sale_price, stock, brand } = product;*/}

          {/*      onAdd({ id, name, image, sale_price, stock, brand }, 1);*/}
          {/*      setScannedCode(code);*/}
          {/*      setOpenScan(false);*/}
          {/*      router.push(`/admin/pos?barcode=${encodeURIComponent(code)}`);*/}
          {/*    } catch {}*/}
          {/*  }}*/}
          {/*/>*/}
        </div>
        <div className="info col-span-1 flex-row flex  justify-self-end  ">
          <p className="text-xl font-pacifico ">{session?.user?.name}</p>
          {/*<Image src={session?.user?.image} alt="Profile image" />*/}
        </div>
      </div>
    </header>
  );
};
export default Header;
