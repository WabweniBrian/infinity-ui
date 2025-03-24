"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  UserPlus,
  UserMinus,
  Clock,
  BarChart2,
  Award,
  Calendar,
  Briefcase,
  Smile,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const HRTalentManagementKPISet = () => {
  // Mock data with realistic HR metrics
  const [data, setData] = useState({
    totalEmployees: 487,
    newHires: 28,
    turnoverRate: 12.4,
    timeToFill: 32, // days
    costPerHire: 4250, // dollars
    employeeSatisfaction: 78, // percentage
    performanceRating: 3.8, // out of 5
    diversityScore: 72, // percentage
    trainingCompletion: 84, // percentage
    promotionRate: 8.5, // percentage
    absenteeismRate: 3.2, // percentage
    departmentDistribution: [
      { name: "Engineering", count: 165, percentage: 33.9 },
      { name: "Sales", count: 98, percentage: 20.1 },
      { name: "Marketing", count: 72, percentage: 14.8 },
      { name: "Operations", count: 85, percentage: 17.5 },
      { name: "HR & Admin", count: 42, percentage: 8.6 },
      { name: "Finance", count: 25, percentage: 5.1 },
    ],
    hiringTrend: [
      { month: "Jan", hires: 12, departures: 8 },
      { month: "Feb", hires: 15, departures: 6 },
      { month: "Mar", hires: 10, departures: 9 },
      { month: "Apr", hires: 18, departures: 7 },
      { month: "May", hires: 22, departures: 10 },
      { month: "Jun", hires: 28, departures: 12 },
    ],
  });

  // Simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        totalEmployees: prev.totalEmployees + (Math.random() > 0.7 ? 1 : 0),
        turnoverRate: Math.max(
          5,
          Math.min(20, prev.turnoverRate + (Math.random() * 0.4 - 0.2)),
        ),
        employeeSatisfaction: Math.min(
          100,
          Math.max(60, prev.employeeSatisfaction + (Math.random() * 1 - 0.5)),
        ),
        timeToFill: Math.max(
          20,
          Math.min(45, prev.timeToFill + (Math.random() * 2 - 1)),
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
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">
                HR & Talent Management
              </h3>
              <p className="text-sm text-indigo-100">
                Employee & Recruitment Metrics
              </p>
            </div>
            <Users className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Employees */}
          <motion.div
            className="rounded-lg bg-indigo-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Total Employees
                </p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {data.totalEmployees}
                </h4>
              </div>
              <div className="rounded-full bg-indigo-100 p-2 dark:bg-indigo-900">
                <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <span className="flex items-center text-xs font-medium text-indigo-600 dark:text-indigo-400">
                <UserPlus className="mr-1 h-3 w-3" />
                {data.newHires} new hires this month
              </span>
            </div>
          </motion.div>

          {/* Turnover Rate */}
          <motion.div
            className="rounded-lg bg-red-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Turnover Rate
                </p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {data.turnoverRate.toFixed(1)}%
                </h4>
              </div>
              <div className="rounded-full bg-red-100 p-2 dark:bg-red-900">
                <UserMinus className="h-5 w-5 text-red-600 dark:text-red-300" />
              </div>
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
              <motion.div
                className={`h-2.5 rounded-full ${
                  data.turnoverRate <= 10
                    ? "bg-green-500"
                    : data.turnoverRate <= 15
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, data.turnoverRate * 5)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Industry Average: 15%
            </p>
          </motion.div>

          {/* Time to Fill */}
          <motion.div
            className="rounded-lg bg-amber-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Time to Fill
                </p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {Math.round(data.timeToFill)} days
                </h4>
              </div>
              <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900">
                <Clock className="h-5 w-5 text-amber-600 dark:text-amber-300" />
              </div>
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
              <motion.div
                className={`h-2.5 rounded-full ${
                  data.timeToFill <= 25
                    ? "bg-green-500"
                    : data.timeToFill <= 35
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(100, (data.timeToFill / 60) * 100)}%`,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Target: &lt;30 days</span>
              <span>Cost per Hire: ${data.costPerHire}</span>
            </div>
          </motion.div>

          {/* Employee Satisfaction */}
          <motion.div
            className="rounded-lg bg-green-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Employee Satisfaction
                </p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {data.employeeSatisfaction.toFixed(2)}%
                </h4>
              </div>
              <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                <Smile className="h-5 w-5 text-green-600 dark:text-green-300" />
              </div>
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
              <motion.div
                className={`h-2.5 rounded-full ${
                  data.employeeSatisfaction >= 75
                    ? "bg-green-500"
                    : data.employeeSatisfaction >= 60
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${data.employeeSatisfaction}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Performance Rating: {data.performanceRating}/5
            </p>
          </motion.div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 gap-6 p-6 pt-0 md:grid-cols-2">
          {/* Department Distribution */}
          <motion.div
            className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-700 dark:text-white">
                Department Distribution
              </h4>
              <BarChart2 className="h-5 w-5 text-gray-500 dark:text-gray-300" />
            </div>
            <div className="space-y-4">
              {data.departmentDistribution.map((dept, index) => (
                <div key={index}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {dept.name}
                    </span>
                    <span className="text-sm font-medium text-gray-800 dark:text-white">
                      {dept.count} ({dept.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
                    <motion.div
                      className={`h-2 rounded-full ${
                        index === 0
                          ? "bg-indigo-500"
                          : index === 1
                            ? "bg-blue-500"
                            : index === 2
                              ? "bg-green-500"
                              : index === 3
                                ? "bg-amber-500"
                                : index === 4
                                  ? "bg-purple-500"
                                  : "bg-red-500"
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${dept.percentage}%` }}
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
                      Diversity Score
                    </p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">
                      {data.diversityScore}%
                    </p>
                  </div>
                  <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                    <Users className="h-4 w-4 text-purple-600 dark:text-purple-300" />
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-600">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Promotion Rate
                    </p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">
                      {data.promotionRate}%
                    </p>
                  </div>
                  <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                    <Award className="h-4 w-4 text-green-600 dark:text-green-300" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hiring Trend */}
          <motion.div
            className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-700 dark:text-white">
                Hiring Trend
              </h4>
              <Briefcase className="h-5 w-5 text-gray-500 dark:text-gray-300" />
            </div>
            <div className="space-y-4">
              {data.hiringTrend.map((month, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-600"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h5 className="text-sm font-medium text-gray-800 dark:text-white">
                      {month.month}
                    </h5>
                    <div className="flex items-center">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          month.hires > month.departures
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : month.hires === month.departures
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        Net: {month.hires - month.departures > 0 ? "+" : ""}
                        {month.hires - month.departures}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          New Hires
                        </span>
                        <span className="text-xs font-medium text-gray-800 dark:text-white">
                          {month.hires}
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-500">
                        <motion.div
                          className="h-1.5 rounded-full bg-indigo-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${(month.hires / 30) * 100}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        ></motion.div>
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Departures
                        </span>
                        <span className="text-xs font-medium text-gray-800 dark:text-white">
                          {month.departures}
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-500">
                        <motion.div
                          className="h-1.5 rounded-full bg-red-500"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(month.departures / 30) * 100}%`,
                          }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        ></motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Calendar className="mr-1 h-4 w-4" />
                <span>Last 6 months</span>
              </div>
              <button className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400">
                View Full Report
              </button>
            </div>
          </motion.div>
        </div>

        {/* HR Performance Indicators */}
        <div className="grid grid-cols-1 gap-6 p-6 pt-0 md:grid-cols-3">
          <motion.div
            className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Training Completion
              </p>
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  data.trainingCompletion >= 80
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : data.trainingCompletion >= 70
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                }`}
              >
                {data.trainingCompletion >= 80
                  ? "Good"
                  : data.trainingCompletion >= 70
                    ? "Average"
                    : "Needs Improvement"}
              </span>
            </div>
            <h4 className="text-xl font-bold text-gray-800 dark:text-white">
              {data.trainingCompletion}%
            </h4>
            <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
              <motion.div
                className={`h-2 rounded-full ${
                  data.trainingCompletion >= 80
                    ? "bg-green-500"
                    : data.trainingCompletion >= 70
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${data.trainingCompletion}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Target: 90%
            </p>
          </motion.div>

          <motion.div
            className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Absenteeism Rate
              </p>
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  data.absenteeismRate <= 3
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : data.absenteeismRate <= 5
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                }`}
              >
                {data.absenteeismRate <= 3
                  ? "Low"
                  : data.absenteeismRate <= 5
                    ? "Average"
                    : "High"}
              </span>
            </div>
            <h4 className="text-xl font-bold text-gray-800 dark:text-white">
              {data.absenteeismRate}%
            </h4>
            <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
              <motion.div
                className={`h-2 rounded-full ${
                  data.absenteeismRate <= 3
                    ? "bg-green-500"
                    : data.absenteeismRate <= 5
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(100, data.absenteeismRate * 10)}%`,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Industry Average: 4.1%
            </p>
          </motion.div>

          <motion.div
            className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Cost per Hire
              </p>
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  data.costPerHire <= 4000
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : data.costPerHire <= 5000
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                }`}
              >
                {data.costPerHire <= 4000
                  ? "Efficient"
                  : data.costPerHire <= 5000
                    ? "Average"
                    : "High Cost"}
              </span>
            </div>
            <h4 className="text-xl font-bold text-gray-800 dark:text-white">
              ${data.costPerHire}
            </h4>
            <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
              <motion.div
                className={`h-2 rounded-full ${
                  data.costPerHire <= 4000
                    ? "bg-green-500"
                    : data.costPerHire <= 5000
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(100, (data.costPerHire / 8000) * 100)}%`,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Target: &lt;$4,500
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HRTalentManagementKPISet;
