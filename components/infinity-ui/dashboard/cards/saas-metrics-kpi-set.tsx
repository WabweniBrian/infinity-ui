"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { DollarSign, Users, BarChart3, RefreshCw, ArrowUpRight, ArrowDownRight } from "lucide-react"

const SaasMetricsKPISet = () => {
  // Self-contained data
  const [data, setData] = useState({
    mrr: 52450,
    mrrGrowth: 8.2,
    mrrTrend: "increase" as "increase" | "decrease",
    arpu: 89,
    arpuGrowth: 4.5,
    arpuTrend: "increase" as "increase" | "decrease",
    activeUsers: 5872,
    activeUsersGrowth: 12.7,
    activeUsersTrend: "increase" as "increase" | "decrease",
    churnRate: 2.1,
    churnRateChange: 0.4,
    churnRateTrend: "decrease" as "increase" | "decrease",
    timeframe: "Last Month",
    mrrHistory: [42300, 43800, 45200, 46900, 48500, 49800, 52450],
  })

  // Animation states
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">SaaS Metrics</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{data.timeframe}</p>
          </div>
          <div className="flex items-center text-slate-500 dark:text-slate-400">
            <RefreshCw className="h-4 w-4 mr-1" />
            <span className="text-sm">Updated daily</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {/* MRR */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-lg p-5 shadow-sm border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
              <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span
              className={`inline-flex items-center text-sm font-medium ${
                data.mrrTrend === "increase" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {data.mrrTrend === "increase" ? (
                <ArrowUpRight className="h-3 w-3 mr-0.5" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-0.5" />
              )}
              {data.mrrGrowth}%
            </span>
          </div>
          <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Monthly Recurring Revenue</h4>
          <div className="text-2xl font-bold text-slate-800 dark:text-white">{formatCurrency(data.mrr)}</div>

          <div className="mt-4 flex space-x-1">
            {data.mrrHistory.map((value, index) => {
              const height = (value / Math.max(...data.mrrHistory)) * 100
              return (
                <motion.div
                  key={index}
                  className="flex-1 bg-blue-100 dark:bg-blue-900/30 rounded-t"
                  style={{ height: "4px" }}
                  initial={{ height: "4px" }}
                  animate={{ height: isVisible ? `${Math.max(4, height / 4)}px` : "4px" }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                />
              )
            })}
          </div>
        </motion.div>

        {/* ARPU */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-lg p-5 shadow-sm border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
              <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <span
              className={`inline-flex items-center text-sm font-medium ${
                data.arpuTrend === "increase" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {data.arpuTrend === "increase" ? (
                <ArrowUpRight className="h-3 w-3 mr-0.5" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-0.5" />
              )}
              {data.arpuGrowth}%
            </span>
          </div>
          <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Avg. Revenue Per User</h4>
          <div className="text-2xl font-bold text-slate-800 dark:text-white">${data.arpu}</div>

          <div className="mt-4 relative pt-1">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-green-100 dark:bg-green-900/30">
              <motion.div
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 dark:bg-green-400"
                initial={{ width: "0%" }}
                animate={{ width: isVisible ? "75%" : "0%" }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Active Users */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-lg p-5 shadow-sm border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
              <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <span
              className={`inline-flex items-center text-sm font-medium ${
                data.activeUsersTrend === "increase"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {data.activeUsersTrend === "increase" ? (
                <ArrowUpRight className="h-3 w-3 mr-0.5" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-0.5" />
              )}
              {data.activeUsersGrowth}%
            </span>
          </div>
          <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Active Users</h4>
          <div className="text-2xl font-bold text-slate-800 dark:text-white">{data.activeUsers.toLocaleString()}</div>

          <div className="mt-4 grid grid-cols-7 gap-1">
            {Array.from({ length: 7 }).map((_, index) => (
              <motion.div
                key={index}
                className="aspect-square rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: isVisible ? 1 : 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <motion.div
                  className="w-2/3 h-2/3 rounded-full bg-purple-500 dark:bg-purple-400"
                  initial={{ scale: 0 }}
                  animate={{ scale: isVisible ? [0, 1.2, 1] : 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + 0.1 * index }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Churn Rate */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-slate-800 rounded-lg p-5 shadow-sm border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg">
              <RefreshCw className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <span
              className={`inline-flex items-center text-sm font-medium ${
                data.churnRateTrend === "decrease"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {data.churnRateTrend === "decrease" ? (
                <ArrowDownRight className="h-3 w-3 mr-0.5" />
              ) : (
                <ArrowUpRight className="h-3 w-3 mr-0.5" />
              )}
              {data.churnRateChange}%
            </span>
          </div>
          <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Monthly Churn Rate</h4>
          <div className="text-2xl font-bold text-slate-800 dark:text-white">{data.churnRate}%</div>

          <div className="mt-4 relative">
            <svg className="w-full h-10" viewBox="0 0 100 30">
              <motion.path
                d="M0,15 Q10,5 20,15 T40,15 T60,15 T80,15 T100,15"
                fill="none"
                stroke="rgba(217, 119, 6, 0.2)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isVisible ? 1 : 0 }}
                transition={{ duration: 1.5 }}
              />
              <motion.path
                d="M0,15 Q10,25 20,15 T40,15 T60,15 T80,15 T100,15"
                fill="none"
                stroke="#d97706"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isVisible ? 1 : 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SaasMetricsKPISet

