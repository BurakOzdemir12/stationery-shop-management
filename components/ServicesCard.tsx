import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { sampleServices } from "@/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { FaTurkishLiraSign } from "react-icons/fa6";

interface Props {
  id: number;
  name: string;
  price: number;
}
const ServicesCard = () => {
  return (
    <section className="services-card  ">
      <Carousel className=" shadow-xl shadow-borderColor">
        <CarouselContent>
          {sampleServices.map(({ id, name, price }) => (
            <CarouselItem key={id}>
              <div className="p-1">
                <Card className="overflow-hidden border-0">
                  <CardContent className=" text-text-sun gap-2 flex-col flex">
                    <CardTitle className="text-2xl">{name}</CardTitle>
                    <CardDescription className=" text-xl flex flex-row items-center gap-1">
                      {price} <FaTurkishLiraSign />
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};
export default ServicesCard;
