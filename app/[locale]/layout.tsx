import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  Bebas_Neue,
  Pacifico,
} from "next/font/google";
import "../globals.css";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import AlertDialogBox from "@/components/AlertDialogBox";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ConfirmAlertContext } from "@/app/[locale]/context/ConfirmAlertContext";
import { BarcodeContext } from "@/app/[locale]/context/BarcodeContext";
import PosCartContext from "@/app/[locale]/context/PosCartContext";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

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

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

const RootLayout = async ({ children, params }: Props) => {
  const session = await auth();
  const { locale } = await params;
  const messages = await getMessages();

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className="scroll-smooth ">
      <SessionProvider session={session}>
        <body className="antialiased bg-bgDark">
          <NextIntlClientProvider messages={messages}>
            <ConfirmAlertContext>
              <BarcodeContext>
                <PosCartContext>
                  {children}
                  <AlertDialogBox />
                </PosCartContext>
              </BarcodeContext>
            </ConfirmAlertContext>
            <Toaster position="bottom-right" reverseOrder={false} />
          </NextIntlClientProvider>
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
