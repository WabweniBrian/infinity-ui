"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  Droplet,
  Sun,
  TrendingUp,
  TrendingDown,
  BarChart2,
  Users,
  Calendar,
  Recycle,
  Globe,
} from "lucide-react";

const SustainabilityESGKPISet = () => {
  // Mock data with realistic sustainability metrics
  const [data, setData] = useState({
    carbonFootprint: 12450, // tons CO2e
    carbonReduction: 8.4, // percentage YoY
    energyConsumption: 24.8, // GWh
    renewableEnergy: 42.5, // percentage
    waterUsage: 185000, // cubic meters
    wasteRecycled: 78.2, // percentage
    sustainabilityScore: 72, // out of 100
    employeeDiversity: 68, // percentage
    communityInvestment: 1.85, // million dollars
    sustainableSuppliers: 64, // percentage
    environmentalIncidents: 3,
    carbonIntensity: 0.42, // tons CO2e per million revenue
    environmentalMetrics: [
      {
        name: "Carbon Emissions",
        current: 12450,
        previous: 13590,
        unit: "tons CO2e",
      },
      {
        name: "Energy Consumption",
        current: 24.8,
        previous: 26.2,
        unit: "GWh",
      },
      { name: "Water Usage", current: 185000, previous: 198000, unit: "m³" },
      { name: "Waste Generated", current: 4250, previous: 4680, unit: "tons" },
    ],
    esgRatings: [
      { category: "Environmental", score: 76, industry: 68 },
      { category: "Social", score: 72, industry: 65 },
      { category: "Governance", score: 84, industry: 72 },
    ],
  });

  // Simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        carbonFootprint: Math.max(
          10000,
          Math.min(15000, prev.carbonFootprint + (Math.random() * 100 - 50)),
        ),
        carbonReduction: Math.max(
          0,
          Math.min(15, prev.carbonReduction + (Math.random() * 0.4 - 0.2)),
        ),
        renewableEnergy: Math.min(
          100,
          Math.max(30, prev.renewableEnergy + (Math.random() * 1 - 0.5)),
        ),
        wasteRecycled: Math.min(
          100,
          Math.max(60, prev.wasteRecycled + (Math.random() * 1 - 0.5)),
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

  // Format large numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <motion.div
      className="overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">
              Sustainability & ESG
            </h3>
            <p className="text-sm text-green-100">
              Environmental, Social & Governance Metrics
            </p>
          </div>
          <Leaf className="h-8 w-8 text-white" />
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Carbon Footprint */}
        <motion.div
          className="rounded-lg bg-green-50 p-4 dark:bg-gray-700"
          variants={itemVariants}
        >
          <div className="mb-2 flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Carbon Footprint
              </p>
              <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                {formatNumber(data.carbonFootprint)} tons
              </h4>
            </div>
            <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
              <Leaf className="h-5 w-5 text-green-600 dark:text-green-300" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <span
              className={`flex items-center text-xs font-medium ${
                data.carbonReduction >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {data.carbonReduction >= 0 ? (
                <TrendingDown className="mr-1 h-3 w-3" />
              ) : (
                <TrendingUp className="mr-1 h-3 w-3" />
              )}
              {Math.abs(data.carbonReduction).toFixed(1)}% reduction YoY
            </span>
          </div>
        </motion.div>

        {/* Renewable Energy */}
        <motion.div
          className="rounded-lg bg-yellow-50 p-4 dark:bg-gray-700"
          variants={itemVariants}
        >
          <div className="mb-2 flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Renewable Energy
              </p>
              <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                {data.renewableEnergy.toFixed(1)}%
              </h4>
            </div>
            <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900">
              <Sun className="h-5 w-5 text-yellow-600 dark:text-yellow-300" />
            </div>
          </div>
          <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
            <motion.div
              className={`h-2.5 rounded-full ${
                data.renewableEnergy >= 50
                  ? "bg-green-500"
                  : data.renewableEnergy >= 30
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${data.renewableEnergy}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            ></motion.div>
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Target: 60% by 2025
          </p>
        </motion.div>

        {/* Water Usage */}
        <motion.div
          className="rounded-lg bg-blue-50 p-4 dark:bg-gray-700"
          variants={itemVariants}
        >
          <div className="mb-2 flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Water Usage
              </p>
              <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                {formatNumber(data.waterUsage)} m³
              </h4>
            </div>
            <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
              <Droplet className="h-5 w-5 text-blue-600 dark:text-blue-300" />
            </div>
          </div>
          <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>YoY Change:</span>
            <span className="text-green-600 dark:text-green-400">-6.6%</span>
          </div>
        </motion.div>

        {/* Waste Recycled */}
        <motion.div
          className="rounded-lg bg-teal-50 p-4 dark:bg-gray-700"
          variants={itemVariants}
        >
          <div className="mb-2 flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Waste Recycled
              </p>
              <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                {data.wasteRecycled.toFixed(1)}%
              </h4>
            </div>
            <div className="rounded-full bg-teal-100 p-2 dark:bg-teal-900">
              <Recycle className="h-5 w-5 text-teal-600 dark:text-teal-300" />
            </div>
          </div>
          <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
            <motion.div
              className={`h-2.5 rounded-full ${
                data.wasteRecycled >= 75
                  ? "bg-green-500"
                  : data.wasteRecycled >= 50
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${data.wasteRecycled}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            ></motion.div>
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Target: 85% by 2025
          </p>
        </motion.div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 gap-6 p-6 pt-0 md:grid-cols-2">
        {/* Environmental Metrics */}
        <motion.div
          className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
          variants={itemVariants}
        >
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-white">
              Environmental Metrics
            </h4>
            <BarChart2 className="h-5 w-5 text-gray-500 dark:text-gray-300" />
          </div>
          <div className="space-y-4">
            {data.environmentalMetrics.map((metric, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-600"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h5 className="text-sm font-medium text-gray-800 dark:text-white">
                    {metric.name}
                  </h5>
                  <div className="flex items-center">
                    <span
                      className={`flex items-center text-xs font-medium ${
                        metric.current < metric.previous
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      } mr-2`}
                    >
                      {metric.current < metric.previous ? (
                        <TrendingDown className="mr-1 h-3 w-3" />
                      ) : (
                        <TrendingUp className="mr-1 h-3 w-3" />
                      )}
                      {Math.abs(
                        ((metric.previous - metric.current) / metric.previous) *
                          100,
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {metric.current} {metric.unit}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Previous: {metric.previous} {metric.unit}
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-500">
                  <motion.div
                    className={`h-1.5 rounded-full ${metric.current < metric.previous ? "bg-green-500" : "bg-red-500"}`}
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(metric.current / metric.previous) * 100}%`,
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ESG Ratings */}
        <motion.div
          className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
          variants={itemVariants}
        >
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-white">
              ESG Ratings
            </h4>
            <Globe className="h-5 w-5 text-gray-500 dark:text-gray-300" />
          </div>
          <div className="space-y-4">
            {data.esgRatings.map((rating, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-600"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h5 className="text-sm font-medium text-gray-800 dark:text-white">
                    {rating.category}
                  </h5>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      rating.score >= 75
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : rating.score >= 65
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    {rating.score >= 75
                      ? "Leader"
                      : rating.score >= 65
                        ? "Average"
                        : "Laggard"}
                  </span>
                </div>
                <div className="mt-2">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Score
                    </span>
                    <div className="flex items-center">
                      <span className="mr-2 text-xs font-medium text-gray-800 dark:text-white">
                        {rating.score}/100
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Industry Avg: {rating.industry}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-500">
                    <motion.div
                      className={`h-2 rounded-full ${
                        index === 0
                          ? "bg-green-500"
                          : index === 1
                            ? "bg-blue-500"
                            : "bg-purple-500"
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${rating.score}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    ></motion.div>
                  </div>
                  <div className="mt-1 h-1 w-full rounded-full bg-gray-200 opacity-60 dark:bg-gray-500">
                    <div
                      className="h-1 rounded-full bg-gray-400 dark:bg-gray-400"
                      style={{ width: `${rating.industry}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Calendar className="mr-1 h-4 w-4" />
              <span>Last updated: June 2023</span>
            </div>
            <button className="text-sm font-medium text-green-600 hover:underline dark:text-green-400">
              View Sustainability Report
            </button>
          </div>
        </motion.div>
      </div>

      {/* Social & Governance Indicators */}
      <div className="grid grid-cols-1 gap-6 p-6 pt-0 md:grid-cols-3">
        <motion.div
          className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700"
          variants={itemVariants}
        >
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Employee Diversity
            </p>
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${
                data.employeeDiversity >= 70
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : data.employeeDiversity >= 60
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }`}
            >
              {data.employeeDiversity >= 70
                ? "Strong"
                : data.employeeDiversity >= 60
                  ? "Good"
                  : "Needs Improvement"}
            </span>
          </div>
          <h4 className="text-xl font-bold text-gray-800 dark:text-white">
            {data.employeeDiversity}%
          </h4>
          <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
            <motion.div
              className="h-2 rounded-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${data.employeeDiversity}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            ></motion.div>
          </div>
          <div className="mt-2 flex items-center">
            <Users className="mr-1 h-3 w-3 text-blue-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Target: 75% by 2025
            </span>
          </div>
        </motion.div>

        <motion.div
          className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700"
          variants={itemVariants}
        >
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Community Investment
            </p>
            <span
              className={`rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200`}
            >
              On Target
            </span>
          </div>
          <h4 className="text-xl font-bold text-gray-800 dark:text-white">
            ${data.communityInvestment}M
          </h4>
          <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
            <motion.div
              className="h-2 rounded-full bg-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${(data.communityInvestment / 2) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            ></motion.div>
          </div>
          <div className="mt-2 flex items-center">
            <Globe className="mr-1 h-3 w-3 text-purple-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              1.2% of annual revenue
            </span>
          </div>
        </motion.div>

        <motion.div
          className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700"
          variants={itemVariants}
        >
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Sustainable Suppliers
            </p>
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${
                data.sustainableSuppliers >= 70
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : data.sustainableSuppliers >= 50
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }`}
            >
              {data.sustainableSuppliers >= 70
                ? "Good Progress"
                : data.sustainableSuppliers >= 50
                  ? "On Track"
                  : "Behind Target"}
            </span>
          </div>
          <h4 className="text-xl font-bold text-gray-800 dark:text-white">
            {data.sustainableSuppliers}%
          </h4>
          <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
            <motion.div
              className="h-2 rounded-full bg-teal-500"
              initial={{ width: 0 }}
              animate={{ width: `${data.sustainableSuppliers}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            ></motion.div>
          </div>
          <div className="mt-2 flex items-center">
            <Leaf className="mr-1 h-3 w-3 text-teal-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Target: 80% by 2025
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SustainabilityESGKPISet;
