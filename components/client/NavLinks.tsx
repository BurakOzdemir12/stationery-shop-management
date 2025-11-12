import React from "react";
import { Session } from "next-auth";
import Link from "next/link";
import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IKImage } from "imagekitio-react";
import config from "@/lib/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa6";
type NavLinksProps = {
  className?: string;
  session?: Session | null;
  pathName: string | null;
};
const NavLinks = ({
  session,
  pathName,
  className = "flex max-md:hidden justify-between items-center gap-10",
}: NavLinksProps) => {
  const Links = [
    {
      name: "Home",
      href: "/",
    },
    { name: "Products", href: "#all-products" },
  ];
  return (
    <ul className={cn(className)}>
      {Links.map((item, index) => (
        <li key={index} className="navLink  ">
          <Link
            className={cn(" ", pathName === item.href && "text-[#EED1AC]")}
            href={item.href}
          >
            {item.name}
          </Link>
        </li>
      ))}
      <li className="navLink ">
        <DropdownMenu defaultOpen={true} modal={false}>
          <DropdownMenuTrigger asChild>
            {session ? (
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
                {/*<CgProfile className="navLink text-3xl" />*/}
              </Link>
            ) : (
              <Button className="cursor-pointer text-xl">
                Login <FaArrowRight className="size-5 " />
              </Button>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={`${session ? "hidden " : "border-0 bg-text-sun"}`}
            align="start"
          >
            <DropdownMenuGroup>
              {session ? (
                <></>
              ) : (
                <div>
                  <Link href="/sign-in" className=" ">
                    <DropdownMenuItem className="font-semibold cursor-pointer  hover:bg-text-gold">
                      Sign In
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/sign-up">
                    <DropdownMenuItem className=" font-semibold cursor-pointer hover:bg-text-gold">
                      Sign Up
                    </DropdownMenuItem>
                  </Link>
                </div>
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </li>
    </ul>
  );
};
export default NavLinks;
