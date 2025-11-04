"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Session } from "next-auth";
import GlobalBarcodeScanner from "@/components/admin/barcode/GlobalBarcodeScanner";
import { useRouter } from "next/navigation";
import { useBarcode } from "@/app/context/BarcodeContext";

const Header = ({ session }: { session: Session }) => {
  const [isScanOpen, setOpenScan] = React.useState(false);
  const { setScannedCode } = useBarcode();
  const router = useRouter();
  return (
    <header className="admin-header bg-white border-neutral-300 border-r-1 border-b-1 ">
      <div className=" p-3  grid grid-cols-3   gap-5 ">
        <div className="search-bar col-span-1 align-middle  ">
          <Input
            className="bg-neutral-300 rounded-2xl placeholder:font-medium   "
            placeholder="Ara.."
          />
        </div>
        <div className="pos-screen col-span-1">
          {/*<Button className="btn-pri text-xl h-full">Scan Product</Button>*/}
          <GlobalBarcodeScanner
            className="btn-pri text-xl"
            title="Scan Product"
            open={isScanOpen}
            onOpenChange={setOpenScan}
            onDetected={(code) => {
              setScannedCode(code);
              setOpenScan(false);
              router.push(`/admin/pos?barcode=${encodeURIComponent(code)}`); // POS sayfasına yönlendir
            }}
          />
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
