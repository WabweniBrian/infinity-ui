"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  TrendingUp,
  Users,
  CreditCard,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const ECommerceKPISet = () => {
  const [data, setData] = useState({
    revenue: 124587,
    revenueGrowth: 18.7,
    orders: 1458,
    ordersGrowth: 12.3,
    customers: 892,
    customersGrowth: 8.5,
    aov: 85.45,
    aovGrowth: 5.8,
    timeframe: "Last 30 days",
    hourlyRevenue: [
      4200, 3800, 2900, 1800, 1200, 900, 1100, 1900, 3200, 4800, 6100, 7400,
      8200, 7800, 7100, 6500, 7200, 8100, 7600, 6800, 5900, 5200, 4600, 4100,
    ],
  });

  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setPathLength(1);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Get revenue chart path
  const getRevenuePath = () => {
    const width = 240;
    const height = 60;
    const padding = 5;
    const dataPoints = data.hourlyRevenue;
    const max = Math.max(...dataPoints);
    const min = Math.min(...dataPoints);

    const xStep = (width - padding * 2) / (dataPoints.length - 1);
    const yRange = max - min || 1;

    const points = dataPoints.map((point, i) => {
      const x = padding + i * xStep;
      const y =
        height - padding - ((point - min) / yRange) * (height - padding * 2);
      return `${x},${y}`;
    });

    return `M${points.join(" L")}`;
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 dark:bg-slate-950">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-7xl overflow-hidden rounded-xl bg-white shadow-xl dark:bg-slate-900">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">
              E-Commerce Performance
            </h3>
            <div className="flex shrink-0 items-center text-indigo-100">
              <Clock className="mr-1 h-4 w-4 shrink-0" />
              <span className="text-xs sm:text-sm">{data.timeframe}</span>
            </div>
          </div>

          <div className="relative mt-4 h-[60px]">
            <svg
              width="100%"
              height="60"
              viewBox="0 0 240 60"
              className="overflow-visible"
            >
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                </linearGradient>
              </defs>
              <motion.path
                d={getRevenuePath()}
                fill="none"
                stroke="rgba(255, 255, 255, 0.8)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <path
                d={`${getRevenuePath()} L240,60 L0,60 Z`}
                fill="url(#revenueGradient)"
                opacity="0.5"
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-0 divide-x divide-y divide-gray-100 dark:divide-gray-800 md:grid-cols-4">
          {/* Revenue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className="p-6"
          >
            <div className="mb-2 flex items-center">
              <div className="mr-3 rounded-lg bg-indigo-100 p-2 dark:bg-indigo-900/30">
                <CreditCard className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Revenue
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-gray-800 dark:text-white sm:text-2xl">
                {formatCurrency(data.revenue)}
              </span>
              <span className="ml-2 flex items-center text-xs font-medium text-green-600 dark:text-green-400 sm:text-sm">
                <ArrowUpRight className="mr-0.5 h-3 w-3" />
                {data.revenueGrowth}%
              </span>
            </div>
          </motion.div>

          {/* Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6"
          >
            <div className="mb-2 flex items-center">
              <div className="mr-3 rounded-lg bg-purple-100 p-2 dark:bg-purple-900/30">
                <ShoppingBag className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Orders
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-gray-800 dark:text-white sm:text-2xl">
                {data.orders.toLocaleString()}
              </span>
              <span className="ml-2 flex items-center text-xs font-medium text-green-600 dark:text-green-400 sm:text-sm">
                <ArrowUpRight className="mr-0.5 h-3 w-3" />
                {data.ordersGrowth}%
              </span>
            </div>
          </motion.div>

          {/* Customers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6"
          >
            <div className="mb-2 flex items-center">
              <div className="mr-3 rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Customers
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-gray-800 dark:text-white sm:text-2xl">
                {data.customers.toLocaleString()}
              </span>
              <span className="ml-2 flex items-center text-xs font-medium text-green-600 dark:text-green-400 sm:text-sm">
                <ArrowUpRight className="mr-0.5 h-3 w-3" />
                {data.customersGrowth}%
              </span>
            </div>
          </motion.div>

          {/* AOV */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-6"
          >
            <div className="mb-2 flex items-center">
              <div className="mr-3 rounded-lg bg-pink-100 p-2 dark:bg-pink-900/30">
                <TrendingUp className="h-5 w-5 text-pink-600 dark:text-pink-400" />
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Avg. Order
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-gray-800 dark:text-white sm:text-2xl">
                ${data.aov.toFixed(2)}
              </span>
              <span className="ml-2 flex items-center text-xs font-medium text-green-600 dark:text-green-400 sm:text-sm">
                <ArrowUpRight className="mr-0.5 h-3 w-3" />
                {data.aovGrowth}%
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ECommerceKPISet;
