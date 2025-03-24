"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpRightFromSquare,
  Eye,
  Code,
  Laptop,
  Smartphone,
  Tablet,
} from "lucide-react";

const Loading = () => {
  const LoadingComponentCard = () => (
    <div className="p-4">
      <div className="mb-2 gap-x-2 flex-center-center">
        <Tabs defaultValue="desktop">
          <TabsList className="rounded-full border bg-background/60 backdrop-blur-sm">
            <TabsTrigger
              value="mobile"
              title="Mobile Preview"
              className="rounded-full backdrop-blur-sm"
            >
              <Smartphone className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger
              value="tablet"
              title="Tablet Preview"
              className="rounded-full backdrop-blur-sm"
            >
              <Tablet className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger
              value="desktop"
              title="Desktop Preview"
              className="rounded-full backdrop-blur-sm"
            >
              <Laptop className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Button
          variant={"secondary"}
          size={"icon"}
          className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-900"
          title="Open in New Tab"
          disabled
        >
          <ArrowUpRightFromSquare className="h-4 w-4" />
        </Button>
      </div>

      <Tabs
        className="overflow-hidden rounded-xl border"
        defaultValue="preview"
      >
        <TabsList className="w-full justify-start rounded-t-xl bg-accent/30 px-2 py-1 backdrop-blur-sm">
          <TabsTrigger value="buttons" asChild disabled>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="preview"
            className="border-brand data-[state=active]:border-b data-[state=active]:bg-gray-300/80 data-[state=active]:backdrop-blur-sm dark:data-[state=active]:bg-gray-900/90"
          >
            <Eye className="mr-2 h-4 w-4" />
            <span>Preview</span>
          </TabsTrigger>
          <TabsTrigger
            value="code"
            className="border-brand data-[state=active]:border-b data-[state=active]:bg-gray-300/80 data-[state=active]:backdrop-blur-sm dark:data-[state=active]:bg-gray-900/90"
          >
            <Code className="mr-2 h-4 w-4" />
            <span>Code</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="max-h-[600px] min-h-[500px]">
          <Skeleton className="h-[500px] w-full bg-gray-300 dark:bg-gray-800" />
        </TabsContent>

        <TabsContent value="code" className="max-h-[600px] min-h-[500px]">
          <div className="sticky top-0 z-30 mx-auto flex w-fit items-center justify-center rounded-full border bg-background/60 backdrop-blur-sm">
            <Skeleton className="h-8 w-[100px] rounded-full bg-gray-300 dark:bg-gray-800" />
            <Skeleton className="ml-2 h-8 w-[120px] rounded-full bg-gray-300 dark:bg-gray-800" />
          </div>
          <Skeleton className="mt-4 h-[450px] w-full bg-gray-300 dark:bg-gray-800" />
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className="relative bg-background pb-10 pt-20">
      {/* Header skeleton */}
      <header className="bg-gradient-to-r from-cyan-600 to-purple-600 px-4 py-16 text-center text-white">
        <Skeleton className="mx-auto h-12 w-48 rounded-lg bg-gray-300/50 dark:bg-gray-800/50" />
        <Skeleton className="mx-auto mt-6 h-8 w-96 rounded-lg bg-gray-300/50 dark:bg-gray-800/50" />
      </header>

      <div className="mx-auto max-w-[1360px] px-4">
        {/* Keywords search skeleton */}
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {[...Array(5)].map((_, index) => (
              <Skeleton
                key={index}
                className="h-8 w-20 rounded-full bg-gray-300 dark:bg-gray-800"
              />
            ))}
          </div>
        </div>

        {/* Component cards */}
        <div className="mt-5 space-y-8">
          {[...Array(3)].map((_, index) => (
            <LoadingComponentCard key={index} />
          ))}

          {/* Pagination skeleton */}
          <div className="mt-6 flex-center-center">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-10 w-10 rounded-md bg-gray-300 dark:bg-gray-800"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
