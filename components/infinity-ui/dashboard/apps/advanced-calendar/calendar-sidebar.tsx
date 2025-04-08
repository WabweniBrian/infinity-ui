"use client";

import { useState } from "react";
import { format, addMonths, subMonths, parseISO, isSameDay } from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  CalendarIcon,
  CalendarCheck,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useCalendarContext } from "@/lib/calendar-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { EventDetailsModal } from "./event-details-modal";

export function CalendarSidebar() {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    selectedDate,
    setSelectedDate,
    setShowEventModal,
    categories,
    toggleCategoryVisibility,
    events,
    showHolidays,
    toggleHolidays,
    setSelectedEvent,
    activeItemType,
    setActiveItemType,
    toggleTaskCompletion,
  } = useCalendarContext();

  const [calendarDate, setCalendarDate] = useState<Date>(new Date());
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handlePrevMonth = () => {
    setCalendarDate(subMonths(calendarDate, 1));
  };

  const handleNextMonth = () => {
    setCalendarDate(addMonths(calendarDate, 1));
  };

  const handleCreateItem = () => {
    setSelectedEvent({
      id: "",
      title: "",
      start: new Date().toISOString(),
      end: new Date(
        new Date().setHours(new Date().getHours() + 1),
      ).toISOString(),
      categoryId: activeItemType === "task" ? "task" : categories[0]?.id || "",
      type: activeItemType,
      completed: activeItemType === "task" ? false : undefined,
    });
    setShowEventModal(true);
  };

  // Get upcoming events (next 7 days)
  const upcomingEvents = events
    .filter((event) => {
      if (event.type === "holiday") return false; // Exclude holidays from this list
      const eventDate = parseISO(event.start);
      const now = new Date();
      const sevenDaysLater = new Date();
      sevenDaysLater.setDate(now.getDate() + 7);
      return eventDate >= now && eventDate <= sevenDaysLater;
    })
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .slice(0, 5);

  const handleEventClick = (eventId: string) => {
    const event = events.find((e) => e.id === eventId);

    if (event?.type === "task") {
      toggleTaskCompletion(eventId);
    } else {
      setSelectedEventId(eventId);
      setShowDetailsModal(true);
    }
  };

  if (!isSidebarOpen) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-30 h-full border-r border-border bg-background",
        "w-[280px] transition-all duration-300 ease-in-out",
        "flex flex-col",
      )}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-6 w-6 text-primary" />
          <h1 className="to-primary-400 bg-gradient-to-r from-primary bg-clip-text text-xl font-semibold text-transparent">
            Planner
          </h1>
        </div>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="px-4 py-2">
        <div className="mb-2 flex gap-2">
          <Button
            variant={activeItemType === "event" ? "default" : "outline"}
            size="sm"
            className={cn(
              "flex-1 rounded-full",
              activeItemType === "event" &&
                "to-primary-400 hover:from-primary-600 hover:to-primary-500 bg-gradient-to-r from-primary",
            )}
            onClick={() => setActiveItemType("event")}
          >
            <CalendarDays className="mr-2 h-4 w-4" />
            Event
          </Button>
          <Button
            variant={activeItemType === "task" ? "default" : "outline"}
            size="sm"
            className={cn(
              "flex-1 rounded-full",
              activeItemType === "task" &&
                "bg-gradient-to-r from-violet-500 to-violet-400 hover:from-violet-600 hover:to-violet-500",
            )}
            onClick={() => setActiveItemType("task")}
          >
            <CalendarCheck className="mr-2 h-4 w-4" />
            Task
          </Button>
        </div>
        <Button
          className={cn(
            "w-full rounded-full text-white shadow-md",
            activeItemType === "event"
              ? "to-primary-400 hover:from-primary-600 hover:to-primary-500 bg-gradient-to-r from-primary"
              : "bg-gradient-to-r from-violet-500 to-violet-400 hover:from-violet-600 hover:to-violet-500",
          )}
          onClick={handleCreateItem}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create {activeItemType === "event" ? "Event" : "Task"}
        </Button>
      </div>

      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">
              {format(calendarDate, "MMMM yyyy")}
            </span>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={handlePrevMonth}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={handleNextMonth}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="w-full">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              month={calendarDate}
              onMonthChange={setCalendarDate}
              className="w-full rounded-md border"
              classNames={{
                day_selected:
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                day_today: "bg-accent text-accent-foreground",
                cell: "w-8 h-8 p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
                head_cell: "text-xs font-medium text-muted-foreground",
                table: "w-full border-collapse",
              }}
            />
          </div>
        </div>

        <Separator />

        <div className="p-4">
          <h2 className="mb-3 text-sm font-medium">My Calendars</h2>
          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div
                    className={cn("mr-2 h-3 w-3 rounded-full", category.color)}
                  />
                  <span className="text-sm">{category.name}</span>
                </div>
                <Switch
                  checked={category.visible}
                  onCheckedChange={() => toggleCategoryVisibility(category.id)}
                />
              </div>
            ))}

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-red-500" />
                <span className="text-sm">Holidays</span>
              </div>
              <Switch checked={showHolidays} onCheckedChange={toggleHolidays} />
            </div>
          </div>
        </div>

        <Separator />

        <div className="p-4">
          <h2 className="mb-3 text-sm font-medium">Upcoming Events</h2>
          <div className="space-y-3">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => {
                const category = categories.find(
                  (c) => c.id === event.categoryId,
                );
                const colorClass = category?.color || "bg-primary";
                const textColorClass = colorClass.replace("bg-", "text-");
                const startTime = parseISO(event.start);
                const isToday = isSameDay(startTime, new Date());

                return (
                  <div
                    key={event.id}
                    className="flex cursor-pointer items-start gap-2 rounded-lg p-2 hover:bg-accent/50"
                    onClick={() => handleEventClick(event.id)}
                  >
                    <div
                      className={cn(
                        "w-1 self-stretch rounded-full",
                        colorClass,
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        {event.type === "task" && (
                          <div
                            className={cn(
                              "flex h-3 w-3 items-center justify-center rounded border border-muted-foreground",
                              event.completed &&
                                "border-violet-500 bg-violet-500",
                            )}
                          >
                            {event.completed && (
                              <div className="h-1.5 w-1.5 rounded-full bg-white" />
                            )}
                          </div>
                        )}
                        <p
                          className={cn(
                            "truncate text-sm font-medium",
                            textColorClass,
                            event.type === "task" &&
                              event.completed &&
                              "text-muted-foreground line-through",
                          )}
                        >
                          {event.title}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {isToday ? "Today" : format(startTime, "MMM d")},{" "}
                        {format(startTime, "h:mm a")}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="py-2 text-center text-sm text-muted-foreground">
                No upcoming events
              </p>
            )}
          </div>
        </div>
      </ScrollArea>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">john@example.com</p>
          </div>
        </div>
      </div>

      <EventDetailsModal
        open={showDetailsModal}
        onOpenChange={setShowDetailsModal}
        eventId={selectedEventId}
      />
    </div>
  );
}
