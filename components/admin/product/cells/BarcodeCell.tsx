"use client";
import React from "react";
import { BarcodeIcon } from "lucide-react";

type BarcodeCellProps = {
  value?: string | null;
  currency?: string;
  tone?: "default" | "muted";
};
export default function BarcodeCell({
  value,
  tone = "default",
}: BarcodeCellProps) {
  const classes =
    tone === "muted"
      ? "bg-input bg-input text-slate-700 border-slate-200 "
      : "bg-indigo-50 text-indigo-700 border-indigo-200";
  return (
    <span
      className={`gap-2 inline-flex items-center min-h-8 min-w-40  rounded-2xl px-2 font-semibold  ${classes}`}
    >
      <BarcodeIcon className="size-5" />
      {value == null ? "-" : value}
    </span>
  );
}
