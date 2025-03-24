import { Skeleton } from "@/components/ui/skeleton";

export default function CategoriesLoading() {
  const skeletonCategories = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div>
      {/* Search and Add Category button skeleton */}
      <div className="flex items-center justify-between rounded-xl border bg-white/60 p-4 dark:bg-accent/20">
        <Skeleton className="h-10 w-full max-w-[300px] bg-gray-300 dark:bg-gray-800" />
        <Skeleton className="ml-2 h-10 w-28 bg-gray-300 dark:bg-gray-800" />
      </div>

      {/* Categories grid skeleton */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skeletonCategories.map((index) => (
          <div
            className="rounded-xl border bg-white/80 p-4 dark:bg-accent/20"
            key={index}
          >
            <div>
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-3/4 bg-gray-300 dark:bg-gray-800" />
                <Skeleton className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-800" />
              </div>
            </div>
            <div className="mt-2">
              <Skeleton className="h-5 w-1/2 bg-gray-300 dark:bg-gray-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
