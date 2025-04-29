"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Calendar,
  Users,
  DollarSign,
  ShoppingCart,
  Clock,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { commonChartConfig } from "./chart-utils";

type MetricCardProps = {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  color: string;
  chartData: any[];
  chartType: "line" | "bar" | "area";
  isSelected: boolean;
  onSelect: () => void;
};

const MetricCard = ({
  title,
  value,
  change,
  changeLabel,
  icon,
  color,
  chartData,
  chartType,
  isSelected,
  onSelect,
}: MetricCardProps) => {
  const isPositive = change >= 0;

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl border p-5 shadow-sm transition-all dark:border-gray-700 ${
        isSelected
          ? "ring-2 dark:bg-slate-800/50"
          : "bg-background dark:bg-slate-900"
      }`}
      style={{
        outlineColor: color,
        boxShadow: isSelected ? `0 0 0 1px ${color}30` : undefined,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
      onClick={onSelect}
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

        <button className="text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between">
          <p className="text-3xl font-bold text-foreground">{value}</p>

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
            <span>
              {isPositive ? "+" : ""}
              {change}%
            </span>
          </div>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{changeLabel}</span>
          </span>
        </div>
      </div>

      <div className="mt-4 h-[60px]">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "line" ? (
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
            >
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={false}
                animationDuration={commonChartConfig.animationDuration}
              />
            </LineChart>
          ) : chartType === "area" ? (
            <AreaChart
              data={chartData}
              margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
            >
              <defs>
                <linearGradient
                  id={`colorGradient-${title}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                fill={`url(#colorGradient-${title})`}
                animationDuration={commonChartConfig.animationDuration}
              />
            </AreaChart>
          ) : (
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
            >
              <Bar
                dataKey="value"
                fill={color}
                radius={[2, 2, 0, 0]}
                animationDuration={commonChartConfig.animationDuration}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Decorative accent */}
      <div
        className="absolute bottom-0 left-0 h-1 w-full"
        style={{ backgroundColor: `${color}30` }}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-1"
        style={{
          backgroundColor: color,
          width: isSelected ? "100%" : "30%",
        }}
        animate={{ width: isSelected ? "100%" : "30%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default function KpiMetricGrid() {
  const [selectedMetric, setSelectedMetric] = useState<number>(0);

  const metrics = [
    {
      title: "Revenue",
      value: "$48,352",
      change: 12.5,
      changeLabel: "vs last month",
      icon: <DollarSign className="h-5 w-5" />,
      color: "#6366f1", // Indigo
      chartData: [
        { name: "Jan", value: 35000 },
        { name: "Feb", value: 45000 },
        { name: "Mar", value: 32000 },
        { name: "Apr", value: 47000 },
        { name: "May", value: 42000 },
        { name: "Jun", value: 55000 },
        { name: "Jul", value: 60000 },
      ],
      chartType: "area" as const,
    },
    {
      title: "New Users",
      value: "2,845",
      change: 8.1,
      changeLabel: "vs last month",
      icon: <Users className="h-5 w-5" />,
      color: "#ec4899", // Pink
      chartData: [
        { name: "Jan", value: 2000 },
        { name: "Feb", value: 2500 },
        { name: "Mar", value: 1800 },
        { name: "Apr", value: 3000 },
        { name: "May", value: 3500 },
        { name: "Jun", value: 4000 },
        { name: "Jul", value: 3800 },
      ],
      chartType: "bar" as const,
    },
    {
      title: "Orders",
      value: "1,257",
      change: -3.2,
      changeLabel: "vs last month",
      icon: <ShoppingCart className="h-5 w-5" />,
      color: "#f97316", // Orange
      chartData: [
        { name: "Jan", value: 1450 },
        { name: "Feb", value: 1400 },
        { name: "Mar", value: 1500 },
        { name: "Apr", value: 1350 },
        { name: "May", value: 1250 },
        { name: "Jun", value: 1300 },
        { name: "Jul", value: 1257 },
      ],
      chartType: "line" as const,
    },
    {
      title: "Avg. Session",
      value: "4:35",
      change: 6.8,
      changeLabel: "vs last month",
      icon: <Clock className="h-5 w-5" />,
      color: "#10b981", // Emerald
      chartData: [
        { name: "Jan", value: 3.5 },
        { name: "Feb", value: 3.8 },
        { name: "Mar", value: 4.0 },
        { name: "Apr", value: 4.2 },
        { name: "May", value: 4.1 },
        { name: "Jun", value: 4.3 },
        { name: "Jul", value: 4.6 },
      ],
      chartType: "area" as const,
    },
  ];

  // Detailed view for the selected metric
  const selectedMetricData = metrics[selectedMetric];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeLabel={metric.changeLabel}
            icon={metric.icon}
            color={metric.color}
            chartData={metric.chartData}
            chartType={metric.chartType}
            isSelected={selectedMetric === index}
            onSelect={() => setSelectedMetric(index)}
          />
        ))}
      </div>

      {/* Detailed view */}
      <motion.div
        className="rounded-xl border bg-background p-6 shadow-sm dark:border-gray-700"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        transition={{ duration: 0.3 }}
        layout
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full"
              style={{ backgroundColor: `${selectedMetricData.color}15` }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 3,
                }}
                style={{ color: selectedMetricData.color }}
              >
                {selectedMetricData.icon}
              </motion.div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground">
                {selectedMetricData.title} Details
              </h3>
              <p className="text-sm text-muted-foreground">
                Detailed breakdown and analysis
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">
              {selectedMetricData.value}
            </span>
            <div
              className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium`}
              style={{
                backgroundColor:
                  selectedMetricData.change >= 0
                    ? `${selectedMetricData.color}15`
                    : "#ef444425",
                color:
                  selectedMetricData.change >= 0
                    ? selectedMetricData.color
                    : "#ef4444",
              }}
            >
              {selectedMetricData.change >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>
                {selectedMetricData.change >= 0 ? "+" : ""}
                {selectedMetricData.change}%
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 h-64">
          <ResponsiveContainer width="100%" height="100%">
            {selectedMetricData.chartType === "line" ||
            selectedMetricData.chartType === "area" ? (
              <LineChart data={selectedMetricData.chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  className={commonChartConfig.gridClassName}
                />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    borderColor: "var(--border)",
                    borderRadius: "0.5rem",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={selectedMetricData.color}
                  strokeWidth={3}
                  dot={{ fill: selectedMetricData.color, r: 4 }}
                  activeDot={{ r: 6, fill: selectedMetricData.color }}
                  animationDuration={commonChartConfig.animationDuration}
                />
                {selectedMetricData.chartType === "area" && (
                  <Area
                    type="monotone"
                    dataKey="value"
                    fill={`${selectedMetricData.color}30`}
                    stroke="transparent"
                    animationDuration={commonChartConfig.animationDuration}
                  />
                )}
              </LineChart>
            ) : (
              <BarChart data={selectedMetricData.chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  className={commonChartConfig.gridClassName}
                />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    borderColor: "var(--border)",
                    borderRadius: "0.5rem",
                  }}
                />
                <Bar
                  dataKey="value"
                  fill={selectedMetricData.color}
                  radius={[4, 4, 0, 0]}
                  animationDuration={commonChartConfig.animationDuration}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            "Daily Avg",
            "Weekly Growth",
            "Monthly Target",
            "Yearly Projection",
          ].map((label, index) => {
            const values = ["$1,612", "+4.2%", "$50,000", "$580,224"];

            return (
              <div
                key={index}
                className="rounded-lg border p-3 dark:border-gray-700"
              >
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="mt-1 text-lg font-semibold text-foreground">
                  {values[index]}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
