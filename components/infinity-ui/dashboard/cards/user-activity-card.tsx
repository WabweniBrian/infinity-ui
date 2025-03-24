"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react"

const UserActivityCard = () => {
  // Self-contained data
  const [data, setData] = useState({
    activeUsers: 2847,
    percentageChange: 12.5,
    changeType: "increase" as "increase" | "decrease",
    period: "Last 24 hours",
    hourlyData: [
      { hour: "00:00", users: 1245 },
      { hour: "04:00", users: 980 },
      { hour: "08:00", users: 1670 },
      { hour: "12:00", users: 2450 },
      { hour: "16:00", users: 2847 },
      { hour: "20:00", users: 2100 },
    ],
  })

  // Animation for bars
  const [barHeights, setBarHeights] = useState<number[]>(Array(data.hourlyData.length).fill(0))

  useEffect(() => {
    const timer = setTimeout(() => {
      const maxUsers = Math.max(...data.hourlyData.map((d) => d.users))
      setBarHeights(data.hourlyData.map((d) => (d.users / maxUsers) * 100))
    }, 500)
    return () => clearTimeout(timer)
  }, [data.hourlyData])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-lg p-6 border border-purple-100 dark:border-slate-700"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="bg-purple-500/10 dark:bg-purple-500/20 p-3 rounded-lg mr-4">
            <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Users</h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-slate-800 dark:text-white">
                {data.activeUsers.toLocaleString()}
              </span>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className={`ml-2 text-sm font-medium flex items-center ${
                  data.changeType === "increase"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {data.changeType === "increase" ? (
                  <ArrowUpRight className="h-3 w-3 mr-0.5" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-0.5" />
                )}
                {data.percentageChange}%
              </motion.span>
            </div>
          </div>
        </div>
        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
          <Clock className="h-3 w-3 mr-1" />
          {data.period}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-end h-24">
          {data.hourlyData.map((hourData, index) => (
            <div key={hourData.hour} className="flex flex-col items-center">
              <motion.div
                className="w-6 bg-gradient-to-t from-purple-400 to-pink-400 dark:from-purple-500 dark:to-pink-500 rounded-t-sm"
                style={{ height: "0%" }}
                animate={{ height: `${barHeights[index]}%` }}
                transition={{ duration: 1, delay: 0.1 * index }}
              />
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">{hourData.hour}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default UserActivityCard

