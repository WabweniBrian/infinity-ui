"use client";

import type React from "react";

import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type FloatingIconCardProps = {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  gradient: string;
  description: string;
};

const FloatingIconCard = ({
  title,
  value,
  change,
  icon,
  gradient,
  description,
}: FloatingIconCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for the floating effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform mouse position to icon movement (limited range)
  const iconX = useTransform(mouseX, [-100, 100], [-10, 10]);
  const iconY = useTransform(mouseY, [-100, 100], [-10, 10]);
  const iconRotate = useTransform(mouseX, [-100, 100], [-5, 5]);

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const isPositive = change >= 0;

  return (
    <motion.div
      ref={cardRef}
      className="group relative overflow-hidden rounded-xl p-6 shadow-lg"
      style={{ background: gradient }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -5 }}
    >
      {/* Floating icon */}
      <motion.div
        className="absolute right-4 top-4 h-20 w-20 text-white/80"
        style={{
          x: iconX,
          y: iconY,
          rotate: iconRotate,
          filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1))",
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {icon}
      </motion.div>

      {/* Card content */}
      <div className="relative z-10">
        <h3 className="mb-1 text-sm font-medium text-white/90">{title}</h3>
        <p className="mb-1 text-3xl font-bold text-white">{value}</p>
        <p className="mb-4 text-xs text-white/70">{description}</p>

        <div className="flex items-center gap-1">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className={`flex items-center rounded-full ${isPositive ? "bg-green-500/30" : "bg-red-500/30"} px-2 py-1`}
          >
            {isPositive ? (
              <TrendingUp className="mr-1 h-3 w-3 text-green-200" />
            ) : (
              <TrendingDown className="mr-1 h-3 w-3 text-red-200" />
            )}
            <span
              className={`text-xs font-medium ${isPositive ? "text-green-200" : "text-red-200"}`}
            >
              {isPositive ? "+" : ""}
              {change}%
            </span>
          </motion.div>
          <span className="text-xs text-white/70">vs last period</span>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/10" />
      <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/10" />
    </motion.div>
  );
};

export default function FloatingIconCards() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$89,421",
      change: 14.5,
      description: "Monthly revenue across all channels",
      icon: (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 1V23"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      gradient: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
    },
    {
      title: "Active Subscriptions",
      value: "2,845",
      change: 7.2,
      description: "Total active subscription plans",
      icon: (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 8V14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23 11H17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      gradient: "linear-gradient(135deg, #EC4899 0%, #F43F5E 100%)",
    },
    {
      title: "Conversion Rate",
      value: "4.28%",
      change: -1.3,
      description: "Website visitor to customer rate",
      icon: (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 3H21V8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 20L21 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 16V21H16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 15L21 21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 4L9 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      gradient: "linear-gradient(135deg, #F97316 0%, #FB923C 100%)",
    },
    {
      title: "Customer Satisfaction",
      value: "94.2%",
      change: 2.8,
      description: "Based on recent customer surveys",
      icon: (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 9H9.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 9H15.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      gradient: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-4 py-10 dark:bg-gray-900">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <FloatingIconCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              gradient={stat.gradient}
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
