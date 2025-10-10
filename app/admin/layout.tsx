import React, { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import "@/styles/admin.css";
import SideBar from "@/components/admin/SideBar";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/sign-in");
  }
  return (
    <main className="flex flex-row min-h-screen w-full">
      <SideBar session={session} />
      <div className="admin-container">
        <p>Header</p>
        <div className="">{children}</div>
      </div>
    </main>
  );
};
export default Layout;
