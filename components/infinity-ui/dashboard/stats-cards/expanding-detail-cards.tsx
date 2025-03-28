"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, TrendingUp, TrendingDown } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type DetailItem = {
  label: string;
  value: string;
  change?: number;
};

type ExpandingDetailCardProps = {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
  details: DetailItem[];
};

const ExpandingDetailCard = ({
  title,
  value,
  change,
  icon,
  color,
  details,
}: ExpandingDetailCardProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const isPositive = change >= 0;

  return (
    <motion.div
      className="overflow-hidden rounded-xl border bg-background shadow-sm dark:border-slate-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      layout
    >
      <motion.div
        className={`flex cursor-pointer items-center justify-between p-6 ${
          isExpanded ? "border-b dark:border-slate-800" : ""
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
        layout
      >
        <div className="flex items-center gap-4">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full"
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

          <div>
            <h3 className="text-sm font-medium text-foreground">{title}</h3>
            <div className="mt-1 flex items-center gap-2">
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <div
                className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium`}
                style={{
                  backgroundColor: isPositive ? `${color}15` : "#ef444425",
                  color: isPositive ? color : "#ef4444",
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
          </div>
        </div>

        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="bg-slate-50 px-6 py-4 dark:bg-slate-900/50"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-3">
              {details.map((detail, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <span className="text-sm text-muted-foreground">
                    {detail.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">
                      {detail.value}
                    </span>
                    {detail.change !== undefined && (
                      <div
                        className={`flex items-center gap-1 rounded-full px-1.5 py-0.5 text-xs font-medium`}
                        style={{
                          backgroundColor:
                            detail.change >= 0 ? "#10b98115" : "#ef444415",
                          color: detail.change >= 0 ? "#10b981" : "#ef4444",
                        }}
                      >
                        {detail.change >= 0 ? (
                          <TrendingUp className="h-2.5 w-2.5" />
                        ) : (
                          <TrendingDown className="h-2.5 w-2.5" />
                        )}
                        <span>
                          {detail.change >= 0 ? "+" : ""}
                          {detail.change}%
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Decorative element */}
            <motion.div
              className="mt-4 h-1 rounded-full"
              style={{ backgroundColor: `${color}50` }}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function ExpandingDetailCards() {
  const stats = [
    {
      title: "Marketing Performance",
      value: "$24,521",
      change: 12.3,
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 8.00001L2 22M17.5 15H9M22 12L12 2L9 9.00001H2L12 22L15 15L22 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#6366f1", // Indigo
      details: [
        { label: "Social Media", value: "$8,245", change: 18.5 },
        { label: "Email Campaigns", value: "$6,830", change: 7.2 },
        { label: "SEO", value: "$5,120", change: -3.8 },
        { label: "Content Marketing", value: "$4,326", change: 15.4 },
      ],
    },
    {
      title: "Product Analytics",
      value: "85,432",
      change: 8.7,
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 16V8.00002C20.9996 7.6493 20.9071 7.30483 20.7315 7.00119C20.556 6.69754 20.3037 6.44539 20 6.27002L13 2.27002C12.696 2.09449 12.3511 2.00208 12 2.00208C11.6489 2.00208 11.304 2.09449 11 2.27002L4 6.27002C3.69626 6.44539 3.44398 6.69754 3.26846 7.00119C3.09294 7.30483 3.00036 7.6493 3 8.00002V16C3.00036 16.3508 3.09294 16.6952 3.26846 16.9989C3.44398 17.3025 3.69626 17.5547 4 17.73L11 21.73C11.304 21.9056 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9056 13 21.73L20 17.73C20.3037 17.5547 20.556 17.3025 20.7315 16.9989C20.9071 16.6952 20.9996 16.3508 21 16Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.27002 6.96002L12 12.01L20.73 6.96002"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 22.08V12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#ec4899", // Pink
      details: [
        { label: "Active Users", value: "42,651", change: 12.4 },
        { label: "Sessions", value: "85,432", change: 8.7 },
        { label: "Session Duration", value: "3:24", change: -2.1 },
        { label: "Bounce Rate", value: "32.4%", change: -5.3 },
      ],
    },
    {
      title: "Sales Overview",
      value: "$142,845",
      change: -3.2,
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 6H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#f97316", // Orange
      details: [
        { label: "Product Sales", value: "$98,432", change: -1.8 },
        { label: "Subscription Revenue", value: "$44,413", change: -6.2 },
        { label: "Avg. Order Value", value: "$84.32", change: 2.4 },
        { label: "Refunds", value: "$3,245", change: -12.5 },
      ],
    },
    {
      title: "Customer Metrics",
      value: "3,842",
      change: 5.6,
      icon: (
        <svg
          width="24"
          height="24"
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
      color: "#10b981", // Emerald
      details: [
        { label: "Active Customers", value: "3,842", change: 5.6 },
        { label: "New Customers", value: "642", change: 12.3 },
        { label: "Retention Rate", value: "68%", change: 2.1 },
        { label: "Churn Rate", value: "4.2%", change: -1.5 },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white px-4 py-10 dark:bg-slate-900">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {stats.map((stat, index) => (
            <ExpandingDetailCard
              key={index}
              title={stat.title}
              value={stat.value}
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
