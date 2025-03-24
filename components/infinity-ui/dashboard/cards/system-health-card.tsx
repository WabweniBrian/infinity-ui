"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Activity, Server, Database, Cpu, HardDrive, Wifi, CheckCircle, AlertCircle, XCircle } from "lucide-react"

type StatusType = "operational" | "degraded" | "outage"

interface SystemStatus {
  name: string
  status: StatusType
  metric?: number
  unit?: string
  icon: React.ReactNode
}

const SystemHealthCard = () => {
  // Self-contained data
  const [data, setData] = useState({
    overallStatus: "operational" as StatusType,
    lastUpdated: "2 minutes ago",
    systems: [
      {
        name: "API",
        status: "operational" as StatusType,
        metric: 42,
        unit: "ms",
        icon: <Server className="h-4 w-4" />,
      },
      {
        name: "Database",
        status: "operational" as StatusType,
        metric: 12,
        unit: "ms",
        icon: <Database className="h-4 w-4" />,
      },
      {
        name: "CPU",
        status: "degraded" as StatusType,
        metric: 78,
        unit: "%",
        icon: <Cpu className="h-4 w-4" />,
      },
      {
        name: "Storage",
        status: "operational" as StatusType,
        metric: 42,
        unit: "%",
        icon: <HardDrive className="h-4 w-4" />,
      },
      {
        name: "Network",
        status: "operational" as StatusType,
        metric: 98,
        unit: "Mbps",
        icon: <Wifi className="h-4 w-4" />,
      },
    ],
  })

  // Animation for status indicators
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  // Get status icon and color
  const getStatusInfo = (status: StatusType) => {
    switch (status) {
      case "operational":
        return {
          icon: <CheckCircle className="h-4 w-4" />,
          color: "text-green-500 dark:text-green-400",
          bgColor: "bg-green-500/10 dark:bg-green-500/20",
        }
      case "degraded":
        return {
          icon: <AlertCircle className="h-4 w-4" />,
          color: "text-amber-500 dark:text-amber-400",
          bgColor: "bg-amber-500/10 dark:bg-amber-500/20",
        }
      case "outage":
        return {
          icon: <XCircle className="h-4 w-4" />,
          color: "text-red-500 dark:text-red-400",
          bgColor: "bg-red-500/10 dark:bg-red-500/20",
        }
    }
  }

  const overallStatusInfo = getStatusInfo(data.overallStatus)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center">
          <div className="bg-blue-500/10 dark:bg-blue-500/20 p-3 rounded-lg mr-4">
            <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">System Health</h3>
            <div className="flex items-center mt-1">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${overallStatusInfo.bgColor} ${overallStatusInfo.color}`}
              >
                {overallStatusInfo.icon}
                <span className="ml-1 capitalize">{data.overallStatus}</span>
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">Updated {data.lastUpdated}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {data.systems.map((system, index) => {
          const statusInfo = getStatusInfo(system.status)

          return (
            <motion.div
              key={system.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="flex items-center justify-between bg-white/60 dark:bg-slate-700/30 rounded-lg p-3"
            >
              <div className="flex items-center">
                <div className={`p-2 rounded-md mr-3 ${statusInfo.bgColor}`}>{system.icon}</div>
                <span className="font-medium text-slate-700 dark:text-slate-200">{system.name}</span>
              </div>

              <div className="flex items-center">
                {system.metric !== undefined && (
                  <span className="text-sm text-slate-600 dark:text-slate-300 mr-3">
                    {system.metric}
                    {system.unit}
                  </span>
                )}
                <span className={`flex items-center ${statusInfo.color}`}>{statusInfo.icon}</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default SystemHealthCard

