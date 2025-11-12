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
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-semibold text-text-gold">
        Bir şeyler ters gitti.
      </h2>

      <Link href="/" className="mt-4 underline text-white text-2xl">
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}
