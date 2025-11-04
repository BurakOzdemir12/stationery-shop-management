"use client";

import React from "react";
import PosCard from "@/components/admin/pos/PosCard";
type CartListProps = {
  prd: Product[];
};
const CartList = ({ prd }: CartListProps) => {
  return (
    <section className="grid lg:grid-cols-3 grid-cols-2 gap-5 mt-5  ">
      {prd.map((pr) => (
        <PosCard key={pr.id} {...pr} />
      ))}
    </section>
  );
};
export default CartList;
