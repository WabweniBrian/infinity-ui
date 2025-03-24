"use client";

import SearchInput from "@/components/common/search-input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ChevronDown, Filter, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

enum AuthMethod {
  google = "Google",
  email_password = "Email & Password",
}

export function UsersFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Get current filter values from URL
  const role = searchParams.get("role") || "";
  const verification = searchParams.get("verification") || "";
  const purchase = searchParams.get("purchase") || "";
  const authMethod = searchParams.get("authMethod") || "";
  const joinDateFrom = searchParams.get("joinDateFrom") || "";
  const joinDateTo = searchParams.get("joinDateTo") || "";

  // Filter options
  const roles = ["Admin", "User"];
  const verificationStatuses = ["Verified", "Unverified"];
  const purchaseStatuses = ["Has Purchased", "No Purchases"];
  const authMethods = Object.values(AuthMethod);

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

  // Toggle a filter option
  const toggleFilter = useCallback(
    (key: string, value: string) => {
      const currentValue = searchParams.get(key);
      updateFilters({ [key]: currentValue === value ? null : value });
    },
    [searchParams, updateFilters],
  );

  // Reset all filters
  const clearFilters = useCallback(() => {
    router.push("");
  }, [router]);

  // Count active filters
  const activeFilterCount = [
    role,
    verification,
    purchase,
    authMethod,
    joinDateFrom,
    joinDateTo,
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <SearchInput
          placeholder="Search users by name or email..."
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
            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-4">
              {/* User Role */}
              <div>
                <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                  User Role
                </h3>
                <div className="space-y-2">
                  <div className="mb-2 flex items-center space-x-2">
                    <Checkbox
                      id="all-roles"
                      checked={!role}
                      onCheckedChange={() => updateFilters({ role: null })}
                    />
                    <Label htmlFor="all-roles" className="text-sm">
                      All Roles
                    </Label>
                  </div>

                  {roles.map((r) => (
                    <div key={r} className="flex items-center space-x-2">
                      <Checkbox
                        id={`role-${r}`}
                        checked={role === r}
                        onCheckedChange={() => toggleFilter("role", r)}
                      />
                      <Label htmlFor={`role-${r}`} className="text-sm">
                        {r}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verification Status */}
              <div>
                <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                  Verification Status
                </h3>
                <div className="space-y-2">
                  <div className="mb-2 flex items-center space-x-2">
                    <Checkbox
                      id="all-verification"
                      checked={!verification}
                      onCheckedChange={() =>
                        updateFilters({ verification: null })
                      }
                    />
                    <Label htmlFor="all-verification" className="text-sm">
                      All Statuses
                    </Label>
                  </div>

                  {verificationStatuses.map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox
                        id={`verification-${status}`}
                        checked={verification === status}
                        onCheckedChange={() =>
                          toggleFilter("verification", status)
                        }
                      />
                      <Label
                        htmlFor={`verification-${status}`}
                        className="text-sm"
                      >
                        {status}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Purchase Status */}
              <div>
                <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                  Purchase Status
                </h3>
                <div className="space-y-2">
                  <div className="mb-2 flex items-center space-x-2">
                    <Checkbox
                      id="all-purchases"
                      checked={!purchase}
                      onCheckedChange={() => updateFilters({ purchase: null })}
                    />
                    <Label htmlFor="all-purchases" className="text-sm">
                      All Statuses
                    </Label>
                  </div>

                  {purchaseStatuses.map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox
                        id={`purchase-${status}`}
                        checked={purchase === status}
                        onCheckedChange={() => toggleFilter("purchase", status)}
                      />
                      <Label htmlFor={`purchase-${status}`} className="text-sm">
                        {status}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Auth Method */}
              <div>
                <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                  Authentication Method
                </h3>
                <div className="space-y-2">
                  <div className="mb-2 flex items-center space-x-2">
                    <Checkbox
                      id="all-auth-methods"
                      checked={!authMethod}
                      onCheckedChange={() =>
                        updateFilters({ authMethod: null })
                      }
                    />
                    <Label htmlFor="all-auth-methods" className="text-sm">
                      All Methods
                    </Label>
                  </div>

                  {authMethods.map((method) => (
                    <div key={method} className="flex items-center space-x-2">
                      <Checkbox
                        id={`auth-method-${method}`}
                        checked={authMethod === method}
                        onCheckedChange={() =>
                          toggleFilter("authMethod", method)
                        }
                      />
                      <Label
                        htmlFor={`auth-method-${method}`}
                        className="text-sm"
                      >
                        {method}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Join Date */}
              <div className="md:col-span-4">
                <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                  Join Date Range
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="join-date-from" className="text-sm">
                      From
                    </Label>
                    <div className="relative">
                      <Input
                        id="join-date-from"
                        type="date"
                        value={joinDateFrom}
                        onChange={(e) =>
                          updateFilters({
                            joinDateFrom: e.target.value || null,
                          })
                        }
                        className="w-full pr-10"
                      />
                      <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="join-date-to" className="text-sm">
                      To
                    </Label>
                    <div className="relative">
                      <Input
                        id="join-date-to"
                        type="date"
                        value={joinDateTo}
                        onChange={(e) =>
                          updateFilters({ joinDateTo: e.target.value || null })
                        }
                        className="w-full pr-10"
                      />
                      <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    </div>
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
                Apply Filters
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

          {role && (
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-primary/10"
            >
              Role: {role}
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => updateFilters({ role: null })}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove role filter</span>
              </Button>
            </Badge>
          )}

          {verification && (
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-primary/10"
            >
              Verification: {verification}
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => updateFilters({ verification: null })}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove verification filter</span>
              </Button>
            </Badge>
          )}

          {purchase && (
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-primary/10"
            >
              Purchase: {purchase}
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => updateFilters({ purchase: null })}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove purchase filter</span>
              </Button>
            </Badge>
          )}

          {authMethod && (
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-primary/10"
            >
              Auth Method: {authMethod}
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => updateFilters({ authMethod: null })}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove auth method filter</span>
              </Button>
            </Badge>
          )}

          {(joinDateFrom || joinDateTo) && (
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-primary/10"
            >
              Join Date: {joinDateFrom || "Any"} to {joinDateTo || "Any"}
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={() =>
                  updateFilters({ joinDateFrom: null, joinDateTo: null })
                }
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
