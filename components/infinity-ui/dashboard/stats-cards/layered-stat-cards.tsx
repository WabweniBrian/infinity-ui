"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, ChevronDown } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type LayeredStatCardProps = {
  title: string;
  value: string;
  previousValue: string;
  change: number;
  icon: React.ReactNode;
  color: string;
  details: {
    label: string;
    value: string;
  }[];
};

const LayeredStatCard = ({
  title,
  value,
  previousValue,
  change,
  icon,
  color,
  details,
}: LayeredStatCardProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const isPositive = change >= 0;

  return (
    <motion.div
      className="group relative rounded-xl border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      layout
    >
      {/* Main card */}
      <div className="relative z-20 rounded-xl border-b border-transparent bg-white p-6 transition-all group-hover:border-slate-200 dark:bg-gray-800/50 dark:bg-slate-900 dark:group-hover:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${color}15` }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                style={{ color }}
              >
                {icon}
              </motion.div>
            </div>
            <h3 className="text-sm font-medium text-foreground">{title}</h3>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground dark:hover:bg-slate-800"
            aria-label={isExpanded ? "Show less" : "Show more"}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </button>
        </div>

        <div className="mt-4 flex items-baseline justify-between">
          <div>
            <motion.p
              className="text-3xl font-bold text-foreground"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {value}
            </motion.p>
            <motion.p
              className="mt-1 text-xs text-muted-foreground"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              Previous: {previousValue}
            </motion.p>
          </div>

          <motion.div
            className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium`}
            style={{
              backgroundColor: isPositive ? `${color}15` : "#ef444425",
              color: isPositive ? color : "#ef4444",
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            {isPositive ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            <span>
              {isPositive ? "+" : ""}
              {change}%
            </span>
          </motion.div>
        </div>
      </div>

      {/* Expandable details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="relative z-10 rounded-b-xl border-t border-slate-100 bg-slate-50 p-4 dark:border-gray-700 dark:bg-slate-800/50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {details.map((detail, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <span className="text-xs text-muted-foreground">
                    {detail.label}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {detail.value}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Decorative line */}
            <motion.div
              className="mt-4 h-1 w-16 rounded-full"
              style={{ backgroundColor: color }}
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shadow layers for depth effect */}
      <div className="absolute -bottom-1 left-1 right-1 top-1 -z-10 rounded-xl bg-slate-200/50 dark:bg-slate-700/20" />
      <div className="absolute -bottom-2 left-2 right-2 top-2 -z-20 rounded-xl bg-slate-200/30 dark:bg-slate-700/10" />
    </motion.div>
  );
};

export default function LayeredStatCards() {
  const stats = [
    {
      title: "Monthly Revenue",
      value: "$42,389",
      previousValue: "$38,250",
      change: 10.8,
      icon: (
        <svg
          width="24"
          height="24"
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
      details: [
        { label: "Subscriptions", value: "$28,450" },
        { label: "One-time Sales", value: "$13,939" },
        { label: "Avg. Order Value", value: "$84.32" },
        { label: "Refunds", value: "$1,250" },
      ],
    },
    {
      title: "New Customers",
      value: "1,248",
      previousValue: "1,084",
      change: 15.1,
      icon: (
        <svg
          width="24"
          height="24"
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
      color: "#ec4899", // Pink
      details: [
        { label: "Organic", value: "645" },
        { label: "Referral", value: "348" },
        { label: "Social Media", value: "255" },
        { label: "Retention Rate", value: "68%" },
      ],
    },
    {
      title: "Website Traffic",
      value: "128,590",
      previousValue: "135,240",
      change: -4.9,
      icon: (
        <svg
          width="24"
          height="24"
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
            d="M2 12H22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#f97316", // Orange
      details: [
        { label: "Desktop", value: "78,450" },
        { label: "Mobile", value: "50,140" },
        { label: "Bounce Rate", value: "32.4%" },
        { label: "Avg. Session", value: "3:24" },
      ],
    },
    {
      title: "Support Tickets",
      value: "84",
      previousValue: "96",
      change: -12.5,
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#10b981", // Emerald
      details: [
        { label: "Open", value: "24" },
        { label: "In Progress", value: "32" },
        { label: "Closed", value: "28" },
        { label: "Avg. Response", value: "2.4h" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white px-4 py-10 dark:bg-gray-900">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <LayeredStatCard
              key={index}
              title={stat.title}
              value={stat.value}
              previousValue={stat.previousValue}
              change={stat.change}
              icon={stat.icon}
              color={stat.color}
              details={stat.details}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
