"use client";

import type React from "react";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, Filter, Search } from "lucide-react";

type FilterOption = {
  id: string;
  label: string;
};

type FilterCategory = {
  id: string;
  name: string;
  options: FilterOption[];
};

type HorizontalFilterBarProps = {
  categories: FilterCategory[];
  onFilterChange: (
    categoryId: string,
    optionId: string,
    checked: boolean,
  ) => void;
  selectedFilters: Record<string, string[]>;
  onClearAll: () => void;
  onSearch: (query: string) => void;
};

const HorizontalFilterBar = ({
  categories,
  onFilterChange,
  selectedFilters,
  onClearAll,
  onSearch,
}: HorizontalFilterBarProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        openDropdown &&
        dropdownRefs.current[openDropdown] &&
        !dropdownRefs.current[openDropdown]?.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    },
    [openDropdown],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside, openDropdown]);

  const toggleDropdown = (categoryId: string) => {
    setOpenDropdown((prev) => (prev === categoryId ? null : categoryId));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const getSelectedCount = (categoryId: string) => {
    return selectedFilters[categoryId]?.length || 0;
  };

  const getTotalSelectedCount = () => {
    return Object.values(selectedFilters).reduce(
      (count, options) => count + options.length,
      0,
    );
  };

  const getSelectedLabels = (categoryId: string) => {
    const selected = selectedFilters[categoryId] || [];
    const category = categories.find((c) => c.id === categoryId);

    if (!category) return [];

    return selected.map((id) => {
      const option = category.options.find((o) => o.id === id);
      return option?.label || "";
    });
  };

  return (
    <div className="w-full rounded-lg border border-gray-100 bg-white shadow-md">
      <div className="flex flex-wrap items-center gap-2 p-3">
        <form onSubmit={handleSearch} className="relative min-w-[200px] flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-md border border-gray-200 py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </form>

        <div className="flex flex-wrap items-center gap-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative"
              ref={(el) => {
                dropdownRefs.current[category.id] = el;
              }}
            >
              <button
                onClick={() => toggleDropdown(category.id)}
                className={`flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                  getSelectedCount(category.id) > 0
                    ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                    : "border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>{category.name}</span>
                {getSelectedCount(category.id) > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-800">
                    {getSelectedCount(category.id)}
                  </span>
                )}
                <motion.div
                  animate={{ rotate: openDropdown === category.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={16} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openDropdown === category.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute z-10 mt-1 w-56 overflow-hidden rounded-md border border-gray-100 bg-white shadow-lg"
                  >
                    <div className="max-h-60 overflow-y-auto p-2">
                      {category.options.map((option) => {
                        const isSelected =
                          selectedFilters[category.id]?.includes(option.id) ||
                          false;

                        return (
                          <div
                            key={option.id}
                            className="rounded-md px-2 py-1.5 hover:bg-gray-50"
                          >
                            <label className="flex w-full cursor-pointer items-center">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={(e) =>
                                  onFilterChange(
                                    category.id,
                                    option.id,
                                    e.target.checked,
                                  )
                                }
                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <span
                                className={`ml-2 text-sm ${isSelected ? "font-medium text-indigo-700" : "text-gray-700"}`}
                              >
                                {option.label}
                              </span>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {getTotalSelectedCount() > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClearAll}
              className="rounded-md px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
            >
              Clear all
            </motion.button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {getTotalSelectedCount() > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-gray-100"
          >
            <div className="flex flex-wrap items-center gap-2 bg-gray-50 p-3">
              <div className="mr-2 flex items-center gap-1.5 text-sm text-gray-500">
                <Filter size={14} />
                <span>Active filters:</span>
              </div>

              {categories.map((category) =>
                getSelectedLabels(category.id).map((label, index) => (
                  <motion.div
                    key={`${category.id}-${index}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2 py-1 text-xs"
                  >
                    <span className="text-gray-500">{category.name}:</span>
                    <span className="font-medium text-gray-800">{label}</span>
                    <button
                      onClick={() => {
                        const optionId = selectedFilters[category.id][index];
                        onFilterChange(category.id, optionId, false);
                      }}
                      className="ml-1 text-gray-400 hover:text-gray-600"
                    >
                      <X size={12} />
                    </button>
                  </motion.div>
                )),
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HorizontalFilterBar;
