import React, { ReactNode } from "react";
import Image from "next/image";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (session) redirect("/");

  return (
    <main className="auth-container bg-bgDark">
      <section className="auth-form ">
        <div className="auth-box">
          <div className="flex flex-row items-center gap-3 mb-1  ">
            <Image src="/brand3.png" alt="" width={75} height={75} />
            <h1 className="text-xl font-semibold   ">Güneş Kırtasiye</h1>
          </div>
          <div>{children}</div>
        </div>
      </section>
      <section className="auth-illustration">
        <Image
          src="/images/auth/shop.png"
          alt="illustration"
          width={1000}
          height={1000}
          className="size-full object-cover"
        />
      </section>
    </main>
  );
};
export default Layout;
