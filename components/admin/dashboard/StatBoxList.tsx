import React from "react";
import StatBox from "@/components/admin/dashboard/StatBox";
import { getOrdersByMonthOrYear } from "@/lib/queries/totalSales";
import { getTotalRevenue } from "@/lib/queries/revenue";

const StatBoxList = async ({
  searchParams,
  t,
}: {
  searchParams: { year?: string; month?: string; period?: string };
  t: (key: string) => string;
}) => {
  const params = await searchParams;
  const now = new Date();
  const month = params.month ? Number(params.month) : now.getMonth() + 1;
  const year = params.year ? Number(params.year) : now.getFullYear();
  const period = params.period === "year" ? "year" : "month";

  const orders = await getOrdersByMonthOrYear({ year, month, period });
  const totalRevenue = await getTotalRevenue({ period, month, year });
  const percentageCalcs = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };
  return (
    <>
      <StatBox
        type="revenue"
        value={totalRevenue}
        percentageValue={12}
        title={t("totalRevenue")}
        higherThan={false}
      />
      <StatBox
        type="sales"
        value={orders.length}
        percentageValue={-12}
        title={t("totalSales")}
        higherThan={false}
      />
      <StatBox
        type="users"
        value={55}
        percentageValue={12}
        title={t("totalUsers")}
        higherThan={true}
      />
      <StatBox
        type="requests"
        value={55}
        percentageValue={12}
        title={t("totalRequests")}
        higherThan={true}
      />
    </>
  );
};
export default StatBoxList;
