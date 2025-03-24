"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarIcon, ChevronDown, Filter, Search, X } from "lucide-react";
import type { DateRange } from "react-day-picker";

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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchInput from "@/components/common/search-input";

const notificationTypes = [
  { value: "info", label: "Information" },
  { value: "system", label: "System" },
  { value: "user_registration", label: "User Registration" },
  { value: "purchase", label: "Purchase" },
  { value: "welcome", label: "Welcome" },
];

export function NotificationsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Get current filter values from URL
  const search = searchParams.get("search") || "";
  const type = searchParams.get("type") || "";
  const isRead = searchParams.get("isRead") || "";
  const isAdmin = searchParams.get("isAdmin") || "";
  const dateFrom = searchParams.get("dateFrom") || "";
  const dateTo = searchParams.get("dateTo") || "";

  const [date, setDate] = useState<DateRange | undefined>(
    dateFrom || dateTo
      ? {
          from: dateFrom ? new Date(dateFrom) : undefined,
          to: dateTo ? new Date(dateTo) : undefined,
        }
      : undefined,
  );

  // Update URL with filters
  const updateFilters = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      // Reset to page 1 when filters change
      if (params.has("page")) {
        params.set("page", "1");
      }

      // Apply updates
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      // Navigate to new URL
      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  // Handle search input
  const handleSearch = (value: string) => {
    updateFilters({ search: value || null });
  };

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

  // Clear all filters
  const clearFilters = () => {
    router.push("");
    setDate(undefined);
  };

  // Count active filters
  const activeFilterCount = [
    search,
    type,
    isRead,
    isAdmin,
    dateFrom,
    dateTo,
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <SearchInput
          placeholder="Search notifications by title or message..."
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
            className="overflow-hidden rounded-xl border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
              {/* Notification Type */}
              <div>
                <h3 className="mb-3 text-sm font-medium">Notification Type</h3>
                <Select
                  value={type}
                  onValueChange={(value) =>
                    updateFilters({ type: value === "all" ? null : value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {notificationTypes.map((notificationType) => (
                      <SelectItem
                        key={notificationType.value}
                        value={notificationType.value}
                      >
                        {notificationType.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range */}
              <div>
                <h3 className="mb-3 text-sm font-medium">Date Range</h3>
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

              {/* Status Filters */}
              <div>
                <h3 className="mb-3 text-sm font-medium">Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="read"
                      checked={isRead === "true"}
                      onCheckedChange={(checked) =>
                        updateFilters({ isRead: checked ? "true" : null })
                      }
                    />
                    <Label htmlFor="read" className="text-sm">
                      Read
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="unread"
                      checked={isRead === "false"}
                      onCheckedChange={(checked) =>
                        updateFilters({ isRead: checked ? "false" : null })
                      }
                    />
                    <Label htmlFor="unread" className="text-sm">
                      Unread
                    </Label>
                  </div>
                </div>
              </div>

              {/* Admin Only Filter */}
              <div>
                <h3 className="mb-3 text-sm font-medium">Visibility</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="admin-only"
                      checked={isAdmin === "true"}
                      onCheckedChange={(checked) =>
                        updateFilters({ isAdmin: checked ? "true" : null })
                      }
                    />
                    <Label htmlFor="admin-only" className="text-sm">
                      Admin Only
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="all-users"
                      checked={isAdmin === "false"}
                      onCheckedChange={(checked) =>
                        updateFilters({ isAdmin: checked ? "false" : null })
                      }
                    />
                    <Label htmlFor="all-users" className="text-sm">
                      All Users
                    </Label>
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

          {search && (
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-primary/10"
            >
              Search: {search}
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => updateFilters({ search: null })}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove search filter</span>
              </Button>
            </Badge>
          )}

          {type && (
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-primary/10"
            >
              Type:{" "}
              {notificationTypes.find((t) => t.value === type)?.label || type}
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

          {isRead === "true" && (
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-primary/10"
            >
              Status: Read
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => updateFilters({ isRead: null })}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove read status filter</span>
              </Button>
            </Badge>
          )}

          {isRead === "false" && (
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-primary/10"
            >
              Status: Unread
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => updateFilters({ isRead: null })}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove unread status filter</span>
              </Button>
            </Badge>
          )}

          {isAdmin === "true" && (
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-primary/10"
            >
              Admin Only
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => updateFilters({ isAdmin: null })}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove admin filter</span>
              </Button>
            </Badge>
          )}

          {isAdmin === "false" && (
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-primary/10"
            >
              All Users
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => updateFilters({ isAdmin: null })}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove all users filter</span>
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
