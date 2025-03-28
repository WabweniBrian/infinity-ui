"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

interface CircularStatProps {
  percentage: number;
  label: string;
  sublabel: string;
  delay: number;
  color: string;
  lightColor: string;
}

const CircularStat = ({
  percentage,
  label,
  sublabel,
  delay,
  color,
  lightColor,
}: CircularStatProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: delay * 0.15 }}
      className="flex flex-col items-center"
    >
      <div className="relative h-40 w-40">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 140 140"
          className="rotate-[-90deg]"
        >
          {/* Background circle */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="currentColor"
            className="text-gray-200 dark:text-slate-800"
            strokeWidth="8"
          />

          {/* Progress circle */}
          <motion.circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="currentColor"
            className={`text-${lightColor} dark:text-${color}`}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={
              isInView
                ? circumference - (percentage / 100) * circumference
                : circumference
            }
            transition={{ duration: 1.5, delay: delay * 0.15, ease: "easeOut" }}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: delay * 0.15 + 0.5 }}
            className="text-center"
          >
            <span
              className={`text-3xl font-bold text-${lightColor} dark:text-${color}`}
            >
              {percentage}%
            </span>
          </motion.div>
        </div>
      </div>

      <motion.h3
        className="mt-6 text-xl font-semibold text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: delay * 0.15 + 0.3 }}
      >
        {label}
      </motion.h3>

      <motion.p
        className="mt-1 text-sm text-gray-600 dark:text-white/60"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: delay * 0.15 + 0.4 }}
      >
        {sublabel}
      </motion.p>
    </motion.div>
  );
};

const CircularStats = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-white py-24 dark:bg-slate-900"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      <motion.div
        className="absolute inset-0 opacity-10 dark:opacity-30"
        style={{
          backgroundImage:
            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypouGpdqsNED5Qlqj4MCfA9YZF8a17gLJpISKTi",
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: backgroundY,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/30 dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-900/30" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl"
          >
            Delivering measurable results
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "80px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mx-auto mt-4 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-lg text-gray-600 dark:text-white/70"
          >
            Our platform has consistently outperformed industry standards
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <CircularStat
            percentage={94}
            label="Customer Satisfaction"
            sublabel="Based on 10k+ reviews"
            delay={1}
            color="emerald-400"
            lightColor="emerald-500"
          />
          <CircularStat
            percentage={87}
            label="Conversion Rate"
            sublabel="Industry avg: 67%"
            delay={2}
            color="cyan-400"
            lightColor="cyan-600"
          />
          <CircularStat
            percentage={99}
            label="Uptime Guarantee"
            sublabel="Over the past 12 months"
            delay={3}
            color="blue-400"
            lightColor="blue-600"
          />
          <CircularStat
            percentage={78}
            label="Cost Reduction"
            sublabel="For enterprise clients"
            delay={4}
            color="purple-400"
            lightColor="purple-600"
          />
        </div>
      </div>
    </section>
  );
};

export default CircularStats;
