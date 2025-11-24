CREATE TABLE "yearly_reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"year" integer NOT NULL,
	"total_revenue" numeric(12, 2) NOT NULL,
	"total_cost" numeric(12),
	"total_profit" numeric,
	"total_sales" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "yearly_reports_id_unique" UNIQUE("id")
);
