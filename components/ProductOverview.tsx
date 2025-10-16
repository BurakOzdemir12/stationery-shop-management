import React from "react";
import ProductCarousel from "@/components/ProductCarousel";
import { IoIosPricetag } from "react-icons/io";
import { FaTurkishLiraSign } from "react-icons/fa6";
import Link from "next/link";

const ProductOverview = ({
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
        <h1>{name}</h1>
        <div className="product-info">
          <p className="text-amber-50">{description}</p>

          <div className="price flex flex-row items-center gap-1 ">
            <IoIosPricetag size={25} /> {sale_price}{" "}
            <FaTurkishLiraSign size={14} className="align-middle" />
          </div>
          <div className="product-info-blocks">
            <div className="info-block">
              Category:<span className="text-amber-100"> {category}</span>
            </div>
            <div className="info-block">
              Brand:{" "}
              <span className="text-amber-100">
                {" "}
                {brand.charAt(0).toLocaleUpperCase("tr-TR") + brand.slice(1)}
              </span>{" "}
            </div>{" "}
            <div className="info-block">Stock: {stock}</div>
          </div>
          <Link href={`/product/1`} className="w-fit">
            <div className="rounded-md  text-black font-medium  p-2 w-fit  bg-text-sun">
              View Details
            </div>
          </Link>
        </div>
      </div>

      {/*Carousel*/}
      <div className="flex flex-1  sm:col-span-1  col-span-2 justify-center">
        <ProductCarousel image={image} />
      </div>
    </section>
  );
};
export default ProductOverview;
