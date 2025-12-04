import {
  FaHouse,
  FaCubes,
  FaMessage,
  FaUsers,
  FaServicestack,
  FaScreenpal,
  FaMobileScreen,
} from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ColumnDef } from "@tanstack/table-core";
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
export const AUTH_FIELDS = {
  fullName: {
    type: "text",
    labelKey: "fullName",
  },
  email: {
    type: "email",
    labelKey: "email",
  },
  password: {
    type: "password",
    labelKey: "password",
  },
  confirmPassword: {
    type: "password",
    labelKey: "confirmPassword",
  },
  profileImage: {
    type: "file",
    labelKey: "profileImage",
  },
} as const;
export const adminProductColumns = (
  t: (key: string) => string,
): ColumnDef<Product>[] => [
  {
    accessorKey: "name",
    header: t("name"),
  },
  {
    accessorKey: "category",
    header: t("category"),
  },
  {
    accessorKey: "brand",
    header: t("brand"),
  },
  {
    accessorKey: "price",
    header: t("price"),
  },
  {
    accessorKey: "stock",
    header: t("stock"),
  },
];
// export const FIELD_NAMES = {
//   fullName: "Full Name",
//   email: "Email",
//   password: "Password",
//   confirmPassword: "Confirm Password",
//   profileImage: "Profile Picture",
// };
// export const FIELD_TYPES = {
//   fullName: "text",
//   email: "email",
//   password: "password",
// };

export const adminSidebarLinks = [
  {
    text: "Dashboard",
    href: "/admin",
    icon: FaHouse,
    keys: "dashboard",
  },
  {
    text: "Products",
    href: "/admin/products",
    icon: FaCubes,
    keys: "products",
  },
  {
    text: "Services",
    href: "/admin/services",
    icon: FaServicestack,
    keys: "services",
  },
  // {
  //   text: "Users",
  //   href: "/admin/users",
  //   icon: FaUsers,
  //   keys: "users",
  // },
  {
    text: "POS",
    href: "/admin/pos",
    icon: FaMobileScreen,
    keys: "pos",
  },
  {
    text: "Requests",
    href: "/admin/requests",
    icon: FaMessage,
    keys: "requests",
  },
  // {
  //   text: "Settings",
  //   href: "/admin/settings",
  //   icon: FiSettings,
  //   keys: "settings",
  // },
] as const;
export const mediaQueries = [];
