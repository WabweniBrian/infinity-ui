"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Clock,
  Target,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { commonChartConfig } from "./chart-utils";

type GoalStatus = "completed" | "at-risk" | "on-track" | "not-started";

type GoalProgressProps = {
  title: string;
  description: string;
  target: string;
  current: string;
  percentComplete: number;
  status: GoalStatus;
  dueDate: string;
  owner: string;
  updates: {
    date: string;
    value: string;
    change: number;
    rawValue: number; // For chart
  }[];
};

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    color: "#10b981", // Emerald
    label: "Completed",
  },
  "at-risk": {
    icon: AlertCircle,
    color: "#ef4444", // Red
    label: "At Risk",
  },
  "on-track": {
    icon: Target,
    color: "#6366f1", // Indigo
    label: "On Track",
  },
  "not-started": {
    icon: Clock,
    color: "#f97316", // Orange
    label: "Not Started",
  },
};

const GoalProgressCard = ({
  title,
  description,
  target,
  current,
  percentComplete,
  status,
  dueDate,
  owner,
  updates,
}: GoalProgressProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const StatusIcon = statusConfig[status].icon;
  const statusColor = statusConfig[status].color;
  const statusLabel = statusConfig[status].label;

  // Prepare chart data
  const chartData = updates
    .map((update) => ({
      date: update.date,
      value: update.rawValue,
    }))
    .reverse();

  return (
    <motion.div
      className="overflow-hidden rounded-xl border bg-background shadow-sm dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      layout
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium text-foreground">{title}</h3>
              <div
                className="flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
                style={{
                  backgroundColor: `${statusColor}15`,
                  color: statusColor,
                }}
              >
                <StatusIcon className="h-3 w-3" />
                <span>{statusLabel}</span>
              </div>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground dark:hover:bg-slate-800"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </button>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <div>
              <span className="font-medium text-foreground">{current}</span>
              <span className="text-muted-foreground"> of </span>
              <span className="font-medium text-foreground">{target}</span>
            </div>
            <span className="font-medium" style={{ color: statusColor }}>
              {percentComplete}%
            </span>
          </div>

          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: statusColor }}
              initial={{ width: 0 }}
              animate={{ width: `${percentComplete}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Due: {dueDate}</span>
            </div>
            <div>Owner: {owner}</div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="border-t bg-slate-50 px-6 py-4 dark:border-gray-700 dark:bg-slate-900/50"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-3 text-sm font-medium text-foreground">
                  Progress Updates
                </h4>
                <div className="space-y-3">
                  {updates.map((update, index) => {
                    const isPositive = update.change >= 0;

                    return (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between rounded-lg border p-2 dark:border-slate-700"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: statusColor }}
                          />
                          <span className="text-xs text-muted-foreground">
                            {update.date}
                          </span>
                        </div>
                        <div className="font-medium text-foreground">
                          {update.value}
                        </div>
                        <div
                          className="flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
                          style={{
                            backgroundColor: isPositive
                              ? "#10b98115"
                              : "#ef444415",
                            color: isPositive ? "#10b981" : "#ef4444",
                          }}
                        >
                          {isPositive ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          <span>
                            {isPositive ? "+" : ""}
                            {update.change}%
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-medium text-foreground">
                  Progress Trend
                </h4>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className={commonChartConfig.gridClassName}
                      />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--background)",
                          borderColor: "var(--border)",
                          borderRadius: "0.5rem",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={statusColor}
                        strokeWidth={2}
                        dot={{ fill: statusColor, r: 4 }}
                        activeDot={{ r: 6, fill: statusColor }}
                        animationDuration={commonChartConfig.animationDuration}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button className="rounded-md px-3 py-1 text-xs font-medium text-foreground hover:bg-slate-200 dark:hover:bg-slate-800">
                View Full History
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function GoalProgressMetrics() {
  const goals = [
    {
      title: "Increase Monthly Revenue",
      description:
        "Grow monthly recurring revenue through new customer acquisition and upsells",
      target: "$50,000",
      current: "$42,500",
      percentComplete: 85,
      status: "on-track" as GoalStatus,
      dueDate: "Dec 31, 2023",
      owner: "Sarah Johnson",
      updates: [
        { date: "Nov 15", value: "$42,500", change: 5.2, rawValue: 42500 },
        { date: "Oct 15", value: "$40,400", change: 3.8, rawValue: 40400 },
        { date: "Sep 15", value: "$38,900", change: 4.1, rawValue: 38900 },
        { date: "Aug 15", value: "$37,400", change: 3.5, rawValue: 37400 },
        { date: "Jul 15", value: "$36,100", change: 2.8, rawValue: 36100 },
      ],
    },
    {
      title: "Reduce Customer Churn",
      description:
        "Decrease monthly customer churn rate through improved retention strategies",
      target: "5%",
      current: "7.2%",
      percentComplete: 60,
      status: "at-risk" as GoalStatus,
      dueDate: "Dec 31, 2023",
      owner: "Michael Chen",
      updates: [
        { date: "Nov 15", value: "7.2%", change: -0.3, rawValue: 7.2 },
        { date: "Oct 15", value: "7.5%", change: -0.2, rawValue: 7.5 },
        { date: "Sep 15", value: "7.7%", change: 0.1, rawValue: 7.7 },
        { date: "Aug 15", value: "7.6%", change: -0.4, rawValue: 7.6 },
        { date: "Jul 15", value: "8.0%", change: 0.2, rawValue: 8.0 },
      ],
    },
    {
      title: "Launch Mobile Application",
      description:
        "Develop and launch mobile application for iOS and Android platforms",
      target: "100%",
      current: "100%",
      percentComplete: 100,
      status: "completed" as GoalStatus,
      dueDate: "Oct 15, 2023",
      owner: "Jessica Williams",
      updates: [
        { date: "Oct 15", value: "100%", change: 20, rawValue: 100 },
        { date: "Sep 15", value: "80%", change: 30, rawValue: 80 },
        { date: "Aug 15", value: "50%", change: 25, rawValue: 50 },
        { date: "Jul 15", value: "25%", change: 15, rawValue: 25 },
        { date: "Jun 15", value: "10%", change: 10, rawValue: 10 },
      ],
    },
    {
      title: "Expand to European Market",
      description:
        "Research and prepare for expansion into key European markets",
      target: "100%",
      current: "25%",
      percentComplete: 25,
      status: "not-started" as GoalStatus,
      dueDate: "Mar 31, 2024",
      owner: "David Rodriguez",
      updates: [
        { date: "Nov 15", value: "25%", change: 5, rawValue: 25 },
        { date: "Oct 15", value: "20%", change: 10, rawValue: 20 },
        { date: "Sep 15", value: "10%", change: 10, rawValue: 10 },
        { date: "Aug 15", value: "0%", change: 0, rawValue: 0 },
        { date: "Jul 15", value: "0%", change: 0, rawValue: 0 },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Strategic Goals</h2>
          <p className="text-sm text-muted-foreground">
            Track progress on key business objectives
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select className="rounded-md border bg-background px-3 py-1 text-sm dark:border-slate-700">
            <option>Q4 2023</option>
            <option>Q3 2023</option>
            <option>Q2 2023</option>
            <option>Q1 2023</option>
          </select>

          <button className="rounded-md bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
            Add Goal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {goals.map((goal, index) => (
          <GoalProgressCard
            key={index}
            title={goal.title}
            description={goal.description}
            target={goal.target}
            current={goal.current}
            percentComplete={goal.percentComplete}
            status={goal.status}
            dueDate={goal.dueDate}
            owner={goal.owner}
            updates={goal.updates}
          />
        ))}
      </div>

      <div className="mt-6 rounded-xl border bg-background p-6 shadow-sm dark:border-gray-700">
        <h3 className="mb-4 text-lg font-medium text-foreground">
          Overall Progress
        </h3>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Completed", value: "1", color: "#10b981" },
            { label: "On Track", value: "1", color: "#6366f1" },
            { label: "At Risk", value: "1", color: "#ef4444" },
            { label: "Not Started", value: "1", color: "#f97316" },
          ].map((stat, index) => (
            <div
              key={index}
              className="rounded-lg border p-4 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {stat.label}
                </span>
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: stat.color }}
                />
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-muted-foreground">Overall Completion</span>
            <span className="font-medium text-foreground">67.5%</span>
          </div>

          <div className="flex h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <motion.div
              className="h-full"
              style={{ backgroundColor: "#10b981", width: "25%" }}
              initial={{ width: 0 }}
              animate={{ width: "25%" }}
              transition={{ duration: 1 }}
            />
            <motion.div
              className="h-full"
              style={{ backgroundColor: "#6366f1", width: "25%" }}
              initial={{ width: 0 }}
              animate={{ width: "25%" }}
              transition={{ duration: 1, delay: 0.2 }}
            />
            <motion.div
              className="h-full"
              style={{ backgroundColor: "#ef4444", width: "15%" }}
              initial={{ width: 0 }}
              animate={{ width: "15%" }}
              transition={{ duration: 1, delay: 0.4 }}
            />
            <motion.div
              className="h-full"
              style={{ backgroundColor: "#f97316", width: "2.5%" }}
              initial={{ width: 0 }}
              animate={{ width: "2.5%" }}
              transition={{ duration: 1, delay: 0.6 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
