import { serve } from "@upstash/workflow/nextjs";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { sendEmail } from "@/lib/workflow";

type UserState = "non-active" | "active";
type InitialData = {
  email: string;
  fullName?: string;
};
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAY_IN_MS = 30 * ONE_DAY_IN_MS;

const getUserState = async (email: string) => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length === 0) return "non-active";

  const lastActivityDate = new Date(user[0].lastActivityDate!);
  const now = new Date();
  const timeDiff = now.getTime() - lastActivityDate.getTime();

  if (timeDiff > THREE_DAYS_IN_MS && timeDiff <= THIRTY_DAY_IN_MS) {
    return "non-active";
  }
  return "active";
};
export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  //Welcome Email
  await context.run("new-signup", async () => {
    await sendEmail({
      email,
      subject: "Welcome to Gunes Kirtasiye",
      message: `Hello ${fullName || "there"}, welcome to Gunes Kirtasiye! We're excited to have you on board.`,
    });
  });

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail({
          email,
          subject: "We miss you at Gunes Kirtasiye",
          message: `Hello ${fullName || "there"}, we noticed you haven't been active lately. We miss you! Come back and check out what's new.`,
        });
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail({
          email,
          subject: "Welcome back!",
          message: `Welcome back ${fullName || ""}.`,
        });
      });
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
});
