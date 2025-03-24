"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  BarChart2,
  PieChart,
  Calendar,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const FinancialPerformanceKPISet = () => {
  // Mock data with realistic financial metrics
  const [data, setData] = useState({
    revenue: 1245000,
    revenueGrowth: 12.4,
    profit: 328000,
    profitMargin: 26.3,
    operatingExpenses: 917000,
    cashFlow: 412000,
    cashFlowGrowth: 8.7,
    returnOnInvestment: 18.5,
    debtToEquity: 0.42,
    quickRatio: 1.8,
    revenueByProduct: [
      { name: "Product A", value: 42 },
      { name: "Product B", value: 28 },
      { name: "Product C", value: 18 },
      { name: "Other", value: 12 },
    ],
    quarterlyPerformance: [
      { quarter: "Q1", revenue: 1120000, profit: 285000 },
      { quarter: "Q2", revenue: 1185000, profit: 302000 },
      { quarter: "Q3", revenue: 1245000, profit: 328000 },
      { quarter: "Q4 (Projected)", revenue: 1320000, profit: 356000 },
    ],
  });

  // Simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        revenue: prev.revenue + Math.floor(Math.random() * 5000 - 1000),
        revenueGrowth: Math.max(
          0,
          Math.min(20, prev.revenueGrowth + (Math.random() * 0.4 - 0.2)),
        ),
        profit: Math.round(prev.revenue * (prev.profitMargin / 100)),
        profitMargin: Math.max(
          20,
          Math.min(30, prev.profitMargin + (Math.random() * 0.4 - 0.2)),
        ),
        cashFlow: prev.cashFlow + Math.floor(Math.random() * 2000 - 1000),
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
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount}`;
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 dark:bg-gray-950">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <motion.div
        className="mx-auto max-w-7xl overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">
                Financial Performance
              </h3>
              <p className="text-sm text-emerald-100">
                Revenue & Profit Metrics
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Revenue */}
          <motion.div
            className="rounded-lg bg-emerald-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Revenue
                </p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {formatCurrency(data.revenue)}
                </h4>
              </div>
              <div className="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900">
                <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <span
                className={`flex items-center text-xs font-medium ${
                  data.revenueGrowth >= 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {data.revenueGrowth >= 0 ? (
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDownRight className="mr-1 h-3 w-3" />
                )}
                {Math.abs(data.revenueGrowth).toFixed(1)}% YoY
              </span>
            </div>
          </motion.div>

          {/* Profit */}
          <motion.div
            className="rounded-lg bg-green-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Profit
                </p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {formatCurrency(data.profit)}
                </h4>
              </div>
              <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-300" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Margin: {data.profitMargin.toFixed(1)}%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                OpEx: {formatCurrency(data.operatingExpenses)}
              </span>
            </div>
          </motion.div>

          {/* Cash Flow */}
          <motion.div
            className="rounded-lg bg-blue-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Cash Flow
                </p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {formatCurrency(data.cashFlow)}
                </h4>
              </div>
              <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <span
                className={`flex items-center text-xs font-medium ${
                  data.cashFlowGrowth >= 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {data.cashFlowGrowth >= 0 ? (
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDownRight className="mr-1 h-3 w-3" />
                )}
                {Math.abs(data.cashFlowGrowth).toFixed(1)}% QoQ
              </span>
            </div>
          </motion.div>

          {/* ROI */}
          <motion.div
            className="rounded-lg bg-purple-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">ROI</p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {data.returnOnInvestment.toFixed(1)}%
                </h4>
              </div>
              <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                <Percent className="h-5 w-5 text-purple-600 dark:text-purple-300" />
              </div>
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
              <motion.div
                className={`h-2.5 rounded-full ${
                  data.returnOnInvestment >= 15
                    ? "bg-green-500"
                    : data.returnOnInvestment >= 10
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(100, data.returnOnInvestment * 3)}%`,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Target: 15%</span>
              <span>Industry Avg: 12.5%</span>
            </div>
          </motion.div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 gap-6 p-6 pt-0 md:grid-cols-2">
          {/* Revenue by Product */}
          <motion.div
            className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-700 dark:text-white">
                Revenue by Product
              </h4>
              <PieChart className="h-5 w-5 text-gray-500 dark:text-gray-300" />
            </div>
            <div className="mb-4 flex items-center justify-center">
              <div className="relative h-40 w-40">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  {data.revenueByProduct.map((product, index) => {
                    // Calculate the segment of the pie chart
                    const startAngle =
                      index === 0
                        ? 0
                        : data.revenueByProduct
                            .slice(0, index)
                            .reduce((sum, p) => sum + p.value, 0) * 3.6;
                    const endAngle = startAngle + product.value * 3.6;

                    // Convert angles to radians and calculate coordinates
                    const startRad = ((startAngle - 90) * Math.PI) / 180;
                    const endRad = ((endAngle - 90) * Math.PI) / 180;

                    const x1 = 50 + 40 * Math.cos(startRad);
                    const y1 = 50 + 40 * Math.sin(startRad);
                    const x2 = 50 + 40 * Math.cos(endRad);
                    const y2 = 50 + 40 * Math.sin(endRad);

                    // Determine if the arc should be drawn as a large arc
                    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

                    // Colors for each segment
                    const colors = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b"];

                    return (
                      <motion.path
                        key={index}
                        d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                        fill={colors[index % colors.length]}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      />
                    );
                  })}
                  <circle
                    cx="50"
                    cy="50"
                    r="25"
                    fill="white"
                    className="dark:fill-gray-700"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-800 dark:text-white">
                    100%
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {data.revenueByProduct.map((product, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`mr-2 h-3 w-3 rounded-full ${
                      index === 0
                        ? "bg-emerald-500"
                        : index === 1
                          ? "bg-blue-500"
                          : index === 2
                            ? "bg-purple-500"
                            : "bg-amber-500"
                    }`}
                  ></div>
                  <div>
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {product.value}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quarterly Performance */}
          <motion.div
            className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-700 dark:text-white">
                Quarterly Performance
              </h4>
              <BarChart2 className="h-5 w-5 text-gray-500 dark:text-gray-300" />
            </div>
            <div className="space-y-4">
              {data.quarterlyPerformance.map((quarter, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-600"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h5 className="text-sm font-medium text-gray-800 dark:text-white">
                      {quarter.quarter}
                    </h5>
                    <div className="flex items-center">
                      <span className="mr-2 text-xs font-medium text-gray-600 dark:text-gray-300">
                        Margin:{" "}
                        {((quarter.profit / quarter.revenue) * 100).toFixed(1)}%
                      </span>
                      {index > 0 && (
                        <span
                          className={`flex items-center text-xs font-medium ${
                            quarter.revenue >
                            data.quarterlyPerformance[index - 1].revenue
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {quarter.revenue >
                          data.quarterlyPerformance[index - 1].revenue ? (
                            <ArrowUpRight className="mr-1 h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="mr-1 h-3 w-3" />
                          )}
                          {Math.abs(
                            ((quarter.revenue -
                              data.quarterlyPerformance[index - 1].revenue) /
                              data.quarterlyPerformance[index - 1].revenue) *
                              100,
                          ).toFixed(1)}
                          %
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Revenue
                        </span>
                        <span className="text-xs font-medium text-gray-800 dark:text-white">
                          {formatCurrency(quarter.revenue)}
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-500">
                        <motion.div
                          className="h-1.5 rounded-full bg-emerald-500"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(quarter.revenue / 1500000) * 100}%`,
                          }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        ></motion.div>
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Profit
                        </span>
                        <span className="text-xs font-medium text-gray-800 dark:text-white">
                          {formatCurrency(quarter.profit)}
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-500">
                        <motion.div
                          className="h-1.5 rounded-full bg-green-500"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(quarter.profit / 400000) * 100}%`,
                          }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        ></motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Calendar className="mr-1 h-4 w-4" />
                <span>Fiscal Year 2023</span>
              </div>
              <button className="text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400">
                View Financial Report
              </button>
            </div>
          </motion.div>
        </div>

        {/* Financial Health Indicators */}
        <div className="grid grid-cols-1 gap-6 p-6 pt-0 md:grid-cols-3">
          <motion.div
            className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Debt to Equity
              </p>
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  data.debtToEquity <= 0.5
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : data.debtToEquity <= 1
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                }`}
              >
                {data.debtToEquity <= 0.5
                  ? "Low Risk"
                  : data.debtToEquity <= 1
                    ? "Moderate"
                    : "High Risk"}
              </span>
            </div>
            <h4 className="text-xl font-bold text-gray-800 dark:text-white">
              {data.debtToEquity.toFixed(2)}
            </h4>
            <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
              <motion.div
                className={`h-2 rounded-full ${
                  data.debtToEquity <= 0.5
                    ? "bg-green-500"
                    : data.debtToEquity <= 1
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, data.debtToEquity * 50)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Industry Average: 0.65
            </p>
          </motion.div>

          <motion.div
            className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Quick Ratio
              </p>
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  data.quickRatio >= 1.5
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : data.quickRatio >= 1
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                }`}
              >
                {data.quickRatio >= 1.5
                  ? "Strong"
                  : data.quickRatio >= 1
                    ? "Adequate"
                    : "Weak"}
              </span>
            </div>
            <h4 className="text-xl font-bold text-gray-800 dark:text-white">
              {data.quickRatio.toFixed(1)}
            </h4>
            <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
              <motion.div
                className={`h-2 rounded-full ${
                  data.quickRatio >= 1.5
                    ? "bg-green-500"
                    : data.quickRatio >= 1
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(100, (data.quickRatio / 3) * 100)}%`,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Target: &gt;1.5
            </p>
          </motion.div>

          <motion.div
            className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Profit Margin
              </p>
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  data.profitMargin >= 25
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : data.profitMargin >= 15
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                }`}
              >
                {data.profitMargin >= 25
                  ? "Excellent"
                  : data.profitMargin >= 15
                    ? "Good"
                    : "Below Target"}
              </span>
            </div>
            <h4 className="text-xl font-bold text-gray-800 dark:text-white">
              {data.profitMargin.toFixed(1)}%
            </h4>
            <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
              <motion.div
                className={`h-2 rounded-full ${
                  data.profitMargin >= 25
                    ? "bg-green-500"
                    : data.profitMargin >= 15
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, data.profitMargin * 2)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Industry Average: 22.5%
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default FinancialPerformanceKPISet;
