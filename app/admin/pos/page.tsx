import React from "react";
import TypographyH2 from "@/components/ui/TypographyH2";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { getPaginatedAdminProducts, getProducts } from "@/lib/queries/products";
import { db } from "@/database/drizzle";
import { products } from "@/database/schema";
import { desc } from "drizzle-orm";
import CartList from "@/components/admin/pos/CartList";

const Page = async () => {
  const prd = (await getProducts()).map((p) => ({
    ...p,
    purchase_price: String(p.purchase_price),
    sale_price: String(p.sale_price),
  }));
  return (
    <div className="bg-white p-5 rounded-2xl w-full ">
      <TypographyH2 title="Retail Pos " />

      <div id="main-field" className="grid grid-cols-3 w-full gap-5  ">
        <div
          id="products-section"
          className="col-span-2 border-border border rounded-md p-3 bg-card"
        >
          <Input
            className="  w-md bg-input-field text-xl "
            placeholder="Search Product"
          />
          <CartList prd={prd} />
        </div>
        <div
          id="cart-section"
          className="col-span-1 border-border border rounded-md p-3 bg-card"
        ></div>
      </div>
    </div>
  );
};
export default Page;
