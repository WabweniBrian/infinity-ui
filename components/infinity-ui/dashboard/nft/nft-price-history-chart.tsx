"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TrendingUp, ChevronDown, BarChart2, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react"

interface PriceDataPoint {
  date: Date
  price: number
  volume?: number
  event?: "sale" | "offer" | "listing" | "mint"
}

interface NFTPriceHistoryChartProps {
  nftName: string
  collectionName: string
  currentPrice: number
  currency: string
  priceHistory: PriceDataPoint[]
  floorPriceHistory?: PriceDataPoint[]
  highestSale?: number
  lowestSale?: number
  averagePrice?: number
}

const NFTPriceHistoryChart = ({
  nftName,
  collectionName,
  currentPrice,
  currency,
  priceHistory,
  floorPriceHistory,
  highestSale,
  lowestSale,
  averagePrice,
}: NFTPriceHistoryChartProps) => {
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d" | "90d" | "all">("30d")
  const [showFloorPrice, setShowFloorPrice] = useState(true)
  const [hoveredPoint, setHoveredPoint] = useState<PriceDataPoint | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const chartRef = useRef<HTMLDivElement>(null)

  // Filter data based on selected time range
  const getFilteredData = (data: PriceDataPoint[]) => {
    const now = new Date()
    const filterDate = new Date()

    switch (timeRange) {
      case "24h":
        filterDate.setDate(now.getDate() - 1)
        break
      case "7d":
        filterDate.setDate(now.getDate() - 7)
        break
      case "30d":
        filterDate.setDate(now.getDate() - 30)
        break
      case "90d":
        filterDate.setDate(now.getDate() - 90)
        break
      case "all":
      default:
        return data
    }

    return data.filter((point) => point.date >= filterDate)
  }

  const filteredPriceHistory = getFilteredData(priceHistory)
  const filteredFloorPriceHistory = floorPriceHistory ? getFilteredData(floorPriceHistory) : []

  // Calculate min and max values for chart scaling
  const allPrices = [
    ...filteredPriceHistory.map((point) => point.price),
    ...(showFloorPrice && filteredFloorPriceHistory ? filteredFloorPriceHistory.map((point) => point.price) : []),
  ]

  const minPrice = Math.min(...allPrices) * 0.9
  const maxPrice = Math.max(...allPrices) * 1.1

  // Calculate price change
  const calculatePriceChange = () => {
    if (filteredPriceHistory.length < 2) return { value: 0, percentage: 0 }

    const oldestPrice = filteredPriceHistory[0].price
    const latestPrice = filteredPriceHistory[filteredPriceHistory.length - 1].price
    const change = latestPrice - oldestPrice
    const percentage = (change / oldestPrice) * 100

    return { value: change, percentage }
  }

  const priceChange = calculatePriceChange()

  // Format date based on time range
  const formatDate = (date: Date) => {
    if (timeRange === "24h") {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (timeRange === "7d") {
      return date.toLocaleDateString([], { weekday: "short", hour: "2-digit", minute: "2-digit" })
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    }
  }

  // Map price to Y coordinate
  const getPriceY = (price: number) => {
    const chartHeight = 200 // Height of the chart area
    const range = maxPrice - minPrice

    if (range === 0) return 0 // Avoid division by zero

    return chartHeight - ((price - minPrice) / range) * chartHeight
  }

  // Generate SVG path for price line
  const generatePricePath = (data: PriceDataPoint[]) => {
    if (data.length === 0) return ""

    const chartWidth = 100 // Percentage width
    const step = chartWidth / (data.length - 1)

    return data
      .map((point, index) => {
        const x = index * step
        const y = getPriceY(point.price)
        return `${index === 0 ? "M" : "L"} ${x} ${y}`
      })
      .join(" ")
  }

  // Handle mouse move on chart
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!chartRef.current || filteredPriceHistory.length === 0) return

    const chartRect = chartRef.current.getBoundingClientRect()
    const mouseX = e.clientX - chartRect.left
    const chartWidth = chartRect.width

    // Calculate which data point is closest to mouse position
    const step = chartWidth / (filteredPriceHistory.length - 1)
    const index = Math.min(Math.round(mouseX / step), filteredPriceHistory.length - 1)

    setHoveredPoint(filteredPriceHistory[index])
  }

  // Handle mouse leave
  const handleMouseLeave = () => {
    setHoveredPoint(null)
  }

  return (
    <div className="w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-blue-400" size={20} />
          <h2 className="text-xl font-bold text-white">Price History</h2>
        </div>

        <motion.button
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <ChevronDown
            size={18}
            style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
          />
        </motion.button>
      </div>

      {/* Price Overview */}
      <div className="p-4 border-b border-slate-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="text-sm text-slate-400 mb-1">{collectionName}</div>
            <h3 className="text-lg font-bold text-white mb-1">{nftName}</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-white">{currentPrice}</span>
              <span className="text-blue-400">{currency}</span>

              {priceChange.value !== 0 && (
                <div
                  className={`ml-2 flex items-center text-sm ${priceChange.value > 0 ? "text-green-400" : "text-red-400"}`}
                >
                  {priceChange.value > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  <span>{Math.abs(priceChange.percentage).toFixed(2)}%</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            {["24h", "7d", "30d", "90d", "all"].map((range) => (
              <motion.button
                key={range}
                className={`px-3 py-1 rounded-lg text-sm ${
                  timeRange === range ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTimeRange(range as any)}
              >
                {range}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="p-4 relative" style={{ height: isExpanded ? "400px" : "250px" }}>
        {/* Chart Controls */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showFloorPrice}
                onChange={() => setShowFloorPrice(!showFloorPrice)}
                className="rounded text-blue-500 focus:ring-blue-500 h-4 w-4 bg-slate-800 border-slate-700"
              />
              <span className="text-slate-300">Show Floor Price</span>
            </label>
          </div>

          {hoveredPoint && (
            <div className="text-sm text-slate-300">
              {formatDate(hoveredPoint.date)}:{" "}
              <span className="font-medium text-white">
                {hoveredPoint.price} {currency}
              </span>
            </div>
          )}
        </div>

        {/* Chart Area */}
        <div
          ref={chartRef}
          className="relative h-[200px] w-full"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-slate-400 pointer-events-none">
            <div>{maxPrice.toFixed(2)}</div>
            <div>{((maxPrice + minPrice) / 2).toFixed(2)}</div>
            <div>{minPrice.toFixed(2)}</div>
          </div>

          {/* Chart SVG */}
          <div className="absolute left-8 right-0 top-0 h-full">
            <svg width="100%" height="100%" viewBox="0 0 100 200" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="0" x2="100" y2="0" stroke="#334155" strokeWidth="0.5" />
              <line x1="0" y1="100" x2="100" y2="100" stroke="#334155" strokeWidth="0.5" />
              <line x1="0" y1="200" x2="100" y2="200" stroke="#334155" strokeWidth="0.5" />

              {/* Floor price line */}
              {showFloorPrice && filteredFloorPriceHistory.length > 1 && (
                <path
                  d={generatePricePath(filteredFloorPriceHistory)}
                  fill="none"
                  stroke="#64748b"
                  strokeWidth="1.5"
                  strokeDasharray="3,3"
                />
              )}

              {/* Price line */}
              {filteredPriceHistory.length > 1 && (
                <>
                  <defs>
                    <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Area under the line */}
                  <path
                    d={`${generatePricePath(filteredPriceHistory)} L 100 200 L 0 200 Z`}
                    fill="url(#priceGradient)"
                  />

                  {/* Line */}
                  <path d={generatePricePath(filteredPriceHistory)} fill="none" stroke="#3b82f6" strokeWidth="2" />
                </>
              )}

              {/* Data points */}
              {filteredPriceHistory.map((point, index) => {
                const x = (index / (filteredPriceHistory.length - 1)) * 100
                const y = getPriceY(point.price)

                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r={hoveredPoint === point ? 4 : 0}
                    fill={point.event === "sale" ? "#10b981" : point.event === "offer" ? "#8b5cf6" : "#3b82f6"}
                    stroke="#1e293b"
                    strokeWidth="1"
                  />
                )
              })}

              {/* Hover indicator */}
              {hoveredPoint && (
                <>
                  {/* Vertical line */}
                  <line
                    x1={(filteredPriceHistory.indexOf(hoveredPoint) / (filteredPriceHistory.length - 1)) * 100}
                    y1="0"
                    x2={(filteredPriceHistory.indexOf(hoveredPoint) / (filteredPriceHistory.length - 1)) * 100}
                    y2="200"
                    stroke="#64748b"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                  />

                  {/* Horizontal line */}
                  <line
                    x1="0"
                    y1={getPriceY(hoveredPoint.price)}
                    x2="100"
                    y2={getPriceY(hoveredPoint.price)}
                    stroke="#64748b"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                  />
                </>
              )}
            </svg>
          </div>

          {/* X-axis labels */}
          <div className="absolute left-8 right-0 bottom-[-20px] flex justify-between text-xs text-slate-400 pointer-events-none">
            {filteredPriceHistory.length > 0 && (
              <>
                <div>{formatDate(filteredPriceHistory[0].date)}</div>
                {filteredPriceHistory.length > 2 && (
                  <div>{formatDate(filteredPriceHistory[Math.floor(filteredPriceHistory.length / 2)].date)}</div>
                )}
                <div>{formatDate(filteredPriceHistory[filteredPriceHistory.length - 1].date)}</div>
              </>
            )}
          </div>

          {/* Hover tooltip */}
          <AnimatePresence>
            {hoveredPoint && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bg-slate-800 border border-slate-700 rounded-lg p-2 shadow-lg z-10 pointer-events-none"
                style={{
                  left: `${(filteredPriceHistory.indexOf(hoveredPoint) / (filteredPriceHistory.length - 1)) * 100}%`,
                  top: getPriceY(hoveredPoint.price) - 60,
                  transform: "translateX(-50%)",
                }}
              >
                <div className="text-xs text-slate-300 mb-1">{formatDate(hoveredPoint.date)}</div>
                <div className="font-medium text-white">
                  {hoveredPoint.price} {currency}
                </div>
                {hoveredPoint.event && (
                  <div
                    className={`text-xs mt-1 ${
                      hoveredPoint.event === "sale"
                        ? "text-green-400"
                        : hoveredPoint.event === "offer"
                          ? "text-purple-400"
                          : hoveredPoint.event === "listing"
                            ? "text-blue-400"
                            : "text-orange-400"
                    }`}
                  >
                    {hoveredPoint.event.charAt(0).toUpperCase() + hoveredPoint.event.slice(1)}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stats */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <div className="bg-slate-800/50 rounded-xl p-3">
                <div className="flex items-center gap-1 text-slate-400 mb-1">
                  <ArrowUpRight size={14} />
                  <span className="text-xs">Highest Sale</span>
                </div>
                <div className="text-lg font-bold text-white">
                  {highestSale || "-"} {currency}
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-3">
                <div className="flex items-center gap-1 text-slate-400 mb-1">
                  <ArrowDownRight size={14} />
                  <span className="text-xs">Lowest Sale</span>
                </div>
                <div className="text-lg font-bold text-white">
                  {lowestSale || "-"} {currency}
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-3">
                <div className="flex items-center gap-1 text-slate-400 mb-1">
                  <BarChart2 size={14} />
                  <span className="text-xs">Average Price</span>
                </div>
                <div className="text-lg font-bold text-white">
                  {averagePrice || "-"} {currency}
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-3">
                <div className="flex items-center gap-1 text-slate-400 mb-1">
                  <Clock size={14} />
                  <span className="text-xs">Last Sale</span>
                </div>
                <div className="text-lg font-bold text-white">
                  {filteredPriceHistory.length > 0
                    ? `${filteredPriceHistory[filteredPriceHistory.length - 1].price} ${currency}`
                    : "-"}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default NFTPriceHistoryChart

