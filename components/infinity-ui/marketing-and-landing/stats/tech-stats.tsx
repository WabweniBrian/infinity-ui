"use client";

import type React from "react";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Code, Server, Zap, Shield } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

interface StatProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  color: string;
  codeSnippet: string;
  index: number;
}

const stats: StatProps[] = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Performance",
    value: "99.98%",
    description: "Average uptime across all services",
    color: "text-amber-500 dark:text-amber-400",
    codeSnippet: "const uptime = await monitor.getMetrics('uptime');",
    index: 0,
  },
  {
    icon: <Server className="h-6 w-6" />,
    title: "API Requests",
    value: "2.4B+",
    description: "Monthly API requests processed",
    color: "text-blue-500 dark:text-blue-400",
    codeSnippet: "const requests = await api.getMonthlyStats();",
    index: 1,
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "Deployments",
    value: "12,500+",
    description: "Successful deployments per month",
    color: "text-emerald-500 dark:text-emerald-400",
    codeSnippet: "const deploys = await ci.getDeploymentStats();",
    index: 2,
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Security",
    value: "0",
    description: "Security incidents in the past year",
    color: "text-purple-500 dark:text-purple-400",
    codeSnippet: "const incidents = await security.getYearlyReport();",
    index: 3,
  },
];

// Binary background animation
const BinaryBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-5 dark:opacity-10">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-xs text-gray-900 dark:text-gray-200"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, 30],
          }}
          transition={{
            duration: 3 + Math.random() * 5,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
          }}
        >
          {Math.random() > 0.5 ? "1" : "0"}
        </motion.div>
      ))}
    </div>
  );
};

const TechStats = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gray-50 py-24 dark:bg-slate-950"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Tech-themed Background */}
      <BinaryBackground />

      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_30%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_30%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(124,58,237,0.1),transparent_30%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(124,58,237,0.15),transparent_30%)]" />
      </div>

      {/* Circuit Lines */}
      <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-20">
        <svg width="100%" height="100%" className="absolute">
          <pattern
            id="circuit-pattern"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 50h40c5.5 0 10 4.5 10 10s4.5 10 10 10h40M50 0v40c0 5.5 4.5 10 10 10s10 4.5 10 10v40"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              className="text-gray-400 dark:text-gray-600"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center justify-center rounded-full bg-blue-100 px-4 py-1 dark:bg-blue-900/30">
            <Code className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Platform Metrics
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Powering the world&apos;s best{" "}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-violet-400">
              developer experience
            </span>
          </h2>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Our platform delivers enterprise-grade reliability with
            startup-speed innovation
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
              <div className="flex items-center space-x-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 dark:bg-slate-700 ${stat.color}`}
                >
                  {stat.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  {stat.title}
                </h3>
              </div>

              <motion.p
                className="mt-4 text-3xl font-bold text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: stat.index * 0.1 + 0.3 }}
              >
                {stat.value}
              </motion.p>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {stat.description}
              </p>

              {/* Code Snippet */}
              <AnimatePresence>
                {hoveredIndex === stat.index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 rounded-md bg-gray-100 p-3 dark:bg-slate-900"
                  >
                    <code className="font-mono text-xs text-gray-800 dark:text-gray-300">
                      {stat.codeSnippet}
                    </code>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Terminal Cursor */}
              <div className="absolute bottom-4 right-4">
                <motion.div
                  className="h-4 w-2 bg-blue-500 dark:bg-blue-400"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStats;
