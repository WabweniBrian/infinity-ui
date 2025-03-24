"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Home,
  TrendingUp,
  DollarSign,
  Calendar,
  Clock,
  Users,
  Percent,
  Map,
  CheckCircle,
  BarChart2,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const RealEstateKPISet = () => {
  // Mock data with realistic real estate metrics
  const [data, setData] = useState({
    activeListings: 87,
    averageDaysOnMarket: 32,
    closedDeals: 24,
    averageSalePrice: 425000,
    inventoryLevel: 3.2, // months
    yearOverYearGrowth: 8.4,
    leadConversionRate: 12.5,
    marketHotness: 78, // percentage
    topNeighborhoods: [
      { name: "Downtown", avgPrice: "$520,000", growth: 12.3 },
      { name: "Westside", avgPrice: "$475,000", growth: 9.7 },
      { name: "North Hills", avgPrice: "$390,000", growth: 7.2 },
    ],
  });

  // Simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        activeListings:
          prev.activeListings +
          (Math.random() > 0.7 ? Math.floor(Math.random() * 3 - 1) : 0),
        averageDaysOnMarket: Math.max(
          20,
          Math.min(45, prev.averageDaysOnMarket + (Math.random() * 4 - 2)),
        ),
        marketHotness: Math.min(
          100,
          Math.max(60, prev.marketHotness + (Math.random() * 3 - 1.5)),
        ),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 dark:bg-slate-950">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <motion.div
        className="mx-auto max-w-7xl overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">
                Real Estate Dashboard
              </h3>
              <p className="text-sm text-emerald-100">
                Market Performance Metrics
              </p>
            </div>
            <Home className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Active Listings */}
          <motion.div
            className="rounded-lg bg-emerald-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Active Listings
                </p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {data.activeListings}
                </h4>
              </div>
              <div className="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900">
                <Home className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <span className="flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="mr-1 h-3 w-3" />+
                {Math.floor(Math.random() * 5 + 3)}% this month
              </span>
            </div>
          </motion.div>

          {/* Average Days on Market */}
          <motion.div
            className="rounded-lg bg-teal-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Avg. Days on Market
                </p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {Math.round(data.averageDaysOnMarket)}
                </h4>
              </div>
              <div className="rounded-full bg-teal-100 p-2 dark:bg-teal-900">
                <Clock className="h-5 w-5 text-teal-600 dark:text-teal-300" />
              </div>
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
              <motion.div
                className={`h-2.5 rounded-full ${
                  data.averageDaysOnMarket < 30
                    ? "bg-green-500"
                    : data.averageDaysOnMarket < 45
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(100, (data.averageDaysOnMarket / 60) * 100)}%`,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {data.averageDaysOnMarket < 30
                ? "Fast Market"
                : data.averageDaysOnMarket < 45
                  ? "Average Market"
                  : "Slow Market"}
            </p>
          </motion.div>

          {/* Average Sale Price */}
          <motion.div
            className="rounded-lg bg-blue-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Avg. Sale Price
                </p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {formatCurrency(data.averageSalePrice)}
                </h4>
              </div>
              <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <span className="flex items-center text-xs font-medium text-blue-600 dark:text-blue-400">
                <TrendingUp className="mr-1 h-3 w-3" />+
                {data.yearOverYearGrowth}% year over year
              </span>
            </div>
          </motion.div>

          {/* Market Hotness */}
          <motion.div
            className="rounded-lg bg-orange-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Market Hotness
                </p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {Math.round(data.marketHotness)}/100
                </h4>
              </div>
              <div className="rounded-full bg-orange-100 p-2 dark:bg-orange-900">
                <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-300" />
              </div>
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
              <motion.div
                className={`h-2.5 rounded-full ${
                  data.marketHotness >= 80
                    ? "bg-red-500"
                    : data.marketHotness >= 60
                      ? "bg-orange-500"
                      : "bg-yellow-500"
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${data.marketHotness}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {data.marketHotness >= 80
                ? "Seller's Market"
                : data.marketHotness >= 60
                  ? "Balanced Market"
                  : "Buyer's Market"}
            </p>
          </motion.div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 gap-6 p-6 pt-0 md:grid-cols-2">
          {/* Performance Metrics */}
          <motion.div
            className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-700 dark:text-white">
                Performance Metrics
              </h4>
              <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-300" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-600">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Closed Deals
                    </p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                      {data.closedDeals}
                    </p>
                  </div>
                  <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-300" />
                  </div>
                </div>
                <div className="mt-2 flex items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    This month
                  </span>
                </div>
              </div>
              <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-600">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Inventory Level
                    </p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                      {data.inventoryLevel.toFixed(1)}
                    </p>
                  </div>
                  <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                    <BarChart2 className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                  </div>
                </div>
                <div className="mt-2 flex items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Months of supply
                  </span>
                </div>
              </div>
              <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-600">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Lead Conversion
                    </p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                      {data.leadConversionRate}%
                    </p>
                  </div>
                  <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                    <Users className="h-4 w-4 text-purple-600 dark:text-purple-300" />
                  </div>
                </div>
                <div className="mt-2 flex items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {data.leadConversionRate > 10
                      ? "Above average"
                      : "Below average"}
                  </span>
                </div>
              </div>
              <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-600">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      YoY Growth
                    </p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                      {data.yearOverYearGrowth}%
                    </p>
                  </div>
                  <div className="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900">
                    <Percent className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
                  </div>
                </div>
                <div className="mt-2 flex items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    In property values
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Top Neighborhoods */}
          <motion.div
            className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-700 dark:text-white">
                Top Neighborhoods
              </h4>
              <Map className="h-5 w-5 text-gray-500 dark:text-gray-300" />
            </div>
            <div className="space-y-4">
              {data.topNeighborhoods.map((neighborhood, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-600"
                >
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-medium text-gray-800 dark:text-white">
                      {neighborhood.name}
                    </h5>
                    <span className="flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      {neighborhood.growth}%
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Average Price
                    </span>
                    <span className="text-sm font-medium text-gray-800 dark:text-white">
                      {neighborhood.avgPrice}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-500">
                    <motion.div
                      className="h-1.5 rounded-full bg-emerald-500"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(100, neighborhood.growth * 5)}%`,
                      }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default RealEstateKPISet;
