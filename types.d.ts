interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  barcode: string;
  code: string;
  image: string;
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
  category: string;
  brand: string;
  purchase_price: number;
  sale_price: number;
  stock: number;
  barcode: string;
  code: string;
  image: string;
}
