"use client";

import MainPagination from "@/components/common/main-pagination";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/utils";
import { Component } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import ComponentsBulkActions from "./bulk-actions";
import ComponentActions from "./component-actions";

interface ComponentTableProps {
  components: (Component & { category: { name: string } })[];
  componentsCount: number;
  totalComponents: number;
  totalPages: number;
  offset: number;
}

export const ComponentsTable = ({
  components,
  componentsCount,
  totalComponents,
  totalPages,
  offset,
}: ComponentTableProps) => {
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);

  const allSelected =
    components.length > 0 && selectedComponents.length === components.length;

  const toggleSelectComponent = (componentId: string) => {
    if (selectedComponents.includes(componentId)) {
      setSelectedComponents(
        selectedComponents.filter((id) => id !== componentId),
      );
    } else {
      setSelectedComponents([...selectedComponents, componentId]);
    }
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedComponents([]);
    } else {
      setSelectedComponents(components.map((component) => component.id));
    }
  };

  return (
    <>
      <div className="mb-4 flex justify-end text-xl font-bold md:text-2xl">
        {componentsCount} component(s)
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
        {/* Bulk Actions Bar */}
        {selectedComponents.length > 0 && (
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {selectedComponents.length} component
                {selectedComponents.length !== 1 ? "s" : ""} selected
              </span>
            </div>
            <ComponentsBulkActions
              ids={selectedComponents}
              setSelectedIds={setSelectedComponents}
            />
          </div>
        )}

        <div className="scrollbar-hover overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left dark:bg-gray-800/50">
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="select-all"
                      checked={allSelected}
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all components"
                    />
                    <label htmlFor="select-all" className="sr-only">
                      Select all
                    </label>
                    Component
                  </div>
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Category
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Price
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Created
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {components.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <Image
                        src="/no-results.png"
                        alt="No Results Image"
                        width={60}
                        height={60}
                        className="mx-auto"
                      />
                      <p className="text-gray-500 dark:text-gray-400">
                        No results.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                components.map((component) => (
                  <tr
                    key={component.id}
                    className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="mr-3">
                          <Checkbox
                            id={`select-${component.id}`}
                            checked={selectedComponents.includes(component.id)}
                            onCheckedChange={() =>
                              toggleSelectComponent(component.id)
                            }
                            aria-label={`Select ${component.name}`}
                          />
                        </div>
                        <div className="relative mr-3 h-10 w-10 overflow-hidden rounded-md">
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
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {component.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {component.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {component.category.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      {component.isfree && (
                        <Badge className="!bg-green-100 text-green-800 dark:!bg-green-900/30 dark:text-green-400">
                          Free
                        </Badge>
                      )}
                      {!component.isfree && !component.price && (
                        <Badge className="!bg-yellow-100 text-yellow-800 dark:!bg-yellow-900/30 dark:text-yellow-400">
                          Premium
                        </Badge>
                      )}
                      {component.price && `$${component.price?.toFixed(2)}`}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {component.isFeatured && (
                          <Badge className="border border-brand-yellow !bg-brand-yellow/10 text-brand-yellow">
                            Featured
                          </Badge>
                        )}
                        {component.isNew && (
                          <Badge className="border border-brand !bg-brand/10 text-brand">
                            New
                          </Badge>
                        )}
                        {!component.show && (
                          <Badge className="border border-red-500 !bg-brand/10 text-red-500">
                            Hidden
                          </Badge>
                        )}
                        {component.isAI && (
                          <Badge className="border border-brand-pink !bg-brand-pink/10 text-brand-pink">
                            AI
                          </Badge>
                        )}
                        {!component.isFeatured &&
                          !component.isNew &&
                          !component.isAI && (
                            <Badge className="!bg-gray-100 text-gray-800 dark:!bg-gray-700 dark:text-gray-300">
                              Standard
                            </Badge>
                          )}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(component.createdAt)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      <ComponentActions
                        component={{
                          id: component.id,
                          isNew: component.isNew,
                          isFeatured: component.isFeatured,
                          show: component.show,
                        }}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 bg-gray-50 p-2 dark:border-gray-700 dark:bg-gray-800/50 sm:flex-row">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing{" "}
            <span className="font-medium">
              {offset + 1} - {offset + components.length}
            </span>{" "}
            of <span className="font-medium">{totalComponents}</span> components
          </div>

          {/* Pagination */}
          <div>{totalPages > 1 && <MainPagination pages={totalPages} />}</div>
        </div>
      </div>
    </>
  );
};
