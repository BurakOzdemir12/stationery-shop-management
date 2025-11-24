import { requireAdmin } from "@/lib/guard";
import { db } from "@/database/drizzle";
import { monthlyReports, yearlyReports } from "@/database/schema";
import { and, eq } from "drizzle-orm";

type getRevenueByMonthParams = {
  month: number;
  year: number;
  period: "month" | "year";
};
export const getTotalRevenue = async ({
  period,
  year,
  month,
}: getRevenueByMonthParams) => {
  await requireAdmin();
  if (period === "month") {
    const [res] = await db
      .select({ totalRevenue: monthlyReports.totalRevenue })
      .from(monthlyReports)
      .where(
        and(eq(monthlyReports.year, year), eq(monthlyReports.month, month)),
      );

    return res?.totalRevenue ?? 0;
  } else {
    const [res] = await db
      .select({ totalRevenue: yearlyReports.totalRevenue })
      .from(yearlyReports)
      .where(eq(yearlyReports.year, year));
    return res?.totalRevenue ?? 0;
  }
};
