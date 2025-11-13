import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="justify-self-start flex  space-x-4">
      <div className="space-y-2 gap-5 grid grid-cols-1 lg:grid-cols-4 ">
        {[...Array(4).keys()].map((item, index) => (
          <div key={index} className="col-span-1 ">
            <Skeleton className="rounded-xl bg-bgDarker w-[310] h-[436] p-3 justify-end flex flex-col ">
              <Skeleton className="w-full  h-[25]   bg-text-gold" />
              <Skeleton className="w-full  h-[25] mt-3 bg-text-gold" />
            </Skeleton>
          </div>
        ))}
      </div>
    </div>
  );
}
