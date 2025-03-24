"use client";

import type React from "react";

import {
  formatPercent,
  formatTimeAgo,
  generateSentimentHistory,
  getChangeColor,
  getSentimentBgColor,
  getSentimentColor,
  getSentimentGradient,
  getSourceIcon,
  getSourceName,
  keywords,
  news,
  sentimentData,
  SentimentHistoryPoint,
  SentimentSource,
  TimeFrame,
} from "@/data/market-sentiment";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Newspaper,
  RefreshCw,
  Search,
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MarketSentimentAnalyzer = () => {
  const [symbol, setSymbol] = useState("AAPL");
  const [timeframe, setTimeframe] = useState<TimeFrame>("30d");
  const [sentimentHistory, setSentimentHistory] = useState<
    SentimentHistoryPoint[]
  >(generateSentimentHistory(timeframe));
  const [selectedSource, setSelectedSource] =
    useState<SentimentSource>("overall");
  const [searchSymbol, setSearchSymbol] = useState(symbol);
  const [isLoading, setIsLoading] = useState(false);

  // Get the selected sentiment data
  const selectedSentiment =
    sentimentData.find((data) => data.source === selectedSource) ||
    sentimentData[4];

  // Handle refresh
  const handleRefresh = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSentimentHistory(generateSentimentHistory(timeframe));
      setIsLoading(false);
      console.log("Refreshed sentiment data");
    }, 1000);
  };

  // Handle timeframe change
  const handleTimeframeChange = (newTimeframe: TimeFrame) => {
    setTimeframe(newTimeframe);
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSentimentHistory(generateSentimentHistory(newTimeframe));
      setIsLoading(false);
      console.log(`Changed timeframe to ${newTimeframe}`);
    }, 500);
  };

  // Handle symbol change
  const handleSymbolChange = () => {
    if (searchSymbol.trim() === "") return;

    console.log(`Changed symbol to ${searchSymbol}`);

    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setSentimentHistory(generateSentimentHistory(timeframe));
      setIsLoading(false);
    }, 500);
  };

  // Handle symbol search form submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSymbolChange();
  };

  // Chart
  const formatXAxis = (value: string) => {
    // Shorten date format based on timeframe
    if (timeframe === "1d") {
      // For 1d, show hour
      const date = new Date(value);
      return date.getHours().toString().padStart(2, "0") + ":00";
    } else if (timeframe === "7d" || timeframe === "30d") {
      // For 7d and 30d, show day/month
      const parts = value.split("-");
      return `${parts[1]}/${parts[2]}`;
    } else {
      // For 90d, show month only
      const parts = value.split("-");
      return `${parts[1]}/${parts[2]}`;
    }
  };

  const getGradientOffset = () => {
    // Find if all values are positive, all negative, or mixed
    const dataMax = Math.max(...sentimentHistory.map((item) => item.score));
    const dataMin = Math.min(...sentimentHistory.map((item) => item.score));

    // If all values are positive, the offset should be 0
    if (dataMin >= 0) return 0;
    // If all values are negative, the offset should be 1
    if (dataMax <= 0) return 1;
    // If there are both positive and negative values,
    // calculate the offset based on the range
    return dataMax / (dataMax - dataMin);
  };

  const gradientOffset = getGradientOffset();

  return (
    <div className="overflow-hidden rounded-xl bg-slate-900 shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="flex items-center text-2xl font-bold text-white">
              <Activity className="mr-2" />
              Market Sentiment Analyzer
            </h2>
            <p className="mt-1 text-indigo-200">
              Analyze market sentiment from multiple sources
            </p>
          </div>

          <div className="flex items-center gap-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchSymbol}
                onChange={(e) => setSearchSymbol(e.target.value.toUpperCase())}
                className="w-32 rounded-lg border border-indigo-700 bg-indigo-800/50 px-4 py-2 pr-10 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Symbol"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 transform text-indigo-300 hover:text-white"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>

            <motion.button
              className="flex items-center rounded-lg bg-indigo-700 px-4 py-2 text-white hover:bg-indigo-600"
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
          </div>
        </div>

        {/* Overall Sentiment */}
        <div className="mt-6 rounded-lg bg-indigo-800/30 p-4 backdrop-blur-sm">
          <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
            <div>
              <h3 className="text-2xl font-bold text-white">{symbol}</h3>
              <p className="text-sm text-indigo-200">
                Overall Market Sentiment
              </p>
            </div>

            <div className="mt-4 flex items-center sm:mt-0">
              <div className="mr-3 text-3xl font-bold text-white">
                {selectedSentiment.score}
              </div>
              <div
                className={`flex items-center ${getChangeColor(selectedSentiment.change)}`}
              >
                {formatPercent(selectedSentiment.change)}
                {selectedSentiment.change > 0 ? (
                  <ArrowUpRight className="ml-1 h-5 w-5" />
                ) : selectedSentiment.change < 0 ? (
                  <ArrowDownRight className="ml-1 h-5 w-5" />
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-4 h-4 w-full rounded-full bg-indigo-900/50">
            <div
              className={`h-4 rounded-full bg-gradient-to-r ${getSentimentGradient(selectedSentiment.score)}`}
              style={{
                width: `${Math.abs(selectedSentiment.score) + 100}px`,
                maxWidth: "100%",
              }}
            ></div>
          </div>

          <div className="mt-2 flex justify-between text-xs">
            <div className="text-red-400">Bearish</div>
            <div className="text-gray-400">Neutral</div>
            <div className="text-green-400">Bullish</div>
          </div>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="flex flex-wrap gap-2 bg-slate-800 p-4">
        {(["1d", "7d", "30d", "90d"] as TimeFrame[]).map((tf) => (
          <motion.button
            key={tf}
            className={`flex items-center rounded-lg px-4 py-2 ${
              timeframe === tf
                ? "bg-indigo-600 text-white"
                : "bg-slate-700 text-slate-200 hover:bg-slate-600"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleTimeframeChange(tf)}
          >
            {tf}
          </motion.button>
        ))}

        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm text-slate-400">Source:</span>
          <select
            value={selectedSource}
            onChange={(e) =>
              setSelectedSource(e.target.value as SentimentSource)
            }
            className="rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {sentimentData.map((data) => (
              <option key={data.source} value={data.source}>
                {getSourceName(data.source)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="bg-slate-900 p-6">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="text-center">
                <div className="mb-4 animate-spin text-indigo-500">
                  <svg className="h-10 w-10" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
                <p className="text-slate-400">Loading sentiment data...</p>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Sentiment History Chart */}
              <div className="rounded-xl bg-slate-800 p-4">
                <h3 className="mb-4 flex items-center text-xl font-semibold text-white">
                  <Activity className="mr-2 h-5 w-5 text-indigo-400" />
                  Sentiment History
                </h3>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={sentimentHistory}
                      margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorScore"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#10B981"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset={gradientOffset}
                            stopColor="#10B981"
                            stopOpacity={0.2}
                          />
                          <stop
                            offset={gradientOffset}
                            stopColor="#EF4444"
                            stopOpacity={0.2}
                          />
                          <stop
                            offset="100%"
                            stopColor="#EF4444"
                            stopOpacity={0.8}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#374151"
                        opacity={0.5}
                      />
                      <XAxis
                        dataKey="date"
                        stroke="#9CA3AF"
                        tick={{ fill: "#9CA3AF", fontSize: 12 }}
                        tickFormatter={formatXAxis}
                        tickLine={false}
                        axisLine={{ stroke: "#4B5563" }}
                        minTickGap={5}
                      />
                      <YAxis
                        domain={[-100, 100]}
                        stroke="#9CA3AF"
                        tick={{ fill: "#9CA3AF", fontSize: 12 }}
                        ticks={[-100, -50, 0, 50, 100]}
                        tickLine={false}
                        axisLine={{ stroke: "#4B5563" }}
                        label={{
                          value: "Sentiment",
                          position: "insideLeft",
                          angle: -90,
                          style: {
                            textAnchor: "middle",
                            fill: "#9CA3AF",
                            fontSize: 12,
                          },
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          borderColor: "#4B5563",
                          borderRadius: "0.375rem",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                          padding: "8px 12px",
                        }}
                        labelStyle={{
                          color: "#F9FAFB",
                          fontWeight: "600",
                          marginBottom: "4px",
                        }}
                        itemStyle={{ color: "#F9FAFB", padding: "2px 0" }}
                        formatter={(value: number) => [
                          `${value.toFixed(1)}`,
                          "Sentiment Score",
                        ]}
                        labelFormatter={(value) => `Date: ${value}`}
                        cursor={{
                          stroke: "#6B7280",
                          strokeWidth: 1,
                          strokeDasharray: "5 5",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#10B981"
                        fill="url(#colorScore)"
                        fillOpacity={1}
                        strokeWidth={2}
                        isAnimationActive={true}
                        animationDuration={1000}
                        connectNulls
                        dot={{
                          r: 3,
                          strokeWidth: 2,
                          fill: "#1F2937",
                          stroke: "#10B981",
                        }}
                        activeDot={{
                          r: 5,
                          strokeWidth: 2,
                          fill: "#1F2937",
                          stroke: "#10B981",
                        }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 flex justify-between text-xs text-slate-400">
                  <div className="text-red-400">Bearish (-100)</div>
                  <div className="text-gray-400">Neutral (0)</div>
                  <div className="text-green-400">Bullish (+100)</div>
                </div>
              </div>

              {/* Sentiment Breakdown */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Sentiment Sources */}
                <div className="rounded-xl bg-slate-800 p-4">
                  <h3 className="mb-4 text-xl font-semibold text-white">
                    Sentiment Sources
                  </h3>

                  <div className="space-y-4">
                    {sentimentData
                      .filter((data) => data.source !== "overall")
                      .map((data) => (
                        <div
                          key={data.source}
                          className="rounded-lg bg-slate-700/50 p-3 transition-colors hover:bg-slate-700"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              {getSourceIcon(data.source)}
                              <span className="ml-2 text-white">
                                {getSourceName(data.source)}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span
                                className={`font-bold ${getSentimentColor(data.score)}`}
                              >
                                {data.score}
                              </span>
                              <span
                                className={`ml-2 text-sm ${getChangeColor(data.change)}`}
                              >
                                {formatPercent(data.change)}
                              </span>
                            </div>
                          </div>

                          <div className="mt-2 flex items-center text-sm">
                            <div className="mr-4 flex items-center">
                              <div className="mr-1 h-3 w-3 rounded-full bg-green-500"></div>
                              <span className="text-slate-300">
                                {data.bullish}%
                              </span>
                            </div>
                            <div className="mr-4 flex items-center">
                              <div className="mr-1 h-3 w-3 rounded-full bg-red-500"></div>
                              <span className="text-slate-300">
                                {data.bearish}%
                              </span>
                            </div>
                            <div className="flex items-center">
                              <div className="mr-1 h-3 w-3 rounded-full bg-gray-500"></div>
                              <span className="text-slate-300">
                                {data.neutral}%
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Top Keywords */}
                <div className="rounded-xl bg-slate-800 p-4">
                  <h3 className="mb-4 text-xl font-semibold text-white">
                    Top Keywords
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    {keywords.slice(0, 10).map((keyword) => (
                      <div
                        key={keyword.keyword}
                        className="rounded-lg bg-slate-700/50 p-3 transition-colors hover:bg-slate-700"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-white">
                            {keyword.keyword}
                          </span>
                          <span
                            className={`text-sm ${getSentimentColor(keyword.sentiment)}`}
                          >
                            {keyword.sentiment}
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-slate-400">
                          Mentions: {keyword.count}
                        </div>
                        <div className="mt-2 h-1.5 w-full rounded-full bg-slate-600">
                          <div
                            className={`h-1.5 rounded-full ${getSentimentBgColor(keyword.sentiment)}`}
                            style={{ width: `${Math.abs(keyword.sentiment)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent News */}
              <div className="rounded-xl bg-slate-800 p-4">
                <h3 className="mb-4 flex items-center text-xl font-semibold text-white">
                  <Newspaper className="mr-2 h-5 w-5 text-amber-400" />
                  Recent News
                </h3>

                <div className="space-y-4">
                  {news.slice(0, 5).map((item) => (
                    <div
                      key={item.id}
                      className="rounded-lg bg-slate-700/50 p-4 transition-colors hover:bg-slate-700"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-white">
                            {item.title}
                          </h4>
                          <div className="mt-2 flex items-center text-sm text-slate-400">
                            <span className="mr-3">{item.source}</span>
                            <span>{formatTimeAgo(item.timestamp)}</span>
                          </div>
                        </div>
                        <div
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            item.sentiment === "bullish"
                              ? "bg-green-500/20 text-green-400"
                              : item.sentiment === "bearish"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-gray-500/20 text-gray-400"
                          }`}
                        >
                          {item.sentiment}
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.keywords.map((keyword) => (
                          <span
                            key={keyword}
                            className="rounded-md bg-slate-600/50 px-2 py-1 text-xs text-slate-300"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-center">
                  <button className="text-sm font-medium text-indigo-400 hover:text-indigo-300">
                    View All News
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MarketSentimentAnalyzer;
