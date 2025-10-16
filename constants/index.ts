import { FaHouse, FaCubes, FaMessage, FaUsers } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
export const sampleProducts = [
  {
    id: 1,
    name: "Paper A4",
    category: "Category 1",
    brand: "Brand A",
    description: "This is a description for ProductForm 1.",
    price: 29.99,
    image: "https://picsum.photos/800/800",
    stock: 100,
    barcode: 0,
    code: 0,
  },
  {
    id: 2,
    name: "ProductForm 2",
    category: "Category 2",
    brand: "Brand B",
    description: "This is a description for ProductForm 2.",
    price: 49.99,
    image: "https://picsum.photos/800/800",
    stock: 50,
    barcode: 0,
    code: 0,
  },
  {
    id: 3,
    name: "ProductForm 3",
    category: "Category 1",
    brand: "Brand C",
    description: "This is a description for ProductForm 3.",
    price: 19.99,
    image: "https://picsum.photos/800/800",
    stock: 75,
    barcode: 0,
    code: 0,
  },
];
export const sampleServices = [
  {
    id: 1,
    name: "Service 1",
    price: 25,
  },
  {
    id: 2,
    name: "Service 2",
    price: 36,
  },
  {
    id: 3,
    name: "Service 3",
    price: 45,
  },
  {
    id: 4,
    name: "Service 4",
    price: 12,
  },
  {
    id: 5,
    name: "Service 5",
    price: 78,
  },
  { id: 6, name: "Service 6", price: 32 },
  { id: 7, name: "Service 7", price: 54 },
  { id: 8, name: "Service 8", price: 23 },
  { id: 9, name: "Service 9", price: 67 },
];
export const FIELD_NAMES = {
  fullName: "Full Name",
  email: "Email",
  password: "Password",
  profileImage: "Profile Picture",
};
export const FIELD_TYPES = {
  fullName: "text",
  email: "email",
  password: "password",
};

export const adminSideBarLinks = [
  {
    text: "Dashboard",
    href: "/admin",
    icon: FaHouse,
  },
  {
    text: "Products",
    href: "/admin/products",
    icon: FaCubes,
  },
  {
    text: "Requests",
    href: "/admin/requests",
    icon: FaMessage,
  },
  {
    text: "Users",
    href: "/admin/users",
    icon: FaUsers,
  },
  {
    text: "Settings",
    href: "/admin/settings",
    icon: FiSettings,
  },
];
export const mediaQueries = [];
