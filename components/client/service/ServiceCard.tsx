import React, { JSX } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { FaTurkishLiraSign } from "react-icons/fa6";

export type ServiceCardProps = {
  id: string;
  name: string;
  price: number;
};
const ServiceCard = ({ id, name, price }: ServiceCardProps): JSX.Element => {
  return (
    <Card className="overflow-hidden border-0 col-span-3 max-sm:col-span-2">
      <CardContent className="text-text-sun gap-2 flex-col flex">
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription className="text-xl flex flex-row items-center gap-1">
          {price} <FaTurkishLiraSign className="size-4" />
        </CardDescription>
      </CardContent>
    </Card>
  );
};
export default ServiceCard;
