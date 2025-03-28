"use client";

import type React from "react";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { BookOpen, GraduationCap, Award, Users } from "lucide-react";
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
    icon: <BookOpen className="h-6 w-6" />,
    title: "Course Completion",
    value: "94%",
    description: "Average completion rate",
    color: "from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400",
    index: 0,
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: "Graduation Rate",
    value: "98.2%",
    description: "Students who graduate on time",
    color:
      "from-violet-500 to-purple-500 dark:from-violet-400 dark:to-purple-400",
    index: 1,
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Certification",
    value: "25,000+",
    description: "Certifications awarded annually",
    color:
      "from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400",
    index: 2,
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Student Success",
    value: "87%",
    description: "Employment rate after graduation",
    color:
      "from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400",
    index: 3,
  },
];

// Floating books animation
const FloatingBooks = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 dark:opacity-10">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, Math.random() > 0.5 ? 5 : -5, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
          }}
        >
          <BookOpen
            className="h-12 w-12 text-blue-500/30 dark:text-blue-400/20"
            style={{ transform: `rotate(${Math.random() * 30 - 15}deg)` }}
          />
        </motion.div>
      ))}
    </div>
  );
};

// Notebook paper background
const NotebookBackground = () => {
  return (
    <div className="absolute inset-0 opacity-5 dark:opacity-10">
      <svg width="100%" height="100%">
        <pattern
          id="notebook-lines"
          x="0"
          y="0"
          width="100%"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="23"
            x2="100%"
            y2="23"
            stroke="currentColor"
            strokeWidth="1"
            className="text-blue-500 dark:text-blue-400"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#notebook-lines)" />
      </svg>
    </div>
  );
};

// Progress bar animation
const ProgressBar = ({ value, color }: { value: number; color: string }) => {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
      <motion.div
        className={`h-full rounded-full bg-gradient-to-r ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </div>
  );
};

const EducationStats = () => {
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
      <NotebookBackground />
      <FloatingBooks />

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center justify-center rounded-full bg-blue-100 px-4 py-1 dark:bg-blue-900/30">
            <GraduationCap className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Learning Outcomes
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Empowering{" "}
            <span className="text-blue-600 dark:text-blue-400">education</span>{" "}
            through results
          </h2>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Our platform helps students achieve their educational goals
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
              {/* Notebook corner fold */}
              <div className="absolute -right-4 -top-4 h-8 w-8 rotate-45 transform bg-gray-100 dark:bg-gray-700" />

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

              {/* Progress Bar */}
              <div className="mt-4">
                <ProgressBar
                  value={
                    Number.parseInt(stat.value.replace(/[^0-9]/g, "")) || 75
                  }
                  color={stat.color}
                />
              </div>

              {/* Pencil Animation on Hover */}
              <AnimatePresence>
                {hoveredIndex === stat.index && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-4 right-4 h-6 w-6 text-gray-400 dark:text-gray-500"
                    style={{ transformOrigin: "bottom right" }}
                  >
                    <motion.svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      animate={{ rotate: [0, 10, 0, -10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <path d="M12 19l7-7 3 3-7 7-3-3z" />
                      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                      <path d="M2 2l7.586 7.586" />
                      <path d="M11 11l2 2" />
                    </motion.svg>
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

export default EducationStats;
