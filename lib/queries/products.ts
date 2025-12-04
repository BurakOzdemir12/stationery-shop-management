import {
  and,
  between,
  count,
  desc,
  eq,
  gt,
  ilike,
  inArray,
  isNotNull,
  or,
} from "drizzle-orm";
import { products } from "@/database/schema";
import { db } from "@/database/drizzle";
import { ColumnDef } from "@tanstack/table-core";

const PRODUCTS_PER_PAGE = 20;

interface BaseProductParams {
  currentPage?: number;
  searchQuery?: string;
  inStock?: boolean;
  brands?: string[];
  categories?: string[];
  price?: {
    min?: number;
    max?: number;
  };
}
const PRODUCTS_PER_PAGE_ADMIN = 30;

export type AdminProductParams = BaseProductParams & {
  barcode?: string;
  code?: string;
  category?: string;
  purchase_price?: {
    min?: number;
    max?: number;
  };
};

async function buildWhereCondition(params: BaseProductParams) {
  const conditions = [];

  if (params.searchQuery) {
    conditions.push(ilike(products.name, `%${params.searchQuery}%`));
  }
  if (params.inStock) {
    conditions.push(gt(products.stock, 0));
  }
  if (params.brands && params.brands.length > 0) {
    conditions.push(inArray(products.brand, params.brands));
  }
  if (params.categories && params.categories.length > 0) {
    conditions.push(inArray(products.category, params.categories));
  }
  if (params.price && (params.price.min != null || params.price.max != null)) {
    const min = params.price.min ?? 1;
    const max = params.price.max ?? Number.MAX_SAFE_INTEGER;
    conditions.push(between(products.sale_price, min, max));
  }
  return conditions.length > 0 ? and(...conditions) : undefined;
}

async function buildAdminWhereCondition(params: AdminProductParams) {
  const base = await buildWhereCondition(params);

  const adminConds = [];
  if (params.barcode) {
    adminConds.push(ilike(products.barcode, `${params.barcode}%`));
  }
  if (params.code) {
    adminConds.push(eq(products.code, params.code));
  }
  if (params.category) {
    adminConds.push(eq(products.category, params.category));
  }
  if (
    params.purchase_price &&
    (params.purchase_price.min != null || params.purchase_price.max != null)
  ) {
    const min = params.purchase_price.min ?? 1;
    const max = params.purchase_price.max ?? Number.MAX_SAFE_INTEGER;
    adminConds.push(between(products.purchase_price, min, max));
  }

  const allConds = [];
  if (base) allConds.push(base);
  if (adminConds.length) allConds.push(and(...adminConds));

  return allConds.length ? and(...allConds) : undefined;
}

export async function getPaginatedProducts({
  currentPage = 1,
  ...rest
}: BaseProductParams) {
  const whereCondition = await buildWhereCondition(rest);
  const offset = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const productsPromise = db
    .select()
    .from(products)
    .where(whereCondition)
    .orderBy(desc(products.createdAt))
    .limit(PRODUCTS_PER_PAGE)
    .offset(offset);

  const totalCountPromise = db
    .select({ count: count() })
    .from(products)
    .where(whereCondition);

  const [pagedProducts, totalProductResult] = await Promise.all([
    productsPromise,
    totalCountPromise,
  ]);
  const totalPages = Math.ceil(totalProductResult[0].count / PRODUCTS_PER_PAGE);

  return { pagedProducts, totalPages };
}

//Requsts for Admin Page

export type AdminProductRow = {
  id: string;
  name: string;
  category: string | null;
  brand: string | null;
  stock: number;
  sale_price: number;
  purchase_price: number | null;
  barcode: string;
  code: string | null;
  createdAt: Date | null;
};
export async function getPaginatedAdminProducts({
  currentPage = 1,
  ...rest
}: AdminProductParams) {
  const whereCondition = await buildAdminWhereCondition(rest);
  const offset = (currentPage - 1) * PRODUCTS_PER_PAGE_ADMIN;
  const [rows, totalProductResult] = await Promise.all([
    db
      .select()
      .from(products)
      .where(whereCondition)
      .orderBy(desc(products.createdAt))
      .limit(PRODUCTS_PER_PAGE_ADMIN)
      .offset(offset),
    db.select({ count: count() }).from(products).where(whereCondition),
  ]);
  const totalPages = Math.ceil(
    totalProductResult[0].count / PRODUCTS_PER_PAGE_ADMIN,
  );
  return { rows, totalPages };
}
//Brands for filter Side Bar
export const getBrands = async () => {
  const rows = (await db
    .selectDistinct({ brand: products.brand })
    .from(products)
    .groupBy(products.brand)
    .where(isNotNull(products.brand))) as Product[];

  return rows.map((r) => r.brand).filter(Boolean);
};
//categories for filter Side Bar
export const getCategories = async () => {
  const rows = await db
    .selectDistinct({ category: products.category })
    .from(products)
    .groupBy(products.category)
    .where(isNotNull(products.category));

  return rows.map((row) => row.category).filter((c): c is string => !!c);
};
export const getProductById = async (id: string) => {
  const rows = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);
  return rows[0] ?? null;
};
export const getProductByBarcode = async (code: string) => {
  const rows = await db
    .select()
    .from(products)
    .where(eq(products.barcode, code))
    .limit(1);
  return rows[0] ?? null;
};

const PRODUCTS_PER_PAGE_POS = 20;
export async function getProductsForPos({
  currentPage = 1,
  ...rest
}: AdminProductParams) {
  const whereCondition = await buildAdminWhereCondition(rest);
  const offset = (currentPage - 1) * PRODUCTS_PER_PAGE_POS;
  const [res, totalCounts] = await Promise.all([
    db
      .select()
      .from(products)
      .where(whereCondition)
      .limit(PRODUCTS_PER_PAGE_POS)
      .offset(offset),
    db.select({ count: count() }).from(products).where(whereCondition),
  ]);
  const totalPages = Math.ceil(totalCounts[0].count / PRODUCTS_PER_PAGE_POS);
  return { res, totalPages };
}
// export const getProducts = async () => {
//   const rows = await db.select().from(products).limit(8);
//   return rows;
// };
