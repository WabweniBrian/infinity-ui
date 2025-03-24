"use client";

import { Column, data, initialColumns } from "@/data/datatable";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpDown,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Download,
  PanelLeft,
  PanelLeftClose,
  Search,
  Settings,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

interface SidebarFilteredTableProps<T> {
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

const SidebarFilteredTable = <T extends Record<string, any>>({
  title = "Sidebar Filtered Table",
  subtitle,
  pagination = true,
  itemsPerPageOptions = [10, 25, 50, 100],
  defaultItemsPerPage = 10,
  search = true,
  filters = true,
  columnVisibility = true,
  exportOptions = true,
  className = "",
}: SidebarFilteredTableProps<T>) => {
  // State
  const [columns, setColumns] = useState<Column<T>[]>(initialColumns);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<{ id: string; desc: boolean } | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
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

  // Filter sidebar animation variants
  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "-100%", opacity: 0 },
  };

  return (
    <div className="min-h-screen overflow-hidden bg-white px-4 py-10 dark:bg-gray-950">
      <div className={`w-full ${isDarkMode ? "dark" : ""} ${className}`}>
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-xl bg-white shadow-xl transition-all duration-300 dark:bg-gray-900">
          {/* Header */}
          <div className="border-b border-gray-200 bg-gradient-to-r from-white to-gray-50 p-6 dark:border-gray-800 dark:from-gray-900 dark:to-gray-800">
            <div className="mb-6 flex flex-col items-start justify-between sm:flex-row sm:items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
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
                  className="rounded-lg bg-gray-100 p-2 text-gray-600 shadow-sm transition-colors duration-200 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
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
                    className="flex items-center rounded-lg bg-gray-100 p-2 text-gray-600 shadow-sm transition-colors duration-200 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
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
                      className="flex items-center rounded-lg bg-gray-100 p-2 text-gray-600 shadow-sm transition-colors duration-200 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
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
                          className="absolute left-0 z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800 sm:left-auto sm:right-0"
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
                                  className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
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
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
                    className={`rounded-lg p-2 ${
                      Object.keys(activeFilters).length > 0
                        ? "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-300"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                    } flex items-center shadow-sm transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700`}
                    aria-label="Filter data"
                  >
                    {isFilterSidebarOpen ? (
                      <PanelLeftClose className="h-5 w-5" />
                    ) : (
                      <>
                        <PanelLeft className="h-5 w-5" />
                        {Object.keys(activeFilters).length > 0 && (
                          <span className="ml-1 text-xs font-medium">
                            {Object.keys(activeFilters).length}
                          </span>
                        )}
                      </>
                    )}
                  </motion.button>
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
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 text-gray-700 placeholder-gray-400 transition-colors duration-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 sm:text-sm"
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

          <div className="flex">
            {/* Filter Sidebar */}
            {filters && (
              <AnimatePresence>
                {isFilterSidebarOpen && (
                  <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={sidebarVariants}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-64 overflow-y-auto border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
                  >
                    <div className="sticky top-0 z-10 border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Filters
                        </h3>
                        <button
                          onClick={resetFilters}
                          className="text-xs text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
                        >
                          Reset all
                        </button>
                      </div>
                    </div>
                    <div className="space-y-4 p-4">
                      {columns
                        .filter((col) => col.filterable !== false)
                        .map((column) => (
                          <div key={column.id} className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {column.header}
                            </label>
                            <input
                              type="text"
                              value={activeFilters[column.id as string] || ""}
                              onChange={(e) =>
                                setActiveFilters((prev) => ({
                                  ...prev,
                                  [column.id]: e.target.value,
                                }))
                              }
                              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
                              placeholder={`Filter by ${column.header.toLowerCase()}`}
                            />
                          </div>
                        ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* Table */}
            <div className="flex-1 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    {visibleColumns.map((column) => (
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
                          {column.sortable !== false && (
                            <span className="ml-2">
                              {sortBy?.id === column.id ? (
                                sortBy.desc ? (
                                  <ChevronDown className="h-4 w-4 text-teal-500 dark:text-teal-400" />
                                ) : (
                                  <ChevronUp className="h-4 w-4 text-teal-500 dark:text-teal-400" />
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
                  {paginatedData.length > 0 ? (
                    paginatedData.map((row, rowIndex) => (
                      <motion.tr
                        key={rowIndex}
                        className="transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-800"
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
          </div>

          {/* Pagination */}
          {pagination && (
            <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-800 sm:px-6">
              <div className="flex flex-1 justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
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
                      className="block w-full rounded-md border-gray-300 bg-white py-2 pl-3 pr-10 text-base text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-teal-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:text-sm"
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
                      className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
                    >
                      <span className="sr-only">First page</span>
                      <ChevronLeft className="h-5 w-5" />
                      <ChevronLeft className="-ml-2 h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft className="h-5 w-5" />
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
                                ? "z-10 border-teal-500 bg-teal-50 text-teal-600 dark:border-teal-700 dark:bg-teal-900/30 dark:text-teal-300"
                                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      },
                    )}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
                    >
                      <span className="sr-only">Last page</span>
                      <ChevronRight className="h-5 w-5" />
                      <ChevronRight className="-ml-2 h-5 w-5" />
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

export default SidebarFilteredTable;
