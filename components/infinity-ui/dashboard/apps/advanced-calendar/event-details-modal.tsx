"use client";

import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { CalendarIcon, Clock, Edit, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCalendarContext } from "@/lib/calendar-context";

type EventDetailsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventId: string | null;
};

export function EventDetailsModal({
  open,
  onOpenChange,
  eventId,
}: EventDetailsModalProps) {
  const { events, categories, setSelectedEvent, setShowEventModal } =
    useCalendarContext();
  const [event, setEvent] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);

  useEffect(() => {
    if (eventId) {
      const foundEvent = events.find((e) => e.id === eventId);
      if (foundEvent) {
        setEvent(foundEvent);

        // For holidays, set special category styling
        if (foundEvent.type === "holiday") {
          const isInternational =
            foundEvent.categoryId === "international-holiday";
          setCategory({
            id: foundEvent.categoryId,
            name: isInternational ? "International Holiday" : "Local Holiday",
            color: isInternational ? "bg-red-500" : "bg-orange-500",
          });
        } else {
          const foundCategory = categories.find(
            (c) => c.id === foundEvent.categoryId,
          );
          setCategory(foundCategory);
        }
      }
    } else {
      setEvent(null);
      setCategory(null);
    }
  }, [eventId, events, categories]);

  const handleEdit = () => {
    if (event) {
      setSelectedEvent(event);
      onOpenChange(false);
      setShowEventModal(true);
    }
  };

  if (!event) return null;

  const startTime = parseISO(event.start);
  const endTime = parseISO(event.end);
  const isAllDay = event.isAllDay;
  const isMultiDay = !isSameDay(startTime, endTime);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden rounded-xl p-0 sm:max-w-[500px]">
        <div className={cn("h-2 w-full", category?.color || "bg-primary")} />
        <DialogHeader className="px-6 pb-2 pt-6">
          <div className="flex items-center justify-between">
            <DialogTitle
              className={cn(
                "text-xl font-semibold",
                category?.color?.replace("bg-", "text-") || "text-primary",
              )}
            >
              {event.title}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4 px-6 py-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-muted-foreground" />
            <div>
              {isAllDay ? (
                isMultiDay ? (
                  <p className="text-sm">
                    All day · {format(startTime, "EEEE, MMMM d, yyyy")} -{" "}
                    {format(endTime, "EEEE, MMMM d, yyyy")}
                  </p>
                ) : (
                  <p className="text-sm">
                    All day · {format(startTime, "EEEE, MMMM d, yyyy")}
                  </p>
                )
              ) : isMultiDay ? (
                <p className="text-sm">
                  {format(startTime, "EEEE, MMMM d, yyyy")}{" "}
                  {format(startTime, "h:mm a")} -
                  {format(endTime, "EEEE, MMMM d, yyyy")}{" "}
                  {format(endTime, "h:mm a")}
                </p>
              ) : (
                <p className="text-sm">
                  {format(startTime, "EEEE, MMMM d, yyyy")} ·{" "}
                  {format(startTime, "h:mm a")} - {format(endTime, "h:mm a")}
                </p>
              )}
            </div>
          </div>

          {category && (
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-5 w-5 items-center justify-center rounded-full",
                  category.color,
                )}
              >
                <div className="h-2 w-2 rounded-full bg-white" />
              </div>
              <span className="text-sm">{category.name}</span>
            </div>
          )}

          {event.isRecurring && (
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm">
                Repeats every {event.recurrenceInterval || 1}{" "}
                {event.recurrencePattern === "daily" &&
                  (event.recurrenceInterval === 1 ? "day" : "days")}
                {event.recurrencePattern === "weekly" &&
                  (event.recurrenceInterval === 1 ? "week" : "weeks")}
                {event.recurrencePattern === "monthly" &&
                  (event.recurrenceInterval === 1 ? "month" : "months")}
                {event.recurrencePattern === "yearly" &&
                  (event.recurrenceInterval === 1 ? "year" : "years")}
                {event.recurrenceEndDate
                  ? ` until ${format(parseISO(event.recurrenceEndDate), "MMM d, yyyy")}`
                  : ""}
              </p>
            </div>
          )}

          {event.description && (
            <div className="mt-4 border-t pt-4">
              <p className="whitespace-pre-wrap text-sm">{event.description}</p>
            </div>
          )}
        </div>

        <DialogFooter className="border-t px-6 py-4">
          {event.type !== "holiday" && (
            <Button
              className="to-primary-400 hover:from-primary-600 hover:to-primary-500 rounded-full bg-gradient-to-r from-primary"
              onClick={handleEdit}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit {event.type === "task" ? "Task" : "Event"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
