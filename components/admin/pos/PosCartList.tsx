"use client";
import React from "react";
import PosCart from "@/components/admin/pos/PosCart";
import { Button } from "@/components/ui/button";
import { FaTrashCan } from "react-icons/fa6";
import { usePosCartContext } from "@/app/context/PosCartContext";
import MoneyCell from "@/components/admin/product/cells/MoneyCell";
import { FaLuggageCart } from "react-icons/fa";

const PosCartList = () => {
  const { cartItems, totalQuantities, totalPrice, onRemoveAll, finalizeOrder } =
    usePosCartContext();
  return (
    <div className="  gap-2 flex flex-col  ">
      <div className="flex flex-row justify-between gap-5 mb-2">
        <div className="grid grid-cols-3 items-center ">
          <h2 className="col-span-1 font-bold text-xl text-neutral-500 items-start ">
            Total Items
          </h2>
          <h2
            className="col-span-1 bg-secondary p-0.5 w-15 text-center
          justify-self-center  rounded-2xl text-xl font-bold text-primary"
          >
            {totalQuantities}
          </h2>
          <span className="justify-self-end col-span-1">
            <MoneyCell value={Number(totalPrice)} tone="cart" size="xl" />
          </span>
        </div>
        <Button className=" btn-del w-fit" onClick={onRemoveAll}>
          <FaTrashCan className="size-5" />
          Clear Cart
        </Button>
      </div>
      <div id="cart-products" className="max-h-100 h-screen overflow-y-auto">
        {cartItems.length < 1 && (
          <h1 className="text-center text-xl text-neutral-500 justify-items-center mt-20">
            <FaLuggageCart size={100} className="" />
            Cart is Empty Scan it
          </h1>
        )}
        {cartItems.map((item) => (
          <PosCart key={item.id} {...item} />
        ))}
      </div>
      <div id="cart-data" className="mt-5 ">
        <div className="grid grid-cols-2 items-center justify-items-center  justify-between mt-10 ">
          <h2 className="col-span-1 font-bold text-xl text-neutral-500  ">
            Total Price
          </h2>

          <span className=" col-span-1">
            <MoneyCell value={Number(totalPrice)} tone="cart" size="xl" />
          </span>
        </div>
      </div>
      <div className="self-center mt-5">
        <Button onClick={finalizeOrder} className="btn-suc  w-fit mt-5">
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};
export default PosCartList;
