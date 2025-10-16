"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoIosPricetag } from "react-icons/io";
import { FaTurkishLiraSign } from "react-icons/fa6";
import { IKImage } from "imagekitio-react";
import config from "@/lib/config";
const PopularProductCard = ({
  id,
  name,
  category,
  brand,
  description,
  sale_price,
  image,
  stock,
}: Product) => (
  <li className="col-span-3 lg:col-span-1  sm:col-span-2 max-sm:col-span-6">
    <Link href={`/product/${id}`}>
      <Card className="bg-bgDarker pt-0 border-t-0  border-borderColor  w-full overflow-hidden ">
        <CardContent className=" p-0">
          <IKImage
            path={image}
            urlEndpoint={config.env.imagekit.urlEndpoint}
            alt="Product Image"
            fill
            className="object-cover w-full h-full rounded-md "
            loading="lazy"
            lqip={{ active: true }}
          />
        </CardContent>
        <CardHeader className="px-2">
          <CardTitle className="text-amber-50">{name}</CardTitle>
          <CardDescription className="text-amber-100 mt-0.5 flex gap-1">
            {sale_price} <FaTurkishLiraSign />
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  </li>
);
export default PopularProductCard;
