"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  Settings,
  X,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { Column, data, initialColumns } from "@/data/datatable";

interface GlassmorphicDataTableProps<T> {
  title?: string;
  subtitle?: string;
  pagination?: boolean;
  itemsPerPageOptions?: number[];
  defaultItemsPerPage?: number;
  search?: boolean;
  filters?: boolean;
  columnVisibility?: boolean;
  exportOptions?: boolean;
  className?: string;
}

const GlassmorphicDataTable = <T extends Record<string, any>>({
  title = "Glassmorphic Data Table",
  subtitle,
  pagination = true,
  itemsPerPageOptions = [10, 25, 50, 100],
  defaultItemsPerPage = 10,
  search = true,
  filters = true,
  columnVisibility = true,
  exportOptions = true,
  className = "",
}: GlassmorphicDataTableProps<T>) => {
  // State
  const [columns, setColumns] = useState<Column<T>[]>(initialColumns);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<{ id: string; desc: boolean } | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsFilterMenuOpen(false);
        setIsColumnMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  // Toggle column visibility
  const toggleColumnVisibility = (columnId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              visible: col.visible === undefined ? false : !col.visible,
            }
          : col,
      ),
    );
  };

  // Filter data based on search query and active filters
  const filteredData = useMemo(() => {
    let filtered = [...data];

    // Apply search
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((item) => {
        return columns.some((column) => {
          const value = item[column.accessorKey];
          return (
            value !== null &&
            value !== undefined &&
            String(value).toLowerCase().includes(lowerCaseQuery)
          );
        });
      });
    }

    // Apply filters
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        filtered = filtered.filter((item) => {
          const itemValue = item[key as keyof T];
          if (typeof value === "string") {
            return String(itemValue)
              .toLowerCase()
              .includes(value.toLowerCase());
          }
          return itemValue === value;
        });
      }
    });

    // Apply sorting
    if (sortBy) {
      filtered.sort((a, b) => {
        const aValue = a[sortBy.id as keyof T];
        const bValue = b[sortBy.id as keyof T];

        if (aValue === bValue) return 0;

        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        const result = aValue < bValue ? -1 : 1;
        return sortBy.desc ? -result : result;
      });
    }

    return filtered;
  }, [columns, searchQuery, activeFilters, sortBy]);

  // Pagination
  const paginatedData = useMemo(() => {
    if (!pagination) return filteredData;

    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, pagination, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    if (!pagination) return 1;
    return Math.ceil(filteredData.length / itemsPerPage);
  }, [filteredData.length, itemsPerPage, pagination]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
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

  // Export data as CSV
  const exportAsCSV = () => {
    const visibleColumns = columns.filter((col) => col.visible !== false);

    // Create header row
    const headers = visibleColumns.map((col) => col.header);

    // Create data rows
    const rows = filteredData.map((item) =>
      visibleColumns.map((col) => {
        const value = item[col.accessorKey];
        return value !== null && value !== undefined ? String(value) : "";
      }),
    );

    // Combine headers and rows
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `${title.toLowerCase().replace(/\s+/g, "-")}-export.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setActiveFilters({});
    setSortBy(null);
    setCurrentPage(1);
  };

  // Visible columns
  const visibleColumns = useMemo(() => {
    return columns.filter((col) => col.visible !== false);
  }, [columns]);

  return (
    <div className="min-h-screen overflow-hidden bg-white px-4 py-10 dark:bg-gray-950">
      <div className={`w-full ${isDarkMode ? "dark" : ""} ${className}`}>
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl border border-gray-200/50 bg-white/70 shadow-xl backdrop-blur-lg dark:border-gray-700/50 dark:bg-gray-900/70">
          {/* Decorative elements */}
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-tr from-pink-500/30 to-yellow-500/30 blur-3xl"></div>

          {/* Header */}
          <div className="relative border-b border-gray-200/50 bg-white/50 p-6 backdrop-blur-md dark:border-gray-700/50 dark:bg-gray-900/50">
            <div className="mb-6 flex flex-col items-start justify-between sm:flex-row sm:items-center">
              <div>
                <h2 className="flex items-center text-2xl font-bold text-gray-800 dark:text-white">
                  <Sparkles className="mr-2 h-5 w-5 text-purple-500 dark:text-purple-400" />
                  {title}
                </h2>
                {subtitle && (
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {subtitle}
                  </p>
                )}
              </div>

              <div className="mt-3 flex items-center space-x-2 sm:mt-0">
                {/* Dark mode toggle */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleDarkMode}
                  className="rounded-full bg-white/80 p-2 text-gray-600 shadow-sm backdrop-blur-sm transition-colors duration-200 hover:bg-white dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-700"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  )}
                </motion.button>

                {/* Export button */}
                {exportOptions && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={exportAsCSV}
                    className="flex items-center rounded-full bg-white/80 p-2 text-gray-600 shadow-sm backdrop-blur-sm transition-colors duration-200 hover:bg-white dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-700"
                    aria-label="Export as CSV"
                  >
                    <Download className="h-5 w-5" />
                  </motion.button>
                )}

                {/* Column visibility */}
                {columnVisibility && (
                  <div className="relative" ref={dropdownRef}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsColumnMenuOpen(!isColumnMenuOpen)}
                      className="flex items-center rounded-full bg-white/80 p-2 text-gray-600 shadow-sm backdrop-blur-sm transition-colors duration-200 hover:bg-white dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-700"
                      aria-label="Column visibility"
                    >
                      <Settings className="h-5 w-5" />
                    </motion.button>

                    <AnimatePresence>
                      {isColumnMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          className="absolute left-0 z-10 mt-2 w-56 rounded-xl bg-white/90 shadow-lg ring-1 ring-black/5 backdrop-blur-md dark:bg-gray-800/90 dark:ring-white/10 sm:left-auto sm:right-0"
                        >
                          <div className="p-2">
                            <div className="border-b border-gray-200/50 px-3 py-2 dark:border-gray-700/50">
                              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Toggle Columns
                              </h3>
                            </div>
                            <div className="max-h-60 overflow-y-auto py-1">
                              {columns.map((column) => (
                                <div
                                  key={column.id}
                                  className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2 hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                                  onClick={() =>
                                    toggleColumnVisibility(column.id)
                                  }
                                >
                                  <span className="text-sm text-gray-700 dark:text-gray-300">
                                    {column.header}
                                  </span>
                                  {column.visible !== false ? (
                                    <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                                  ) : (
                                    <X className="h-4 w-4 text-red-500 dark:text-red-400" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Filter button */}
                {filters && (
                  <div className="relative" ref={dropdownRef}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                      className={`rounded-full p-2 ${
                        Object.keys(activeFilters).length > 0
                          ? "bg-purple-100/80 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300"
                          : "bg-white/80 text-gray-600 dark:bg-gray-800/80 dark:text-gray-300"
                      } flex items-center shadow-sm backdrop-blur-sm transition-colors duration-200 hover:bg-white dark:hover:bg-gray-700`}
                      aria-label="Filter data"
                    >
                      <SlidersHorizontal className="h-5 w-5" />
                      {Object.keys(activeFilters).length > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-500 text-[10px] font-medium text-white">
                          {Object.keys(activeFilters).length}
                        </span>
                      )}
                    </motion.button>

                    <AnimatePresence>
                      {isFilterMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          className="absolute left-0 z-10 mt-2 w-64 rounded-xl bg-white/90 shadow-lg ring-1 ring-black/5 backdrop-blur-md dark:bg-gray-800/90 dark:ring-white/10 sm:left-auto sm:right-0"
                        >
                          <div className="p-2">
                            <div className="flex items-center justify-between border-b border-gray-200/50 px-3 py-2 dark:border-gray-700/50">
                              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Filters
                              </h3>
                              <button
                                onClick={resetFilters}
                                className="text-xs text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                              >
                                Reset all
                              </button>
                            </div>
                            <div className="max-h-60 overflow-y-auto py-1">
                              {columns
                                .filter((col) => col.filterable !== false)
                                .map((column) => (
                                  <div key={column.id} className="px-3 py-2">
                                    <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                                      {column.header}
                                    </label>
                                    <input
                                      type="text"
                                      value={
                                        activeFilters[column.id as string] || ""
                                      }
                                      onChange={(e) =>
                                        setActiveFilters((prev) => ({
                                          ...prev,
                                          [column.id]: e.target.value,
                                        }))
                                      }
                                      className="w-full rounded-md border border-gray-300/50 bg-white/80 px-2 py-1 text-sm text-gray-700 backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-600/50 dark:bg-gray-900/80 dark:text-gray-300"
                                      placeholder={`Filter by ${column.header.toLowerCase()}`}
                                    />
                                  </div>
                                ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>

            {/* Search */}
            {search && (
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300/50 bg-white/80 py-2 pl-10 pr-3 leading-5 text-gray-700 placeholder-gray-400 backdrop-blur-sm transition-colors duration-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-700/50 dark:bg-gray-900/80 dark:text-gray-300 dark:placeholder-gray-500 sm:text-sm"
                  placeholder="Search..."
                />
                {searchQuery && (
                  <button
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white/90 dark:bg-gray-900/30">
            <table className="min-w-full divide-y divide-gray-200/50 dark:divide-gray-800/50">
              <thead className="bg-gray-50/80 dark:bg-gray-800/80">
                <tr>
                  {visibleColumns.map((column) => (
                    <th
                      key={column.id}
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300 ${
                        column.sortable !== false
                          ? "cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                          : ""
                      }`}
                      onClick={() =>
                        column.sortable !== false && handleSort(column.id)
                      }
                    >
                      <div className="flex items-center">
                        <span>{column.header}</span>
                        {column.sortable !== false && (
                          <span className="ml-2">
                            {sortBy?.id === column.id ? (
                              sortBy.desc ? (
                                <ChevronDown className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                              ) : (
                                <ChevronUp className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                              )
                            ) : (
                              <ArrowUpDown className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 dark:text-gray-500" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/50 bg-white/50 dark:divide-gray-800/50 dark:bg-gray-900/50">
                {paginatedData.length > 0 ? (
                  paginatedData.map((row, rowIndex) => (
                    <motion.tr
                      key={rowIndex}
                      className="transition-colors duration-150 hover:bg-gray-50/80 dark:hover:bg-gray-800/80"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: rowIndex * 0.03 }}
                    >
                      {visibleColumns.map((column) => (
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
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={visibleColumns.length}
                      className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && (
            <div className="flex items-center justify-between border-t border-gray-200/50 bg-gray-50/80 px-4 py-3 backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-800/80 sm:px-6">
              <div className="flex flex-1 justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-md border border-gray-300/50 bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700/50 dark:bg-gray-900/80 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300/50 bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700/50 dark:bg-gray-900/80 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Showing{" "}
                    <span className="font-medium">
                      {filteredData.length > 0
                        ? (currentPage - 1) * itemsPerPage + 1
                        : 0}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(
                        currentPage * itemsPerPage,
                        filteredData.length,
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">{filteredData.length}</span>{" "}
                    results
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="mr-4">
                    <label htmlFor="itemsPerPage" className="sr-only">
                      Items per page
                    </label>
                    <select
                      id="itemsPerPage"
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="block w-full rounded-md border-gray-300/50 bg-white/80 py-2 pl-3 pr-10 text-base text-gray-700 backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 dark:border-gray-700/50 dark:bg-gray-900/80 dark:text-gray-300 sm:text-sm"
                    >
                      {itemsPerPageOptions.map((option) => (
                        <option key={option} value={option}>
                          {option} per page
                        </option>
                      ))}
                    </select>
                  </div>
                  <nav
                    className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center rounded-l-md border border-gray-300/50 bg-white/80 px-2 py-2 text-sm font-medium text-gray-500 backdrop-blur-sm hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700/50 dark:bg-gray-900/80 dark:text-gray-400 dark:hover:bg-gray-800"
                    >
                      <span className="sr-only">First page</span>
                      <ChevronDown className="h-5 w-5 rotate-90" />
                    </button>
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center border border-gray-300/50 bg-white/80 px-2 py-2 text-sm font-medium text-gray-500 backdrop-blur-sm hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700/50 dark:bg-gray-900/80 dark:text-gray-400 dark:hover:bg-gray-800"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronDown className="h-5 w-5 rotate-90" />
                    </button>

                    {/* Page numbers */}
                    {Array.from({ length: Math.min(5, totalPages) }).map(
                      (_, i) => {
                        let pageNumber: number;

                        if (totalPages <= 5) {
                          pageNumber = i + 1;
                        } else if (currentPage <= 3) {
                          pageNumber = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNumber = totalPages - 4 + i;
                        } else {
                          pageNumber = currentPage - 2 + i;
                        }

                        return (
                          <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`relative inline-flex items-center border px-4 py-2 text-sm font-medium ${
                              currentPage === pageNumber
                                ? "z-10 border-purple-500/50 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-purple-600 dark:border-cyan-600/50 dark:text-cyan-300"
                                : "border-gray-300/50 bg-white/80 text-gray-700 hover:bg-gray-50/80 dark:border-gray-700/50 dark:bg-gray-900/80 dark:text-gray-300 dark:hover:bg-gray-800/80"
                            } backdrop-blur-sm`}
                          >
                            {pageNumber}
                          </button>
                        );
                      },
                    )}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center border border-gray-300/50 bg-white/80 px-2 py-2 text-sm font-medium text-gray-500 backdrop-blur-sm hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700/50 dark:bg-gray-900/80 dark:text-gray-400 dark:hover:bg-gray-800"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronDown className="h-5 w-5 -rotate-90" />
                    </button>
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center rounded-r-md border border-gray-300/50 bg-white/80 px-2 py-2 text-sm font-medium text-gray-500 backdrop-blur-sm hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700/50 dark:bg-gray-900/80 dark:text-gray-400 dark:hover:bg-gray-800"
                    >
                      <span className="sr-only">Last page</span>
                      <ChevronDown className="h-5 w-5 -rotate-90" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
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

export default GlassmorphicDataTable;
