"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { format, startOfDay, isSameDay, addHours, parseISO } from "date-fns";
import { useCalendarContext } from "@/lib/calendar-context";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { EventDetailsModal } from "./event-details-modal";
import { CheckSquare, Square, Repeat } from "lucide-react";

// Time slots from 12am to 11pm
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const HOUR_HEIGHT = 60; // 60px per hour

export function DayView() {
  const {
    selectedDate,
    events,
    setSelectedEvent,
    setShowEventModal,
    categories,
    toggleTaskCompletion,
    activeItemType,
  } = useCalendarContext();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentTimeIndicatorTop, setCurrentTimeIndicatorTop] = useState(0);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

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

  // Filter events for the selected day
  const dayEvents = events.filter((event) =>
    isSameDay(parseISO(event.start), selectedDate),
  );

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

  const handleTimeSlotClick = (hour: number, minutes = 0) => {
    // Create a new date at the clicked time
    const date = new Date(selectedDate);
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

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-hidden">
        <ScrollArea
          ref={scrollContainerRef}
          className="h-full"
          scrollHideDelay={0}
        >
          <div
            className="relative min-h-[1440px]"
            style={{ height: `${HOURS.length * HOUR_HEIGHT}px` }}
          >
            {/* Time grid */}
            {HOURS.map((hour) => (
              <div
                key={hour}
                className="absolute w-full border-t border-border"
                style={{ top: `${hour * HOUR_HEIGHT}px` }}
              >
                <div className="sticky left-0 -mt-3 w-16 pr-2 text-right text-xs text-muted-foreground">
                  {format(addHours(startOfDay(new Date()), hour), "h a")}
                </div>

                {/* Half-hour marker */}
                <div
                  className="pointer-events-none absolute w-full border-t border-dashed border-border/50"
                  style={{ top: `${HOUR_HEIGHT / 2}px` }}
                />

                {/* Clickable time slots */}
                <div
                  className="absolute left-16 right-4 h-[30px] cursor-pointer transition-colors hover:bg-accent/30"
                  onClick={() => handleTimeSlotClick(hour, 0)}
                />
                <div
                  className="absolute left-16 right-4 top-[30px] h-[30px] cursor-pointer transition-colors hover:bg-accent/30"
                  onClick={() => handleTimeSlotClick(hour, 30)}
                />
              </div>
            ))}

            {/* Current time indicator */}
            {isSameDay(selectedDate, new Date()) && (
              <div
                className="absolute left-16 right-0 z-10 flex items-center"
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
              const startMinutes =
                startTime.getHours() * 60 + startTime.getMinutes();
              const endMinutes = endTime.getHours() * 60 + endTime.getMinutes();
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

              return (
                <motion.div
                  key={event.id}
                  className={cn(
                    "absolute left-16 right-4 z-20 h-fit cursor-pointer overflow-hidden rounded-md p-2 shadow-sm",
                    colorClass.replace("bg-", "bg-opacity-10"),
                    colorClass.replace("bg-", "hover:bg-opacity-20"),
                    event.type === "task" &&
                      event.completed &&
                      "bg-opacity-5 line-through",
                  )}
                  style={{
                    top: `${top}px`,
                    borderLeftWidth: `3px solid var(--${colorClass.replace("bg-", "")})`,
                  }}
                  onClick={(e) => handleEventClick(e, event.id)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex h-full flex-col">
                    <div className="flex items-center gap-1">
                      {event.type === "task" &&
                        (event.completed ? (
                          <CheckSquare className="h-4 w-4 text-violet-500" />
                        ) : (
                          <Square className="h-4 w-4 text-violet-500" />
                        ))}
                      {event.isRecurring && <Repeat className="h-4 w-4" />}
                      <h3
                        className={cn(
                          "truncate text-sm font-medium",
                          textColorClass,
                          event.type === "task" &&
                            event.completed &&
                            "text-muted-foreground",
                        )}
                      >
                        {event.title}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {format(startTime, "h:mm a")} -{" "}
                      {format(endTime, "h:mm a")}
                    </p>
                    {height > 60 && (
                      <p className="mt-1 line-clamp-2 text-xs">
                        {event.description}
                      </p>
                    )}
                  </div>
                </motion.div>
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
