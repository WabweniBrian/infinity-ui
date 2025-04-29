"use client";

import type React from "react";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Zap,
  Globe,
  Clock,
  Shield,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type TiltCardProps = {
  title: string;
  value: string;
  subtitle: string;
  change: number;
  icon: React.ReactNode;
  color: string;
  accentColor: string;
};

const TiltCard = ({
  title,
  value,
  subtitle,
  change,
  icon,
  color,
  accentColor,
}: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for the tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for more natural movement
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  });

  // Lighting effect values
  const backgroundX = useTransform(x, [-100, 100], [10, -10]);
  const backgroundY = useTransform(y, [-100, 100], [10, -10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isPositive = change >= 0;

  return (
    <motion.div
      ref={cardRef}
      className="group relative h-full rounded-xl border bg-white p-6 shadow-sm transition-all dark:border-gray-700 dark:bg-gray-800/50"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
        z: 0,
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Lighting effect overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${backgroundX}px ${backgroundY}px, ${color}10, transparent 70%)`,
        }}
      />

      {/* Card content */}
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${color}15` }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotateZ: [0, 10, 0] }}
                transition={{
                  scale: { duration: 0.5 },
                  rotateZ: { duration: 0.5, delay: 0.3 },
                }}
                style={{ color }}
              >
                {icon}
              </motion.div>
            </div>
            <h3 className="text-sm font-medium text-foreground">{title}</h3>
          </div>

          <div
            className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium`}
            style={{
              backgroundColor: isPositive ? `${accentColor}15` : "#ef444425",
              color: isPositive ? accentColor : "#ef4444",
            }}
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
          </div>
        </div>

        <div className="mt-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p className="text-3xl font-bold text-foreground">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
          </motion.div>
        </div>

        {/* 3D floating elements */}
        <motion.div
          className="absolute -right-2 -top-2 h-16 w-16 opacity-10"
          style={{
            color,
            translateZ: 20,
            rotateZ: useTransform(x, [-100, 100], [-5, 5]),
          }}
        >
          {icon}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function TiltCards() {
  const stats = [
    {
      title: "Page Load Time",
      value: "0.42s",
      subtitle: "Average across all pages",
      change: -12.5,
      icon: <Zap className="h-full w-full" />,
      color: "#8b5cf6", // Violet
      accentColor: "#10b981", // Emerald
    },
    {
      title: "Global Reach",
      value: "142",
      subtitle: "Countries with active users",
      change: 8.3,
      icon: <Globe className="h-full w-full" />,
      color: "#ec4899", // Pink
      accentColor: "#10b981", // Emerald
    },
    {
      title: "Uptime",
      value: "99.98%",
      subtitle: "Last 30 days performance",
      change: 0.2,
      icon: <Clock className="h-full w-full" />,
      color: "#f97316", // Orange
      accentColor: "#10b981", // Emerald
    },
    {
      title: "Security Score",
      value: "A+",
      subtitle: "Based on latest audit",
      change: 5.0,
      icon: <Shield className="h-full w-full" />,
      color: "#10b981", // Emerald
      accentColor: "#10b981", // Emerald
    },
  ];

  return (
    <div className="min-h-screen bg-white px-4 py-10 dark:bg-gray-900">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <TiltCard
              key={index}
              title={stat.title}
              value={stat.value}
              subtitle={stat.subtitle}
              change={stat.change}
              icon={stat.icon}
              color={stat.color}
              accentColor={stat.accentColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
