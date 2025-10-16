"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";

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
import { FaTurkishLiraSign } from "react-icons/fa6";

function chunkArray<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );
}

const ServicesCard = () => {
  const serviceGroups = chunkArray(sampleServices, 6);
  const autoplay = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false }),
  );
  return (
    <section className="services-card bg-bgDarker">
      <Carousel
        className="shadow-xl shadow-borderColor"
        plugins={[autoplay.current]}
        onMouseLeave={autoplay.current.reset}
      >
        <CarouselContent>
          {serviceGroups.map((group, idx) => (
            <CarouselItem key={idx}>
              <div className="flex-col gap-4 grid grid-cols-9  max-sm:grid-cols-4">
                {group.map(({ id, name, price }) => (
                  <Card
                    key={id}
                    className="overflow-hidden border-0 col-span-3 max-sm:col-span-2"
                  >
                    <CardContent className="text-text-sun gap-2 flex-col flex">
                      <CardTitle className="text-xl">{name}</CardTitle>
                      <CardDescription className="text-xl flex flex-row items-center gap-1">
                        {price} <FaTurkishLiraSign className="size-4" />
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default ServicesCard;
