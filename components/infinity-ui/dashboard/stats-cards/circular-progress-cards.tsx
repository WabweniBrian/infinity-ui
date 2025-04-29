"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Users, Cpu, HardDrive, Wifi } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type CircularProgressCardProps = {
  title: string;
  value: number;
  maxValue: number;
  icon: React.ReactNode;
  color: string;
  description: string;
};

const CircularProgressCard = ({
  title,
  value,
  maxValue,
  icon,
  color,
  description,
}: CircularProgressCardProps) => {
  // Calculate percentage
  const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100));

  // SVG parameters
  const size = 80;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      className="flex flex-col rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800/50"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full`}
            style={{ backgroundColor: `${color}20` }}
          >
            <motion.div
              className="text-foreground"
              style={{ color }}
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              {icon}
            </motion.div>
          </div>
          <h3 className="text-sm font-medium text-foreground">{title}</h3>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold text-foreground">
            {value.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>

        <div className="relative h-20 w-20">
          {/* Background circle */}
          <svg
            className="h-full w-full -rotate-90 transform"
            viewBox={`0 0 ${size} ${size}`}
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              stroke="#e2e8f0"
              fill="none"
              className="dark:stroke-slate-700"
            />

            {/* Progress circle */}
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              stroke={color}
              strokeLinecap="round"
              fill="none"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              strokeDasharray={circumference}
            />
          </svg>

          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="text-sm font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ color }}
            >
              {Math.round(percentage)}%
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function CircularProgressCards() {
  const stats = [
    {
      title: "Active Users",
      value: 1250,
      maxValue: 2000,
      icon: <Users className="h-5 w-5" />,
      color: "#8b5cf6", // Violet
      description: "Out of 2,000 total users",
    },
    {
      title: "CPU Usage",
      value: 68,
      maxValue: 100,
      icon: <Cpu className="h-5 w-5" />,
      color: "#ec4899", // Pink
      description: "Average across all servers",
    },
    {
      title: "Storage Used",
      value: 410,
      maxValue: 500,
      icon: <HardDrive className="h-5 w-5" />,
      color: "#f97316", // Orange
      description: "410 GB of 500 GB used",
    },
    {
      title: "Network Load",
      value: 42,
      maxValue: 100,
      icon: <Wifi className="h-5 w-5" />,
      color: "#10b981", // Emerald
      description: "Current network utilization",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-4 py-10 dark:bg-gray-900">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <CircularProgressCard
              key={index}
              title={stat.title}
              value={stat.value}
              maxValue={stat.maxValue}
              icon={stat.icon}
              color={stat.color}
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
