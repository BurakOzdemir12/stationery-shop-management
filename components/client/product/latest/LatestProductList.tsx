"use client";
import React from "react";
import Image from "next/image";
import LatestProductCard from "@/components/client/product/latest/LatestProductCard";
import { useTranslations } from "next-intl";

interface Props {
  title: string;
  products: ProductClient[];
  containerClassName?: string;
}

const LatestProductList = ({ title, products, containerClassName }: Props) => {
  const t = useTranslations("HomaPage");
  return (
    <section className={containerClassName}>
      <h1 className="mt-3">{t(`${title}`)}</h1>

      <ul className="   grid grid-cols-6 xl:grid-cols-6  gap-3">
        {products.map((product) => (
          <LatestProductCard key={product.id} {...product} />
        ))}
      </ul>
    </section>
  );
};
export default LatestProductList;
