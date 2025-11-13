import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col space-y-3">
      <div className="space-y-2">
        <Skeleton className="h-[620] bg-bgDarker flex flex-row justify-center items-center gap-5">
          <Skeleton className="w-xl h-[502] bg-gray-800" />
          <Skeleton className="w-xl h-[400] bg-gray-800" />
        </Skeleton>
      </div>
    </div>
  );
}
