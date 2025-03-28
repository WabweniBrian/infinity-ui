"use client";

import type React from "react";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, ArrowUpRight, Clock, Globe, Award, Zap } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type Stat = {
  id: number;
  value: string;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
};

const stats: Stat[] = [
  {
    id: 1,
    value: "10M+",
    label: "Active Users",
    description: "Users across 150+ countries trust our platform daily",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    id: 2,
    value: "99.9%",
    label: "Uptime",
    description: "Industry-leading reliability and service availability",
    icon: ArrowUpRight,
    color: "bg-green-500",
  },
  {
    id: 3,
    value: "50ms",
    label: "Response Time",
    description: "Lightning-fast global response and processing time",
    icon: Clock,
    color: "bg-purple-500",
  },
  {
    id: 4,
    value: "150+",
    label: "Countries",
    description: "Serving customers and processing data worldwide",
    icon: Globe,
    color: "bg-amber-500",
  },
  {
    id: 5,
    value: "15+",
    label: "Industry Awards",
    description: "Recognized for excellence in service and innovation",
    icon: Award,
    color: "bg-red-500",
  },
  {
    id: 6,
    value: "24/7",
    label: "Support",
    description: "Round-the-clock customer service and technical support",
    icon: Zap,
    color: "bg-indigo-500",
  },
];

const StatsGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  return (
    <section className="min-h-screem relative overflow-hidden bg-gray-50 py-24 dark:bg-gray-900/50">
      {/* Dark mode toggle */}
      <DarkModeToggle />
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,theme(colors.indigo.100/30%),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,theme(colors.indigo.900/20%),transparent_70%)]"></div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            opacity: 0.3,
          }}
        ></div>
      </div>

      <div className="container relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-2 inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
              By The Numbers
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
              Trusted by millions worldwide
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Our platform delivers exceptional performance, reliability, and
              global reach.
            </p>
          </motion.div>
        </div>

        <div
          ref={containerRef}
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {stats.map((stat, index) => {
            const StatIcon = stat.icon;

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800"
              >
                <div className="relative z-10">
                  <div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${stat.color} text-white shadow-lg`}
                  >
                    <StatIcon className="h-6 w-6" />
                  </div>

                  <div className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>

                  <div className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                    {stat.label}
                  </div>

                  <p className="text-gray-600 dark:text-gray-300">
                    {stat.description}
                  </p>
                </div>

                {/* Background decoration */}
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gray-100 opacity-70 transition-transform duration-500 group-hover:scale-110 dark:bg-gray-700/50"></div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-lg shadow-indigo-600/20 transition-colors hover:bg-indigo-700 dark:shadow-indigo-900/20"
          >
            Learn More About Our Impact
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsGrid;
