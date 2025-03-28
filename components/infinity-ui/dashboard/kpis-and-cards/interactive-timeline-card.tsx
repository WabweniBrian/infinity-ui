"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Filter } from "lucide-react"
import { DashboardCard, CardTitle } from "./utils"

type TimelineEvent = {
  id: string
  title: string
  description: string
  date: Date
  category: string
  icon?: React.ReactNode
  color: string
}

type InteractiveTimelineCardProps = {
  title: string
  subtitle?: string
  events: TimelineEvent[]
  categories: string[]
}

export default function InteractiveTimelineCard({ title, subtitle, events, categories }: InteractiveTimelineCardProps) {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const timelineRef = useRef<HTMLDivElement>(null)

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime())

  // Filter events by category if filters are active
  const filteredEvents =
    activeFilters.length > 0 ? sortedEvents.filter((event) => activeFilters.includes(event.category)) : sortedEvents

  // Toggle category filter
  const toggleFilter = (category: string) => {
    setActiveFilters((prev) => (prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]))
  }

  // Scroll timeline left/right
  const scroll = (direction: "left" | "right") => {
    if (!timelineRef.current) return

    const scrollAmount = timelineRef.current.clientWidth * 0.8
    timelineRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <DashboardCard>
      <CardTitle title={title} subtitle={subtitle} />

      {/* Controls */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            className="rounded-full p-1 text-muted-foreground hover:bg-slate-100 hover:text-foreground dark:hover:bg-slate-800"
            onClick={() => setZoomLevel((prev) => Math.max(0.5, prev - 0.25))}
            disabled={zoomLevel <= 0.5}
            aria-label="Zoom out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            className="rounded-full p-1 text-muted-foreground hover:bg-slate-100 hover:text-foreground dark:hover:bg-slate-800"
            onClick={() => setZoomLevel((prev) => Math.min(2, prev + 0.25))}
            disabled={zoomLevel >= 2}
            aria-label="Zoom in"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
        </div>

        <div className="relative">
          <button
            className="flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-muted-foreground hover:text-foreground dark:border-slate-700"
            onClick={() => document.getElementById("filter-dropdown")?.classList.toggle("hidden")}
            aria-label="Filter categories"
          >
            <Filter className="h-3 w-3" />
            <span>Filter</span>
            {activeFilters.length > 0 && (
              <span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground">
                {activeFilters.length}
              </span>
            )}
          </button>

          <div
            id="filter-dropdown"
            className="absolute right-0 top-full z-10 mt-1 hidden w-48 rounded-md border bg-background p-2 shadow-md dark:border-slate-700"
          >
            <div className="mb-1 text-xs text-muted-foreground">Categories</div>
            {categories.map((category) => (
              <div key={category} className="flex items-center py-1">
                <input
                  type="checkbox"
                  id={`filter-${category}`}
                  checked={activeFilters.includes(category)}
                  onChange={() => toggleFilter(category)}
                  className="mr-2 h-3 w-3"
                />
                <label htmlFor={`filter-${category}`} className="text-xs">
                  {category}
                </label>
              </div>
            ))}

            {activeFilters.length > 0 && (
              <button
                className="mt-2 w-full rounded-sm bg-slate-100 px-2 py-1 text-xs hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
                onClick={() => setActiveFilters([])}
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Timeline navigation */}
      <div className="relative">
        <div className="absolute -left-2 top-1/2 z-10 -translate-y-1/2">
          <button
            className="flex h-6 w-6 items-center justify-center rounded-full bg-background shadow-md hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>

        <div className="absolute -right-2 top-1/2 z-10 -translate-y-1/2">
          <button
            className="flex h-6 w-6 items-center justify-center rounded-full bg-background shadow-md hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative h-[120px] overflow-x-auto scrollbar-hide">
          {/* Timeline line */}
          <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-slate-200 dark:bg-slate-700" />

          {/* Timeline events */}
          <div
            className="relative flex h-full items-center"
            style={{
              width: `${Math.max(100, filteredEvents.length * 150 * zoomLevel)}px`,
              transition: "width 0.3s ease-in-out",
            }}
          >
            {filteredEvents.map((event, index) => {
              const position = `${(index / (filteredEvents.length - 1 || 1)) * 100}%`

              return (
                <motion.div
                  key={event.id}
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: position }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <button
                    className="flex flex-col items-center"
                    onClick={() => setSelectedEvent(selectedEvent?.id === event.id ? null : event)}
                    aria-label={`View details for ${event.title}`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-background shadow-md transition-transform ${
                        selectedEvent?.id === event.id ? "scale-125" : "hover:scale-110"
                      }`}
                      style={{ backgroundColor: event.color }}
                    >
                      {event.icon}
                    </div>
                    <div className="mt-1 max-w-[100px] text-center text-xs font-medium">{event.title}</div>
                    <div className="text-[10px] text-muted-foreground">{formatDate(event.date)}</div>
                  </button>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Event details */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="mt-4 rounded-lg border p-3 dark:border-slate-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: selectedEvent.color }} />
              <h4 className="font-medium">{selectedEvent.title}</h4>
              <span className="ml-auto text-xs text-muted-foreground">{formatDate(selectedEvent.date)}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{selectedEvent.description}</p>
            <div className="mt-2 text-xs">
              <span className="rounded-full bg-slate-100 px-2 py-0.5 dark:bg-slate-800">{selectedEvent.category}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardCard>
  )
}

