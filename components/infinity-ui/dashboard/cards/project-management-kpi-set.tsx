"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Clock, AlertTriangle, Users, Calendar, BarChart2, TrendingUp, TrendingDown } from "lucide-react"

const ProjectManagementKPISet = () => {
  // Self-contained data
  const [data, setData] = useState({
    completionRate: 78,
    completionRateChange: 12,
    completionRateTrend: "increase" as "increase" | "decrease",
    onTimeDelivery: 92,
    onTimeDeliveryChange: 5,
    onTimeDeliveryTrend: "increase" as "increase" | "decrease",
    teamUtilization: 84,
    teamUtilizationChange: 7,
    teamUtilizationTrend: "increase" as "increase" | "decrease",
    taskDistribution: {
      completed: 45,
      inProgress: 32,
      blocked: 8,
      notStarted: 15,
    },
    timeframe: "Current Sprint",
    sprintEndDate: "Oct 28, 2023",
    daysRemaining: 8,
  })

  // Animation states
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  // Calculate progress circle properties
  const calculateCircleProps = (percentage: number) => {
    const radius = 40
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (percentage / 100) * circumference
    return { radius, circumference, strokeDashoffset }
  }

  const completionCircleProps = calculateCircleProps(data.completionRate)
  const onTimeCircleProps = calculateCircleProps(data.onTimeDelivery)
  const utilizationCircleProps = calculateCircleProps(data.teamUtilization)

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-white">Project Performance</h3>
            <div className="flex items-center mt-2">
              <span className="text-emerald-100 text-sm">{data.timeframe}</span>
              <span className="mx-2 text-emerald-200">•</span>
              <span className="flex items-center text-emerald-100 text-sm">
                <Calendar className="h-3 w-3 mr-1" />
                Ends {data.sprintEndDate}
              </span>
              <span className="mx-2 text-emerald-200">•</span>
              <span className="flex items-center text-emerald-100 text-sm">
                <Clock className="h-3 w-3 mr-1" />
                {data.daysRemaining} days left
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* Task Completion Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-50 dark:bg-slate-800 rounded-lg p-5"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Task Completion</h4>
              <div className="flex items-center mt-1">
                <span className="text-2xl font-bold text-gray-800 dark:text-white">{data.completionRate}%</span>
                <span
                  className={`ml-2 text-sm flex items-center ${
                    data.completionRateTrend === "increase"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {data.completionRateTrend === "increase" ? (
                    <TrendingUp className="h-3 w-3 mr-0.5" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-0.5" />
                  )}
                  {data.completionRateChange}%
                </span>
              </div>
            </div>

            <div className="relative w-16 h-16">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r={completionCircleProps.radius}
                  fill="none"
                  stroke="rgba(16, 185, 129, 0.2)"
                  strokeWidth="8"
                />

                {/* Progress circle */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r={completionCircleProps.radius}
                  fill="none"
                  stroke="rgb(16, 185, 129)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={completionCircleProps.circumference}
                  initial={{ strokeDashoffset: completionCircleProps.circumference }}
                  animate={{
                    strokeDashoffset: isVisible
                      ? completionCircleProps.strokeDashoffset
                      : completionCircleProps.circumference,
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  transform="rotate(-90 50 50)"
                />

                {/* Icon */}
                <foreignObject x="35" y="35" width="30" height="30">
                  <CheckCircle className="h-7 w-7 text-emerald-500 dark:text-emerald-400" />
                </foreignObject>
              </svg>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-1">
            {Object.entries(data.taskDistribution).map(([status, count], index) => {
              const colors = {
                completed: "bg-emerald-500",
                inProgress: "bg-blue-500",
                blocked: "bg-red-500",
                notStarted: "bg-gray-300 dark:bg-gray-600",
              }
              const color = colors[status as keyof typeof colors]

              return (
                <motion.div
                  key={status}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                >
                  <div className={`w-full h-1.5 ${color} rounded-full mb-1`} />
                  <span className="text-xs text-gray-500 dark:text-gray-400">{count}%</span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* On-Time Delivery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gray-50 dark:bg-slate-800 rounded-lg p-5"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">On-Time Delivery</h4>
              <div className="flex items-center mt-1">
                <span className="text-2xl font-bold text-gray-800 dark:text-white">{data.onTimeDelivery}%</span>
                <span
                  className={`ml-2 text-sm flex items-center ${
                    data.onTimeDeliveryTrend === "increase"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {data.onTimeDeliveryTrend === "increase" ? (
                    <TrendingUp className="h-3 w-3 mr-0.5" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-0.5" />
                  )}
                  {data.onTimeDeliveryChange}%
                </span>
              </div>
            </div>

            <div className="relative w-16 h-16">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r={onTimeCircleProps.radius}
                  fill="none"
                  stroke="rgba(59, 130, 246, 0.2)"
                  strokeWidth="8"
                />

                {/* Progress circle */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r={onTimeCircleProps.radius}
                  fill="none"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={onTimeCircleProps.circumference}
                  initial={{ strokeDashoffset: onTimeCircleProps.circumference }}
                  animate={{
                    strokeDashoffset: isVisible ? onTimeCircleProps.strokeDashoffset : onTimeCircleProps.circumference,
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  transform="rotate(-90 50 50)"
                />

                {/* Icon */}
                <foreignObject x="35" y="35" width="30" height="30">
                  <Clock className="h-7 w-7 text-blue-500 dark:text-blue-400" />
                </foreignObject>
              </svg>
            </div>
          </div>

          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <motion.div
                className="bg-blue-500 h-2.5 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: isVisible ? `${data.onTimeDelivery}%` : "0%" }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">Target: 95%</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Current: {data.onTimeDelivery}%</span>
            </div>
          </div>
        </motion.div>

        {/* Team Utilization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-50 dark:bg-slate-800 rounded-lg p-5"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Team Utilization</h4>
              <div className="flex items-center mt-1">
                <span className="text-2xl font-bold text-gray-800 dark:text-white">{data.teamUtilization}%</span>
                <span
                  className={`ml-2 text-sm flex items-center ${
                    data.teamUtilizationTrend === "increase"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {data.teamUtilizationTrend === "increase" ? (
                    <TrendingUp className="h-3 w-3 mr-0.5" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-0.5" />
                  )}
                  {data.teamUtilizationChange}%
                </span>
              </div>
            </div>

            <div className="relative w-16 h-16">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r={utilizationCircleProps.radius}
                  fill="none"
                  stroke="rgba(139, 92, 246, 0.2)"
                  strokeWidth="8"
                />

                {/* Progress circle */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r={utilizationCircleProps.radius}
                  fill="none"
                  stroke="rgb(139, 92, 246)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={utilizationCircleProps.circumference}
                  initial={{ strokeDashoffset: utilizationCircleProps.circumference }}
                  animate={{
                    strokeDashoffset: isVisible
                      ? utilizationCircleProps.strokeDashoffset
                      : utilizationCircleProps.circumference,
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  transform="rotate(-90 50 50)"
                />

                {/* Icon */}
                <foreignObject x="35" y="35" width="30" height="30">
                  <Users className="h-7 w-7 text-purple-500 dark:text-purple-400" />
                </foreignObject>
              </svg>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-xs text-gray-600 dark:text-gray-300">Productive</span>
              </div>
              <span className="text-xs font-medium text-gray-800 dark:text-white">{data.teamUtilization}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 mr-2"></div>
                <span className="text-xs text-gray-600 dark:text-gray-300">Non-productive</span>
              </div>
              <span className="text-xs font-medium text-gray-800 dark:text-white">{100 - data.teamUtilization}%</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="px-6 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Sprint Progress</h4>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <BarChart2 className="h-3 w-3 mr-1" />
              {data.daysRemaining} days remaining
            </div>
          </div>

          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
            <motion.div
              className="bg-emerald-500 h-2.5 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: isVisible ? `${data.completionRate}%` : "0%" }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 mr-3">
                <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Completed</div>
                <div className="text-sm font-medium text-gray-800 dark:text-white">
                  {data.taskDistribution.completed}%
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 mr-3">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">In Progress</div>
                <div className="text-sm font-medium text-gray-800 dark:text-white">
                  {data.taskDistribution.inProgress}%
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 mr-3">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Blocked</div>
                <div className="text-sm font-medium text-gray-800 dark:text-white">
                  {data.taskDistribution.blocked}%
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProjectManagementKPISet

