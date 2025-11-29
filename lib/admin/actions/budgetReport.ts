import { requireAdmin } from "@/lib/guard";
import { db } from "@/database/drizzle";
import { dailyReports, monthlyReports, yearlyReports } from "@/database/schema";
import { sql } from "drizzle-orm";
import { toTRDateString } from "@/lib/utils";
type RevenueReportParams = {
  createdAt: Date;
  totalPrice: number;
  orderLines: {
    unitPurchasePrice?: number | null;
    quantity: number;
  }[];
};
export async function applyOrderToRevenueReports({
  createdAt,
  totalPrice,
  orderLines,
}: RevenueReportParams) {
  await requireAdmin();
  const month = createdAt.getUTCMonth() + 1;
  const year = createdAt.getUTCFullYear();
  const day = createdAt.getUTCDate();
  // const date = createdAt.toISOString().slice(0, 10);
  const trDateString = toTRDateString(createdAt);
  const cost = orderLines.reduce(
    (sum, item) => sum + (item.unitPurchasePrice ?? 0) * item.quantity,
    0,
  );
  const revenue = totalPrice;
  const profit = revenue - cost;
  const profitPercentage = profit / cost;

  // Daily
  await db
    .insert(dailyReports)
    .values({
      date: trDateString,
      totalRevenue: revenue,
      totalCost: cost,
      totalProfit: profit,
      totalSales: 1,
    })
    .onConflictDoUpdate({
      target: [dailyReports.date],
      set: {
        totalRevenue: sql`${dailyReports.totalRevenue} + ${revenue}`,
        totalCost: sql`${dailyReports.totalCost} + ${cost}`,
        totalProfit: sql`${dailyReports.totalProfit} + ${profit}`,
        totalSales: sql`${dailyReports.totalSales} + ${1}`,
      },
    });

  //-- Monthly
  await db
    .insert(monthlyReports)
    .values({
      year,
      month,
      totalRevenue: revenue,
      totalCost: cost,
      totalProfit: profit,
      totalSales: 1,
    })
    .onConflictDoUpdate({
      target: [monthlyReports.year, monthlyReports.month],
      set: {
        totalRevenue: sql`${monthlyReports.totalRevenue} + ${revenue}`,
        totalCost: sql`${monthlyReports.totalCost} + ${cost}`,
        totalProfit: sql`${monthlyReports.totalProfit} + ${profit}`,
        totalSales: sql`${monthlyReports.totalSales} + ${1}`,
      },
    });
  //yearly
  await db
    .insert(yearlyReports)
    .values({
      year,
      totalRevenue: revenue,
      totalCost: cost,
      totalProfit: profit,
      totalSales: 1,
    })
    .onConflictDoUpdate({
      target: [yearlyReports.year],
      set: {
        totalRevenue: sql`${yearlyReports.totalRevenue} + ${revenue}`,
        totalCost: sql`${yearlyReports.totalCost} + ${cost}`,
        totalProfit: sql`${yearlyReports.totalProfit} + ${profit}`,
        totalSales: sql`${yearlyReports.totalSales} + ${1}`,
      },
    });
}
