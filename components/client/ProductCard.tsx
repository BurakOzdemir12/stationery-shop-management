"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaTurkishLiraSign } from "react-icons/fa6";
import { IKImage } from "imagekitio-react";
import config from "@/lib/config";
import React from "react";
import { textUpperCase } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type ProductListProps = {
  products: Product[];
  variant?: "public" | "admin";
};

export const ProductCard = ({ products }: ProductListProps) => {
  return (
    <section id="all-products" className="all-products   ">
      <div className=" grid grid-cols-2 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2  gap-5 max-sm:gap-2  ">
        {products.map(
          ({
            id,
            name,
            description,
            category,
            brand,
            purchase_price,
            sale_price,
            stock,
            barcode,
            code,
            image,
            createdAt,
          }) => (
            <Link href={`/products/${id}`} key={id} passHref>
              <Card className="m-0 pt-0  bg-bgDarker border-borderColor border-2 ">
                <IKImage
                  path={image}
                  urlEndpoint={config.env.imagekit.urlEndpoint}
                  alt="Product Image"
                  className="object-fill  w-full rounded-xs max-md:h-50 h-60  "
                  loading="lazy"
                  lqip={{ active: true }}
                />
                <div className="px-2 pb-0 m-0 flex flex-row gap-4 text-text-sun items-center justify-between">
                  <CardTitle className="">{name}</CardTitle>
                  <p className="flex gap-0.5">
                    {sale_price} <FaTurkishLiraSign />
                  </p>
                </div>

                <CardContent className="px-2 mt-0  ">
                  <h3 className="font-semibold opacity-85 text-sm text-text-sun">
                    {" "}
                    {textUpperCase(brand || "No Brand")}
                  </h3>
                  <CardDescription className="font-semibold opacity-65 text-sm text-white">
                    {textUpperCase(description)}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ),
        )}
      </div>
    </section>
  );
};
