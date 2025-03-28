"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useAnimate } from "framer-motion";

// Color palettes for charts
export const chartColors = {
  primary: ["#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe", "#e0e7ff"],
  pink: ["#ec4899", "#f472b6", "#f9a8d4", "#fbcfe8", "#fce7f3"],
  orange: ["#f97316", "#fb923c", "#fdba74", "#fed7aa", "#ffedd5"],
  emerald: ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0", "#d1fae5"],
  slate: ["#64748b", "#94a3b8", "#cbd5e1", "#e2e8f0", "#f1f5f9"],
  red: ["#ef4444", "#f87171", "#fca5a5", "#fecaca", "#fee2e2"],
  blue: ["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe", "#dbeafe"],
  amber: ["#f59e0b", "#fbbf24", "#fcd34d", "#fde68a", "#fef3c7"],
  purple: ["#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe", "#ede9fe"],
  teal: ["#14b8a6", "#2dd4bf", "#5eead4", "#99f6e4", "#ccfbf1"],
};

// Common chart configurations
export const chartConfig = {
  gridClassName: "stroke-slate-200 dark:stroke-slate-700",
  tooltipStyle: {
    backgroundColor: "var(--background)",
    borderColor: "var(--border)",
    borderRadius: "0.5rem",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  animationDuration: 1500,
};

// Format large numbers
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

// Format percentage
export const formatPercent = (num: number): string => {
  return `${num.toFixed(1)}%`;
};

// Animated number counter
export const AnimatedCounter: React.FC<{
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}> = ({ value, duration = 1.5, prefix = "", suffix = "", className = "" }) => {
  const count = useMotionValue(0);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const controls = animate(count, value, {
      duration: duration,
      ease: "easeOut",
    });

    return controls.stop;
  }, [value, duration, animate, count]);

  return (
    <motion.span
      ref={scope}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}
      <motion.span>{Math.round(count.get())}</motion.span>
      {suffix}
    </motion.span>
  );
};

// Card wrapper with consistent styling and animations
export const DashboardCard: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    className?: string;
  }
> = ({ children, className = "", ...props }) => {
  return (
    <div {...props}>
      <motion.div
        className={`relative overflow-hidden rounded-xl border bg-background p-6 shadow-sm dark:border-slate-800 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Card title with consistent styling
export const CardTitle = ({
  title,
  subtitle,
  className = "",
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <h3 className="text-lg font-medium text-foreground">{title}</h3>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
};
