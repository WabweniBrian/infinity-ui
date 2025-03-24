"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, DollarSign, TrendingUp, Calendar } from "lucide-react"

const RevenueStatsCard = () => {
  // Self-contained data
  const [data, setData] = useState({
    currentRevenue: 87432,
    previousRevenue: 72145,
    percentageChange: 21.2,
    period: "This Month",
    sparklineData: [32, 45, 27, 55, 42, 37, 50, 63, 48, 57, 72, 70],
  })

  // Animation for sparkline
  const [pathLength, setPathLength] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setPathLength(1), 500)
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

  // Calculate sparkline path
  const getSparklinePath = () => {
    const width = 120
    const height = 40
    const padding = 2
    const dataPoints = data.sparklineData
    const max = Math.max(...dataPoints)
    const min = Math.min(...dataPoints)

    const xStep = (width - padding * 2) / (dataPoints.length - 1)
    const yRange = max - min || 1

    const points = dataPoints.map((point, i) => {
      const x = padding + i * xStep
      const y = height - padding - ((point - min) / yRange) * (height - padding * 2)
      return `${x},${y}`
    })

    return `M${points.join(" L")}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-lg p-6 border border-blue-100 dark:border-slate-700"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="bg-blue-500/10 dark:bg-blue-500/20 p-3 rounded-lg mr-4">
            <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Revenue</h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-slate-800 dark:text-white">
                {formatCurrency(data.currentRevenue)}
              </span>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="ml-2 text-sm font-medium text-green-600 dark:text-green-400 flex items-center"
              >
                <ArrowUpRight className="h-3 w-3 mr-0.5" />
                {data.percentageChange}%
              </motion.span>
            </div>
          </div>
        </div>
        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
          <Calendar className="h-3 w-3 mr-1" />
          {data.period}
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">vs. Previous Month</div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {formatCurrency(data.previousRevenue)}
            </span>
            <TrendingUp className="h-3 w-3 ml-1 text-green-500" />
          </div>
        </div>

        <div className="h-10 w-30">
          <svg width="120" height="40" viewBox="0 0 120 40" className="overflow-visible">
            <defs>
              <linearGradient id="sparklineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d={getSparklinePath()}
              fill="none"
              stroke="rgb(59, 130, 246)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <path d={`${getSparklinePath()} L120,40 L0,40 Z`} fill="url(#sparklineGradient)" opacity="0.5" />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

export default RevenueStatsCard

