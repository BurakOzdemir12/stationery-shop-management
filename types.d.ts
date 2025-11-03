interface AuthCredentials {
  email: string;
  password: string;
  fullName: string;
  profileImage?: string;
}
interface Product {
  id: string;
  name: string;
  description: string;
  category: string | null;
  brand: string | null;
  purchase_price: string;
  sale_price: string;
  stock: number;
  barcode: string;
  code: string;
  image: string;
  createdAt: Date | null;
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
interface Service {
  id: string;
  name: string;
  price: number;
  createdAt: Date | null;
}
interface ServiceParams {
  name: string;
  price: number;
}
