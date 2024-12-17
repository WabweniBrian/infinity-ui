import ComponentCardSkeleton from "@/components/main/common/component-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-8 pt-24">
      <Skeleton className="mb-4 h-8 w-64 bg-gray-300 dark:bg-gray-800" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 10 }).map((_, index) => (
          <ComponentCardSkeleton key={index} />
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center">
        <Skeleton className="h-10 w-64" />
      </div>
    </div>
  );
}
