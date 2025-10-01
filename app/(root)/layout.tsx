import React, { ReactNode } from "react";
import Header from "@/components/Header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="root-container   ">
      <div className="mx-auto sm:container max-lg:p-2">
        <Header />
        <div className=" pb-20">{children}</div>
      </div>
    </main>
  );
};
export default Layout;
