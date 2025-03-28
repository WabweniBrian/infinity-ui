"use client";

import type React from "react";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Utensils, Star, Clock, Users } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

interface StatProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  color: string;
  index: number;
}

const stats: StatProps[] = [
  {
    icon: <Star className="h-6 w-6" />,
    title: "Customer Rating",
    value: "4.9/5",
    description: "Based on 10,000+ reviews",
    color:
      "from-amber-500 to-yellow-500 dark:from-amber-400 dark:to-yellow-400",
    index: 0,
  },
  {
    icon: <Utensils className="h-6 w-6" />,
    title: "Dishes Served",
    value: "1.2M+",
    description: "Meals prepared annually",
    color: "from-rose-500 to-red-500 dark:from-rose-400 dark:to-red-400",
    index: 1,
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Service Time",
    value: "12 min",
    description: "Average preparation time",
    color:
      "from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400",
    index: 2,
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Repeat Customers",
    value: "87%",
    description: "Return within 30 days",
    color: "from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400",
    index: 3,
  },
];

// Steam animation
const SteamAnimation = () => {
  return (
    <div className="absolute left-1/4 top-20 opacity-20 dark:opacity-10">
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-8 w-4 rounded-full bg-white blur-md dark:bg-gray-300"
          style={{
            left: `${i * 10}px`,
          }}
          animate={{
            y: [0, -40],
            opacity: [0, 0.8, 0],
            x: [0, Math.random() * 10 - 5],
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
};

// Plate pattern background
const PlatePatternBackground = () => {
  return (
    <div className="absolute inset-0 opacity-5 dark:opacity-10">
      <svg width="100%" height="100%">
        <pattern
          id="plate-pattern"
          x="0"
          y="0"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx="30"
            cy="30"
            r="25"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-amber-500 dark:text-amber-400"
          />
          <circle
            cx="30"
            cy="30"
            r="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-amber-500 dark:text-amber-400"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#plate-pattern)" />
      </svg>
    </div>
  );
};

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
        >
          <Star
            className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400" : "text-gray-300 dark:text-gray-600"}`}
          />
        </motion.div>
      ))}
    </div>
  );
};

const FoodStats = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-white py-24 dark:bg-slate-900"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Background Elements */}
      <PlatePatternBackground />
      <SteamAnimation />

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center justify-center rounded-full bg-amber-100 px-4 py-1 dark:bg-amber-900/30">
            <Utensils className="mr-2 h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
              Culinary Excellence
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Serving{" "}
            <span className="text-amber-600 dark:text-amber-400">
              exceptional
            </span>{" "}
            dining experiences
          </h2>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Our restaurants consistently deliver quality and satisfaction
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
              {/* Plate Corner */}
              <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full border border-amber-200 dark:border-amber-800" />
              <div className="absolute -right-8 -top-8 h-16 w-16 rounded-full border border-amber-200 dark:border-amber-800" />

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${stat.color} text-white`}
              >
                {stat.icon}
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

              {/* Star Rating for first stat */}
              {stat.index === 0 && (
                <div className="mt-3">
                  <StarRating rating={4.9} />
                </div>
              )}

              {/* Fork and Knife Animation on Hover */}
              <AnimatePresence>
                {hoveredIndex === stat.index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-4 right-4 flex items-center space-x-1"
                  >
                    <motion.div
                      animate={{ rotate: [-5, 5, -5] }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-amber-500 dark:text-amber-400"
                      >
                        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                        <path d="M7 2v20" />
                        <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                      </svg>
                    </motion.div>
                    <motion.div
                      animate={{ rotate: [5, -5, 5] }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-amber-500 dark:text-amber-400"
                      >
                        <path d="M12 2v20" />
                        <path d="M4.93 15.5H20a2 2 0 0 1 0 4H4.93a2 2 0 0 1-1.66-3.12L11 7.13c.65-.88.65-2.39 0-3.27a2 2 0 0 1 0-2.73" />
                      </svg>
                    </motion.div>
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

export default FoodStats;
