ALTER TABLE "monthly_reports" DROP CONSTRAINT "monthly_reports_year_unique";--> statement-breakpoint
ALTER TABLE "monthly_reports" DROP CONSTRAINT "monthly_reports_month_unique";--> statement-breakpoint
CREATE UNIQUE INDEX "monthly_reports_year_month_unique" ON "monthly_reports" USING btree ("year","month");