"use client";

import type React from "react";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Gamepad2, Trophy, Users, Zap } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

interface StatProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  color: string;
  level: number;
  index: number;
}

const stats: StatProps[] = [
  {
    icon: <Trophy className="h-6 w-6" />,
    title: "Tournaments",
    value: "1,248",
    description: "Hosted this year",
    color:
      "from-amber-500 to-yellow-500 dark:from-amber-400 dark:to-yellow-400",
    level: 5,
    index: 0,
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Active Players",
    value: "3.4M+",
    description: "Monthly active users",
    color: "from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400",
    level: 4,
    index: 1,
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Avg. Session",
    value: "2.7 hrs",
    description: "Time spent gaming",
    color:
      "from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400",
    level: 3,
    index: 2,
  },
  {
    icon: <Gamepad2 className="h-6 w-6" />,
    title: "Win Rate",
    value: "68%",
    description: "Average win percentage",
    color:
      "from-purple-500 to-violet-500 dark:from-purple-400 dark:to-violet-400",
    level: 4,
    index: 3,
  },
];

// Pixel art animation
const PixelAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-5">
      <div className="absolute h-full w-full">
        <svg width="100%" height="100%">
          <pattern
            id="pixel-grid"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect width="20" height="20" fill="none" />
            {Math.random() > 0.7 && (
              <rect
                width="20"
                height="20"
                fill="currentColor"
                className="text-purple-500/20 dark:text-purple-400/20"
              />
            )}
          </pattern>
          <rect width="100%" height="100%" fill="url(#pixel-grid)" />
        </svg>
      </div>
    </div>
  );
};

// Level bar component
const LevelBar = ({ level, color }: { level: number; color: string }) => {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className={`h-1.5 w-4 rounded-full ${i < level ? `bg-gradient-to-r ${color}` : "bg-gray-200 dark:bg-gray-700"}`}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
        />
      ))}
    </div>
  );
};

// Gamepad animation
const GamepadAnimation = () => {
  return (
    <div className="absolute bottom-10 right-10 opacity-10 dark:opacity-5">
      <motion.div
        animate={{
          rotate: [0, 5, 0, -5, 0],
          y: [0, -5, 0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Gamepad2 className="h-32 w-32 text-purple-500 dark:text-purple-400" />
      </motion.div>
    </div>
  );
};

const GamingStats = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gray-900 py-24 dark:bg-black"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Background Elements */}
      <PixelAnimation />
      <GamepadAnimation />

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center justify-center rounded-full bg-purple-900/50 px-4 py-1 dark:bg-purple-900/30">
            <Gamepad2 className="mr-2 h-4 w-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">
              Gaming Stats
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Level up your{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              gaming experience
            </span>
          </h2>

          <p className="mt-4 text-lg text-gray-300">
            Track your progress and dominate the leaderboards
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: stat.index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-lg dark:border-gray-800 dark:bg-gray-900"
              onHoverStart={() => setHoveredIndex(stat.index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {/* Neon Glow Effect */}
              <div
                className={`absolute -right-10 -top-10 h-20 w-20 rounded-full bg-gradient-to-br ${stat.color} opacity-20 blur-xl`}
              />

              <div className="flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-br ${stat.color} text-white`}
                >
                  {stat.icon}
                </div>

                {/* Level Indicator */}
                <div className="flex flex-col items-end">
                  <span className="mb-1 text-xs font-medium text-gray-400">
                    LEVEL
                  </span>
                  <LevelBar level={stat.level} color={stat.color} />
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

              {/* Animated Button on Hover */}
              <AnimatePresence>
                {hoveredIndex === stat.index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4"
                  >
                    <div
                      className={`w-full rounded-md bg-gradient-to-r py-1.5 text-center text-xs font-medium text-white ${stat.color}`}
                    >
                      VIEW DETAILS
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pixel Corner */}
              <div className="absolute -right-2 -top-2 h-4 w-4 bg-white dark:bg-gray-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GamingStats;
