"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Users,
  Clock,
  TrendingUp,
  Heart,
  Thermometer,
  Calendar,
  CheckCircle,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const HealthcareAnalyticsKPISet = () => {
  // Mock data with realistic healthcare metrics
  const [data, setData] = useState({
    patientSatisfaction: 87,
    averageWaitTime: 24,
    bedOccupancyRate: 76,
    readmissionRate: 5.2,
    appointmentsToday: 142,
    appointmentsCompleted: 98,
    emergencyVisits: 37,
    averageLOS: 4.3, // Length of Stay
  });

  // Simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        patientSatisfaction: Math.min(
          100,
          Math.max(80, prev.patientSatisfaction + (Math.random() * 2 - 1)),
        ),
        averageWaitTime: Math.max(
          15,
          Math.min(35, prev.averageWaitTime + (Math.random() * 4 - 2)),
        ),
        bedOccupancyRate: Math.min(
          95,
          Math.max(65, prev.bedOccupancyRate + (Math.random() * 3 - 1.5)),
        ),
        appointmentsToday: prev.appointmentsToday,
        appointmentsCompleted: Math.min(
          prev.appointmentsToday,
          prev.appointmentsCompleted + (Math.random() > 0.7 ? 1 : 0),
        ),
        emergencyVisits: prev.emergencyVisits + (Math.random() > 0.8 ? 1 : 0),
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
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">
                Healthcare Analytics
              </h3>
              <p className="text-sm text-blue-100">Daily Performance Metrics</p>
            </div>
            <Activity className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Patient Satisfaction */}
          <motion.div
            className="rounded-lg bg-blue-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Patient Satisfaction
                </p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {data.patientSatisfaction.toFixed(2)}%
                </h4>
              </div>
              <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                <Heart className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
              <motion.div
                className="h-2.5 rounded-full bg-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${data.patientSatisfaction}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {data.patientSatisfaction >= 85
                ? "Excellent"
                : data.patientSatisfaction >= 75
                  ? "Good"
                  : "Needs Improvement"}
            </p>
          </motion.div>

          {/* Average Wait Time */}
          <motion.div
            className="rounded-lg bg-green-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Avg. Wait Time
                </p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {data.averageWaitTime.toFixed(2)} min
                </h4>
              </div>
              <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                <Clock className="h-5 w-5 text-green-600 dark:text-green-300" />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
                <motion.div
                  className={`h-full ${data.averageWaitTime <= 20 ? "bg-green-500" : data.averageWaitTime <= 30 ? "bg-yellow-500" : "bg-red-500"}`}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(100, (data.averageWaitTime / 40) * 100)}%`,
                  }}
                  transition={{ duration: 1 }}
                ></motion.div>
              </div>
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                Target: 20 min
              </span>
            </div>
          </motion.div>

          {/* Bed Occupancy Rate */}
          <motion.div
            className="rounded-lg bg-purple-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Bed Occupancy
                </p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {data.bedOccupancyRate.toFixed(2)}%
                </h4>
              </div>
              <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                <Users className="h-5 w-5 text-purple-600 dark:text-purple-300" />
              </div>
            </div>
            <div className="relative pt-1">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <span
                    className={`inline-block rounded-full px-2 py-1 text-xs font-semibold uppercase ${
                      data.bedOccupancyRate > 85
                        ? "bg-red-200 text-red-600 dark:bg-red-900 dark:text-red-200"
                        : data.bedOccupancyRate > 75
                          ? "bg-yellow-200 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-green-200 text-green-600 dark:bg-green-900 dark:text-green-200"
                    }`}
                  >
                    {data.bedOccupancyRate > 85
                      ? "High"
                      : data.bedOccupancyRate > 75
                        ? "Moderate"
                        : "Optimal"}
                  </span>
                </div>
              </div>
              <div className="mb-0 flex h-2 overflow-hidden rounded-full bg-gray-200 text-xs dark:bg-gray-600">
                <motion.div
                  style={{ width: `${data.bedOccupancyRate}%` }}
                  className={`flex flex-col justify-center whitespace-nowrap text-center text-white shadow-none ${
                    data.bedOccupancyRate > 85
                      ? "bg-red-500"
                      : data.bedOccupancyRate > 75
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${data.bedOccupancyRate}%` }}
                  transition={{ duration: 1 }}
                ></motion.div>
              </div>
            </div>
          </motion.div>

          {/* Readmission Rate */}
          <motion.div
            className="rounded-lg bg-red-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Readmission Rate
                </p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {data.readmissionRate.toFixed(2)}%
                </h4>
              </div>
              <div className="rounded-full bg-red-100 p-2 dark:bg-red-900">
                <TrendingUp className="h-5 w-5 text-red-600 dark:text-red-300" />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
                <motion.div
                  className={`h-full ${data.readmissionRate <= 5 ? "bg-green-500" : data.readmissionRate <= 8 ? "bg-yellow-500" : "bg-red-500"}`}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(100, (data.readmissionRate / 10) * 100)}%`,
                  }}
                  transition={{ duration: 1 }}
                ></motion.div>
              </div>
              <span className="dark:text-gray-400\\ ml-2 text-xs text-gray-500">
                Target: &gt;5%
              </span>
            </div>
          </motion.div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 gap-6 p-6 pt-0 md:grid-cols-2">
          {/* Appointments */}
          <motion.div
            className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-700 dark:text-white">
                Today&apos;s Appointments
              </h4>
              <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-300" />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  {data.appointmentsToday}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Scheduled
                </p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {data.appointmentsCompleted}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Completed
                </p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {Math.round(
                    (data.appointmentsCompleted / data.appointmentsToday) * 100,
                  )}
                  %
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Completion
                </p>
              </div>
            </div>
            <div className="mt-4 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
              <motion.div
                className="h-2.5 rounded-full bg-blue-600"
                initial={{ width: 0 }}
                animate={{
                  width: `${(data.appointmentsCompleted / data.appointmentsToday) * 100}%`,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
          </motion.div>

          {/* Emergency & LOS */}
          <motion.div
            className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-700 dark:text-white">
                Emergency & Inpatient
              </h4>
              <Thermometer className="h-5 w-5 text-gray-500 dark:text-gray-300" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-orange-50 p-3 dark:bg-gray-600">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Emergency Visits
                    </p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                      {data.emergencyVisits}
                    </p>
                  </div>
                  <div className="rounded-full bg-orange-100 p-2 dark:bg-orange-900">
                    <Activity className="h-4 w-4 text-orange-600 dark:text-orange-300" />
                  </div>
                </div>
                <div className="mt-2 flex items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {data.emergencyVisits > 40
                      ? "High Volume"
                      : "Normal Volume"}
                  </span>
                </div>
              </div>
              <div className="rounded-lg bg-blue-50 p-3 dark:bg-gray-600">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Avg. Length of Stay
                    </p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                      {data.averageLOS} days
                    </p>
                  </div>
                  <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                    <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                  </div>
                </div>
                <div className="mt-2 flex items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {data.averageLOS < 4.5 ? "Below Target" : "Above Target"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HealthcareAnalyticsKPISet;
