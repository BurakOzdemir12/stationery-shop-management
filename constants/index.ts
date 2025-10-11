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
    imageUrl: "https://picsum.photos/800/800",
    stock: 100,
  },
  {
    id: 2,
    name: "ProductForm 2",
    category: "Category 2",
    brand: "Brand B",
    description: "This is a description for ProductForm 2.",
    price: 49.99,
    imageUrl: "https://picsum.photos/800/800",
    stock: 50,
  },
  {
    id: 3,
    name: "ProductForm 3",
    category: "Category 1",
    brand: "Brand C",
    description: "This is a description for ProductForm 3.",
    price: 19.99,
    imageUrl: "https://picsum.photos/800/800",
    stock: 75,
  },
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
