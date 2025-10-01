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
const PopularProductCard = ({
  id,
  title,
  category,
  brand,
  description,
  price,
  imageUrl,
  stock,
}: Product) => (
  <li className="col-span-3 lg:col-span-2 sm:col-span-2">
    <Link href={`/product/${id}`}>
      <Card className="bg-bgDarker border   border-borderColor w-full overflow-hidden ">
        <CardContent className="relative aspect-square overflow-hidden ">
          <Image
            src={imageUrl}
            alt="Product Image"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        </CardContent>
        <CardHeader className="px-2    ">
          <CardTitle className="text-amber-50">{title}</CardTitle>
          <CardDescription className="text-amber-100 mt-0.5 flex gap-1">
            {price} <FaTurkishLiraSign />
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  </li>
);
export default PopularProductCard;
