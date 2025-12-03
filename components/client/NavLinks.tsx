"use client";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa6";
import { useLocale, useTranslations } from "next-intl";
import { IoLanguage } from "react-icons/io5";
import { useRouter } from "@/i18n/navigation";
type NavLinksProps = {
  className?: string;
  session?: Session | null;
  pathName: string;
};
const NavLinks = ({
  session,
  pathName,
  className = "flex max-md:hidden justify-between items-center  gap-10",
}: NavLinksProps) => {
  const router = useRouter();
  const locale = useLocale();

  const t = useTranslations("HeaderClient");
  const Links = [
    {
      name: t("home"),
      href: "/",
    },
    { name: t("products"), href: "/#all-products" },
  ];
  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathName, { locale: newLocale });
  };
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
            <IoLanguage className="size-7" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="center"
            className="  text-center border-0 p-0 m-0   bg-text-sun mt-5 "
          >
            <DropdownMenuGroup className="">
              <DropdownMenuItem
                className="p-0 m-0 rounded-xl  "
                onClick={() => handleLanguageChange("en")}
              >
                <Button className="p-0 m-0 w-full   text-lg cursor-pointer  hover:bg-text-gold ">
                  English
                </Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-bgDark" />
              <DropdownMenuItem
                className="p-0 m-0 rounded-xl "
                onClick={() => handleLanguageChange("tr")}
              >
                <Button className="p-0 m-0 w-full   text-lg cursor-pointer  hover:bg-text-gold  ">
                  Türkçe
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </li>
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
                {t("login")} <FaArrowRight className="size-5 " />
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
                      {t("signIn")}
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/sign-up">
                    <DropdownMenuItem className=" font-semibold cursor-pointer hover:bg-text-gold">
                      {t("signUp")}
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
