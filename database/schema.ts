import {
  uuid,
  varchar,
  integer,
  text,
  boolean,
  pgTable,
  pgEnum,
  date,
  timestamp,
  decimal,
  numeric,
} from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum("status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);
export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  profileImage: text("profile_image"),
  status: STATUS_ENUM("status").notNull().default("PENDING"),
  role: ROLE_ENUM("role").notNull().default("USER"),
  lastActivityDate: date("last_activity_date").defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
export const products = pgTable("products", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description", { length: 255 }).notNull(),
  category: varchar("category", { length: 155 }),
  brand: varchar("brand", { length: 155 }),
  purchase_price: numeric("purchase_price").notNull(),
  sale_price: numeric("sale_price").notNull(),
  stock: integer("stock").notNull(),
  barcode: varchar("barcode", { length: 255 }).notNull(),
  code: varchar("code", { length: 255 }).notNull(),
  image: text("image").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
