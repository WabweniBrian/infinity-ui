"use client";

import type React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  BarChart,
  LineChart,
  PieChart,
  Activity,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type RadialChartPoint = {
  value: number;
  label: string;
};

type RadialAreaCardProps = {
  title: string;
  value: string;
  change: number;
  data: RadialChartPoint[];
  color: string;
  icon: React.ReactNode;
};

const RadialAreaChart = ({
  data,
  color,
}: {
  data: RadialChartPoint[];
  color: string;
}) => {
  // Calculate coordinates for the radar chart
  const numPoints = data.length;
  const angleStep = (Math.PI * 2) / numPoints;
  const size = 80;
  const center = size / 2;
  const maxValue = Math.max(...data.map((d) => d.value));

  // Calculate points for the area
  const points = data.map((d, i) => {
    const angle = i * angleStep - Math.PI / 2; // Start from the top
    const radius = (d.value / maxValue) * (size / 2 - 10);
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return { x, y, value: d.value, label: d.label };
  });

  // Create the path for the area
  const areaPath =
    points
      .map((p, i) => {
        return `${i === 0 ? "M" : "L"}${p.x},${p.y}`;
      })
      .join(" ") + " Z"; // Close the path

  return (
    <div className="relative h-20 w-20">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circles */}
        {[0.25, 0.5, 0.75, 1].map((ratio, i) => (
          <motion.circle
            key={i}
            cx={center}
            cy={center}
            r={(size / 2 - 10) * ratio}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="0.5"
            className="dark:stroke-slate-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          />
        ))}

        {/* Axis lines */}
        {Array.from({ length: numPoints }).map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const endX = center + (size / 2 - 10) * Math.cos(angle);
          const endY = center + (size / 2 - 10) * Math.sin(angle);

          return (
            <motion.line
              key={i}
              x1={center}
              y1={center}
              x2={endX}
              y2={endY}
              stroke="#e2e8f0"
              strokeWidth="0.5"
              className="dark:stroke-slate-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            />
          );
        })}

        {/* Data area */}
        <motion.path
          d={areaPath}
          fill={`${color}30`}
          stroke={color}
          strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        {/* Data points */}
        {points.map((point, i) => (
          <motion.circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="2"
            fill={color}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
          />
        ))}
      </svg>
    </div>
  );
};

const RadialAreaCard = ({
  title,
  value,
  change,
  data,
  color,
  icon,
}: RadialAreaCardProps) => {
  const isPositive = change >= 0;

  return (
    <motion.div
      className="relative rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{
        boxShadow: `0 4px 20px -5px ${color}30`,
        borderColor: `${color}50`,
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full`}
            style={{ backgroundColor: `${color}15` }}
          >
            <motion.div
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

        <div
          className={`flex items-center rounded-full px-2 py-1`}
          style={{ backgroundColor: `${color}15` }}
        >
          {isPositive ? (
            <ArrowUpRight className="mr-1 h-3 w-3" style={{ color }} />
          ) : (
            <ArrowDownRight className="mr-1 h-3 w-3" style={{ color }} />
          )}
          <span className={`text-xs font-medium`} style={{ color }}>
            {isPositive ? "+" : ""}
            {change}%
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {data.map((d) => d.label).join(" • ")}
          </p>
        </div>

        <RadialAreaChart data={data} color={color} />
      </div>
    </motion.div>
  );
};

export default function RadialAreaCards() {
  const stats = [
    {
      title: "Performance Score",
      value: "92",
      change: 5.2,
      data: [
        { value: 95, label: "Speed" },
        { value: 88, label: "SEO" },
        { value: 92, label: "A11y" },
        { value: 96, label: "PWA" },
        { value: 89, label: "BP" },
      ],
      color: "#6366f1", // Indigo
      icon: <Activity className="h-5 w-5" />,
    },
    {
      title: "User Engagement",
      value: "78%",
      change: 3.1,
      data: [
        { value: 82, label: "CTR" },
        { value: 65, label: "Time" },
        { value: 90, label: "Pages" },
        { value: 70, label: "Return" },
        { value: 85, label: "Actions" },
      ],
      color: "#ec4899", // Pink
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      title: "Market Analysis",
      value: "High",
      change: -2.3,
      data: [
        { value: 75, label: "Reach" },
        { value: 82, label: "Impact" },
        { value: 60, label: "Brand" },
        { value: 90, label: "ROI" },
        { value: 70, label: "Growth" },
      ],
      color: "#f97316", // Orange
      icon: <LineChart className="h-5 w-5" />,
    },
    {
      title: "Resource Allocation",
      value: "Optimal",
      change: 8.5,
      data: [
        { value: 95, label: "CPU" },
        { value: 80, label: "Memory" },
        { value: 70, label: "Storage" },
        { value: 85, label: "Network" },
        { value: 90, label: "GPU" },
      ],
      color: "#10b981", // Emerald
      icon: <PieChart className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white px-4 py-10 dark:bg-gray-900">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <RadialAreaCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              data={stat.data}
              color={stat.color}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
