import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function RootSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-5">
      <Skeleton className="col-span-2 rounded-xl w-auto bg-bgDarker  h-[436] p-3  "></Skeleton>
      <Skeleton className="col-span-1 rounded-xl w-auto bg-bgDarker  h-[436] p-3  "></Skeleton>
    </div>
  );
}
