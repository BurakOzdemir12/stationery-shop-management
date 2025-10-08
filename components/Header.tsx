"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, getInitials } from "@/lib/utils";
import { CgProfile } from "react-icons/cg";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";

const Header = ({ session }: { session: Session | null }) => {
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
          <img src="/brand3.png" alt="brand" className="md:w-25 " />
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
          {}
          <Link href={session ? "/my-profile" : "/sign-in"}>
            <Avatar className="w-13 h-13 ">
              <AvatarFallback className="text-black font-semibold text-3xl bg-text-gold ">
                {getInitials(session?.user?.name || "NN")}
              </AvatarFallback>
            </Avatar>
            {/*<CgProfile className="navLink text-3xl" />*/}
          </Link>
        </li>
      </ul>
      {/*<hr className="basis-auto border-2 border-borderColor w-full" />*/}
    </header>
  );
};
export default Header;
