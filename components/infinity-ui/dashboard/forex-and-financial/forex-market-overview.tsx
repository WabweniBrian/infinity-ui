"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Clock,
  RefreshCw,
  Filter,
  ChevronDown,
  Eye,
  EyeOff,
  SortAsc,
  SortDesc,
} from "lucide-react";
import { pairs, SortDirection, SortField } from "@/data/forex-market-overview";

const ForexMarketOverview = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPair, setSelectedPair] = useState("EUR/USD");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "favorites" | "gainers" | "losers"
  >("all");
  const [sortField, setSortField] = useState<SortField>("symbol");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "symbol",
    "price",
    "spread",
    "change",
    "range",
    "volume",
  ]);

  const lastUpdated = new Date();

  // Filter pairs based on search query and active filter
  const filteredPairs = pairs.filter((pair) => {
    // Search filter
    const matchesSearch =
      pair.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${pair.baseCurrency}${pair.quoteCurrency}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Category filter
    switch (activeFilter) {
      case "favorites":
        return pair.isFavorite;
      case "gainers":
        return pair.dailyChange > 0;
      case "losers":
        return pair.dailyChange < 0;
      default:
        return true;
    }
  });

  // Sort pairs
  const sortedPairs = [...filteredPairs].sort((a, b) => {
    let comparison = 0;

    switch (sortField) {
      case "symbol":
        comparison = a.symbol.localeCompare(b.symbol);
        break;
      case "price":
        comparison = a.bid - b.bid;
        break;
      case "spread":
        comparison = a.spread - b.spread;
        break;
      case "change":
        comparison = a.dailyChangePercent - b.dailyChangePercent;
        break;
      case "volume":
        comparison = a.volume - b.volume;
        break;
      default:
        comparison = 0;
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    console.log("Refreshing data...");

    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Handle sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Toggle column visibility
  const toggleColumn = (column: string) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((c) => c !== column)
        : [...prev, column],
    );
  };

  // Toggle favorite status
  const toggleFavorite = (symbol: string) => {
    // This would typically update state or call an API
    console.log(`Toggle favorite for ${symbol}`);
  };

  // Format price with appropriate decimal places
  const formatPrice = (price: number, symbol: string) => {
    const decimalPlaces = symbol.includes("JPY") ? 3 : 5;
    return price.toFixed(decimalPlaces);
  };

  // Format spread
  const formatSpread = (spread: number) => {
    return spread.toFixed(1);
  };

  // Format percent
  const formatPercent = (percent: number) => {
    return `${percent >= 0 ? "+" : ""}${percent.toFixed(2)}%`;
  };

  // Format volume
  const formatVolume = (volume: number) => {
    if (volume >= 1000000000) {
      return `${(volume / 1000000000).toFixed(1)}B`;
    } else if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`;
    }
    return volume.toString();
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 p-4">
        <div className="flex items-center gap-2">
          <Globe className="text-blue-400" size={20} />
          <h2 className="text-xl font-bold text-white">
            Forex Market Overview
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {lastUpdated && (
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Clock size={14} />
              <span>Updated: {lastUpdated.toLocaleTimeString()}</span>
            </div>
          )}

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
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-slate-800 p-4">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="relative w-full md:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 transform text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search currency pairs..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800/50 py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex w-full items-center gap-2 md:w-auto">
            <div className="hide-scrollbar flex items-center gap-2 overflow-x-auto">
              {["all", "favorites", "gainers", "losers"].map((filter) => (
                <button
                  key={filter}
                  className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm ${
                    activeFilter === filter
                      ? "bg-blue-600 text-white"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                  onClick={() => setActiveFilter(filter as any)}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>

            <div className="relative">
              <motion.button
                className="flex items-center gap-1 rounded-lg bg-slate-800 p-2 text-slate-400 hover:text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <Filter size={16} />
                <ChevronDown size={14} />
              </motion.button>

              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    className="absolute right-0 z-10 mt-2 w-48 overflow-hidden rounded-lg bg-slate-800 shadow-lg"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="p-2">
                      <div className="px-3 py-2 text-xs text-slate-400">
                        Show/Hide Columns
                      </div>
                      {[
                        { id: "symbol", label: "Symbol" },
                        { id: "price", label: "Price" },
                        { id: "spread", label: "Spread" },
                        { id: "change", label: "Change" },
                        { id: "range", label: "Range" },
                        { id: "volume", label: "Volume" },
                      ].map((column) => (
                        <button
                          key={column.id}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-700"
                          onClick={() => toggleColumn(column.id)}
                        >
                          <span>{column.label}</span>
                          {visibleColumns.includes(column.id) ? (
                            <Eye size={14} className="text-blue-400" />
                          ) : (
                            <EyeOff size={14} className="text-slate-500" />
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Market Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="p-4 text-left">
                <button
                  className="flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-white"
                  onClick={() => handleSort("symbol")}
                >
                  Symbol
                  {sortField === "symbol" &&
                    (sortDirection === "asc" ? (
                      <SortAsc size={14} />
                    ) : (
                      <SortDesc size={14} />
                    ))}
                </button>
              </th>

              {visibleColumns.includes("price") && (
                <th className="p-4 text-right">
                  <button
                    className="ml-auto flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-white"
                    onClick={() => handleSort("price")}
                  >
                    Price
                    {sortField === "price" &&
                      (sortDirection === "asc" ? (
                        <SortAsc size={14} />
                      ) : (
                        <SortDesc size={14} />
                      ))}
                  </button>
                </th>
              )}

              {visibleColumns.includes("spread") && (
                <th className="p-4 text-right">
                  <button
                    className="ml-auto flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-white"
                    onClick={() => handleSort("spread")}
                  >
                    Spread
                    {sortField === "spread" &&
                      (sortDirection === "asc" ? (
                        <SortAsc size={14} />
                      ) : (
                        <SortDesc size={14} />
                      ))}
                  </button>
                </th>
              )}

              {visibleColumns.includes("change") && (
                <th className="p-4 text-right">
                  <button
                    className="ml-auto flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-white"
                    onClick={() => handleSort("change")}
                  >
                    Change
                    {sortField === "change" &&
                      (sortDirection === "asc" ? (
                        <SortAsc size={14} />
                      ) : (
                        <SortDesc size={14} />
                      ))}
                  </button>
                </th>
              )}

              {visibleColumns.includes("range") && (
                <th className="p-4 text-right">
                  <span className="text-sm font-medium text-slate-400">
                    Range
                  </span>
                </th>
              )}

              {visibleColumns.includes("volume") && (
                <th className="p-4 text-right">
                  <button
                    className="ml-auto flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-white"
                    onClick={() => handleSort("volume")}
                  >
                    Volume
                    {sortField === "volume" &&
                      (sortDirection === "asc" ? (
                        <SortAsc size={14} />
                      ) : (
                        <SortDesc size={14} />
                      ))}
                  </button>
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {sortedPairs.length > 0 ? (
              sortedPairs.map((pair) => (
                <motion.tr
                  key={pair.symbol}
                  className="cursor-pointer border-b border-slate-800/50 hover:bg-slate-800/30"
                  whileHover={{ x: 5 }}
                  onClick={() => setSelectedPair(pair.symbol)}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="text-slate-400 hover:text-yellow-400"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(pair.symbol);
                        }}
                      >
                        <Star
                          size={16}
                          fill={pair.isFavorite ? "currentColor" : "none"}
                        />
                      </button>

                      <div>
                        <div className="font-medium text-white">
                          {pair.symbol}
                        </div>
                        <div className="text-xs text-slate-400">
                          {pair.baseCurrency}/{pair.quoteCurrency}
                        </div>
                      </div>
                    </div>
                  </td>

                  {visibleColumns.includes("price") && (
                    <td className="p-4 text-right">
                      <div className="font-medium text-white">
                        {formatPrice(pair.bid, pair.symbol)}
                      </div>
                      <div className="text-xs text-slate-400">
                        {formatPrice(pair.ask, pair.symbol)}
                      </div>
                    </td>
                  )}

                  {visibleColumns.includes("spread") && (
                    <td className="p-4 text-right">
                      <div className="text-white">
                        {formatSpread(pair.spread)}
                      </div>
                    </td>
                  )}

                  {visibleColumns.includes("change") && (
                    <td className="p-4 text-right">
                      <div
                        className={`flex items-center justify-end gap-1 ${pair.dailyChange >= 0 ? "text-green-400" : "text-red-400"}`}
                      >
                        {pair.dailyChange >= 0 ? (
                          <ArrowUpRight size={14} />
                        ) : (
                          <ArrowDownRight size={14} />
                        )}
                        <span>{formatPercent(pair.dailyChangePercent)}</span>
                      </div>
                    </td>
                  )}

                  {visibleColumns.includes("range") && (
                    <td className="p-4 text-right">
                      <div className="text-xs text-slate-400">
                        <span className="text-white">
                          {formatPrice(pair.low, pair.symbol)}
                        </span>
                        {" - "}
                        <span className="text-white">
                          {formatPrice(pair.high, pair.symbol)}
                        </span>
                      </div>
                    </td>
                  )}

                  {visibleColumns.includes("volume") && (
                    <td className="p-4 text-right">
                      <div className="text-white">
                        {formatVolume(pair.volume)}
                      </div>
                    </td>
                  )}
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-400">
                  No currency pairs found matching your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ForexMarketOverview;
