import React from "react";
import { Button } from "@/components/ui/button";
import ProductOverview from "@/components/ProductOverview";
import ProductList from "@/components/ProductList";
import { sampleProducts } from "@/constants";

const Home = () => {
  return (
    <div className="">
      <ProductOverview {...sampleProducts[0]} />

      <ProductList
        title="Latest Products"
        products={sampleProducts}
        containerClassName="product-list bg-bgDarker"
      />
    </div>
  );
};
export default Home;
