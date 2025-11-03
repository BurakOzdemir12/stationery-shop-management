import { db } from "@/database/drizzle";
import { services } from "@/database/schema";
import { isNotNull } from "drizzle-orm";

export const getServices = async (): Promise<
  Array<{ id: string; name: string; price: number; createdAt: Date | null }>
> => {
  const rows = await db.select().from(services).where(isNotNull(services.name));
  return rows;
};
