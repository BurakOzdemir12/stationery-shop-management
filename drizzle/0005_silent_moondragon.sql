CREATE TYPE "public"."request_status" AS ENUM('PENDING', 'ANSWERED');--> statement-breakpoint
CREATE TABLE "requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"status" "request_status" DEFAULT 'PENDING' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "requests_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "requests" ADD CONSTRAINT "requests_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;