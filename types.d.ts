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
  brand: string;
  purchase_price: string;
  sale_price: string;
  stock: number;
  barcode: string;
  code: string;
  image: string;
  createdAt: Date | null;
}
interface ProductClient {
  id: string;
  name: string;
  description: string;
  category: string | null;
  brand: string | null;
  sale_price: number;
  stock: number;
  image: string;
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
interface RequestParams {
  productId: string;
  userId: string;
}
interface RequestType {
  id: string;
  userId: string | null;
  userName: string;
  status: string;
  productId: string;
  productName: string | null;
  productBrand: string | null;
  productStock: number | null;
  createdAt: Date | null;
}
