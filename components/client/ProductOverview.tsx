import React from "react";
import ProductCarousel from "@/components/client/ProductCarousel";
import { IoIosPricetag } from "react-icons/io";
import { FaTurkishLiraSign } from "react-icons/fa6";
import Link from "next/link";
import { textUpperCase } from "@/lib/utils";

const ProductOverview = ({
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
  return (
    <section id="overview" className="product-overview">
      <div className="flex flex-1 sm:col-span-1  col-span-2 flex-col ">
        <h1 className="text-text-gold">{textUpperCase(name)}</h1>
        <div className="product-info">
          <p className="text-amber-100 opacity-85">{description}</p>

          <div className="product-info-blocks">
            <div className="info-block ">
              <div className="price flex flex-row items-center gap-1 ">
                <IoIosPricetag size={25} />{" "}
                <span className="flex flex-row text-2xl items-center gap-0.5 text-text-gold">
                  {" "}
                  {sale_price}{" "}
                  <FaTurkishLiraSign size={14} className="align-middle" />
                </span>
              </div>
            </div>
            <div className="info-block ">
              Category:
              <span className="text-amber-100 text-lg ">
                {" "}
                {textUpperCase(category)}
              </span>
            </div>
            <div className="info-block">
              Brand:{" "}
              <span className="text-amber-100 text-lg">
                {" "}
                {textUpperCase(brand)}
              </span>{" "}
            </div>{" "}
            <div className="info-block">
              Stock:<span className="text-amber-100"> {stock} </span>
            </div>
          </div>
          <Link href={`/products/${id}`} className="w-fit">
            <div className="rounded-md  text-black font-medium  p-1.5 w-fit  btn-gold">
              View Details
            </div>
          </Link>
        </div>
      </div>

      {/*Carousel*/}
      <div className="flex flex-1  sm:col-span-1  col-span-2  justify-center">
        <ProductCarousel
          image={image}
          containerClassName="object-contain rounded-md w-85 min-h-85"
        />
      </div>
    </section>
  );
};
export default ProductOverview;
