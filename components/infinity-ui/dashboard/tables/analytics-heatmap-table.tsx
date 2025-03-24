/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  ChevronDown,
  ChevronUp,
  Download,
  Filter,
  Info,
  Search,
  SlidersHorizontal,
  Zap,
} from "lucide-react";

// Types for our data
interface MetricData {
  id: string;
  date: string;
  value: number;
  percentChange: number;
  category: string;
  name: string;
}

interface CategoryData {
  id: string;
  name: string;
  description: string;
  metrics: MetricData[];
}

const AnalyticsHeatmapTable = () => {
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});
  const [selectedTimeframe, setSelectedTimeframe] = useState<
    "daily" | "weekly" | "monthly"
  >("weekly");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMetric, setSelectedMetric] = useState<MetricData | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showTooltip, setShowTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    content: string;
  }>({ visible: false, x: 0, y: 0, content: "" });

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

  // Sample data for our analytics heatmap
  const generateSampleData = (): CategoryData[] => {
    const categories = [
      {
        id: "traffic",
        name: "Traffic",
        description: "Website traffic metrics across different channels",
      },
      {
        id: "engagement",
        name: "Engagement",
        description: "User interaction with content and features",
      },
      {
        id: "conversion",
        name: "Conversion",
        description: "Actions that lead to business outcomes",
      },
      {
        id: "retention",
        name: "Retention",
        description: "Metrics related to user retention and loyalty",
      },
    ];

    const metrics = [
      { category: "traffic", name: "Unique Visitors" },
      { category: "traffic", name: "Page Views" },
      { category: "traffic", name: "Bounce Rate" },
      { category: "engagement", name: "Avg. Session Duration" },
      { category: "engagement", name: "Pages per Session" },
      { category: "engagement", name: "Click-through Rate" },
      { category: "conversion", name: "Conversion Rate" },
      { category: "conversion", name: "Revenue" },
      { category: "conversion", name: "Cart Abandonment" },
      { category: "retention", name: "Return Visitors" },
      { category: "retention", name: "Churn Rate" },
      { category: "retention", name: "Customer Lifetime Value" },
    ];

    // Generate dates for the last 7 days
    const dates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split("T")[0];
    }).reverse();

    // Generate data for each category
    return categories.map((category) => {
      const categoryMetrics = metrics
        .filter((m) => m.category === category.id)
        .flatMap((metric) => {
          return dates.map((date) => {
            const baseValue = Math.floor(Math.random() * 1000);
            const percentChange = Math.floor(Math.random() * 41) - 20; // -20% to +20%

            return {
              id: `${category.id}-${metric.name}-${date}`,
              name: metric.name,
              date,
              value: baseValue,
              percentChange,
              category: category.id,
            };
          });
        });

      return {
        ...category,
        metrics: categoryMetrics,
      };
    });
  };

  const analyticsData = generateSampleData();

  // Initialize expanded state for all categories
  useEffect(() => {
    const initialExpandedState = analyticsData.reduce(
      (acc, category) => {
        acc[category.id] = true;
        return acc;
      },
      {} as Record<string, boolean>,
    );

    setExpandedCategories(initialExpandedState);
  }, []);

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  // Get dates based on selected timeframe
  const getDates = () => {
    const dates = new Set<string>();
    analyticsData.forEach((category) => {
      category.metrics.forEach((metric) => {
        dates.add(metric.date);
      });
    });
    return Array.from(dates).sort();
  };

  const dates = getDates();

  // Filter metrics based on search term
  const getFilteredData = () => {
    if (!searchTerm) return analyticsData;

    return analyticsData
      .map((category) => {
        const filteredMetrics = category.metrics.filter((metric) =>
          metric.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );

        return {
          ...category,
          metrics: filteredMetrics,
        };
      })
      .filter((category) => category.metrics.length > 0);
  };

  const filteredData = getFilteredData();

  // Get unique metric names for a category
  const getUniqueMetricNames = (categoryId: string) => {
    const category = analyticsData.find((c) => c.id === categoryId);
    if (!category) return [];

    const uniqueNames = new Set<string>();
    category.metrics.forEach((metric) => {
      uniqueNames.add(metric.name);
    });

    return Array.from(uniqueNames);
  };

  // Get heat color based on value
  const getHeatColor = (value: number, percentChange: number) => {
    // For positive changes
    if (percentChange > 15) return "bg-green-500/90 dark:bg-green-600/90";
    if (percentChange > 10) return "bg-green-400/80 dark:bg-green-500/80";
    if (percentChange > 5) return "bg-green-300/70 dark:bg-green-400/70";
    if (percentChange > 0) return "bg-green-200/60 dark:bg-green-300/60";

    // For negative changes
    if (percentChange < -15) return "bg-red-500/90 dark:bg-red-600/90";
    if (percentChange < -10) return "bg-red-400/80 dark:bg-red-500/80";
    if (percentChange < -5) return "bg-red-300/70 dark:bg-red-400/70";
    if (percentChange < 0) return "bg-red-200/60 dark:bg-red-300/60";

    // For zero change
    return "bg-gray-200/50 dark:bg-gray-600/50";
  };

  // Format value based on metric name
  const formatValue = (name: string, value: number) => {
    if (name.includes("Rate")) return `${value}%`;
    if (name.includes("Duration")) return `${value}s`;
    if (name.includes("Revenue")) return `$${value}`;
    return value.toString();
  };

  // Handle tooltip display
  const handleShowTooltip = (e: React.MouseEvent, metric: MetricData) => {
    setShowTooltip({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      content: `
        ${metric.name}
        Date: ${new Date(metric.date).toLocaleDateString()}
        Value: ${formatValue(metric.name, metric.value)}
        Change: ${metric.percentChange > 0 ? "+" : ""}${metric.percentChange}%
      `,
    });
  };

  const handleHideTooltip = () => {
    setShowTooltip({ ...showTooltip, visible: false });
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl transition-all duration-300 dark:border-gray-700 dark:bg-gray-800">
        {/* Header */}
        <div className="flex flex-col items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700 sm:flex-row">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Performance Analytics
            </h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Heatmap visualization of key metrics over time
            </p>
          </div>

          <div className="mt-4 flex items-center space-x-2 sm:mt-0">
            <div className="flex rounded-md shadow-sm">
              <button
                onClick={() => setSelectedTimeframe("daily")}
                className={`px-3 py-2 text-sm font-medium ${
                  selectedTimeframe === "daily"
                    ? "bg-blue-600 text-white dark:bg-blue-700"
                    : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                } rounded-l-md border border-gray-300 dark:border-gray-600`}
              >
                Daily
              </button>
              <button
                onClick={() => setSelectedTimeframe("weekly")}
                className={`px-3 py-2 text-sm font-medium ${
                  selectedTimeframe === "weekly"
                    ? "bg-blue-600 text-white dark:bg-blue-700"
                    : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                } border-y border-gray-300 dark:border-gray-600`}
              >
                Weekly
              </button>
              <button
                onClick={() => setSelectedTimeframe("monthly")}
                className={`px-3 py-2 text-sm font-medium ${
                  selectedTimeframe === "monthly"
                    ? "bg-blue-600 text-white dark:bg-blue-700"
                    : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                } rounded-r-md border border-gray-300 dark:border-gray-600`}
              >
                Monthly
              </button>
            </div>

            <button
              onClick={toggleDarkMode}
              className="rounded-lg bg-gray-100 p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
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

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700">
          <div className="relative min-w-[240px] flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-blue-400"
              placeholder="Search metrics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-blue-400">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </button>
            <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-blue-400">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Customize
            </button>
            <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-blue-400">
              <Download className="mr-2 h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="sticky left-0 z-10 w-64 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                  Metric
                </th>
                {dates.map((date) => (
                  <th
                    key={date}
                    className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    {new Date(date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
              {filteredData.map((category) => (
                <React.Fragment key={category.id}>
                  {/* Category Header */}
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <td
                      colSpan={dates.length + 1}
                      className="cursor-pointer px-6 py-3"
                      onClick={() => toggleCategory(category.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {expandedCategories[category.id] ? (
                            <ChevronDown className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                          ) : (
                            <ChevronUp className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                          )}
                          <span className="font-medium text-gray-900 dark:text-white">
                            {category.name}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {category.description}
                          </span>
                          <Info className="ml-2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* Category Metrics */}
                  {expandedCategories[category.id] &&
                    getUniqueMetricNames(category.id).map((metricName) => {
                      const metricsForName = category.metrics.filter(
                        (m) => m.name === metricName,
                      );

                      return (
                        <tr
                          key={`${category.id}-${metricName}`}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        >
                          <td className="sticky left-0 z-10 whitespace-nowrap bg-white px-6 py-4 text-sm font-medium text-gray-900 dark:bg-gray-800 dark:text-white">
                            <div className="flex items-center">
                              <BarChart3 className="mr-2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                              {metricName}
                            </div>
                          </td>

                          {dates.map((date) => {
                            const metric = metricsForName.find(
                              (m) => m.date === date,
                            );

                            if (!metric) {
                              return (
                                <td
                                  key={`${category.id}-${metricName}-${date}`}
                                  className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                                >
                                  —
                                </td>
                              );
                            }

                            return (
                              <td
                                key={`${category.id}-${metricName}-${date}`}
                                className="px-6 py-4 text-center"
                              >
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  className={`mx-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-md ${getHeatColor(
                                    metric.value,
                                    metric.percentChange,
                                  )}`}
                                  onClick={() => setSelectedMetric(metric)}
                                  onMouseEnter={(e) =>
                                    handleShowTooltip(e, metric)
                                  }
                                  onMouseLeave={handleHideTooltip}
                                >
                                  <span className="text-xs font-medium text-gray-900 dark:text-white">
                                    {metric.percentChange > 0 ? "+" : ""}
                                    {metric.percentChange}%
                                  </span>
                                </motion.div>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selected Metric Details */}
        <AnimatePresence>
          {selectedMetric && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="m-4 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-700"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {selectedMetric.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(selectedMetric.date).toLocaleDateString(
                      undefined,
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedMetric(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ×
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-600">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Value
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatValue(selectedMetric.name, selectedMetric.value)}
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-600">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Change
                  </div>
                  <div
                    className={`text-2xl font-bold ${
                      selectedMetric.percentChange > 0
                        ? "text-green-600 dark:text-green-400"
                        : selectedMetric.percentChange < 0
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {selectedMetric.percentChange > 0 ? "+" : ""}
                    {selectedMetric.percentChange}%
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-600">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Category
                  </div>
                  <div className="text-2xl font-bold capitalize text-gray-900 dark:text-white">
                    {selectedMetric.category}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-800">
                  <Zap className="mr-2 h-4 w-4" />
                  View Detailed Analysis
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tooltip */}
        {showTooltip.visible && (
          <div
            className="pointer-events-none fixed z-50 rounded-md bg-gray-900 p-2 text-xs text-white shadow-lg dark:bg-gray-800"
            style={{
              left: `${showTooltip.x + 10}px`,
              top: `${showTooltip.y + 10}px`,
              maxWidth: "200px",
            }}
          >
            <pre className="whitespace-pre-wrap">{showTooltip.content}</pre>
          </div>
        )}
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

export default AnalyticsHeatmapTable;
