"use client";
import React, { createContext, useState } from "react";

type PosCartCtx = {
  showPos: boolean;
  cartItems: Array<any> | undefined;
  totalPrice: number;
  totalQuantities: number;
  qty: number;
};
const Ctx = createContext<PosCartCtx | null>(null);

const PosCartContext = ({ children }: { children: React.ReactNode }) => {
  const [showPos, setShowPos] = useState(false);
  const [cartItems, setCartItems] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };
  return (
    <Ctx.Provider
      value={{
        showPos,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
      }}
    >
      {children}
    </Ctx.Provider>
  );
};
export default PosCartContext;
