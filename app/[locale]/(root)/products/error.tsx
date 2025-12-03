"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold text-text-gold">Ürün bulunamadı</h1>
      <p className="text-gray-400">
        Aradığınız ürün silinmiş olabilir veya hiç eklenmemiş.
      </p>
      <Link
        href="/#all-products"
        className="mt-4 underline text-white text-2xl"
      >
        Diğer Ürünlere Gözat
      </Link>
    </div>
  );
}
