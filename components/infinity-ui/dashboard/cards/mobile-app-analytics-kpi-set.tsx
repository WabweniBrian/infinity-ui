"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Users,
  Clock,
  TrendingUp,
  TrendingDown,
  BarChart2,
  Download,
  Activity,
  AlertCircle,
  Zap,
  Calendar,
} from "lucide-react";

const MobileAppAnalyticsKPISet = () => {
  // Mock data with realistic mobile app metrics
  const [data, setData] = useState({
    dailyActiveUsers: 24567,
    monthlyActiveUsers: 87432,
    retentionRate: 68.5, // percentage
    averageSessionTime: 7.2, // minutes
    crashRate: 0.8, // percentage
    appDownloads: 3245, // today
    conversionRate: 4.2, // percentage
    churnRate: 2.8, // percentage
    userGrowth: 12.4, // percentage
    appRating: 4.7, // out of 5
    totalReviews: 12543,
    userEngagement: 76.3, // percentage
    platformDistribution: [
      { name: "iOS", percentage: 58, trend: "up" },
      { name: "Android", percentage: 42, trend: "stable" },
    ],
    topFeatures: [
      { name: "Social Feed", usage: 78.4, trend: "up" },
      { name: "Messaging", usage: 65.2, trend: "up" },
      { name: "Profile", usage: 52.7, trend: "stable" },
      { name: "Search", usage: 48.3, trend: "down" },
    ],
  });

  // Simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        dailyActiveUsers:
          prev.dailyActiveUsers + Math.floor(Math.random() * 50 - 10),
        retentionRate: Math.min(
          100,
          Math.max(60, prev.retentionRate + (Math.random() * 1 - 0.5)),
        ),
        averageSessionTime: Math.max(
          5,
          Math.min(10, prev.averageSessionTime + (Math.random() * 0.4 - 0.2)),
        ),
        crashRate: Math.max(
          0.1,
          Math.min(2, prev.crashRate + (Math.random() * 0.2 - 0.1)),
        ),
        appDownloads: prev.appDownloads + Math.floor(Math.random() * 10),
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
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">
              Mobile App Analytics
            </h3>
            <p className="text-sm text-cyan-100">Usage & Performance Metrics</p>
          </div>
          <Smartphone className="h-8 w-8 text-white" />
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Daily Active Users */}
        <motion.div
          className="rounded-lg bg-cyan-50 p-4 dark:bg-gray-700"
          variants={itemVariants}
        >
          <div className="mb-2 flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Daily Active Users
              </p>
              <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                {formatNumber(data.dailyActiveUsers)}
              </h4>
            </div>
            <div className="rounded-full bg-cyan-100 p-2 dark:bg-cyan-900">
              <Users className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <span className="flex items-center text-xs font-medium text-cyan-600 dark:text-cyan-400">
              <TrendingUp className="mr-1 h-3 w-3" />+{data.userGrowth}% this
              month
            </span>
          </div>
        </motion.div>

        {/* Retention Rate */}
        <motion.div
          className="rounded-lg bg-blue-50 p-4 dark:bg-gray-700"
          variants={itemVariants}
        >
          <div className="mb-2 flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Retention Rate
              </p>
              <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                {data.retentionRate.toFixed(1)}%
              </h4>
            </div>
            <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
              <Activity className="h-5 w-5 text-blue-600 dark:text-blue-300" />
            </div>
          </div>
          <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
            <motion.div
              className={`h-2.5 rounded-full ${
                data.retentionRate >= 70
                  ? "bg-green-500"
                  : data.retentionRate >= 60
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${data.retentionRate}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            ></motion.div>
          </div>
          <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Churn: {data.churnRate}%</span>
            <span>
              {data.retentionRate >= 70
                ? "Good"
                : data.retentionRate >= 60
                  ? "Average"
                  : "Needs Improvement"}
            </span>
          </div>
        </motion.div>

        {/* Average Session Time */}
        <motion.div
          className="rounded-lg bg-green-50 p-4 dark:bg-gray-700"
          variants={itemVariants}
        >
          <div className="mb-2 flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Avg. Session Time
              </p>
              <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                {data.averageSessionTime.toFixed(1)} min
              </h4>
            </div>
            <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
              <Clock className="h-5 w-5 text-green-600 dark:text-green-300" />
            </div>
          </div>
          <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
            <motion.div
              className="h-2.5 rounded-full bg-green-600"
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min(100, (data.averageSessionTime / 10) * 100)}%`,
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            ></motion.div>
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            User Engagement: {data.userEngagement}%
          </p>
        </motion.div>

        {/* Crash Rate */}
        <motion.div
          className="rounded-lg bg-red-50 p-4 dark:bg-gray-700"
          variants={itemVariants}
        >
          <div className="mb-2 flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Crash Rate
              </p>
              <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                {data.crashRate.toFixed(1)}%
              </h4>
            </div>
            <div className="rounded-full bg-red-100 p-2 dark:bg-red-900">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-300" />
            </div>
          </div>
          <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
            <motion.div
              className={`h-2.5 rounded-full ${
                data.crashRate <= 0.5
                  ? "bg-green-500"
                  : data.crashRate <= 1
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, data.crashRate * 50)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            ></motion.div>
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Target: &lt;0.5%
          </p>
        </motion.div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 gap-6 p-6 pt-0 md:grid-cols-2">
        {/* Platform & Downloads */}
        <motion.div
          className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
          variants={itemVariants}
        >
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-white">
              Platform & Downloads
            </h4>
            <Download className="h-5 w-5 text-gray-500 dark:text-gray-300" />
          </div>
          <div className="space-y-4">
            {data.platformDistribution.map((platform, index) => (
              <div key={index}>
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {platform.name}
                    </span>
                    {platform.trend === "up" && (
                      <TrendingUp className="ml-1 h-3 w-3 text-green-500" />
                    )}
                    {platform.trend === "down" && (
                      <TrendingDown className="ml-1 h-3 w-3 text-red-500" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-white">
                    {platform.percentage}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
                  <motion.div
                    className={`h-2 rounded-full ${index === 0 ? "bg-blue-500" : "bg-green-500"}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${platform.percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-600">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Today&apos;s Downloads
                  </p>
                  <p className="text-xl font-bold text-gray-800 dark:text-white">
                    {data.appDownloads}
                  </p>
                </div>
                <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                  <Download className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-600">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Conversion Rate
                  </p>
                  <p className="text-xl font-bold text-gray-800 dark:text-white">
                    {data.conversionRate}%
                  </p>
                </div>
                <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                  <Zap className="h-4 w-4 text-green-600 dark:text-green-300" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 rounded-lg bg-white p-3 shadow-sm dark:bg-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  App Rating
                </p>
                <div className="flex items-center">
                  <p className="mr-2 text-xl font-bold text-gray-800 dark:text-white">
                    {data.appRating}
                  </p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(data.appRating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formatNumber(data.totalReviews)} reviews
              </span>
            </div>
          </div>
        </motion.div>

        {/* Top Features */}
        <motion.div
          className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
          variants={itemVariants}
        >
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-white">
              Top Features by Usage
            </h4>
            <BarChart2 className="h-5 w-5 text-gray-500 dark:text-gray-300" />
          </div>
          <div className="space-y-4">
            {data.topFeatures.map((feature, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-600"
              >
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-medium text-gray-800 dark:text-white">
                    {feature.name}
                  </h5>
                  <div className="flex items-center">
                    <span className="mr-1 text-xs font-medium text-gray-600 dark:text-gray-300">
                      {feature.usage}%
                    </span>
                    {feature.trend === "up" && (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    )}
                    {feature.trend === "down" && (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                  </div>
                </div>
                <div className="mt-2">
                  <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-500">
                    <motion.div
                      className={`h-1.5 rounded-full ${
                        index === 0
                          ? "bg-cyan-500"
                          : index === 1
                            ? "bg-blue-500"
                            : index === 2
                              ? "bg-purple-500"
                              : "bg-green-500"
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${feature.usage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    ></motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Calendar className="mr-1 h-4 w-4" />
              <span>Last 30 days</span>
            </div>
            <button className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-400">
              View All Features
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MobileAppAnalyticsKPISet;
