import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-auto flex   flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold text-red-700">Sayfa bulunamadı</h1>
      <p className="text-gray-700">
        Aradığınız Admin sayfasını bulamadık. URL yanlış ya da içerik silinmiş
        olabilir.
      </p>
      <Link href="/admin" className="mt-4 underline text-blue-950 text-2xl">
        Ana sayfaya dön
      </Link>
    </div>
  );
}
