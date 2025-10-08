import React from "react";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/auth";
import ProductList from "@/components/ProductList";
import { sampleProducts } from "@/constants";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/");
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <Button className="btn-gold">Logout</Button>
      </form>
      <ProductList
        containerClassName="product-list bg-bgDarker"
        title="Your Requests "
        products={sampleProducts}
      />
    </div>
  );
};
export default Page;
