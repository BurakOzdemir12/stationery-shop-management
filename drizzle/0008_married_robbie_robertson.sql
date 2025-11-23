CREATE TABLE "monthly_reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"year" integer NOT NULL,
	"month" integer NOT NULL,
	"total_revenue" numeric(12, 2) NOT NULL,
	"total_cost" numeric(12, 2),
	"total_profit" numeric(12, 2),
	"total_sales" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "monthly_reports_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "order_items" ADD COLUMN "unity_purchase_price" numeric(12, 2);