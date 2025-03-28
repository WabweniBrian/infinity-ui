"use client";

import type React from "react";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Factory, BarChart2, Clock, ShieldCheck } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

interface StatProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  color: string;
  efficiency: number;
  index: number;
}

const stats: StatProps[] = [
  {
    icon: <Factory className="h-6 w-6" />,
    title: "Production",
    value: "98.7%",
    description: "Operational efficiency",
    color: "from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400",
    efficiency: 98.7,
    index: 0,
  },
  {
    icon: <BarChart2 className="h-6 w-6" />,
    title: "Output",
    value: "1.4M",
    description: "Units per month",
    color:
      "from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400",
    efficiency: 85,
    index: 1,
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Cycle Time",
    value: "-18%",
    description: "Reduction this quarter",
    color:
      "from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400",
    efficiency: 92,
    index: 2,
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Quality",
    value: "99.96%",
    description: "Defect-free rate",
    color: "from-slate-500 to-gray-500 dark:from-slate-400 dark:to-gray-400",
    efficiency: 99.96,
    index: 3,
  },
];

// Gear animation
const GearAnimation = ({
  size,
  position,
  duration,
  delay,
}: {
  size: number;
  position: string;
  duration: number;
  delay: number;
}) => {
  return (
    <motion.div
      className="absolute text-slate-300/20 dark:text-slate-600/20"
      style={{ ...JSON.parse(position) }}
      animate={{ rotate: 360 }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
        delay,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm7.07-3.5a8.26 8.26 0 0 0-.81-1.97l1.03-1.03a.75.75 0 0 0 0-1.06l-1.06-1.06a.75.75 0 0 0-1.06 0L16.14 5.4a8.26 8.26 0 0 0-1.97-.81l-.22-1.47a.75.75 0 0 0-.74-.62h-1.5a.75.75 0 0 0-.74.62l-.22 1.47a8.26 8.26 0 0 0-1.97.81L7.75 4.37a.75.75 0 0 0-1.06 0L5.63 5.43a.75.75 0 0 0 0 1.06L6.66 7.5a8.26 8.26 0 0 0-.81 1.97l-1.47.22a.75.75 0 0 0-.62.74v1.5c0 .37.27.68.62.74l1.47.22c.17.7.44 1.36.81 1.97l-1.03 1.03a.75.75 0 0 0 0 1.06l1.06 1.06c.29.29.77.29 1.06 0l1.03-1.03c.61.37 1.27.64 1.97.81l.22 1.47c.06.35.37.62.74.62h1.5c.37 0 .68-.27.74-.62l.22-1.47c.7-.17 1.36-.44 1.97-.81l1.03 1.03c.29.29.77.29 1.06 0l1.06-1.06a.75.75 0 0 0 0-1.06l-1.03-1.03c.37-.61.64-1.27.81-1.97l1.47-.22c.35-.06.62-.37.62-.74v-1.5a.75.75 0 0 0-.62-.74l-1.47-.22z" />
      </svg>
    </motion.div>
  );
};

// Blueprint grid background
const BlueprintGrid = () => {
  return (
    <div className="absolute inset-0 opacity-5 dark:opacity-10">
      <svg width="100%" height="100%">
        <pattern
          id="blueprint-grid-mfg"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-slate-500 dark:text-slate-400"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#blueprint-grid-mfg)" />
      </svg>
    </div>
  );
};

// Efficiency gauge component
const EfficiencyGauge = ({
  value,
  color,
}: {
  value: number;
  color: string;
}) => {
  const percentage = Math.min(100, Math.max(0, value));

  return (
    <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
      <motion.div
        className={`absolute h-full rounded-full bg-gradient-to-r ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </div>
  );
};

const ManufacturingStats = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-slate-100 py-24 dark:bg-slate-900"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Background Elements */}
      <BlueprintGrid />
      <GearAnimation
        size={80}
        position='{"top": "10%", "right": "10%"}'
        duration={20}
        delay={0}
      />
      <GearAnimation
        size={60}
        position='{"top": "15%", "right": "15%"}'
        duration={15}
        delay={0.5}
      />
      <GearAnimation
        size={100}
        position='{"bottom": "10%", "left": "10%"}'
        duration={25}
        delay={0.2}
      />
      <GearAnimation
        size={70}
        position='{"bottom": "15%", "left": "15%"}'
        duration={18}
        delay={0.7}
      />

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center justify-center rounded-full bg-slate-200 px-4 py-1 dark:bg-slate-800">
            <Factory className="mr-2 h-4 w-4 text-slate-600 dark:text-slate-400" />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Production Metrics
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Industrial{" "}
            <span className="text-slate-600 dark:text-slate-400">
              performance
            </span>{" "}
            analytics
          </h2>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Optimizing manufacturing processes through data-driven insights
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
              {/* Technical Corner */}
              <div className="absolute -right-4 -top-4 h-8 w-8 rotate-45 transform bg-slate-200 dark:bg-slate-700" />

              <div className="flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-br ${stat.color} text-white`}
                >
                  {stat.icon}
                </div>

                {/* Technical Indicator */}
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-200 text-xs font-bold text-slate-600 dark:border-slate-700 dark:text-slate-400">
                  {stat.index + 1}
                </div>
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

              {/* Efficiency Gauge */}
              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    Efficiency
                  </span>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    {stat.efficiency}%
                  </span>
                </div>
                <EfficiencyGauge value={stat.efficiency} color={stat.color} />
              </div>

              {/* Technical Diagram on Hover */}
              <AnimatePresence>
                {hoveredIndex === stat.index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-3 right-3"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-slate-400"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v8M8 12h8" />
                    </svg>
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

export default ManufacturingStats;
