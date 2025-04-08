"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  parseISO,
  differenceInDays,
} from "date-fns";
import { useCalendarContext } from "@/lib/calendar-context";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { EventDetailsModal } from "./event-details-modal";
import { CheckSquare, Square, Repeat } from "lucide-react";

// Time slots from 12am to 11pm
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const HOUR_HEIGHT = 60; // 60px per hour

export function WeekView() {
  const {
    selectedDate,
    events,
    setSelectedEvent,
    setShowEventModal,
    categories,
    toggleTaskCompletion,
    activeItemType,
    isEventInTimeSlot,
  } = useCalendarContext();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentTimeIndicatorTop, setCurrentTimeIndicatorTop] = useState(0);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Get week days
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Start from Monday
  const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  // Scroll to current time on initial render
  useEffect(() => {
    const now = new Date();
    const minutes = now.getHours() * 60 + now.getMinutes();
    const scrollPosition = (minutes / 60) * HOUR_HEIGHT - 100;

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollPosition > 0 ? scrollPosition : 0;
    }

    // Update current time indicator position
    setCurrentTimeIndicatorTop(
      (now.getHours() + now.getMinutes() / 60) * HOUR_HEIGHT,
    );

    // Update current time indicator every minute
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTimeIndicatorTop(
        (now.getHours() + now.getMinutes() / 60) * HOUR_HEIGHT,
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleEventClick = (e: React.MouseEvent, eventId: string) => {
    e.stopPropagation(); // Prevent triggering the time slot click
    const event = events.find((e) => e.id === eventId);

    if (event?.type === "holiday") {
      // For holidays, just show details
      setSelectedEventId(eventId);
      setShowDetailsModal(true);
    } else if (event?.type === "task") {
      // For tasks, toggle completion status
      toggleTaskCompletion(eventId);
    } else {
      // For regular events, show details
      setSelectedEventId(eventId);
      setShowDetailsModal(true);
    }
  };

  const handleTimeSlotClick = (day: Date, hour: number, minutes = 0) => {
    // Create a new date at the clicked time
    const date = new Date(day);
    date.setHours(hour, minutes);

    // Set the end time to 1 hour later
    const endDate = new Date(date);
    endDate.setHours(date.getHours() + 1);

    // Open the event modal with the selected time and active type from sidebar
    const event = {
      id: "", // Empty ID indicates this is a new event
      title: "",
      start: date.toISOString(),
      end: endDate.toISOString(),
      categoryId: activeItemType === "task" ? "task" : categories[0]?.id || "",
      type: activeItemType,
      completed: activeItemType === "task" ? false : undefined,
    };

    setSelectedEvent(event);
    setShowEventModal(true);
  };

  // Process multi-day events
  const processedEvents = events.flatMap((event) => {
    const startDate = parseISO(event.start);
    const endDate = parseISO(event.end);
    const daysDiff = differenceInDays(endDate, startDate);

    // If it's a multi-day event, create separate events for each day in the week
    if (daysDiff > 0) {
      const eventDays = [];

      for (let i = 0; i <= daysDiff; i++) {
        const currentDay = addDays(startDate, i);

        // Only include days that are in the current week view
        if (currentDay >= weekStart && currentDay <= weekEnd) {
          const isFirstDay = i === 0;
          const isLastDay = i === daysDiff;

          eventDays.push({
            ...event,
            displayId: `${event.id}-day-${i}`,
            originalId: event.id,
            isFirstDay,
            isLastDay,
            currentDay,
          });
        }
      }

      return eventDays;
    }

    // For single-day events, just return the original event
    return [
      {
        ...event,
        displayId: event.id,
        originalId: event.id,
        isFirstDay: true,
        isLastDay: true,
        currentDay: startDate,
      },
    ];
  });

  return (
    <div className="flex h-full flex-col">
      {/* Week header */}
      <div className="flex border-b border-border">
        <div className="w-16 shrink-0" /> {/* Time column spacer */}
        {weekDays.map((day, index) => {
          const isToday = isSameDay(day, new Date());

          return (
            <div
              key={index}
              className={cn("flex-1 py-2 text-center", isToday && "bg-accent")}
            >
              <div className="text-xs text-muted-foreground">
                {format(day, "EEE")}
              </div>
              <div
                className={cn(
                  "mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full",
                  isToday && "bg-primary text-primary-foreground",
                )}
              >
                {format(day, "d")}
              </div>
            </div>
          );
        })}
      </div>

      {/* Week grid */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea
          ref={scrollContainerRef}
          className="h-full"
          scrollHideDelay={0}
        >
          <div
            className="relative flex min-h-[1440px]"
            style={{ height: `${HOURS.length * HOUR_HEIGHT}px` }}
          >
            {/* Time column */}
            <div className="w-16 shrink-0">
              {HOURS.map((hour) => (
                <div
                  key={hour}
                  className="absolute w-full border-t border-border"
                  style={{ top: `${hour * HOUR_HEIGHT}px` }}
                >
                  <div className="sticky left-0 -mt-3 w-16 pr-2 text-right text-xs text-muted-foreground">
                    {format(
                      addDays(new Date().setHours(hour, 0, 0, 0), 0),
                      "h a",
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Day columns */}
            {weekDays.map((day, dayIndex) => {
              const isToday = isSameDay(day, new Date());

              // Filter events for this day
              const dayEvents = processedEvents.filter((event) =>
                isSameDay(event.currentDay, day),
              );

              return (
                <div
                  key={dayIndex}
                  className={cn(
                    "relative flex-1 border-l border-border",
                    isToday && "bg-accent/30",
                  )}
                >
                  {/* Hour grid lines */}
                  {HOURS.map((hour) => (
                    <div
                      key={hour}
                      className="absolute w-full border-t border-border"
                      style={{ top: `${hour * HOUR_HEIGHT}px` }}
                    >
                      {/* Half-hour marker */}
                      <div
                        className="pointer-events-none absolute w-full border-t border-dashed border-border/50"
                        style={{ top: `${HOUR_HEIGHT / 2}px` }}
                      />

                      {/* Clickable time slots */}
                      <div
                        className="absolute left-0 right-0 h-[30px] cursor-pointer transition-colors hover:bg-accent/30"
                        onClick={() => handleTimeSlotClick(day, hour, 0)}
                      />
                      <div
                        className="absolute left-0 right-0 top-[30px] h-[30px] cursor-pointer transition-colors hover:bg-accent/30"
                        onClick={() => handleTimeSlotClick(day, hour, 30)}
                      />
                    </div>
                  ))}

                  {/* Current time indicator */}
                  {isToday && (
                    <div
                      className="absolute left-0 right-0 z-10 flex items-center"
                      style={{ top: `${currentTimeIndicatorTop}px` }}
                    >
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <div className="h-[1px] flex-1 bg-primary" />
                    </div>
                  )}

                  {/* Events */}
                  {dayEvents.map((event) => {
                    const startTime = parseISO(event.start);
                    const endTime = parseISO(event.end);

                    // For multi-day events, adjust the display times
                    const displayStartTime = event.isFirstDay
                      ? startTime
                      : new Date(day).setHours(0, 0, 0, 0);
                    const displayEndTime = event.isLastDay
                      ? endTime
                      : new Date(day).setHours(23, 59, 59, 999);

                    const startMinutes =
                      new Date(displayStartTime).getHours() * 60 +
                      new Date(displayStartTime).getMinutes();
                    const endMinutes =
                      new Date(displayEndTime).getHours() * 60 +
                      new Date(displayEndTime).getMinutes();
                    const durationMinutes = endMinutes - startMinutes;
                    const top = (startMinutes / 60) * HOUR_HEIGHT;
                    const height = (durationMinutes / 60) * HOUR_HEIGHT;

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
                      "rounded-md",
                      !event.isFirstDay && "rounded-l-none",
                      !event.isLastDay && "rounded-r-none",
                    );

                    return (
                      <motion.div
                        key={event.displayId}
                        className={cn(
                          "absolute left-1 right-1 z-20 h-fit cursor-pointer overflow-hidden p-1 shadow-sm",
                          borderRadius,
                          colorClass.replace("bg-", "bg-opacity-10"),
                          colorClass.replace("bg-", "hover:bg-opacity-20"),
                          event.type === "task" &&
                            event.completed &&
                            "bg-opacity-5 line-through",
                        )}
                        style={{
                          top: `${top}px`,
                          borderLeft: `3px solid var(--${colorClass.replace("bg-", "")})`,
                        }}
                        onClick={(e) => handleEventClick(e, event.originalId)}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex h-full flex-col">
                          <div className="flex items-center gap-1">
                            {event.type === "task" &&
                              (event.completed ? (
                                <CheckSquare className="h-3 w-3 text-violet-500" />
                              ) : (
                                <Square className="h-3 w-3 text-violet-500" />
                              ))}
                            {event.isRecurring && (
                              <Repeat className="h-3 w-3 flex-shrink-0" />
                            )}
                            <h3
                              className={cn(
                                "truncate text-xs font-medium",
                                textColorClass,
                                event.type === "task" &&
                                  event.completed &&
                                  "text-muted-foreground",
                              )}
                            >
                              {event.title}
                            </h3>
                          </div>
                          {height > 40 && (
                            <p className="truncate text-[10px] text-muted-foreground">
                              {format(new Date(displayStartTime), "h:mm a")} -{" "}
                              {format(new Date(displayEndTime), "h:mm a")}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      <EventDetailsModal
        open={showDetailsModal}
        onOpenChange={setShowDetailsModal}
        eventId={selectedEventId}
      />
    </div>
  );
}
