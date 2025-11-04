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

const PRODUCTS_PER_PAGE = 3;

interface BaseProductParams {
  currentPage?: number;
  searchQuery?: string;
  inStock?: boolean;
  brands?: string[];
  price?: {
    min?: number;
    max?: number;
  };
}
const PRODUCTS_PER_PAGE_ADMIN = 2;

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
  if (params.price && (params.price.min != null || params.price.max != null)) {
    const min = params.price.min ?? 1;
    const max = params.price.max ?? Number.MAX_SAFE_INTEGER;
    conditions.push(between(products.sale_price, min, max));
  }
  return conditions.length > 0 ? and(...conditions) : undefined;
}

async function buildAdminWhereCondition(params: AdminProductParams) {
  const base = await buildWhereCondition(params);

  const conditions = [];

  if (params.barcode) {
    conditions.push(eq(products.barcode, params.barcode));
  }

  if (params.code) {
    conditions.push(eq(products.code, params.code));
  }
  if (params.category) {
    conditions.push(eq(products.category, params.category));
  }
  if (
    params.purchase_price &&
    (params.purchase_price.min != null || params.purchase_price.max != null)
  ) {
    const min = params.purchase_price.min ?? 1;
    const max = params.purchase_price.max ?? Number.MAX_SAFE_INTEGER;
    conditions.push(between(products.purchase_price, min, max));
  }
  if (conditions.length > 0) {
    return base;
  }
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
  purchase_price: number;
  barcode: string;
  code: string;
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
    .where(isNotNull(products.brand))) as Product[];

  return rows.map((r) => r.brand).filter(Boolean);
};
export const getProductById = async (id: string) => {
  const rows = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);
  return rows[0] ?? null;
};

export const getProducts = async () => {
  const rows = await db.select().from(products).limit(8);
  return rows;
};
