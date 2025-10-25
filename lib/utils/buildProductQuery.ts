import { z } from "zod";

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
