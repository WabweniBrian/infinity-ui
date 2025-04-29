"use client";

import React from "react";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Users, DollarSign, ShoppingCart, Award } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type CounterCardProps = {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  duration?: number;
};

const CounterCard = ({
  title,
  value,
  prefix = "",
  suffix = "",
  description,
  icon,
  color,
  duration = 2,
}: CounterCardProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const counterRef = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(counterRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration,
        onUpdate: (val) => setDisplayValue(Math.floor(val)),
        ease: "easeOut",
      });

      return () => controls.stop();
    }
  }, [isInView, value, duration]);

  // Format the number with commas
  const formattedValue = displayValue.toLocaleString();

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl border bg-gray-800/50 p-6 shadow-sm dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      {/* Large background icon */}
      <div className="absolute -right-6 -top-6 opacity-[0.07] transition-transform duration-700 ease-out group-hover:rotate-12 group-hover:scale-110">
        <motion.div
          className="text-foreground"
          style={{ color }}
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5 }}
        >
          {React.cloneElement(icon as React.ReactElement, {
            size: 100,
            strokeWidth: 1,
          })}
        </motion.div>
      </div>

      <div className="relative z-10">
        <h3 className="mb-4 text-sm font-medium text-foreground">{title}</h3>

        <motion.p
          ref={counterRef}
          className="mb-1 text-4xl font-bold tabular-nums tracking-tight text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {prefix}
          {formattedValue}
          {suffix}
        </motion.p>

        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {description}
        </motion.p>

        {/* Animated underline */}
        <motion.div
          className="mt-4 h-1 w-12 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={isInView ? { width: 48 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

export default function AnimatedCounterCards() {
  const stats = [
    {
      title: "Total Users",
      value: 24863,
      description: "Active accounts this month",
      icon: <Users />,
      color: "#6366f1", // Indigo
    },
    {
      title: "Revenue",
      value: 192435,
      prefix: "$",
      description: "Total revenue this quarter",
      icon: <DollarSign />,
      color: "#ec4899", // Pink
    },
    {
      title: "Orders",
      value: 8624,
      description: "Completed orders this month",
      icon: <ShoppingCart />,
      color: "#f97316", // Orange
    },
    {
      title: "Customer Satisfaction",
      value: 96,
      suffix: "%",
      description: "Based on recent surveys",
      icon: <Award />,
      color: "#10b981", // Emerald
    },
  ];

  return (
    <div className="min-h-screen bg-white px-4 py-10 dark:bg-gray-900">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <CounterCard
              key={index}
              title={stat.title}
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              description={stat.description}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
