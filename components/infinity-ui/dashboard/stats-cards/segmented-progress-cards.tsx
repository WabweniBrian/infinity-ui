"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type ProgressSegment = {
  value: number;
  color: string;
  label: string;
};

type SegmentedProgressCardProps = {
  title: string;
  segments: ProgressSegment[];
  icon: React.ReactNode;
  description: string;
  total: number;
};

const SegmentedProgressCard = ({
  title,
  segments,
  icon,
  description,
  total,
}: SegmentedProgressCardProps) => {
  const [activeSegment, setActiveSegment] = useState<ProgressSegment | null>(
    null,
  );

  // Calculate total of all segments
  const segmentsTotal = segments.reduce(
    (sum, segment) => sum + segment.value,
    0,
  );

  // Calculate percentages and positions
  let currentPosition = 0;
  const segmentsWithPosition = segments.map((segment) => {
    const percentage = (segment.value / total) * 100;
    const position = currentPosition;
    currentPosition += percentage;

    return {
      ...segment,
      percentage,
      position,
    };
  });

  return (
    <motion.div
      className="relative rounded-xl border bg-gray-800/50 p-6 shadow-sm dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
            <motion.div
              className="text-foreground"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              {icon}
            </motion.div>
          </div>
          <h3 className="text-sm font-medium text-foreground">{title}</h3>
        </div>

        <div className="flex items-center text-xs text-muted-foreground">
          <span>
            {Math.round((segmentsTotal / total) * 100)}% of{" "}
            {total.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mt-6">
        {/* Progress bar */}
        <div className="relative h-4 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          {segmentsWithPosition.map((segment, index) => (
            <motion.div
              key={index}
              className="absolute h-full cursor-pointer"
              style={{
                backgroundColor: segment.color,
                left: `${segment.position}%`,
                width: `${segment.percentage}%`,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${segment.percentage}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
              onMouseEnter={() => setActiveSegment(segment)}
              onMouseLeave={() => setActiveSegment(null)}
              whileHover={{ y: -1 }}
            />
          ))}
        </div>

        {/* Segment labels */}
        <div className="mt-3 flex flex-wrap gap-3">
          {segments.map((segment, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-1.5"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              onMouseEnter={() => setActiveSegment(segment)}
              onMouseLeave={() => setActiveSegment(null)}
            >
              <div
                className="h-3 w-3 rounded-sm"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-xs font-medium text-foreground">
                {segment.label}
              </span>
              <span className="text-xs text-muted-foreground">
                {segment.value.toLocaleString()} (
                {Math.round((segment.value / total) * 100)}%)
              </span>
            </motion.div>
          ))}
        </div>

        {/* Description */}
        <motion.div
          className="mt-4 flex items-start gap-2 text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Info className="mt-0.5 h-3 w-3" />
          <p>{description}</p>
        </motion.div>

        {/* Tooltip for active segment */}
        {activeSegment && (
          <motion.div
            className="pointer-events-none absolute -top-16 left-1/2 z-10 -translate-x-1/2 rounded-lg bg-foreground p-2 text-xs text-background shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="font-medium">{activeSegment.label}</div>
            <div className="flex items-center justify-between gap-3">
              <span>{activeSegment.value.toLocaleString()}</span>
              <span>{Math.round((activeSegment.value / total) * 100)}%</span>
            </div>
            <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-foreground" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default function SegmentedProgressCards() {
  const stats = [
    {
      title: "Traffic Sources",
      total: 125000,
      description:
        "Distribution of website traffic sources over the last 30 days",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 17L12 22L22 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12L12 17L22 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      segments: [
        { value: 52500, color: "#6366f1", label: "Organic Search" },
        { value: 37500, color: "#ec4899", label: "Social Media" },
        { value: 22500, color: "#f97316", label: "Direct" },
        { value: 12500, color: "#10b981", label: "Referral" },
      ],
    },
    {
      title: "Revenue Breakdown",
      total: 850000,
      description: "Revenue distribution by product category this quarter",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2V6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 18V22"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 18V22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.5 4.5L19.5 6.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.5 19.5L6.5 17.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.5 4.5L6.5 6.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.5 19.5L17.5 17.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      segments: [
        { value: 340000, color: "#6366f1", label: "Electronics" },
        { value: 255000, color: "#ec4899", label: "Clothing" },
        { value: 170000, color: "#f97316", label: "Home Goods" },
        { value: 85000, color: "#10b981", label: "Other" },
      ],
    },
    {
      title: "Task Completion",
      total: 150,
      description: "Project tasks completion status by department",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 11L12 14L22 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      segments: [
        { value: 60, color: "#6366f1", label: "Development" },
        { value: 45, color: "#ec4899", label: "Design" },
        { value: 30, color: "#f97316", label: "Marketing" },
        { value: 15, color: "#10b981", label: "Management" },
      ],
    },
    {
      title: "Storage Usage",
      total: 1000,
      description: "Cloud storage usage in GB by file type",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 14.8991C2.79401 14.7273 1.82531 14.2386 1.17157 13.5849C0.417157 12.8304 0 11.7946 0 10.5C0 8.01472 2.01472 6 4.5 6C4.77191 6 5.03755 6.02254 5.29425 6.06556C6.14117 4.2839 7.91193 3 10 3C12.7614 3 15 5.23858 15 8C15 8.11681 14.9952 8.23234 14.9858 8.34644C16.7903 8.87455 18.0978 10.5685 18.0978 12.5978C18.0978 13.7248 17.6952 14.7567 17.0209 15.5325"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 22L15 16M15 22L9 16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      segments: [
        { value: 400, color: "#6366f1", label: "Media" },
        { value: 300, color: "#ec4899", label: "Documents" },
        { value: 200, color: "#f97316", label: "Applications" },
        { value: 100, color: "#10b981", label: "Other" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white px-4 py-10 dark:bg-gray-900">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {stats.map((stat, index) => (
            <SegmentedProgressCard
              key={index}
              title={stat.title}
              segments={stat.segments}
              icon={stat.icon}
              description={stat.description}
              total={stat.total}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
