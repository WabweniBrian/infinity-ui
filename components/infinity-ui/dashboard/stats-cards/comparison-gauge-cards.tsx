"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type ComparisonGaugeCardProps = {
  title: string;
  value: number;
  maxValue: number;
  targetValue: number;
  icon: React.ReactNode;
  color: string;
  description: string;
  valueLabel?: string;
  targetLabel?: string;
};

const ComparisonGaugeCard = ({
  title,
  value,
  maxValue,
  targetValue,
  icon,
  color,
  description,
  valueLabel = "Current",
  targetLabel = "Target",
}: ComparisonGaugeCardProps) => {
  const [showInfo, setShowInfo] = useState(true);

  // Calculate percentages for the gauge
  const valuePercent = Math.min(100, Math.max(0, (value / maxValue) * 100));
  const targetPercent = Math.min(
    100,
    Math.max(0, (targetValue / maxValue) * 100),
  );

  // Determine if we're above or below target
  const isAboveTarget = value >= targetValue;

  // SVG parameters
  const size = 140;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  // Calculate stroke dash offsets
  const valueOffset = circumference - (valuePercent / 100) * circumference;
  const targetOffset = circumference - (targetPercent / 100) * circumference;

  return (
    <motion.div
      className="relative rounded-xl border bg-gray-800/50 p-6 shadow-sm dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: `${color}15` }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              style={{ color }}
            >
              {icon}
            </motion.div>
          </div>
          <h3 className="text-sm font-medium text-foreground">{title}</h3>
        </div>

        <button
          className="flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground dark:hover:bg-slate-800"
          onClick={() => setShowInfo(!showInfo)}
          aria-label={showInfo ? "Hide information" : "Show information"}
        >
          <Info className="h-4 w-4" />
        </button>
      </div>

      <AnimatePresence>
        {showInfo && (
          <motion.div
            className="mt-2 rounded-lg bg-slate-50 p-2 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {description}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 flex flex-col items-center">
        <div className="relative">
          {/* Gauge background */}
          <svg
            width={size}
            height={size / 2}
            viewBox={`0 0 ${size} ${size}`}
            className="overflow-visible"
          >
            <defs>
              <linearGradient
                id={`gauge-gradient-${color.replace("#", "")}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor={`${color}50`} />
                <stop offset="100%" stopColor={color} />
              </linearGradient>
            </defs>

            {/* Background track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={0}
              className="dark:stroke-slate-700"
              transform={`rotate(-180 ${size / 2} ${size / 2})`}
              strokeLinecap="round"
            />

            {/* Target marker */}
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#94a3b8"
              strokeWidth={2}
              strokeDasharray={`1, ${circumference}`}
              strokeDashoffset={targetOffset}
              transform={`rotate(-180 ${size / 2} ${size / 2})`}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: targetOffset }}
              transition={{ duration: 1, delay: 0.5 }}
              className="dark:stroke-slate-500"
            />

            {/* Value progress */}
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={`url(#gauge-gradient-${color.replace("#", "")})`}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={valueOffset}
              transform={`rotate(-180 ${size / 2} ${size / 2})`}
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: valueOffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />

            {/* Center point */}
            <circle cx={size / 2} cy={size / 2} r={4} fill={color} />
          </svg>

          {/* Gauge needle */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-[2px] origin-left bg-foreground"
            style={{
              width: radius,
              transform: `rotate(${valuePercent * 1.8 - 90}deg)`,
            }}
            initial={{ rotate: -90 }}
            animate={{ rotate: `${valuePercent * 1.8 - 90}deg` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div
              className="absolute -right-1 -top-1 h-3 w-3 rounded-full"
              style={{ backgroundColor: color }}
            />
          </motion.div>
        </div>

        <div className="mt-4 flex w-full justify-between text-sm">
          <div className="flex flex-col items-center">
            <span className="text-xs text-muted-foreground">{valueLabel}</span>
            <span className="text-lg font-bold" style={{ color }}>
              {value.toLocaleString()}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xs text-muted-foreground">{targetLabel}</span>
            <span className="text-lg font-bold text-slate-600 dark:text-slate-400">
              {targetValue.toLocaleString()}
            </span>
          </div>
        </div>

        <motion.div
          className="mt-2 flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium"
          style={{
            backgroundColor: isAboveTarget ? "#10b98120" : "#ef444420",
            color: isAboveTarget ? "#10b981" : "#ef4444",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <span>
            {isAboveTarget
              ? `${Math.round(((value - targetValue) / targetValue) * 100)}% above target`
              : `${Math.round(((targetValue - value) / targetValue) * 100)}% below target`}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function ComparisonGaugeCards() {
  const stats = [
    {
      title: "Sales Performance",
      value: 82500,
      maxValue: 100000,
      targetValue: 75000,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 20V10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 20V4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 20V14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#6366f1", // Indigo
      description:
        "Current sales performance compared to quarterly target. The gauge shows how close we are to reaching our goal.",
      valueLabel: "Current",
      targetLabel: "Target",
    },
    {
      title: "Customer Satisfaction",
      value: 87,
      maxValue: 100,
      targetValue: 90,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 9H9.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 9H15.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#ec4899", // Pink
      description:
        "Customer satisfaction score based on recent surveys. We aim to maintain a score of 90 or higher.",
      valueLabel: "Current",
      targetLabel: "Goal",
    },
    {
      title: "Project Completion",
      value: 68,
      maxValue: 100,
      targetValue: 75,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 8V12L14 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#f97316", // Orange
      description:
        "Current project completion percentage compared to where we should be at this point in the timeline.",
      valueLabel: "Completed",
      targetLabel: "Expected",
    },
    {
      title: "Server Uptime",
      value: 99.98,
      maxValue: 100,
      targetValue: 99.9,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 12H18L15 21L9 3L6 12H2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#10b981", // Emerald
      description:
        "Server uptime percentage over the last 30 days. Our SLA guarantees 99.9% uptime.",
      valueLabel: "Current",
      targetLabel: "SLA",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-4 py-10 dark:bg-gray-900">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <ComparisonGaugeCard
              key={index}
              title={stat.title}
              value={stat.value}
              maxValue={stat.maxValue}
              targetValue={stat.targetValue}
              icon={stat.icon}
              color={stat.color}
              description={stat.description}
              valueLabel={stat.valueLabel}
              targetLabel={stat.targetLabel}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
