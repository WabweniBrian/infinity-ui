import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
          <Skeleton className="h-20 w-20 rounded-full bg-gray-300 dark:bg-gray-800" />
          <div className="text-center md:text-left">
            <Skeleton className="h-8 w-48 bg-gray-300 dark:bg-gray-800" />
            <Skeleton className="mt-2 h-4 w-32 bg-gray-300 dark:bg-gray-800" />
            <Skeleton className="mt-2 h-4 w-24 bg-gray-300 dark:bg-gray-800" />
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="flex overflow-x-auto">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              className="mx-2 h-10 w-32 bg-gray-300 dark:bg-gray-800"
            />
          ))}
        </div>
      </div>

      <div className="py-6">
        <Skeleton className="mb-6 h-8 w-48 bg-gray-300 dark:bg-gray-800" />

        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-32 w-full rounded-lg bg-gray-300 dark:bg-gray-800"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
