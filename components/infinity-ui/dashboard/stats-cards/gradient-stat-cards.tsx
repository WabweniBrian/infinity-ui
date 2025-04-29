"use client";

import type React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  ShoppingCart,
  CreditCard,
  Activity,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

// Types for our stat card props
type StatCardProps = {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  gradient: string;
};

const GradientStatCard = ({
  title,
  value,
  change,
  icon,
  gradient,
}: StatCardProps) => {
  const isPositive = change >= 0;

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl p-6 ${gradient} shadow-lg`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="absolute right-0 top-0 h-24 w-24 opacity-20">
        <motion.div
          className="h-full w-full text-white"
          initial={{ rotate: -10, scale: 0.9 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          {icon}
        </motion.div>
      </div>

      <div className="relative z-10">
        <h3 className="mb-1 text-sm font-medium text-white/80">{title}</h3>
        <p className="mb-4 text-3xl font-bold text-white">{value}</p>

        <div className="flex items-center gap-1">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className={`flex items-center rounded-full ${isPositive ? "bg-green-500/20" : "bg-red-500/20"} px-2 py-1`}
          >
            {isPositive ? (
              <ArrowUpRight className="mr-1 h-3 w-3 text-green-300" />
            ) : (
              <ArrowDownRight className="mr-1 h-3 w-3 text-red-300" />
            )}
            <span
              className={`text-xs font-medium ${isPositive ? "text-green-300" : "text-red-300"}`}
            >
              {Math.abs(change)}%
            </span>
          </motion.div>
          <span className="text-xs text-white/70">vs last month</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function GradientStatCards() {
  const stats = [
    {
      title: "Total Users",
      value: "2,543",
      change: 12.5,
      icon: <Users className="h-full w-full" />,
      gradient: "bg-gradient-to-br from-purple-600 to-blue-500",
    },
    {
      title: "Revenue",
      value: "$45,234",
      change: -2.3,
      icon: <CreditCard className="h-full w-full" />,
      gradient: "bg-gradient-to-br from-pink-500 to-rose-500",
    },
    {
      title: "Orders",
      value: "1,235",
      change: 8.1,
      icon: <ShoppingCart className="h-full w-full" />,
      gradient: "bg-gradient-to-br from-amber-500 to-orange-500",
    },
    {
      title: "Conversion Rate",
      value: "3.42%",
      change: 4.6,
      icon: <Activity className="h-full w-full" />,
      gradient: "bg-gradient-to-br from-emerald-500 to-teal-500",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-4 py-10 dark:bg-gray-900">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <GradientStatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              gradient={stat.gradient}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
