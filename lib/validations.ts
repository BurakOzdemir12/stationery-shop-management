import { object, z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(2),
  email: z.email(),
  password: z.string().min(8),
  profileImage: z.string().optional(),
});
export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const productSchema = z.object({
  name: z.string().trim().nonempty().min(1).max(155),
  description: z.string().trim().nonempty().min(1).max(255),
  category: z.string().trim().min(1).max(155).optional(),
  brand: z.string().trim().min(1).max(155).optional(),
  purchase_price: z.coerce.number().min(0),
  sale_price: z.coerce.number().min(0),
  stock: z.coerce.number().min(0),
  barcode: z.string().nonempty().trim().min(1).max(255),
  code: z.string().nonempty().trim().min(1).max(255),
  image: z.string().nonempty(),
});

export const emptyToUndef = z.preprocess((v) => {
  if (typeof v === "string" && v.trim() === "") return undefined;
  return v;
}, z.string().trim().optional());
export const numberFromInput = z.preprocess((v) => {
  if (typeof v === "string") {
    const s = v.trim().replace(",", ".");
    if (s === "") return undefined;
    const n = Number(s);
    return Number.isFinite(n) ? n : undefined;
  }
  return v;
}, z.number().nonnegative());

export const inStockOnly = z.preprocess((v) => {
  if (v === "on" || v === true || v === "true") return true;
  if (v === "" || v == null) return false;
  return v;
}, z.boolean().optional());

export const ProductSearchFilters = z.object({
  query: z.string().optional(),
  inStock: z.boolean().optional(),
});
// .superRefine((data, ctx) => {
//   if (
//     data.priceMin != null &&
//     data.priceMax != null &&
//     data.priceMin > data.priceMax
//   ) {
//     ctx.addIssue({
//       code: "custom",
//       message: "Minimum price cannot be greater than maximum price",
//       path: ["priceMin"],
//     });
//   }
// });

export type ProductSearchFiltersType = z.infer<typeof ProductSearchFilters>;
