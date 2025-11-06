"use client";
import React, { createContext, useState } from "react";
import { toast } from "react-hot-toast";

type CartItem = {
  id: string | number;
  name: string;
  sale_price: number | string;
  quantity: number;
} & Record<string, any>;

type PosCartCtx = {
  showPos: boolean;
  cartItems: CartItem[];
  totalPrice: number;
  totalQuantities: number;
  qty: number;
  setQty: React.Dispatch<React.SetStateAction<number>>;
  incQty: () => void;
  decQty: () => void;
  onAdd: (product: Omit<CartItem, "quantity">, quantity: number) => void;
  toggleCartItemQuantity: (id: CartItem["id"], value: "inc" | "dec") => void;
  onRemove: (id: CartItem["id"]) => void;
  onRemoveAll: () => void;
  onInputQty: (id: CartItem["id"], value: number) => void;
};
const Ctx = createContext<PosCartCtx | null>(null);

const PosCartContext = ({ children }: { children: React.ReactNode }) => {
  const [showPos, setShowPos] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  let foundProduct;
  let index;
  const onAdd: PosCartCtx["onAdd"] = (product, quantity) => {
    setTotalPrice((prevState) => prevState + product.sale_price * quantity);
    setTotalQuantities((prevState) => prevState + quantity);

    const checkProductInCart = cartItems.find((item) => item.id === product.id);

    if (checkProductInCart) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
      );
    } else {
      setCartItems((prev) => [...prev, { ...product, quantity }]);
    }
    toast.success(`${qty} ${product.name} added.`);
  };
  const onRemove = (id: string) => {
    foundProduct = cartItems.find((item) => item.id === id);
    setTotalPrice(
      (prevState) =>
        prevState - foundProduct.sale_price * foundProduct.quantity,
    );
    setTotalQuantities((prevState) => prevState - foundProduct.quantity);
    setCartItems((prevState) => prevState.filter((item) => item.id !== id));
  };
  const onRemoveAll = () => {
    foundProduct = cartItems.map((item) => item.id);
    setTotalPrice(0);
    setTotalQuantities(0);
    setCartItems([]);
  };
  const onInputQty: PosCartCtx["onInputQty"] = (id, input) => {
    foundProduct = cartItems.find((i) => i.id === id);
    if (!foundProduct) return;

    const nextQty = Math.max(1, Number(input) || 1);
    const diff = nextQty - foundProduct.quantity;
    const price = Number(foundProduct.sale_price) || 0;

    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: nextQty } : i)),
    );
    if (diff !== 0) {
      setTotalPrice((prev) => prev + price * diff);
      setTotalQuantities((prev) => prev + diff);
    }
  };

  const toggleCartItemQuantity: PosCartCtx["toggleCartItemQuantity"] = (
    id,
    value,
  ) => {
    foundProduct = cartItems.find((item) => item.id === id);
    index = cartItems.findIndex((product) => product.id === id);
    const price = Number(foundProduct.sale_price);
    if (value === "inc") {
      setCartItems((prevState) =>
        prevState.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
      setTotalPrice((prevState) => prevState + price);
      setTotalQuantities((prevState) => prevState + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems((prevState) =>
          prevState.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
          ),
        );
        setTotalPrice((prevState) => prevState - price);
        setTotalQuantities((prevState) => prevState - 1);
      }
    }
  };
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
        setQty,
        incQty,
        decQty,
        onAdd,
        onRemove,
        onRemoveAll,
        onInputQty,
        toggleCartItemQuantity,
      }}
    >
      {children}
    </Ctx.Provider>
  );
};
export default PosCartContext;

export const usePosCartContext = () => {
  const ctx = React.useContext(Ctx);
  if (!ctx) {
    throw new Error("usePosCart must be used within a PosCartContext");
  }
  return ctx;
};
