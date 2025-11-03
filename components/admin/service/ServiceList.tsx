"use client";
import React from "react";
import ServiceCard from "@/components/admin/service/ServiceCard";
type ServiceListProps = {
  services: Array<{
    id: string;
    name: string;
    price: number;
    createdAt: Date | null;
  }>;
};
const ServiceList = ({ services }: ServiceListProps) => {
  return (
    <section className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2  ">
      {services.map((s) => (
        <ServiceCard key={s.id} {...s} />
      ))}
    </section>
  );
};
export default ServiceList;
