"use client";

import { firaCode } from "@/app/font";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useClipboard from "@/hooks/use-clipboard";
import { cn, generateSlug, getExtensionIcon } from "@/lib/utils";
import type { ComponentType } from "@/types";
import {
  ArrowUpRightFromSquare,
  CheckCheck,
  Code,
  Copy,
  Crown,
  Download,
  Eye,
  Laptop,
  Loader2,
  Lock,
  ShoppingCart,
  Smartphone,
  Tablet,
} from "lucide-react";
import JSZip from "jszip";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { SessionUser } from "@/types";

interface ComponentCardProps {
  component: ComponentType;
  currentUser: SessionUser;
}

type PreviewSize = "mobile" | "tablet" | "desktop";

const ComponentCard = ({ component, currentUser }: ComponentCardProps) => {
  const [previewSizes, setPreviewSizes] = useState<{
    [key: string]: PreviewSize;
  }>({});

  const { copied, copyToClipboard } = useClipboard();
  const [isLoading, setIsLoading] = useState(false);

  // Check if component requires premium access (not free)
  const requiresAccess = !component.isFree;

  // Check if user has access to this component
  const hasAccess =
    // Free components are accessible to everyone
    component.isFree ||
    // Premium components with no price are part of a bundle subscription
    (!component.isFree && !component.price && currentUser?.hasPurchased) ||
    // Components with individual prices are accessible if purchased individually
    (component.price &&
      currentUser?.purchasedComponents?.includes(component.id));

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

  const downloadCode = async (
    snippet: ComponentType["codeSnippets"][0],
    allSnippets: ComponentType["codeSnippets"],
  ) => {
    setIsLoading(true);
    if (allSnippets.length === 1) {
      // Download single file
      const blob = new Blob([snippet.code], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = snippet.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setIsLoading(false);
    } else {
      // Download as zip
      const zip = new JSZip();

      // Add all snippets to the zip with proper filenames
      allSnippets.forEach((s) => {
        zip.file(s.fileName, s.code);
      });

      // Generate the zip file
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${component.slug}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <div>
          <div className="mb-2 gap-2 flex-align-center">
            <h1 className="flex-1 truncate text-xl font-semibold md:text-2xl">
              {component.name}
            </h1>
            <div className="gap-x-2 flex-center-center">
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
                  href={`/preview/${component.category.slug}/${component.slug}`}
                  className="font-semibold hover:text-brand hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ArrowUpRightFromSquare className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <div className="my-3 flex items-center">
            {component.isFree && (
              <span className="rounded-md bg-gradient-to-r from-rose-500 to-pink-600 px-3 py-1 text-sm font-bold text-white shadow-sm transition-all hover:shadow-md dark:from-green-600 dark:to-emerald-700">
                FREE
              </span>
            )}
            {component.price && (
              <div className="gap-2 flex-align-center">
                <span className="rounded-md bg-gradient-to-r from-rose-500 to-pink-600 px-3 py-1 text-lg font-bold text-white shadow-sm transition-all hover:shadow-md dark:from-blue-600 dark:to-indigo-700">
                  ${component.price}
                </span>
                <Button asChild className="gap-2">
                  <Link
                    href={`/checkout/?paymentFor=component&componentId=${component.id}`}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Buy for ${component.price}
                  </Link>
                </Button>
              </div>
            )}
            {!component.isFree && !component.price && (
              <span className="flex animate-pulse items-center gap-1.5 rounded-md border border-purple-300/20 bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-1 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg">
                <Crown className="h-4 w-4 text-yellow-300" />
                PREMIUM
              </span>
            )}
          </div>
          {component.description && (
            <p className="my-4">{component.description}</p>
          )}
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
              {requiresAccess && !hasAccess ? (
                <Lock className="mr-2 h-4 w-4" />
              ) : (
                <Code className="mr-2 h-4 w-4" />
              )}
              <span>Code</span>
            </TabsTrigger>
          </TabsList>

          {/* Preview */}
          <TabsContent
            value="preview"
            className="!mt-0 max-h-[850px] min-h-[600px]"
          >
            <iframe
              src={`/preview/${component.category.slug}/${component.slug}`}
              className={`mx-auto max-h-[850px] min-h-[600px] border ${getPreviewWidth(previewSizes[component.id] || "desktop")} transition-all duration-300 ease-in-out`}
              title={component.name}
            />
          </TabsContent>

          {/* Code */}
          <TabsContent
            value="code"
            className="relative mt-0 max-h-[850px] min-h-[600px] overflow-auto"
          >
            {requiresAccess && !hasAccess ? (
              <div className="flex h-full min-h-[600px] flex-col items-center justify-center gap-4 bg-gray-950 p-8 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Lock className="h-16 w-16 text-gray-400" />
                  <h3 className="text-2xl font-bold text-white">
                    Premium Content
                  </h3>
                  <p className="max-w-md text-gray-400">
                    This code is available exclusively to premium subscribers or
                    with individual purchase.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  {!component.price && requiresAccess && (
                    <Button
                      asChild
                      variant="default"
                      className="gap-2 focus:ring-offset-gray-950"
                    >
                      <Link href="/pricing">
                        <Crown className="h-4 w-4" />
                        Get Premium Access
                      </Link>
                    </Button>
                  )}
                  {component.price && (
                    <Button
                      asChild
                      className="gap-2 focus:ring-offset-gray-950"
                    >
                      <Link
                        href={`/checkout/?paymentFor=component&componentId=${component.id}`}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Buy for ${component.price}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <Tabs defaultValue={`${component.codeSnippets[0].id || ""}`}>
                <TabsList className="hide-scrollbar sticky top-0 z-30 mx-auto flex w-fit max-w-full items-center justify-start gap-x-3 overflow-x-auto rounded-full border bg-background/60 px-1 py-1 backdrop-blur-sm">
                  {component.codeSnippets.map((snippet) => {
                    return (
                      <TabsTrigger
                        value={snippet.id}
                        key={snippet.id}
                        className="flex-shrink-0 whitespace-nowrap rounded-full backdrop-blur-sm data-[state=active]:border-2 data-[state=active]:border-brand data-[state=active]:bg-gray-300/80 dark:data-[state=active]:bg-gray-900/90"
                      >
                        <Image
                          src={
                            getExtensionIcon(snippet.extension) ||
                            "/placeholder.svg"
                          }
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
                    <TabsContent
                      key={snippet.id}
                      value={snippet.id}
                      className="mt-0 min-h-[600px] bg-gray-950"
                    >
                      <div className="sticky right-4 top-0 z-20 -mt-6 flex justify-end gap-2">
                        <Button
                          size={"icon"}
                          onClick={() =>
                            downloadCode(snippet, component.codeSnippets)
                          }
                          className="h-8 w-8 !outline-none !ring-0 !ring-offset-0"
                          title={
                            component.codeSnippets.length > 1
                              ? "Download as zip"
                              : "Download file"
                          }
                        >
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Download className="h-4 w-4" />
                          )}
                        </Button>
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
                      <div className={cn("font-mono", firaCode.className)}>
                        <SyntaxHighlighter
                          language={snippet.language}
                          style={vscDarkPlus}
                          showLineNumbers={true}
                          wrapLines={true}
                        >
                          {snippet.code}
                        </SyntaxHighlighter>
                      </div>
                    </TabsContent>
                  );
                })}
              </Tabs>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ComponentCard;
