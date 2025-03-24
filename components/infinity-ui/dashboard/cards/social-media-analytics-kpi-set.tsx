"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Heart,
  Share2,
  Users,
  TrendingUp,
  TrendingDown,
  Eye,
  Calendar,
  Clock,
  Zap,
  Globe,
} from "lucide-react";

const SocialMediaAnalyticsKPISet = () => {
  // Mock data with realistic social media metrics
  const [data, setData] = useState({
    followers: 124567,
    followersGrowth: 3.8,
    engagement: 4.2, // percentage
    impressions: 1245000,
    reach: 875000,
    clickThroughRate: 2.8, // percentage
    averageResponse: 42, // minutes
    postFrequency: 3.5, // per day
    topPerformingContent: [
      { type: "Video", engagement: 6.8, impressions: 85000, shares: 1245 },
      { type: "Image", engagement: 4.2, impressions: 62000, shares: 845 },
      { type: "Text", engagement: 2.1, impressions: 28000, shares: 320 },
    ],
    platformPerformance: [
      { name: "Instagram", followers: 58400, engagement: 5.2, growth: 4.2 },
      { name: "Twitter", followers: 32500, engagement: 3.8, growth: 2.1 },
      { name: "Facebook", followers: 24800, engagement: 2.4, growth: 1.5 },
      { name: "LinkedIn", followers: 8867, engagement: 3.2, growth: 5.8 },
    ],
    audienceDemographics: {
      age: [
        { group: "18-24", percentage: 28 },
        { group: "25-34", percentage: 42 },
        { group: "35-44", percentage: 18 },
        { group: "45+", percentage: 12 },
      ],
      gender: [
        { type: "Male", percentage: 48 },
        { type: "Female", percentage: 51 },
        { type: "Other", percentage: 1 },
      ],
    },
  });

  // Simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        followers: prev.followers + Math.floor(Math.random() * 50 - 10),
        followersGrowth: Math.max(
          0,
          Math.min(8, prev.followersGrowth + (Math.random() * 0.4 - 0.2)),
        ),
        engagement: Math.max(
          1,
          Math.min(8, prev.engagement + (Math.random() * 0.2 - 0.1)),
        ),
        impressions: prev.impressions + Math.floor(Math.random() * 5000 - 1000),
        reach: prev.reach + Math.floor(Math.random() * 3000 - 1000),
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
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">
              Social Media Analytics
            </h3>
            <p className="text-sm text-pink-100">
              Engagement & Audience Metrics
            </p>
          </div>
          <MessageCircle className="h-8 w-8 text-white" />
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Followers */}
        <motion.div
          className="rounded-lg bg-pink-50 p-4 dark:bg-gray-700"
          variants={itemVariants}
        >
          <div className="mb-2 flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Followers
              </p>
              <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                {formatNumber(data.followers)}
              </h4>
            </div>
            <div className="rounded-full bg-pink-100 p-2 dark:bg-pink-900">
              <Users className="h-5 w-5 text-pink-600 dark:text-pink-300" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <span
              className={`flex items-center text-xs font-medium ${
                data.followersGrowth >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {data.followersGrowth >= 0 ? (
                <TrendingUp className="mr-1 h-3 w-3" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3" />
              )}
              {Math.abs(data.followersGrowth).toFixed(1)}% this month
            </span>
          </div>
        </motion.div>

        {/* Engagement Rate */}
        <motion.div
          className="rounded-lg bg-rose-50 p-4 dark:bg-gray-700"
          variants={itemVariants}
        >
          <div className="mb-2 flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Engagement Rate
              </p>
              <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                {data.engagement.toFixed(1)}%
              </h4>
            </div>
            <div className="rounded-full bg-rose-100 p-2 dark:bg-rose-900">
              <Heart className="h-5 w-5 text-rose-600 dark:text-rose-300" />
            </div>
          </div>
          <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
            <motion.div
              className={`h-2.5 rounded-full ${
                data.engagement >= 4
                  ? "bg-green-500"
                  : data.engagement >= 2
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, data.engagement * 10)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            ></motion.div>
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Industry Average: 3.2%
          </p>
        </motion.div>

        {/* Impressions */}
        <motion.div
          className="rounded-lg bg-purple-50 p-4 dark:bg-gray-700"
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
            <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900">
              <Eye className="h-5 w-5 text-purple-600 dark:text-purple-300" />
            </div>
          </div>
          <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Reach: {formatNumber(data.reach)}</span>
            <span>CTR: {data.clickThroughRate}%</span>
          </div>
        </motion.div>

        {/* Response Time */}
        <motion.div
          className="rounded-lg bg-blue-50 p-4 dark:bg-gray-700"
          variants={itemVariants}
        >
          <div className="mb-2 flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Avg. Response Time
              </p>
              <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                {data.averageResponse} min
              </h4>
            </div>
            <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-300" />
            </div>
          </div>
          <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
            <motion.div
              className={`h-2.5 rounded-full ${
                data.averageResponse <= 30
                  ? "bg-green-500"
                  : data.averageResponse <= 60
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min(100, (data.averageResponse / 120) * 100)}%`,
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            ></motion.div>
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Post Frequency: {data.postFrequency}/day
          </p>
        </motion.div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 gap-6 p-6 pt-0 md:grid-cols-2">
        {/* Platform Performance */}
        <motion.div
          className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
          variants={itemVariants}
        >
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-white">
              Platform Performance
            </h4>
            <Globe className="h-5 w-5 text-gray-500 dark:text-gray-300" />
          </div>
          <div className="space-y-4">
            {data.platformPerformance.map((platform, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-600"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h5 className="text-sm font-medium text-gray-800 dark:text-white">
                    {platform.name}
                  </h5>
                  <div className="flex items-center">
                    <span
                      className={`flex items-center text-xs font-medium ${
                        platform.growth >= 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      } mr-2`}
                    >
                      {platform.growth >= 0 ? (
                        <TrendingUp className="mr-1 h-3 w-3" />
                      ) : (
                        <TrendingDown className="mr-1 h-3 w-3" />
                      )}
                      {Math.abs(platform.growth).toFixed(1)}%
                    </span>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      {formatNumber(platform.followers)}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Followers
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-500">
                      <motion.div
                        className={`h-1.5 rounded-full ${
                          index === 0
                            ? "bg-pink-500"
                            : index === 1
                              ? "bg-blue-500"
                              : index === 2
                                ? "bg-blue-700"
                                : "bg-blue-400"
                        }`}
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(platform.followers / data.platformPerformance[0].followers) * 100}%`,
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      ></motion.div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Engagement
                      </span>
                      <span className="text-xs font-medium text-gray-800 dark:text-white">
                        {platform.engagement}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-500">
                      <motion.div
                        className={`h-1.5 rounded-full ${
                          platform.engagement >= 4
                            ? "bg-green-500"
                            : platform.engagement >= 2
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.min(100, platform.engagement * 10)}%`,
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      ></motion.div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Performing Content */}
        <motion.div
          className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
          variants={itemVariants}
        >
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-white">
              Top Performing Content
            </h4>
            <Zap className="h-5 w-5 text-gray-500 dark:text-gray-300" />
          </div>
          <div className="space-y-4">
            {data.topPerformingContent.map((content, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-600"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h5 className="text-sm font-medium text-gray-800 dark:text-white">
                    {content.type} Content
                  </h5>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      index === 0
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : index === 1
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    }`}
                  >
                    Rank #{index + 1}
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <div className="rounded-md bg-gray-50 p-2 dark:bg-gray-700">
                    <div className="flex flex-col items-center">
                      <Heart className="mb-1 h-4 w-4 text-rose-500" />
                      <span className="text-xs font-medium text-gray-800 dark:text-white">
                        {content.engagement}%
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Engagement
                      </span>
                    </div>
                  </div>
                  <div className="rounded-md bg-gray-50 p-2 dark:bg-gray-700">
                    <div className="flex flex-col items-center">
                      <Eye className="mb-1 h-4 w-4 text-purple-500" />
                      <span className="text-xs font-medium text-gray-800 dark:text-white">
                        {formatNumber(content.impressions)}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Impressions
                      </span>
                    </div>
                  </div>
                  <div className="rounded-md bg-gray-50 p-2 dark:bg-gray-700">
                    <div className="flex flex-col items-center">
                      <Share2 className="mb-1 h-4 w-4 text-blue-500" />
                      <span className="text-xs font-medium text-gray-800 dark:text-white">
                        {formatNumber(content.shares)}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Shares
                      </span>
                    </div>
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
            <button className="text-sm font-medium text-pink-600 hover:underline dark:text-pink-400">
              View Content Analytics
            </button>
          </div>
        </motion.div>
      </div>

      {/* Audience Demographics */}
      <div className="p-6 pt-0">
        <motion.div
          className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
          variants={itemVariants}
        >
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-white">
              Audience Demographics
            </h4>
            <Users className="h-5 w-5 text-gray-500 dark:text-gray-300" />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h5 className="mb-3 text-sm font-medium text-gray-700 dark:text-white">
                Age Distribution
              </h5>
              <div className="space-y-3">
                {data.audienceDemographics.age.map((age, index) => (
                  <div key={index}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {age.group}
                      </span>
                      <span className="text-sm font-medium text-gray-800 dark:text-white">
                        {age.percentage}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
                      <motion.div
                        className={`h-2 rounded-full ${
                          index === 0
                            ? "bg-pink-400"
                            : index === 1
                              ? "bg-pink-500"
                              : index === 2
                                ? "bg-pink-600"
                                : "bg-pink-700"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${age.percentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h5 className="mb-3 text-sm font-medium text-gray-700 dark:text-white">
                Gender Distribution
              </h5>
              <div className="relative h-40">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  {data.audienceDemographics.gender.map((gender, index) => {
                    // Calculate the segment of the pie chart
                    const startAngle =
                      index === 0
                        ? 0
                        : data.audienceDemographics.gender
                            .slice(0, index)
                            .reduce((sum, g) => sum + g.percentage, 0) * 3.6;
                    const endAngle = startAngle + gender.percentage * 3.6;

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
                    const colors = ["#ec4899", "#3b82f6", "#8b5cf6"];

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
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-white p-2 shadow-md dark:bg-gray-700">
                    <span className="text-sm font-bold text-gray-800 dark:text-white">
                      100%
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-center space-x-4">
                {data.audienceDemographics.gender.map((gender, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className={`mr-2 h-3 w-3 rounded-full ${
                        index === 0
                          ? "bg-pink-500"
                          : index === 1
                            ? "bg-blue-500"
                            : "bg-purple-500"
                      }`}
                    ></div>
                    <span className="text-xs text-gray-600 dark:text-gray-300">
                      {gender.type} ({gender.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SocialMediaAnalyticsKPISet;
