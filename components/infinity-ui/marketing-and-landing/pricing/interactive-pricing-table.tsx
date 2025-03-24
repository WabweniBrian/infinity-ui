"use client";

import React from "react";

import {
  type PricingTier,
  pricingTiers as tiers,
  pricingFeatures as features,
} from "@/data/pricing";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, ChevronUp, HelpCircle, X } from "lucide-react";
import { useState, useEffect } from "react";

interface InteractivePricingTableProps {
  className?: string;
}

const InteractivePricingTable = ({
  className = "",
}: InteractivePricingTableProps) => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">(
    "monthly",
  );
  const [expandedFeatures, setExpandedFeatures] = useState<string[]>([]);
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);
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

  // Toggle feature expansion
  const toggleFeatureExpansion = (featureId: string) => {
    setExpandedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId],
    );
  };

  // Calculate savings percentage
  const calculateSavings = (tier: PricingTier) => {
    if (tier.id === "free") {
      return 0;
    }
    const monthlyAnnual = tier.price.monthly * 12;
    const annually = tier.price.annually;
    return Math.round((1 - annually / monthlyAnnual) * 100);
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Render feature value
  const renderFeatureValue = (
    value: boolean | string | number | null,
    tier: PricingTier,
  ) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-green-500 dark:text-green-400" />
      ) : (
        <X className="h-5 w-5 text-red-500 dark:text-red-400" />
      );
    }

    if (value === null) {
      return <span className="text-gray-400 dark:text-gray-500">—</span>;
    }

    return <span>{value}</span>;
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10 dark:bg-gray-950">
      <div className={`w-full ${className}`}>
        <div className="mx-auto max-w-7xl overflow-hidden rounded-xl bg-white shadow-lg transition-colors duration-200 dark:bg-gray-800">
          {/* Billing Toggle */}
          <div className="flex flex-col items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700 sm:flex-row">
            <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white sm:mb-0">
              Pricing Plans
            </h2>

            <div className="flex items-center">
              <span
                className={`text-sm font-medium ${billingCycle === "monthly" ? "text-gray-800 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
              >
                Monthly
              </span>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setBillingCycle((prev) =>
                    prev === "monthly" ? "annually" : "monthly",
                  )
                }
                className="relative mx-3 flex h-6 w-12 items-center rounded-full bg-gray-200 p-1 transition-colors duration-300 dark:bg-gray-700"
              >
                <motion.div
                  className="h-4 w-4 rounded-full bg-blue-600 dark:bg-blue-500"
                  animate={{ x: billingCycle === "monthly" ? 0 : 24 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.button>

              <div className="flex items-center">
                <span
                  className={`text-sm font-medium ${billingCycle === "annually" ? "text-gray-800 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
                >
                  Annually
                </span>

                {billingCycle === "annually" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200"
                  >
                    Save up to 25%
                  </motion.div>
                )}
              </div>

              <button
                onClick={toggleDarkMode}
                className="ml-4 rounded-lg bg-gray-100 p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
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
              </button>
            </div>
          </div>

          {/* Pricing Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-max table-fixed border-collapse">
              <thead>
                <tr>
                  {/* Empty header cell for feature column */}
                  <th className="w-[250px] border-b border-gray-200 bg-gray-50 p-6 text-left dark:border-gray-700 dark:bg-gray-700">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Compare features
                    </span>
                  </th>

                  {/* Tier header cells */}
                  {tiers.map((tier) => (
                    <th
                      key={tier.id}
                      className={`border-b border-gray-200 p-6 text-center dark:border-gray-700 ${
                        tier.highlighted
                          ? "bg-blue-50 dark:bg-blue-900/20"
                          : "bg-white dark:bg-gray-800"
                      } ${hoveredTier === tier.id ? "relative z-10 shadow-xl" : ""} transition-all duration-200`}
                      onMouseEnter={() => setHoveredTier(tier.id)}
                      onMouseLeave={() => setHoveredTier(null)}
                    >
                      <div className="flex flex-col items-center">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                          {tier.name}
                        </h3>

                        <div className="mt-4 flex items-baseline">
                          <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                            {formatPrice(tier.price[billingCycle])}
                          </span>
                          <span className="ml-1 text-xl font-medium text-gray-500 dark:text-gray-400">
                            /{billingCycle === "monthly" ? "mo" : "yr"}
                          </span>
                        </div>

                        {billingCycle === "annually" && (
                          <div className="mt-1 text-sm text-green-600 dark:text-green-400">
                            Save {calculateSavings(tier)}%
                          </div>
                        )}

                        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                          {tier.description}
                        </p>

                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className={`mt-6 w-full rounded-lg px-4 py-2 text-sm font-medium ${
                            tier.highlighted
                              ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                          } transition-colors duration-200`}
                        >
                          Get started
                        </motion.button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {/* Features */}
                {features.map((feature) => (
                  <React.Fragment key={feature.id}>
                    <tr>
                      {/* Feature name */}
                      <td
                        className="cursor-pointer border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700"
                        onClick={() => toggleFeatureExpansion(feature.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                              {feature.name}
                            </span>

                            {feature.description && (
                              <div className="group relative ml-2">
                                <HelpCircle className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                                <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-48 -translate-x-1/2 rounded-lg bg-gray-800 p-2 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:bg-gray-700">
                                  {feature.description}
                                  <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-800 dark:border-t-gray-700"></div>
                                </div>
                              </div>
                            )}
                          </div>

                          {expandedFeatures.includes(feature.id) ? (
                            <ChevronUp className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                          )}
                        </div>
                      </td>

                      {/* Feature values for each tier */}
                      {tiers.map((tier) => (
                        <td
                          key={`${feature.id}-${tier.id}`}
                          className={`border-b border-gray-200 p-4 text-center dark:border-gray-700 ${
                            tier.highlighted
                              ? "bg-blue-50 dark:bg-blue-900/20"
                              : "bg-white dark:bg-gray-800"
                          } ${hoveredTier === tier.id ? "relative z-10 shadow-xl" : ""} transition-all duration-200`}
                          onMouseEnter={() => setHoveredTier(tier.id)}
                          onMouseLeave={() => setHoveredTier(null)}
                        >
                          <div className="flex-center-center">
                            {renderFeatureValue(feature.tiers[tier.id], tier)}
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Expanded feature description */}
                    {expandedFeatures.includes(feature.id) &&
                      feature.description && (
                        <tr>
                          <td
                            colSpan={tiers.length + 1}
                            className="border-b border-gray-200 bg-gray-100 p-0 dark:border-gray-700 dark:bg-gray-700"
                          >
                            <AnimatePresence>
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="p-4 text-sm text-gray-600 dark:text-gray-400">
                                  {feature.description}
                                </div>
                              </motion.div>
                            </AnimatePresence>
                          </td>
                        </tr>
                      )}
                  </React.Fragment>
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

export default InteractivePricingTable;
