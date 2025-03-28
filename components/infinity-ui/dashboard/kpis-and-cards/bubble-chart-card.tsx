"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import { Info } from "lucide-react";
import { DashboardCard, CardTitle, chartColors, chartConfig } from "./utils";

type BubbleDataPoint = {
  name: string;
  x: number;
  y: number;
  z: number;
  color: string;
  category: string;
};

type BubbleChartCardProps = {
  title: string;
  subtitle?: string;
  data: BubbleDataPoint[];
  xAxisLabel: string;
  yAxisLabel: string;
  zAxisLabel: string;
  categories: string[];
};

export default function BubbleChartCard({
  title,
  subtitle,
  data,
  xAxisLabel,
  yAxisLabel,
  zAxisLabel,
  categories,
}: BubbleChartCardProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  // Group data by category
  const dataByCategory = categories.map((category) => ({
    name: category,
    data: data.filter((item) => item.category === category),
  }));

  // Create a color map for categories
  const categoryColors = categories.reduce(
    (acc, category, index) => {
      const colorSet =
        Object.values(chartColors)[index % Object.values(chartColors).length];
      acc[category] = colorSet[0];
      return acc;
    },
    {} as Record<string, string>,
  );

  return (
    <DashboardCard>
      <div className="flex items-center justify-between">
        <CardTitle title={title} subtitle={subtitle} className="mb-0" />

        <button
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground dark:hover:bg-slate-800"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Info className="h-5 w-5" />
        </button>
      </div>

      {showTooltip && (
        <motion.div
          className="mt-2 rounded-lg bg-slate-100 p-3 text-sm text-muted-foreground dark:bg-slate-800"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          Bubble size represents {zAxisLabel.toLowerCase()}. Hover over bubbles
          for details.
        </motion.div>
      )}

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid className={chartConfig.gridClassName} />
            <XAxis
              type="number"
              dataKey="x"
              name={xAxisLabel}
              unit=""
              tick={{ fill: "var(--foreground)" }}
              label={{
                value: xAxisLabel,
                position: "insideBottom",
                offset: -5,
                fill: "var(--muted-foreground)",
              }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name={yAxisLabel}
              unit=""
              tick={{ fill: "var(--foreground)" }}
              label={{
                value: yAxisLabel,
                angle: -90,
                position: "insideLeft",
                fill: "var(--muted-foreground)",
              }}
            />
            <ZAxis
              type="number"
              dataKey="z"
              range={[50, 400]}
              name={zAxisLabel}
              unit=""
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={chartConfig.tooltipStyle}
              formatter={(value: any, name: string) => {
                if (name === "x") return [value, xAxisLabel];
                if (name === "y") return [value, yAxisLabel];
                if (name === "z") return [value, zAxisLabel];
                return [value, name];
              }}
            />
            <Legend
              onClick={(e) => {
                const category = e.dataKey as string;
                setActiveCategory(
                  activeCategory === category ? null : category,
                );
              }}
            />

            {dataByCategory.map((categoryData, index) => (
              <Scatter
                key={categoryData.name}
                name={categoryData.name}
                data={categoryData.data}
                fill={categoryColors[categoryData.name]}
                animationDuration={chartConfig.animationDuration}
                animationBegin={index * 200}
                className={
                  activeCategory && activeCategory !== categoryData.name
                    ? "opacity-30"
                    : ""
                }
              >
                {categoryData.data.map((entry, i) => (
                  <Cell
                    key={`cell-${i}`}
                    fill={entry.color || categoryColors[categoryData.name]}
                  />
                ))}
              </Scatter>
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}
