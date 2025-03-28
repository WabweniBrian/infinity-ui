"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface RangeSliderFilterProps {
  min: number
  max: number
  step?: number
  initialMin?: number
  initialMax?: number
  formatValue?: (value: number) => string
  onChange: (min: number, max: number) => void
  label: string
  icon?: React.ReactNode
  color?: string
  showTicks?: boolean
  tickCount?: number
  showInput?: boolean
  showLabels?: boolean
}

const RangeSliderFilter = ({
  min,
  max,
  step = 1,
  initialMin,
  initialMax,
  formatValue = (value) => value.toString(),
  onChange,
  label,
  icon,
  color = "bg-indigo-600",
  showTicks = true,
  tickCount = 5,
  showInput = true,
  showLabels = true,
}: RangeSliderFilterProps) => {
  const [minValue, setMinValue] = useState(initialMin ?? min)
  const [maxValue, setMaxValue] = useState(initialMax ?? max)
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    onChange(minValue, maxValue)
  }, [minValue, maxValue, onChange])

  const getPercentage = (value: number) => {
    return ((value - min) / (max - min)) * 100
  }

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return

    const rect = trackRef.current.getBoundingClientRect()
    const percentage = (e.clientX - rect.left) / rect.width
    const value = min + percentage * (max - min)
    const roundedValue = Math.round(value / step) * step

    // Determine whether to move min or max thumb based on which is closer
    const minDistance = Math.abs(roundedValue - minValue)
    const maxDistance = Math.abs(roundedValue - maxValue)

    if (minDistance <= maxDistance) {
      setMinValue(Math.min(roundedValue, maxValue - step))
    } else {
      setMaxValue(Math.max(roundedValue, minValue + step))
    }
  }

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (isNaN(value)) return
    setMinValue(Math.min(Math.max(value, min), maxValue - step))
  }

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (isNaN(value)) return
    setMaxValue(Math.max(Math.min(value, max), minValue + step))
  }

  const generateTicks = () => {
    const ticks = []
    const interval = (max - min) / (tickCount - 1)

    for (let i = 0; i < tickCount; i++) {
      const value = min + i * interval
      ticks.push(value)
    }

    return ticks
  }

  const getColorClass = () => {
    switch (color) {
      case "bg-indigo-600":
        return "bg-indigo-600"
      case "bg-blue-600":
        return "bg-blue-600"
      case "bg-green-600":
        return "bg-green-600"
      case "bg-red-600":
        return "bg-red-600"
      case "bg-purple-600":
        return "bg-purple-600"
      case "bg-pink-600":
        return "bg-pink-600"
      default:
        return color
    }
  }

  return (
    <div className="w-full px-2 py-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {icon && <span className="mr-2 text-gray-500">{icon}</span>}
          <h3 className="text-sm font-medium text-gray-700">{label}</h3>
        </div>
        {showInput && (
          <div className="flex items-center space-x-2 text-sm">
            <input
              type="number"
              value={minValue}
              onChange={handleMinInputChange}
              className="w-16 px-2 py-1 text-center border border-gray-300 rounded"
              min={min}
              max={maxValue - step}
              step={step}
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              value={maxValue}
              onChange={handleMaxInputChange}
              className="w-16 px-2 py-1 text-center border border-gray-300 rounded"
              min={minValue + step}
              max={max}
              step={step}
            />
          </div>
        )}
      </div>

      <div className="relative h-12 mt-4">
        {/* Track */}
        <div
          ref={trackRef}
          className="absolute top-1/2 left-0 right-0 h-2 -mt-1 bg-gray-200 rounded-full cursor-pointer"
          onClick={handleTrackClick}
        >
          {/* Selected Range */}
          <div
            className={`absolute h-full rounded-full ${getColorClass()}`}
            style={{
              left: `${getPercentage(minValue)}%`,
              right: `${100 - getPercentage(maxValue)}%`,
            }}
          />
        </div>

        {/* Min Thumb */}
        <motion.div
          className={`absolute top-1/2 -mt-3 w-6 h-6 rounded-full ${getColorClass()} shadow-md cursor-grab flex items-center justify-center`}
          style={{ left: `calc(${getPercentage(minValue)}% - 12px)` }}
          drag="x"
          dragConstraints={trackRef}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={() => setIsDragging("min")}
          onDragEnd={() => setIsDragging(null)}
          onDrag={(_, info) => {
            if (!trackRef.current) return

            const rect = trackRef.current.getBoundingClientRect()
            const percentage = (info.point.x - rect.left) / rect.width
            const value = min + percentage * (max - min)
            const roundedValue = Math.round(value / step) * step

            if (roundedValue >= min && roundedValue < maxValue - step) {
              setMinValue(roundedValue)
            }
          }}
          whileTap={{ scale: 1.1 }}
        >
          <span className="text-white text-xs font-bold">{isDragging === "min" && formatValue(minValue)}</span>
        </motion.div>

        {/* Max Thumb */}
        <motion.div
          className={`absolute top-1/2 -mt-3 w-6 h-6 rounded-full ${getColorClass()} shadow-md cursor-grab flex items-center justify-center`}
          style={{ left: `calc(${getPercentage(maxValue)}% - 12px)` }}
          drag="x"
          dragConstraints={trackRef}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={() => setIsDragging("max")}
          onDragEnd={() => setIsDragging(null)}
          onDrag={(_, info) => {
            if (!trackRef.current) return

            const rect = trackRef.current.getBoundingClientRect()
            const percentage = (info.point.x - rect.left) / rect.width
            const value = min + percentage * (max - min)
            const roundedValue = Math.round(value / step) * step

            if (roundedValue <= max && roundedValue > minValue + step) {
              setMaxValue(roundedValue)
            }
          }}
          whileTap={{ scale: 1.1 }}
        >
          <span className="text-white text-xs font-bold">{isDragging === "max" && formatValue(maxValue)}</span>
        </motion.div>

        {/* Ticks */}
        {showTicks && (
          <div className="absolute top-full left-0 right-0 mt-2">
            <div className="relative h-4">
              {generateTicks().map((tick, index) => (
                <div
                  key={index}
                  className="absolute top-0 -translate-x-1/2 flex flex-col items-center"
                  style={{ left: `${getPercentage(tick)}%` }}
                >
                  <div className="w-1 h-2 bg-gray-300"></div>
                  {showLabels && <span className="mt-1 text-xs text-gray-500">{formatValue(tick)}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RangeSliderFilter

