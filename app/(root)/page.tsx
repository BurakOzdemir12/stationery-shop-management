import React from "react";
import { Button } from "@/components/ui/button";
import ProductOverview from "@/components/ProductOverview";
import ProductList from "@/components/ProductList";
import { sampleProducts } from "@/constants";
import { db } from "@/database/drizzle";
import { products, users } from "@/database/schema";
import { desc } from "drizzle-orm";
import ServicesCard from "@/components/ServicesCard";

const Home = async () => {
  const latestProducts = (await db
    .select()
    .from(products)
    .limit(8)
    .orderBy(desc(products.createdAt))) as Product[];
  return (
    <div className="">
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-3 lg:col-span-2">
          <ProductOverview {...latestProducts[0]} />
        </div>
        <div className="col-span-3 lg:col-span-1">
          <h1 className="text-3xl font-bebas text-white ">Services</h1>

          <ServicesCard />
        </div>
      </div>
      <ProductList
        title="Latest Products"
        products={latestProducts.slice(1)}
        containerClassName="product-list bg-bgDarker "
      />
    </div>
  );
};
export default Home;
