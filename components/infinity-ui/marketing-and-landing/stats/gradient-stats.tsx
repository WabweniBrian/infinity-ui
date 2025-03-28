"use client";

import type React from "react";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Users, Globe, BarChart3 } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}

const StatItem = ({ icon, value, label, delay }: StatItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white/90 p-6 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
    >
      <div className="absolute -right-3 -top-3 h-24 w-24 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-2xl dark:from-purple-500/20 dark:to-blue-500/20" />

      <div className="flex items-start justify-between">
        <div className="rounded-xl bg-purple-50 p-3 dark:bg-white/10">
          {icon}
        </div>
        <ArrowUpRight
          className="text-green-500 dark:text-green-400"
          size={20}
        />
      </div>

      <motion.h3
        className="mt-4 text-4xl font-bold text-gray-900 dark:text-white"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: delay * 0.1 + 0.3 }}
      >
        {value}
      </motion.h3>

      <p className="mt-1 text-sm text-gray-600 dark:text-white/70">{label}</p>
    </motion.div>
  );
};

const GradientStats = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gray-50 py-20 dark:bg-slate-950">
      {/* Darkmode toggle */}
      <DarkModeToggle />

      <div className="absolute -top-40 left-0 right-0 h-80 bg-gradient-to-b from-purple-500/5 to-transparent blur-3xl dark:from-purple-500/10" />
      <div className="absolute -bottom-40 left-0 right-0 h-80 bg-gradient-to-t from-blue-500/5 to-transparent blur-3xl dark:from-blue-500/10" />

      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl"
          >
            Our impact in{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-500">
              numbers
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-gray-600 dark:text-white/70"
          >
            We&apos;ve helped companies around the world achieve remarkable
            results
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatItem
            icon={
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            }
            value="2.4M+"
            label="Active users worldwide"
            delay={1}
          />
          <StatItem
            icon={
              <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            }
            value="120+"
            label="Countries with active users"
            delay={2}
          />
          <StatItem
            icon={
              <BarChart3 className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            }
            value="99.9%"
            label="Uptime performance"
            delay={3}
          />
        </div>
      </div>
    </section>
  );
};

export default GradientStats;
