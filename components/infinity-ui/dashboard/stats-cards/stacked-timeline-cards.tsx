"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type TimelineDataPoint = {
  date: string;
  value: number;
  previousValue: number;
};

type StackedTimelineCardProps = {
  title: string;
  data: TimelineDataPoint[];
  icon: React.ReactNode;
  color: string;
  valuePrefix?: string;
  valueSuffix?: string;
  description: string;
};

const StackedTimelineCard = ({
  title,
  data,
  icon,
  color,
  valuePrefix = "",
  valueSuffix = "",
  description,
}: StackedTimelineCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(data.length - 1);
  const currentPoint = data[currentIndex];

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Calculate percentage change
  const percentChange =
    currentPoint.previousValue !== 0
      ? ((currentPoint.value - currentPoint.previousValue) /
          currentPoint.previousValue) *
        100
      : 0;

  const isPositive = percentChange >= 0;

  return (
    <motion.div
      className="relative rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800/50"
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
      </div>

      <div className="mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col"
          >
            <div className="flex items-baseline justify-between">
              <p className="text-3xl font-bold text-foreground">
                {valuePrefix}
                {currentPoint.value.toLocaleString()}
                {valueSuffix}
              </p>
              <div
                className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium`}
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
                  {percentChange.toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              <span>{currentPoint.date}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Timeline visualization */}
        <div className="mt-6 h-16">
          <div className="relative h-full w-full">
            {data.map((point, index) => {
              // Calculate height percentage based on the max value in the dataset
              const maxValue = Math.max(...data.map((d) => d.value));
              const height = (point.value / maxValue) * 100;

              return (
                <motion.div
                  key={index}
                  className="absolute bottom-0 cursor-pointer rounded-t-sm transition-all"
                  style={{
                    left: `${(index / (data.length - 1)) * 100}%`,
                    width: `${80 / data.length}%`,
                    height: `${height}%`,
                    backgroundColor:
                      index === currentIndex ? color : `${color}40`,
                    transform: `translateX(-50%) ${index === currentIndex ? "scale(1.1)" : "scale(1)"}`,
                    zIndex: index === currentIndex ? 10 : 1,
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  onClick={() => setCurrentIndex(index)}
                  whileHover={{ scale: 1.1 }}
                />
              );
            })}
          </div>
        </div>

        {/* Navigation controls */}
        <div className="mt-3 flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 disabled:opacity-50 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <p className="text-xs text-muted-foreground">{description}</p>

          <button
            onClick={handleNext}
            disabled={currentIndex === data.length - 1}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 disabled:opacity-50 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function StackedTimelineCards() {
  // Generate sample data for the timeline cards
  const generateTimelineData = (
    baseValue: number,
    volatility: number,
    trend: number,
    months = 6,
  ): TimelineDataPoint[] => {
    const data: TimelineDataPoint[] = [];
    let currentValue = baseValue;

    for (let i = 0; i < months; i++) {
      const previousValue = currentValue;
      const randomFactor = (Math.random() - 0.5) * volatility;
      const trendFactor = trend * (i / (months - 1));

      currentValue = Math.max(0, currentValue + randomFactor + trendFactor);

      const date = new Date();
      date.setMonth(date.getMonth() - (months - 1 - i));

      data.push({
        date: date.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
        value: Math.round(currentValue),
        previousValue: Math.round(previousValue),
      });
    }

    return data;
  };

  const stats = [
    {
      title: "Monthly Active Users",
      data: generateTimelineData(10000, 2000, 5000),
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#6366f1", // Indigo
      description: "Showing 6-month trend",
    },
    {
      title: "Revenue Growth",
      data: generateTimelineData(50000, 10000, 20000),
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
      valuePrefix: "$",
      color: "#ec4899", // Pink
      description: "Monthly revenue data",
    },
    {
      title: "Conversion Rate",
      data: generateTimelineData(3.2, 0.8, 1.5),
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 8.00001L2 22M17.5 15H9M22 12L12 2L9 9.00001H2L12 22L15 15L22 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      valueSuffix: "%",
      color: "#f97316", // Orange
      description: "Website conversion rate",
    },
    {
      title: "New Customers",
      data: generateTimelineData(800, 200, 400),
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 8V14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23 11H17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#10b981", // Emerald
      description: "Monthly customer acquisition",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-4 py-10 dark:bg-gray-900">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StackedTimelineCard
              key={index}
              title={stat.title}
              data={stat.data}
              icon={stat.icon}
              color={stat.color}
              valuePrefix={stat.valuePrefix}
              valueSuffix={stat.valueSuffix}
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
