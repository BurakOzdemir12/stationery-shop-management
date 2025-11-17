import productList from "../productList.json";
import ImageKit from "imagekit";
import { products } from "@/database/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";

config({ path: ".env.local" });
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });
export const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});
const uploadToImageKit = async (
  url: string,
  fileName: string,
  folder: string,
) => {
  try {
    const response = await imagekit.upload({
      file: url,
      fileName,
      folder,
    });
    return response.filePath;
  } catch (e) {
    console.log("Error uploading image to Image Kit", e);
  }
};
import rawProducts from "../productList.json";

type RawProduct = {
  name: string;
  description?: string;
  category?: string;
  brand?: string;
  purchase_price?: number;
  sale_price: number;
  stock: number;
  barcode: string;
  code?: string | number;
  image: string;
};

async function seedProducts() {
  const data = (rawProducts as RawProduct[]).map((p) => ({
    name: p.name.trim(),
    description: p.description ?? null,
    category: p.category?.trim() ?? null,
    brand: p.brand?.trim() ?? null,
    purchase_price:
      p.purchase_price === 0 || p.purchase_price == null
        ? null
        : Number(p.purchase_price),
    sale_price: Number(p.sale_price),
    stock: Number(p.stock),
    barcode: p.barcode.trim(),
    code: p.code != null ? String(p.code).trim() : null,
    image: `/products/images/${p.barcode}.jpg`,
  }));

  await db.insert(products).values(data);

  console.log("Seed tamamlandı, eklenen ürün sayısı:", data.length);
}

seedProducts()
  .then(() => {
    console.log("Bitti");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Seed hatası:", err);
    process.exit(1);
  });
