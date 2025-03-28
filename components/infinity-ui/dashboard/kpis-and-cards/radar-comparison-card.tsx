"use client"

import { useState } from "react"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts"
import { DashboardCard, CardTitle, chartColors, chartConfig } from "./utils"

type RadarDataPoint = {
  subject: string
  current: number
  previous: number
  fullMark: number
}

type RadarComparisonCardProps = {
  title: string
  subtitle?: string
  data: RadarDataPoint[]
  currentLabel: string
  previousLabel: string
  primaryColor: string
  secondaryColor: string
}

export default function RadarComparisonCard({
  title,
  subtitle,
  data,
  currentLabel,
  previousLabel,
  primaryColor = chartColors.blue[0],
  secondaryColor = chartColors.slate[0],
}: RadarComparisonCardProps) {
  const [activeDataKey, setActiveDataKey] = useState<string | null>(null)

  return (
    <DashboardCard>
      <CardTitle title={title} subtitle={subtitle} />

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid className={chartConfig.gridClassName} />
            <PolarAngleAxis dataKey="subject" tick={{ fill: "var(--foreground)" }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />

            <Radar
              name={previousLabel}
              dataKey="previous"
              stroke={secondaryColor}
              fill={secondaryColor}
              fillOpacity={0.3}
              animationDuration={chartConfig.animationDuration}
              onMouseOver={() => setActiveDataKey("previous")}
              onMouseOut={() => setActiveDataKey(null)}
              className={activeDataKey && activeDataKey !== "previous" ? "opacity-30" : ""}
            />

            <Radar
              name={currentLabel}
              dataKey="current"
              stroke={primaryColor}
              fill={primaryColor}
              fillOpacity={0.5}
              animationDuration={chartConfig.animationDuration}
              onMouseOver={() => setActiveDataKey("current")}
              onMouseOut={() => setActiveDataKey(null)}
              className={activeDataKey && activeDataKey !== "current" ? "opacity-30" : ""}
            />

            <Tooltip contentStyle={chartConfig.tooltipStyle} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: primaryColor }} />
          <span className="text-sm text-muted-foreground">{currentLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: secondaryColor }} />
          <span className="text-sm text-muted-foreground">{previousLabel}</span>
        </div>
      </div>
    </DashboardCard>
  )
}

