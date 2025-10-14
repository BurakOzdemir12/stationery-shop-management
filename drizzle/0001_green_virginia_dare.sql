CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"category" varchar(155),
	"brand" varchar(155),
	"purchase_price" integer NOT NULL,
	"sale_price" integer NOT NULL,
	"stock" integer NOT NULL,
	"barcode" varchar(255) NOT NULL,
	"code" varchar(255) NOT NULL,
	"image" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "products_id_unique" UNIQUE("id")
);
