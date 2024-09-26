"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Component } from "@/data/components";
import {
  ArrowUpRightFromSquare,
  Laptop,
  Smartphone,
  Tablet,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type PreviewSize = "mobile" | "tablet" | "desktop";

interface ComponentsListProps {
  components: Component[];
}

export default function ComponentsList({ components }: ComponentsListProps) {
  const [previewSizes, setPreviewSizes] = useState<{
    [key: string]: PreviewSize;
  }>({});

  const changePreviewSize = (componentId: string, size: PreviewSize) => {
    setPreviewSizes((prev) => ({
      ...prev,
      [componentId]: size,
    }));
  };

  const getPreviewWidth = (size: PreviewSize) => {
    switch (size) {
      case "mobile":
        return "w-full sm:w-[375px]";
      case "tablet":
        return "w-full sm:w-[768px]";
      case "desktop":
      default:
        return "w-full";
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {components.map((component) => (
        <div key={component.id}>
          <div className="mb-4 flex items-center justify-between gap-4">
            <Link
              href={`/components/preview/${component.category}/${component.slug}`}
              className="flex-1 truncate text-xl font-semibold text-brand hover:underline md:text-2xl"
            >
              {component.name}
            </Link>
            <div className="gap-x-2 flex-align-center">
              <Tabs
                value={previewSizes[component.id] || "desktop"}
                onValueChange={(value) =>
                  changePreviewSize(component.id, value as PreviewSize)
                }
              >
                <TabsList className="rounded-full border bg-background/60 backdrop-blur-sm">
                  <TabsTrigger
                    value="mobile"
                    title="Mobile Preview"
                    className="rounded-full backdrop-blur-sm data-[state=active]:bg-gray-300/80 dark:data-[state=active]:bg-gray-900/90"
                  >
                    <Smartphone className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="tablet"
                    title="Tablet Preview"
                    className="rounded-full backdrop-blur-sm data-[state=active]:bg-gray-300/80 dark:data-[state=active]:bg-gray-900/90"
                  >
                    <Tablet className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="desktop"
                    title="Desktop Preview"
                    className="rounded-full backdrop-blur-sm data-[state=active]:bg-gray-300/80 dark:data-[state=active]:bg-gray-900/90"
                  >
                    <Laptop className="h-4 w-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <Button
                asChild
                variant={"secondary"}
                size={"icon"}
                className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-900"
                title="Open in New Tab"
              >
                <a
                  href={`/components/preview/${component.category}/${component.slug}`}
                  className="font-semibold hover:text-brand hover:underline"
                  target="_blank"
                >
                  <ArrowUpRightFromSquare className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border">
            <div className="flex items-center justify-between rounded-t-xl bg-accent/30 px-2 py-1 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <div
                  className="h-3 w-3 rounded-full bg-red-500"
                  title="Close"
                ></div>
                <div
                  className="h-3 w-3 rounded-full bg-yellow-500"
                  title="Minimize"
                ></div>
                <div
                  className="h-3 w-3 rounded-full bg-green-500"
                  title="Maximize"
                ></div>
                <span className="ml-2 text-lg font-medium">
                  {component.name}
                </span>
              </div>
            </div>

            <iframe
              src={`/components/preview/${component.category}/${component.slug}`}
              className={`mx-auto h-[500px] border ${getPreviewWidth(previewSizes[component.id] || "desktop")} transition-all duration-300 ease-in-out`}
              title={component.name}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
