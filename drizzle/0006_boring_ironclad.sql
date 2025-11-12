ALTER TYPE "public"."request_status" ADD VALUE 'RESTOCKED';--> statement-breakpoint
ALTER TABLE "order_items" ALTER COLUMN "product_id" DROP NOT NULL;