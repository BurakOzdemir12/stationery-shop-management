"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) redirect("/");
  const isAdmin = await db
    .select({ isAdmin: users.role })
    .from(users)
    .where(eq(users.id, session?.user?.id))
    .limit(1)
    .then((res) => res[0]?.isAdmin === "ADMIN");
  if (!session || !isAdmin) redirect("/");
  return session;
}
export async function isAdmin() {
  const session = await auth();
  if (!session?.user?.id) redirect("/");
  const admin = await db
    .select({ isAdmin: users.role })
    .from(users)
    .where(eq(users.id, session?.user?.id))
    .limit(1)
    .then((res) => res[0]?.isAdmin === "ADMIN");
  return admin;
}
