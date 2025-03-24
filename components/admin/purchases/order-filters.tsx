"use client";

import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarIcon, ChevronDown, Filter, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import type { DateRange } from "react-day-picker";

import SearchInput from "@/components/common/search-input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";

export function OrdersFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Get current filter values from URL
  const status = searchParams.get("status") || "";
  const type = searchParams.get("type") || "";
  const minPrice = searchParams.get("minPrice") || "0";
  const maxPrice = searchParams.get("maxPrice") || "500";
  const dateFrom = searchParams.get("dateFrom") || "";
  const dateTo = searchParams.get("dateTo") || "";

  // Local state for date picker and price range
  const [date, setDate] = useState<DateRange | undefined>(
    dateFrom || dateTo
      ? {
          from: dateFrom ? new Date(dateFrom) : undefined,
          to: dateTo ? new Date(dateTo) : undefined,
        }
      : undefined,
  );

  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number.parseInt(minPrice) || 0,
    Number.parseInt(maxPrice) || 500,
  ]);

  // Order statuses and types
  const statuses = ["SUCCESS", "PENDING", "FAILED"];
  const orderTypes = ["Component", "Bundle", "Pack"];

  // Update URL with filters
  const updateFilters = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");

      // Apply updates
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
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

  // Toggle filter option
  const toggleFilter = useCallback(
    (key: string, value: string) => {
      const currentValue = searchParams.get(key);
      updateFilters({ [key]: currentValue === value ? null : value });
    },
    [searchParams, updateFilters],
  );

  // Handle date range selection
  const handleDateChange = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);

    updateFilters({
      dateFrom: selectedDate?.from
        ? format(selectedDate.from, "yyyy-MM-dd")
        : null,
      dateTo: selectedDate?.to ? format(selectedDate.to, "yyyy-MM-dd") : null,
    });
  };

  // Handle price range change
  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);

    // Update URL after a short delay to avoid too many updates while dragging
    const timer = setTimeout(() => {
      updateFilters({
        minPrice: values[0] > 0 ? values[0].toString() : null,
        maxPrice: values[1] < 500 ? values[1].toString() : null,
      });
    }, 300);

    return () => clearTimeout(timer);
  };

  // Reset all filters
  const clearFilters = useCallback(() => {
    router.push("");
    setDate(undefined);
    setPriceRange([0, 500]);
  }, [router]);

  // Count active filters
  const activeFilterCount = [
    status,
    type,
    minPrice !== "0" ? minPrice : "",
    maxPrice !== "500" ? maxPrice : "",
    dateFrom,
    dateTo,
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <SearchInput
          placeholder="Search orders/purchases.."
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
            className="overflow-hidden rounded-xl border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
              {/* Order Status */}
              <div>
                <h3 className="mb-3 text-sm font-medium">Order Status</h3>
                <div className="space-y-2">
                  <div className="mb-2 flex items-center space-x-2">
                    <Checkbox
                      id="all-statuses"
                      checked={!status}
                      onCheckedChange={() => updateFilters({ status: null })}
                    />
                    <Label htmlFor="all-statuses" className="text-sm">
                      All Statuses
                    </Label>
                  </div>

                  {statuses.map((statusValue) => (
                    <div
                      key={statusValue}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`status-${statusValue}`}
                        checked={status === statusValue}
                        onCheckedChange={() =>
                          toggleFilter("status", statusValue)
                        }
                      />
                      <Label
                        htmlFor={`status-${statusValue}`}
                        className="text-sm"
                      >
                        {statusValue}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Type */}
              <div>
                <h3 className="mb-3 text-sm font-medium">Order Type</h3>
                <div className="space-y-2">
                  <div className="mb-2 flex items-center space-x-2">
                    <Checkbox
                      id="all-types"
                      checked={!type}
                      onCheckedChange={() => updateFilters({ type: null })}
                    />
                    <Label htmlFor="all-types" className="text-sm">
                      All Types
                    </Label>
                  </div>

                  {orderTypes.map((typeValue) => (
                    <div
                      key={typeValue}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`type-${typeValue}`}
                        checked={type === typeValue}
                        onCheckedChange={() => toggleFilter("type", typeValue)}
                      />
                      <Label htmlFor={`type-${typeValue}`} className="text-sm">
                        {typeValue}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div>
                <h3 className="mb-3 text-sm font-medium">Order Date</h3>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(date.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Select date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={handleDateChange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Price Range */}
              <div className="md:col-span-2">
                <h3 className="mb-3 text-sm font-medium">Price Range</h3>
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

          {status && (
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-primary/10"
            >
              Status: {status}
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => updateFilters({ status: null })}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove status filter</span>
              </Button>
            </Badge>
          )}

          {type && (
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-primary/10"
            >
              Type: {type}
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => updateFilters({ type: null })}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove type filter</span>
              </Button>
            </Badge>
          )}

          {(dateFrom || dateTo) && (
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-primary/10"
            >
              Date: {dateFrom && format(new Date(dateFrom), "MMM dd, yyyy")}
              {dateFrom && dateTo && " - "}
              {dateTo && format(new Date(dateTo), "MMM dd, yyyy")}
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => {
                  setDate(undefined);
                  updateFilters({ dateFrom: null, dateTo: null });
                }}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove date filter</span>
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
