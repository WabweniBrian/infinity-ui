"use client";

import type React from "react";

import { pairs } from "@/data/forex-market-overview";
import {
  candleData,
  indicators,
  PriceCandle,
  TechnicalIndicator,
} from "@/data/forex-price-chart";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  CandlestickChart,
  Download,
  Eye,
  EyeOff,
  LineChart,
  Maximize2,
  RefreshCw,
  Settings,
  TrendingUp,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ForexPriceChart = () => {
  const [selectedPair, setSelectedPair] = useState("EUR/USD");
  const currentPair =
    pairs.find((pair) => pair.symbol === selectedPair) || pairs[0];

  const timeframe = "1h";

  const symbol = currentPair.symbol;
  const baseCurrency = currentPair.baseCurrency;
  const quoteCurrency = currentPair.quoteCurrency;

  const [chartType, setChartType] = useState<"candles" | "line" | "area">(
    "candles",
  );
  const [visibleIndicators, setVisibleIndicators] = useState<string[]>(
    indicators.filter((i) => i.visible).map((i) => i.id),
  );
  const [showSettings, setShowSettings] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [priceFormat, setPriceFormat] = useState<"default" | "pips">("default");
  const [hoveredCandle, setHoveredCandle] = useState<PriceCandle | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const chartRef = useRef<HTMLDivElement>(null);

  // Calculate price stats
  const currentPrice =
    candleData.length > 0 ? candleData[candleData.length - 1].close : 0;
  const previousClose =
    candleData.length > 1 ? candleData[candleData.length - 2].close : 0;
  const priceChange = currentPrice - previousClose;
  const priceChangePercent =
    previousClose !== 0 ? (priceChange / previousClose) * 100 : 0;

  // Calculate min and max values for chart scaling
  const allPrices = candleData.flatMap((candle) => [candle.high, candle.low]);
  const minPrice = Math.min(...allPrices) * 0.9995;
  const maxPrice = Math.max(...allPrices) * 1.0005;

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (chartRef.current?.requestFullscreen) {
        chartRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Handle refresh
  const handleRefresh = () => {
    setIsLoading(true);
    console.log("Refreshing data...");

    // Simulate refresh delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Toggle indicator visibility
  const toggleIndicator = (id: string) => {
    setVisibleIndicators((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  // Format price based on selected format
  const formatPrice = (price: number) => {
    if (priceFormat === "pips") {
      // Convert to pips (assumes 4 decimal places for most forex pairs)
      return (price * 10000).toFixed(1);
    }

    // Default formatting with appropriate decimal places
    const decimalPlaces = symbol.includes("JPY") ? 3 : 5;
    return price.toFixed(decimalPlaces);
  };

  // Format timestamp based on timeframe
  const formatTimestamp = (timestamp: Date) => {
    if (["1m", "5m", "15m"].includes(timeframe)) {
      return timestamp.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (["1h", "4h"].includes(timeframe)) {
      return `${timestamp.toLocaleDateString([], { month: "short", day: "numeric" })} ${timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    } else {
      return timestamp.toLocaleDateString([], {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  // Map price to Y coordinate
  const getPriceY = (price: number) => {
    const chartHeight = 300; // Height of the chart area
    const range = maxPrice - minPrice;

    if (range === 0) return 0; // Avoid division by zero

    return chartHeight - ((price - minPrice) / range) * chartHeight;
  };

  // Handle mouse move on chart
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!chartRef.current || candleData.length === 0) return;

    const chartRect = chartRef.current.getBoundingClientRect();
    const mouseX = e.clientX - chartRect.left;
    const chartWidth = chartRect.width;

    // Calculate which candle is closest to mouse position
    const candleWidth = chartWidth / candleData.length;
    const index = Math.min(
      Math.floor(mouseX / candleWidth),
      candleData.length - 1,
    );

    setHoveredCandle(candleData[index]);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setHoveredCandle(null);
  };

  // Generate SVG path for line chart
  const generateLinePath = () => {
    if (candleData.length === 0) return "";

    const chartWidth = 100; // Percentage width
    const step = chartWidth / (candleData.length - 1);

    return candleData
      .map((candle, index) => {
        const x = index * step;
        const y = getPriceY(candle.close);
        return `${index === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  };

  // Generate SVG path for area chart
  const generateAreaPath = () => {
    if (candleData.length === 0) return "";

    const chartWidth = 100; // Percentage width
    const step = chartWidth / (candleData.length - 1);
    const linePath = candleData
      .map((candle, index) => {
        const x = index * step;
        const y = getPriceY(candle.close);
        return `${index === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");

    // Add points to close the path at the bottom
    return `${linePath} L ${chartWidth} ${300} L 0 ${300} Z`;
  };

  // Generate indicator path
  const generateIndicatorPath = (indicator: TechnicalIndicator) => {
    if (indicator.values.length === 0) return "";

    const chartWidth = 100; // Percentage width
    const step = chartWidth / (indicator.values.length - 1);

    return indicator.values
      .map((point, index) => {
        const x = index * step;
        const y = getPriceY(point.value);
        return `${index === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  };

  // Available timeframes
  const timeframes = ["1m", "5m", "15m", "1h", "4h", "1d", "1w"];

  return (
    <div
      ref={chartRef}
      className="w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 p-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-blue-400" size={20} />
          <div>
            <h2 className="text-xl font-bold text-white">{symbol}</h2>
            <div className="text-sm text-slate-400">
              {baseCurrency}/{quoteCurrency}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1 ${priceChange >= 0 ? "text-green-400" : "text-red-400"}`}
          >
            {priceChange >= 0 ? (
              <ArrowUpRight size={16} />
            ) : (
              <ArrowDownRight size={16} />
            )}
            <span className="font-medium">
              {Math.abs(priceChangePercent).toFixed(2)}%
            </span>
          </div>

          <motion.button
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings size={18} />
          </motion.button>
        </div>
      </div>

      {/* Chart Controls */}
      <div className="border-b border-slate-800 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {/* Chart Type Selector */}
            <div className="flex rounded-lg bg-slate-800 p-1">
              <button
                className={`rounded-md p-1.5 ${chartType === "candles" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
                onClick={() => setChartType("candles")}
              >
                <CandlestickChart size={16} />
              </button>
              <button
                className={`rounded-md p-1.5 ${chartType === "line" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
                onClick={() => setChartType("line")}
              >
                <LineChart size={16} />
              </button>
              <button
                className={`rounded-md p-1.5 ${chartType === "area" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
                onClick={() => setChartType("area")}
              >
                <Activity size={16} />
              </button>
            </div>

            {/* Timeframe Selector */}
            <div className="hide-scrollbar flex overflow-x-auto">
              {timeframes.map((tf) => (
                <button
                  key={tf}
                  className={`whitespace-nowrap px-3 py-1 text-sm ${
                    timeframe === tf
                      ? "rounded-lg bg-blue-600 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                  onClick={() => console.log(`Changing timeframe to ${tf}`)}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <button
              className="rounded-md bg-slate-800 p-1.5 text-slate-400 hover:text-white"
              onClick={() => setZoomLevel(Math.min(zoomLevel + 0.25, 3))}
            >
              <ZoomIn size={16} />
            </button>
            <button
              className="rounded-md bg-slate-800 p-1.5 text-slate-400 hover:text-white"
              onClick={() => setZoomLevel(Math.max(zoomLevel - 0.25, 0.5))}
            >
              <ZoomOut size={16} />
            </button>

            {/* Other Controls */}
            <button
              className="rounded-md bg-slate-800 p-1.5 text-slate-400 hover:text-white"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw
                size={16}
                className={isLoading ? "animate-spin" : ""}
              />
            </button>
            <button
              className="rounded-md bg-slate-800 p-1.5 text-slate-400 hover:text-white"
              onClick={toggleFullscreen}
            >
              <Maximize2 size={16} />
            </button>
            <button className="rounded-md bg-slate-800 p-1.5 text-slate-400 hover:text-white">
              <Download size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-b border-slate-800"
          >
            <div className="p-4">
              <h3 className="mb-3 text-sm font-medium text-white">
                Chart Settings
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Price Format */}
                <div>
                  <label className="mb-2 block text-xs text-slate-400">
                    Price Format
                  </label>
                  <div className="flex rounded-lg bg-slate-800 p-1">
                    <button
                      className={`flex-1 rounded-md py-1 text-sm ${priceFormat === "default" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
                      onClick={() => setPriceFormat("default")}
                    >
                      Default
                    </button>
                    <button
                      className={`flex-1 rounded-md py-1 text-sm ${priceFormat === "pips" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
                      onClick={() => setPriceFormat("pips")}
                    >
                      Pips
                    </button>
                  </div>
                </div>

                {/* Indicators */}
                <div>
                  <label className="mb-2 block text-xs text-slate-400">
                    Indicators
                  </label>
                  <div className="space-y-2">
                    {indicators.map((indicator) => (
                      <div
                        key={indicator.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: indicator.color }}
                          />
                          <span className="text-sm text-slate-300">
                            {indicator.name}
                          </span>
                        </div>
                        <button
                          className="rounded-md p-1 text-slate-400 hover:text-white"
                          onClick={() => toggleIndicator(indicator.id)}
                        >
                          {visibleIndicators.includes(indicator.id) ? (
                            <Eye size={16} />
                          ) : (
                            <EyeOff size={16} />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Price Display */}
      <div className="flex items-center justify-between p-4">
        <div>
          <div className="mb-1 text-xs text-slate-400">Current Price</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">
              {formatPrice(currentPrice)}
            </span>
            <span
              className={`text-sm ${priceChange >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {priceChange >= 0 ? "+" : ""}
              {formatPrice(priceChange)} ({priceChangePercent >= 0 ? "+" : ""}
              {priceChangePercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        {hoveredCandle && (
          <div className="text-right">
            <div className="mb-1 text-xs text-slate-400">
              {formatTimestamp(hoveredCandle.timestamp)}
            </div>
            <div className="text-sm text-white">
              O:{" "}
              <span className="font-medium">
                {formatPrice(hoveredCandle.open)}
              </span>{" "}
              H:{" "}
              <span className="font-medium">
                {formatPrice(hoveredCandle.high)}
              </span>{" "}
              L:{" "}
              <span className="font-medium">
                {formatPrice(hoveredCandle.low)}
              </span>{" "}
              C:{" "}
              <span className="font-medium">
                {formatPrice(hoveredCandle.close)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Chart */}
      <div
        className="relative px-4 pb-4"
        style={{ height: isFullscreen ? "calc(100vh - 200px)" : "400px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Y-axis labels */}
        <div className="pointer-events-none absolute left-4 top-0 flex h-[300px] flex-col justify-between text-xs text-slate-400">
          <div>{formatPrice(maxPrice)}</div>
          <div>{formatPrice((maxPrice + minPrice) / 2)}</div>
          <div>{formatPrice(minPrice)}</div>
        </div>

        {/* Chart SVG */}
        <div className="absolute left-16 right-4 top-0 h-[300px]">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 300"
            preserveAspectRatio="none"
          >
            {/* Grid lines */}
            <line
              x1="0"
              y1="0"
              x2="100"
              y2="0"
              stroke="#334155"
              strokeWidth="0.5"
            />
            <line
              x1="0"
              y1="150"
              x2="100"
              y2="150"
              stroke="#334155"
              strokeWidth="0.5"
            />
            <line
              x1="0"
              y1="300"
              x2="100"
              y2="300"
              stroke="#334155"
              strokeWidth="0.5"
            />

            {/* Area Chart */}
            {chartType === "area" && candleData.length > 1 && (
              <>
                <defs>
                  <linearGradient
                    id="areaGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <path d={generateAreaPath()} fill="url(#areaGradient)" />

                <path
                  d={generateLinePath()}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                />
              </>
            )}

            {/* Line Chart */}
            {chartType === "line" && candleData.length > 1 && (
              <path
                d={generateLinePath()}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="1.5"
              />
            )}

            {/* Candle Chart */}
            {chartType === "candles" &&
              candleData.map((candle, index) => {
                const candleWidth = 100 / candleData.length;
                const x = index * candleWidth;
                const candleWidthAdjusted = candleWidth * 0.8;
                const xAdjusted = x + candleWidth * 0.1;

                const openY = getPriceY(candle.open);
                const closeY = getPriceY(candle.close);
                const highY = getPriceY(candle.high);
                const lowY = getPriceY(candle.low);

                const isGreen = candle.close >= candle.open;

                return (
                  <g key={index}>
                    {/* Wick */}
                    <line
                      x1={xAdjusted + candleWidthAdjusted / 2}
                      y1={highY}
                      x2={xAdjusted + candleWidthAdjusted / 2}
                      y2={lowY}
                      stroke={isGreen ? "#10b981" : "#ef4444"}
                      strokeWidth="1"
                    />

                    {/* Body */}
                    <rect
                      x={xAdjusted}
                      y={isGreen ? closeY : openY}
                      width={candleWidthAdjusted}
                      height={Math.max(1, Math.abs(closeY - openY))}
                      fill={isGreen ? "#10b981" : "#ef4444"}
                    />
                  </g>
                );
              })}

            {/* Technical Indicators */}
            {indicators
              .filter((indicator) => visibleIndicators.includes(indicator.id))
              .map((indicator) => (
                <path
                  key={indicator.id}
                  d={generateIndicatorPath(indicator)}
                  fill="none"
                  stroke={indicator.color}
                  strokeWidth="1.5"
                  strokeDasharray={indicator.id.includes("MA") ? "none" : "3,3"}
                />
              ))}

            {/* Hover indicator */}
            {hoveredCandle && (
              <>
                {/* Vertical line */}
                <line
                  x1={
                    (candleData.indexOf(hoveredCandle) /
                      (candleData.length - 1)) *
                    100
                  }
                  y1="0"
                  x2={
                    (candleData.indexOf(hoveredCandle) /
                      (candleData.length - 1)) *
                    100
                  }
                  y2="300"
                  stroke="#64748b"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />

                {/* Horizontal line */}
                <line
                  x1="0"
                  y1={getPriceY(hoveredCandle.close)}
                  x2="100"
                  y2={getPriceY(hoveredCandle.close)}
                  stroke="#64748b"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
              </>
            )}
          </svg>
        </div>

        {/* X-axis labels */}
        <div className="pointer-events-none absolute left-16 right-4 top-[300px] flex justify-between text-xs text-slate-400">
          {candleData.length > 0 && (
            <>
              <div>{formatTimestamp(candleData[0].timestamp)}</div>
              {candleData.length > 2 && (
                <div>
                  {formatTimestamp(
                    candleData[Math.floor(candleData.length / 2)].timestamp,
                  )}
                </div>
              )}
              <div>
                {formatTimestamp(candleData[candleData.length - 1].timestamp)}
              </div>
            </>
          )}
        </div>
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

export default ForexPriceChart;
