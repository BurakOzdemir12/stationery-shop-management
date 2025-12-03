"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
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
      <h1 className="text-2xl font-bold text-text-gold">
        Bir şeyler ters gitti
      </h1>
      <Link href="/public" className="mt-4 underline text-white text-2xl">
        Ana sayfaya dön
      </Link>
    </div>
  );
}
