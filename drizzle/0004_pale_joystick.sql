CREATE TYPE "public"."order_status" AS ENUM('CREATED', 'PENDING_PAYMENT', 'PAID', 'REFUNDED', 'CANCELED');--> statement-breakpoint
CREATE TYPE "public"."payment_method" AS ENUM('CASH', 'CARD', 'TRANSFER', 'OTHER');--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"product_name" varchar(255) NOT NULL,
	"unit_price" numeric(12, 2) NOT NULL,
	"quantity" integer NOT NULL,
	"sub_total" numeric(12, 2) NOT NULL,
	"barcode_snapshot" varchar(128),
	CONSTRAINT "order_items_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"total_price" numeric(12, 2) NOT NULL,
	"total_items" integer NOT NULL,
	"status" "order_status" DEFAULT 'CREATED' NOT NULL,
	"payment_method" "payment_method" DEFAULT 'CASH',
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "orders_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;