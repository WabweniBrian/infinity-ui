"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useClipboard from "@/hooks/use-clipboard";
import { formatDate } from "@/lib/utils";
import { CodeSnippet, Component } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Calendar,
  Check,
  Code,
  DollarSign,
  Download,
  Eye,
  FileCode,
  Loader2,
  Package,
  Star,
  Tag,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import JSZip from "jszip";

type TComponent = Component & {
  category: { name: string; slug: string };
  codeSnippets: CodeSnippet[];
};

interface ComponentDetailsModalProps {
  component: TComponent;
  onClose: () => void;
}

export const ComponentDetailsModal = ({
  component,
  onClose,
}: ComponentDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState("details");
  const { copied, copyToClipboard } = useClipboard();
  const [isLoading, setIsLoading] = useState(false);

  const downloadCode = async (
    snippet: CodeSnippet,
    allSnippets: CodeSnippet[],
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-xl dark:bg-gray-900"
        >
          <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
            <div className="flex items-center">
              <div className="relative mr-4 h-12 w-12 overflow-hidden rounded-md">
                <Image
                  src={
                    component.image ||
                    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                  }
                  alt={component.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {component.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Component ID: {component.id}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={onClose}
                title="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "details"
                  ? "border-b-2 border-brand text-brand"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("details")}
            >
              <Package className="mr-2 inline-block h-4 w-4" />
              Details
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "code"
                  ? "border-b-2 border-brand text-brand"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("code")}
            >
              <Code className="mr-2 inline-block h-4 w-4" />
              Code Snippets
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "preview"
                  ? "border-b-2 border-brand text-brand"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("preview")}
            >
              <Eye className="mr-2 inline-block h-4 w-4" />
              Preview
            </button>
          </div>

          <div className="max-h-[calc(90vh-8rem)] overflow-y-auto">
            {activeTab === "details" && (
              <div className="p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
                    <div className="mb-4 flex items-center">
                      <Package className="mr-2 h-5 w-5 text-brand" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Component Information
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Name
                        </p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                          {component.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Slug
                        </p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                          {component.slug}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Description
                        </p>
                        <p className="text-base text-gray-900 dark:text-white">
                          {component.description || "No description provided"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
                    <div className="mb-4 flex items-center">
                      <Tag className="mr-2 h-5 w-5 text-brand-pink" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Category & Status
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Category
                        </p>
                        <Badge className="mt-1 !bg-gray-100 text-gray-800 dark:!bg-gray-700 dark:text-gray-300">
                          {component.category.name}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Status
                        </p>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {component.isFeatured && (
                            <Badge className="border border-brand-yellow !bg-brand-yellow/10 text-brand-yellow">
                              <Star className="mr-1 h-3 w-3" />
                              Featured
                            </Badge>
                          )}
                          {component.isNew && (
                            <Badge className="border border-brand !bg-brand/10 text-brand">
                              New
                            </Badge>
                          )}
                          {component.isAI && (
                            <Badge className="border border-brand-pink !bg-brand-pink/10 text-brand-pink">
                              AI-Powered
                            </Badge>
                          )}
                          {component.show ? (
                            <Badge className="!bg-green-100 text-green-800 dark:!bg-green-900/30 dark:text-green-400">
                              <Check className="mr-1 h-3 w-3" />
                              Visible
                            </Badge>
                          ) : (
                            <Badge className="!bg-yellow-100 text-yellow-800 dark:!bg-yellow-900/30 dark:text-yellow-400">
                              <AlertTriangle className="mr-1 h-3 w-3" />
                              Hidden
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Created
                        </p>
                        <div className="mt-1 flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                          <p className="text-base font-medium text-gray-900 dark:text-white">
                            {formatDate(component.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50 md:col-span-2">
                    <div className="mb-4 flex items-center">
                      <DollarSign className="mr-2 h-5 w-5 text-brand-yellow" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Pricing
                      </h3>
                    </div>
                    <div className="flex items-center">
                      {component.isfree && (
                        <Badge className="dark:1bg-green-900/30 !bg-green-100 px-3 py-1 text-base text-green-800 dark:text-green-400">
                          Free Component
                        </Badge>
                      )}

                      {!component.isfree && !component.price && (
                        <Badge className="!bg-yellow-100 px-3 py-1 text-base text-yellow-800 dark:!bg-yellow-900/30 dark:text-yellow-400">
                          Premium
                        </Badge>
                      )}

                      {component.price && (
                        <div className="flex items-center">
                          <span className="mr-2 text-2xl font-bold text-gray-900 dark:text-white">
                            ${component.price?.toFixed(2)}
                          </span>
                          <Badge className="border border-brand !bg-brand/10 text-brand">
                            Premium
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "code" && (
              <div className="p-6">
                <div className="flex-center-between">
                  <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                    Code Snippets
                  </h3>
                  <Button
                    size={"icon"}
                    onClick={() =>
                      downloadCode(
                        component.codeSnippets[0],
                        component.codeSnippets,
                      )
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
                </div>
                <div className="space-y-6">
                  {component.codeSnippets.map((snippet) => (
                    <div
                      key={snippet.id}
                      className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50"
                    >
                      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center">
                          <FileCode className="mr-2 h-4 w-4 text-brand" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {snippet.fileName}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                            {snippet.language}
                          </Badge>
                          <button
                            className="text-xs text-brand hover:underline"
                            onClick={() => copyToClipboard(snippet.code)}
                          >
                            {copied ? "Copied!" : "Copy"}
                          </button>
                        </div>
                      </div>
                      <div className="max-h-[400px] min-h-[400px] overflow-x-auto overflow-y-auto bg-gray-800 p-4 font-mono">
                        <SyntaxHighlighter
                          language={snippet.language}
                          style={vscDarkPlus}
                          showLineNumbers={true}
                          wrapLines={true}
                        >
                          {snippet.code}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "preview" && (
              <div className="p-6">
                <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                  Component Preview
                </h3>
                <div className="flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-8 dark:border-gray-700 dark:bg-gray-700/50">
                  <div className="rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-800">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                      {component.name}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300">
                      {component.description || "Component description"}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={`/preview/${component.category.slug}/${component.slug}`}
                      className="flex-align-center"
                      target="_blank"
                      referrerPolicy="no-referrer"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Open in Full Preview
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
