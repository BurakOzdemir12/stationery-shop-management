"use client";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import MoneyCell from "@/components/admin/product/cells/MoneyCell";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaWindowClose } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { usePosCartContext } from "@/app/[locale]/context/PosCartContext";

const PosCart = ({ id, name, sale_price, quantity }) => {
  const { toggleCartItemQuantity, onRemove, onInputQty } = usePosCartContext();

  return (
    <Card className="bg-secondary mt-3 max-h-20 h-full border-0 p-1 items-center  flex flex-row w-full ">
      <CardHeader className="p-0.5 text-primary text-[21px]  font-semibold  w-full text-start">
        {name}
      </CardHeader>
      <CardAction className="bg-form-field self-center rounded-2xl    ">
        <ButtonGroup orientation="horizontal" className="  ">
          <Button
            variant="outline"
            className="btn-incDec rounded-2xl rounded-e-none "
            size="icon"
            onClick={() => toggleCartItemQuantity(id, "dec")}
          >
            <MinusIcon className="size-6" />
          </Button>{" "}
          <Input
            type="number"
            inputMode="numeric"
            className=" w-fit text-center no-spinner

            max-w-25 border-0 text-black font-extrabold selection:bg-neutral-400"
            onChange={(e) => onInputQty(id, Number(e.target.value))}
            value={quantity}
          />
          <Button
            className="btn-incDec rounded-2xl  rounded-s-none "
            size="icon"
            onClick={() => toggleCartItemQuantity(id, "inc")}
          >
            <PlusIcon className="size-6" />
          </Button>
        </ButtonGroup>
      </CardAction>
      <CardContent className="p-0 min-w-10 max-w-15 w-full">
        <MoneyCell value={sale_price} size="xl" tone="cart" />
      </CardContent>
      <div className="  align-top self-start items-end justify-items-end ">
        <AiOutlineClose
          onClick={() => onRemove(id)}
          className="size-5 p-0 text-red-700 font-bold cursor-pointer hover:bg-red-400 hover:text-white  "
        />
      </div>
    </Card>
  );
};
export default PosCart;
