"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import ServiceCard, {
  ServiceCardProps,
} from "@/components/client/service/ServiceCard";

function chunkArray<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );
}
type ServiceCarouselProps = {
  services: Array<Pick<ServiceCardProps, "id" | "name" | "price">>;
};
const ServicesCarousel = ({ services }: ServiceCarouselProps) => {
  const serviceGroups = chunkArray(services, 6);
  const autoplay = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false }),
  );

  return (
    <section className="services-card rounded-2xl  bg-bgDarker">
      <Carousel
        className="shadow-xl shadow-borderColor"
        plugins={[autoplay.current]}
        onMouseLeave={autoplay.current.reset}
      >
        <CarouselContent>
          {serviceGroups.map((group, idx) => (
            <CarouselItem key={idx}>
              <div className="flex-col gap-4 grid grid-cols-9  max-sm:grid-cols-4">
                {group.map((g) => (
                  <ServiceCard key={g.id} {...g} />
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default ServicesCarousel;
