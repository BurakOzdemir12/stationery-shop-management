"use client";
import React from "react";

export default function StockCell({ value }: { value: number }) {
  const tone =
    value === 0
      ? "bg-red-100 text-red-700 border-red-200"
      : value < 5
        ? "bg-amber-100 text-amber-700 border-amber-200"
        : "bg-emerald-100 text-emerald-700 border-emerald-200";
  return (
    <span
      className={`inline-flex min-w-[4rem] justify-center rounded px-2 py-0.5 text-sm font-medium border ${tone}`}
    >
      {value}
    </span>
  );
}
