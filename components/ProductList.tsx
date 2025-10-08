import React from "react";
import Image from "next/image";
import PopularProductCard from "@/components/PopularProductCard";

interface Props {
  title: string;
  products: Product[];
  containerClassName?: string;
}

const ProductList = ({ title, products, containerClassName }: Props) => {
  return (
    <section className={containerClassName}>
      <h1 className="mt-3">{title}</h1>

      <ul className="   grid grid-cols-6 xl:grid-cols-8 gap-3">
        {products.map((product) => (
          <PopularProductCard key={product.id} {...product} />
        ))}
      </ul>
    </section>
  );
};
export default ProductList;
