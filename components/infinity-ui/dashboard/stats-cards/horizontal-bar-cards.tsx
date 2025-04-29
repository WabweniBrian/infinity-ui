"use client";

import type React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  LineChart,
  PieChart,
  Layers,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type BarStatCardProps = {
  title: string;
  value: string;
  target: string;
  progress: number;
  icon: React.ReactNode;
  color: string;
  secondaryColor: string;
};

const BarStatCard = ({
  title,
  value,
  target,
  progress,
  icon,
  color,
  secondaryColor,
}: BarStatCardProps) => {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl border bg-gray-800/50 p-6 shadow-sm transition-all dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Decorative corner shape */}
      <div
        className="absolute -right-4 -top-4 h-24 w-24 rotate-12 rounded-full opacity-10 transition-transform duration-500 group-hover:rotate-45"
        style={{ backgroundColor: color }}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg`}
            style={{ backgroundColor: `${color}20` }}
          >
            <motion.div
              className="text-foreground"
              style={{ color }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              {icon}
            </motion.div>
          </div>
          <h3 className="text-sm font-medium text-foreground">{title}</h3>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between">
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>Target: {target}</span>
            <ArrowRight className="ml-1 h-3 w-3" />
          </div>
        </div>

        <div className="mt-3">
          {/* Progress bar */}
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: color, width: `${progress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>

          {/* Progress markers */}
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Animated indicator */}
        <motion.div
          className="mt-3 flex items-center justify-end text-sm font-medium"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          style={{ color: progress >= 100 ? secondaryColor : color }}
        >
          <span>{progress}% completed</span>
          {progress >= 100 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="ml-2 flex h-5 w-5 items-center justify-center rounded-full"
              style={{ backgroundColor: `${secondaryColor}20` }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M10 3L4.5 8.5L2 6"
                  stroke={secondaryColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function HorizontalBarCards() {
  const stats = [
    {
      title: "Monthly Sales",
      value: "$8,521",
      target: "$10,000",
      progress: 85,
      icon: <BarChart3 className="h-5 w-5" />,
      color: "#6366f1", // Indigo
      secondaryColor: "#10b981", // Emerald
    },
    {
      title: "New Customers",
      value: "645",
      target: "500",
      progress: 129,
      icon: <LineChart className="h-5 w-5" />,
      color: "#ec4899", // Pink
      secondaryColor: "#10b981", // Emerald
    },
    {
      title: "Tasks Completed",
      value: "32",
      target: "40",
      progress: 80,
      icon: <Layers className="h-5 w-5" />,
      color: "#f97316", // Orange
      secondaryColor: "#10b981", // Emerald
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      target: "3.5%",
      progress: 91,
      icon: <PieChart className="h-5 w-5" />,
      color: "#8b5cf6", // Violet
      secondaryColor: "#10b981", // Emerald
    },
  ];

  return (
    <div className="min-h-screen bg-white px-4 py-10 dark:bg-gray-900">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <BarStatCard
              key={index}
              title={stat.title}
              value={stat.value}
              target={stat.target}
              progress={stat.progress}
              icon={stat.icon}
              color={stat.color}
              secondaryColor={stat.secondaryColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
