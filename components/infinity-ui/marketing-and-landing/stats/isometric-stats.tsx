"use client";

import type React from "react";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { BarChart2, PieChart, LineChart, Activity } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

interface StatProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
  delay: number;
}

const stats: StatProps[] = [
  {
    icon: <BarChart2 className="h-6 w-6" />,
    title: "Conversion Rate",
    value: "24.8%",
    color:
      "bg-gradient-to-br from-violet-500 to-purple-600 dark:from-violet-400 dark:to-purple-500",
    delay: 0,
  },
  {
    icon: <PieChart className="h-6 w-6" />,
    title: "Market Share",
    value: "62%",
    color:
      "bg-gradient-to-br from-fuchsia-500 to-pink-600 dark:from-fuchsia-400 dark:to-pink-500",
    delay: 1,
  },
  {
    icon: <LineChart className="h-6 w-6" />,
    title: "Growth Rate",
    value: "128%",
    color:
      "bg-gradient-to-br from-blue-500 to-cyan-600 dark:from-blue-400 dark:to-cyan-500",
    delay: 2,
  },
  {
    icon: <Activity className="h-6 w-6" />,
    title: "Active Users",
    value: "1.2M",
    color:
      "bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-500",
    delay: 3,
  },
];

const IsometricCard = ({ stat }: { stat: StatProps }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: stat.delay * 0.15 }}
      className="group relative"
    >
      {/* 3D Isometric Card */}
      <div
        className="relative h-full transform-gpu transition-all duration-500 group-hover:scale-[1.02]"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(10deg) rotateY(15deg)",
        }}
      >
        {/* Card Front */}
        <div className="relative h-full rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-800">
          {/* Icon */}
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color} text-white`}
          >
            {stat.icon}
          </div>

          {/* Content */}
          <h3 className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-200">
            {stat.title}
          </h3>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {stat.value}
          </p>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 right-0 h-24 w-24 rounded-tl-3xl bg-gray-100 dark:bg-slate-700/50" />
        </div>

        {/* Card Shadow */}
        <div
          className="absolute -bottom-2 left-2 right-2 top-2 -z-10 rounded-2xl bg-black/10 blur-sm dark:bg-black/30"
          style={{ transform: "translateZ(-10px)" }}
        />
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute -right-3 -top-3 h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400"
        initial={{ opacity: 0, y: 20 }}
        animate={
          isInView
            ? {
                opacity: [0, 1, 1],
                y: [20, 0, -10, 0],
                x: [0, 5, 0, 5, 0],
              }
            : {}
        }
        transition={{
          duration: 3,
          delay: stat.delay * 0.15 + 0.3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          times: [0, 0.2, 0.5, 1],
        }}
      />

      <motion.div
        className="absolute -bottom-2 -left-2 h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400"
        initial={{ opacity: 0, y: 20 }}
        animate={
          isInView
            ? {
                opacity: [0, 1, 1],
                y: [20, 0, -5, 0],
                x: [0, -5, 0, -5, 0],
              }
            : {}
        }
        transition={{
          duration: 4,
          delay: stat.delay * 0.15 + 0.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          times: [0, 0.2, 0.5, 1],
        }}
      />
    </motion.div>
  );
};

const IsometricStats = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gray-50 py-24 dark:bg-slate-900"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Mesh Background */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-gray-300 dark:text-gray-700"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Gradient Orbs */}
      <motion.div
        className="absolute left-1/4 top-20 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl dark:bg-purple-500/10"
        style={{ y: backgroundY }}
      />
      <motion.div
        className="absolute bottom-20 right-1/4 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-500/10"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]) }}
      />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block rounded-full bg-gray-100 px-4 py-1.5 dark:bg-slate-800"
          >
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Performance Metrics
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl"
          >
            Exceptional results, <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400">
              by the numbers
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-300"
          >
            Our platform delivers industry-leading metrics across all key
            performance indicators
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <IsometricCard key={stat.title} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IsometricStats;
