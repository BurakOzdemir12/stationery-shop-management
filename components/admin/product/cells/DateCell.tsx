"use client";
import React from "react";

export default function DateCell({ value }: { value?: string | Date | null }) {
  if (!value) return <span>-</span>;
  const d = value instanceof Date ? value : new Date(value);
  if (isNaN(d.getTime())) return <span>-</span>;
  const dayName = d.toLocaleDateString("tr-TR", { weekday: "short" });
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = String(d.getFullYear()).slice(-2);
  return <span>{`${dayName} ${day}.${month}.${year}`}</span>;
}
