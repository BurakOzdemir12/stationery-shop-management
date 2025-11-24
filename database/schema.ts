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
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { number } from "zod";

export const STATUS_ENUM = pgEnum("status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);
export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);
export const ORDER_STATUS_ENUM = pgEnum("order_status", [
  "CREATED",
  "PENDING_PAYMENT",
  "PAID",
  "REFUNDED",
  "CANCELED",
]);

export const PAYMENT_METHOD_ENUM = pgEnum("payment_method", [
  "CASH",
  "CARD",
  "TRANSFER",
  "OTHER",
]);
export const REQUEST_STATUS_ENUM = pgEnum("request_status", [
  "PENDING",
  "ANSWERED",
  "RESTOCKED",
]);
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
  description: text("description"),
  category: varchar("category", { length: 155 }),
  brand: varchar("brand", { length: 155 }),
  purchase_price: numeric("purchase_price", { mode: "number" }),
  sale_price: numeric("sale_price", { mode: "number" }).notNull(),
  stock: integer("stock").notNull(),
  barcode: varchar("barcode", { length: 255 }).notNull(),
  code: varchar("code", { length: 255 }),
  image: text("image").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
export const services = pgTable("services", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  price: numeric("price", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const orders = pgTable("orders", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  totalPrice: numeric("total_price", {
    mode: "number",
    precision: 12,
    scale: 2,
  }).notNull(),
  totalItems: integer("total_items").notNull(),
  status: ORDER_STATUS_ENUM("status").notNull().default("CREATED"),
  paymentMethod: PAYMENT_METHOD_ENUM("payment_method").default("CASH"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
export const orderItems = pgTable("order_items", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: uuid("product_id").references(() => products.id),
  productName: varchar("product_name", { length: 255 }).notNull(),
  unitPrice: numeric("unit_price", {
    mode: "number",
    precision: 12,
    scale: 2,
  }).notNull(),
  unitPurchasePrice: numeric("unity_purchase_price", {
    mode: "number",
    precision: 12,
    scale: 2,
  }),
  quantity: integer("quantity").notNull(),
  subTotal: numeric("sub_total", {
    mode: "number",
    precision: 12,
    scale: 2,
  }).notNull(),
  barcodeSnapshot: varchar("barcode_snapshot", { length: 128 }),
});
export const requests = pgTable("requests", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  userId: uuid("user_id").notNull(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id),
  status: REQUEST_STATUS_ENUM("status").notNull().default("PENDING"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
export const monthlyReports = pgTable(
  "monthly_reports",
  {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    year: integer("year").notNull(),
    month: integer("month").notNull(),
    totalRevenue: numeric("total_revenue", {
      mode: "number",
      precision: 12,
      scale: 2,
    }).notNull(),
    totalCost: numeric("total_cost", {
      mode: "number",
      precision: 12,
      scale: 2,
    }),
    totalProfit: numeric("total_profit", {
      mode: "number",
      precision: 12,
      scale: 2,
    }),
    totalSales: integer("total_sales").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    yearMonthUnique: uniqueIndex("monthly_reports_year_month_unique").on(
      table.year,
      table.month,
    ),
  }),
);
export const yearlyReports = pgTable(
  "yearly_reports",
  {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    year: integer("year").notNull(),
    totalRevenue: numeric("total_revenue", {
      mode: "number",
      precision: 12,
      scale: 2,
    }).notNull(),
    totalCost: numeric("total_cost", {
      mode: "number",
      precision: 12,
    }),
    totalProfit: numeric("total_profit", {
      mode: "number",
    }),
    totalSales: integer("total_sales").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    yearUnique: uniqueIndex("yearly_reports_year_unique").on(table.year),
  }),
);
