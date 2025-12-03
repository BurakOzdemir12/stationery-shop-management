import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex bg-bgDarker flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold text-text-gold">Sayfa bulunamadı</h1>
      <p className="text-gray-400">
        Aradığınız sayfayı bulamadık. URL yanlış ya da içerik silinmiş olabilir.
      </p>
      <Link href="/" className="mt-4 underline text-white text-2xl">
        Ana sayfaya dön
      </Link>
    </div>
  );
}
