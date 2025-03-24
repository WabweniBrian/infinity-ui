"use client";

import {
  COLORS,
  CryptoCurrency,
  defaultCryptocurrencies,
  formatCurrency,
  formatLargeNumber,
  formatPercent,
  generatePriceHistory,
  getChangeColor,
  marketStats,
  portfolioAllocation,
  portfolioHistory,
  PricePoint,
  TimeFrame,
} from "@/data/crypto";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRightLeft,
  ArrowUpRight,
  BarChart2,
  Bell,
  BellOff,
  Bitcoin,
  ChevronDown,
  ChevronUp,
  Clock,
  Globe,
  Info,
  PieChartIcon,
  RefreshCw,
  Repeat,
  Star,
  StarOff,
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type CryptoDashboardProps = {
  cryptocurrencies?: CryptoCurrency[];
  priceHistory?: PricePoint[];
  onRefresh?: () => void;
  onTimeframeChange?: (timeframe: TimeFrame) => void;
  onToggleFavorite?: (id: string) => void;
  onToggleAlert?: (id: string) => void;
};

const CryptoDashboard = ({
  cryptocurrencies = defaultCryptocurrencies,
  priceHistory: propPriceHistory,
  onRefresh,
  onTimeframeChange,
  onToggleFavorite,
  onToggleAlert,
}: CryptoDashboardProps) => {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency>(
    cryptocurrencies[0],
  );
  const [timeframe, setTimeframe] = useState<TimeFrame>("24h");
  const [priceHistory, setPriceHistory] = useState<PricePoint[]>(
    propPriceHistory || generatePriceHistory(timeframe, selectedCrypto.price),
  );
  const [view, setView] = useState<"market" | "portfolio" | "exchange">(
    "market",
  );
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState<
    "name" | "price" | "change24h" | "marketCap"
  >("marketCap");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [isLoading, setIsLoading] = useState(false);

  // Filter cryptocurrencies based on favorites
  const filteredCryptocurrencies = cryptocurrencies.filter((crypto) => {
    if (showFavoritesOnly) {
      return crypto.isFavorite;
    }
    return true;
  });

  // Sort cryptocurrencies
  const sortedCryptocurrencies = [...filteredCryptocurrencies].sort((a, b) => {
    let comparison = 0;

    if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === "price") {
      comparison = a.price - b.price;
    } else if (sortBy === "change24h") {
      comparison = a.change24h - b.change24h;
    } else if (sortBy === "marketCap") {
      comparison = a.marketCap - b.marketCap;
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  // Handle refresh
  const handleRefresh = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setPriceHistory(generatePriceHistory(timeframe, selectedCrypto.price));
      setIsLoading(false);
      onRefresh?.();
    }, 1000);
  };

  // Handle timeframe change
  const handleTimeframeChange = (newTimeframe: TimeFrame) => {
    setTimeframe(newTimeframe);
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setPriceHistory(generatePriceHistory(newTimeframe, selectedCrypto.price));
      setIsLoading(false);
      onTimeframeChange?.(newTimeframe);
    }, 500);
  };

  // Handle crypto selection
  const handleCryptoSelect = (crypto: CryptoCurrency) => {
    setSelectedCrypto(crypto);
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setPriceHistory(generatePriceHistory(timeframe, crypto.price));
      setIsLoading(false);
    }, 500);
  };

  // Handle toggle favorite
  const handleToggleFavorite = (id: string) => {
    onToggleFavorite?.(id);
  };

  // Handle toggle alert
  const handleToggleAlert = (id: string) => {
    onToggleAlert?.(id);
  };

  // Handle sort
  const handleSort = (column: "name" | "price" | "change24h" | "marketCap") => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("desc");
    }
  };

  return (
    <div className="overflow-hidden rounded-xl bg-slate-900 shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="flex items-center text-2xl font-bold text-white">
              <Bitcoin className="mr-2" />
              Crypto Dashboard
            </h2>
            <p className="mt-1 text-blue-200">
              Track, analyze, and trade cryptocurrencies
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
              className="flex items-center rounded-lg bg-purple-700 px-4 py-2 text-white hover:bg-purple-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            >
              {showFavoritesOnly ? (
                <>
                  <Star className="mr-2 h-4 w-4 fill-current" />
                  Favorites
                </>
              ) : (
                <>
                  <Globe className="mr-2 h-4 w-4" />
                  All Coins
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Market Stats */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          {marketStats.map((stat) => (
            <motion.div
              key={stat.name}
              className="rounded-lg bg-blue-800/30 p-4 backdrop-blur-sm"
              whileHover={{ y: -5 }}
            >
              <div className="text-sm font-medium text-blue-300">
                {stat.name}
              </div>
              <div className="mt-1 text-2xl font-bold text-white">
                {stat.name.includes("Dominance")
                  ? `${stat.value}%`
                  : formatLargeNumber(stat.value)}
              </div>
              <div
                className={`mt-1 flex items-center text-sm ${getChangeColor(stat.change)}`}
              >
                {formatPercent(stat.change)}
                {stat.change > 0 ? (
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                ) : (
                  <ArrowDownRight className="ml-1 h-4 w-4" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex flex-wrap gap-2 bg-slate-800 p-4">
        <motion.button
          className={`flex items-center rounded-lg px-4 py-2 ${
            view === "market"
              ? "bg-blue-600 text-white"
              : "bg-slate-700 text-slate-200 hover:bg-slate-600"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setView("market")}
        >
          <BarChart2 className="mr-2 h-4 w-4" />
          Market
        </motion.button>

        <motion.button
          className={`flex items-center rounded-lg px-4 py-2 ${
            view === "portfolio"
              ? "bg-blue-600 text-white"
              : "bg-slate-700 text-slate-200 hover:bg-slate-600"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setView("portfolio")}
        >
          <PieChartIcon className="mr-2 h-4 w-4" />
          Portfolio
        </motion.button>

        <motion.button
          className={`flex items-center rounded-lg px-4 py-2 ${
            view === "exchange"
              ? "bg-blue-600 text-white"
              : "bg-slate-700 text-slate-200 hover:bg-slate-600"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setView("exchange")}
        >
          <ArrowRightLeft className="mr-2 h-4 w-4" />
          Exchange
        </motion.button>
      </div>

      {/* Content */}
      <div className="bg-slate-900 p-6">
        <AnimatePresence mode="wait">
          {/* Market View */}
          {view === "market" && (
            <motion.div
              key="market"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Price Chart */}
              <div className="rounded-xl bg-slate-800 p-4">
                <div className="mb-4 flex flex-col items-start justify-between sm:flex-row sm:items-center">
                  <div>
                    <h3 className="flex items-center text-xl font-bold text-white">
                      {selectedCrypto.name} ({selectedCrypto.symbol})
                    </h3>
                    <div className="mt-1 flex items-center">
                      <span className="mr-2 text-2xl font-bold text-white">
                        {formatCurrency(
                          selectedCrypto.price,
                          selectedCrypto.price < 1 ? 6 : 2,
                        )}
                      </span>
                      <span
                        className={`flex items-center ${getChangeColor(selectedCrypto.change24h)}`}
                      >
                        {formatPercent(selectedCrypto.change24h)}
                        {selectedCrypto.change24h > 0 ? (
                          <ArrowUpRight className="ml-1 h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="ml-1 h-4 w-4" />
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 sm:mt-0">
                    {(
                      [
                        "1h",
                        "24h",
                        "7d",
                        "30d",
                        "90d",
                        "1y",
                        "all",
                      ] as TimeFrame[]
                    ).map((tf) => (
                      <button
                        key={tf}
                        className={`rounded-lg px-3 py-1 text-sm ${
                          timeframe === tf
                            ? "bg-blue-600 text-white"
                            : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                        }`}
                        onClick={() => handleTimeframeChange(tf)}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-80">
                  {isLoading ? (
                    <div className="flex h-full items-center justify-center">
                      <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={priceHistory}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="colorPrice"
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
                          dataKey="timestamp"
                          stroke="#9CA3AF"
                          tickFormatter={(value) => {
                            const date = new Date(value);
                            if (timeframe === "1h") {
                              return date.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              });
                            } else if (timeframe === "24h") {
                              return date.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              });
                            } else if (timeframe === "7d") {
                              return date.toLocaleDateString([], {
                                weekday: "short",
                              });
                            } else {
                              return date.toLocaleDateString([], {
                                month: "short",
                                day: "numeric",
                              });
                            }
                          }}
                        />
                        <YAxis
                          stroke="#9CA3AF"
                          domain={["dataMin", "dataMax"]}
                          tickFormatter={(value) =>
                            `$${value.toLocaleString()}`
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
                            "Price",
                          ]}
                          labelFormatter={(label) =>
                            new Date(label).toLocaleString()
                          }
                        />
                        <Area
                          type="monotone"
                          dataKey="price"
                          stroke="#3B82F6"
                          fillOpacity={1}
                          fill="url(#colorPrice)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              {/* Cryptocurrency Table */}
              <div className="overflow-x-auto rounded-xl bg-slate-800 p-4">
                <h3 className="mb-4 text-xl font-bold text-white">
                  Cryptocurrencies
                </h3>
                <table className="min-w-full divide-y divide-slate-700">
                  <thead>
                    <tr>
                      <th className="w-10 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                        #
                      </th>
                      <th
                        className="cursor-pointer px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400"
                        onClick={() => handleSort("name")}
                      >
                        <div className="flex items-center">
                          Name
                          {sortBy === "name" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ChevronDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </th>
                      <th
                        className="cursor-pointer px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-400"
                        onClick={() => handleSort("price")}
                      >
                        <div className="flex items-center justify-end">
                          Price
                          {sortBy === "price" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ChevronDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </th>
                      <th
                        className="cursor-pointer px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-400"
                        onClick={() => handleSort("change24h")}
                      >
                        <div className="flex items-center justify-end">
                          24h %
                          {sortBy === "change24h" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ChevronDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </th>
                      <th
                        className="cursor-pointer px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-400"
                        onClick={() => handleSort("marketCap")}
                      >
                        <div className="flex items-center justify-end">
                          Market Cap
                          {sortBy === "marketCap" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ChevronDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-400">
                        Volume (24h)
                      </th>
                      <th className="w-20 px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-slate-400">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {sortedCryptocurrencies.map((crypto, index) => (
                      <motion.tr
                        key={crypto.id}
                        whileHover={{
                          backgroundColor: "rgba(59, 130, 246, 0.1)",
                        }}
                        className={`cursor-pointer hover:bg-slate-700/50 ${
                          selectedCrypto.id === crypto.id
                            ? "bg-slate-700/50"
                            : ""
                        }`}
                        onClick={() => handleCryptoSelect(crypto)}
                      >
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-400">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">
                                {crypto.name}
                              </div>
                              <div className="text-sm text-slate-400">
                                {crypto.symbol}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right">
                          <div className="text-sm text-white">
                            {formatCurrency(
                              crypto.price,
                              crypto.price < 1 ? 6 : 2,
                            )}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right">
                          <div
                            className={`flex items-center justify-end text-sm font-medium ${getChangeColor(crypto.change24h)}`}
                          >
                            {formatPercent(crypto.change24h)}
                            {crypto.change24h > 0 ? (
                              <ArrowUpRight className="ml-1 h-4 w-4" />
                            ) : crypto.change24h < 0 ? (
                              <ArrowDownRight className="ml-1 h-4 w-4" />
                            ) : null}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right">
                          <div className="text-sm text-white">
                            {formatLargeNumber(crypto.marketCap)}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right">
                          <div className="text-sm text-white">
                            {formatLargeNumber(crypto.volume24h)}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              className="text-slate-400 hover:text-yellow-500"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleFavorite(crypto.id);
                              }}
                            >
                              {crypto.isFavorite ? (
                                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                              ) : (
                                <StarOff className="h-5 w-5" />
                              )}
                            </button>
                            <button
                              className="text-slate-400 hover:text-blue-500"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleAlert(crypto.id);
                              }}
                            >
                              {crypto.hasAlert ? (
                                <Bell className="h-5 w-5 fill-blue-500 text-blue-500" />
                              ) : (
                                <BellOff className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Portfolio View */}
          {view === "portfolio" && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Portfolio Summary */}
              <div className="rounded-xl bg-slate-800 p-4">
                <h3 className="mb-4 text-xl font-bold text-white">
                  Portfolio Summary
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-lg bg-slate-700 p-4">
                    <div className="text-sm text-slate-400">Total Value</div>
                    <div className="mt-1 text-2xl font-bold text-white">
                      $21,000.00
                    </div>
                    <div className="mt-1 flex items-center text-sm text-green-500">
                      +$11,000.00 (+110.00%)
                      <ArrowUpRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>

                  <div className="rounded-lg bg-slate-700 p-4">
                    <div className="text-sm text-slate-400">24h Change</div>
                    <div className="mt-1 text-2xl font-bold text-white">
                      +$420.00
                    </div>
                    <div className="mt-1 flex items-center text-sm text-green-500">
                      +2.04%
                      <ArrowUpRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>

                  <div className="rounded-lg bg-slate-700 p-4">
                    <div className="text-sm text-slate-400">Assets</div>
                    <div className="mt-1 text-2xl font-bold text-white">5</div>
                    <div className="mt-1 text-sm text-slate-400">
                      Last updated: {new Date().toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Portfolio Charts */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Portfolio Allocation */}
                <div className="rounded-xl bg-slate-800 p-4">
                  <h3 className="mb-4 text-xl font-bold text-white">
                    Portfolio Allocation
                  </h3>
                  <div className="flex h-80 items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={portfolioAllocation}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {portfolioAllocation.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: any) => [
                            `${value}%`,
                            "Allocation",
                          ]}
                          contentStyle={{
                            backgroundColor: "#ddd",
                            borderColor: "#ccc",
                            borderRadius: "0.5rem",
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Portfolio Performance */}
                <div className="rounded-xl bg-slate-800 p-4">
                  <h3 className="mb-4 text-xl font-bold text-white">
                    Portfolio Performance
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={portfolioHistory}
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
                              stopColor="#8B5CF6"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#8B5CF6"
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
                            `$${value.toLocaleString()}`
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
                          stroke="#8B5CF6"
                          fillOpacity={1}
                          fill="url(#colorValue)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Portfolio Assets */}
              <div className="rounded-xl bg-slate-800 p-4">
                <h3 className="mb-4 text-xl font-bold text-white">
                  Your Assets
                </h3>
                <table className="min-w-full divide-y divide-slate-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                        Asset
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-400">
                        Holdings
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-400">
                        Price
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-400">
                        Value
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-400">
                        Allocation
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-400">
                        Profit/Loss
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {portfolioAllocation.map((asset, index) => {
                      const crypto =
                        cryptocurrencies.find((c) => c.symbol === asset.name) ||
                        cryptocurrencies[0];
                      const holdings =
                        (21000 * (asset.value / 100)) / crypto.price;
                      const value = holdings * crypto.price;
                      const profitPercent = Math.random() * 200 - 50; // Sample data

                      return (
                        <tr key={asset.name} className="hover:bg-slate-700/50">
                          <td className="whitespace-nowrap px-4 py-4">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-white">
                                  {crypto.name}
                                </div>
                                <div className="text-sm text-slate-400">
                                  {crypto.symbol}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-right">
                            <div className="text-sm text-white">
                              {holdings.toFixed(holdings < 1 ? 6 : 4)}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-right">
                            <div className="text-sm text-white">
                              {formatCurrency(
                                crypto.price,
                                crypto.price < 1 ? 6 : 2,
                              )}
                            </div>
                            <div
                              className={`text-xs ${getChangeColor(crypto.change24h)}`}
                            >
                              {formatPercent(crypto.change24h)}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-right">
                            <div className="text-sm text-white">
                              {formatCurrency(value)}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-right">
                            <div className="text-sm text-white">
                              {asset.value}%
                            </div>
                            <div className="mt-1 h-1 w-full rounded-full bg-slate-700">
                              <div
                                className="h-1 rounded-full"
                                style={{
                                  width: `${asset.value}%`,
                                  backgroundColor:
                                    COLORS[index % COLORS.length],
                                }}
                              ></div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-right">
                            <div
                              className={`text-sm font-medium ${getChangeColor(profitPercent)}`}
                            >
                              {formatPercent(profitPercent)}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Exchange View */}
          {view === "exchange" && (
            <motion.div
              key="exchange"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Exchange Interface */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Buy/Sell Form */}
                <div className="rounded-xl bg-slate-800 p-4">
                  <h3 className="mb-4 text-xl font-bold text-white">
                    Exchange
                  </h3>

                  <div className="space-y-4">
                    <div className="flex justify-center space-x-4">
                      <button className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white">
                        Buy
                      </button>
                      <button className="rounded-lg bg-slate-700 px-6 py-2 font-medium text-white hover:bg-slate-600">
                        Sell
                      </button>
                      <button className="rounded-lg bg-slate-700 px-6 py-2 font-medium text-white hover:bg-slate-600">
                        Convert
                      </button>
                    </div>

                    <div className="rounded-lg bg-slate-700 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <label className="text-sm text-slate-400">From</label>
                        <span className="text-sm text-slate-400">
                          Balance: 0.0456 BTC
                        </span>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="number"
                          className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="0.00"
                          defaultValue="0.01"
                        />
                        <select className="ml-2 rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>BTC</option>
                          <option>ETH</option>
                          <option>SOL</option>
                          <option>ADA</option>
                          <option>DOGE</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <button className="rounded-full bg-slate-700 p-2 hover:bg-slate-600">
                        <Repeat className="h-5 w-5 text-blue-400" />
                      </button>
                    </div>

                    <div className="rounded-lg bg-slate-700 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <label className="text-sm text-slate-400">To</label>
                        <span className="text-sm text-slate-400">
                          Balance: 0.00 ETH
                        </span>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="number"
                          className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="0.00"
                          defaultValue="0.15"
                          readOnly
                        />
                        <select className="ml-2 rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>ETH</option>
                          <option>BTC</option>
                          <option>SOL</option>
                          <option>ADA</option>
                          <option>DOGE</option>
                        </select>
                      </div>
                    </div>

                    <div className="rounded-lg bg-slate-700 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm text-slate-400">
                          Exchange Rate
                        </span>
                        <span className="text-sm text-white">
                          1 BTC = 15.12 ETH
                        </span>
                      </div>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm text-slate-400">Fee</span>
                        <span className="text-sm text-white">
                          0.0001 BTC ($4.23)
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">
                          Estimated Delivery
                        </span>
                        <span className="text-sm text-white">Instant</span>
                      </div>
                    </div>

                    <button className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-500">
                      Preview Conversion
                    </button>
                  </div>
                </div>

                {/* Order Book */}
                <div className="rounded-xl bg-slate-800 p-4">
                  <h3 className="mb-4 text-xl font-bold text-white">
                    Order Book
                  </h3>

                  <div className="mb-4 flex items-center justify-between">
                    <div className="text-sm text-slate-400">BTC/ETH</div>
                    <div className="flex space-x-2">
                      <button className="rounded-lg bg-slate-700 px-3 py-1 text-xs text-white">
                        0.1
                      </button>
                      <button className="rounded-lg bg-slate-700 px-3 py-1 text-xs text-white">
                        0.5
                      </button>
                      <button className="rounded-lg bg-slate-700 px-3 py-1 text-xs text-white">
                        1.0
                      </button>
                      <button className="rounded-lg bg-blue-600 px-3 py-1 text-xs text-white">
                        All
                      </button>
                    </div>
                  </div>

                  {/* Sell Orders */}
                  <div className="mb-2">
                    <div className="mb-1 text-xs text-slate-400">
                      Sell Orders
                    </div>
                    <div className="space-y-1">
                      {[...Array(5)].map((_, i) => {
                        const price = 15.12 + i * 0.01;
                        const amount = Math.random() * 2;
                        const total = price * amount;

                        return (
                          <div
                            key={`sell-${i}`}
                            className="flex items-center justify-between text-xs"
                          >
                            <div className="text-red-500">
                              {price.toFixed(5)}
                            </div>
                            <div className="text-slate-300">
                              {amount.toFixed(6)}
                            </div>
                            <div className="text-slate-400">
                              {total.toFixed(5)}
                            </div>
                            <div className="h-1 w-full max-w-[100px] rounded-sm bg-slate-700">
                              <div
                                className="h-1 rounded-sm bg-red-500/20"
                                style={{ width: `${(amount / 2) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Current Price */}
                  <div className="mb-2 border-y border-slate-700 py-2">
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-white">15.12</div>
                      <div className="text-sm text-green-500">+1.2%</div>
                    </div>
                  </div>

                  {/* Buy Orders */}
                  <div>
                    <div className="mb-1 text-xs text-slate-400">
                      Buy Orders
                    </div>
                    <div className="space-y-1">
                      {[...Array(5)].map((_, i) => {
                        const price = 15.11 - i * 0.01;
                        const amount = Math.random() * 2;
                        const total = price * amount;

                        return (
                          <div
                            key={`buy-${i}`}
                            className="flex items-center justify-between text-xs"
                          >
                            <div className="text-green-500">
                              {price.toFixed(5)}
                            </div>
                            <div className="text-slate-300">
                              {amount.toFixed(6)}
                            </div>
                            <div className="text-slate-400">
                              {total.toFixed(5)}
                            </div>
                            <div className="h-1 w-full max-w-[100px] rounded-sm bg-slate-700">
                              <div
                                className="h-1 rounded-sm bg-green-500/20"
                                style={{ width: `${(amount / 2) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recent Trades */}
                  <div className="mt-6">
                    <h4 className="text-md mb-2 font-medium text-white">
                      Recent Trades
                    </h4>
                    <div className="space-y-1">
                      {[...Array(5)].map((_, i) => {
                        const price = 15.12 + (Math.random() * 0.04 - 0.02);
                        const amount = Math.random() * 1.5;
                        const time = new Date(Date.now() - i * 60000);
                        const isBuy = Math.random() > 0.5;

                        return (
                          <div
                            key={`trade-${i}`}
                            className="flex items-center justify-between text-xs"
                          >
                            <div
                              className={
                                isBuy ? "text-green-500" : "text-red-500"
                              }
                            >
                              {price.toFixed(5)}
                            </div>
                            <div className="text-slate-300">
                              {amount.toFixed(6)}
                            </div>
                            <div className="text-slate-400">
                              {time.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Market Depth */}
              <div className="rounded-xl bg-slate-800 p-4">
                <h3 className="mb-4 text-xl font-bold text-white">
                  Market Depth
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        { price: 14.9, bid: 10, ask: 0 },
                        { price: 14.95, bid: 8, ask: 0 },
                        { price: 15.0, bid: 6, ask: 0 },
                        { price: 15.05, bid: 4, ask: 0 },
                        { price: 15.1, bid: 2, ask: 0 },
                        { price: 15.12, bid: 0, ask: 0 },
                        { price: 15.15, bid: 0, ask: 2 },
                        { price: 15.2, bid: 0, ask: 4 },
                        { price: 15.25, bid: 0, ask: 6 },
                        { price: 15.3, bid: 0, ask: 8 },
                        { price: 15.35, bid: 0, ask: 10 },
                      ]}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="price" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          borderColor: "#374151",
                          borderRadius: "0.5rem",
                          color: "#ccc",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="bid"
                        stackId="1"
                        stroke="#10B981"
                        fill="#10B981"
                      />
                      <Area
                        type="monotone"
                        dataKey="ask"
                        stackId="1"
                        stroke="#EF4444"
                        fill="#EF4444"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between bg-slate-800 p-4 text-xs text-slate-400">
        <div className="flex items-center">
          <Clock className="mr-1 h-3 w-3" />
          Last updated: {new Date().toLocaleTimeString()}
        </div>
        <div className="flex items-center">
          <Info className="mr-1 h-3 w-3" />
          Data is delayed by 15 minutes
        </div>
      </div>
    </div>
  );
};

export default CryptoDashboard;
