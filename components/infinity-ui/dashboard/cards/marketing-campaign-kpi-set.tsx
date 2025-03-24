"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  DollarSign,
  Users,
  Eye,
  MousePointer,
  BarChart2,
  Target,
  Share2,
} from "lucide-react";

const MarketingCampaignKPISet = () => {
  // Mock data with realistic marketing metrics
  const [data, setData] = useState({
    impressions: 245678,
    clicks: 12345,
    conversions: 2876,
    ctr: 5.02, // Click-through rate
    conversionRate: 23.3,
    cpa: 18.75, // Cost per acquisition
    roi: 324, // Return on investment
    campaignBudget: 25000,
    campaignSpend: 18750,
    socialShares: 3245,
    channelPerformance: [
      { name: "Social Media", conversions: 1245, cpa: 12.5, share: 43 },
      { name: "Search", conversions: 876, cpa: 22.75, share: 30 },
      { name: "Email", conversions: 512, cpa: 8.25, share: 18 },
      { name: "Display", conversions: 243, cpa: 31.2, share: 9 },
    ],
  });

  // Simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        impressions: prev.impressions + Math.floor(Math.random() * 500),
        clicks: prev.clicks + Math.floor(Math.random() * 50),
        conversions: prev.conversions + Math.floor(Math.random() * 10),
        ctr: Number.parseFloat(
          ((prev.clicks / prev.impressions) * 100).toFixed(2),
        ),
        conversionRate: Number.parseFloat(
          ((prev.conversions / prev.clicks) * 100).toFixed(1),
        ),
        campaignSpend: Math.min(
          prev.campaignBudget,
          prev.campaignSpend + Math.floor(Math.random() * 100),
        ),
        socialShares: prev.socialShares + Math.floor(Math.random() * 20),
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

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <motion.div
      className="overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">Marketing Campaign</h3>
            <p className="text-sm text-pink-100">Performance & ROI Metrics</p>
          </div>
          <Target className="h-8 w-8 text-white" />
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Impressions */}
        <motion.div
          className="rounded-lg bg-pink-50 p-4 dark:bg-gray-700"
          variants={itemVariants}
        >
          <div className="mb-2 flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Impressions
              </p>
              <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                {formatNumber(data.impressions)}
              </h4>
            </div>
            <div className="rounded-full bg-pink-100 p-2 dark:bg-pink-900">
              <Eye className="h-5 w-5 text-pink-600 dark:text-pink-300" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <span className="flex items-center text-xs font-medium text-pink-600 dark:text-pink-400">
              <TrendingUp className="mr-1 h-3 w-3" />+
              {Math.floor(Math.random() * 10 + 15)}% this week
            </span>
          </div>
        </motion.div>

        {/* Click-Through Rate */}
        <motion.div
          className="rounded-lg bg-rose-50 p-4 dark:bg-gray-700"
          variants={itemVariants}
        >
          <div className="mb-2 flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Click-Through Rate
              </p>
              <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                {data.ctr}%
              </h4>
            </div>
            <div className="rounded-full bg-rose-100 p-2 dark:bg-rose-900">
              <MousePointer className="h-5 w-5 text-rose-600 dark:text-rose-300" />
            </div>
          </div>
          <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
            <motion.div
              className={`h-2.5 rounded-full ${
                data.ctr > 5
                  ? "bg-green-500"
                  : data.ctr > 3
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, data.ctr * 10)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            ></motion.div>
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Industry avg: 3.2%
          </p>
        </motion.div>

        {/* Conversion Rate */}
        <motion.div
          className="rounded-lg bg-purple-50 p-4 dark:bg-gray-700"
          variants={itemVariants}
        >
          <div className="mb-2 flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Conversion Rate
              </p>
              <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                {data.conversionRate}%
              </h4>
            </div>
            <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900">
              <Users className="h-5 w-5 text-purple-600 dark:text-purple-300" />
            </div>
          </div>
          <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
            <motion.div
              className="h-2.5 rounded-full bg-purple-600"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, data.conversionRate * 3)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            ></motion.div>
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {data.conversionRate > 20
              ? "Excellent"
              : data.conversionRate > 15
                ? "Good"
                : "Needs Improvement"}
          </p>
        </motion.div>

        {/* ROI */}
        <motion.div
          className="rounded-lg bg-green-50 p-4 dark:bg-gray-700"
          variants={itemVariants}
        >
          <div className="mb-2 flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-300">ROI</p>
              <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                {data.roi}%
              </h4>
            </div>
            <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
              <DollarSign className="h-5 w-5 text-green-600 dark:text-green-300" />
            </div>
          </div>
          <div className="relative pt-1">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <span
                  className={`inline-block rounded-full px-2 py-1 text-xs font-semibold uppercase ${
                    data.roi > 300
                      ? "bg-green-200 text-green-600 dark:bg-green-900 dark:text-green-200"
                      : data.roi > 200
                        ? "bg-blue-200 text-blue-600 dark:bg-blue-900 dark:text-blue-200"
                        : "bg-yellow-200 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-200"
                  }`}
                >
                  {data.roi > 300
                    ? "Exceptional"
                    : data.roi > 200
                      ? "Good"
                      : "Average"}
                </span>
              </div>
            </div>
            <div className="mb-0 flex h-2 overflow-hidden rounded-full bg-gray-200 text-xs dark:bg-gray-600">
              <motion.div
                style={{ width: `${Math.min(100, data.roi / 5)}%` }}
                className="flex flex-col justify-center whitespace-nowrap bg-green-500 text-center text-white shadow-none"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, data.roi / 5)}%` }}
                transition={{ duration: 1 }}
              ></motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 gap-6 p-6 pt-0 md:grid-cols-2">
        {/* Budget & Spend */}
        <motion.div
          className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
          variants={itemVariants}
        >
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-white">
              Budget & Spend
            </h4>
            <BarChart2 className="h-5 w-5 text-gray-500 dark:text-gray-300" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Campaign Budget
                </span>
                <span className="text-sm font-medium text-gray-800 dark:text-white">
                  {formatCurrency(data.campaignBudget)}
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
                <motion.div
                  className="h-2.5 rounded-full bg-blue-600"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                ></motion.div>
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Campaign Spend
                </span>
                <span className="text-sm font-medium text-gray-800 dark:text-white">
                  {formatCurrency(data.campaignSpend)}
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
                <motion.div
                  className="h-2.5 rounded-full bg-pink-600"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(data.campaignSpend / data.campaignBudget) * 100}%`,
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                ></motion.div>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {Math.round((data.campaignSpend / data.campaignBudget) * 100)}
                  % of budget used
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatCurrency(data.campaignBudget - data.campaignSpend)}{" "}
                  remaining
                </span>
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Cost Per Acquisition
                </span>
                <span className="text-sm font-medium text-gray-800 dark:text-white">
                  ${data.cpa.toFixed(2)}
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
                <motion.div
                  className={`h-2.5 rounded-full ${
                    data.cpa < 15
                      ? "bg-green-500"
                      : data.cpa < 25
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(100, (data.cpa / 30) * 100)}%`,
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                ></motion.div>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Target: $15.00
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {data.cpa < 15 ? "Under target" : "Over target"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Channel Performance */}
        <motion.div
          className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
          variants={itemVariants}
        >
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-white">
              Channel Performance
            </h4>
            <Share2 className="h-5 w-5 text-gray-500 dark:text-gray-300" />
          </div>
          <div className="space-y-4">
            {data.channelPerformance.map((channel, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-600"
              >
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-medium text-gray-800 dark:text-white">
                    {channel.name}
                  </h5>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    {channel.share}% of conversions
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Conversions
                    </span>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      {channel.conversions}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      CPA
                    </span>
                    <p
                      className={`text-sm font-medium ${
                        channel.cpa < 15
                          ? "text-green-600 dark:text-green-400"
                          : channel.cpa < 25
                            ? "text-yellow-600 dark:text-yellow-400"
                            : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      ${channel.cpa.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-500">
                  <motion.div
                    className={`h-1.5 rounded-full ${
                      index === 0
                        ? "bg-pink-500"
                        : index === 1
                          ? "bg-purple-500"
                          : index === 2
                            ? "bg-blue-500"
                            : "bg-green-500"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${channel.share}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MarketingCampaignKPISet;
