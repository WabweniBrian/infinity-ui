import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-9 w-48 bg-gray-300 dark:bg-gray-800" />
        <Skeleton className="mt-2 h-5 w-96 bg-gray-300 dark:bg-gray-800" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800"
          >
            <div className="flex items-start justify-between">
              <div>
                <Skeleton className="h-4 w-24 bg-gray-300 dark:bg-gray-800" />
                <Skeleton className="mt-2 h-8 w-20 bg-gray-300 dark:bg-gray-800" />
                <Skeleton className="mt-2 h-4 w-32 bg-gray-300 dark:bg-gray-800" />
              </div>
              <Skeleton className="h-10 w-10 rounded-lg bg-gray-300 dark:bg-gray-800" />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <Skeleton className="h-10 flex-grow rounded-lg bg-gray-300 dark:bg-gray-800" />
          <Skeleton className="h-10 w-32 rounded-lg bg-gray-300 dark:bg-gray-800" />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-800">
        <div className="space-y-4 p-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-800"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-4 rounded bg-gray-300 dark:bg-gray-800" />
                <div>
                  <Skeleton className="h-5 w-32 bg-gray-300 dark:bg-gray-800" />
                  <Skeleton className="mt-1 h-4 w-48 bg-gray-300 dark:bg-gray-800" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-20 rounded-md bg-gray-300 dark:bg-gray-800" />
                <Skeleton className="h-8 w-20 rounded-md bg-gray-300 dark:bg-gray-800" />
                <Skeleton className="h-8 w-8 rounded-md bg-gray-300 dark:bg-gray-800" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between border-t border-gray-200 p-4 dark:border-gray-800">
          <Skeleton className="h-8 w-32 bg-gray-300 dark:bg-gray-800" />
          <Skeleton className="h-8 w-32 bg-gray-300 dark:bg-gray-800" />
        </div>
      </div>
    </div>
  );
}
