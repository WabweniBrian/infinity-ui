import ComponentCardSkeleton from "@/components/main/common/component-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="relative bg-background pb-10 pt-20">
      <div className="mx-auto max-w-7xl px-4">
        <Skeleton className="mx-auto my-4 h-10 w-64 bg-gray-300 dark:bg-gray-800" />
        <div className="mb-4">
          <Skeleton className="h-10 w-full rounded-full bg-gray-300 dark:bg-gray-800" />
        </div>
        <div className="mt-4">
          <Skeleton className="h-12 w-full bg-gray-300 dark:bg-gray-800" />
          <div className="mt-2 flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-8 w-24 rounded-full bg-gray-300 dark:bg-gray-800"
              />
            ))}
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <ComponentCardSkeleton key={index} />
          ))}
        </div>
        <div className="mt-6 flex-center-center">
          <Skeleton className="h-10 w-64 bg-gray-300 dark:bg-gray-800" />
        </div>
      </div>
    </div>
  );
}
