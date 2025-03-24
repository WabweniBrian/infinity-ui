"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  BarChart2,
  ThumbsUp,
  AlertCircle,
  PhoneCall,
  Mail,
  Calendar,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const CustomerSupportKPISet = () => {
  // Mock data with realistic customer support metrics
  const [data, setData] = useState({
    ticketsResolved: 1247,
    totalTickets: 1325,
    firstResponseTime: 28, // minutes
    averageResolutionTime: 4.2, // hours
    customerSatisfaction: 92, // percentage
    reopenRate: 3.8, // percentage
    agentUtilization: 87.5, // percentage
    backlog: 78,
    callsAnswered: 432,
    callsAbandoned: 24,
    emailsReceived: 865,
    channelDistribution: [
      { name: "Phone", percentage: 35, trend: "down" },
      { name: "Email", percentage: 42, trend: "up" },
      { name: "Chat", percentage: 18, trend: "up" },
      { name: "Social", percentage: 5, trend: "stable" },
    ],
    topIssueCategories: [
      { name: "Technical Support", count: 487, percentage: 36.8 },
      { name: "Billing Inquiries", count: 324, percentage: 24.5 },
      { name: "Product Information", count: 276, percentage: 20.8 },
      { name: "Returns & Refunds", count: 238, percentage: 17.9 },
    ],
  });

  // Simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        ticketsResolved: prev.ticketsResolved + (Math.random() > 0.7 ? 1 : 0),
        firstResponseTime: Math.max(
          15,
          Math.min(40, prev.firstResponseTime + (Math.random() * 3 - 1.5)),
        ),
        customerSatisfaction: Math.min(
          100,
          Math.max(85, prev.customerSatisfaction + (Math.random() * 1 - 0.5)),
        ),
        backlog: Math.max(0, prev.backlog - (Math.random() > 0.6 ? 1 : 0)),
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
        <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Customer Support</h3>
              <p className="text-sm text-violet-100">
                Ticket & Satisfaction Metrics
              </p>
            </div>
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Tickets Resolved */}
          <motion.div
            className="rounded-lg bg-violet-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Tickets Resolved
                </p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {data.ticketsResolved}
                </h4>
              </div>
              <div className="rounded-full bg-violet-100 p-2 dark:bg-violet-900">
                <MessageCircle className="h-5 w-5 text-violet-600 dark:text-violet-300" />
              </div>
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
              <motion.div
                className="h-2.5 rounded-full bg-violet-600"
                initial={{ width: 0 }}
                animate={{
                  width: `${(data.ticketsResolved / data.totalTickets) * 100}%`,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>
                {Math.round((data.ticketsResolved / data.totalTickets) * 100)}%
                of total
              </span>
              <span>Backlog: {data.backlog}</span>
            </div>
          </motion.div>

          {/* First Response Time */}
          <motion.div
            className="rounded-lg bg-blue-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  First Response Time
                </p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {Math.round(data.firstResponseTime)} min
                </h4>
              </div>
              <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
              <motion.div
                className={`h-2.5 rounded-full ${
                  data.firstResponseTime <= 20
                    ? "bg-green-500"
                    : data.firstResponseTime <= 30
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(100, (data.firstResponseTime / 60) * 100)}%`,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Target: &lt;30 min
            </p>
          </motion.div>

          {/* Customer Satisfaction */}
          <motion.div
            className="rounded-lg bg-green-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  CSAT Score
                </p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {data.customerSatisfaction.toFixed(3)}%
                </h4>
              </div>
              <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                <ThumbsUp className="h-5 w-5 text-green-600 dark:text-green-300" />
              </div>
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
              <motion.div
                className={`h-2.5 rounded-full ${
                  data.customerSatisfaction >= 90
                    ? "bg-green-500"
                    : data.customerSatisfaction >= 80
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${data.customerSatisfaction}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
            <div className="mt-2 flex items-center">
              <span className="flex items-center text-xs font-medium text-green-600 dark:text-green-400">
                <TrendingUp className="mr-1 h-3 w-3" />
                +2.5% this month
              </span>
            </div>
          </motion.div>

          {/* Average Resolution Time */}
          <motion.div
            className="rounded-lg bg-amber-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Avg. Resolution Time
                </p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {data.averageResolutionTime.toFixed(1)} hrs
                </h4>
              </div>
              <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900">
                <Clock className="h-5 w-5 text-amber-600 dark:text-amber-300" />
              </div>
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
              <motion.div
                className={`h-2.5 rounded-full ${
                  data.averageResolutionTime <= 4
                    ? "bg-green-500"
                    : data.averageResolutionTime <= 6
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(100, (data.averageResolutionTime / 8) * 100)}%`,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Target: &lt;5 hrs</span>
              <span>Reopen Rate: {data.reopenRate}%</span>
            </div>
          </motion.div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 gap-6 p-6 pt-0 md:grid-cols-2">
          {/* Channel Distribution */}
          <motion.div
            className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-700 dark:text-white">
                Channel Distribution
              </h4>
              <BarChart2 className="h-5 w-5 text-gray-500 dark:text-gray-300" />
            </div>
            <div className="space-y-4">
              {data.channelDistribution.map((channel, index) => (
                <div key={index}>
                  <div className="mb-1 flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {channel.name}
                      </span>
                      {channel.trend === "up" && (
                        <TrendingUp className="ml-1 h-3 w-3 text-green-500" />
                      )}
                      {channel.trend === "down" && (
                        <TrendingDown className="ml-1 h-3 w-3 text-red-500" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-800 dark:text-white">
                      {channel.percentage}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
                    <motion.div
                      className={`h-2 rounded-full ${
                        index === 0
                          ? "bg-blue-500"
                          : index === 1
                            ? "bg-violet-500"
                            : index === 2
                              ? "bg-green-500"
                              : "bg-amber-500"
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${channel.percentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-600">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Calls
                    </p>
                    <div className="flex items-center">
                      <PhoneCall className="mr-1 h-3 w-3 text-blue-500" />
                      <p className="text-xl font-bold text-gray-800 dark:text-white">
                        {data.callsAnswered}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-red-500 dark:text-red-400">
                    {data.callsAbandoned} abandoned
                  </span>
                </div>
              </div>
              <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-600">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Emails
                    </p>
                    <div className="flex items-center">
                      <Mail className="mr-1 h-3 w-3 text-violet-500" />
                      <p className="text-xl font-bold text-gray-800 dark:text-white">
                        {data.emailsReceived}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-green-500 dark:text-green-400">
                    {Math.round(
                      (data.emailsReceived / data.totalTickets) * 100,
                    )}
                    % of total
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Top Issue Categories */}
          <motion.div
            className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-700 dark:text-white">
                Top Issue Categories
              </h4>
              <AlertCircle className="h-5 w-5 text-gray-500 dark:text-gray-300" />
            </div>
            <div className="space-y-4">
              {data.topIssueCategories.map((category, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-600"
                >
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-medium text-gray-800 dark:text-white">
                      {category.name}
                    </h5>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      {category.percentage}%
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Tickets: {category.count}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-500">
                      <motion.div
                        className={`h-1.5 rounded-full ${
                          index === 0
                            ? "bg-red-500"
                            : index === 1
                              ? "bg-amber-500"
                              : index === 2
                                ? "bg-blue-500"
                                : "bg-green-500"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${category.percentage}%` }}
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
                <span>Last 7 days</span>
              </div>
              <button className="text-sm font-medium text-violet-600 hover:underline dark:text-violet-400">
                View All Categories
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomerSupportKPISet;
