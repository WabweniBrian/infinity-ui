"use client"

import { useState } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Info } from "lucide-react"
import { DashboardCard, CardTitle, AnimatedCounter, chartConfig } from "./utils"

type GaugeProps = {
  value: number
  min: number
  max: number
  title: string
  color: string
  suffix?: string
  size?: number
}

const Gauge = ({ value, min, max, title, color, suffix = "", size = 120 }: GaugeProps) => {
  // Calculate percentage
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))

  // For the needle animation
  const needleRotation = useMotionValue(-90)
  const needleAngle = useTransform(needleRotation, (value) => `rotate(${value}deg)`)

  // Animate the needle
  useState(() => {
    needleRotation.set(percentage * 1.8 - 90)
  })

  // Data for the gauge chart
  const data = [
    { name: "Remaining", value: 100 - percentage },
    { name: "Value", value: percentage },
  ]

  // Colors for the gauge segments
  const colors = [
    "#e2e8f0", // Light gray for remaining
    color, // Main color for value
  ]

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[120px] w-[120px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius={40}
              outerRadius={60}
              paddingAngle={0}
              dataKey="value"
              animationDuration={chartConfig.animationDuration}
              animationBegin={300}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                  className={index === 0 ? "dark:fill-slate-700" : ""}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={chartConfig.tooltipStyle}
              formatter={(value: number) => [`${value}%`, "Completion"]}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Needle */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-[50px] w-[2px] origin-bottom -translate-x-1/2 -translate-y-full bg-foreground"
          style={{ rotate: needleAngle }}
        >
          <div className="absolute -left-[3px] -top-[3px] h-[6px] w-[6px] rounded-full bg-foreground" />
        </motion.div>

        {/* Value display */}
        <div className="absolute bottom-0 left-0 right-0 text-center">
          <AnimatedCounter value={value} suffix={suffix} className="text-lg font-bold text-foreground" />
        </div>
      </div>

      <h4 className="mt-2 text-sm font-medium text-foreground">{title}</h4>
    </div>
  )
}

type GaugeDashboardCardProps = {
  title: string
  subtitle?: string
  gauges: {
    title: string
    value: number
    min: number
    max: number
    color: string
    suffix?: string
  }[]
}

export default function GaugeDashboardCard({ title, subtitle, gauges }: GaugeDashboardCardProps) {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <DashboardCard>
      <div className="flex items-center justify-between">
        <CardTitle title={title} subtitle={subtitle} className="mb-0" />

        <button
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground dark:hover:bg-slate-800"
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
        >
          <Info className="h-5 w-5" />
        </button>
      </div>

      {showInfo && (
        <motion.div
          className="mt-2 rounded-lg bg-slate-100 p-3 text-sm text-muted-foreground dark:bg-slate-800"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          Gauges show current values relative to their min and max ranges.
        </motion.div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {gauges.map((gauge, index) => (
          <Gauge
            key={index}
            title={gauge.title}
            value={gauge.value}
            min={gauge.min}
            max={gauge.max}
            color={gauge.color}
            suffix={gauge.suffix}
          />
        ))}
      </div>
    </DashboardCard>
  )
}

