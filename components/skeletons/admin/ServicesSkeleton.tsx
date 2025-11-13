import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ServicesSkeleton() {
  return (
    <div className="justify-self-start flex  space-x-4">
      <div className="space-y-2 gap-5 grid grid-cols-1 xl:grid-cols-6 lg:grid-cols-3 ">
        {[...Array(4).keys()].map((item, index) => (
          <div key={index} className="col-span-1  ">
            <Skeleton className="min-h-[192] max-w-[216] rounded-xl bg-text-gold w-full h-full p-25 justify-end flex flex-col "></Skeleton>
          </div>
        ))}
      </div>
    </div>
  );
}
