import React from "react";
import TypographyH2 from "@/components/ui/TypographyH2";
import StatBoxList from "@/components/admin/dashboard/StatBoxList";
import RevenueChart from "@/components/admin/dashboard/RevenueChart";
import { getRevenueByDay } from "@/lib/queries/revenue";
import { getOrdersByDay } from "@/lib/queries/totalSales";
import { getTranslations } from "next-intl/server";

const Page = async ({
  searchParams,
}: {
  searchParams: { year?: string; month?: string; period?: string };
}) => {
  const revenueData = await getRevenueByDay(90);
  const salesData = await getOrdersByDay(90);
  const t = await getTranslations("DashboardPage");
  return (
    <div className="bg-white p-5 rounded-2xl w-full">
      <TypographyH2 title={t("h1")} />
      <div className="w-full grid grid-cols-4 max-lg:grid-cols-2 gap-6   ">
        <StatBoxList searchParams={searchParams} t={t} />
      </div>
      <div className="w-full mt-20 ">
        <RevenueChart revenueData={revenueData} salesData={salesData} />
      </div>
    </div>
  );
};
export default Page;
