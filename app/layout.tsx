import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  Bebas_Neue,
  SUSE,
  Pacifico,
} from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { BarcodeContext } from "@/app/context/BarcodeContext";
import PosCartContext from "@/app/context/PosCartContext";
import { ConfirmAlertContext } from "@/app/context/ConfirmAlertContext";
import AlertDialogBox from "@/components/AlertDialogBox";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});
const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
  display: "swap",
});
export const metadata: Metadata = {
  title: "Gunes Kırtasiye",
  description: "",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  return (
    <html lang="en" className="scroll-smooth ">
      <SessionProvider session={session}>
        <body className={`${inter.className} ${inter.variable}   antialiased`}>
          <ConfirmAlertContext>
            <BarcodeContext>
              <PosCartContext>
                {children}
                <AlertDialogBox />
              </PosCartContext>
            </BarcodeContext>
          </ConfirmAlertContext>
          <Toaster position="bottom-right" reverseOrder={false} />
        </body>
      </SessionProvider>
    </html>
  );
};
export default RootLayout;
