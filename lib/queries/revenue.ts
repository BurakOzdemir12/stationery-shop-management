import { requireAdmin } from "@/lib/guard";
import { db } from "@/database/drizzle";
import { dailyReports, monthlyReports, yearlyReports } from "@/database/schema";
import { and, eq, gte, lte } from "drizzle-orm";
import { getTrDateNDaysAgoISO } from "@/lib/utils";

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
type RevenueByDayParams = {
  date: string | Date;
  total: number;
};
export async function getRevenueByDay(
  n: number,
): Promise<RevenueByDayParams[]> {
  await requireAdmin();

  const todayStr = getTrDateNDaysAgoISO(0);
  const startStr = getTrDateNDaysAgoISO(n - 1);
  const rows = await db
    .select({
      date: dailyReports.date,
      totalRevenue: dailyReports.totalRevenue,
    })
    .from(dailyReports)
    .where(
      and(gte(dailyReports.date, startStr), lte(dailyReports.date, todayStr)),
    );
  const mapped = new Map<string, number>();
  for (const row of rows) {
    mapped.set(row.date, Number(row.totalRevenue ?? 0));
  }
  const result: RevenueByDayParams[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const date = getTrDateNDaysAgoISO(i);
    result.push({
      date,
      total: mapped.get(date) ?? 0,
    });
  }
  return result;
}
