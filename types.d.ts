interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  purchase_price: string;
  sale_price: string;
  stock: number;
  barcode: string;
  code: string;
  image: string;
  createdAt: Date | null;
}
interface AuthCredentials {
  email: string;
  password: string;
  fullName: string;
  profileImage?: string;
}
interface ProductParams {
  name: string;
  description: string;
  category?: string | null;
  brand?: string | null;
  purchase_price: number;
  sale_price: number;
  stock: number;
  barcode: string;
  code: string;
  image: string;
}
