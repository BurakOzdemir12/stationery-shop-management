"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { IKImage } from "imagekitio-react";
import config from "@/lib/config";

interface Props {
  image: string;
}
const ProductCarousel = ({ image }: Props) => {
  return (
    <section className="product-carousel ">
      <Carousel className="w-full   ">
        <CarouselContent>
          {Array.from({ length: 1 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="overflow-hidden border-0">
                  <CardContent className="flex aspect-square items-center justify-center p-0">
                    <span className=" ">
                      {/*{index + 1}*/}
                      <IKImage
                        path={image}
                        urlEndpoint={config.env.imagekit.urlEndpoint}
                        alt="product image"
                        fill
                        className="object-cover rounded-md w-85  "
                      />
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/*<CarouselPrevious />*/}
        {/*<CarouselNext />*/}
      </Carousel>
    </section>
  );
};
export default ProductCarousel;
