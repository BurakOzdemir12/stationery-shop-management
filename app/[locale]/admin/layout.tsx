import React, { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import "@/styles/admin.css";
import SideBar from "@/components/admin/SideBar";
import Header from "@/components/admin/Header";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import BreadCrumb from "@/components/client/BreadCrumb";
import GlobalUsbBarcodeListener from "@/components/admin/barcode/GlobalUsbBarcodeListener";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/sign-in");
  }
  const isAdmin = await db
    .select({ isAdmin: users.role })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1)
    .then((res) => res[0]?.isAdmin === "ADMIN");

  if (!isAdmin) redirect("/");
  return (
    <main className="flex flex-row min-h-screen   w-full">
      <SideBar session={session} />
      <div className="admin-container   ">
        <Header session={session} />
        <BreadCrumb />
        <div className="p-5">
          <GlobalUsbBarcodeListener />
          {children}
        </div>
      </div>
    </main>
  );
};
export default Layout;
