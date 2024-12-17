import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ComponentCardSkeleton = () => {
  return (
    <div className="group cursor-pointer overflow-hidden">
      <div className="p-0">
        <div className="relative aspect-video h-[300px] w-full overflow-hidden rounded-xl">
          <Skeleton className="absolute inset-0 bg-gray-300 dark:bg-gray-800" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <Skeleton className="mb-2 h-6 w-3/4" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-5 w-16 rounded-full bg-gray-300 dark:bg-gray-800" />
              <Skeleton className="h-5 w-16 rounded-full bg-gray-300 dark:bg-gray-800" />
              <Skeleton className="h-5 w-8 rounded-full bg-gray-300 dark:bg-gray-800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentCardSkeleton;
