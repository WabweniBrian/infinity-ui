"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type React from "react";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { UserGrowthData } from "@/lib/actions/admin/dashboard-stats";

interface UserGrowthChartProps {
  data: UserGrowthData[];
  year: number;
  availableYears: number[];
}

export const UserGrowthChart = ({
  data,
  year,
  availableYears,
}: UserGrowthChartProps) => {
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
            Total Users: {payload[0].value.toLocaleString()}
          </p>
          <p className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <span className="mr-2 h-2 w-2 rounded-full bg-brand-pink"></span>
            New Users (Last 7 Days): {payload[1].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="mb-4 items-center justify-between sm:flex">
        <h2 className="text-xl font-semibold">User Growth ({year})</h2>
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

      <motion.div
        className="h-[300px] w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value) => (
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {value}
                </span>
              )}
            />
            <Line
              type="monotone"
              dataKey="users"
              name="Total Users"
              stroke="#11ACBB"
              strokeWidth={2}
              dot={{ r: 4, fill: "#11ACBB", strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#11ACBB", strokeWidth: 0 }}
              animationDuration={1500}
            />
            <Line
              type="monotone"
              dataKey="newUsers"
              name="New Users (Last 7 Days)"
              stroke="#DB3066"
              strokeWidth={2}
              dot={{ r: 4, fill: "#DB3066", strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#DB3066", strokeWidth: 0 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};
