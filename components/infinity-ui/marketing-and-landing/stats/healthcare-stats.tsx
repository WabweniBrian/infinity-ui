"use client";

import type React from "react";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Activity, Clock, Users } from "lucide-react";
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
    icon: <Heart className="h-6 w-6" />,
    title: "Patient Satisfaction",
    value: "98%",
    description: "Based on 10,000+ patient surveys",
    color: "from-rose-500 to-red-500 dark:from-rose-400 dark:to-red-400",
    index: 0,
  },
  {
    icon: <Activity className="h-6 w-6" />,
    title: "Recovery Rate",
    value: "94.3%",
    description: "Successful treatment outcomes",
    color:
      "from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400",
    index: 1,
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Wait Time",
    value: "<15min",
    description: "Average emergency response time",
    color: "from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400",
    index: 2,
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Patients Served",
    value: "50,000+",
    description: "Patients treated annually",
    color:
      "from-violet-500 to-purple-500 dark:from-violet-400 dark:to-purple-400",
    index: 3,
  },
];

// Animated pulse effect component
const PulseEffect = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-40 w-40">
        <motion.div
          className="absolute inset-0 rounded-full bg-rose-500/20 dark:bg-rose-400/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full bg-rose-500/20 dark:bg-rose-400/10"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.2,
          }}
        />
      </div>
    </div>
  );
};

// EKG Line animation
const EkgLine = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
      <svg
        viewBox="0 0 900 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute w-full"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0 50H200L230 20L260 80L290 30L320 70L350 40H450L480 50H900"
          stroke="currentColor"
          strokeWidth="2"
          className="text-rose-500/30 dark:text-rose-400/20"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};

const HealthcareStats = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-white py-24 dark:bg-slate-900"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <svg width="100%" height="100%">
          <pattern
            id="cross-pattern"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M20 5V35M5 20H35"
              stroke="currentColor"
              strokeWidth="2"
              className="text-rose-500 dark:text-rose-400"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#cross-pattern)" />
        </svg>
      </div>

      <PulseEffect />
      <EkgLine />

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center justify-center rounded-full bg-rose-100 px-4 py-1 dark:bg-rose-900/30">
            <Heart className="mr-2 h-4 w-4 text-rose-600 dark:text-rose-400" />
            <span className="text-sm font-medium text-rose-600 dark:text-rose-400">
              Healthcare Excellence
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Committed to Better{" "}
            <span className="text-rose-600 dark:text-rose-400">
              Patient Outcomes
            </span>
          </h2>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Our healthcare facility consistently delivers exceptional care and
            service
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: stat.index * 0.1 }}
              className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-md dark:bg-slate-800"
            >
              {/* Decorative Corner */}
              <div
                className={`absolute -right-6 -top-6 h-12 w-12 rounded-full bg-gradient-to-br ${stat.color} opacity-20`}
              />

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${stat.color} text-white`}
              >
                {stat.icon}
              </div>

              <h3 className="mt-4 text-lg font-medium text-gray-800 dark:text-gray-200">
                {stat.title}
              </h3>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: stat.index * 0.1 + 0.3 }}
              >
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {stat.description}
                </p>
              </motion.div>

              {/* Bottom Accent Line */}
              <motion.div
                className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${stat.color}`}
                initial={{ width: 0 }}
                animate={isInView ? { width: "50%" } : { width: 0 }}
                transition={{ duration: 0.8, delay: stat.index * 0.1 + 0.5 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthcareStats;
