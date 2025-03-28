"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type DataPoint = {
  year: number;
  value: number;
  category?: string;
};

type PieDataPoint = {
  name: string;
  value: number;
};

const climateData: DataPoint[] = [
  { year: 2000, value: 0.39 },
  { year: 2005, value: 0.54 },
  { year: 2010, value: 0.72 },
  { year: 2015, value: 0.9 },
  { year: 2020, value: 1.02 },
  { year: 2023, value: 1.18 },
];

const emissionsByRegion: DataPoint[] = [
  { year: 2000, value: 6.8, category: "North America" },
  { year: 2005, value: 7.2, category: "North America" },
  { year: 2010, value: 6.9, category: "North America" },
  { year: 2015, value: 6.7, category: "North America" },
  { year: 2020, value: 5.9, category: "North America" },
  { year: 2023, value: 6.1, category: "North America" },

  { year: 2000, value: 4.1, category: "Europe" },
  { year: 2005, value: 4.3, category: "Europe" },
  { year: 2010, value: 4.0, category: "Europe" },
  { year: 2015, value: 3.6, category: "Europe" },
  { year: 2020, value: 3.0, category: "Europe" },
  { year: 2023, value: 3.2, category: "Europe" },

  { year: 2000, value: 3.3, category: "Asia" },
  { year: 2005, value: 5.1, category: "Asia" },
  { year: 2010, value: 7.2, category: "Asia" },
  { year: 2015, value: 9.1, category: "Asia" },
  { year: 2020, value: 10.2, category: "Asia" },
  { year: 2023, value: 10.8, category: "Asia" },
];

const energySourceData: PieDataPoint[] = [
  { name: "Fossil Fuels", value: 60 },
  { name: "Renewables", value: 26 },
  { name: "Nuclear", value: 10 },
  { name: "Other", value: 4 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const DataJournalismSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeChart, setActiveChart] = useState<
    "temperature" | "emissions" | "energy"
  >("temperature");

  return (
    <section ref={ref} className="bg-slate-50 px-4 py-24 dark:bg-slate-900">
      {/* Dark mode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 3v18h18"></path>
                    <path d="m19 9-5 5-4-4-3 3"></path>
                  </svg>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
                  Climate Data Visualized
                </h2>
              </div>
              <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                Exploring the numbers behind climate change through interactive
                data visualizations.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  activeChart === "temperature"
                    ? "bg-emerald-600 text-white dark:bg-emerald-500"
                    : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                }`}
                onClick={() => setActiveChart("temperature")}
              >
                Global Temperature
              </button>
              <button
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  activeChart === "emissions"
                    ? "bg-emerald-600 text-white dark:bg-emerald-500"
                    : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                }`}
                onClick={() => setActiveChart("emissions")}
              >
                Emissions by Region
              </button>
              <button
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  activeChart === "energy"
                    ? "bg-emerald-600 text-white dark:bg-emerald-500"
                    : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                }`}
                onClick={() => setActiveChart("energy")}
              >
                Energy Sources
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800 md:p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          layout
        >
          {activeChart === "temperature" && (
            <div>
              <div className="mb-6">
                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                  Global Temperature Anomalies (2000-2023)
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Temperature anomalies in °C relative to the 1951-1980 average.
                  The data shows a clear upward trend over the past two decades.
                </p>
              </div>

              <div className="h-80">
                <ChartContainer
                  config={{
                    temperature: {
                      label: "Temperature Anomaly (°C)",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={climateData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="year"
                        label={{
                          value: "Year",
                          position: "insideBottomRight",
                          offset: -10,
                        }}
                      />
                      <YAxis
                        label={{
                          value: "Temperature Anomaly (°C)",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="value"
                        name="Temperature Anomaly"
                        stroke="var(--color-temperature)"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>

              <div className="mt-6 text-sm text-slate-500 dark:text-slate-400">
                <p>Source: NASA Goddard Institute for Space Studies (GISS)</p>
              </div>
            </div>
          )}

          {activeChart === "emissions" && (
            <div>
              <div className="mb-6">
                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                  CO₂ Emissions by Region (2000-2023)
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Annual carbon dioxide emissions in gigatons by major world
                  regions, showing shifting patterns of global emissions.
                </p>
              </div>

              <div className="h-80">
                <ChartContainer
                  config={{
                    "North America": {
                      label: "North America",
                      color: "hsl(var(--chart-1))",
                    },
                    Europe: {
                      label: "Europe",
                      color: "hsl(var(--chart-2))",
                    },
                    Asia: {
                      label: "Asia",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={emissionsByRegion}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis
                        label={{
                          value: "CO₂ Emissions (Gt)",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar
                        dataKey="value"
                        name={emissionsByRegion[0].category}
                        fill="var(--color-North America)"
                        stackId="a"
                      />
                      <Bar
                        dataKey="value"
                        name={emissionsByRegion[6].category}
                        fill="var(--color-Europe)"
                        stackId="a"
                      />
                      <Bar
                        dataKey="value"
                        name={emissionsByRegion[12].category}
                        fill="var(--color-Asia)"
                        stackId="a"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>

              <div className="mt-6 text-sm text-slate-500 dark:text-slate-400">
                <p>Source: Global Carbon Project</p>
              </div>
            </div>
          )}

          {activeChart === "energy" && (
            <div>
              <div className="mb-6">
                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                  Global Energy Sources (2023)
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Breakdown of global energy consumption by source, highlighting
                  the continued dominance of fossil fuels despite growth in
                  renewables.
                </p>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={energySourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {energySourceData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 text-sm text-slate-500 dark:text-slate-400">
                <p>Source: International Energy Agency (IEA)</p>
              </div>
            </div>
          )}

          <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-700">
            <h4 className="mb-2 font-medium text-slate-900 dark:text-white">
              Key Insights:
            </h4>
            <ul className="list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-400">
              <li>
                Global temperatures have risen by approximately 0.8°C since
                2000, with the rate of increase accelerating.
              </li>
              <li>
                While emissions have stabilized or decreased in North America
                and Europe, Asia has seen significant growth, becoming the
                largest emitting region.
              </li>
              <li>
                Renewable energy sources now account for over a quarter of
                global energy production, though fossil fuels still dominate.
              </li>
            </ul>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Last updated: April 2024
            </div>
            <motion.button
              className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Download Full Dataset
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" x2="12" y1="15" y2="3"></line>
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DataJournalismSection;
