"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type GlowingAccentCardProps = {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
  accentColor: string;
  description: string;
};

const GlowingAccentCard = ({
  title,
  value,
  change,
  icon,
  color,
  accentColor,
  description,
}: GlowingAccentCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const glowControls = useAnimation();

  // Animate the glow effect
  useEffect(() => {
    const glowAnimation = async () => {
      while (true) {
        await glowControls.start({
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.05, 1],
          transition: { duration: 3, ease: "easeInOut" },
        });
      }
    };

    glowAnimation();
  }, [glowControls]);

  const isPositive = change >= 0;

  return (
    <motion.div
      className="group relative rounded-xl border bg-background p-6 shadow-sm dark:border-slate-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      {/* Glowing accent */}
      <motion.div
        className="absolute -right-3 -top-3 h-16 w-16 rounded-full blur-xl"
        style={{ backgroundColor: accentColor }}
        animate={glowControls}
      />

      <motion.div
        className="absolute -bottom-3 -left-3 h-16 w-16 rounded-full blur-xl"
        style={{ backgroundColor: color }}
        animate={glowControls}
      />

      {/* Card content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">{title}</h3>

          <motion.div
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{
              backgroundColor: `${color}15`,
              boxShadow: isHovered ? `0 0 20px ${color}50` : "none",
            }}
            animate={{
              scale: isHovered ? 1.1 : 1,
              backgroundColor: isHovered ? `${color}25` : `${color}15`,
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: isHovered ? 360 : 0 }}
              transition={{
                scale: { type: "spring", stiffness: 200, damping: 10 },
                rotate: { duration: 0.5 },
              }}
              style={{ color }}
            >
              {icon}
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`value-${isHovered ? "hovered" : "normal"}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-3xl font-bold text-foreground">{value}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-2 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{description}</p>

            <motion.div
              className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium`}
              style={{
                backgroundColor: isPositive ? `${accentColor}15` : "#ef444425",
                color: isPositive ? accentColor : "#ef4444",
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>
                {isPositive ? "+" : ""}
                {change}%
              </span>
            </motion.div>
          </div>
        </div>

        {/* Accent line */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 rounded-bl-xl rounded-br-xl"
          style={{
            background: `linear-gradient(90deg, ${color} 0%, ${accentColor} 100%)`,
            width: isHovered ? "100%" : "30%",
          }}
          animate={{ width: isHovered ? "100%" : "30%" }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

export default function GlowingAccentCards() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$128,540",
      change: 12.5,
      icon: (
        <svg
          width="20"
          height="20"
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
      color: "#6366f1", // Indigo
      accentColor: "#818cf8", // Lighter indigo
      description: "Total revenue this quarter",
    },
    {
      title: "Active Users",
      value: "24,521",
      change: 8.3,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#ec4899", // Pink
      accentColor: "#f472b6", // Lighter pink
      description: "Monthly active platform users",
    },
    {
      title: "Conversion Rate",
      value: "3.42%",
      change: -1.8,
      icon: (
        <svg
          width="20"
          height="20"
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
      color: "#f97316", // Orange
      accentColor: "#fb923c", // Lighter orange
      description: "Visitor to customer conversion",
    },
    {
      title: "Customer Satisfaction",
      value: "96.8%",
      change: 2.4,
      icon: (
        <svg
          width="20"
          height="20"
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
      color: "#10b981", // Emerald
      accentColor: "#34d399", // Lighter emerald
      description: "Based on customer surveys",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-4 py-10 dark:bg-slate-900">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <GlowingAccentCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              color={stat.color}
              accentColor={stat.accentColor}
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
