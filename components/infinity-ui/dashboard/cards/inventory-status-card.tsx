"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Package,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

interface InventoryItem {
  name: string;
  stock: number;
  total: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
  reorderDate?: string;
}

const InventoryStatusCard = () => {
  const [data, setData] = useState({
    totalItems: 5,
    inStock: 3,
    lowStock: 1,
    outOfStock: 1,
    lastUpdated: "10 minutes ago",
    items: [
      {
        name: "Product A",
        stock: 145,
        total: 200,
        status: "in-stock" as const,
      },
      {
        name: "Product B",
        stock: 23,
        total: 150,
        status: "low-stock" as const,
        reorderDate: "Oct 15, 2023",
      },
      {
        name: "Product C",
        stock: 78,
        total: 100,
        status: "in-stock" as const,
      },
      {
        name: "Product D",
        stock: 0,
        total: 50,
        status: "out-of-stock" as const,
        reorderDate: "Oct 10, 2023",
      },
      {
        name: "Product E",
        stock: 92,
        total: 120,
        status: "in-stock" as const,
      },
    ],
  });

  // Animation for progress bars
  const [progressValues, setProgressValues] = useState<number[]>(
    Array(data.items.length).fill(0),
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressValues(
        data.items.map((item) => (item.stock / item.total) * 100),
      );
    }, 500);
    return () => clearTimeout(timer);
  }, [data.items]);

  // Get status info
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "in-stock":
        return {
          icon: <CheckCircle className="h-4 w-4" />,
          color: "text-green-500 dark:text-green-400",
          bgColor: "bg-green-100 dark:bg-green-900/30",
        };
      case "low-stock":
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          color: "text-amber-500 dark:text-amber-400",
          bgColor: "bg-amber-100 dark:bg-amber-900/30",
        };
      case "out-of-stock":
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          color: "text-red-500 dark:text-red-400",
          bgColor: "bg-red-100 dark:bg-red-900/30",
        };
      default:
        return {
          icon: <CheckCircle className="h-4 w-4" />,
          color: "text-green-500 dark:text-green-400",
          bgColor: "bg-green-100 dark:bg-green-900/30",
        };
    }
  };

  // Get progress bar color
  const getProgressColor = (percentage: number) => {
    if (percentage > 50) return "bg-green-500 dark:bg-green-400";
    if (percentage > 20) return "bg-amber-500 dark:bg-amber-400";
    return "bg-red-500 dark:bg-red-400";
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 dark:bg-slate-950">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-md rounded-xl border border-amber-100 bg-gradient-to-br from-amber-50 to-yellow-50 p-3 shadow-lg dark:border-slate-700 dark:from-slate-800 dark:to-slate-900 sm:p-6"
      >
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-end text-xs text-slate-500 dark:text-slate-400">
            <RefreshCw className="mr-1 h-3 w-3" />
            Updated {data.lastUpdated}
          </div>
          <div className="flex items-center">
            <div className="mr-4 rounded-lg bg-amber-500/10 p-3 dark:bg-amber-500/20">
              <Package className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Inventory Status
              </h3>
              <div className="mt-1 flex items-center space-x-3">
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  {data.inStock} In Stock
                </span>
                <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                  <AlertTriangle className="mr-1 h-3 w-3" />
                  {data.lowStock} Low
                </span>
                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-400">
                  <AlertTriangle className="mr-1 h-3 w-3" />
                  {data.outOfStock} Out
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {data.items.map((item, index) => {
            const statusInfo = getStatusInfo(item.status);
            const percentage = (item.stock / item.total) * 100;

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="rounded-lg bg-white/60 p-3 dark:bg-slate-700/30"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium text-slate-700 dark:text-slate-200">
                    {item.name}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusInfo.bgColor} ${statusInfo.color}`}
                  >
                    {statusInfo.icon}
                    <span className="ml-1 capitalize">
                      {item.status.replace("-", " ")}
                    </span>
                  </span>
                </div>

                <div className="mb-2 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-600">
                  <motion.div
                    className={`h-2 rounded-full ${getProgressColor(percentage)}`}
                    style={{ width: "0%" }}
                    animate={{ width: `${progressValues[index]}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">
                    {item.stock} / {item.total} units
                  </span>
                  {item.reorderDate && (
                    <span className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                      <Clock className="mr-1 h-3 w-3" />
                      Reorder by: {item.reorderDate}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default InventoryStatusCard;
