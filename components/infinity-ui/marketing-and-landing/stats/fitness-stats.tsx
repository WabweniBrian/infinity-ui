"use client";

import type React from "react";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Activity, Heart, Dumbbell, Timer } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

interface StatProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  color: string;
  progress: number;
  index: number;
}

const stats: StatProps[] = [
  {
    icon: <Activity className="h-6 w-6" />,
    title: "Active Users",
    value: "87%",
    description: "Weekly active members",
    color:
      "from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400",
    progress: 87,
    index: 0,
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Health Score",
    value: "24.8%",
    description: "Average improvement",
    color: "from-rose-500 to-pink-500 dark:from-rose-400 dark:to-pink-400",
    progress: 24.8,
    index: 1,
  },
  {
    icon: <Dumbbell className="h-6 w-6" />,
    title: "Workouts",
    value: "3.4M",
    description: "Completed this month",
    color: "from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400",
    progress: 75,
    index: 2,
  },
  {
    icon: <Timer className="h-6 w-6" />,
    title: "Avg. Session",
    value: "42 min",
    description: "Per workout session",
    color:
      "from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400",
    progress: 42,
    index: 3,
  },
];

// Heartbeat animation
const HeartbeatAnimation = () => {
  return (
    <div className="absolute right-20 top-20">
      <motion.div
        animate={{
          scale: [1, 1.2, 1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
        className="h-20 w-20 text-rose-500/20 dark:text-rose-400/10"
      >
        <Heart className="h-full w-full" />
      </motion.div>
    </div>
  );
};

// Circular progress component
const CircularProgress = ({
  value,
  color,
}: {
  value: number;
  color: string;
}) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative h-16 w-16">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 70 70"
        className="rotate-[-90deg]"
      >
        {/* Background circle */}
        <circle
          cx="35"
          cy="35"
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-gray-200 dark:text-gray-700"
          strokeWidth="6"
        />

        {/* Progress circle */}
        <motion.circle
          cx="35"
          cy="35"
          r={radius}
          fill="none"
          stroke={`url(#gradient-${color.replace(/\s/g, "-")})`}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient
            id={`gradient-${color.replace(/\s/g, "-")}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" className={color.split(" ")[0]} />
            <stop offset="100%" className={color.split(" ")[1]} />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
          {value}%
        </span>
      </div>
    </div>
  );
};

// Activity graph line
const ActivityLine = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden opacity-10 dark:opacity-5">
      <svg
        viewBox="0 0 1000 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute w-full"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0 80 L50 70 L100 90 L150 60 L200 80 L250 30 L300 50 L350 20 L400 40 L450 10 L500 50 L550 30 L600 70 L650 40 L700 60 L750 20 L800 50 L850 70 L900 30 L950 60 L1000 40"
          stroke="currentColor"
          strokeWidth="3"
          className="text-emerald-500 dark:text-emerald-400"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};

const FitnessStats = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gray-50 py-24 dark:bg-slate-900"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Background Elements */}
      <HeartbeatAnimation />
      <ActivityLine />

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-4 py-1 dark:bg-emerald-900/30">
            <Activity className="mr-2 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              Fitness Metrics
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Achieve your{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              wellness goals
            </span>
          </h2>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Track your progress with our comprehensive fitness analytics
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: stat.index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md dark:bg-slate-800"
              onHoverStart={() => setHoveredIndex(stat.index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${stat.color} text-white`}
                >
                  {stat.icon}
                </div>

                {/* Circular Progress */}
                <CircularProgress value={stat.progress} color={stat.color} />
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

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {stat.description}
              </p>

              {/* Animated Pulse on Hover */}
              <AnimatePresence>
                {hoveredIndex === stat.index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-3 right-3"
                  >
                    <motion.div
                      className="h-6 w-6 rounded-full bg-emerald-500/20 dark:bg-emerald-400/20"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.2, 0.5, 0.2],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
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

export default FitnessStats;
