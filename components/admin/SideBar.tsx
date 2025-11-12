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
import { IKImage } from "imagekitio-react";
import config from "@/lib/config";

const SideBar = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  const isPosRoute = pathname.startsWith("/admin/pos");

  return (
    <div className={`admin-sidebar ${isPosRoute && "w-min"}`}>
      <div>
        <div className={`logo ${isPosRoute && "hidden"} `}>
          <Image src="/brand3.png" alt="brand Logo" width={95} height={95} />
          <h1 className="text-xl font-semibold text-sidebar-text   ">
            Güneş Kırtasiye
          </h1>
        </div>
        <div className="mt-12 flex flex-col gap-7  w-min">
          {adminSideBarLinks.map(({ text, href: route, icon }) => {
            const isSelected =
              (route !== "/admin" &&
                pathname.includes(route) &&
                route.length > 1) ||
              pathname === route;
            return (
              <Link
                href={route}
                key={route}
                className={cn(" ", isPosRoute && "w-fit")}
              >
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
                      "text-lg text-sidebar-text font-medium max-md:hidden",
                      isPosRoute && "hidden",
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
      <div
        className={cn(
          "lg:p-0.5   lg:items-center lg:justify-between lg:rounded-2xl lg:shadow-md shadow-neutral-500  gap-1 flex flex-row",
          isPosRoute && "hidden",
        )}
      >
        <Link href={session ? "/my-profile" : "/sign-in"}>
          <Avatar className="w-15 h-15 ">
            {session?.user?.image ? (
              <IKImage
                path={session?.user?.image}
                urlEndpoint={config.env.imagekit.urlEndpoint}
                alt="product image"
                className=" object-contain w-full "
              />
            ) : (
              <AvatarFallback className="text-black font-semibold text-3xl bg-text-gold ">
                {getInitials(session?.user?.name || "NN")}
              </AvatarFallback>
            )}
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
