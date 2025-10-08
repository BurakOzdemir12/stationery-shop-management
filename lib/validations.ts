import { z } from "zod";

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
