interface Product {
  id: number;
  title: string;
  category: string;
  brand: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
}
interface AuthCredentials {
  email: string;
  password: string;
  fullName: string;
  profileImage?: string;
}
