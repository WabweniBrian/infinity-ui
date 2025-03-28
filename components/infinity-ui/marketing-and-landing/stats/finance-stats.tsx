"use client";

import type React from "react";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, DollarSign, BarChart, PieChart } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

interface StatProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: {
    value: string;
    positive: boolean;
  };
  chartData: number[];
  color: string;
  index: number;
}

const stats: StatProps[] = [
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Annual Return",
    value: "24.8%",
    change: {
      value: "+5.3%",
      positive: true,
    },
    chartData: [30, 40, 35, 50, 49, 60, 70, 91, 86],
    color:
      "from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400",
    index: 0,
  },
  {
    icon: <DollarSign className="h-6 w-6" />,
    title: "Assets Under Management",
    value: "$2.4B",
    change: {
      value: "+12.5%",
      positive: true,
    },
    chartData: [40, 30, 70, 80, 50, 80, 90, 100, 110],
    color: "from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400",
    index: 1,
  },
  {
    icon: <BarChart className="h-6 w-6" />,
    title: "Client Growth",
    value: "12,500+",
    change: {
      value: "+18.2%",
      positive: true,
    },
    chartData: [10, 40, 30, 40, 50, 40, 60, 50, 90],
    color:
      "from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400",
    index: 2,
  },
  {
    icon: <PieChart className="h-6 w-6" />,
    title: "Expense Ratio",
    value: "0.12%",
    change: {
      value: "-0.03%",
      positive: true,
    },
    chartData: [50, 45, 40, 30, 25, 20, 15, 10, 12],
    color:
      "from-violet-500 to-purple-500 dark:from-violet-400 dark:to-purple-400",
    index: 3,
  },
];

// Mini Sparkline Chart Component
const SparklineChart = ({ data, color }: { data: number[]; color: string }) => {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;

  // Normalize data to fit in the chart height
  const normalizedData = data.map(
    (value) => ((value - minValue) / (range || 1)) * 40,
  );

  // Create points for the path
  const points = normalizedData
    .map((value, index) => `${(index / (data.length - 1)) * 100},${40 - value}`)
    .join(" ");

  // Extract color names from the color string
  const fromColor = color.split(" ")[0].replace("from-", "");
  const toColor = color.split(" ")[1].replace("to-", "");

  // Map Tailwind color classes to actual hex values
  const colorMap: Record<string, string> = {
    // Light mode colors
    "emerald-500": "#10b981",
    "teal-500": "#14b8a6",
    "blue-500": "#3b82f6",
    "indigo-500": "#6366f1",
    "amber-500": "#f59e0b",
    "orange-500": "#f97316",
    "violet-500": "#8b5cf6",
    "purple-500": "#a855f7",
    // Dark mode colors
    "emerald-400": "#34d399",
    "teal-400": "#2dd4bf",
    "blue-400": "#60a5fa",
    "indigo-400": "#818cf8",
    "amber-400": "#fbbf24",
    "orange-400": "#fb923c",
    "violet-400": "#a78bfa",
    "purple-400": "#c084fc",
  };

  // Get the actual colors based on the theme
  const fromHex = colorMap[fromColor] || "#10b981"; // Default to emerald if not found
  const toHex = colorMap[toColor] || "#14b8a6"; // Default to teal if not found

  // Create unique IDs for the gradients
  const strokeId = `spark-stroke-${fromColor}-${toColor}`;
  const fillId = `spark-fill-${fromColor}-${toColor}`;

  return (
    <div className="h-10 w-full overflow-hidden">
      <svg
        width="100%"
        height="40"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
      >
        <motion.path
          d={`M0,40 L${points} L100,40 Z`}
          fill={`url(#${fillId})`}
          fillOpacity="0.2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.path
          d={`M0,${40 - normalizedData[0]} L${points}`}
          stroke={`url(#${strokeId})`}
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
        <defs>
          <linearGradient id={strokeId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={fromHex} />
            <stop offset="100%" stopColor={toHex} />
          </linearGradient>
          <linearGradient id={fillId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={fromHex} stopOpacity="0.2" />
            <stop offset="100%" stopColor={toHex} stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// Stock ticker animation
const StockTicker = () => {
  const tickers = [
    { symbol: "AAPL", price: "182.63", change: "+1.25%" },
    { symbol: "MSFT", price: "415.32", change: "+0.78%" },
    { symbol: "AMZN", price: "178.75", change: "-0.32%" },
    { symbol: "GOOGL", price: "142.17", change: "+1.05%" },
    { symbol: "META", price: "474.99", change: "+2.15%" },
    { symbol: "TSLA", price: "175.21", change: "-1.45%" },
    { symbol: "NVDA", price: "824.18", change: "+3.27%" },
    { symbol: "BRK.A", price: "613,953", change: "+0.15%" },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden bg-gray-100/50 py-2 dark:bg-slate-800/50">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -2000] }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        {[...tickers, ...tickers].map((ticker, index) => (
          <div key={index} className="mx-6 flex items-center">
            <span className="font-medium text-gray-900 dark:text-white">
              {ticker.symbol}
            </span>
            <span className="ml-2 text-gray-700 dark:text-gray-300">
              {ticker.price}
            </span>
            <span
              className={`ml-2 ${ticker.change.startsWith("+") ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
            >
              {ticker.change}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const FinanceStats = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-white py-24 dark:bg-slate-900"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <svg width="100%" height="100%">
          <pattern
            id="grid-finance"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-gray-500 dark:text-gray-400"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-finance)" />
        </svg>
      </div>

      <StockTicker />

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-4 py-1 dark:bg-emerald-900/30">
            <TrendingUp className="mr-2 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              Investment Performance
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Market-leading{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              financial results
            </span>
          </h2>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Our investment strategies consistently outperform market benchmarks
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: stat.index * 0.1 }}
              className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-md dark:bg-slate-800"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${stat.color} text-white`}
                >
                  {stat.icon}
                </div>

                <div
                  className={`flex items-center rounded-full ${stat.change.positive ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"} px-2 py-0.5 text-xs font-medium`}
                >
                  {stat.change.value}
                </div>
              </div>

              <h3 className="mt-4 text-lg font-medium text-gray-800 dark:text-gray-200">
                {stat.title}
              </h3>

              <motion.p
                className="mt-2 text-3xl font-bold text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: stat.index * 0.1 + 0.3 }}
              >
                {stat.value}
              </motion.p>

              {/* Sparkline Chart */}
              <div className="mt-4">
                <SparklineChart data={stat.chartData} color={stat.color} />
              </div>

              {/* Bottom Accent Line */}
              <motion.div
                className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${stat.color}`}
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 0.8, delay: stat.index * 0.1 + 0.5 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinanceStats;
