"use client";
import React from "react";

type MoneyCellProps = {
  value?: number | null;
  currency?: string;
  tone?: "default" | "muted" | "cart";
  size?: "sm" | "normal" | "lg" | "xl";
};
export default function MoneyCell({
  value,
  currency = "TRY",
  tone = "default",
  size,
}: MoneyCellProps) {
  const nf = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  });
  const classes =
    tone === "muted"
      ? "bg-slate-100 text-slate-700 border-slate-200"
      : tone === "cart"
        ? "text-primary border-0 bg-secondary rounded-xl"
        : "bg-indigo-50 text-indigo-700 border-indigo-200";
  return (
    <span
      className={`inline-flex rounded px-2 py-0.5 text-${size}  font-medium border ${classes}`}
    >
      {value == null ? "-" : nf.format(value)}
    </span>
  );
}
