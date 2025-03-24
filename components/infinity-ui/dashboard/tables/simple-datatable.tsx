"use client";

import { initialColumns as columns, data } from "@/data/datatable";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

interface SimpleDataTableProps<T> {
  title?: string;
  className?: string;
}

const SimpleDataTable = <T extends Record<string, any>>({
  title = "Simple Data Table",
  className = "",
}: SimpleDataTableProps<T>) => {
  const [sortBy, setSortBy] = useState<{ id: string; desc: boolean } | null>(
    null,
  );
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check if system prefers dark mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(isDark);

      if (isDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Handle sort
  const handleSort = (columnId: string) => {
    setSortBy((prev) => {
      if (prev?.id === columnId) {
        return prev.desc ? null : { id: columnId, desc: true };
      }
      return { id: columnId, desc: false };
    });
  };

  // Sort data
  const sortedData = [...data].sort((a, b) => {
    if (!sortBy) return 0;

    const aValue = a[sortBy.id as keyof T];
    const bValue = b[sortBy.id as keyof T];

    if (aValue === bValue) return 0;

    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    const result = aValue < bValue ? -1 : 1;
    return sortBy.desc ? -result : result;
  });

  return (
    <div className="min-h-screen overflow-hidden bg-white px-4 py-10 dark:bg-gray-950">
      <div className={`w-full ${isDarkMode ? "dark" : ""} ${className}`}>
        <div className="mx-auto max-w-7xl overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 dark:bg-gray-900">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {title}
            </h2>
            <button
              onClick={toggleDarkMode}
              className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.id}
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300 ${
                        column.sortable !== false
                          ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                          : ""
                      }`}
                      onClick={() =>
                        column.sortable !== false && handleSort(column.id)
                      }
                    >
                      <div className="flex items-center">
                        <span>{column.header}</span>
                        {column.sortable !== false &&
                          sortBy?.id === column.id && (
                            <span className="ml-2">
                              {sortBy.desc ? (
                                <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              ) : (
                                <ChevronUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              )}
                            </span>
                          )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-900">
                {sortedData.map((row, rowIndex) => (
                  <motion.tr
                    key={rowIndex}
                    className="transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-800"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: rowIndex * 0.03 }}
                  >
                    {columns.map((column) => (
                      <td
                        key={`${rowIndex}-${column.id}`}
                        className="whitespace-nowrap px-6 py-4 text-sm text-gray-700 dark:text-gray-300"
                      >
                        {column.cell
                          ? column.cell({ row })
                          : row[column.accessorKey] !== null &&
                              row[column.accessorKey] !== undefined
                            ? String(row[column.accessorKey])
                            : "—"}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <style jsx>{`
        ::-webkit-scrollbar {
          height: 0.5rem;
          width: 0.5rem;
          background-color: transparent;
        }
        ::-webkit-scrollbar-thumb {
          border-radius: 1rem;
          background-color: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default SimpleDataTable;
