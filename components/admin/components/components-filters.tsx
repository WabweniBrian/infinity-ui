"use client";

import SearchInput from "@/components/common/search-input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Eye, EyeOff, Filter, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

interface Category {
  name: string;
  id: string;
  slug: string;
}

interface ComponentsFiltersProps {
  categories: Category[];
}

export function ComponentsFilters({ categories }: ComponentsFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Get current filter values from URL
  const category = searchParams.get("category") || "";
  const isFree = searchParams.get("isFree") === "true";
  const isFeatured = searchParams.get("isFeatured") === "true";
  const isNew = searchParams.get("isNew") === "true";
  const isAI = searchParams.get("isAI") === "true";
  const show = searchParams.get("show");
  const minPrice = searchParams.get("minPrice") || "0";
  const maxPrice = searchParams.get("maxPrice") || "500";

  // Local state for form values
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number.parseInt(minPrice),
    Number.parseInt(maxPrice),
  ]);

  // Update URL with filters
  const updateFilters = useCallback(
    (updates: Record<string, string | boolean | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");

      // Apply updates
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else if (typeof value === "boolean") {
          params.set(key, value.toString());
        } else {
          params.set(key, value);
        }
      });

      // Reset to page 1 when filters change
      if (params.has("page")) {
        params.set("page", "1");
      }

      // Navigate to new URL
      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  // Handle price range change
  const handlePriceChange = useCallback(
    (values: number[]) => {
      setPriceRange([values[0], values[1]]);

      // Update URL after a short delay to avoid too many updates while dragging
      const timer = setTimeout(() => {
        updateFilters({
          minPrice: values[0].toString(),
          maxPrice: values[1].toString(),
        });
      }, 300);

      return () => clearTimeout(timer);
    },
    [updateFilters],
  );

  // Toggle a boolean filter
  const toggleFilter = useCallback(
    (key: string, value: boolean) => {
      updateFilters({ [key]: !value ? true : null });
    },
    [updateFilters],
  );

  // Toggle visibility filter
  const toggleVisibility = useCallback(() => {
    if (show === "true") {
      updateFilters({ show: null }); // Remove filter
    } else if (show === "false") {
      updateFilters({ show: "true" }); // Show only visible
    } else {
      updateFilters({ show: "false" }); // Show only hidden
    }
  }, [show, updateFilters]);

  // Reset all filters
  const clearFilters = useCallback(() => {
    router.push("");
    setPriceRange([0, 500]);
  }, [router]);

  // Count active filters
  const activeFilterCount = [
    category,
    isFree ? "true" : "",
    isFeatured ? "true" : "",
    isNew ? "true" : "",
    isAI ? "true" : "",
    show,
    minPrice !== "0" ? minPrice : "",
    maxPrice !== "500" ? maxPrice : "",
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <SearchInput
          placeholder="Search components by name or description..."
          className="sm:w-full"
        />

        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFilterCount}
            </Badge>
          )}
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isFiltersOpen ? "rotate-180" : ""}`}
          />
        </Button>
      </div>

      <AnimatePresence>
        {isFiltersOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
              {/* Categories */}
              <div className="pl-4">
                <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                  Categories
                </h3>
                <div className="max-h-48 space-y-2 overflow-y-auto pr-2">
                  <div className="mb-2 flex items-center space-x-2">
                    <Checkbox
                      id="all-categories"
                      checked={!category}
                      onCheckedChange={() => updateFilters({ category: null })}
                    />
                    <Label htmlFor="all-categories" className="text-sm">
                      All Categories
                    </Label>
                  </div>

                  {categories.map((cat) => (
                    <div key={cat.slug} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${cat.slug}`}
                        checked={category === cat.slug}
                        onCheckedChange={() =>
                          updateFilters({
                            category: category === cat.slug ? null : cat.slug,
                          })
                        }
                      />
                      <Label
                        htmlFor={`category-${cat.slug}`}
                        className="text-sm"
                      >
                        {cat.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                  Features
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="free"
                      checked={isFree}
                      onCheckedChange={() => toggleFilter("isFree", isFree)}
                    />
                    <Label htmlFor="free" className="text-sm">
                      Free
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={isFeatured}
                      onCheckedChange={() =>
                        toggleFilter("isFeatured", isFeatured)
                      }
                    />
                    <Label htmlFor="featured" className="text-sm">
                      Featured
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="new"
                      checked={isNew}
                      onCheckedChange={() => toggleFilter("isNew", isNew)}
                    />
                    <Label htmlFor="new" className="text-sm">
                      New
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="ai"
                      checked={isAI}
                      onCheckedChange={() => toggleFilter("isAI", isAI)}
                    />
                    <Label htmlFor="ai" className="text-sm">
                      AI-Powered
                    </Label>
                  </div>

                  <div className="mt-2 flex items-center space-x-2 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleVisibility}
                      className={show ? "bg-primary/10" : ""}
                    >
                      {show === "true" ? (
                        <>
                          <Eye className="mr-1 h-4 w-4" />
                          Visible Only
                        </>
                      ) : show === "false" ? (
                        <>
                          <EyeOff className="mr-1 h-4 w-4" />
                          Hidden Only
                        </>
                      ) : (
                        <>
                          <Eye className="mr-1 h-4 w-4" />
                          All Visibility
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                  Price Range
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ${priceRange[0].toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ${priceRange[1].toFixed(2)}
                    </span>
                  </div>

                  <Slider
                    defaultValue={priceRange}
                    min={0}
                    max={500}
                    step={10}
                    value={priceRange}
                    onValueChange={(values) =>
                      setPriceRange([values[0], values[1]])
                    }
                    onValueCommit={(values) => handlePriceChange(values)}
                    className="py-4"
                  />

                  <div className="flex gap-2">
                    <Input
                      type="number"
                      min={0}
                      max={priceRange[1]}
                      value={priceRange[0]}
                      onChange={(e) => {
                        const value = Number.parseInt(e.target.value);
                        if (!isNaN(value)) {
                          const newRange: [number, number] = [
                            value,
                            priceRange[1],
                          ];
                          setPriceRange(newRange);
                          handlePriceChange(newRange);
                        }
                      }}
                      className="w-full text-sm"
                      placeholder="Min"
                    />
                    <Input
                      type="number"
                      min={priceRange[0]}
                      max={500}
                      value={priceRange[1]}
                      onChange={(e) => {
                        const value = Number.parseInt(e.target.value);
                        if (!isNaN(value)) {
                          const newRange: [number, number] = [
                            priceRange[0],
                            value,
                          ];
                          setPriceRange(newRange);
                          handlePriceChange(newRange);
                        }
                      }}
                      className="w-full text-sm"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/30">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="flex items-center gap-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X className="h-4 w-4" />
                Clear All Filters
              </Button>

              <Button
                variant="default"
                size="sm"
                onClick={() => setIsFiltersOpen(false)}
              >
                Close Filters
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Active Filters:
          </span>

          {category && (
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-primary/10"
            >
              Category:{" "}
              {categories.find((c) => c.slug === category)?.name || category}
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => updateFilters({ category: null })}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove category filter</span>
              </Button>
            </Badge>
          )}

          {isFree && (
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-primary/10"
            >
              Free
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => toggleFilter("isFree", isFree)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove free filter</span>
              </Button>
            </Badge>
          )}

          {isFeatured && (
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-primary/10"
            >
              Featured
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => toggleFilter("isFeatured", isFeatured)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove featured filter</span>
              </Button>
            </Badge>
          )}

          {isNew && (
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-primary/10"
            >
              New
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => toggleFilter("isNew", isNew)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove new filter</span>
              </Button>
            </Badge>
          )}

          {isAI && (
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-primary/10"
            >
              AI-Powered
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => toggleFilter("isAI", isAI)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove AI filter</span>
              </Button>
            </Badge>
          )}

          {show && (
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-primary/10"
            >
              {show === "true" ? "Visible Only" : "Hidden Only"}
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => updateFilters({ show: null })}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove visibility filter</span>
              </Button>
            </Badge>
          )}

          {(minPrice !== "0" || maxPrice !== "500") && (
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-primary/10"
            >
              Price: ${Number.parseInt(minPrice).toFixed(2)} - $
              {Number.parseInt(maxPrice).toFixed(2)}
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => {
                  setPriceRange([0, 500]);
                  updateFilters({ minPrice: null, maxPrice: null });
                }}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove price filter</span>
              </Button>
            </Badge>
          )}

          {activeFilterCount > 1 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-sm text-primary hover:text-primary/80"
              onClick={clearFilters}
            >
              Clear All
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
