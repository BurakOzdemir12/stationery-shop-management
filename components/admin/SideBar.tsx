"use client";

import React from "react";
import Image from "next/image";
import { adminSideBarLinks } from "@/constants";
import Link from "next/link";
import { cn, getInitials } from "@/lib/utils";
// Fa icons
import { FaHouse } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const SideBar = ({ session }: { session: Session }) => {
  const pathname = usePathname();

  return (
    <div className="admin-sidebar ">
      <div>
        <div className="logo ">
          <Image src="/brand3.png" alt="brand Logo" width={55} height={55} />
          <h1 className="text-xl font-semibold text-sidebar-text   ">
            Güneş Kırtasiye
          </h1>
        </div>
        <div className="mt-12 flex flex-col gap-7 ">
          {adminSideBarLinks.map(({ text, href: route, icon }) => {
            const isSelected =
              (route !== "/admin" &&
                pathname.includes(route) &&
                route.length > 1) ||
              pathname === route;
            return (
              <Link href={route} key={route}>
                <div
                  className={cn("link ", isSelected && "bg-primary shadow-md")}
                >
                  <div
                    className={cn(isSelected ? "text-white " : "text-black")}
                  >
                    {icon && React.createElement(icon)}
                  </div>

                  <p
                    className={cn(
                      " text-lg text-sidebar-text font-medium max-md:hidden",
                      isSelected && "text-white",
                    )}
                  >
                    {text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="lg:p-0.5 lg:flex lg:items-center lg:justify-between lg:rounded-2xl lg:shadow-md shadow-neutral-500 flex-row gap-1">
        <Link href={session ? "/my-profile" : "/sign-in"}>
          <Avatar className="w-13 h-13 ">
            <AvatarFallback className="text-black font-semibold text-3xl bg-text-gold ">
              {getInitials(session?.user?.name || "NN")}
            </AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex flex-1 items-center justify-center flex-col max-lg:hidden gap-1 ">
          <p className="text-muted">{session?.user?.name}</p>
          <p className="text-xs text-neutral-600 ">{session?.user?.email}</p>
        </div>
      </div>
    </div>
  );
};
export default SideBar;
