"use client";

import { correlationData, pairs, timeframes } from "@/data/correlation-matrix";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Grid, Info, RefreshCw, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

const CorrelationMatrix = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframes[0]);
  const [showInfo, setShowInfo] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPairs, setFilteredPairs] = useState(pairs);

  // Filter pairs based on search query
  useEffect(() => {
    if (searchQuery) {
      setFilteredPairs(
        pairs.filter((pair) =>
          pair.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
    } else {
      setFilteredPairs(pairs);
    }
  }, [searchQuery]);

  // Handle timeframe change
  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe);
    console.log(`Changing timeframe to ${timeframe}`);
  };

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    console.log("Refreshing data...");
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Get correlation value for a pair of symbols
  const getCorrelation = (symbol1: string, symbol2: string): number => {
    if (symbol1 === symbol2) return 1; // Perfect correlation with self

    const data = correlationData.find(
      (item) =>
        ((item.symbol1 === symbol1 && item.symbol2 === symbol2) ||
          (item.symbol1 === symbol2 && item.symbol2 === symbol1)) &&
        item.timeframe === selectedTimeframe,
    );

    return data ? data.correlation : 0;
  };

  // Get color based on correlation value
  const getCorrelationColor = (value: number): string => {
    const absValue = Math.abs(value);

    if (value > 0) {
      // Positive correlation - green gradient
      if (absValue >= 0.8) return "bg-green-600/90 text-white";
      if (absValue >= 0.5) return "bg-green-500/70 text-white";
      if (absValue >= 0.2) return "bg-green-400/50 text-white";
      return "bg-slate-700 text-slate-300";
    } else {
      // Negative correlation - red gradient
      if (absValue >= 0.8) return "bg-red-600/90 text-white";
      if (absValue >= 0.5) return "bg-red-500/70 text-white";
      if (absValue >= 0.2) return "bg-red-400/50 text-white";
      return "bg-slate-700 text-slate-300";
    }
  };

  // Format correlation value
  const formatCorrelation = (value: number): string => {
    return value.toFixed(2);
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 p-4">
        <div className="flex items-center gap-2">
          <Grid className="text-blue-400" size={20} />
          <h2 className="text-xl font-bold text-white">Correlation Matrix</h2>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowInfo(!showInfo)}
          >
            <Info size={16} />
          </motion.button>

          <motion.button
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw
              size={16}
              className={isRefreshing ? "animate-spin" : ""}
            />
          </motion.button>

          <motion.button
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={16} />
          </motion.button>
        </div>
      </div>

      {/* Info Panel */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-b border-slate-800"
          >
            <div className="p-4">
              <div className="flex items-start justify-between">
                <h3 className="mb-2 text-lg font-medium text-white">
                  Understanding Correlation
                </h3>
                <button
                  className="p-1 text-slate-400 hover:text-white"
                  onClick={() => setShowInfo(false)}
                >
                  <X size={16} />
                </button>
              </div>

              <p className="mb-4 text-slate-300">
                Correlation measures the statistical relationship between two
                currency pairs. Values range from -1 to +1, where:
              </p>

              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-green-500/30 bg-green-600/20 p-3">
                  <h4 className="mb-1 text-sm font-medium text-green-400">
                    Positive Correlation (+1)
                  </h4>
                  <p className="text-xs text-slate-300">
                    Pairs move in the same direction. When one goes up, the
                    other tends to go up as well.
                  </p>
                </div>

                <div className="rounded-lg border border-slate-700 bg-slate-800 p-3">
                  <h4 className="mb-1 text-sm font-medium text-slate-300">
                    No Correlation (0)
                  </h4>
                  <p className="text-xs text-slate-400">
                    No statistical relationship between the pairs. They move
                    independently of each other.
                  </p>
                </div>

                <div className="rounded-lg border border-red-500/30 bg-red-600/20 p-3">
                  <h4 className="mb-1 text-sm font-medium text-red-400">
                    Negative Correlation (-1)
                  </h4>
                  <p className="text-xs text-slate-300">
                    Pairs move in opposite directions. When one goes up, the
                    other tends to go down.
                  </p>
                </div>
              </div>

              <div className="text-sm text-slate-400">
                <p className="mb-2">
                  <strong className="text-white">Trading Applications:</strong>
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>
                    Diversification: Trade pairs with low correlation to spread
                    risk
                  </li>
                  <li>
                    Hedging: Use negatively correlated pairs to hedge positions
                  </li>
                  <li>
                    Confirmation: Look for similar signals in highly correlated
                    pairs
                  </li>
                  <li>
                    Arbitrage: Exploit temporary divergences in highly
                    correlated pairs
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="border-b border-slate-800 p-4">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          {/* Timeframe Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Timeframe:</span>
            <div className="flex">
              {timeframes.map((timeframe) => (
                <button
                  key={timeframe}
                  className={`px-3 py-1.5 text-sm ${
                    selectedTimeframe === timeframe
                      ? "rounded-lg bg-blue-600 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                  onClick={() => handleTimeframeChange(timeframe)}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 transform text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Filter currency pairs..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800/50 py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Correlation Legend */}
      <div className="border-b border-slate-800 p-4">
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs text-slate-400">Strong Negative</span>
          <div className="flex h-4 w-64 overflow-hidden rounded-full">
            <div className="w-1/5 bg-red-600"></div>
            <div className="w-1/5 bg-red-500/70"></div>
            <div className="w-1/5 bg-slate-700"></div>
            <div className="w-1/5 bg-green-500/70"></div>
            <div className="w-1/5 bg-green-600"></div>
          </div>
          <span className="text-xs text-slate-400">Strong Positive</span>
        </div>
        <div className="mt-1 flex justify-center">
          <div className="flex w-64 items-center justify-between px-1">
            <span className="text-xs text-slate-500">-1.0</span>
            <span className="text-xs text-slate-500">-0.5</span>
            <span className="text-xs text-slate-500">0</span>
            <span className="text-xs text-slate-500">+0.5</span>
            <span className="text-xs text-slate-500">+1.0</span>
          </div>
        </div>
      </div>

      {/* Matrix */}
      <div className="mt-6 overflow-x-auto p-4">
        {filteredPairs.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-slate-900 p-2 text-left text-sm font-medium text-slate-400">
                  Pairs
                </th>
                {filteredPairs.map((pair) => (
                  <th
                    key={pair}
                    className="min-w-[120px] p-2 text-center text-xs font-medium text-slate-400"
                  >
                    <div className="origin-bottom-left -rotate-45 transform whitespace-nowrap">
                      {pair}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredPairs.map((pair1, rowIndex) => (
                <tr
                  key={pair1}
                  className={rowIndex % 2 === 0 ? "bg-slate-800/20" : ""}
                >
                  <td className="sticky left-0 z-10 bg-slate-900 p-2 text-sm font-medium text-white">
                    {pair1}
                  </td>
                  {filteredPairs.map((pair2) => {
                    const correlation = getCorrelation(pair1, pair2);
                    return (
                      <td key={`${pair1}-${pair2}`} className="p-1">
                        <motion.div
                          className={`flex items-center justify-center rounded-lg p-2 ${getCorrelationColor(correlation)}`}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {formatCorrelation(correlation)}
                        </motion.div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-8 text-center">
            <p className="text-slate-400">
              No currency pairs found matching your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CorrelationMatrix;
