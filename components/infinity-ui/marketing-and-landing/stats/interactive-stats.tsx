"use client";

import type React from "react";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Zap, Clock, Award } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
  color: string;
  lightColor: string;
}

const stats: Stat[] = [
  {
    icon: <TrendingUp className="h-6 w-6" />,
    value: "347%",
    label: "Growth",
    description: "Year-over-year revenue growth for our clients",
    color: "from-rose-500 to-orange-500",
    lightColor: "from-rose-600 to-orange-600",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    value: "10x",
    label: "Faster",
    description: "Development speed compared to traditional methods",
    color: "from-amber-500 to-yellow-500",
    lightColor: "from-amber-600 to-yellow-600",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    value: "5,234",
    label: "Hours Saved",
    description: "Average time saved per enterprise client annually",
    color: "from-emerald-500 to-teal-500",
    lightColor: "from-emerald-600 to-teal-600",
  },
  {
    icon: <Award className="h-6 w-6" />,
    value: "#1",
    label: "Ranked",
    description: "In customer satisfaction for 3 years running",
    color: "from-blue-500 to-indigo-500",
    lightColor: "from-blue-600 to-indigo-600",
  },
];

const StatCard = ({ stat, index }: { stat: Stat; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-md dark:bg-white/5 dark:backdrop-blur-sm"
      style={{
        transformStyle: "preserve-3d",
        transform: isHovered
          ? "rotateX(5deg) rotateY(5deg)"
          : "rotateX(0) rotateY(0)",
        transition: "transform 0.3s ease",
      }}
    >
      <div
        className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${stat.lightColor} dark:${stat.color} opacity-10 blur-3xl transition-all duration-500 group-hover:opacity-20 dark:opacity-20 dark:group-hover:opacity-30`}
      />

      <div className="relative p-8">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${stat.lightColor} dark:${stat.color} text-white`}
        >
          {stat.icon}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        >
          <h3 className="mt-6 text-5xl font-bold text-gray-900 dark:text-white">
            {stat.value}
          </h3>
          <p className="mt-1 text-lg font-medium text-gray-800 dark:text-white/90">
            {stat.label}
          </p>
          <p className="mt-4 text-sm text-gray-600 dark:text-white/70">
            {stat.description}
          </p>
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r"
          style={{
            backgroundImage: `linear-gradient(to right, ${stat.lightColor.replace("from-", "").replace(" to-", ", ")})`,
          }}
          initial={{ width: 0 }}
          animate={
            isInView ? { width: isHovered ? "100%" : "40%" } : { width: 0 }
          }
          transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
        />
      </div>
    </motion.div>
  );
};

const InteractiveStats = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gray-50 py-24 dark:bg-slate-950">
      {/* Darkmode toggle */}
      <DarkModeToggle />

      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_40%)] dark:bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.2),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(236,72,153,0.1),transparent_40%)] dark:bg-[radial-gradient(circle_at_70%_70%,rgba(236,72,153,0.2),transparent_40%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Transforming businesses with{" "}
            <span className="relative">
              <span className="relative z-10">measurable results</span>
              <motion.span
                className="absolute -bottom-1 left-0 right-0 z-0 h-3 bg-gradient-to-r from-purple-600 to-pink-600 opacity-30 dark:from-purple-500 dark:to-pink-500 dark:opacity-50"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-white/70">
            Our platform has helped thousands of companies achieve remarkable
            growth
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveStats;
