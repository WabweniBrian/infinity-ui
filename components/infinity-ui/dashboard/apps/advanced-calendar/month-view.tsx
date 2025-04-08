"use client";

import type React from "react";

import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  startOfWeek,
  endOfWeek,
  parseISO,
  isWithinInterval,
} from "date-fns";
import { useCalendarContext } from "@/lib/calendar-context";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { EventDetailsModal } from "./event-details-modal";
import { CheckSquare, Square, Repeat } from "lucide-react";

export function MonthView() {
  const {
    selectedDate,
    setSelectedDate,
    events,
    setSelectedEvent,
    setShowEventModal,
    categories,
    toggleTaskCompletion,
    activeItemType,
  } = useCalendarContext();

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Get days for the month view (including days from prev/next months to fill the grid)
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  // Group days into weeks
  const weeks = [];
  let week = [];

  for (let i = 0; i < calendarDays.length; i++) {
    week.push(calendarDays[i]);

    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);

    // Open event creation modal
    const now = new Date();
    const startDate = new Date(day);
    startDate.setHours(now.getHours(), 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1);

    const event = {
      id: "", // Empty ID indicates this is a new event
      title: "",
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      categoryId: activeItemType === "task" ? "task" : categories[0]?.id || "",
      type: activeItemType,
      completed: activeItemType === "task" ? false : undefined,
    };

    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleEventClick = (e: React.MouseEvent, eventId: string) => {
    e.stopPropagation();
    const event = events.find((e) => e.id === eventId);

    if (event?.type === "task") {
      toggleTaskCompletion(eventId);
    } else {
      setSelectedEventId(eventId);
      setShowDetailsModal(true);
    }
  };

  // Process events to handle multi-day events
  const getEventsForDay = (day: Date) => {
    // First, get regular (non-recurring) events for this day
    const regularEvents = events.filter((event) => {
      if (event.isRecurring) return false; // Skip recurring events for now

      const startDate = parseISO(event.start);
      const endDate = parseISO(event.end);

      // Check if the day falls within the event's date range
      return isWithinInterval(day, { start: startDate, end: endDate });
    });

    // Then, get recurring events that should appear on this day
    const recurringEvents = events.filter((event) => {
      if (!event.isRecurring) return false;

      const startDate = parseISO(event.start);
      const endDate = parseISO(event.end);
      const recurrenceEndDate = event.recurrenceEndDate
        ? parseISO(event.recurrenceEndDate)
        : null;

      // If the recurrence has ended, don't show it
      if (recurrenceEndDate && day > recurrenceEndDate) return false;

      // If the day is before the first occurrence, don't show it
      if (day < startDate) return false;

      // Check recurrence pattern
      switch (event.recurrencePattern) {
        case "daily":
          // For daily events, check if the day is a multiple of the interval from the start date
          const daysSinceStart = Math.floor(
            (day.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
          );
          return daysSinceStart % (event.recurrenceInterval || 1) === 0;

        case "weekly":
          // For weekly events, check if:
          // 1. The day is a multiple of (7 * interval) days from the start date
          // 2. The day of week matches one of the selected days
          const weeksSinceStart = Math.floor(
            (day.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7),
          );
          const isCorrectWeek =
            weeksSinceStart % (event.recurrenceInterval || 1) === 0;

          // If no selectedDays, default to the same day of week as the start date
          return isCorrectWeek && day.getDay() === startDate.getDay();

        case "monthly":
          // For monthly events, check if the day of the month matches the start date's day
          const monthsSinceStart =
            (day.getFullYear() - startDate.getFullYear()) * 12 +
            (day.getMonth() - startDate.getMonth());
          return (
            monthsSinceStart % (event.recurrenceInterval || 1) === 0 &&
            day.getDate() === startDate.getDate()
          );

        case "yearly":
          // For yearly events, check if the month and day match the start date
          const yearsSinceStart = day.getFullYear() - startDate.getFullYear();
          return (
            yearsSinceStart % (event.recurrenceInterval || 1) === 0 &&
            day.getMonth() === startDate.getMonth() &&
            day.getDate() === startDate.getDate()
          );

        default:
          return false;
      }
    });

    // Combine regular and recurring events
    const allEvents = [...regularEvents, ...recurringEvents].map((event) => {
      const startDate = parseISO(event.start);
      const endDate = parseISO(event.end);

      // For recurring events, adjust the start/end times to the current day
      let effectiveStartDate = startDate;
      let effectiveEndDate = endDate;

      if (event.isRecurring) {
        // Create new date objects for this occurrence
        effectiveStartDate = new Date(day);
        effectiveStartDate.setHours(
          startDate.getHours(),
          startDate.getMinutes(),
          startDate.getSeconds(),
        );

        // Calculate duration of original event
        const durationMs = endDate.getTime() - startDate.getTime();

        // Apply same duration to this occurrence
        effectiveEndDate = new Date(effectiveStartDate.getTime() + durationMs);
      }

      // Determine if this is the first or last day of a multi-day event
      const isFirstDay = isSameDay(day, effectiveStartDate);
      const isLastDay = isSameDay(day, effectiveEndDate);

      return {
        ...event,
        isFirstDay,
        isLastDay,
      };
    });

    return allEvents;
  };

  return (
    <div className="h-full overflow-auto p-2 md:p-4">
      <div className="grid grid-cols-7 gap-px">
        {/* Weekday headers */}
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="py-2 text-center text-sm font-medium">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {weeks.map((week, weekIndex) =>
          week.map((day, dayIndex) => {
            const isCurrentMonth = isSameMonth(day, selectedDate);
            const isToday = isSameDay(day, new Date());
            const isSelected = isSameDay(day, selectedDate);

            // Get events for this day
            const dayEvents = getEventsForDay(day);

            return (
              <motion.div
                key={`${weekIndex}-${dayIndex}`}
                className={cn(
                  "min-h-[100px] border border-border p-1 md:min-h-[120px]",
                  !isCurrentMonth && "bg-muted/30 text-muted-foreground",
                  isToday && "bg-accent/30",
                  isSelected && "ring-2 ring-inset ring-primary",
                  "cursor-pointer transition-colors hover:bg-accent/20",
                )}
                onClick={() => handleDayClick(day)}
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
              >
                <div className="flex justify-end">
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full text-xs",
                      isToday && "bg-primary text-primary-foreground",
                    )}
                  >
                    {format(day, "d")}
                  </span>
                </div>

                <AnimatePresence>
                  <div className="mt-1 space-y-1">
                    {dayEvents.slice(0, 3).map((event, idx) => {
                      // Handle different event types
                      let colorClass = "bg-primary";
                      let textColorClass = "text-primary";

                      if (event.type === "holiday") {
                        colorClass =
                          event.categoryId === "international-holiday"
                            ? "bg-red-500"
                            : "bg-orange-500";
                        textColorClass =
                          event.categoryId === "international-holiday"
                            ? "text-red-500"
                            : "text-orange-500";
                      } else if (event.type === "task") {
                        colorClass = "bg-violet-500";
                        textColorClass = "text-violet-500";
                      } else {
                        const category = categories.find(
                          (c) => c.id === event.categoryId,
                        );
                        colorClass = category?.color || "bg-primary";
                        textColorClass = colorClass.replace("bg-", "text-");
                      }

                      // Special styling for multi-day events
                      const borderRadius = cn(
                        "rounded",
                        !event.isFirstDay && "rounded-l-none",
                        !event.isLastDay && "rounded-r-none",
                      );

                      return (
                        <motion.div
                          key={`${event.id}-${idx}`}
                          className={cn(
                            "flex items-center gap-1 truncate p-1 text-xs",
                            colorClass.replace("bg-", "bg-opacity-10"),
                            event.type === "task" &&
                              event.completed &&
                              "bg-opacity-5 line-through",
                            borderRadius,
                          )}
                          style={{
                            borderLeft: `2px solid var(--${colorClass.replace("bg-", "")})`,
                          }}
                          onClick={(e) => handleEventClick(e, event.id)}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2, delay: idx * 0.05 }}
                        >
                          {event.type === "task" &&
                            (event.completed ? (
                              <CheckSquare className="h-3 w-3 flex-shrink-0 text-violet-500" />
                            ) : (
                              <Square className="h-3 w-3 flex-shrink-0 text-violet-500" />
                            ))}
                          {event.isRecurring && (
                            <Repeat className="h-3 w-3 flex-shrink-0" />
                          )}
                          <span
                            className={cn(
                              textColorClass,
                              event.type === "task" &&
                                event.completed &&
                                "text-muted-foreground",
                            )}
                          >
                            {event.title}
                          </span>
                        </motion.div>
                      );
                    })}

                    {dayEvents.length > 3 && (
                      <div className="text-center text-xs">
                        <Badge variant="outline" className="h-5 text-[10px]">
                          +{dayEvents.length - 3} more
                        </Badge>
                      </div>
                    )}
                  </div>
                </AnimatePresence>
              </motion.div>
            );
          }),
        )}
      </div>

      <EventDetailsModal
        open={showDetailsModal}
        onOpenChange={setShowDetailsModal}
        eventId={selectedEventId}
      />
    </div>
  );
}
