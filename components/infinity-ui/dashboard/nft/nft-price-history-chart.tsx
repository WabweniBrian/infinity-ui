"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  ArrowUpRight,
  ArrowDownRight,
  BarChart2,
  Clock,
  TrendingUp,
  ChevronDown,
} from "lucide-react";

interface PriceDataPoint {
  date: Date;
  price: number;
  volume?: number;
  event?: "sale" | "offer" | "listing" | "mint";
}

interface NFTPriceHistoryChartProps {
  nftName: string;
  collectionName: string;
  currentPrice: number;
  currency: string;
  priceHistory: PriceDataPoint[];
  floorPriceHistory?: PriceDataPoint[];
  highestSale?: number;
  lowestSale?: number;
  averagePrice?: number;
}

const NFTPriceHistoryChart = ({
  nftName,
  collectionName,
  currentPrice,
  currency,
  priceHistory,
  floorPriceHistory = [],
  highestSale,
  lowestSale,
  averagePrice,
}: NFTPriceHistoryChartProps) => {
  const [timeRange, setTimeRange] = useState<
    "24h" | "7d" | "30d" | "90d" | "all"
  >("30d");
  const [showFloorPrice, setShowFloorPrice] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // Format data for Recharts - simplified for debugging
  const formatChartData = () => {
    // Convert date objects to strings for Recharts
    return priceHistory.map((point) => ({
      name: point.date.toLocaleDateString(),
      price: point.price,
      floorPrice: showFloorPrice
        ? floorPriceHistory.find(
            (fp) => fp.date.getTime() === point.date.getTime(),
          )?.price
        : undefined,
      event: point.event,
    }));
  };

  const chartData = formatChartData();

  // Calculate price change
  const calculatePriceChange = () => {
    if (priceHistory.length < 2) return { value: 0, percentage: 0 };

    const oldestPrice = priceHistory[0].price;
    const latestPrice = priceHistory[priceHistory.length - 1].price;
    const change = latestPrice - oldestPrice;
    const percentage = (change / oldestPrice) * 100;

    return { value: change, percentage };
  };

  const priceChange = calculatePriceChange();

  // Custom tooltip component for Recharts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-slate-700 bg-slate-800 p-2 shadow-lg">
          <p className="mb-1 text-xs text-slate-300">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`tooltip-${index}`} className="font-medium text-white">
              {entry.name}: {entry.value} {currency}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 p-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-blue-400" size={20} />
          <h2 className="text-xl font-bold text-white">Price History</h2>
        </div>

        <button
          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <ChevronDown
            size={18}
            style={{
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          />
        </button>
      </div>

      {/* Price Overview */}
      <div className="border-b border-slate-800 p-4">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-1 text-sm text-slate-400">{collectionName}</div>
            <h3 className="mb-1 text-lg font-bold text-white">{nftName}</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-white">
                {currentPrice}
              </span>
              <span className="text-blue-400">{currency}</span>

              {priceChange.value !== 0 && (
                <div
                  className={`ml-2 flex items-center text-sm ${priceChange.value > 0 ? "text-green-400" : "text-red-400"}`}
                >
                  {priceChange.value > 0 ? (
                    <ArrowUpRight size={14} />
                  ) : (
                    <ArrowDownRight size={14} />
                  )}
                  <span>{Math.abs(priceChange.percentage).toFixed(2)}%</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            {["24h", "7d", "30d", "90d", "all"].map((range) => (
              <button
                key={range}
                className={`rounded-lg px-3 py-1 text-sm ${
                  timeRange === range
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
                onClick={() => setTimeRange(range as any)}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="p-4">
        {/* Chart Controls */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showFloorPrice}
                onChange={() => setShowFloorPrice(!showFloorPrice)}
                className="form-checkbox h-4 w-4 rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-slate-300">Show Floor Price</span>
            </label>
          </div>
        </div>

        {/* Chart Area - Simplified for debugging */}
        <div
          style={{ width: "100%", height: "300px" }}
          className="rounded-lg bg-slate-800/30"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis
                stroke="#94a3b8"
                tickFormatter={(value) => `${value} ${currency}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                fill="#3b82f680"
                strokeWidth={2}
              />
              {showFloorPrice && (
                <Line
                  type="monotone"
                  dataKey="floorPrice"
                  stroke="#64748b"
                  strokeWidth={1.5}
                  strokeDasharray="3 3"
                  dot={false}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stats */}
        {isExpanded && (
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-xl bg-slate-800/50 p-3">
              <div className="mb-1 flex items-center gap-1 text-slate-400">
                <ArrowUpRight size={14} />
                <span className="text-xs">Highest Sale</span>
              </div>
              <div className="text-lg font-bold text-white">
                {highestSale || "-"} {currency}
              </div>
            </div>

            <div className="rounded-xl bg-slate-800/50 p-3">
              <div className="mb-1 flex items-center gap-1 text-slate-400">
                <ArrowDownRight size={14} />
                <span className="text-xs">Lowest Sale</span>
              </div>
              <div className="text-lg font-bold text-white">
                {lowestSale || "-"} {currency}
              </div>
            </div>

            <div className="rounded-xl bg-slate-800/50 p-3">
              <div className="mb-1 flex items-center gap-1 text-slate-400">
                <BarChart2 size={14} />
                <span className="text-xs">Average Price</span>
              </div>
              <div className="text-lg font-bold text-white">
                {averagePrice || "-"} {currency}
              </div>
            </div>

            <div className="rounded-xl bg-slate-800/50 p-3">
              <div className="mb-1 flex items-center gap-1 text-slate-400">
                <Clock size={14} />
                <span className="text-xs">Last Sale</span>
              </div>
              <div className="text-lg font-bold text-white">
                {priceHistory.length > 0
                  ? `${priceHistory[priceHistory.length - 1].price} ${currency}`
                  : "-"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTPriceHistoryChart;
