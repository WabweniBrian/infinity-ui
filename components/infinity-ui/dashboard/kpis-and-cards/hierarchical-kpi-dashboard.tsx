"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  TrendingUp,
  TrendingDown,
  BarChart,
  PieChart,
  LineChart,
  Activity,
} from "lucide-react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { chartColors, commonChartConfig } from "./chart-utils";

type MetricNode = {
  id: string;
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
  chartData?: any[];
  children?: MetricNode[];
};

type HierarchicalMetricProps = {
  node: MetricNode;
  level: number;
  expanded: Record<string, boolean>;
  toggleExpand: (id: string) => void;
};

const HierarchicalMetric = ({
  node,
  level,
  expanded,
  toggleExpand,
}: HierarchicalMetricProps) => {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expanded[node.id];
  const isPositive = node.change >= 0;

  return (
    <div>
      <motion.div
        className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 ${
          level === 0
            ? "bg-background shadow-sm dark:border-gray-700"
            : "bg-background dark:border-gray-700"
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onClick={() => hasChildren && toggleExpand(node.id)}
        whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
      >
        <div className="flex items-center gap-3">
          {hasChildren && (
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </motion.div>
          )}

          <div
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: `${node.color}15` }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              style={{ color: node.color }}
            >
              {node.icon}
            </motion.div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-foreground">
              {node.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {hasChildren
                ? `${node.children?.length} sub-metrics`
                : "Leaf metric"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <p className="text-xl font-bold text-foreground">{node.value}</p>

          <div
            className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium`}
            style={{
              backgroundColor: isPositive ? `${node.color}15` : "#ef444425",
              color: isPositive ? node.color : "#ef4444",
            }}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>
              {isPositive ? "+" : ""}
              {node.change}%
            </span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            className="ml-6 mt-2 space-y-2 border-l pl-4 dark:border-gray-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {node.children?.map((child) => (
              <HierarchicalMetric
                key={child.id}
                node={child}
                level={level + 1}
                expanded={expanded}
                toggleExpand={toggleExpand}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function HierarchicalKpiDashboard() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    revenue: true,
    users: false,
    engagement: false,
    performance: false,
  });

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const metrics: MetricNode[] = [
    {
      id: "revenue",
      title: "Revenue",
      value: "$1.45M",
      change: 12.5,
      icon: <BarChart className="h-5 w-5" />,
      color: "#6366f1", // Indigo
      chartData: [
        { name: "Subscription", value: 980000 },
        { name: "One-time", value: 320000 },
        { name: "Services", value: 150000 },
      ],
      children: [
        {
          id: "revenue-subscription",
          title: "Subscription Revenue",
          value: "$980K",
          change: 15.2,
          icon: <BarChart className="h-5 w-5" />,
          color: "#818cf8", // Lighter indigo
          children: [
            {
              id: "revenue-subscription-monthly",
              title: "Monthly Plans",
              value: "$420K",
              change: 8.5,
              icon: <BarChart className="h-5 w-5" />,
              color: "#a5b4fc", // Even lighter indigo
            },
            {
              id: "revenue-subscription-annual",
              title: "Annual Plans",
              value: "$560K",
              change: 21.3,
              icon: <BarChart className="h-5 w-5" />,
              color: "#a5b4fc", // Even lighter indigo
            },
          ],
        },
        {
          id: "revenue-one-time",
          title: "One-time Sales",
          value: "$320K",
          change: 5.8,
          icon: <BarChart className="h-5 w-5" />,
          color: "#818cf8", // Lighter indigo
        },
        {
          id: "revenue-services",
          title: "Professional Services",
          value: "$150K",
          change: 9.2,
          icon: <BarChart className="h-5 w-5" />,
          color: "#818cf8", // Lighter indigo
        },
      ],
    },
    {
      id: "users",
      title: "User Metrics",
      value: "68.4K",
      change: 8.3,
      icon: <PieChart className="h-5 w-5" />,
      color: "#ec4899", // Pink
      chartData: [
        { name: "Active", value: 42500 },
        { name: "New", value: 8200 },
        { name: "Inactive", value: 17700 },
      ],
      children: [
        {
          id: "users-active",
          title: "Active Users",
          value: "42.5K",
          change: 12.1,
          icon: <PieChart className="h-5 w-5" />,
          color: "#f472b6", // Lighter pink
        },
        {
          id: "users-new",
          title: "New Users",
          value: "8.2K",
          change: 5.4,
          icon: <PieChart className="h-5 w-5" />,
          color: "#f472b6", // Lighter pink
        },
        {
          id: "users-churn",
          title: "Churn Rate",
          value: "4.2%",
          change: -1.5,
          icon: <PieChart className="h-5 w-5" />,
          color: "#f472b6", // Lighter pink
        },
      ],
    },
    {
      id: "engagement",
      title: "Engagement",
      value: "24.5M",
      change: 15.8,
      icon: <LineChart className="h-5 w-5" />,
      color: "#f97316", // Orange
      chartData: [
        { name: "Sessions", value: 12800000 },
        { name: "Duration", value: 7500000 },
        { name: "Pages", value: 4200000 },
      ],
      children: [
        {
          id: "engagement-sessions",
          title: "Sessions",
          value: "12.8M",
          change: 18.2,
          icon: <LineChart className="h-5 w-5" />,
          color: "#fb923c", // Lighter orange
        },
        {
          id: "engagement-duration",
          title: "Avg. Session Duration",
          value: "4:35",
          change: 7.5,
          icon: <LineChart className="h-5 w-5" />,
          color: "#fb923c", // Lighter orange
        },
        {
          id: "engagement-pages",
          title: "Pages per Session",
          value: "3.8",
          change: 2.1,
          icon: <LineChart className="h-5 w-5" />,
          color: "#fb923c", // Lighter orange
        },
      ],
    },
    {
      id: "performance",
      title: "Performance",
      value: "94.5%",
      change: 2.3,
      icon: <Activity className="h-5 w-5" />,
      color: "#10b981", // Emerald
      chartData: [
        { name: "Uptime", value: 99.98 },
        { name: "Load Time", value: 0.82 },
        { name: "Error Rate", value: 0.05 },
      ],
      children: [
        {
          id: "performance-uptime",
          title: "Uptime",
          value: "99.98%",
          change: 0.1,
          icon: <Activity className="h-5 w-5" />,
          color: "#34d399", // Lighter emerald
        },
        {
          id: "performance-load",
          title: "Page Load Time",
          value: "0.82s",
          change: -12.5,
          icon: <Activity className="h-5 w-5" />,
          color: "#34d399", // Lighter emerald
        },
        {
          id: "performance-errors",
          title: "Error Rate",
          value: "0.05%",
          change: -25.0,
          icon: <Activity className="h-5 w-5" />,
          color: "#34d399", // Lighter emerald
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">KPI Hierarchy</h2>
          <p className="text-sm text-muted-foreground">
            Explore metrics from high-level to detailed breakdowns
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="rounded-md border px-3 py-1 text-sm font-medium text-foreground hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            onClick={() => {
              const allExpanded = Object.values(expanded).every(Boolean);
              const newState = !allExpanded;

              const newExpanded: Record<string, boolean> = {};
              metrics.forEach((metric) => {
                newExpanded[metric.id] = newState;
              });

              setExpanded(newExpanded);
            }}
          >
            {Object.values(expanded).every(Boolean)
              ? "Collapse All"
              : "Expand All"}
          </button>

          <button className="rounded-md bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
            Export
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {metrics.map((metric) => (
          <HierarchicalMetric
            key={metric.id}
            node={metric}
            level={0}
            expanded={expanded}
            toggleExpand={toggleExpand}
          />
        ))}
      </div>

      <div className="rounded-xl border bg-background p-6 shadow-sm dark:border-gray-700">
        <h3 className="mb-4 text-lg font-medium text-foreground">
          KPI Overview
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h4 className="mb-3 text-sm font-medium text-foreground">
              Revenue Breakdown
            </h4>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={metrics[0].chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    animationDuration={commonChartConfig.animationDuration}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {metrics[0].chartData?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          chartColors.primary[
                            index % chartColors.primary.length
                          ]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [
                      `$${(value / 1000).toFixed(0)}K`,
                      "Value",
                    ]}
                    contentStyle={{
                      backgroundColor: "var(--background)",
                      borderColor: "var(--border)",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-medium text-foreground">
              User Metrics
            </h4>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={metrics[1].chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    animationDuration={commonChartConfig.animationDuration}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {metrics[1].chartData?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={chartColors.pink[index % chartColors.pink.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [
                      `${(value / 1000).toFixed(1)}K`,
                      "Users",
                    ]}
                    contentStyle={{
                      backgroundColor: "var(--background)",
                      borderColor: "var(--border)",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="rounded-lg border p-4 dark:border-gray-700"
              style={{ borderLeftColor: metric.color, borderLeftWidth: "3px" }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {metric.title}
                </span>
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: metric.color }}
                />
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <p className="text-2xl font-bold text-foreground">
                  {metric.value}
                </p>
                <div
                  className={`flex items-center gap-1 rounded-full px-1.5 py-0.5 text-xs font-medium`}
                  style={{
                    backgroundColor:
                      metric.change >= 0 ? `${metric.color}15` : "#ef444425",
                    color: metric.change >= 0 ? metric.color : "#ef4444",
                  }}
                >
                  {metric.change >= 0 ? (
                    <TrendingUp className="h-2.5 w-2.5" />
                  ) : (
                    <TrendingDown className="h-2.5 w-2.5" />
                  )}
                  <span>
                    {metric.change >= 0 ? "+" : ""}
                    {metric.change}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
