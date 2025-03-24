"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart3,
  LineChart,
  PieChart,
  Calendar,
  Users,
  ShoppingCart,
  Globe,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Filter,
  Download,
  Share2,
  Bell,
  Search,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricGroup {
  id: string
  name: string
  metrics: Metric[]
}

interface Metric {
  id: string
  name: string
  icon: React.ReactNode
  value: string
  change: {
    value: string
    positive: boolean
  }
}

const metricGroups: MetricGroup[] = [
  {
    id: "traffic",
    name: "Traffic",
    metrics: [
      {
        id: "visitors",
        name: "Visitors",
        icon: <Users className="h-4 w-4" />,
        value: "24.2K",
        change: {
          value: "+12.4%",
          positive: true,
        },
      },
      {
        id: "pageviews",
        name: "Pageviews",
        icon: <Globe className="h-4 w-4" />,
        value: "56.8K",
        change: {
          value: "+8.2%",
          positive: true,
        },
      },
    ],
  },
  {
    id: "conversion",
    name: "Conversion",
    metrics: [
      {
        id: "orders",
        name: "Orders",
        icon: <ShoppingCart className="h-4 w-4" />,
        value: "1,243",
        change: {
          value: "-2.1%",
          positive: false,
        },
      },
      {
        id: "revenue",
        name: "Revenue",
        icon: <BarChart3 className="h-4 w-4" />,
        value: "$48.5K",
        change: {
          value: "+18.3%",
          positive: true,
        },
      },
    ],
  },
]

const dateRanges = [
  { id: "today", name: "Today" },
  { id: "yesterday", name: "Yesterday" },
  { id: "week", name: "This Week" },
  { id: "month", name: "This Month" },
  { id: "quarter", name: "This Quarter" },
  { id: "year", name: "This Year" },
  { id: "custom", name: "Custom Range" },
]

const visualizationTypes = [
  { id: "line", name: "Line Chart", icon: <LineChart className="h-4 w-4" /> },
  { id: "bar", name: "Bar Chart", icon: <BarChart3 className="h-4 w-4" /> },
  { id: "pie", name: "Pie Chart", icon: <PieChart className="h-4 w-4" /> },
]

export default function AnalyticsDashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selectedDateRange, setSelectedDateRange] = useState("week")
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["traffic", "conversion"])
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(["visitors", "revenue"])
  const [selectedVisualization, setSelectedVisualization] = useState("line")

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => (prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]))
  }

  const toggleMetric = (metricId: string) => {
    setSelectedMetrics((prev) => (prev.includes(metricId) ? prev.filter((id) => id !== metricId) : [...prev, metricId]))
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <motion.div
        className={cn("relative h-full bg-white border-r border-gray-200 shadow-sm", isCollapsed ? "w-20" : "w-80")}
        animate={{ width: isCollapsed ? 80 : 320 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center space-x-2"
                >
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                  <span className="font-bold text-lg text-gray-900">Analytics</span>
                </motion.div>
              )}
            </AnimatePresence>
            <button onClick={toggleSidebar} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
              {isCollapsed ? (
                <ChevronRight className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronLeft className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>

          {/* Date Range Selector */}
          <div className="p-4 border-b border-gray-200">
            <AnimatePresence mode="wait">
              {!isCollapsed ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative"
                >
                  <div
                    className="flex items-center justify-between p-2 border border-gray-200 rounded-md cursor-pointer hover:border-blue-300"
                    onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                  >
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">
                        {dateRanges.find((range) => range.id === selectedDateRange)?.name}
                      </span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-gray-500 transition-transform",
                        isDateDropdownOpen && "transform rotate-180",
                      )}
                    />
                  </div>

                  {isDateDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                      {dateRanges.map((range) => (
                        <div
                          key={range.id}
                          className={cn(
                            "px-3 py-2 text-sm cursor-pointer hover:bg-gray-50",
                            selectedDateRange === range.id && "bg-blue-50 text-blue-600",
                          )}
                          onClick={() => {
                            setSelectedDateRange(range.id)
                            setIsDateDropdownOpen(false)
                          }}
                        >
                          {range.name}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center"
                >
                  <button className="p-2 rounded-md hover:bg-gray-100">
                    <Calendar className="h-5 w-5 text-gray-500" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Metrics Selection */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              {!isCollapsed ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-500">Metrics</h3>
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <Filter className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>

                  {metricGroups.map((group) => (
                    <div key={group.id} className="space-y-2">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleGroup(group.id)}
                      >
                        <span className="text-sm font-medium text-gray-700">{group.name}</span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 text-gray-500 transition-transform",
                            expandedGroups.includes(group.id) && "transform rotate-180",
                          )}
                        />
                      </div>

                      {expandedGroups.includes(group.id) && (
                        <div className="pl-2 space-y-1 border-l-2 border-gray-100">
                          {group.metrics.map((metric) => (
                            <div
                              key={metric.id}
                              className={cn(
                                "flex items-center justify-between p-2 rounded-md cursor-pointer",
                                selectedMetrics.includes(metric.id)
                                  ? "bg-blue-50 border border-blue-100"
                                  : "hover:bg-gray-50",
                              )}
                              onClick={() => toggleMetric(metric.id)}
                            >
                              <div className="flex items-center space-x-2">
                                {metric.icon}
                                <span className="text-sm text-gray-700">{metric.name}</span>
                              </div>
                              {selectedMetrics.includes(metric.id) && (
                                <div className="flex flex-col items-end">
                                  <span className="text-sm font-medium text-gray-900">{metric.value}</span>
                                  <span
                                    className={cn(
                                      "text-xs",
                                      metric.change.positive ? "text-green-600" : "text-red-600",
                                    )}
                                  >
                                    {metric.change.value}
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    <h3 className="text-sm font-medium text-gray-500">Visualization</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {visualizationTypes.map((type) => (
                        <div
                          key={type.id}
                          className={cn(
                            "flex flex-col items-center justify-center p-2 rounded-md cursor-pointer border",
                            selectedVisualization === type.id
                              ? "bg-blue-50 border-blue-200"
                              : "border-gray-200 hover:border-blue-200",
                          )}
                          onClick={() => setSelectedVisualization(type.id)}
                        >
                          {type.icon}
                          <span className="text-xs mt-1 text-gray-700">{type.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center py-4 space-y-4"
                >
                  <button className="p-2 rounded-md hover:bg-gray-100">
                    <BarChart3 className="h-5 w-5 text-gray-500" />
                  </button>
                  <button className="p-2 rounded-md hover:bg-gray-100">
                    <LineChart className="h-5 w-5 text-gray-500" />
                  </button>
                  <button className="p-2 rounded-md hover:bg-gray-100">
                    <PieChart className="h-5 w-5 text-gray-500" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <AnimatePresence mode="wait">
              {!isCollapsed ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-between"
                >
                  <button className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                  <button className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center"
                >
                  <button className="p-2 rounded-md hover:bg-gray-100">
                    <Download className="h-5 w-5 text-gray-500" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Main content area (placeholder) */}
      <div className="flex-1 p-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Analytics</h1>
            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-full hover:bg-white">
                <Search className="h-5 w-5 text-gray-500" />
              </button>
              <button className="p-2 rounded-full hover:bg-white">
                <Bell className="h-5 w-5 text-gray-500" />
              </button>
              <button className="p-2 rounded-full hover:bg-white">
                <Settings className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 h-[calc(100vh-10rem)]">
            <div className="flex items-center justify-center h-full text-gray-500">
              <p className="text-center">Select metrics to visualize your data</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

