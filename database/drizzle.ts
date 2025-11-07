import config from "@/lib/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig, Pool } from "@neondatabase/serverless";

const sql = neon(config.env.databaseUrl);
export const db = drizzle({ client: sql });
