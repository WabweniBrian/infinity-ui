"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Calendar,
  BarChart3,
  DollarSign,
  Users,
  ShoppingCart,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { commonChartConfig } from "./chart-utils";

type Period = "daily" | "weekly" | "monthly" | "quarterly" | "yearly";

type MetricData = {
  current: string;
  previous: string;
  change: number;
  currentRaw: number;
  previousRaw: number;
};

type ComparativeMetricProps = {
  title: string;
  icon: React.ReactNode;
  color: string;
  periods: Record<Period, MetricData>;
  defaultPeriod: Period;
};

const ComparativeMetricCard = ({
  title,
  icon,
  color,
  periods,
  defaultPeriod,
}: ComparativeMetricProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(defaultPeriod);

  const periodOptions: Period[] = [
    "daily",
    "weekly",
    "monthly",
    "quarterly",
    "yearly",
  ];
  const periodLabels: Record<Period, string> = {
    daily: "Day",
    weekly: "Week",
    monthly: "Month",
    quarterly: "Quarter",
    yearly: "Year",
  };

  const currentData = periods[selectedPeriod];
  const isPositive = currentData.change >= 0;

  // Chart data for comparison
  const chartData = [
    { name: "Previous", value: currentData.previousRaw },
    { name: "Current", value: currentData.currentRaw },
  ];

  return (
    <motion.div
      className="rounded-xl border bg-background p-6 shadow-sm dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
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

        <select
          className="rounded-md border bg-background px-2 py-1 text-xs dark:border-slate-700"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value as Period)}
        >
          {periodOptions.map((period) => (
            <option key={period} value={period}>
              {periodLabels[period]}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="space-y-1 rounded-lg border p-3 dark:border-gray-700">
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Current {periodLabels[selectedPeriod]}</span>
          </p>
          <AnimatePresence mode="wait">
            <motion.p
              key={`current-${selectedPeriod}`}
              className="text-2xl font-bold text-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {currentData.current}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="space-y-1 rounded-lg border p-3 dark:border-gray-700">
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Previous {periodLabels[selectedPeriod]}</span>
          </p>
          <AnimatePresence mode="wait">
            <motion.p
              key={`previous-${selectedPeriod}`}
              className="text-2xl font-bold text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {currentData.previous}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <div
            className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium`}
            style={{
              backgroundColor: isPositive ? `${color}15` : "#ef444425",
              color: isPositive ? color : "#ef4444",
            }}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <AnimatePresence mode="wait">
              <motion.span
                key={`change-${selectedPeriod}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isPositive ? "+" : ""}
                {currentData.change}%
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <span className="text-xs text-muted-foreground">
          {selectedPeriod === "daily"
            ? "vs yesterday"
            : selectedPeriod === "weekly"
              ? "vs last week"
              : selectedPeriod === "monthly"
                ? "vs last month"
                : selectedPeriod === "quarterly"
                  ? "vs last quarter"
                  : "vs last year"}
        </span>
      </div>

      {/* Visual comparison with Recharts */}
      <div className="mt-4 h-24">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
          >
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" hide />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--background)",
                borderColor: "var(--border)",
                borderRadius: "0.5rem",
              }}
            />
            <Bar
              dataKey="value"
              radius={[4, 4, 4, 4]}
              animationDuration={commonChartConfig.animationDuration}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? "#94a3b8" : color}
                  opacity={index === 0 ? 0.7 : 1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default function ComparativePeriodMetrics() {
  const metrics = [
    {
      title: "Revenue",
      icon: <DollarSign className="h-5 w-5" />,
      color: "#6366f1", // Indigo
      periods: {
        daily: {
          current: "$4,285",
          previous: "$3,985",
          change: 7.5,
          currentRaw: 4285,
          previousRaw: 3985,
        },
        weekly: {
          current: "$28,540",
          previous: "$25,320",
          change: 12.7,
          currentRaw: 28540,
          previousRaw: 25320,
        },
        monthly: {
          current: "$124,350",
          previous: "$118,240",
          change: 5.2,
          currentRaw: 124350,
          previousRaw: 118240,
        },
        quarterly: {
          current: "$385,420",
          previous: "$352,180",
          change: 9.4,
          currentRaw: 385420,
          previousRaw: 352180,
        },
        yearly: {
          current: "$1.45M",
          previous: "$1.28M",
          change: 13.3,
          currentRaw: 1450000,
          previousRaw: 1280000,
        },
      },
      defaultPeriod: "monthly" as Period,
    },
    {
      title: "New Users",
      icon: <Users className="h-5 w-5" />,
      color: "#ec4899", // Pink
      periods: {
        daily: {
          current: "245",
          previous: "218",
          change: 12.4,
          currentRaw: 245,
          previousRaw: 218,
        },
        weekly: {
          current: "1,542",
          previous: "1,485",
          change: 3.8,
          currentRaw: 1542,
          previousRaw: 1485,
        },
        monthly: {
          current: "6,284",
          previous: "5,920",
          change: 6.1,
          currentRaw: 6284,
          previousRaw: 5920,
        },
        quarterly: {
          current: "18,540",
          previous: "16,280",
          change: 13.9,
          currentRaw: 18540,
          previousRaw: 16280,
        },
        yearly: {
          current: "68,420",
          previous: "62,180",
          change: 10.0,
          currentRaw: 68420,
          previousRaw: 62180,
        },
      },
      defaultPeriod: "weekly" as Period,
    },
    {
      title: "Orders",
      icon: <ShoppingCart className="h-5 w-5" />,
      color: "#f97316", // Orange
      periods: {
        daily: {
          current: "85",
          previous: "92",
          change: -7.6,
          currentRaw: 85,
          previousRaw: 92,
        },
        weekly: {
          current: "542",
          previous: "568",
          change: -4.6,
          currentRaw: 542,
          previousRaw: 568,
        },
        monthly: {
          current: "2,284",
          previous: "2,320",
          change: -1.6,
          currentRaw: 2284,
          previousRaw: 2320,
        },
        quarterly: {
          current: "6,840",
          previous: "6,580",
          change: 3.9,
          currentRaw: 6840,
          previousRaw: 6580,
        },
        yearly: {
          current: "28,420",
          previous: "25,180",
          change: 12.9,
          currentRaw: 28420,
          previousRaw: 25180,
        },
      },
      defaultPeriod: "daily" as Period,
    },
    {
      title: "Conversion Rate",
      icon: <BarChart3 className="h-5 w-5" />,
      color: "#10b981", // Emerald
      periods: {
        daily: {
          current: "3.2%",
          previous: "2.8%",
          change: 14.3,
          currentRaw: 3.2,
          previousRaw: 2.8,
        },
        weekly: {
          current: "3.5%",
          previous: "3.2%",
          change: 9.4,
          currentRaw: 3.5,
          previousRaw: 3.2,
        },
        monthly: {
          current: "3.8%",
          previous: "3.6%",
          change: 5.6,
          currentRaw: 3.8,
          previousRaw: 3.6,
        },
        quarterly: {
          current: "4.1%",
          previous: "3.8%",
          change: 7.9,
          currentRaw: 4.1,
          previousRaw: 3.8,
        },
        yearly: {
          current: "4.2%",
          previous: "3.5%",
          change: 20.0,
          currentRaw: 4.2,
          previousRaw: 3.5,
        },
      },
      defaultPeriod: "quarterly" as Period,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Performance Metrics
          </h2>
          <p className="text-sm text-muted-foreground">
            Compare metrics across different time periods
          </p>
        </div>

        <button className="rounded-md bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <ComparativeMetricCard
            key={index}
            title={metric.title}
            icon={metric.icon}
            color={metric.color}
            periods={metric.periods}
            defaultPeriod={metric.defaultPeriod}
          />
        ))}
      </div>

      <div className="rounded-xl border bg-background p-6 shadow-sm dark:border-gray-700">
        <h3 className="mb-4 text-lg font-medium text-foreground">
          Period Comparison Summary
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="border-b dark:border-slate-700">
                <th className="py-2 text-left text-sm font-medium text-muted-foreground">
                  Metric
                </th>
                <th className="py-2 text-left text-sm font-medium text-muted-foreground">
                  Daily
                </th>
                <th className="py-2 text-left text-sm font-medium text-muted-foreground">
                  Weekly
                </th>
                <th className="py-2 text-left text-sm font-medium text-muted-foreground">
                  Monthly
                </th>
                <th className="py-2 text-left text-sm font-medium text-muted-foreground">
                  Quarterly
                </th>
                <th className="py-2 text-left text-sm font-medium text-muted-foreground">
                  Yearly
                </th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric, index) => (
                <tr key={index} className="border-b dark:border-slate-700">
                  <td className="py-3 text-sm font-medium text-foreground">
                    {metric.title}
                  </td>
                  {(
                    [
                      "daily",
                      "weekly",
                      "monthly",
                      "quarterly",
                      "yearly",
                    ] as Period[]
                  ).map((period) => {
                    const data = metric.periods[period];
                    const isPositive = data.change >= 0;

                    return (
                      <td key={period} className="py-3">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-foreground">
                            {data.current}
                          </span>
                          <span
                            className="text-xs"
                            style={{
                              color: isPositive ? "#10b981" : "#ef4444",
                            }}
                          >
                            {isPositive ? "↑" : "↓"}
                            {Math.abs(data.change)}%
                          </span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
