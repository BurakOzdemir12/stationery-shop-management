import React from "react";
import StatBox from "@/components/admin/dashboard/StatBox";
import { getOrdersByMonthOrYear } from "@/lib/queries/totalSales";
import { getTotalRevenue } from "@/lib/queries/revenue";

const StatBoxList = async ({
  searchParams,
}: {
  searchParams: { year?: string; month?: string; period?: string };
}) => {
  const params = await searchParams;
  const now = new Date();
  const month = params.month ? Number(params.month) : now.getMonth() + 1;
  const year = params.year ? Number(params.year) : now.getFullYear();
  const period = params.period === "year" ? "year" : "month";

  const orders = await getOrdersByMonthOrYear({ year, month, period });
  const totalRevenue = await getTotalRevenue({ period, month, year });
  return (
    <>
      <StatBox
        type="revenue"
        value={totalRevenue}
        percentageValue={12}
        title="Total Revenue"
        higherThan={false}
      />
      <StatBox
        type="sales"
        value={orders.length}
        percentageValue={-12}
        title="Total Sales"
        higherThan={false}
      />
      <StatBox
        type="users"
        value={55}
        percentageValue={12}
        title="Active Users"
        higherThan={true}
      />
      <StatBox
        type="requests"
        value={55}
        percentageValue={12}
        title="Product Requests"
        higherThan={true}
      />
    </>
  );
};
export default StatBoxList;
