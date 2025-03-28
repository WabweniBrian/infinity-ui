"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react"

interface TimeRange {
  id: string
  label: string
  start: Date
  end: Date
}

interface TimelineFilterProps {
  ranges: TimeRange[]
  onChange: (selectedRanges: string[]) => void
  initialSelected?: string[]
  title?: string
  subtitle?: string
  allowMultiple?: boolean
  showLabels?: boolean
  orientation?: "horizontal" | "vertical"
  showTimeMarkers?: boolean
  rangeColors?: Record<string, string>
}

const TimelineFilter = ({
  ranges,
  onChange,
  initialSelected = [],
  title = "Timeline Filter",
  subtitle,
  allowMultiple = true,
  showLabels = true,
  orientation = "horizontal",
  showTimeMarkers = true,
  rangeColors,
}: TimelineFilterProps) => {
  const [selectedRanges, setSelectedRanges] = useState<string[]>(initialSelected)
  const [visibleTimeframe, setVisibleTimeframe] = useState<{ start: Date; end: Date }>(() => {
    // Find min and max dates from all ranges
    const allDates = ranges.flatMap((range) => [range.start, range.end])
    const minDate = new Date(Math.min(...allDates.map((d) => d.getTime())))
    const maxDate = new Date(Math.max(...allDates.map((d) => d.getTime())))

    // Add some padding
    minDate.setMonth(minDate.getMonth() - 1)
    maxDate.setMonth(maxDate.getMonth() + 1)

    return { start: minDate, end: maxDate }
  })

  const timelineRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startDragX, setStartDragX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  useEffect(() => {
    onChange(selectedRanges)
  }, [selectedRanges, onChange])

  const toggleRange = (rangeId: string) => {
    setSelectedRanges((prev) => {
      const isSelected = prev.includes(rangeId)

      if (isSelected) {
        return prev.filter((id) => id !== rangeId)
      } else {
        return allowMultiple ? [...prev, rangeId] : [rangeId]
      }
    })
  }

  const clearSelection = () => {
    setSelectedRanges([])
  }

  const zoomIn = () => {
    setVisibleTimeframe((prev) => {
      const timespan = prev.end.getTime() - prev.start.getTime()
      const newTimespan = timespan * 0.8
      const midpoint = (prev.end.getTime() + prev.start.getTime()) / 2

      return {
        start: new Date(midpoint - newTimespan / 2),
        end: new Date(midpoint + newTimespan / 2),
      }
    })
  }

  const zoomOut = () => {
    setVisibleTimeframe((prev) => {
      const timespan = prev.end.getTime() - prev.start.getTime()
      const newTimespan = timespan * 1.25
      const midpoint = (prev.end.getTime() + prev.start.getTime()) / 2

      return {
        start: new Date(midpoint - newTimespan / 2),
        end: new Date(midpoint + newTimespan / 2),
      }
    })
  }

  const panLeft = () => {
    setVisibleTimeframe((prev) => {
      const timespan = prev.end.getTime() - prev.start.getTime()
      const panAmount = timespan * 0.2

      return {
        start: new Date(prev.start.getTime() - panAmount),
        end: new Date(prev.end.getTime() - panAmount),
      }
    })
  }

  const panRight = () => {
    setVisibleTimeframe((prev) => {
      const timespan = prev.end.getTime() - prev.start.getTime()
      const panAmount = timespan * 0.2

      return {
        start: new Date(prev.start.getTime() + panAmount),
        end: new Date(prev.end.getTime() + panAmount),
      }
    })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartDragX(e.pageX - (timelineRef.current?.offsetLeft || 0))
    setScrollLeft(timelineRef.current?.scrollLeft || 0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()

    const x = e.pageX - (timelineRef.current?.offsetLeft || 0)
    const walk = (x - startDragX) * 2
    if (timelineRef.current) {
      timelineRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const getPositionForDate = (date: Date) => {
    const totalTimespan = visibleTimeframe.end.getTime() - visibleTimeframe.start.getTime()
    const datePosition = date.getTime() - visibleTimeframe.start.getTime()
    return (datePosition / totalTimespan) * 100
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const generateTimeMarkers = () => {
    const totalTimespan = visibleTimeframe.end.getTime() - visibleTimeframe.start.getTime()
    const markers = []
    const markerCount = 6 // Number of markers to show

    for (let i = 0; i <= markerCount; i++) {
      const position = i / markerCount
      const date = new Date(visibleTimeframe.start.getTime() + position * totalTimespan)
      markers.push({
        date,
        position: position * 100,
      })
    }

    return markers
  }

  const getRangeColor = (rangeId: string, isSelected: boolean) => {
    if (isSelected) {
      return rangeColors?.[rangeId] || "bg-indigo-600"
    }
    return "bg-gray-200 hover:bg-gray-300"
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={zoomOut} className="p-1 rounded-full hover:bg-gray-100" aria-label="Zoom out">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <button onClick={zoomIn} className="p-1 rounded-full hover:bg-gray-100" aria-label="Zoom in">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <button onClick={panLeft} className="p-1 rounded-full hover:bg-gray-100" aria-label="Pan left">
              <ChevronLeft size={20} />
            </button>
            <button onClick={panRight} className="p-1 rounded-full hover:bg-gray-100" aria-label="Pan right">
              <ChevronRight size={20} />
            </button>
            {selectedRanges.length > 0 && (
              <button
                onClick={clearSelection}
                className="text-xs text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <div
        className="p-4 overflow-x-auto"
        ref={timelineRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <div className={`relative ${orientation === "horizontal" ? "h-40" : "h-96"}`}>
          {/* Time markers */}
          {showTimeMarkers && (
            <div className="absolute top-0 left-0 right-0 h-6">
              {generateTimeMarkers().map((marker, index) => (
                <div
                  key={index}
                  className="absolute top-0 flex flex-col items-center"
                  style={{
                    left: `${marker.position}%`,
                    transform: "translateX(-50%)",
                  }}
                >
                  <div className="h-3 w-0.5 bg-gray-300"></div>
                  <div className="text-xs text-gray-500 mt-1">{formatDate(marker.date)}</div>
                </div>
              ))}
            </div>
          )}

          {/* Timeline */}
          <div
            className={`absolute ${
              orientation === "horizontal" ? "left-0 right-0 top-10 h-0.5" : "top-0 bottom-0 left-1/2 w-0.5"
            } bg-gray-300`}
          ></div>

          {/* Ranges */}
          {ranges.map((range) => {
            const startPosition = getPositionForDate(range.start)
            const endPosition = getPositionForDate(range.end)
            const isSelected = selectedRanges.includes(range.id)

            return (
              <motion.div
                key={range.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleRange(range.id)}
                className={`absolute cursor-pointer rounded-lg ${
                  orientation === "horizontal" ? "h-16" : "w-16"
                } ${getRangeColor(range.id, isSelected)} transition-colors`}
                style={
                  orientation === "horizontal"
                    ? {
                        left: `${startPosition}%`,
                        width: `${Math.max(endPosition - startPosition, 1)}%`,
                        top: "12px",
                      }
                    : {
                        top: `${startPosition}%`,
                        height: `${Math.max(endPosition - startPosition, 1)}%`,
                        left: "calc(50% - 8px)",
                      }
                }
              >
                {showLabels && (
                  <div
                    className={`absolute ${
                      orientation === "horizontal"
                        ? "top-1/2 left-2 transform -translate-y-1/2"
                        : "left-full ml-2 top-1/2 transform -translate-y-1/2"
                    } text-xs font-medium ${isSelected ? "text-white" : "text-gray-700"}`}
                  >
                    {range.label}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Selected ranges */}
      {selectedRanges.length > 0 && (
        <div className="p-3 border-t border-gray-200 bg-gray-50">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Time Periods:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedRanges.map((rangeId) => {
              const range = ranges.find((r) => r.id === rangeId)
              if (!range) return null

              return (
                <div
                  key={range.id}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
                >
                  <Calendar size={14} className="mr-1" />
                  {range.label}
                  <span className="mx-1 text-gray-400">•</span>
                  <Clock size={14} className="mr-1" />
                  {formatDate(range.start)} - {formatDate(range.end)}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default TimelineFilter

