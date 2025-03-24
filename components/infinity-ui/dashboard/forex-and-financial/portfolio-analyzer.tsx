"use client";

import {
  assets,
  COLORS,
  formatCurrency,
  formatPercent,
  getPerformanceColor,
  historicalData,
} from "@/data/portfolio-analyzer";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Download,
  Filter,
  LineChartIcon,
  PieChartIcon,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PortfolioAnalyzer = () => {
  const [view, setView] = useState<
    "overview" | "allocation" | "performance" | "risk"
  >("overview");
  const [timeframe, setTimeframe] = useState<
    "day" | "week" | "month" | "year" | "total"
  >("total");
  const [sortBy, setSortBy] = useState<"name" | "value" | "performance">(
    "value",
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [isLoading, setIsLoading] = useState(false);

  // Calculate portfolio metrics
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalCost = assets.reduce((sum, asset) => sum + asset.costBasis, 0);
  const totalGain = totalValue - totalCost;
  const totalGainPercent = (totalGain / totalCost) * 100;

  // Calculate performance for the selected timeframe
  const performanceByTimeframe = assets.map((asset) => ({
    name: asset.ticker,
    value: asset.performance[timeframe],
  }));

  // Calculate allocation by type
  const allocationByType = assets.reduce(
    (acc, asset) => {
      const existingType = acc.find((item) => item.type === asset.type);
      if (existingType) {
        existingType.value += asset.value;
      } else {
        acc.push({ type: asset.type, value: asset.value });
      }
      return acc;
    },
    [] as { type: string; value: number }[],
  );

  // Calculate allocation percentages
  allocationByType.forEach((item) => {
    item.value = (item.value / totalValue) * 100;
  });

  // Calculate allocation by sector
  const allocationBySector = assets.reduce(
    (acc, asset) => {
      if (!asset.sector) return acc;

      const existingSector = acc.find((item) => item.sector === asset.sector);
      if (existingSector) {
        existingSector.value += asset.value;
      } else {
        acc.push({ sector: asset.sector, value: asset.value });
      }
      return acc;
    },
    [] as { sector: string; value: number }[],
  );

  // Calculate sector percentages
  allocationBySector.forEach((item) => {
    item.value = (item.value / totalValue) * 100;
  });

  // Sort assets
  const sortedAssets = [...assets].sort((a, b) => {
    let comparison = 0;

    if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === "value") {
      comparison = a.value - b.value;
    } else if (sortBy === "performance") {
      comparison = a.performance[timeframe] - b.performance[timeframe];
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  // Handle refresh
  const handleRefresh = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Data refreshed...");
    }, 1000);
  };

  // Handle sort
  const handleSort = (column: "name" | "value" | "performance") => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("desc");
    }
  };

  // Handle filter
  const handleFilter = () => {
    console.log(
      `Filtering data by ${{
        timeframe,
        sortBy,
        sortDirection,
      }}...`,
    );
  };

  // Handle export
  const handleExport = () => {
    console.log("Exporting data...");
  };

  return (
    <div className="overflow-hidden rounded-xl bg-slate-900 shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="flex items-center text-2xl font-bold text-white">
              <Briefcase className="mr-2" />
              Portfolio Analyzer
            </h2>
            <p className="mt-1 text-blue-200">
              Analyze and track your investment portfolio
            </p>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              className="flex items-center rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </motion.button>

            <motion.button
              className="flex items-center rounded-lg bg-indigo-700 px-4 py-2 text-white hover:bg-indigo-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFilter}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </motion.button>

            <motion.button
              className="flex items-center rounded-lg bg-indigo-800 px-4 py-2 text-white hover:bg-indigo-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExport}
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </motion.button>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <motion.div
            className="rounded-lg bg-slate-800/50 p-4 backdrop-blur-sm"
            whileHover={{ y: -5 }}
          >
            <div className="text-sm font-medium text-blue-300">Total Value</div>
            <div className="mt-1 text-2xl font-bold text-white">
              {formatCurrency(totalValue)}
            </div>
          </motion.div>

          <motion.div
            className="rounded-lg bg-slate-800/50 p-4 backdrop-blur-sm"
            whileHover={{ y: -5 }}
          >
            <div className="text-sm font-medium text-blue-300">
              Total Gain/Loss
            </div>
            <div
              className={`mt-1 text-2xl font-bold ${getPerformanceColor(totalGain)}`}
            >
              {formatCurrency(totalGain)} ({formatPercent(totalGainPercent)})
            </div>
          </motion.div>

          <motion.div
            className="rounded-lg bg-slate-800/50 p-4 backdrop-blur-sm"
            whileHover={{ y: -5 }}
          >
            <div className="text-sm font-medium text-blue-300">Asset Count</div>
            <div className="mt-1 text-2xl font-bold text-white">
              {assets.length}
            </div>
          </motion.div>

          <motion.div
            className="rounded-lg bg-slate-800/50 p-4 backdrop-blur-sm"
            whileHover={{ y: -5 }}
          >
            <div className="text-sm font-medium text-blue-300">
              Last Updated
            </div>
            <div className="mt-1 text-xl font-bold text-white">
              {new Date().toLocaleDateString()}{" "}
              {new Date().toLocaleTimeString()}
            </div>
          </motion.div>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex flex-wrap gap-2 bg-slate-800 p-4">
        <motion.button
          className={`flex items-center rounded-lg px-4 py-2 ${
            view === "overview"
              ? "bg-blue-600 text-white"
              : "bg-slate-700 text-slate-200 hover:bg-slate-600"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setView("overview")}
        >
          <LineChartIcon className="mr-2 h-4 w-4" />
          Overview
        </motion.button>

        <motion.button
          className={`flex items-center rounded-lg px-4 py-2 ${
            view === "allocation"
              ? "bg-blue-600 text-white"
              : "bg-slate-700 text-slate-200 hover:bg-slate-600"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setView("allocation")}
        >
          <PieChartIcon className="mr-2 h-4 w-4" />
          Allocation
        </motion.button>

        <motion.button
          className={`flex items-center rounded-lg px-4 py-2 ${
            view === "performance"
              ? "bg-blue-600 text-white"
              : "bg-slate-700 text-slate-200 hover:bg-slate-600"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setView("performance")}
        >
          <TrendingUp className="mr-2 h-4 w-4" />
          Performance
        </motion.button>

        <motion.button
          className={`flex items-center rounded-lg px-4 py-2 ${
            view === "risk"
              ? "bg-blue-600 text-white"
              : "bg-slate-700 text-slate-200 hover:bg-slate-600"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setView("risk")}
        >
          <AlertTriangle className="mr-2 h-4 w-4" />
          Risk Analysis
        </motion.button>

        {/* Timeframe selector */}
        <div className="ml-auto">
          <select
            className="rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as any)}
          >
            <option value="day">1 Day</option>
            <option value="week">1 Week</option>
            <option value="month">1 Month</option>
            <option value="year">1 Year</option>
            <option value="total">Total</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="bg-slate-900 p-6">
        <AnimatePresence mode="wait">
          {/* Overview View */}
          {view === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Portfolio Value Chart */}
              <div className="rounded-xl bg-slate-800 p-4">
                <h3 className="mb-4 text-xl font-bold text-white">
                  Portfolio Value Over Time
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={historicalData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorValue"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#3B82F6"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#3B82F6"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis
                        dataKey="date"
                        stroke="#9CA3AF"
                        tickFormatter={(value) =>
                          new Date(value).toLocaleDateString("en-US", {
                            month: "short",
                          })
                        }
                      />
                      <YAxis
                        stroke="#9CA3AF"
                        tickFormatter={(value) =>
                          `$${(value / 1000).toFixed(0)}k`
                        }
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          borderColor: "#374151",
                          borderRadius: "0.5rem",
                          color: "#ccc",
                        }}
                        formatter={(value: any) => [
                          formatCurrency(value as number),
                          "Value",
                        ]}
                        labelFormatter={(label) =>
                          new Date(label).toLocaleDateString()
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#3B82F6"
                        fillOpacity={1}
                        fill="url(#colorValue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Assets Table */}
              <div className="overflow-x-auto rounded-xl bg-slate-800 p-4">
                <h3 className="mb-4 text-xl font-bold text-white">Assets</h3>
                <table className="min-w-full divide-y divide-slate-700">
                  <thead>
                    <tr>
                      <th
                        className="cursor-pointer px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400"
                        onClick={() => handleSort("name")}
                      >
                        <div className="flex items-center">
                          Asset
                          {sortBy === "name" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ChevronDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </th>
                      <th
                        className="cursor-pointer px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400"
                        onClick={() => handleSort("value")}
                      >
                        <div className="flex items-center">
                          Value
                          {sortBy === "value" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ChevronDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                        Allocation
                      </th>
                      <th
                        className="cursor-pointer px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400"
                        onClick={() => handleSort("performance")}
                      >
                        <div className="flex items-center">
                          Performance ({timeframe})
                          {sortBy === "performance" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ChevronDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {sortedAssets.map((asset) => (
                      <motion.tr
                        key={asset.id}
                        whileHover={{
                          backgroundColor: "rgba(59, 130, 246, 0.1)",
                        }}
                        className="cursor-pointer hover:bg-slate-700/50"
                      >
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">
                                {asset.name}
                              </div>
                              <div className="text-sm text-slate-400">
                                {asset.ticker}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="text-sm text-white">
                            {formatCurrency(asset.value)}
                          </div>
                          <div className="text-xs text-slate-400">
                            {asset.quantity} units
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="text-sm text-white">
                            {asset.allocation.toFixed(2)}%
                          </div>
                          <div className="mt-1 h-2 w-full rounded-full bg-slate-700">
                            <div
                              className="h-2 rounded-full bg-blue-500"
                              style={{ width: `${asset.allocation}%` }}
                            ></div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div
                            className={`flex items-center text-sm font-medium ${getPerformanceColor(asset.performance[timeframe])}`}
                          >
                            {formatPercent(asset.performance[timeframe])}
                            {asset.performance[timeframe] > 0 ? (
                              <ArrowUpRight className="ml-1 h-4 w-4" />
                            ) : asset.performance[timeframe] < 0 ? (
                              <ArrowDownRight className="ml-1 h-4 w-4" />
                            ) : null}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <span
                            className={`rounded-full px-2 py-1 text-xs ${
                              asset.type === "stock"
                                ? "bg-blue-900 text-blue-200"
                                : asset.type === "etf"
                                  ? "bg-green-900 text-green-200"
                                  : asset.type === "crypto"
                                    ? "bg-purple-900 text-purple-200"
                                    : asset.type === "forex"
                                      ? "bg-yellow-900 text-yellow-200"
                                      : asset.type === "bond"
                                        ? "bg-gray-700 text-gray-200"
                                        : "bg-red-900 text-red-200"
                            }`}
                          >
                            {asset.type.toUpperCase()}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Allocation View */}
          {view === "allocation" && (
            <motion.div
              key="allocation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-6 lg:grid-cols-2"
            >
              {/* Asset Type Allocation */}
              <div className="rounded-xl bg-slate-800 p-4">
                <h3 className="mb-4 text-xl font-bold text-white">
                  Allocation by Asset Type
                </h3>
                <div className="flex h-80 items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={allocationByType}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="type"
                        label={({ type, value }) =>
                          `${type}: ${value.toFixed(1)}%`
                        }
                      >
                        {allocationByType.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: any) => [
                          `${value.toFixed(2)}%`,
                          "Allocation",
                        ]}
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          borderColor: "#374151",
                          borderRadius: "0.5rem",
                          color: "#ccc",
                        }}
                      />
                      <Legend
                        formatter={(value) =>
                          value.charAt(0).toUpperCase() + value.slice(1)
                        }
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Sector Allocation */}
              <div className="rounded-xl bg-slate-800 p-4">
                <h3 className="mb-4 text-xl font-bold text-white">
                  Allocation by Sector
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={allocationBySector}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis
                        type="number"
                        stroke="#9CA3AF"
                        tickFormatter={(value) => `${value}%`}
                      />
                      <YAxis
                        type="category"
                        dataKey="sector"
                        stroke="#9CA3AF"
                      />
                      <Tooltip
                        formatter={(value: any) => [
                          `${value.toFixed(2)}%`,
                          "Allocation",
                        ]}
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          borderColor: "#374151",
                          borderRadius: "0.5rem",
                          color: "#ccc",
                        }}
                      />
                      <Bar dataKey="value" fill="#3B82F6" radius={[0, 4, 4, 0]}>
                        {allocationBySector.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Individual Asset Allocation */}
              <div className="rounded-xl bg-slate-800 p-4 lg:col-span-2">
                <h3 className="mb-4 text-xl font-bold text-white">
                  Individual Asset Allocation
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={assets.map((asset) => ({
                        name: asset.ticker,
                        value: asset.allocation,
                      }))}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis
                        stroke="#9CA3AF"
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip
                        formatter={(value: any) => [
                          `${value.toFixed(2)}%`,
                          "Allocation",
                        ]}
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          borderColor: "#374151",
                          borderRadius: "0.5rem",
                          color: "#ccc",
                        }}
                      />
                      <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]}>
                        {assets.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {/* Performance View */}
          {view === "performance" && (
            <motion.div
              key="performance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Performance Chart */}
              <div className="rounded-xl bg-slate-800 p-4">
                <h3 className="mb-4 text-xl font-bold text-white">
                  Asset Performance ({timeframe})
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={performanceByTimeframe}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis
                        stroke="#9CA3AF"
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip
                        formatter={(value: any) => [
                          `${value.toFixed(2)}%`,
                          "Performance",
                        ]}
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          borderColor: "#374151",
                          borderRadius: "0.5rem",
                          color: "#ccc",
                        }}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {performanceByTimeframe.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.value >= 0 ? "#10B981" : "#EF4444"}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Performance Comparison */}
              <div className="rounded-xl bg-slate-800 p-4">
                <h3 className="mb-4 text-xl font-bold text-white">
                  Performance Comparison
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg bg-slate-700 p-4">
                    <h4 className="mb-2 text-lg font-medium text-white">
                      Best Performers
                    </h4>
                    <div className="space-y-3">
                      {[...assets]
                        .sort(
                          (a, b) =>
                            b.performance[timeframe] - a.performance[timeframe],
                        )
                        .slice(0, 3)
                        .map((asset) => (
                          <div
                            key={asset.id}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center">
                              <div className="ml-3">
                                <div className="text-sm font-medium text-white">
                                  {asset.ticker}
                                </div>
                                <div className="text-xs text-slate-400">
                                  {asset.type}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center font-medium text-green-500">
                              {formatPercent(asset.performance[timeframe])}
                              <ArrowUpRight className="ml-1 h-4 w-4" />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="rounded-lg bg-slate-700 p-4">
                    <h4 className="mb-2 text-lg font-medium text-white">
                      Worst Performers
                    </h4>
                    <div className="space-y-3">
                      {[...assets]
                        .sort(
                          (a, b) =>
                            a.performance[timeframe] - b.performance[timeframe],
                        )
                        .slice(0, 3)
                        .map((asset) => (
                          <div
                            key={asset.id}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center">
                              <div className="ml-3">
                                <div className="text-sm font-medium text-white">
                                  {asset.ticker}
                                </div>
                                <div className="text-xs text-slate-400">
                                  {asset.type}
                                </div>
                              </div>
                            </div>
                            <div
                              className={`${asset.performance[timeframe] < 0 ? "text-red-500" : "text-green-500"} flex items-center font-medium`}
                            >
                              {formatPercent(asset.performance[timeframe])}
                              {asset.performance[timeframe] < 0 ? (
                                <ArrowDownRight className="ml-1 h-4 w-4" />
                              ) : (
                                <ArrowUpRight className="ml-1 h-4 w-4" />
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Risk Analysis View */}
          {view === "risk" && (
            <motion.div
              key="risk"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Risk Distribution */}
              <div className="rounded-xl bg-slate-800 p-4">
                <h3 className="mb-4 text-xl font-bold text-white">
                  Risk Distribution
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: "Low Risk",
                            value:
                              (assets
                                .filter((a) => a.risk === "low")
                                .reduce((sum, a) => sum + a.value, 0) /
                                totalValue) *
                              100,
                          },
                          {
                            name: "Medium Risk",
                            value:
                              (assets
                                .filter((a) => a.risk === "medium")
                                .reduce((sum, a) => sum + a.value, 0) /
                                totalValue) *
                              100,
                          },
                          {
                            name: "High Risk",
                            value:
                              (assets
                                .filter((a) => a.risk === "high")
                                .reduce((sum, a) => sum + a.value, 0) /
                                totalValue) *
                              100,
                          },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) =>
                          `${name}: ${value.toFixed(1)}%`
                        }
                      >
                        <Cell fill="#10B981" /> {/* Low Risk - Green */}
                        <Cell fill="#F59E0B" /> {/* Medium Risk - Yellow */}
                        <Cell fill="#EF4444" /> {/* High Risk - Red */}
                      </Pie>
                      <Tooltip
                        formatter={(value: any) => [
                          `${value.toFixed(2)}%`,
                          "Allocation",
                        ]}
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          borderColor: "#374151",
                          borderRadius: "0.5rem",
                          color: "#ccc",
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Risk vs Return */}
              <div className="rounded-xl bg-slate-800 p-4">
                <h3 className="mb-4 text-xl font-bold text-white">
                  Risk vs Return
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={assets.map((asset) => ({
                        name: asset.ticker,
                        return: asset.performance[timeframe],
                        risk:
                          asset.risk === "low"
                            ? 1
                            : asset.risk === "medium"
                              ? 2
                              : 3,
                        value: asset.value,
                      }))}
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <CartesianGrid stroke="#374151" />
                      <XAxis dataKey="name" scale="band" stroke="#9CA3AF" />
                      <YAxis
                        yAxisId="left"
                        orientation="left"
                        stroke="#9CA3AF"
                        label={{
                          value: "Return (%)",
                          angle: -90,
                          position: "insideLeft",
                          fill: "#9CA3AF",
                        }}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke="#9CA3AF"
                        label={{
                          value: "Risk Level",
                          angle: 90,
                          position: "insideRight",
                          fill: "#9CA3AF",
                        }}
                        domain={[0, 4]}
                        ticks={[1, 2, 3]}
                        tickFormatter={(value) =>
                          value === 1 ? "Low" : value === 2 ? "Medium" : "High"
                        }
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          borderColor: "#374151",
                          borderRadius: "0.5rem",
                          color: "#ccc",
                        }}
                        formatter={(value: any, name: string) => {
                          if (name === "return")
                            return [`${value.toFixed(2)}%`, "Return"];
                          if (name === "risk")
                            return [
                              value === 1
                                ? "Low"
                                : value === 2
                                  ? "Medium"
                                  : "High",
                              "Risk",
                            ];
                          return [value, name];
                        }}
                      />
                      <Legend />
                      <Bar
                        yAxisId="right"
                        dataKey="risk"
                        fill="#F59E0B"
                        name="Risk Level"
                      >
                        {assets.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              entry.risk === "low"
                                ? "#10B981"
                                : entry.risk === "medium"
                                  ? "#F59E0B"
                                  : "#EF4444"
                            }
                          />
                        ))}
                      </Bar>
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="return"
                        stroke="#3B82F6"
                        name="Return"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PortfolioAnalyzer;
