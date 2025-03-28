"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  TrendingUp,
  TrendingDown,
  ChevronDown,
  BarChart4,
  PieChart,
  LineChart,
  Activity,
  Calendar,
  ArrowRight,
} from "lucide-react"
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts"
import { commonChartConfig } from "./chart-utils"

type MetricBreakdown = {
  label: string
  value: string
  percentage: number
  color: string
}

type SpotlightMetricProps = {
  title: string
  value: string
  change: number
  changeLabel: string
  icon: React.ReactNode
  color: string
  description: string
  breakdown: MetricBreakdown[]
  timeData: {
    labels: string[]
    values: number[]
  }
}

const SpotlightMetricCard = ({
  title,
  value,
  change,
  changeLabel,
  icon,
  color,
  description,
  breakdown,
  timeData,
}: SpotlightMetricProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState<"breakdown" | "trend">("breakdown")

  const isPositive = change >= 0

  // Format data for Recharts
  const chartData = timeData.labels.map((label, index) => ({
    name: label,
    value: timeData.values[index],
  }))

  // Format breakdown data for bar chart
  const breakdownChartData = breakdown.map((item) => ({
    name: item.label,
    value: Number.parseFloat(item.value.replace(/[^0-9.]/g, "")),
    percentage: item.percentage,
    color: item.color,
  }))

  return (
    <motion.div
      className="overflow-hidden rounded-xl border bg-background shadow-sm dark:border-slate-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      layout
    >
      <motion.div className="p-6" layout>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
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
              <h3 className="text-lg font-medium text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground dark:hover:bg-slate-800"
            aria-label={isExpanded ? "Show less" : "Show more"}
          >
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </button>
        </div>

        <div className="mt-6 flex items-baseline justify-between">
          <p className="text-4xl font-bold text-foreground">{value}</p>

          <div
            className={`flex items-center gap-1 rounded-full px-2 py-1 text-sm font-medium`}
            style={{
              backgroundColor: isPositive ? `${color}15` : "#ef444425",
              color: isPositive ? color : "#ef4444",
            }}
          >
            {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            <span>
              {isPositive ? "+" : ""}
              {change}%
            </span>
          </div>
        </div>

        <div className="mt-2 flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-1 h-4 w-4" />
          <span>{changeLabel}</span>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="border-t bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="border-b dark:border-slate-800">
              <div className="flex">
                <button
                  className={`flex-1 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === "breakdown"
                      ? `border-${color} text-foreground`
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                  style={{
                    borderColor: activeTab === "breakdown" ? color : "transparent",
                  }}
                  onClick={() => setActiveTab("breakdown")}
                >
                  Breakdown
                </button>
                <button
                  className={`flex-1 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === "trend"
                      ? `border-${color} text-foreground`
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                  style={{
                    borderColor: activeTab === "trend" ? color : "transparent",
                  }}
                  onClick={() => setActiveTab("trend")}
                >
                  Trend
                </button>
              </div>
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                {activeTab === "breakdown" ? (
                  <motion.div
                    key="breakdown"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4 className="mb-4 text-sm font-medium text-foreground">Metric Breakdown</h4>

                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={breakdownChartData}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            horizontal={true}
                            vertical={false}
                            className={commonChartConfig.gridClassName}
                          />
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" width={90} />
                          <Tooltip
                            formatter={(value: number, name: string, props: any) => {
                              return [`${value} (${props.payload.percentage}%)`, name]
                            }}
                            contentStyle={{
                              backgroundColor: "var(--background)",
                              borderColor: "var(--border)",
                              borderRadius: "0.5rem",
                            }}
                          />
                          <Bar
                            dataKey="value"
                            animationDuration={commonChartConfig.animationDuration}
                            radius={[0, 4, 4, 0]}
                          >
                            {breakdownChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="trend"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4 className="mb-4 text-sm font-medium text-foreground">Time Trend</h4>

                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" className={commonChartConfig.gridClassName} />
                          <XAxis dataKey="name" />
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
                            stroke={color}
                            strokeWidth={3}
                            dot={{ fill: color, r: 4 }}
                            activeDot={{ r: 6, fill: color }}
                            animationDuration={commonChartConfig.animationDuration}
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-6 flex justify-end">
                <button className="flex items-center gap-1 rounded-md px-3 py-1 text-sm font-medium text-foreground hover:bg-slate-200 dark:hover:bg-slate-800">
                  <span>View Full Report</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function InteractiveMetricSpotlight() {
  const metrics = [
    {
      title: "Revenue Growth",
      value: "$1.45M",
      change: 12.5,
      changeLabel: "vs previous quarter",
      icon: <BarChart4 className="h-6 w-6" />,
      color: "#6366f1", // Indigo
      description: "Total revenue across all channels and products",
      breakdown: [
        { label: "Subscription", value: "$980K", percentage: 67.6, color: "#818cf8" },
        { label: "One-time Sales", value: "$320K", percentage: 22.1, color: "#a5b4fc" },
        { label: "Services", value: "$150K", percentage: 10.3, color: "#c7d2fe" },
      ],
      timeData: {
        labels: ["Q1", "Q2", "Q3", "Q4", "Q1", "Q2"],
        values: [980000, 1050000, 1120000, 1180000, 1290000, 1450000],
      },
    },
    {
      title: "Customer Acquisition",
      value: "8,542",
      change: 8.3,
      changeLabel: "vs previous month",
      icon: <PieChart className="h-6 w-6" />,
      color: "#ec4899", // Pink
      description: "New customers acquired in the current period",
      breakdown: [
        { label: "Organic Search", value: "3,850", percentage: 45.1, color: "#f472b6" },
        { label: "Social Media", value: "2,240", percentage: 26.2, color: "#f9a8d4" },
        { label: "Referrals", value: "1,320", percentage: 15.5, color: "#fbcfe8" },
        { label: "Direct", value: "1,132", percentage: 13.2, color: "#fce7f3" },
      ],
      timeData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        values: [6200, 6800, 7100, 7500, 7900, 8542],
      },
    },
    {
      title: "Conversion Rate",
      value: "3.8%",
      change: -0.5,
      changeLabel: "vs previous month",
      icon: <LineChart className="h-6 w-6" />,
      color: "#f97316", // Orange
      description: "Percentage of visitors who complete a purchase",
      breakdown: [
        { label: "Desktop", value: "4.2%", percentage: 42, color: "#fb923c" },
        { label: "Mobile", value: "3.5%", percentage: 35, color: "#fdba74" },
        { label: "Tablet", value: "2.3%", percentage: 23, color: "#fed7aa" },
      ],
      timeData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        values: [4.1, 4.0, 3.9, 3.7, 3.8, 3.8],
      },
    },
    {
      title: "Customer Satisfaction",
      value: "92.5%",
      change: 3.2,
      changeLabel: "vs previous quarter",
      icon: <Activity className="h-6 w-6" />,
      color: "#10b981", // Emerald
      description: "Overall customer satisfaction score",
      breakdown: [
        { label: "Very Satisfied", value: "68.3%", percentage: 68.3, color: "#34d399" },
        { label: "Satisfied", value: "24.2%", percentage: 24.2, color: "#6ee7b7" },
        { label: "Neutral", value: "5.8%", percentage: 5.8, color: "#a7f3d0" },
        { label: "Dissatisfied", value: "1.7%", percentage: 1.7, color: "#d1fae5" },
      ],
      timeData: {
        labels: ["Q1", "Q2", "Q3", "Q4", "Q1", "Q2"],
        values: [87.5, 88.2, 89.0, 90.1, 91.8, 92.5],
      },
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Key Metrics Spotlight</h2>
          <p className="text-sm text-muted-foreground">Interactive deep-dive into critical business metrics</p>
        </div>

        <div className="flex items-center gap-2">
          <select className="rounded-md border bg-background px-3 py-1 text-sm dark:border-slate-700">
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
            <option>Year to Date</option>
            <option>Custom Range</option>
          </select>

          <button className="rounded-md bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
            Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {metrics.map((metric, index) => (
          <SpotlightMetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeLabel={metric.changeLabel}
            icon={metric.icon}
            color={metric.color}
            description={metric.description}
            breakdown={metric.breakdown}
            timeData={metric.timeData}
          />
        ))}
      </div>
    </div>
  )
}

