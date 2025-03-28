"use client";

import type React from "react";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Zap, Target, Trophy } from "lucide-react";
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
    icon: <Sparkles className="h-6 w-6" />,
    title: "Engagement Rate",
    value: "87%",
    description: "Average user engagement across all platforms",
    color:
      "bg-gradient-to-br from-amber-400 to-orange-500 dark:from-amber-300 dark:to-orange-400",
    index: 0,
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Load Speed",
    value: "0.8s",
    description: "Average page load time across all devices",
    color:
      "bg-gradient-to-br from-blue-400 to-cyan-500 dark:from-blue-300 dark:to-cyan-400",
    index: 1,
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Conversion Rate",
    value: "24.8%",
    description: "Average conversion rate for all campaigns",
    color:
      "bg-gradient-to-br from-purple-400 to-indigo-500 dark:from-purple-300 dark:to-indigo-400",
    index: 2,
  },
  {
    icon: <Trophy className="h-6 w-6" />,
    title: "Client Satisfaction",
    value: "9.7/10",
    description: "Average satisfaction score from client surveys",
    color:
      "bg-gradient-to-br from-emerald-400 to-teal-500 dark:from-emerald-300 dark:to-teal-400",
    index: 3,
  },
];

const FlipCard = ({ stat }: { stat: StatProps }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: stat.index * 0.1 }}
      className="perspective-1000 relative h-64"
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
    >
      <div
        className="relative h-full w-full transform-gpu transition-all duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front of Card */}
        <div
          className="backface-hidden absolute inset-0 rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-800"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <div className="flex h-full flex-col justify-between">
            <div>
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color} text-white`}
              >
                {stat.icon}
              </div>

              <h3 className="mt-4 text-lg font-medium text-gray-800 dark:text-gray-200">
                {stat.title}
              </h3>

              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>

            {/* Decorative Geometric Shapes */}
            <div className="absolute bottom-4 right-4 flex space-x-1">
              <div className="h-3 w-3 rotate-45 transform rounded-sm bg-gray-200 dark:bg-gray-700" />
              <div className="h-3 w-3 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="h-3 w-3 rotate-12 transform bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div
          className="backface-hidden absolute inset-0 rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-800"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex h-full flex-col items-center justify-center">
            <p className="text-center text-gray-600 dark:text-gray-300">
              {stat.description}
            </p>

            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const GeometricStats = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gray-100 py-24 dark:bg-slate-950"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Geometric Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Circle */}
        <div className="absolute -right-1/4 -top-1/4 h-96 w-96 rounded-full border-[40px] border-gray-200/50 dark:border-gray-800/30" />

        {/* Small Circles */}
        <div className="absolute bottom-20 left-20 h-24 w-24 rounded-full border-8 border-gray-200/50 dark:border-gray-800/30" />
        <div className="absolute left-1/3 top-40 h-16 w-16 rounded-full border-4 border-gray-200/50 dark:border-gray-800/30" />

        {/* Squares */}
        <div className="rotate-15 absolute right-1/4 top-1/4 h-32 w-32 transform border-8 border-gray-200/50 dark:border-gray-800/30" />
        <div className="absolute bottom-1/3 right-1/3 h-20 w-20 -rotate-12 transform border-4 border-gray-200/50 dark:border-gray-800/30" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Performance Metrics
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Hover over each card to see detailed information
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <FlipCard key={stat.title} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GeometricStats;
