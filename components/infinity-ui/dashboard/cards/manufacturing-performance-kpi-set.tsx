"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Factory,
  AlertTriangle,
  Clock,
  BarChart2,
  Truck,
  Settings,
  Zap,
  Calendar,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const ManufacturingPerformanceKPISet = () => {
  // Mock data with realistic manufacturing metrics
  const [data, setData] = useState({
    oee: 82.4, // Overall Equipment Effectiveness
    productionVolume: 12450,
    defectRate: 1.8,
    downtime: 4.2, // hours
    cycleTime: 28, // seconds
    plannedProduction: 13500,
    maintenanceScheduled: 3,
    energyConsumption: 4250, // kWh
    productionEfficiency: 92.2,
    qualityRate: 98.2,
    availabilityRate: 94.5,
    performanceRate: 89.3,
    topIssues: [
      { name: "Material Jams", count: 12, impact: "High" },
      { name: "Calibration Errors", count: 8, impact: "Medium" },
      { name: "Power Fluctuations", count: 5, impact: "Low" },
    ],
  });

  // Simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        oee: Math.min(100, Math.max(75, prev.oee + (Math.random() * 1 - 0.5))),
        productionVolume:
          prev.productionVolume + Math.floor(Math.random() * 10),
        defectRate: Math.max(
          0.5,
          Math.min(3, prev.defectRate + (Math.random() * 0.4 - 0.2)),
        ),
        downtime: Math.max(
          0,
          Math.min(8, prev.downtime + (Math.random() * 0.4 - 0.2)),
        ),
        productionEfficiency: Math.min(
          100,
          Math.max(85, prev.productionEfficiency + (Math.random() * 1 - 0.5)),
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
        <div className="bg-gradient-to-r from-slate-600 to-slate-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">
                Manufacturing Performance
              </h3>
              <p className="text-sm text-slate-300">
                Production & Quality Metrics
              </p>
            </div>
            <Factory className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* OEE */}
          <motion.div
            className="rounded-lg bg-slate-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">OEE</p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {data.oee.toFixed(1)}%
                </h4>
              </div>
              <div className="rounded-full bg-slate-200 p-2 dark:bg-slate-600">
                <BarChart2 className="h-5 w-5 text-slate-700 dark:text-slate-300" />
              </div>
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
              <motion.div
                className={`h-2.5 rounded-full ${
                  data.oee >= 85
                    ? "bg-green-500"
                    : data.oee >= 75
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${data.oee}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Target: 85%</span>
              <span>
                {data.oee >= 85
                  ? "Excellent"
                  : data.oee >= 75
                    ? "Good"
                    : "Needs Improvement"}
              </span>
            </div>
          </motion.div>

          {/* Production Volume */}
          <motion.div
            className="rounded-lg bg-blue-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Production Volume
                </p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {data.productionVolume.toLocaleString()}
                </h4>
              </div>
              <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                <Truck className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="mr-2 h-2.5 w-full max-w-[80%] rounded-full bg-gray-200 dark:bg-gray-600">
                <motion.div
                  className="h-2.5 rounded-full bg-blue-600"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(100, (data.productionVolume / data.plannedProduction) * 100)}%`,
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                ></motion.div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {Math.round(
                  (data.productionVolume / data.plannedProduction) * 100,
                )}
                %
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Target: {data.plannedProduction.toLocaleString()} units
            </p>
          </motion.div>

          {/* Defect Rate */}
          <motion.div
            className="rounded-lg bg-red-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Defect Rate
                </p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {data.defectRate.toFixed(1)}%
                </h4>
              </div>
              <div className="rounded-full bg-red-100 p-2 dark:bg-red-900">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-300" />
              </div>
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
              <motion.div
                className={`h-2.5 rounded-full ${
                  data.defectRate <= 1
                    ? "bg-green-500"
                    : data.defectRate <= 2
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, data.defectRate * 20)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Target: &lt;1.5%
            </p>
          </motion.div>

          {/* Downtime */}
          <motion.div
            className="rounded-lg bg-amber-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Downtime
                </p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {data.downtime.toFixed(1)} hrs
                </h4>
              </div>
              <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900">
                <Clock className="h-5 w-5 text-amber-600 dark:text-amber-300" />
              </div>
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
              <motion.div
                className={`h-2.5 rounded-full ${
                  data.downtime <= 3
                    ? "bg-green-500"
                    : data.downtime <= 5
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(100, (data.downtime / 8) * 100)}%`,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Scheduled: {data.maintenanceScheduled} hrs</span>
              <span>
                Unplanned:{" "}
                {(data.downtime - data.maintenanceScheduled).toFixed(1)} hrs
              </span>
            </div>
          </motion.div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 gap-6 p-6 pt-0 md:grid-cols-2">
          {/* OEE Components */}
          <motion.div
            className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-700 dark:text-white">
                OEE Components
              </h4>
              <Settings className="h-5 w-5 text-gray-500 dark:text-gray-300" />
            </div>
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Availability
                  </span>
                  <span className="text-sm font-medium text-gray-800 dark:text-white">
                    {data.availabilityRate}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
                  <motion.div
                    className="h-2 rounded-full bg-blue-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${data.availabilityRate}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Performance
                  </span>
                  <span className="text-sm font-medium text-gray-800 dark:text-white">
                    {data.performanceRate}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
                  <motion.div
                    className="h-2 rounded-full bg-amber-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${data.performanceRate}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Quality
                  </span>
                  <span className="text-sm font-medium text-gray-800 dark:text-white">
                    {data.qualityRate}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
                  <motion.div
                    className="h-2 rounded-full bg-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${data.qualityRate}%` }}
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
                      Cycle Time
                    </p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">
                      {data.cycleTime} sec
                    </p>
                  </div>
                  <div className="rounded-full bg-slate-100 p-2 dark:bg-slate-700">
                    <Clock className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-600">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Efficiency
                    </p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">
                      {data.productionEfficiency.toFixed(2)}%
                    </p>
                  </div>
                  <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                    <Zap className="h-4 w-4 text-green-600 dark:text-green-300" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Top Issues */}
          <motion.div
            className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-700 dark:text-white">
                Top Production Issues
              </h4>
              <AlertTriangle className="h-5 w-5 text-gray-500 dark:text-gray-300" />
            </div>
            <div className="space-y-4">
              {data.topIssues.map((issue, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-600"
                >
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-medium text-gray-800 dark:text-white">
                      {issue.name}
                    </h5>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        issue.impact === "High"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          : issue.impact === "Medium"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      }`}
                    >
                      {issue.impact}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Occurrences
                    </span>
                    <span className="text-sm font-medium text-gray-800 dark:text-white">
                      {issue.count}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-500">
                    <motion.div
                      className={`h-1.5 rounded-full ${
                        issue.impact === "High"
                          ? "bg-red-500"
                          : issue.impact === "Medium"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, issue.count * 5)}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Calendar className="mr-1 h-4 w-4" />
                <span>Last 24 hours</span>
              </div>
              <button className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
                View All Issues
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ManufacturingPerformanceKPISet;
