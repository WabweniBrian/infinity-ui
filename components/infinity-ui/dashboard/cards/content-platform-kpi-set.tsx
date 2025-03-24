"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Eye,
  ThumbsUp,
  MessageCircle,
  Share2,
  Clock,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const ContentPlatformKPISet = () => {
  const [data, setData] = useState({
    views: 1245789,
    viewsChange: 18.3,
    viewsTrend: "increase" as "increase" | "decrease",
    watchTime: 87432,
    watchTimeChange: 12.7,
    watchTimeTrend: "increase" as "increase" | "decrease",
    engagement: 4.8,
    engagementChange: 0.7,
    engagementTrend: "increase" as "increase" | "decrease",
    subscribers: 24580,
    subscribersChange: 5.2,
    subscribersTrend: "increase" as "increase" | "decrease",
    timeframe: "Last 28 days",
    engagementBreakdown: {
      likes: 32450,
      comments: 4872,
      shares: 8745,
    },
    topContent: [
      {
        title: "How to Build a Website in 2023",
        views: 145872,
        engagement: 8.7,
      },
      {
        title: "10 Tips for Better Productivity",
        views: 98745,
        engagement: 7.2,
      },
      { title: "Learn JavaScript in 30 Days", views: 87621, engagement: 6.9 },
    ],
  });

  // Animation states
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Format large numbers
  const formatNumber = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  // Format time (minutes to hours and minutes)
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 dark:bg-slate-950">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-7xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-slate-900">
        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white sm:text-xl">
                Content Performance
              </h3>
              <p className="mt-1 text-red-100">{data.timeframe}</p>
            </div>
            <div className="shrink-0 rounded-full bg-white/20 px-4 py-1 text-xs font-medium text-white sm:text-sm">
              Creator Studio
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 p-6 md:grid-cols-4">
          {/* Views */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <div className="flex items-center">
              <div className="mr-3 rounded-lg bg-red-100 p-2 dark:bg-red-900/30">
                <Eye className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Views
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white">
              {formatNumber(data.views)}
            </div>
            <div
              className={`flex items-center text-sm ${
                data.viewsTrend === "increase"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {data.viewsTrend === "increase" ? (
                <TrendingUp className="mr-1 h-4 w-4" />
              ) : (
                <TrendingDown className="mr-1 h-4 w-4" />
              )}
              {data.viewsChange}% vs. previous
            </div>
          </motion.div>
          {/* Watch Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-2"
          >
            <div className="flex items-center">
              <div className="mr-3 rounded-lg bg-orange-100 p-2 dark:bg-orange-900/30">
                <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Watch Time
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white">
              {formatTime(data.watchTime)}
            </div>
            <div
              className={`flex items-center text-sm ${
                data.watchTimeTrend === "increase"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {data.watchTimeTrend === "increase" ? (
                <TrendingUp className="mr-1 h-4 w-4" />
              ) : (
                <TrendingDown className="mr-1 h-4 w-4" />
              )}
              {data.watchTimeChange}% vs. previous
            </div>
          </motion.div>
          {/* Engagement Rate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-2"
          >
            <div className="flex items-center">
              <div className="mr-3 rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                <ThumbsUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Engagement
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white">
              {data.engagement}%
            </div>
            <div
              className={`flex items-center text-sm ${
                data.engagementTrend === "increase"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {data.engagementTrend === "increase" ? (
                <TrendingUp className="mr-1 h-4 w-4" />
              ) : (
                <TrendingDown className="mr-1 h-4 w-4" />
              )}
              {data.engagementChange}% vs. previous
            </div>
          </motion.div>
          {/* Subscribers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-2"
          >
            <div className="flex items-center">
              <div className="mr-3 rounded-lg bg-purple-100 p-2 dark:bg-purple-900/30">
                <Play className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Subscribers
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white">
              {formatNumber(data.subscribers)}
            </div>
            <div
              className={`flex items-center text-sm ${
                data.subscribersTrend === "increase"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {data.subscribersTrend === "increase" ? (
                <TrendingUp className="mr-1 h-4 w-4" />
              ) : (
                <TrendingDown className="mr-1 h-4 w-4" />
              )}
              {data.subscribersChange}% vs. previous
            </div>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 gap-6 px-6 pb-6 md:grid-cols-2">
          {/* Engagement Breakdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              scale: isVisible ? 1 : 0.95,
            }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-lg bg-gray-50 p-4 dark:bg-slate-800"
          >
            <h4 className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
              Engagement Breakdown
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ThumbsUp className="mr-2 h-4 w-4 text-red-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Likes
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-800 dark:text-white">
                  {formatNumber(data.engagementBreakdown.likes)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MessageCircle className="mr-2 h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Comments
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-800 dark:text-white">
                  {formatNumber(data.engagementBreakdown.comments)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Share2 className="mr-2 h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Shares
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-800 dark:text-white">
                  {formatNumber(data.engagementBreakdown.shares)}
                </span>
              </div>
            </div>
          </motion.div>
          {/* Top Performing Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              scale: isVisible ? 1 : 0.95,
            }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="rounded-lg bg-gray-50 p-4 dark:bg-slate-800"
          >
            <h4 className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
              Top Performing Content
            </h4>
            <div className="space-y-3">
              {data.topContent.map((content, index) => (
                <motion.div
                  key={index}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{
                    x: isVisible ? 0 : 20,
                    opacity: isVisible ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex-1">
                    <p className="truncate text-sm font-medium text-gray-800 dark:text-white">
                      {content.title}
                    </p>
                    <div className="mt-1 flex items-center">
                      <Eye className="mr-1 h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatNumber(content.views)}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    {content.engagement}% Eng
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContentPlatformKPISet;
