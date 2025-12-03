import React, { Suspense } from "react";
import ServiceCard from "@/components/admin/service/ServiceCard";
import { getServices } from "@/lib/queries/service";
import ServiceList from "@/components/admin/service/ServiceList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ServiceForm from "@/components/admin/forms/ServiceForm";
import TypographyH2 from "@/components/ui/TypographyH2";
import ServicesSkeleton from "@/components/skeletons/admin/ServicesSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { getTranslations } from "next-intl/server";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const services = await getServices();
  const t = await getTranslations("ServicesPage");
  return (
    <section
      aria-label="admin-services"
      className="bg-white p-5 max-sm:p-1 rounded-2xl w-full"
    >
      <div className="flex flex-wrap items-center justify-between gap-5 mb-5">
        <TypographyH2 title={t("h1")} />
        <ServiceForm />
      </div>
      <Suspense fallback={<ServicesSkeleton />}>
        <ServiceList services={services} />
      </Suspense>
    </section>
  );
};
export default Page;
