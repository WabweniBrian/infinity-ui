"use client";

import type React from "react";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Home, TrendingUp, Clock, DollarSign } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

interface StatProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subvalue: string;
  trend: {
    value: string;
    positive: boolean;
  };
  color: string;
  index: number;
}

const stats: StatProps[] = [
  {
    icon: <Home className="h-6 w-6" />,
    title: "Properties Sold",
    value: "1,248",
    subvalue: "This quarter",
    trend: {
      value: "+12%",
      positive: true,
    },
    color: "from-blue-500 to-sky-500 dark:from-blue-400 dark:to-sky-400",
    index: 0,
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Property Value",
    value: "$4.2M",
    subvalue: "Average sale price",
    trend: {
      value: "+8.3%",
      positive: true,
    },
    color:
      "from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400",
    index: 1,
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Days on Market",
    value: "24",
    subvalue: "Average listing time",
    trend: {
      value: "-15%",
      positive: true,
    },
    color:
      "from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400",
    index: 2,
  },
  {
    icon: <DollarSign className="h-6 w-6" />,
    title: "ROI",
    value: "18.7%",
    subvalue: "Average return on investment",
    trend: {
      value: "+2.4%",
      positive: true,
    },
    color:
      "from-violet-500 to-purple-500 dark:from-violet-400 dark:to-purple-400",
    index: 3,
  },
];

// Isometric building animation
const IsometricBuilding = () => {
  return (
    <div className="absolute right-20 top-20 opacity-10 dark:opacity-5">
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 1, 0, -1, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M60 10L10 40V90L60 120L110 90V40L60 10Z"
            fill="currentColor"
            className="text-blue-500/20 dark:text-blue-400/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.path
            d="M60 10V60L110 90V40L60 10Z"
            fill="currentColor"
            className="text-blue-600/20 dark:text-blue-500/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          />
          <motion.path
            d="M60 10V60L10 40V90L60 120V70L110 90V40L60 10Z"
            stroke="currentColor"
            strokeWidth="2"
            className="text-blue-700 dark:text-blue-600"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />
        </svg>
      </motion.div>
    </div>
  );
};

// Blueprint grid background
const BlueprintGrid = () => {
  return (
    <div className="absolute inset-0 opacity-5 dark:opacity-10">
      <svg width="100%" height="100%">
        <pattern
          id="blueprint-grid"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-blue-500 dark:text-blue-400"
          />
          <circle
            cx="0"
            cy="0"
            r="1"
            fill="currentColor"
            className="text-blue-500 dark:text-blue-400"
          />
          <circle
            cx="40"
            cy="0"
            r="1"
            fill="currentColor"
            className="text-blue-500 dark:text-blue-400"
          />
          <circle
            cx="0"
            cy="40"
            r="1"
            fill="currentColor"
            className="text-blue-500 dark:text-blue-400"
          />
          <circle
            cx="40"
            cy="40"
            r="1"
            fill="currentColor"
            className="text-blue-500 dark:text-blue-400"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
      </svg>
    </div>
  );
};

const RealEstateStats = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-white py-24 dark:bg-slate-900"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Background Elements */}
      <BlueprintGrid />
      <IsometricBuilding />

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center justify-center rounded-full bg-blue-100 px-4 py-1 dark:bg-blue-900/30">
            <Home className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Property Insights
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Real estate{" "}
            <span className="text-blue-600 dark:text-blue-400">
              market performance
            </span>
          </h2>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Key metrics from our portfolio of premium properties
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: stat.index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md dark:bg-slate-800"
            >
              {/* 3D Effect Corner */}
              <div className="absolute -right-4 -top-4 h-16 w-16 rotate-45 transform bg-gray-100 dark:bg-gray-700" />
              <div className="absolute -right-4 -top-4 h-12 w-12 rotate-45 transform bg-gray-200 dark:bg-gray-600" />

              <div className="flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-br ${stat.color} text-white`}
                >
                  {stat.icon}
                </div>

                <div
                  className={`flex items-center rounded-full ${stat.trend.positive ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"} px-2 py-0.5 text-xs font-medium`}
                >
                  {stat.trend.value}
                </div>
              </div>

              <h3 className="mt-4 text-lg font-medium text-gray-800 dark:text-gray-200">
                {stat.title}
              </h3>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: stat.index * 0.1 + 0.3 }}
              >
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {stat.subvalue}
                </p>
              </motion.div>

              {/* Animated Floor Plan Lines */}
              <div className="absolute bottom-0 left-0 right-0 h-1">
                <motion.div
                  className={`h-full bg-gradient-to-r ${stat.color}`}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : { width: 0 }}
                  transition={{ duration: 1, delay: stat.index * 0.1 + 0.5 }}
                />
              </div>

              {/* Blueprint Dots */}
              <div className="absolute bottom-3 right-3 flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-blue-500/50 dark:bg-blue-400/50"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.3,
                      delay: stat.index * 0.1 + 0.5 + i * 0.1,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RealEstateStats;
