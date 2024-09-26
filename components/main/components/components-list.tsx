"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Component } from "@/data/components";
import useClipboard from "@/hooks/use-clipboard";
import { generateSlug, getExtensionIcon } from "@/lib/utils";
import { TabsContent } from "@radix-ui/react-tabs";
import {
  ArrowUpRightFromSquare,
  CheckCheck,
  Code,
  Copy,
  Eye,
  Laptop,
  Layers,
  Smartphone,
  Tablet,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

type PreviewSize = "mobile" | "tablet" | "desktop";

interface ComponentsListProps {
  components: Component[];
}

export default function ComponentsList({ components }: ComponentsListProps) {
  const [previewSizes, setPreviewSizes] = useState<{
    [key: string]: PreviewSize;
  }>({});

  const { copied, copyToClipboard } = useClipboard();

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
            <a
              href={`/preview/${component.category}/${component.slug}`}
              className="flex-1 truncate text-xl font-semibold text-brand hover:underline md:text-2xl"
              target="_blank"
            >
              {component.name}
            </a>
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
                  href={`/preview/${component.category}/${component.slug}`}
                  className="font-semibold hover:text-brand hover:underline"
                  target="_blank"
                >
                  <ArrowUpRightFromSquare className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <Tabs
            className="overflow-hidden rounded-xl border"
            defaultValue="preview"
          >
            <TabsList className="w-full justify-start rounded-t-xl bg-accent/30 px-2 py-1 backdrop-blur-sm">
              <TabsTrigger value="buttons" asChild disabled>
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
                </div>
              </TabsTrigger>

              {/* Preview */}
              <TabsTrigger
                value="preview"
                className="border-brand data-[state=active]:border-b data-[state=active]:bg-gray-300/80 data-[state=active]:backdrop-blur-sm dark:data-[state=active]:bg-gray-900/90"
              >
                <Eye className="mr-2 h-4 w-4" />
                <span>Preview</span>
              </TabsTrigger>

              {/* Code */}
              <TabsTrigger
                value="code"
                className="border-brand data-[state=active]:border-b data-[state=active]:bg-gray-300/80 data-[state=active]:backdrop-blur-sm dark:data-[state=active]:bg-gray-900/90"
              >
                <Code className="mr-2 h-4 w-4" />
                <span>Code</span>
              </TabsTrigger>

              {/* Deps */}
              <TabsTrigger
                value="deps"
                className="ml-2 border-brand data-[state=active]:border-b data-[state=active]:bg-gray-300/80 data-[state=active]:backdrop-blur-sm dark:data-[state=active]:bg-gray-900/90"
              >
                <Layers className="mr-2 h-4 w-4" />
                <span>Deps</span>
              </TabsTrigger>
            </TabsList>

            {/* Preview */}
            <TabsContent
              value="preview"
              className="max-h-[600px] min-h-[500px]"
            >
              <iframe
                src={`/preview/${component.category}/${component.slug}`}
                className={`mx-auto max-h-[600px] min-h-[500px] border ${getPreviewWidth(previewSizes[component.id] || "desktop")} transition-all duration-300 ease-in-out`}
                title={component.name}
              />
            </TabsContent>

            {/* Code */}
            <TabsContent
              value="code"
              className="relative max-h-[600px] min-h-[500px] overflow-auto p-4"
            >
              <Tabs defaultValue={`${component.codeSnippets[0].id || ""}`}>
                <TabsList className="sticky top-0 z-30 mx-auto flex w-fit items-center justify-center rounded-full border bg-background/60 backdrop-blur-sm">
                  {component.codeSnippets.map((snippet) => {
                    return (
                      <TabsTrigger
                        value={snippet.id}
                        key={snippet.id}
                        className="rounded-full backdrop-blur-sm data-[state=active]:bg-gray-300/80 dark:data-[state=active]:bg-gray-900/90"
                      >
                        <Image
                          src={getExtensionIcon(snippet.extension)}
                          alt={generateSlug(snippet.fileName)}
                          width={16}
                          height={16}
                          className="object-contain"
                        />
                        <span className="ml-2">{snippet.fileName}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
                {component.codeSnippets.map((snippet) => {
                  return (
                    <TabsContent key={snippet.id} value={snippet.id}>
                      <div className="sticky right-4 top-0 z-20 -mt-6 flex justify-end">
                        <Button
                          size={"icon"}
                          onClick={() => copyToClipboard(snippet.code)}
                          className="h-8 w-8 !outline-none !ring-0 !ring-offset-0"
                          title="Copy to clipboard"
                        >
                          <span>
                            {copied ? (
                              <CheckCheck className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </span>
                        </Button>
                      </div>
                      <SyntaxHighlighter
                        language={snippet.language}
                        style={vscDarkPlus}
                        showLineNumbers={true}
                        wrapLines={true}
                      >
                        {snippet.code}
                      </SyntaxHighlighter>
                    </TabsContent>
                  );
                })}
              </Tabs>
            </TabsContent>

            {/* Deps */}
            <TabsContent value="deps" className="min-h-[500px] p-4">
              <h1 className="text-2xl font-bold md:text-3xl">Dependencies</h1>
            </TabsContent>
          </Tabs>
        </div>
      ))}
    </div>
  );
}
