"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ChevronDown, ArrowRight } from "lucide-react";
import { DashboardCard, CardTitle, chartConfig, formatNumber } from "./utils";

type FunnelStep = {
  name: string;
  value: number;
  dropoff: number;
  color: string;
  details?: string;
};

type FunnelAnalysisCardProps = {
  title: string;
  subtitle?: string;
  steps: FunnelStep[];
};

export default function FunnelAnalysisCard({
  title,
  subtitle,
  steps,
}: FunnelAnalysisCardProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  // Calculate conversion rates between steps
  const stepsWithConversion = steps.map((step, index) => {
    if (index === 0) return { ...step, conversionRate: 100 };

    const conversionRate = (step.value / steps[0].value) * 100;
    return { ...step, conversionRate };
  });

  return (
    <DashboardCard>
      <CardTitle title={title} subtitle={subtitle} />

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={stepsWithConversion}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              className={chartConfig.gridClassName}
              horizontal={true}
              vertical={false}
            />
            <XAxis type="number" domain={[0, "dataMax"]} />
            <YAxis
              dataKey="name"
              type="category"
              width={90}
              tick={{ fill: "var(--foreground)" }}
            />
            <Tooltip
              formatter={(value: number) => [formatNumber(value), "Users"]}
              contentStyle={chartConfig.tooltipStyle}
            />
            <Bar
              dataKey="value"
              animationDuration={chartConfig.animationDuration}
              animationBegin={200}
              onClick={(data, index) =>
                setExpandedStep(expandedStep === index ? null : index)
              }
              cursor="pointer"
            >
              {stepsWithConversion.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} radius={0} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 space-y-2">
        {stepsWithConversion.map((step, index) => (
          <div key={index} className="rounded-lg border dark:border-slate-800">
            <div
              className="flex cursor-pointer items-center justify-between p-3"
              onClick={() =>
                setExpandedStep(expandedStep === index ? null : index)
              }
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: step.color }}
                />
                <span className="font-medium text-foreground">{step.name}</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Users:</span>
                  <span className="font-medium text-foreground">
                    {formatNumber(step.value)}
                  </span>
                </div>

                {index > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Conversion:
                    </span>
                    <span className="font-medium text-foreground">
                      {step.conversionRate.toFixed(1)}%
                    </span>
                  </div>
                )}

                <motion.div
                  animate={{ rotate: expandedStep === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                </motion.div>
              </div>
            </div>

            <AnimatePresence>
              {expandedStep === index && step.details && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t px-4 py-3 dark:border-slate-800"
                >
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {step.details}
                    </p>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        Dropoff:
                      </span>
                      <span className="text-xs font-medium text-red-500">
                        {step.dropoff.toFixed(1)}%
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({formatNumber(steps[index + 1].value)} users continue
                        to next step)
                      </span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
