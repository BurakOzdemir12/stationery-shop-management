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
  name: z.string().nonempty().trim().min(1).max(155),
  description: z.string().nonempty().trim().min(1).max(255),
  category: z.string().trim().min(1).max(155),
  brand: z.string().trim().min(1).max(155),
  price: z.coerce.number().min(0),
  stock: z.coerce.number().min(0),
  barcode: z.string().trim().min(1).max(255),
  code: z.string().trim().min(1).max(255),
  image: z.url(),
});
