"use client";

import type React from "react";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Play, Film, Radio, Users } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

interface StatProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  color: string;
  trend: string;
  index: number;
}

const stats: StatProps[] = [
  {
    icon: <Play className="h-6 w-6" />,
    title: "Streaming",
    value: "2.8M+",
    description: "Monthly active viewers",
    color: "from-red-500 to-rose-500 dark:from-red-400 dark:to-rose-400",
    trend: "+24%",
    index: 0,
  },
  {
    icon: <Film className="h-6 w-6" />,
    title: "Content",
    value: "12,500+",
    description: "Hours of original content",
    color:
      "from-purple-500 to-violet-500 dark:from-purple-400 dark:to-violet-400",
    trend: "+18%",
    index: 1,
  },
  {
    icon: <Radio className="h-6 w-6" />,
    title: "Engagement",
    value: "42 min",
    description: "Average session duration",
    color: "from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400",
    trend: "+7%",
    index: 2,
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Subscribers",
    value: "1.4M",
    description: "Paid memberships",
    color:
      "from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400",
    trend: "+32%",
    index: 3,
  },
];

// Animated play button
const AnimatedPlayButton = () => {
  return (
    <div className="absolute right-20 top-20 opacity-10 dark:opacity-5">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="flex h-32 w-32 items-center justify-center rounded-full border-8 border-red-500/30 dark:border-red-400/30"
      >
        <Play className="ml-2 h-16 w-16 text-red-500/50 dark:text-red-400/50" />
      </motion.div>
    </div>
  );
};

// Film strip background
const FilmStripBackground = () => {
  return (
    <div className="absolute inset-0 opacity-5 dark:opacity-10">
      <div className="absolute left-0 right-0 top-0 flex h-12">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="mx-1 aspect-square h-full bg-black dark:bg-white"
          />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex h-12">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="mx-1 aspect-square h-full bg-black dark:bg-white"
          />
        ))}
      </div>
    </div>
  );
};

// Audience graph component
const AudienceGraph = ({ color }: { color: string }) => {
  const points = [20, 40, 30, 50, 35, 45, 55, 40, 60];
  const pathData = points
    .map((point, i) => `${(i / (points.length - 1)) * 100},${100 - point}`)
    .join(" ");

  // Extract color names from the color string
  const fromColor = color.split(" ")[0].replace("from-", "");
  const toColor = color.split(" ")[1].replace("to-", "");

  // Map Tailwind color classes to actual hex values
  const colorMap: Record<string, string> = {
    // Light mode colors
    "red-500": "#ef4444",
    "rose-500": "#f43f5e",
    "purple-500": "#a855f7",
    "violet-500": "#8b5cf6",
    "blue-500": "#3b82f6",
    "indigo-500": "#6366f1",
    "emerald-500": "#10b981",
    "teal-500": "#14b8a6",
    // Dark mode colors
    "red-400": "#f87171",
    "rose-400": "#fb7185",
    "purple-400": "#c084fc",
    "violet-400": "#a78bfa",
    "blue-400": "#60a5fa",
    "indigo-400": "#818cf8",
    "emerald-400": "#34d399",
    "teal-400": "#2dd4bf",
  };

  // Get the actual colors based on the theme
  const fromHex = colorMap[fromColor] || "#ef4444"; // Default to red if not found
  const toHex = colorMap[toColor] || "#f43f5e"; // Default to rose if not found

  // Create a unique ID for the gradient
  const lineId = `audience-line-${fromColor}-${toColor}`;

  return (
    <div className="h-10 w-full overflow-hidden">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.polyline
          points={pathData}
          fill="none"
          stroke={`url(#${lineId})`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id={lineId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={fromHex} />
            <stop offset="100%" stopColor={toHex} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const MediaStats = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 to-black py-24"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Background Elements */}
      <FilmStripBackground />
      <AnimatedPlayButton />

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center justify-center rounded-full bg-red-900/30 px-4 py-1">
            <Play className="mr-2 h-4 w-4 text-red-400" />
            <span className="text-sm font-medium text-red-400">
              Entertainment Analytics
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Captivating{" "}
            <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
              audiences
            </span>{" "}
            worldwide
          </h2>

          <p className="mt-4 text-lg text-gray-300">
            Delivering premium content to millions of viewers
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: stat.index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-lg"
              onHoverStart={() => setHoveredIndex(stat.index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {/* Spotlight Effect */}
              <div
                className={`absolute -right-10 -top-10 h-20 w-20 rounded-full bg-gradient-to-br ${stat.color} opacity-20 blur-xl`}
              />

              <div className="flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${stat.color} text-white`}
                >
                  {stat.icon}
                </div>

                <div className="rounded-full bg-green-900/30 px-2 py-0.5 text-xs font-medium text-green-400">
                  {stat.trend}
                </div>
              </div>

              <h3 className="mt-4 text-lg font-medium text-gray-200">
                {stat.title}
              </h3>

              <motion.p
                className="mt-2 text-3xl font-bold text-white"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: stat.index * 0.1 + 0.3 }}
              >
                {stat.value}
              </motion.p>

              <p className="mt-1 text-sm text-gray-400">{stat.description}</p>

              {/* Audience Graph */}
              <div className="mt-4">
                <AudienceGraph color={stat.color} />
              </div>

              {/* Play Animation on Hover */}
              <AnimatePresence>
                {hoveredIndex === stat.index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10"
                  >
                    <Play className="ml-0.5 h-4 w-4 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaStats;
