import { and, count, desc, gt, ilike, or } from "drizzle-orm";
import { products } from "@/database/schema";
import { db } from "@/database/drizzle";

const PRODUCTS_PER_PAGE = 3;
interface GetProductsParams {
  currentPage?: number;
  searchQuery?: string;
  inStock?: boolean;
}

export async function getPaginatedProducts({
  currentPage = 1,
  searchQuery,
  inStock,
}: GetProductsParams) {
  const conditions = [];

  if (searchQuery) {
    conditions.push(ilike(products.name, `%${searchQuery}%`));
  }
  if (inStock) {
    conditions.push(gt(products.stock, 0));
  }
  // ilike(products.brand, `%${searchQuery}%`),
  // ilike(products.category, `%${searchQuery}%`),
  // ilike(products.sale_price, `%${searchQuery}%`),
  // ilike(products.barcode, `%${searchQuery}%`),
  // ilike(products.code, `%${searchQuery}%`),
  const whereCondition = conditions.length > 0 ? and(...conditions) : undefined;

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
