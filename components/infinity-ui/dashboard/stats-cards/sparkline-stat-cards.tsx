"use client";

import type React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingBag,
  Zap,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type SparklineDataPoint = {
  value: number;
  date: string;
};

type SparklineStatCardProps = {
  title: string;
  value: string;
  change: number;
  data: SparklineDataPoint[];
  icon: React.ReactNode;
  color: string;
};

const SparklineChart = ({
  data,
  color,
}: {
  data: SparklineDataPoint[];
  color: string;
}) => {
  // Calculate min and max for scaling
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;

  // Scale to fit in the available height (30px)
  const height = 30;
  const width = 80;

  // Generate path
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((d.value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
      initial={{ opacity: 0, pathLength: 0 }}
      animate={{ opacity: 1, pathLength: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <motion.path
        d={`M ${points}`}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Gradient fill under the line */}
      <linearGradient
        id={`gradient-${color.replace("#", "")}`}
        x1="0%"
        y1="0%"
        x2="0%"
        y2="100%"
      >
        <stop offset="0%" stopColor={color} stopOpacity="0.3" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </linearGradient>

      <motion.path
        d={`M ${points} L ${width},${height} L 0,${height} Z`}
        fill={`url(#gradient-${color.replace("#", "")})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </motion.svg>
  );
};

const SparklineStatCard = ({
  title,
  value,
  change,
  data,
  icon,
  color,
}: SparklineStatCardProps) => {
  const isPositive = change >= 0;

  return (
    <motion.div
      className="relative rounded-xl border bg-card p-6 shadow-sm transition-all dark:border-gray-700 dark:bg-slate-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        boxShadow: `0 4px 20px -5px ${color}40`,
        borderColor: `${color}80`,
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full bg-opacity-20`}
            style={{ backgroundColor: `${color}30` }}
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
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>

        <div
          className={`flex items-center rounded-full px-2 py-1`}
          style={{ backgroundColor: `${color}15` }}
        >
          {isPositive ? (
            <TrendingUp className="mr-1 h-3 w-3" style={{ color }} />
          ) : (
            <TrendingDown className="mr-1 h-3 w-3" style={{ color }} />
          )}
          <span className={`text-xs font-medium`} style={{ color }}>
            {isPositive ? "+" : ""}
            {change}%
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between">
        <p className="text-3xl font-bold text-foreground">{value}</p>
        <div className="mb-1">
          <SparklineChart data={data} color={color} />
        </div>
      </div>
    </motion.div>
  );
};

export default function SparklineStatCards() {
  // Sample data for sparklines
  const generateData = (
    base: number,
    volatility: number,
    trend: number,
  ): SparklineDataPoint[] => {
    return Array.from({ length: 12 }, (_, i) => {
      const randomFactor = (Math.random() - 0.5) * volatility;
      const trendFactor = trend * (i / 11);
      return {
        value: Math.max(0, base + randomFactor + trendFactor),
        date: `2023-${i + 1}`,
      };
    });
  };

  const stats = [
    {
      title: "Monthly Revenue",
      value: "$12,543",
      change: 8.2,
      data: generateData(50, 20, 30),
      icon: <DollarSign className="h-5 w-5" />,
      color: "#6366f1", // Indigo
    },
    {
      title: "Active Users",
      value: "2,350",
      change: 5.1,
      data: generateData(40, 15, 20),
      icon: <Users className="h-5 w-5" />,
      color: "#ec4899", // Pink
    },
    {
      title: "New Orders",
      value: "1,795",
      change: -2.3,
      data: generateData(60, 25, -10),
      icon: <ShoppingBag className="h-5 w-5" />,
      color: "#f59e0b", // Amber
    },
    {
      title: "Server Load",
      value: "42%",
      change: 1.5,
      data: generateData(30, 10, 5),
      icon: <Zap className="h-5 w-5" />,
      color: "#10b981", // Emerald
    },
  ];

  return (
    <div className="min-h-screen bg-white px-4 py-10 dark:bg-gray-900">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <SparklineStatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              data={stat.data}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
