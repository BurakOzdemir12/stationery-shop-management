import { requireAdmin } from "@/lib/guard";
import { db } from "@/database/drizzle";
import { orders } from "@/database/schema";
import { and, between, gte, lt } from "drizzle-orm";
import { getMonthAndYear } from "@/lib/utils";

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
