import { requireAdmin } from "@/lib/guard";
import { db } from "@/database/drizzle";
import { dailyReports, orders } from "@/database/schema";
import { and, between, gte, lt, lte } from "drizzle-orm";
import { getTrDateNDaysAgoISO } from "@/lib/utils";

type GetOrdersParams = {
  month: number;
  year: number;
  period: "month" | "year";

  // limit?: number;
  // offset?: number;
};
type GetOrdersByYearParams = {
  year: number;
};
export const getOrdersByMonthOrYear = async ({
  month,
  year,
  period,
  // limit,
  // offset,
}: GetOrdersParams) => {
  await requireAdmin();
  if (period == "month") {
    const startOfMonth = new Date(Date.UTC(year, month - 1, 1));
    const endOfMonth = new Date(Date.UTC(year, month, 1));

    const res = await db
      .select()
      .from(orders)
      .where(
        and(
          gte(orders.createdAt, startOfMonth),
          lt(orders.createdAt, endOfMonth),
        ),
        //offset and limit maybe in the future...
      );
    return res;
  } else {
    return getOrdersByYear({ year });
  }
};
export const getOrdersByYear = async ({ year }: GetOrdersByYearParams) => {
  await requireAdmin();
  const startOfYear = new Date(Date.UTC(year, 0, 1)); // 1 Ocak
  const endOfYear = new Date(Date.UTC(year + 1, 0, 1));
  const res = await db
    .select()
    .from(orders)
    .where(
      and(gte(orders.createdAt, startOfYear), lt(orders.createdAt, endOfYear)),
    );
  return res;
};

type SalesByDayParams = {
  date: string | Date;
  total: number;
};
export async function getOrdersByDay(n: number): Promise<SalesByDayParams[]> {
  await requireAdmin();

  const todayStr = getTrDateNDaysAgoISO(0);
  const startStr = getTrDateNDaysAgoISO(n - 1);
  const rows = await db
    .select({
      date: dailyReports.date,
      totalSales: dailyReports.totalSales,
    })
    .from(dailyReports)
    .where(
      and(gte(dailyReports.date, startStr), lte(dailyReports.date, todayStr)),
    );
  const mapped = new Map<string, number>();
  for (const row of rows) {
    mapped.set(row.date, Number(row.totalSales ?? 0));
  }
  const result: SalesByDayParams[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const date = getTrDateNDaysAgoISO(i);
    result.push({
      date,
      total: mapped.get(date) ?? 0,
    });
  }
  return result;
}
