"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  TrendingDown,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react"

interface SocialMetric {
  name: string
  current: number
  previous: number
  change: number
  changeType: "increase" | "decrease"
  icon: React.ReactNode
  color: string
}

const SocialEngagementCard = () => {
  // Self-contained data
  const [data, setData] = useState({
    totalEngagements: 24875,
    percentageChange: 16.8,
    changeType: "increase" as "increase" | "decrease",
    period: "vs. Last Month",
    metrics: [
      {
        name: "Likes",
        current: 15423,
        previous: 12876,
        change: 19.8,
        changeType: "increase" as "increase" | "decrease",
        icon: <Heart className="h-4 w-4" />,
        color: "text-pink-500",
      },
      {
        name: "Comments",
        current: 5872,
        previous: 5245,
        change: 12.0,
        changeType: "increase" as "increase" | "decrease",
        icon: <MessageCircle className="h-4 w-4" />,
        color: "text-blue-500",
      },
      {
        name: "Shares",
        current: 3580,
        previous: 3124,
        change: 14.6,
        changeType: "increase" as "increase" | "decrease",
        icon: <Share2 className="h-4 w-4" />,
        color: "text-green-500",
      },
    ],
    platforms: [
      {
        name: "Twitter",
        value: 42,
        icon: <Twitter className="h-4 w-4" />,
        color: "bg-blue-400",
      },
      {
        name: "Facebook",
        value: 28,
        icon: <Facebook className="h-4 w-4" />,
        color: "bg-indigo-500",
      },
      {
        name: "Instagram",
        value: 21,
        icon: <Instagram className="h-4 w-4" />,
        color: "bg-pink-500",
      },
      {
        name: "LinkedIn",
        value: 9,
        icon: <Linkedin className="h-4 w-4" />,
        color: "bg-blue-600",
      },
    ],
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-rose-50 to-orange-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-lg p-6 border border-rose-100 dark:border-slate-700"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Social Engagement</h3>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-slate-800 dark:text-white">
              {data.totalEngagements.toLocaleString()}
            </span>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={`ml-2 text-sm font-medium flex items-center ${
                data.changeType === "increase" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {data.changeType === "increase" ? (
                <TrendingUp className="h-3 w-3 mr-0.5" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-0.5" />
              )}
              {data.percentageChange}%
            </motion.span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{data.period}</div>
        </div>

        <div className="flex -space-x-1">
          {data.platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${platform.color} text-white`}
              title={platform.name}
            >
              {platform.icon}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {data.metrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className="bg-white/60 dark:bg-slate-700/30 rounded-lg p-3"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className={`mr-2 ${metric.color}`}>{metric.icon}</span>
                <span className="font-medium text-slate-700 dark:text-slate-200">{metric.name}</span>
              </div>
              <span
                className={`text-xs font-medium flex items-center ${
                  metric.changeType === "increase"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {metric.changeType === "increase" ? (
                  <TrendingUp className="h-3 w-3 mr-0.5" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-0.5" />
                )}
                {metric.change}%
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-slate-800 dark:text-white">
                {metric.current.toLocaleString()}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Previous: {metric.previous.toLocaleString()}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default SocialEngagementCard

