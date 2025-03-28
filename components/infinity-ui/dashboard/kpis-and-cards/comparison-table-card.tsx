"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Minus,
  Search,
  Filter,
} from "lucide-react";
import { DashboardCard, CardTitle } from "./utils";
import Image from "next/image";

type ComparisonValue = {
  value: string | number | boolean;
  rating?: number; // 1-5 rating
  highlight?: boolean;
  note?: string;
};

type ComparisonItem = {
  id: string;
  name: string;
  description?: string;
  image?: string;
  features: Record<string, ComparisonValue>;
};

type ComparisonTableCardProps = {
  title: string;
  subtitle?: string;
  items: ComparisonItem[];
  features: {
    id: string;
    name: string;
    description?: string;
  }[];
};

export default function ComparisonTableCard({
  title,
  subtitle,
  items,
  features,
}: ComparisonTableCardProps) {
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, boolean>>(
    {},
  );

  // Handle sort
  const handleSort = (featureId: string) => {
    if (sortBy === featureId) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(featureId);
      setSortDirection("asc");
    }
  };

  // Format value for display
  const formatValue = (value: string | number | boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-green-500" />
      ) : (
        <X className="h-5 w-5 text-red-500" />
      );
    }

    if (value === null || value === undefined) {
      return <Minus className="h-5 w-5 text-slate-400" />;
    }

    return value.toString();
  };

  // Render rating stars
  const renderRating = (rating?: number) => {
    if (!rating) return null;

    return (
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`h-3 w-3 ${i < rating ? "text-amber-400" : "text-slate-300 dark:text-slate-600"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
    let result = [...items];

    // Apply search filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerSearch) ||
          item.description?.toLowerCase().includes(lowerSearch),
      );
    }

    // Apply feature filters
    const activeFilterKeys = Object.keys(activeFilters).filter(
      (key) => activeFilters[key],
    );
    if (activeFilterKeys.length > 0) {
      result = result.filter((item) => {
        return activeFilterKeys.every((featureId) => {
          const value = item.features[featureId]?.value;
          return typeof value === "boolean" ? value : !!value;
        });
      });
    }

    // Apply sorting
    if (sortBy) {
      result.sort((a, b) => {
        const aValue = a.features[sortBy]?.value;
        const bValue = b.features[sortBy]?.value;

        // Handle different value types
        if (typeof aValue === "boolean" && typeof bValue === "boolean") {
          return sortDirection === "asc"
            ? aValue === bValue
              ? 0
              : aValue
                ? -1
                : 1
            : aValue === bValue
              ? 0
              : aValue
                ? 1
                : -1;
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
        }

        // Default string comparison
        const aStr = aValue?.toString() || "";
        const bStr = bValue?.toString() || "";
        return sortDirection === "asc"
          ? aStr.localeCompare(bStr)
          : bStr.localeCompare(aStr);
      });
    }

    return result;
  }, [items, sortBy, sortDirection, searchTerm, activeFilters]);

  return (
    <DashboardCard>
      <CardTitle title={title} subtitle={subtitle} />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-8 rounded-md border border-input bg-background pl-8 pr-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:border-slate-700"
          />
        </div>

        <div className="relative">
          <button
            className="flex items-center gap-1 rounded-md border px-3 py-1 text-sm text-muted-foreground hover:text-foreground dark:border-slate-700"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {Object.values(activeFilters).some(Boolean) && (
              <span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground">
                {Object.values(activeFilters).filter(Boolean).length}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                className="absolute right-0 top-full z-10 mt-1 w-64 rounded-md border bg-background p-3 shadow-md dark:border-slate-700"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-2 text-sm font-medium">
                  Filter by features
                </div>

                <div className="space-y-2">
                  {features.map((feature) => (
                    <div key={feature.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`filter-${feature.id}`}
                        checked={!!activeFilters[feature.id]}
                        onChange={() => {
                          setActiveFilters((prev) => ({
                            ...prev,
                            [feature.id]: !prev[feature.id],
                          }));
                        }}
                        className="mr-2 h-3 w-3"
                      />
                      <label
                        htmlFor={`filter-${feature.id}`}
                        className="text-sm"
                      >
                        {feature.name}
                      </label>
                    </div>
                  ))}
                </div>

                {Object.values(activeFilters).some(Boolean) && (
                  <button
                    className="mt-3 w-full rounded-sm bg-slate-100 px-2 py-1 text-xs hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
                    onClick={() => setActiveFilters({})}
                  >
                    Clear all filters
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className="border-b dark:border-slate-700">
              <th className="p-2 text-left text-sm font-medium text-muted-foreground">
                Product
              </th>
              {features.map((feature) => (
                <th
                  key={feature.id}
                  className="p-2 text-left text-sm font-medium text-muted-foreground"
                >
                  <button
                    className="flex items-center gap-1 hover:text-foreground"
                    onClick={() => handleSort(feature.id)}
                  >
                    <span>{feature.name}</span>
                    {sortBy === feature.id &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="h-3 w-3" />
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      ))}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedItems.length > 0 ? (
              filteredAndSortedItems.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-b transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50 ${
                    index % 2 === 0 ? "bg-slate-50/50 dark:bg-slate-900/20" : ""
                  }`}
                >
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      {item.image && (
                        <div className="relative h-8 w-8 overflow-hidden rounded-md">
                          <Image
                            src={
                              item.image ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                            }
                            fill
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <div className="font-medium">{item.name}</div>
                        {item.description && (
                          <div className="text-xs text-muted-foreground">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {features.map((feature) => {
                    const featureValue = item.features[feature.id];

                    return (
                      <td
                        key={`${item.id}-${feature.id}`}
                        className={`p-2 ${featureValue?.highlight ? "bg-primary/10" : ""}`}
                      >
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            {formatValue(featureValue?.value)}
                            {renderRating(featureValue?.rating)}
                          </div>

                          {featureValue?.note && (
                            <div className="mt-1 text-xs text-muted-foreground">
                              {featureValue.note}
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={features.length + 1}
                  className="p-4 text-center text-sm text-muted-foreground"
                >
                  No items match your search or filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
}
