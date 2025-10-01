"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CgProfile } from "react-icons/cg";
const Header = () => {
  const Links = [
    {
      name: "Home",
      href: "/",
    },
    { name: "Products", href: "" },
  ];
  const pathName = usePathname();
  return (
    <header className="flex justify-between my-10 gap-20 ">
      <Link href="/" className="justify-items-start">
        <span className="flex items-center gap-1 navLink">
          <img src="/brand.png" alt="brand" className="md:w-25 " />
          Güneş Kırtasiye
        </span>
      </Link>
      <ul className=" flex  justify-between items-center  gap-10">
        {Links.map((item, index) => (
          <li key={index} className="navLink">
            <Link
              className={cn(" ", pathName === item.href && "text-[#EED1AC]")}
              href={item.href}
            >
              {item.name}
            </Link>
          </li>
        ))}
        <li>
          <CgProfile className="navLink text-3xl" />
        </li>
      </ul>
      <hr className="basis-auto border-2 border-borderColor w-full" />
    </header>
  );
};
export default Header;
