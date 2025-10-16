import React from "react";
import ProductCarousel from "@/components/ProductCarousel";
import { FaTurkishLiraSign } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { FaBox, FaBoxOpen } from "react-icons/fa";

const ProductDetail = ({
  id,
  name,
  category,
  brand,
  description,
  sale_price,
  image,
  stock,
  barcode,
  code,
}: Product) => {
  const textStyle = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1);
  return (
    <section className="product-detail lg:px-30  ">
      <div className=" grid grid-cols-2 justify-items-start  ">
        <div className="p-10 lg:col-span-1  col-span-2 ">
          <ProductCarousel
            image={image}
            containerClassName={cn(
              "w-125 object-fill pt-0 mt-0 rounded-lg  min-h-85",
            )}
          />
        </div>
        <div className="p-10  lg:col-span-1 col-span-2 ">
          <div className="h-full w-fit gap-5  flex flex-col flex-1 ">
            <h1 className="text-text-gold text-3xl  font-medium">{name}</h1>
            {stock > 0 ? (
              <div className="p-2 w-fit rounded-2xl bg-[#16a34a]   text-xl">
                <p className="text-white font-medium flex-row flex gap-2 flex-1 items-center ">
                  <FaBoxOpen className="size-7 text-gray-900" /> Stock
                  Available: {stock}
                </p>
              </div>
            ) : (
              <div className="p-2 w-fit  rounded-2xl bg-red-700   text-xl">
                <p className="text-white font-medium flex-row flex gap-2 flex-1 items-center ">
                  <FaBox className="size-7 text-gray-100" />
                  Stock Unavailable: {stock}
                </p>
              </div>
            )}
            <p className="text-white font-serif font-light text-lg opacity-80">
              {textStyle(description)}
            </p>
            <div className="bg-[#9aa6b2] font-bold text-lg gap-10 rounded-2xl p-4 grid grid-cols-4">
              <div className="flex col-span-2  ">
                {" "}
                Price:
                {sale_price}
                <FaTurkishLiraSign />
              </div>
              <div className="flex col-span-2  ">
                Category: {textStyle(category)}
              </div>
              <div className="flex col-span-2  ">Brand: {textStyle(brand)}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProductDetail;
