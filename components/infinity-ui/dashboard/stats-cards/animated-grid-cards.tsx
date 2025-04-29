"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type AnimatedGridCardProps = {
  title: string;
  value: string;
  change: number;
  total: number;
  active: number;
  icon: React.ReactNode;
  color: string;
  description: string;
};

const AnimatedGridCard = ({
  title,
  value,
  change,
  total,
  active,
  icon,
  color,
  description,
}: AnimatedGridCardProps) => {
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);
  const controls = useAnimation();

  // Calculate percentage for active cells
  const activePercentage = (active / total) * 100;

  // Determine if change is positive
  const isPositive = change >= 0;

  // Calculate grid dimensions
  const gridSize = Math.ceil(Math.sqrt(total));
  const cells = Array.from({ length: total });

  useEffect(() => {
    controls.start({
      transition: { staggerChildren: 0.01 },
    });
  }, [controls]);

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

      <div className="mt-4">
        <p className="text-3xl font-bold text-foreground">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>

      <div className="mt-4">
        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${Math.ceil(total / gridSize)}, minmax(0, 1fr))`,
          }}
        >
          {cells.map((_, index) => {
            const isActive = index < active;

            return (
              <motion.div
                key={index}
                className="aspect-square rounded-sm transition-colors dark:bg-slate-700/50"
                style={{
                  backgroundColor: isActive
                    ? hoveredCell === index
                      ? color
                      : `${color}${hoveredCell !== null ? "40" : "80"}`
                    : "rgba(226, 232, 240, 0.5)",
                  cursor: "pointer",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={controls}
                variants={{
                  initial: { scale: 0, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setHoveredCell(index)}
                onMouseLeave={() => setHoveredCell(null)}
              />
            );
          })}
        </div>

        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>{active.toLocaleString()} active</span>
          <span>{activePercentage.toFixed(1)}%</span>
          <span>{total.toLocaleString()} total</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function AnimatedGridCards() {
  const stats = [
    {
      title: "Active Devices",
      value: "8,942",
      change: 12.5,
      total: 100,
      active: 72,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 16V8.00002C20.9996 7.6493 20.9071 7.30483 20.7315 7.00119C20.556 6.69754 20.3037 6.44539 20 6.27002L13 2.27002C12.696 2.09449 12.3511 2.00208 12 2.00208C11.6489 2.00208 11.304 2.09449 11 2.27002L4 6.27002C3.69626 6.44539 3.44398 6.69754 3.26846 7.00119C3.09294 7.30483 3.00036 7.6493 3 8.00002V16C3.00036 16.3508 3.09294 16.6952 3.26846 16.9989C3.44398 17.3025 3.69626 17.5547 4 17.73L11 21.73C11.304 21.9056 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9056 13 21.73L20 17.73C20.3037 17.5547 20.556 17.3025 20.7315 16.9989C20.9071 16.6952 20.9996 16.3508 21 16Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.27002 6.96002L12 12.01L20.73 6.96002"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 22.08V12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#6366f1", // Indigo
      description: "Connected devices across all platforms",
    },
    {
      title: "Storage Usage",
      value: "68.5%",
      change: -3.2,
      total: 100,
      active: 68,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 9V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 9H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 9V5C8 4.46957 8.21071 3.96086 8.58579 3.58579C8.96086 3.21071 9.46957 3 10 3H14C14.5304 3 15.0391 3.21071 15.4142 3.58579C15.7893 3.96086 16 4.46957 16 5V9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#ec4899", // Pink
      description: "Cloud storage capacity utilization",
    },
    {
      title: "Team Capacity",
      value: "85/100",
      change: 5.7,
      total: 100,
      active: 85,
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
      color: "#f97316", // Orange
      description: "Current team utilization rate",
    },
    {
      title: "Task Completion",
      value: "42/50",
      change: 8.3,
      total: 50,
      active: 42,
      icon: (
        <svg
          width="20"
          height="20"
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
      color: "#10b981", // Emerald
      description: "Weekly tasks completed",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-4 py-10 dark:bg-gray-900">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <AnimatedGridCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              total={stat.total}
              active={stat.active}
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
