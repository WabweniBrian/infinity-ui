"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import {
  addDays,
  addMonths,
  parseISO,
  addWeeks,
  addYears,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { getHolidays, type Holiday } from "@/lib/holidays";

// Types
export type EventCategory = {
  id: string;
  name: string;
  color: string;
  visible: boolean;
};

export type CalendarItemType = "event" | "task" | "holiday";

export type CalendarEvent = {
  id: string;
  title: string;
  description?: string;
  start: string;
  end: string;
  categoryId: string;
  isAllDay?: boolean;
  isRecurring?: boolean;
  recurrencePattern?: string;
  recurrenceInterval?: number;
  recurrenceEndDate?: string;
  type: CalendarItemType;
  completed?: boolean;
};

type CalendarContextType = {
  view: "day" | "week" | "month";
  setView: (view: "day" | "week" | "month") => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  events: CalendarEvent[];
  addEvent: (event: Omit<CalendarEvent, "id">) => void;
  updateEvent: (id: string, event: Partial<Omit<CalendarEvent, "id">>) => void;
  deleteEvent: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  showEventModal: boolean;
  setShowEventModal: (show: boolean) => void;
  selectedEvent: CalendarEvent | null;
  setSelectedEvent: (event: CalendarEvent | null) => void;
  categories: EventCategory[];
  toggleCategoryVisibility: (id: string) => void;
  searchEvents: (query: string) => void;
  holidays: Holiday[];
  showHolidays: boolean;
  toggleHolidays: () => void;
  activeItemType: "event" | "task";
  setActiveItemType: (type: "event" | "task") => void;
  getEventById: (id: string) => CalendarEvent | undefined;
  isEventInTimeSlot: (
    eventId: string,
    date: Date,
    hour: number,
    minutes: number,
  ) => boolean;
  isTimeSlotAvailable: (date: Date, hour: number, minutes: number) => boolean;
};

// Sample data
const sampleCategories: EventCategory[] = [
  { id: "work", name: "Work", color: "bg-primary", visible: true },
  { id: "personal", name: "Personal", color: "bg-green-500", visible: true },
  { id: "important", name: "Important", color: "bg-amber-500", visible: true },
  { id: "health", name: "Health", color: "bg-purple-500", visible: true },
  { id: "task", name: "Tasks", color: "bg-violet-500", visible: true },
];

const today = new Date();
const tomorrow = addDays(today, 1);
const nextMonth = addMonths(today, 1);

const sampleEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Team Meeting",
    description: "Weekly team sync to discuss project progress",
    start: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      14,
      0,
    ).toISOString(),
    end: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      15,
      0,
    ).toISOString(),
    categoryId: "work",
    type: "event",
  },
  {
    id: "2",
    title: "Gym Workout",
    description: "Cardio and strength training",
    start: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      18,
      30,
    ).toISOString(),
    end: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      20,
      0,
    ).toISOString(),
    categoryId: "health",
    type: "event",
  },
  {
    id: "3",
    title: "Project Deadline",
    description: "Final submission for the client project",
    start: new Date(
      tomorrow.getFullYear(),
      tomorrow.getMonth(),
      tomorrow.getDate(),
      0,
      0,
    ).toISOString(),
    end: new Date(
      tomorrow.getFullYear(),
      tomorrow.getMonth(),
      tomorrow.getDate(),
      23,
      59,
    ).toISOString(),
    categoryId: "important",
    isAllDay: true,
    type: "event",
  },
  {
    id: "4",
    title: "Doctor Appointment",
    description: "Annual checkup",
    start: new Date(
      addDays(today, 3).getFullYear(),
      addDays(today, 3).getMonth(),
      addDays(today, 3).getDate(),
      10,
      30,
    ).toISOString(),
    end: new Date(
      addDays(today, 3).getFullYear(),
      addDays(today, 3).getMonth(),
      addDays(today, 3).getDate(),
      11,
      30,
    ).toISOString(),
    categoryId: "health",
    type: "event",
  },
  {
    id: "5",
    title: "Birthday Party",
    description: "Sarah's birthday celebration",
    start: new Date(
      addDays(today, 5).getFullYear(),
      addDays(today, 5).getMonth(),
      addDays(today, 5).getDate(),
      19,
      0,
    ).toISOString(),
    end: new Date(
      addDays(today, 5).getFullYear(),
      addDays(today, 5).getMonth(),
      addDays(today, 5).getDate(),
      22,
      0,
    ).toISOString(),
    categoryId: "personal",
    type: "event",
  },
  {
    id: "6",
    title: "Weekly Review",
    description: "Review progress and plan next week",
    start: new Date(
      addDays(today, 2).getFullYear(),
      addDays(today, 2).getMonth(),
      addDays(today, 2).getDate(),
      15,
      0,
    ).toISOString(),
    end: new Date(
      addDays(today, 2).getFullYear(),
      addDays(today, 2).getMonth(),
      addDays(today, 2).getDate(),
      16,
      0,
    ).toISOString(),
    categoryId: "work",
    isRecurring: true,
    recurrencePattern: "weekly",
    recurrenceInterval: 1,
    type: "event",
  },
  {
    id: "7",
    title: "Prepare presentation",
    description: "Create slides for the client meeting",
    start: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      9,
      0,
    ).toISOString(),
    end: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      12,
      0,
    ).toISOString(),
    categoryId: "task",
    type: "task",
    completed: false,
  },
  {
    id: "8",
    title: "Buy groceries",
    description: "Get items for dinner party",
    start: new Date(
      tomorrow.getFullYear(),
      tomorrow.getMonth(),
      tomorrow.getDate(),
      16,
      0,
    ).toISOString(),
    end: new Date(
      tomorrow.getFullYear(),
      tomorrow.getMonth(),
      tomorrow.getDate(),
      17,
      0,
    ).toISOString(),
    categoryId: "task",
    type: "task",
    completed: false,
  },
  {
    id: "9",
    title: "Conference",
    description: "Annual industry conference",
    start: new Date(
      addDays(today, 7).getFullYear(),
      addDays(today, 7).getMonth(),
      addDays(today, 7).getDate(),
      9,
      0,
    ).toISOString(),
    end: new Date(
      addDays(today, 9).getFullYear(),
      addDays(today, 9).getMonth(),
      addDays(today, 9).getDate(),
      17,
      0,
    ).toISOString(),
    categoryId: "work",
    type: "event",
  },
];

// Create context
const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined,
);

// Provider component
export function CalendarProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<"day" | "week" | "month">("week");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents);
  const [filteredEvents, setFilteredEvents] =
    useState<CalendarEvent[]>(sampleEvents);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );
  const [categories, setCategories] =
    useState<EventCategory[]>(sampleCategories);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [showHolidays, setShowHolidays] = useState(true);
  const [activeItemType, setActiveItemType] = useState<"event" | "task">(
    "event",
  );

  // Load holidays for the current year
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const holidaysForYear = getHolidays(currentYear);
    setHolidays(holidaysForYear);
  }, []);

  // Generate recurring events
  const generateRecurringEvents = (
    event: CalendarEvent,
    recurrencePattern: string,
    recurrenceInterval: number,
    recurrenceEndDate?: string,
  ) => {
    const recurringEvents: CalendarEvent[] = [];
    const startDate = parseISO(event.start);
    const endDate = parseISO(event.end);

    // Calculate duration between start and end for consistent event lengths
    const durationMs = endDate.getTime() - startDate.getTime();

    // Determine end date for recurrence
    const maxRecurrences = 100; // Limit to prevent infinite loops
    const endRecurrenceDate = recurrenceEndDate
      ? parseISO(recurrenceEndDate)
      : addYears(startDate, 2);

    // Create recurring instances
    let currentDate = startDate;
    let count = 0;

    while (currentDate <= endRecurrenceDate && count < maxRecurrences) {
      // Skip the first instance as it's already added
      if (count > 0) {
        const newStartDate = new Date(currentDate);

        // Calculate the new end date by adding the same duration
        const newEndDate = new Date(newStartDate.getTime() + durationMs);

        recurringEvents.push({
          ...event,
          id: `${event.id}-recurrence-${count}`,
          start: newStartDate.toISOString(),
          end: newEndDate.toISOString(),
        });
      }

      // Calculate next occurrence based on pattern
      switch (recurrencePattern) {
        case "daily":
          currentDate = addDays(currentDate, recurrenceInterval);
          break;
        case "weekly":
          currentDate = addWeeks(currentDate, recurrenceInterval);
          break;
        case "monthly":
          currentDate = addMonths(currentDate, recurrenceInterval);
          break;
        case "yearly":
          currentDate = addYears(currentDate, recurrenceInterval);
          break;
        default:
          currentDate = addDays(currentDate, 1);
      }

      count++;
    }

    return recurringEvents;
  };

  // Update the addEvent function to properly handle recurring events for both types
  const addEvent = (event: Omit<CalendarEvent, "id">) => {
    try {
      const newEvent: CalendarEvent = {
        ...event,
        id: Math.random().toString(36).substring(2, 9),
      };

      let updatedEvents = [...events, newEvent];

      // Handle recurring events for both tasks and events
      if (
        event.isRecurring &&
        event.recurrencePattern &&
        event.recurrenceInterval
      ) {
        console.log(
          "Generating recurring events:",
          event.recurrencePattern,
          event.recurrenceInterval,
        );
        const recurringEvents = generateRecurringEvents(
          newEvent,
          event.recurrencePattern,
          event.recurrenceInterval,
          event.recurrenceEndDate,
        );

        console.log("Generated recurring events:", recurringEvents.length);
        updatedEvents = [...updatedEvents, ...recurringEvents];
      }

      setEvents(updatedEvents);
      applyFilters(updatedEvents, categories, showHolidays);
    } catch (error) {
      console.error("Error adding event:", error);
      throw error;
    }
  };

  // Update the updateEvent function to properly handle recurring events for both types

  const updateEvent = (
    id: string,
    eventData: Partial<Omit<CalendarEvent, "id">>,
  ) => {
    try {
      // Find the event to update
      const eventToUpdate = events.find((e) => e.id === id);
      if (!eventToUpdate) return;

      // Check if this is a recurring event
      const isRecurringEvent =
        eventToUpdate.isRecurring ||
        (eventData.isRecurring !== undefined && eventData.isRecurring);

      // If it's a recurring event, we need to handle recurrences
      if (isRecurringEvent) {
        // Remove all existing recurrences of this event
        const baseEventId = id.includes("-recurrence-")
          ? id.split("-recurrence-")[0]
          : id;

        const nonRecurringEvents = events.filter(
          (e) => !e.id.startsWith(baseEventId) || e.id === baseEventId,
        );

        // Update the base event
        const updatedEvents = nonRecurringEvents.map((event) =>
          event.id === id ? { ...event, ...eventData } : event,
        );

        // Find the updated base event
        const updatedBaseEvent = updatedEvents.find((e) => e.id === id);

        // Generate new recurrences if needed
        if (
          updatedBaseEvent &&
          updatedBaseEvent.isRecurring &&
          updatedBaseEvent.recurrencePattern &&
          updatedBaseEvent.recurrenceInterval
        ) {
          console.log("Regenerating recurring events after update");
          const newRecurrences = generateRecurringEvents(
            updatedBaseEvent,
            updatedBaseEvent.recurrencePattern,
            updatedBaseEvent.recurrenceInterval,
            updatedBaseEvent.recurrenceEndDate,
          );

          const finalEvents = [...updatedEvents, ...newRecurrences];
          setEvents(finalEvents);
          applyFilters(finalEvents, categories, showHolidays);
        } else {
          setEvents(updatedEvents);
          applyFilters(updatedEvents, categories, showHolidays);
        }
      } else {
        // Simple update for non-recurring events
        const updatedEvents = events.map((event) =>
          event.id === id ? { ...event, ...eventData } : event,
        );
        setEvents(updatedEvents);
        applyFilters(updatedEvents, categories, showHolidays);
      }
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  };

  const deleteEvent = (id: string) => {
    // Check if this is part of a recurring series
    const eventToDelete = events.find((e) => e.id === id);

    if (eventToDelete && eventToDelete.isRecurring) {
      // If it's a recurring event, ask if they want to delete just this one or the series
      // For now, we'll just delete this instance
      const baseEventId = id.includes("-recurrence-")
        ? id.split("-recurrence-")[0]
        : id;

      // Delete all recurrences
      const updatedEvents = events.filter((e) => !e.id.startsWith(baseEventId));
      setEvents(updatedEvents);
      applyFilters(updatedEvents, categories, showHolidays);
    } else {
      // Regular delete for non-recurring events
      const updatedEvents = events.filter((event) => event.id !== id);
      setEvents(updatedEvents);
      applyFilters(updatedEvents, categories, showHolidays);
    }
  };

  const toggleTaskCompletion = (id: string) => {
    const updatedEvents = events.map((event) =>
      event.id === id && event.type === "task"
        ? { ...event, completed: !event.completed }
        : event,
    );
    setEvents(updatedEvents);
    applyFilters(updatedEvents, categories, showHolidays);
  };

  const toggleCategoryVisibility = (id: string) => {
    const updatedCategories = categories.map((category) =>
      category.id === id
        ? { ...category, visible: !category.visible }
        : category,
    );
    setCategories(updatedCategories);
    applyFilters(events, updatedCategories, showHolidays);
  };

  const toggleHolidays = () => {
    setShowHolidays((prev) => !prev);
    applyFilters(events, categories, !showHolidays);
  };

  const applyFilters = (
    eventsList: CalendarEvent[],
    categoriesList: EventCategory[],
    showHols: boolean,
  ) => {
    const visibleCategoryIds = categoriesList
      .filter((category) => category.visible)
      .map((category) => category.id);

    const filtered = eventsList.filter((event) =>
      visibleCategoryIds.includes(event.categoryId),
    );

    // Convert holidays to calendar events if they should be shown
    const holidayEvents: CalendarEvent[] = showHols
      ? holidays.map((holiday) => {
          const holidayDate = parseISO(holiday.date);
          return {
            id: holiday.id,
            title: holiday.name,
            description: holiday.description,
            start: new Date(holidayDate.setHours(0, 0, 0, 0)).toISOString(),
            end: new Date(holidayDate.setHours(23, 59, 59, 999)).toISOString(),
            categoryId:
              holiday.type === "international"
                ? "international-holiday"
                : "local-holiday",
            isAllDay: true,
            type: "holiday",
          };
        })
      : [];

    setFilteredEvents([...filtered, ...holidayEvents]);
  };

  const searchEvents = (query: string) => {
    if (!query.trim()) {
      applyFilters(events, categories, showHolidays);
      return;
    }

    const lowerQuery = query.toLowerCase();

    // Search regular events
    const searchResults = events.filter((event) => {
      const matchesTitle = event.title.toLowerCase().includes(lowerQuery);
      const matchesDescription =
        event.description?.toLowerCase().includes(lowerQuery) || false;
      const matchesCategory =
        categories
          .find((c) => c.id === event.categoryId)
          ?.name.toLowerCase()
          .includes(lowerQuery) || false;

      return matchesTitle || matchesDescription || matchesCategory;
    });

    // Search holidays if they're enabled
    const holidayResults = showHolidays
      ? holidays
          .filter((holiday) => {
            return (
              holiday.name.toLowerCase().includes(lowerQuery) ||
              holiday.description?.toLowerCase().includes(lowerQuery) ||
              false
            );
          })
          .map((holiday) => {
            const holidayDate = parseISO(holiday.date);
            return {
              id: holiday.id,
              title: holiday.name,
              description: holiday.description,
              start: new Date(holidayDate.setHours(0, 0, 0, 0)).toISOString(),
              end: new Date(
                holidayDate.setHours(23, 59, 59, 999),
              ).toISOString(),
              categoryId:
                holiday.type === "international"
                  ? "international-holiday"
                  : "local-holiday",
              isAllDay: true,
              type: "holiday" as CalendarItemType,
            };
          })
      : [];

    setFilteredEvents([...searchResults, ...holidayResults]);
  };

  // Helper function to get an event by ID
  const getEventById = (id: string) => {
    return filteredEvents.find((event) => event.id === id);
  };

  // Helper function to check if an event is in a specific time slot
  const isEventInTimeSlot = (
    eventId: string,
    date: Date,
    hour: number,
    minutes: number,
  ) => {
    const event = filteredEvents.find((e) => e.id === eventId);
    if (!event) return false;

    const eventStart = parseISO(event.start);
    const eventEnd = parseISO(event.end);

    // Create a date object for the time slot
    const timeSlotStart = new Date(date);
    timeSlotStart.setHours(hour, minutes, 0, 0);

    const timeSlotEnd = new Date(timeSlotStart);
    timeSlotEnd.setMinutes(timeSlotStart.getMinutes() + 30);

    // Check if the event overlaps with the time slot
    return eventStart < timeSlotEnd && eventEnd > timeSlotStart;
  };

  // Helper function to check if a time slot is available (no all-day events)
  const isTimeSlotAvailable = (date: Date, hour: number, minutes: number) => {
    // Check if there are any all-day events on this date
    const allDayEvents = filteredEvents.filter((event) => {
      if (event.type === "holiday") return false; // Holidays don't block time slots

      const eventStart = parseISO(event.start);
      const eventEnd = parseISO(event.end);

      // Check if it's an all-day event on this date
      return (
        event.isAllDay &&
        isSameDay(date, eventStart) &&
        isWithinInterval(date, { start: eventStart, end: eventEnd })
      );
    });

    // If there are no all-day events, the time slot is available
    return allDayEvents.length === 0;
  };

  return (
    <CalendarContext.Provider
      value={{
        view,
        setView,
        selectedDate,
        setSelectedDate,
        isSidebarOpen,
        setIsSidebarOpen,
        events: filteredEvents,
        addEvent,
        updateEvent,
        deleteEvent,
        toggleTaskCompletion,
        showEventModal,
        setShowEventModal,
        selectedEvent,
        setSelectedEvent,
        categories,
        toggleCategoryVisibility,
        searchEvents,
        holidays,
        showHolidays,
        toggleHolidays,
        activeItemType,
        setActiveItemType,
        getEventById,
        isEventInTimeSlot,
        isTimeSlotAvailable,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

// Hook for using the context
export function useCalendarContext() {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error(
      "useCalendarContext must be used within a CalendarProvider",
    );
  }
  return context;
}
