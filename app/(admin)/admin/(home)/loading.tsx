import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-9 w-48 bg-gray-300 dark:bg-gray-800" />
        <Skeleton className="mt-2 h-5 w-96 bg-gray-300 dark:bg-gray-800" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <div className="flex">
              <div className="flex-1 p-4">
                <Skeleton className="h-5 w-24 bg-gray-300 dark:bg-gray-800" />
                <Skeleton className="mt-3 h-8 w-20 bg-gray-300 dark:bg-gray-800" />
                <Skeleton className="mt-2 h-4 w-32 bg-gray-300 dark:bg-gray-800" />
              </div>
              <Skeleton className="h-auto w-16 bg-gray-300 dark:bg-gray-800" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <Skeleton className="h-6 w-32 bg-gray-300 dark:bg-gray-800" />
            <Skeleton className="h-4 w-48 bg-gray-300 dark:bg-gray-800" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[240px] w-full bg-gray-300 dark:bg-gray-800" />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <Skeleton className="h-6 w-32 bg-gray-300 dark:bg-gray-800" />
            <Skeleton className="h-4 w-48 bg-gray-300 dark:bg-gray-800" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[240px] w-full bg-gray-300 dark:bg-gray-800" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <Skeleton className="h-6 w-32 bg-gray-300 dark:bg-gray-800" />
            <Skeleton className="h-4 w-48 bg-gray-300 dark:bg-gray-800" />
          </CardHeader>
          <CardContent>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="mb-4 flex items-center rounded-lg border p-3"
              >
                <Skeleton className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-800" />
                <div className="ml-4 flex-1 space-y-1">
                  <Skeleton className="h-4 w-32 bg-gray-300 dark:bg-gray-800" />
                  <Skeleton className="h-3 w-24 bg-gray-300 dark:bg-gray-800" />
                </div>
                <div className="ml-auto text-right">
                  <Skeleton className="h-4 w-16 bg-gray-300 dark:bg-gray-800" />
                  <Skeleton className="mt-1 h-3 w-24 bg-gray-300 dark:bg-gray-800" />
                </div>
                <div className="ml-4">
                  <Skeleton className="h-6 w-16 rounded-full bg-gray-300 dark:bg-gray-800" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <Skeleton className="h-6 w-32 bg-gray-300 dark:bg-gray-800" />
            <Skeleton className="h-4 w-48 bg-gray-300 dark:bg-gray-800" />
          </CardHeader>
          <CardContent>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="mb-4 flex items-center rounded-lg border p-3"
              >
                <Skeleton className="h-10 w-10 rounded-md bg-gray-300 dark:bg-gray-800" />
                <div className="ml-4 flex-1 space-y-1">
                  <Skeleton className="h-4 w-32 bg-gray-300 dark:bg-gray-800" />
                  <Skeleton className="h-3 w-24 bg-gray-300 dark:bg-gray-800" />
                </div>
                <div className="ml-auto text-right">
                  <Skeleton className="h-4 w-16 bg-gray-300 dark:bg-gray-800" />
                  <Skeleton className="mt-1 h-3 w-24 bg-gray-300 dark:bg-gray-800" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
