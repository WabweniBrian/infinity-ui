"use client";

import type React from "react";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Leaf, Droplets, Sun, TrendingUp } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

interface StatProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  color: string;
  growth: number;
  index: number;
}

const stats: StatProps[] = [
  {
    icon: <Leaf className="h-6 w-6" />,
    title: "Crop Yield",
    value: "8.2 tons",
    description: "Per hectare average",
    color:
      "from-emerald-500 to-green-600 dark:from-emerald-400 dark:to-green-500",
    growth: 15,
    index: 0,
  },
  {
    icon: <Droplets className="h-6 w-6" />,
    title: "Water Usage",
    value: "-24%",
    description: "Reduction year-over-year",
    color: "from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400",
    growth: -24,
    index: 1,
  },
  {
    icon: <Sun className="h-6 w-6" />,
    title: "Solar Power",
    value: "45%",
    description: "Of energy needs",
    color:
      "from-amber-500 to-yellow-500 dark:from-amber-400 dark:to-yellow-400",
    growth: 45,
    index: 2,
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Sustainability",
    value: "92/100",
    description: "Environmental score",
    color: "from-lime-500 to-green-500 dark:from-lime-400 dark:to-green-400",
    growth: 8,
    index: 3,
  },
];

// Growth indicator component
const GrowthIndicator = ({ value }: { value: number }) => {
  const isPositive = value >= 0;
  const isNegative = value < 0;

  return (
    <div
      className={`flex items-center space-x-1 text-sm ${isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: isNegative ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <TrendingUp className="h-4 w-4" />
      </motion.div>
      <span>
        {isPositive ? "+" : ""}
        {value}%
      </span>
    </div>
  );
};

// Growing plant animation
const GrowingPlant = () => {
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 transform opacity-10 dark:opacity-5">
      <svg
        width="100"
        height="200"
        viewBox="0 0 100 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M50 200V100"
          stroke="currentColor"
          strokeWidth="4"
          className="text-green-600 dark:text-green-500"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <motion.path
          d="M50 100C50 100 70 80 90 100M50 80C50 80 30 60 10 80M50 60C50 60 70 40 90 60M50 40C50 40 30 20 10 40"
          stroke="currentColor"
          strokeWidth="4"
          className="text-green-600 dark:text-green-500"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, delay: 1, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
};

// Field pattern background
const FieldPattern = () => {
  return (
    <div className="absolute inset-0 opacity-5 dark:opacity-10">
      <svg width="100%" height="100%">
        <pattern
          id="field-pattern"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 20H40M20 0V40"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-green-600 dark:text-green-500"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#field-pattern)" />
      </svg>
    </div>
  );
};

const AgricultureStats = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-green-50 py-24 dark:bg-green-950"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Background Elements */}
      <FieldPattern />
      <GrowingPlant />

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center justify-center rounded-full bg-green-100 px-4 py-1 dark:bg-green-900/30">
            <Leaf className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              Farming Insights
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Sustainable{" "}
            <span className="text-green-600 dark:text-green-400">
              agriculture
            </span>{" "}
            metrics
          </h2>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Tracking our impact on the environment and crop production
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: stat.index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md dark:bg-green-900"
            >
              {/* Leaf Corner */}
              <div className="absolute -right-6 -top-6 h-12 w-12 rounded-full border-2 border-green-100 opacity-50 dark:border-green-800" />

              <div className="flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${stat.color} text-white`}
                >
                  {stat.icon}
                </div>

                {/* Growth Indicator */}
                <GrowthIndicator value={stat.growth} />
              </div>

              <h3 className="mt-4 text-lg font-medium text-gray-800 dark:text-gray-200">
                {stat.title}
              </h3>

              <motion.p
                className="mt-2 text-3xl font-bold text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: stat.index * 0.1 + 0.3 }}
              >
                {stat.value}
              </motion.p>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {stat.description}
              </p>

              {/* Soil Layers */}
              <div className="absolute bottom-0 left-0 right-0 flex h-2">
                <motion.div
                  className="h-full bg-amber-800/20 dark:bg-amber-800/10"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: stat.index * 0.1 }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-amber-600/20 dark:bg-amber-600/10"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: stat.index * 0.1 + 0.2 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgricultureStats;
