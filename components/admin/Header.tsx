import React from "react";
import { Input } from "@/components/ui/input";
import { Session } from "next-auth";
import Image from "next/image";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="admin-header bg-white border-neutral-300 border-r-1 border-b-1">
      <div className="p-3  grid grid-cols-2 justify-between   gap-5 ">
        <div className="search-bar col-span-1 align-middle  ">
          <Input
            className="bg-neutral-300 rounded-2xl placeholder:font-medium   "
            placeholder="Ara.."
          />
        </div>
        <div className="info col-span-1 flex-row flex  justify-self-end  ">
          <p className="text-xl font-pacifico ">{session?.user?.name}</p>
          {/*<Image src={session?.user?.image} alt="Profile image" />*/}
        </div>
      </div>
    </header>
  );
};
export default Header;
