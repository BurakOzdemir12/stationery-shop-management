CREATE TABLE "services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"price" numeric NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "services_id_unique" UNIQUE("id")
);
