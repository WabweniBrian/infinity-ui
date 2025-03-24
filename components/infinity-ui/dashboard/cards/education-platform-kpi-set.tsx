"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  Award,
  BarChart2,
  CheckCircle,
  Calendar,
  TrendingUp,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const EducationPlatformKPISet = () => {
  // Mock data with realistic education metrics
  const [data, setData] = useState({
    activeStudents: 2847,
    courseCompletionRate: 68,
    averageGrade: 87,
    studentEngagement: 76,
    totalCourses: 124,
    activeCourses: 78,
    certificatesIssued: 1432,
    averageCompletionTime: 14.3, // days
    studentGrowth: 15.2,
    topCourse: "Web Development Bootcamp",
    topInstructor: "Dr. Jane Smith",
    timeframe: "Last Month",
    topCourses: [
      { name: "Data Science Fundamentals", students: 342, rating: 4.8 },
      { name: "Web Development Bootcamp", students: 287, rating: 4.7 },
      { name: "Digital Marketing Essentials", students: 256, rating: 4.6 },
    ],
  });

  // Simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        activeStudents:
          prev.activeStudents +
          (Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0),
        courseCompletionRate: Math.min(
          100,
          Math.max(60, prev.courseCompletionRate + (Math.random() * 2 - 1)),
        ),
        studentEngagement: Math.min(
          100,
          Math.max(65, prev.studentEngagement + (Math.random() * 3 - 1.5)),
        ),
        certificatesIssued:
          prev.certificatesIssued + (Math.random() > 0.8 ? 1 : 0),
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
                Education Platform
              </h3>
              <p className="text-sm text-indigo-100">
                Learning Performance Metrics
              </p>
            </div>
            <BookOpen className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Active Students */}
          <motion.div
            className="rounded-lg bg-indigo-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Active Students
                </p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {data.activeStudents.toLocaleString()}
                </h4>
              </div>
              <div className="rounded-full bg-indigo-100 p-2 dark:bg-indigo-900">
                <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <span className="flex items-center text-xs font-medium text-green-600 dark:text-green-400">
                <TrendingUp className="mr-1 h-3 w-3" />+{data.studentGrowth}%
                this month
              </span>
            </div>
          </motion.div>

          {/* Course Completion Rate */}
          <motion.div
            className="rounded-lg bg-purple-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Completion Rate
                </p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {data.courseCompletionRate.toFixed(2)}%
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
                animate={{ width: `${data.courseCompletionRate}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Target: 75%
            </p>
          </motion.div>

          {/* Average Grade */}
          <motion.div
            className="rounded-lg bg-green-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Average Grade
                </p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {data.averageGrade}/100
                </h4>
              </div>
              <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                <Award className="h-5 w-5 text-green-600 dark:text-green-300" />
              </div>
            </div>
            <div className="relative pt-1">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <span
                    className={`inline-block rounded-full px-2 py-1 text-xs font-semibold uppercase ${
                      data.averageGrade >= 90
                        ? "bg-green-200 text-green-600 dark:bg-green-900 dark:text-green-200"
                        : data.averageGrade >= 80
                          ? "bg-blue-200 text-blue-600 dark:bg-blue-900 dark:text-blue-200"
                          : data.averageGrade >= 70
                            ? "bg-yellow-200 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-red-200 text-red-600 dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    {data.averageGrade >= 90
                      ? "A"
                      : data.averageGrade >= 80
                        ? "B"
                        : data.averageGrade >= 70
                          ? "C"
                          : "D"}
                  </span>
                </div>
              </div>
              <div className="mb-0 flex h-2 overflow-hidden rounded-full bg-gray-200 text-xs dark:bg-gray-600">
                <motion.div
                  style={{ width: `${data.averageGrade}%` }}
                  className={`flex flex-col justify-center whitespace-nowrap text-center text-white shadow-none ${
                    data.averageGrade >= 90
                      ? "bg-green-500"
                      : data.averageGrade >= 80
                        ? "bg-blue-500"
                        : data.averageGrade >= 70
                          ? "bg-yellow-500"
                          : "bg-red-500"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${data.averageGrade}%` }}
                  transition={{ duration: 1 }}
                ></motion.div>
              </div>
            </div>
          </motion.div>

          {/* Student Engagement */}
          <motion.div
            className="rounded-lg bg-blue-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Student Engagement
                </p>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {data.studentEngagement.toFixed(2)}%
                </h4>
              </div>
              <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                <BarChart2 className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
              <motion.div
                className="h-2.5 rounded-full bg-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${data.studentEngagement}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Based on participation, forum activity, and assignment submissions
            </p>
          </motion.div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 gap-6 p-6 pt-0 md:grid-cols-2">
          {/* Course Stats */}
          <motion.div
            className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-700 dark:text-white">
                Course Statistics
              </h4>
              <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-300" />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  {data.totalCourses}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Courses
                </p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  {data.activeCourses}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Active Courses
                </p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {data.certificatesIssued.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Certificates
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Average Completion Time
                </span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {data.averageCompletionTime} days
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
                <motion.div
                  className="h-1.5 rounded-full bg-indigo-600"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(100, (data.averageCompletionTime / 20) * 100)}%`,
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                ></motion.div>
              </div>
            </div>
          </motion.div>

          {/* Top Courses */}
          <motion.div
            className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
            variants={itemVariants}
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-700 dark:text-white">
                Top Performing Courses
              </h4>
              <Award className="h-5 w-5 text-gray-500 dark:text-gray-300" />
            </div>
            <div className="space-y-3">
              {data.topCourses.map((course, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <h5 className="text-sm font-medium text-gray-800 dark:text-white">
                      {course.name}
                    </h5>
                    <div className="mt-1 flex items-center">
                      <Users className="mr-1 h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {course.students} students
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center rounded bg-indigo-50 px-2 py-1 dark:bg-indigo-900/30">
                    <span className="mr-1 text-xs font-medium text-indigo-700 dark:text-indigo-300">
                      {course.rating}
                    </span>
                    <svg
                      className="h-3 w-3 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default EducationPlatformKPISet;
