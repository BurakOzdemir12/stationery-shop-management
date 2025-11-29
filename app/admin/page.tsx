import React from "react";
import TypographyH2 from "@/components/ui/TypographyH2";
import StatBoxList from "@/components/admin/dashboard/StatBoxList";
import RevenueChart from "@/components/admin/dashboard/RevenueChart";
import { getRevenueByDay } from "@/lib/queries/revenue";
import { getOrdersByDay } from "@/lib/queries/totalSales";

const Page = async ({
  searchParams,
}: {
  searchParams: { year?: string; month?: string; period?: string };
}) => {
  const revenueData = await getRevenueByDay(90);
  const salesData = await getOrdersByDay(90);

  console.log(salesData);

  return (
    <div className="bg-white p-5 rounded-2xl w-full">
      <TypographyH2 title="Dashboard" />
      <div className="w-full grid grid-cols-4 max-lg:grid-cols-2 gap-6   ">
        <StatBoxList searchParams={searchParams} />
      </div>
      <div className="w-full mt-20 ">
        <RevenueChart revenueData={revenueData} salesData={salesData} />
      </div>
    </div>
  );
};
export default Page;
