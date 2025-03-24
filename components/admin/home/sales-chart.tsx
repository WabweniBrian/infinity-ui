"use client";

import type React from "react";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useRouter } from "next/navigation";
import { SalesData } from "@/lib/actions/admin/dashboard-stats";

interface SalesChartProps {
  data: SalesData[];
  year: number;
  availableYears: number[];
}

export const SalesChart = ({ data, year, availableYears }: SalesChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const router = useRouter();

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = e.target.value;
    router.push(`/admin?year=${selectedYear}`, { scroll: false });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-white p-3 shadow-md dark:border-gray-600 dark:bg-gray-800">
          <p className="mb-1 font-medium">{label}</p>
          <p className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <span className="mr-2 h-2 w-2 rounded-full bg-brand"></span>
            Revenue: ${payload[0].value.toLocaleString()}
          </p>
          <p className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <span className="mr-2 h-2 w-2 rounded-full bg-brand-yellow"></span>
            Transactions: {payload[1].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="mb-4 items-center justify-between sm:flex">
        <h2 className="text-xl font-semibold">Monthly Sales ({year})</h2>
        <div className="mt-3 flex items-center gap-2 sm:mt-0">
          <label htmlFor="year-select" className="text-sm font-medium">
            Select Year:
          </label>
          <select
            id="year-select"
            value={year}
            onChange={handleYearChange}
            className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm dark:border-gray-600 dark:bg-gray-800"
          >
            {availableYears.map((yearOption) => (
              <option key={yearOption} value={yearOption}>
                {yearOption}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            onMouseMove={(data) => {
              if (data.activeTooltipIndex !== undefined) {
                setActiveIndex(data.activeTooltipIndex);
              }
            }}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-gray-200 dark:stroke-gray-700"
            />
            <XAxis
              dataKey="name"
              className="text-xs text-gray-500 dark:text-gray-400"
              tick={{ fill: "currentColor" }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={{ stroke: "#E5E7EB" }}
            />
            <YAxis
              className="text-xs text-gray-500 dark:text-gray-400"
              tick={{ fill: "currentColor" }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={{ stroke: "#E5E7EB" }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            />
            <Legend
              formatter={(value) => (
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {value}
                </span>
              )}
            />
            <Bar
              dataKey="revenue"
              name="Revenue"
              fill="#11ACBB"
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
            <Bar
              dataKey="transactions"
              name="Transactions"
              fill="#F6A71A"
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
