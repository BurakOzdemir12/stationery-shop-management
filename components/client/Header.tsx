"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, getInitials } from "@/lib/utils";
import { CgProfile } from "react-icons/cg";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { FaBars, FaXmark } from "react-icons/fa6";
import Image from "next/image";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { ChevronDown, ChevronDownIcon } from "lucide-react";
import NavLinks from "@/components/client/NavLinks";
import { Button } from "@/components/ui/button";

const Header = ({ session }: { session: Session | null }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathName = usePathname();

  return (
    <header className=" ">
      <nav className="flex flex-1 justify-between my-10 gap-20 ">
        <Link href="/" className="justify-items-start ">
          <span className="flex items-center gap-1 navLink">
            <Image
              width={`${35}`}
              height={35}
              src="/brand3.png"
              alt="brand"
              className="md:w-25 max-sm:w-15 "
            />
            Güneş Kırtasiye
          </span>
        </Link>
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-1.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
          >
            <span className="sr-only">Open main menu</span>
            <FaBars aria-hidden="true" className="size-6" />
          </button>
        </div>
        <NavLinks pathName={pathName} session={session} />
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50  w-full overflow-y-auto bg-bgDarker p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
          <div className="flex items-center justify-between ">
            <Link href="/" className="">
              <span className="flex items-center gap-1 navLink ">
                <Image
                  width={`${35}`}
                  height={35}
                  src="/brand3.png"
                  alt="brand"
                  className="md:w-25 max-sm:w-15 "
                />
                Güneş Kırtasiye
              </span>
            </Link>
            <Button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
            >
              <span className="sr-only">Close menu</span>
              <FaXmark aria-hidden="true" className="size-6" />
            </Button>
          </div>
          <div className="mt-10 justify-items-center ">
            <NavLinks
              session={session}
              pathName={pathName}
              className="flex flex-col gap-8"
            />
          </div>
        </DialogPanel>
      </Dialog>
      {/*<hr className="basis-auto border-2 border-borderColor w-full" />*/}
    </header>
  );
};
export default Header;
