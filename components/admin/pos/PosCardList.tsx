"use client";

import React from "react";
import PosCard from "@/components/admin/pos/PosCard";
type CartListProps = {
  products: Product[];
};
const PosCardList = ({ products }: CartListProps) => {
  return (
    <section
      id="#all-products"
      className="grid lg:grid-cols-4 grid-cols-2 gap-5 mt-5  "
    >
      {products.map((p) => (
        <PosCard key={p.id} {...p} />
      ))}
    </section>
  );
};
export default PosCardList;
