"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

interface StatProps {
  title: string;
  value: number;
  maxValue: number;
  unit: string;
  color: string;
  index: number;
}

const stats: StatProps[] = [
  {
    title: "Projects Delivered",
    value: 1248,
    maxValue: 1500,
    unit: "",
    color:
      "from-violet-600 to-indigo-600 dark:from-violet-500 dark:to-indigo-500",
    index: 0,
  },
  {
    title: "Client Retention",
    value: 96,
    maxValue: 100,
    unit: "%",
    color:
      "from-fuchsia-600 to-pink-600 dark:from-fuchsia-500 dark:to-pink-500",
    index: 1,
  },
  {
    title: "Team Growth",
    value: 427,
    maxValue: 500,
    unit: "%",
    color:
      "from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500",
    index: 2,
  },
  {
    title: "Global Reach",
    value: 42,
    maxValue: 50,
    unit: " countries",
    color:
      "from-emerald-600 to-teal-600 dark:from-emerald-500 dark:to-teal-500",
    index: 3,
  },
];

const RadialProgress = ({
  value,
  maxValue,
  color,
  size = 140,
}: {
  value: number;
  maxValue: number;
  color: string;
  size?: number;
}) => {
  const percentage = (value / maxValue) * 100;
  const strokeWidth = size * 0.1;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Extract color classes
  const fromColor = color.split(" ")[0].replace("from-", "");
  const toColor = color.split(" ")[1].replace("to-", "");

  // Get the actual color values based on Tailwind classes
  const getColorValue = (colorClass: string) => {
    const colors: Record<string, string> = {
      "violet-600": "#7c3aed",
      "violet-500": "#8b5cf6",
      "indigo-600": "#4f46e5",
      "indigo-500": "#6366f1",
      "fuchsia-600": "#c026d3",
      "fuchsia-500": "#d946ef",
      "pink-600": "#db2777",
      "pink-500": "#ec4899",
      "amber-500": "#f59e0b",
      "amber-400": "#fbbf24",
      "orange-600": "#ea580c",
      "orange-500": "#f97316",
      "emerald-600": "#059669",
      "emerald-500": "#10b981",
      "teal-600": "#0d9488",
      "teal-500": "#14b8a6",
    };

    return colors[colorClass] || "#000000";
  };

  const fromColorValue = getColorValue(fromColor);
  const toColorValue = getColorValue(toColor);

  const gradientId = `gradient-${fromColor}-${toColor}`;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="rotate-[-90deg]"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200 dark:text-gray-800"
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={fromColorValue} />
            <stop offset="100%" stopColor={toColorValue} />
          </linearGradient>
        </defs>

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

const RadialStats = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gray-50 py-24 dark:bg-slate-900"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Mesh Background */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%">
          <pattern
            id="mesh-pattern"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <rect width="40" height="40" fill="none" />
            <circle
              cx="20"
              cy="20"
              r="1"
              fill="currentColor"
              className="text-gray-300 dark:text-gray-700"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#mesh-pattern)" />
        </svg>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute left-0 right-0 top-0 h-40 bg-gradient-to-b from-gray-50 to-transparent dark:from-slate-900 dark:to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-50 to-transparent dark:from-slate-900 dark:to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Our Growth in Numbers
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 dark:from-violet-500 dark:to-pink-500" />
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
            Tracking our progress and impact across key performance indicators
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: stat.index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: stat.index * 0.1 + 0.2 }}
                >
                  <RadialProgress
                    value={stat.value}
                    maxValue={stat.maxValue}
                    color={stat.color}
                  />
                </motion.div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: stat.index * 0.1 + 0.4,
                    }}
                    className="text-center"
                  >
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                      <span
                        className={`${stat.unit.includes("countries") ? "text-sm" : ""}`}
                      >
                        {stat.unit}
                      </span>
                    </span>
                  </motion.div>
                </div>
              </div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: stat.index * 0.1 + 0.3 }}
                className="mt-6 text-center text-lg font-medium text-gray-800 dark:text-gray-200"
              >
                {stat.title}
              </motion.h3>

              {/* Decorative Line */}
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: "40px" } : {}}
                transition={{ duration: 0.5, delay: stat.index * 0.1 + 0.5 }}
                className={`mt-3 h-1 rounded-full bg-gradient-to-r ${stat.color}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RadialStats;
