"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Users, ShoppingCart } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const ConversionRateCard = () => {
  // Self-contained data
  const [data, setData] = useState({
    conversionRate: 3.8,
    previousRate: 3.2,
    percentageChange: 18.75,
    changeType: "increase" as "increase" | "decrease",
    visitors: 12450,
    conversions: 473,
    period: "This Week",
  });

  // Animation for circular progress
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(data.conversionRate), 500);
    return () => clearTimeout(timer);
  }, [data.conversionRate]);

  // Calculate circle properties
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 10) * circumference;

  return (
    <div className="min-h-screen bg-white px-4 py-8 dark:bg-slate-950">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-full max-w-md rounded-xl border border-green-100 bg-gradient-to-br from-green-50 to-teal-50 p-6 shadow-lg dark:border-slate-700 dark:from-slate-800 dark:to-slate-900"
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Conversion Rate
            </h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-slate-800 dark:text-white">
                {data.conversionRate}%
              </span>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className={`ml-2 flex items-center text-sm font-medium ${
                  data.changeType === "increase"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {data.changeType === "increase" ? (
                  <TrendingUp className="mr-0.5 h-3 w-3" />
                ) : (
                  <TrendingDown className="mr-0.5 h-3 w-3" />
                )}
                {data.percentageChange}%
              </motion.span>
            </div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {data.period}
            </div>
          </div>

          <div className="relative h-20 w-20">
            <svg className="h-full w-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="rgba(20, 184, 166, 0.2)"
                strokeWidth="8"
              />

              {/* Progress circle */}
              <motion.circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="rgb(20, 184, 166)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                transform="rotate(-90 50 50)"
              />

              {/* Percentage text */}
              <text
                x="50"
                y="50"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-slate-800 text-lg font-bold dark:fill-white"
              >
                {data.conversionRate}%
              </text>
            </svg>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-white/50 p-3 dark:bg-slate-700/30">
            <div className="mb-1 flex items-center text-sm text-slate-600 dark:text-slate-300">
              <Users className="mr-1 h-4 w-4 text-slate-400" />
              Visitors
            </div>
            <div className="text-lg font-semibold text-slate-800 dark:text-white">
              {data.visitors.toLocaleString()}
            </div>
          </div>

          <div className="rounded-lg bg-white/50 p-3 dark:bg-slate-700/30">
            <div className="mb-1 flex items-center text-sm text-slate-600 dark:text-slate-300">
              <ShoppingCart className="mr-1 h-4 w-4 text-slate-400" />
              Conversions
            </div>
            <div className="text-lg font-semibold text-slate-800 dark:text-white">
              {data.conversions.toLocaleString()}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConversionRateCard;
