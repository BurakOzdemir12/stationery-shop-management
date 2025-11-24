import { requireAdmin } from "@/lib/guard";
import { db } from "@/database/drizzle";
import { monthlyReports, yearlyReports } from "@/database/schema";
import { sql } from "drizzle-orm";
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
  const cost = orderLines.reduce(
    (sum, item) => sum + (item.unitPurchasePrice ?? 0) * item.quantity,
    0,
  );
  const revenue = totalPrice;
  const profit = revenue - cost;
  const profitPercentage = profit / cost;

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
