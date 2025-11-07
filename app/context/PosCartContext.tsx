"use client";
import React, { createContext, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { FaCircleMinus } from "react-icons/fa6";

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
  finalizeOrder: () => Promise<void>;
};
const Ctx = createContext<PosCartCtx | null>(null);
const POS = process.env.pos;
const PosCartContext = ({ children }: { children: React.ReactNode }) => {
  const [showPos, setShowPos] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const isHydratedRef = useRef(false);

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

    toast.success(`${qty} ${product.name} added.`, { position: "top-center" });
  };
  const onRemove = (id: string) => {
    foundProduct = cartItems.find((item) => item.id === id);
    if (!foundProduct) return;

    setTotalPrice(
      (prevState) =>
        prevState - foundProduct.sale_price * foundProduct.quantity,
    );
    setTotalQuantities((prevState) => prevState - foundProduct.quantity);
    setCartItems((prevState) => prevState.filter((item) => item.id !== id));
    toast.success(`${qty} ${foundProduct.name} removed successfully.`, {
      icon: <FaCircleMinus className="text-success size-6" />,
      position: "top-center",
    });
  };
  const onRemoveAll = () => {
    foundProduct = cartItems.map((item) => item.id);
    setTotalPrice(0);
    setTotalQuantities(0);
    setCartItems([]);
    toast.success(`${totalQuantities} Product removed successfully.`, {
      icon: <FaCircleMinus className="text-success size-6" />,
      position: "top-center",
    });
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

  useEffect(() => {
    try {
      const raw = localStorage.getItem(POS);
      if (raw) {
        const parsed = JSON.parse(raw) as { items?: CartItem[] };
        if (Array.isArray(parsed.items)) {
          setCartItems(parsed.items);
          recomputeTotals(parsed.items);
        }
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
    isHydratedRef.current = true;
  }, []);

  useEffect(() => {
    if (!isHydratedRef.current) return;
    const t = setTimeout(() => {
      try {
        localStorage.setItem(POS, JSON.stringify({ items: cartItems }));
      } catch {}
    }, 150);
    return () => clearTimeout(t);
  }, [cartItems]);

  const recomputeTotals = (items: CartItem[]) => {
    let tp = 0;
    let tq = 0;
    for (const it of items) {
      const price = Number(it.sale_price) || 0;
      tp += price * it.quantity;
      tq += it.quantity;
    }
    setTotalPrice(tp);
    setTotalQuantities(tq);
  };
  const finalizeOrder: PosCartCtx["finalizeOrder"] = async () => {
    if (cartItems.length === 0) return;
    try {
      const payload = {
        items: cartItems.map((i) => ({
          productId: String(i.id),
          quantity: i.quantity,
        })),
      };
      const res = await fetch("/api/pos/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => null);
        throw new Error(j?.message || "Order failed");
      }
      await res.json();
      onRemoveAll();
      toast.success("Order completed.", { position: "top-center" });
    } catch (e) {
      toast.error((e as Error).message || "Failed", { position: "top-center" });
      console.error(e);
    }
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
        finalizeOrder,
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
