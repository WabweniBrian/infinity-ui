"use client";

import type React from "react";

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
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Grid,
  List,
  Sun,
  Moon,
} from "lucide-react";
import { Column, productColumns, products as data } from "@/data/datatable";

interface CardBasedDataGridProps<T> {
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

const CardBasedDataGrid = <T extends Record<string, any>>({
  title = "Data Grid",
  subtitle,
  pagination = true,
  itemsPerPageOptions = [8, 16, 24, 32],
  defaultItemsPerPage = 8,
  search = true,
  filters = true,
  columnVisibility = true,
  exportOptions = true,
  className = "",
}: CardBasedDataGridProps<T>) => {
  // State
  const [columns, setColumns] = useState<Column<T>[]>(productColumns);
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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
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
        <div className="mx-auto max-w-7xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-colors duration-200 dark:border-gray-800 dark:bg-gray-900">
          {/* Header */}
          <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white p-5 dark:border-gray-800 dark:from-gray-900 dark:to-gray-800">
            <div className="mb-4 flex flex-col items-start justify-between sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  {title}
                </h2>
                {subtitle && (
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {subtitle}
                  </p>
                )}
              </div>

              <div className="mt-3 flex items-center sm:mt-0">
                {/* View mode toggle */}
                <div className="mr-2 flex items-center rounded-lg border border-gray-200 bg-gray-100 p-1.5 dark:border-gray-700 dark:bg-gray-800">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode("grid")}
                    className={`rounded p-1 ${
                      viewMode === "grid"
                        ? "bg-white text-gray-800 shadow-sm dark:bg-gray-700 dark:text-white"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode("list")}
                    className={`rounded p-1 ${
                      viewMode === "list"
                        ? "bg-white text-gray-800 shadow-sm dark:bg-gray-700 dark:text-white"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                    aria-label="List view"
                  >
                    <List className="h-4 w-4" />
                  </motion.button>
                </div>

                {/* Dark mode toggle */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleDarkMode}
                  className="rounded-lg border border-gray-200 bg-gray-100 p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </motion.button>

                {/* Export button */}
                {exportOptions && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={exportAsCSV}
                    className="ml-2 flex items-center rounded-lg border border-gray-200 bg-gray-100 p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    aria-label="Export as CSV"
                  >
                    <Download className="h-5 w-5" />
                  </motion.button>
                )}

                {/* Column visibility */}
                {columnVisibility && (
                  <div className="relative ml-2" ref={dropdownRef}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsColumnMenuOpen(!isColumnMenuOpen)}
                      className="flex items-center rounded-lg border border-gray-200 bg-gray-100 p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                      aria-label="Column visibility"
                    >
                      <Settings className="h-5 w-5" />
                    </motion.button>

                    <AnimatePresence>
                      {isColumnMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute left-0 z-10 mt-2 w-56 rounded-md border border-gray-200 bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:border-gray-700 dark:bg-gray-800 sm:left-auto sm:right-0"
                        >
                          <div className="p-2">
                            <div className="border-b border-gray-200 px-3 py-2 dark:border-gray-700">
                              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Toggle Columns
                              </h3>
                            </div>
                            <div className="max-h-60 overflow-y-auto py-1">
                              {columns.map((column) => (
                                <div
                                  key={column.id}
                                  className="flex cursor-pointer items-center justify-between px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
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
                  <div className="relative ml-2" ref={dropdownRef}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                      className={`rounded-lg p-2 ${
                        Object.keys(activeFilters).length > 0
                          ? "border border-blue-200 bg-blue-100 text-blue-600 dark:border-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
                          : "border border-gray-200 bg-gray-100 text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      } flex items-center transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700`}
                      aria-label="Filter data"
                    >
                      <Filter className="h-5 w-5" />
                      {Object.keys(activeFilters).length > 0 && (
                        <span className="ml-1 text-xs font-medium">
                          {Object.keys(activeFilters).length}
                        </span>
                      )}
                    </motion.button>

                    <AnimatePresence>
                      {isFilterMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute left-0 z-10 mt-2 w-64 rounded-md border border-gray-200 bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:border-gray-700 dark:bg-gray-800 sm:left-auto sm:right-0"
                        >
                          <div className="p-2">
                            <div className="flex items-center justify-between border-b border-gray-200 px-3 py-2 dark:border-gray-700">
                              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Filters
                              </h3>
                              <button
                                onClick={resetFilters}
                                className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
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
                                      className="w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
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
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 text-gray-700 placeholder-gray-400 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 sm:text-sm"
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

          {/* Sort controls for grid view */}
          {viewMode === "grid" && (
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-800 dark:bg-gray-800">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {filteredData.length}{" "}
                {filteredData.length === 1 ? "item" : "items"}
              </div>

              <div className="flex items-center">
                <span className="mr-2 text-sm text-gray-500 dark:text-gray-400">
                  Sort by:
                </span>
                <select
                  value={sortBy?.id || ""}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setSortBy(null);
                    } else {
                      handleSort(e.target.value);
                    }
                  }}
                  className="rounded-md border border-gray-300 bg-white py-1 pl-2 pr-8 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
                >
                  <option value="">Default</option>
                  {columns
                    .filter((col) => col.sortable !== false)
                    .map((column) => (
                      <option key={column.id} value={column.id}>
                        {column.header}
                      </option>
                    ))}
                </select>

                {sortBy && (
                  <button
                    onClick={() =>
                      setSortBy((prev) =>
                        prev ? { ...prev, desc: !prev.desc } : null,
                      )
                    }
                    className="ml-2 rounded-md border border-gray-200 bg-gray-100 p-1 text-gray-600 hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    {sortBy.desc ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronUp className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Data Grid */}
          <div className="bg-gray-50 p-4 dark:bg-gray-800">
            {paginatedData.length > 0 ? (
              viewMode === "grid" ? (
                // Grid View
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {paginatedData.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="transform overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
                    >
                      <div className="p-4">
                        {visibleColumns.map((column, colIndex) => (
                          <div
                            key={column.id}
                            className={`${colIndex > 0 ? "mt-3" : ""}`}
                          >
                            <div className="mb-1 text-xs font-medium text-gray-600 dark:text-gray-400">
                              {column.header}
                            </div>
                            <div className="text-sm text-gray-800 dark:text-gray-200">
                              {column.cell
                                ? column.cell({ row: item })
                                : item[column.accessorKey] !== null &&
                                    item[column.accessorKey] !== undefined
                                  ? String(item[column.accessorKey])
                                  : "—"}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                // List View
                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                      <tr>
                        {visibleColumns.map((column) => (
                          <th
                            key={column.id}
                            scope="col"
                            className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 ${
                              column.sortable !== false
                                ? "cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
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
                                      <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                                    ) : (
                                      <ChevronUp className="h-4 w-4 text-gray-400 dark:text-gray-500" />
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
                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-900">
                      {paginatedData.map((row, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className="transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-800"
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            ) : (
              <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
                No data available
              </div>
            )}
          </div>

          {/* Pagination */}
          {pagination && (
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900 sm:px-6">
              <div className="flex flex-1 justify-between sm:hidden">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Previous
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Next
                </motion.button>
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
                      className="block w-full rounded-md border-gray-300 bg-white py-2 pl-3 pr-10 text-base text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:text-sm"
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
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
                    >
                      <span className="sr-only">First page</span>
                      <ChevronLeft className="h-5 w-5" />
                      <ChevronLeft className="-ml-2 h-5 w-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft className="h-5 w-5" />
                    </motion.button>

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
                          <motion.button
                            key={pageNumber}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`relative inline-flex items-center border px-4 py-2 text-sm font-medium ${
                              currentPage === pageNumber
                                ? "z-10 border-blue-500 bg-blue-50 text-blue-600 dark:border-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                            }`}
                          >
                            {pageNumber}
                          </motion.button>
                        );
                      },
                    )}

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
                    >
                      <span className="sr-only">Last page</span>
                      <ChevronRight className="h-5 w-5" />
                      <ChevronRight className="-ml-2 h-5 w-5" />
                    </motion.button>
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

export default CardBasedDataGrid;
