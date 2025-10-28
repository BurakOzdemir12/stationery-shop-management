export type ProductSearchParams = {
  currentPage: number;
  searchQuery?: string;
  inStock?: boolean;
  brands?: string[];
  price?: {
    min?: number;
    max?: number;
  };
};
const toArray = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v : typeof v === "string" ? [v] : undefined;

export function parseProductSearchParams(params: {
  [key: string]: string | string[] | undefined;
}): ProductSearchParams {
  const currentPage = Number(params.page) || 1;
  const searchQuery =
    typeof params.query === "string" && params.query.length
      ? params.query
      : undefined;

  const inStock = params.inStock === "true";
  const brands = toArray(params.brand);

  const priceMin =
    typeof params.priceMin === "string" &&
    Number.isFinite(Number(params.priceMin))
      ? Number(params.priceMin)
      : undefined;

  const priceMax =
    typeof params.priceMax === "string" &&
    Number.isFinite(Number(params.priceMax))
      ? Number(params.priceMax)
      : undefined;

  const price =
    priceMin != null || priceMax != null
      ? { min: priceMin, max: priceMax }
      : undefined;

  return { currentPage, searchQuery, inStock, brands, price };
}
