"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Truck,
  Package,
  Clock,
  TrendingUp,
  Map,
  ShoppingCart,
  AlertCircle,
  CheckCircle,
  Calendar,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const LogisticsSupplyChainKPISet = () => {
  // Mock data with realistic logistics metrics
  const [data, setData] = useState({
    onTimeDelivery: 94.2,
    inventoryTurnover: 12.8,
    averageDeliveryTime: 2.4, // days
    orderAccuracy: 98.7,
    backorders: 23,
    totalShipments: 1245,
    completedShipments: 1182,
    inTransitShipments: 63,
    inventoryLevels: 87.5, // percentage of optimal
    warehouseUtilization: 82.3,
    returnRate: 3.2,
    carrierPerformance: [
      { name: "Express Logistics", otd: 96.8, cost: "High", volume: 45 },
      { name: "Regional Carriers", otd: 92.5, cost: "Medium", volume: 35 },
      { name: "Economy Shipping", otd: 88.3, cost: "Low", volume: 20 },
    ],
  });

  // Simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        onTimeDelivery: Math.min(
          100,
          Math.max(90, prev.onTimeDelivery + (Math.random() * 1 - 0.5)),
        ),
        inventoryTurnover: Math.max(
          10,
          Math.min(15, prev.inventoryTurnover + (Math.random() * 0.4 - 0.2)),
        ),
        averageDeliveryTime: Math.max(
          1.8,
          Math.min(3, prev.averageDeliveryTime + (Math.random() * 0.2 - 0.1)),
        ),
        inventoryLevels: Math.min(
          100,
          Math.max(70, prev.inventoryLevels + (Math.random() * 2 - 1)),
        ),
        completedShipments: Math.min(
          prev.totalShipments,
          prev.completedShipments + (Math.random() > 0.7 ? 1 : 0),
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
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">
                Logistics & Supply Chain
              </h3>
              <p className="text-sm text-amber-100">
                Shipping & Inventory Metrics
              </p>
            </div>
            <Truck className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* On-Time Delivery */}
          <motion.div
            className="rounded-lg bg-amber-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  On-Time Delivery
                </p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {data.onTimeDelivery.toFixed(1)}%
                </h4>
              </div>
              <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900">
                <Clock className="h-5 w-5 text-amber-600 dark:text-amber-300" />
              </div>
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
              <motion.div
                className={`h-2.5 rounded-full ${
                  data.onTimeDelivery >= 95
                    ? "bg-green-500"
                    : data.onTimeDelivery >= 90
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${data.onTimeDelivery}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Target: 95%
            </p>
          </motion.div>

          {/* Inventory Turnover */}
          <motion.div
            className="rounded-lg bg-blue-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Inventory Turnover
                </p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {data.inventoryTurnover.toFixed(1)}
                </h4>
              </div>
              <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                <Package className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
              <motion.div
                className="h-2.5 rounded-full bg-blue-600"
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(100, (data.inventoryTurnover / 15) * 100)}%`,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
            <div className="mt-2 flex items-center">
              <span className="flex items-center text-xs font-medium text-blue-600 dark:text-blue-400">
                <TrendingUp className="mr-1 h-3 w-3" />
                Higher is better
              </span>
            </div>
          </motion.div>

          {/* Average Delivery Time */}
          <motion.div
            className="rounded-lg bg-green-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Avg. Delivery Time
                </p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {data.averageDeliveryTime.toFixed(1)} days
                </h4>
              </div>
              <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                <Map className="h-5 w-5 text-green-600 dark:text-green-300" />
              </div>
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
              <motion.div
                className={`h-2.5 rounded-full ${
                  data.averageDeliveryTime <= 2
                    ? "bg-green-500"
                    : data.averageDeliveryTime <= 3
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(100, (data.averageDeliveryTime / 5) * 100)}%`,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Target: &lt;2.5 days
            </p>
          </motion.div>

          {/* Order Accuracy */}
          <motion.div
            className="rounded-lg bg-purple-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Order Accuracy
                </p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {data.orderAccuracy}%
                </h4>
              </div>
              <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-300" />
              </div>
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
              <motion.div
                className="h-2.5 rounded-full bg-purple-600"
                initial={{ width: 0 }}
                animate={{ width: `${data.orderAccuracy}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Error Rate: {(100 - data.orderAccuracy).toFixed(1)}%</span>
              <span>Backorders: {data.backorders}</span>
            </div>
          </motion.div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 gap-6 p-6 pt-0 md:grid-cols-2">
          {/* Shipment Status */}
          <motion.div
            className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-700 dark:text-white">
                Shipment Status
              </h4>
              <Truck className="h-5 w-5 text-gray-500 dark:text-gray-300" />
            </div>
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Total Shipments
                  </span>
                  <span className="text-sm font-medium text-gray-800 dark:text-white">
                    {data.totalShipments}
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
                  <motion.div
                    className="h-2.5 rounded-full bg-amber-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Completed
                  </span>
                  <span className="text-sm font-medium text-gray-800 dark:text-white">
                    {data.completedShipments} (
                    {Math.round(
                      (data.completedShipments / data.totalShipments) * 100,
                    )}
                    %)
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
                  <motion.div
                    className="h-2.5 rounded-full bg-green-500"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(data.completedShipments / data.totalShipments) * 100}%`,
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    In Transit
                  </span>
                  <span className="text-sm font-medium text-gray-800 dark:text-white">
                    {data.inTransitShipments} (
                    {Math.round(
                      (data.inTransitShipments / data.totalShipments) * 100,
                    )}
                    %)
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
                  <motion.div
                    className="h-2.5 rounded-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(data.inTransitShipments / data.totalShipments) * 100}%`,
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-600">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Inventory Levels
                    </p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">
                      {data.inventoryLevels.toFixed(1)}%
                    </p>
                  </div>
                  <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                    <Package className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-600">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Return Rate
                    </p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">
                      {data.returnRate}%
                    </p>
                  </div>
                  <div className="rounded-full bg-red-100 p-2 dark:bg-red-900">
                    <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-300" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Carrier Performance */}
          <motion.div
            className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-700 dark:text-white">
                Carrier Performance
              </h4>
              <ShoppingCart className="h-5 w-5 text-gray-500 dark:text-gray-300" />
            </div>
            <div className="space-y-4">
              {data.carrierPerformance.map((carrier, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-600"
                >
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-medium text-gray-800 dark:text-white">
                      {carrier.name}
                    </h5>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        carrier.cost === "High"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          : carrier.cost === "Medium"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      }`}
                    >
                      {carrier.cost} Cost
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        On-Time Delivery
                      </span>
                      <span className="text-xs font-medium text-gray-800 dark:text-white">
                        {carrier.otd}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-500">
                      <motion.div
                        className={`h-1.5 rounded-full ${
                          carrier.otd >= 95
                            ? "bg-green-500"
                            : carrier.otd >= 90
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${carrier.otd}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      ></motion.div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Volume Share
                    </span>
                    <span className="text-xs font-medium text-gray-800 dark:text-white">
                      {carrier.volume}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Calendar className="mr-1 h-4 w-4" />
                <span>Last 30 days</span>
              </div>
              <button className="text-sm font-medium text-amber-600 hover:underline dark:text-amber-400">
                View All Carriers
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LogisticsSupplyChainKPISet;
