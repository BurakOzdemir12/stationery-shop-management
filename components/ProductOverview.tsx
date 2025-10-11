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
  price,
  image,
  stock,
}: Product) => {
  return (
    <section id="overview" className="product-overview">
      <div className="flex flex-1 sm:col-span-1  col-span-2 flex-col">
        <h1>{name}</h1>
        <div className="product-info">
          <p className="text-amber-50">{description}</p>

          <div className="price flex flex-row gap-1 ">
            <IoIosPricetag size={25} /> {price}{" "}
            <FaTurkishLiraSign size={14} className="align-middle" />
          </div>
          <div className="product-info-blocks">
            <div className="info-block">{category}</div>
            <div className="info-block">{brand}</div>
            <div className="info-block">{stock}</div>
            <div className="info-block"></div>
          </div>
          <Link href={`/product/1`} className="w-fit">
            <div className="rounded-md  p-4 w-fit  bg-blue-800">
              View Details
            </div>
          </Link>
        </div>
      </div>

      {/*Carousel*/}
      <div className="flex flex-1  sm:col-span-1  col-span-2  justify-center">
        <ProductCarousel imageUrl={image} />
      </div>
    </section>
  );
};
export default ProductOverview;
