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

interface Props {
  imageUrl: string;
}
const ProductCarousel = ({ imageUrl }: Props) => {
  return (
    <section className="product-carousel ">
      <Carousel className="w-full max-lg:w-65 max-xl:w-70 xl:w-100 ">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="overflow-hidden ">
                  <CardContent className="flex aspect-square items-center justify-center p-0">
                    <span className=" ">
                      {/*{index + 1}*/}
                      <Image
                        src={imageUrl}
                        alt="product image"
                        fill
                        className="object-cover rounded-md w-full"
                      />
                      {/*<img*/}
                      {/*  src=""*/}
                      {/*  alt="ProductForm image"*/}
                      {/*  className="w-full h-full object-cover"*/}
                      {/*/>*/}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
export default ProductCarousel;
