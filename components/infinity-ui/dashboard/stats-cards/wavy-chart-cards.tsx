"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type WavyChartPoint = {
  value: number;
  label: string;
};

type WavyChartCardProps = {
  title: string;
  value: string;
  change: number;
  data: WavyChartPoint[];
  icon: React.ReactNode;
  color: string;
  description: string;
};

const WavyChart = ({
  data,
  color,
}: {
  data: WavyChartPoint[];
  color: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Calculate min and max for scaling
  const values = data.map((d) => d.value);
  const min = Math.min(...values) * 0.9;
  const max = Math.max(...values) * 1.1;
  const range = max - min;

  // Chart dimensions
  const height = 60;
  const width = 120;
  const padding = 10;

  // Generate path
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
    const y =
      height - padding - ((d.value - min) / range) * (height - padding * 2);
    return { x, y, value: d.value, label: d.label };
  });

  // Create a smooth curve using cubic bezier
  const createSmoothPath = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return "";

    let path = `M ${points[0].x},${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const x1 = points[i].x;
      const y1 = points[i].y;
      const x2 = points[i + 1].x;
      const y2 = points[i + 1].y;

      // Control points for the curve
      const cpx1 = x1 + (x2 - x1) / 3;
      const cpy1 = y1;
      const cpx2 = x1 + (2 * (x2 - x1)) / 3;
      const cpy2 = y2;

      path += ` C ${cpx1},${cpy1} ${cpx2},${cpy2} ${x2},${y2}`;
    }

    return path;
  };

  const linePath = createSmoothPath(points);

  // Create area path by extending the line path to the bottom
  const areaPath = `${linePath} L ${points[points.length - 1].x},${height - padding} L ${points[0].x},${height - padding} Z`;

  return (
    <div className="relative h-[60px] w-[120px]">
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient
            id={`gradient-${color.replace("#", "")}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor={color} stopOpacity="0.5" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Area fill */}
        <motion.path
          d={areaPath}
          fill={`url(#gradient-${color.replace("#", "")})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Data points */}
        {points.map((point, i) => (
          <g
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <motion.circle
              cx={point.x}
              cy={point.y}
              r={hoveredIndex === i ? 4 : 3}
              fill={hoveredIndex === i ? color : "#fff"}
              stroke={color}
              strokeWidth="1.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            />

            {hoveredIndex === i && (
              <g>
                <rect
                  x={point.x - 20}
                  y={point.y - 25}
                  width="40"
                  height="20"
                  rx="4"
                  fill="rgba(0,0,0,0.8)"
                />
                <text
                  x={point.x}
                  y={point.y - 12}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="8"
                >
                  {point.value}
                </text>
              </g>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

const WavyChartCard = ({
  title,
  value,
  change,
  data,
  icon,
  color,
  description,
}: WavyChartCardProps) => {
  const isPositive = change >= 0;

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl border bg-background p-6 shadow-sm dark:border-slate-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      {/* Background decoration */}
      <div
        className="absolute -right-16 -top-16 h-32 w-32 rounded-full opacity-10"
        style={{ backgroundColor: color }}
      />
      <div
        className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full opacity-10"
        style={{ backgroundColor: color }}
      />

      <div className="relative z-10">
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

          <div
            className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium`}
            style={{
              backgroundColor: isPositive ? `${color}15` : "#ef444425",
              color: isPositive ? color : "#ef4444",
            }}
          >
            {isPositive ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            <span>
              {isPositive ? "+" : ""}
              {change}%
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          </div>

          <WavyChart data={data} color={color} />
        </div>
      </div>
    </motion.div>
  );
};

export default function WavyChartCards() {
  // Generate sample data for the wavy charts
  const generateWavyData = (
    baseValue: number,
    volatility: number,
    trend: number,
    points = 7,
  ): WavyChartPoint[] => {
    const data: WavyChartPoint[] = [];
    let currentValue = baseValue;

    for (let i = 0; i < points; i++) {
      const randomFactor = (Math.random() - 0.5) * volatility;
      const trendFactor = trend * (i / (points - 1));

      currentValue = Math.max(0, currentValue + randomFactor + trendFactor);

      const date = new Date();
      date.setDate(date.getDate() - (points - 1 - i));

      data.push({
        value: Math.round(currentValue),
        label: date.toLocaleDateString("en-US", { weekday: "short" }),
      });
    }

    return data;
  };

  const stats = [
    {
      title: "Website Visitors",
      value: "12,543",
      change: 8.2,
      data: generateWavyData(8000, 2000, 4000),
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
            d="M2 12H22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#6366f1", // Indigo
      description: "Daily unique visitors",
    },
    {
      title: "Conversion Rate",
      value: "3.8%",
      change: 1.5,
      data: generateWavyData(3, 0.8, 0.5),
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 3H21V8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 20L21 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 16V21H16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 15L21 21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 4L9 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#ec4899", // Pink
      description: "Visitors who completed a purchase",
    },
    {
      title: "Average Order Value",
      value: "$86.42",
      change: -2.3,
      data: generateWavyData(85, 15, -5),
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 1V23"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#f97316", // Orange
      description: "Average revenue per transaction",
    },
    {
      title: "Customer Retention",
      value: "78.5%",
      change: 4.7,
      data: generateWavyData(70, 10, 8),
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 14C20.49 12.54 22 10.79 22 8.5C22 7.04131 21.4205 5.64236 20.3891 4.61091C19.3576 3.57946 17.9587 3 16.5 3C14.74 3 13.5 3.5 12 5C10.5 3.5 9.26 3 7.5 3C6.04131 3 4.64236 3.57946 3.61091 4.61091C2.57946 5.64236 2 7.04131 2 8.5C2 10.8 3.5 12.55 5 14L12 21L19 14Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#10b981", // Emerald
      description: "Percentage of returning customers",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-4 py-10 dark:bg-slate-900">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <WavyChartCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              data={stat.data}
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
