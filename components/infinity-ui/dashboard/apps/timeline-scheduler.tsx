"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Edit,
  Filter,
  Plus,
  Search,
  Trash2,
  User,
  X,
  CalendarDays,
  CalendarClock,
  CalendarRange,
} from "lucide-react";

// Types for our data
interface Event {
  id: string;
  title: string;
  description: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  category: string;
  assignees: string[];
  color: string;
}

interface TimeSlot {
  hour: number;
  minute: number;
  label: string;
}

const TimelineScheduler = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAssignee, setSelectedAssignee] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("day");
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    description: "",
    category: "",
    assignees: [],
    color: "#6366f1", // Default indigo
  });
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [visibleHours, setVisibleHours] = useState<number[]>([]);
  const [isAddingAssignee, setIsAddingAssignee] = useState(false);
  const [newAssigneeName, setNewAssigneeName] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Check if system prefers dark mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(isDark);

      if (isDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Initialize sample data
  useEffect(() => {
    // Generate time slots
    const slots: TimeSlot[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
        const period = hour < 12 ? "AM" : "PM";
        const label = `${formattedHour}:${minute === 0 ? "00" : minute} ${period}`;
        slots.push({ hour, minute, label });
      }
    }
    setTimeSlots(slots);

    // Set visible hours (8 AM to 8 PM by default)
    const hours = Array.from({ length: 13 }, (_, i) => i + 8);
    setVisibleHours(hours);

    // Sample events
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const sampleEvents: Event[] = [
      {
        id: "event-1",
        title: "Team Meeting",
        description: "Weekly team sync to discuss project progress",
        startTime: new Date(today.setHours(10, 0, 0, 0)).toISOString(),
        endTime: new Date(today.setHours(11, 0, 0, 0)).toISOString(),
        category: "Meeting",
        assignees: ["Alex Johnson", "Sarah Chen", "Miguel Rodriguez"],
        color: "#6366f1", // Indigo
      },
      {
        id: "event-2",
        title: "Client Call",
        description: "Discuss new requirements with the client",
        startTime: new Date(today.setHours(14, 0, 0, 0)).toISOString(),
        endTime: new Date(today.setHours(15, 0, 0, 0)).toISOString(),
        category: "Call",
        assignees: ["Alex Johnson", "Priya Patel"],
        color: "#8b5cf6", // Violet
      },
      {
        id: "event-3",
        title: "Lunch Break",
        description: "Team lunch at the nearby restaurant",
        startTime: new Date(today.setHours(12, 0, 0, 0)).toISOString(),
        endTime: new Date(today.setHours(13, 0, 0, 0)).toISOString(),
        category: "Break",
        assignees: [
          "Alex Johnson",
          "Sarah Chen",
          "Miguel Rodriguez",
          "Priya Patel",
          "James Wilson",
        ],
        color: "#10b981", // Emerald
      },
      {
        id: "event-4",
        title: "Design Review",
        description: "Review new UI designs with the design team",
        startTime: new Date(tomorrow.setHours(11, 0, 0, 0)).toISOString(),
        endTime: new Date(tomorrow.setHours(12, 30, 0, 0)).toISOString(),
        category: "Meeting",
        assignees: ["Sarah Chen", "James Wilson"],
        color: "#f59e0b", // Amber
      },
      {
        id: "event-5",
        title: "Code Review",
        description: "Review pull requests and merge code",
        startTime: new Date(yesterday.setHours(15, 0, 0, 0)).toISOString(),
        endTime: new Date(yesterday.setHours(16, 0, 0, 0)).toISOString(),
        category: "Development",
        assignees: ["Miguel Rodriguez", "Priya Patel"],
        color: "#ef4444", // Red
      },
    ];

    setEvents(sampleEvents);
  }, []);

  // Get all unique categories
  const getUniqueCategories = () => {
    const categories = new Set<string>();
    events.forEach((event) => {
      categories.add(event.category);
    });
    return Array.from(categories);
  };

  // Get all unique assignees
  const getUniqueAssignees = () => {
    const assignees = new Set<string>();
    events.forEach((event) => {
      event.assignees.forEach((assignee) => {
        assignees.add(assignee);
      });
    });
    return Array.from(assignees);
  };

  // Filter events based on search and filters
  const getFilteredEvents = () => {
    return events.filter((event) => {
      // Search filter
      const matchesSearch =
        !searchTerm ||
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory =
        !selectedCategory || event.category === selectedCategory;

      // Assignee filter
      const matchesAssignee =
        !selectedAssignee || event.assignees.includes(selectedAssignee);

      return matchesSearch && matchesCategory && matchesAssignee;
    });
  };

  // Get events for the current view (day, week, month)
  const getEventsForCurrentView = () => {
    const filteredEvents = getFilteredEvents();

    if (viewMode === "day") {
      return filteredEvents.filter((event) => {
        const eventDate = new Date(event.startTime);
        return (
          eventDate.getDate() === currentDate.getDate() &&
          eventDate.getMonth() === currentDate.getMonth() &&
          eventDate.getFullYear() === currentDate.getFullYear()
        );
      });
    }

    if (viewMode === "week") {
      const startOfWeek = new Date(currentDate);
      const dayOfWeek = currentDate.getDay();
      startOfWeek.setDate(currentDate.getDate() - dayOfWeek);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      return filteredEvents.filter((event) => {
        const eventDate = new Date(event.startTime);
        return eventDate >= startOfWeek && eventDate <= endOfWeek;
      });
    }

    // Month view
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    );

    return filteredEvents.filter((event) => {
      const eventDate = new Date(event.startTime);
      return eventDate >= startOfMonth && eventDate <= endOfMonth;
    });
  };

  const eventsForCurrentView = getEventsForCurrentView();

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Navigate to previous day/week/month
  const navigatePrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "day") {
      newDate.setDate(newDate.getDate() - 1);
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  // Navigate to next day/week/month
  const navigateNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "day") {
      newDate.setDate(newDate.getDate() + 1);
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  // Navigate to today
  const navigateToday = () => {
    setCurrentDate(new Date());
  };

  // Get position and height for an event in the timeline
  const getEventStyle = (event: Event) => {
    const startTime = new Date(event.startTime);
    const endTime = new Date(event.endTime);

    const startHour = startTime.getHours() + startTime.getMinutes() / 60;
    const endHour = endTime.getHours() + endTime.getMinutes() / 60;

    const top = (startHour - visibleHours[0]) * 60; // 60px per hour
    const height = (endHour - startHour) * 60;

    return {
      top: `${top}px`,
      height: `${height}px`,
      backgroundColor: event.color,
    };
  };

  // Handle click on a date cell
  const handleDateClick = (date: Date) => {
    // Set the selected date
    setSelectedDate(date);

    // Set default start and end times (9 AM to 10 AM)
    const startTime = new Date(date);
    startTime.setHours(9, 0, 0, 0);

    const endTime = new Date(date);
    endTime.setHours(10, 0, 0, 0);

    // Update the new event with the selected date and times
    setNewEvent({
      ...newEvent,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    });

    // Open the add event modal
    setIsAddingEvent(true);
  };

  // Add a new event
  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.startTime || !newEvent.endTime) return;

    const event: Event = {
      id: `event-${Date.now()}`,
      title: newEvent.title,
      description: newEvent.description || "",
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      category: newEvent.category || "Other",
      assignees: newEvent.assignees || [],
      color: newEvent.color || "#6366f1",
    };

    setEvents((prevEvents) => [...prevEvents, event]);
    setNewEvent({
      title: "",
      description: "",
      category: "",
      assignees: [],
      color: "#6366f1",
    });
    setIsAddingEvent(false);
    setSelectedDate(null);
  };

  // Update an existing event
  const handleUpdateEvent = () => {
    if (!editingEvent || !editingEvent.title) return;

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === editingEvent.id ? editingEvent : event,
      ),
    );
    setEditingEvent(null);
  };

  // Delete an event
  const handleDeleteEvent = (eventId: string) => {
    setEventToDelete(eventId);
    setIsConfirmingDelete(true);
  };

  const confirmDeleteEvent = () => {
    if (!eventToDelete) return;

    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventToDelete),
    );
    setEventToDelete(null);
    setIsConfirmingDelete(false);
    setIsEventDetailsOpen(false);
  };

  // Add an assignee to an event
  const handleAddAssignee = () => {
    if (!newAssigneeName || !editingEvent) return;

    const updatedAssignees = [
      ...(editingEvent.assignees || []),
      newAssigneeName,
    ];
    setEditingEvent({ ...editingEvent, assignees: updatedAssignees });
    setNewAssigneeName("");
    setIsAddingAssignee(false);
  };

  // Remove an assignee from an event
  const handleRemoveAssignee = (assignee: string) => {
    if (!editingEvent) return;

    const updatedAssignees = editingEvent.assignees.filter(
      (a) => a !== assignee,
    );
    setEditingEvent({ ...editingEvent, assignees: updatedAssignees });
  };

  // Get days of the week for week view
  const getDaysOfWeek = () => {
    const days = [];
    const startOfWeek = new Date(currentDate);
    const dayOfWeek = currentDate.getDay();
    startOfWeek.setDate(currentDate.getDate() - dayOfWeek);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }

    return days;
  };

  // Get days of the month for month view
  const getDaysOfMonth = () => {
    const days = [];
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    );

    // Get the first day of the month
    const firstDayOfMonth = startOfMonth.getDay();

    // Get the last day of the previous month
    const lastDayOfPrevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0,
    ).getDate();

    // Add days from previous month to fill the first week
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        lastDayOfPrevMonth - i,
      );
      days.push({ date: day, isCurrentMonth: false });
    }

    // Add days of the current month
    for (let i = 1; i <= endOfMonth.getDate(); i++) {
      const day = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i,
      );
      days.push({ date: day, isCurrentMonth: true });
    }

    // Add days from next month to fill the last week
    const lastDayOfMonth = endOfMonth.getDay();
    for (let i = 1; i < 7 - lastDayOfMonth; i++) {
      const day = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        i,
      );
      days.push({ date: day, isCurrentMonth: false });
    }

    return days;
  };

  // Check if an event is on a specific day
  const isEventOnDay = (event: Event, date: Date) => {
    const eventDate = new Date(event.startTime);
    return (
      eventDate.getDate() === date.getDate() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getFullYear() === date.getFullYear()
    );
  };

  // Get events for a specific day
  const getEventsForDay = (date: Date) => {
    return getFilteredEvents().filter((event) => isEventOnDay(event, date));
  };

  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 px-4 py-10 dark:from-gray-950 dark:to-gray-900">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-gray-200/50 bg-white shadow-xl dark:border-gray-800/50 dark:bg-gray-800/90">
        {/* Header */}
        <div className="flex flex-col items-center justify-between border-b border-gray-100 p-6 dark:border-gray-700/50 sm:flex-row">
          <div>
            <h2 className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-2xl font-bold text-transparent dark:from-indigo-400 dark:to-violet-400">
              Timeline Scheduler
            </h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Manage and schedule your events
            </p>
          </div>

          <div className="mt-4 flex flex-col items-center space-x-3 sm:mt-0 sm:flex-row">
            <button
              onClick={() => setIsAddingEvent(true)}
              className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-200 hover:from-indigo-700 hover:to-violet-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:from-indigo-500 dark:to-violet-500 dark:hover:from-indigo-600 dark:hover:to-violet-600 sm:w-fit"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </button>

            <div className="mt-4 flex items-center space-x-3 sm:mt-0">
              <div className="flex rounded-full shadow-sm">
                <button
                  onClick={() => setViewMode("day")}
                  className={`flex items-center px-3 py-2 text-sm font-medium ${
                    viewMode === "day"
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white dark:from-indigo-500 dark:to-violet-500"
                      : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                  } rounded-l-full border border-gray-200 dark:border-gray-700`}
                >
                  <CalendarClock className="mr-1.5 h-4 w-4" />
                  Day
                </button>
                <button
                  onClick={() => setViewMode("week")}
                  className={`flex items-center px-3 py-2 text-sm font-medium ${
                    viewMode === "week"
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white dark:from-indigo-500 dark:to-violet-500"
                      : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                  } border-y border-gray-200 dark:border-gray-700`}
                >
                  <CalendarRange className="mr-1.5 h-4 w-4" />
                  Week
                </button>
                <button
                  onClick={() => setViewMode("month")}
                  className={`flex items-center px-3 py-2 text-sm font-medium ${
                    viewMode === "month"
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white dark:from-indigo-500 dark:to-violet-500"
                      : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                  } rounded-r-full border border-gray-200 dark:border-gray-700`}
                >
                  <CalendarDays className="mr-1.5 h-4 w-4" />
                  Month
                </button>
              </div>

              <button
                onClick={toggleDarkMode}
                className="rounded-full bg-gray-100 p-2.5 text-gray-600 shadow-sm transition-all duration-200 hover:bg-gray-200 hover:shadow-md dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
              >
                {isDarkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 bg-gray-50/50 p-4 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50 dark:backdrop-blur-sm">
          <div className="relative min-w-[240px] flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              className="block w-full rounded-full border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/50"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="rounded-full border border-gray-200 bg-white p-2.5 text-sm text-gray-700 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/50"
            >
              <option value="">All Categories</option>
              {getUniqueCategories().map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={selectedAssignee || ""}
              onChange={(e) => setSelectedAssignee(e.target.value || null)}
              className="rounded-full border border-gray-200 bg-white p-2.5 text-sm text-gray-700 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/50"
            >
              <option value="">All Assignees</option>
              {getUniqueAssignees().map((assignee) => (
                <option key={assignee} value={assignee}>
                  {assignee}
                </option>
              ))}
            </select>

            <button className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </button>
          </div>
        </div>

        {/* Date Navigation */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-white p-4 dark:border-gray-700/50 dark:bg-gray-800">
          <div className="flex items-center space-x-2">
            <button
              onClick={navigatePrevious}
              className="rounded-full p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={navigateToday}
              className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Today
            </button>

            <button
              onClick={navigateNext}
              className="rounded-full p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <h3 className="text-sm font-medium text-gray-900 dark:text-white sm:text-base lg:text-lg">
            {viewMode === "day" && formatDate(currentDate)}
            {viewMode === "week" && (
              <>
                {formatDate(getDaysOfWeek()[0])} -{" "}
                {formatDate(getDaysOfWeek()[6])}
              </>
            )}
            {viewMode === "month" && (
              <>
                {currentDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </>
            )}
          </h3>
        </div>

        {/* Calendar View */}
        <div className="overflow-x-auto">
          {/* Day View */}
          {viewMode === "day" && (
            <div className="relative min-h-[600px] p-6">
              <div className="absolute left-0 top-0 w-20 rounded-lg border-r border-gray-100 bg-gray-50/70 dark:border-gray-700/50 dark:bg-gray-700/50">
                {visibleHours.map((hour) => (
                  <div
                    key={hour}
                    className="flex h-[60px] items-center justify-center border-b border-gray-100 text-xs font-medium text-gray-500 dark:border-gray-700/50 dark:text-gray-400"
                  >
                    {hour % 12 === 0 ? 12 : hour % 12} {hour < 12 ? "AM" : "PM"}
                  </div>
                ))}
              </div>

              <div className="ml-20">
                <div
                  ref={timelineRef}
                  className="relative"
                  onClick={() => {
                    // Create a new date at the clicked time
                    const date = new Date(currentDate);
                    // Set default time to 9 AM
                    date.setHours(9, 0, 0, 0);
                    handleDateClick(date);
                  }}
                >
                  {visibleHours.map((hour) => (
                    <div
                      key={hour}
                      className="h-[60px] cursor-pointer border-b border-gray-100 hover:bg-gray-50/70 dark:border-gray-700/50 dark:hover:bg-gray-700/30"
                    ></div>
                  ))}

                  {eventsForCurrentView.map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="absolute left-0 right-4 cursor-pointer overflow-hidden rounded-lg p-3 text-white shadow-md transition-all duration-200 hover:shadow-lg"
                      style={getEventStyle(event)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(event);
                        setIsEventDetailsOpen(true);
                      }}
                    >
                      <div className="flex h-full flex-col overflow-hidden">
                        <div className="font-medium">{event.title}</div>
                        <div className="text-xs opacity-90">
                          {formatTime(event.startTime)} -{" "}
                          {formatTime(event.endTime)}
                        </div>
                        {event.assignees.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {event.assignees.slice(0, 2).map((assignee) => (
                              <span
                                key={assignee}
                                className="inline-flex items-center rounded-full bg-white/20 px-2 py-0.5 text-xs"
                              >
                                {assignee}
                              </span>
                            ))}
                            {event.assignees.length > 2 && (
                              <span className="inline-flex items-center rounded-full bg-white/20 px-2 py-0.5 text-xs">
                                +{event.assignees.length - 2}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Week View */}
          {viewMode === "week" && (
            <div className="min-h-[600px]">
              <div className="grid grid-cols-7 border-b border-gray-100 dark:border-gray-700/50">
                {getDaysOfWeek().map((day, index) => (
                  <div
                    key={index}
                    className={`p-4 text-center ${isToday(day) ? "bg-indigo-50 dark:bg-indigo-900/20" : ""}`}
                  >
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {day.toLocaleDateString("en-US", { weekday: "short" })}
                    </div>
                    <div
                      className={`mt-1 text-lg font-bold ${
                        isToday(day)
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {day.getDate()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7">
                {getDaysOfWeek().map((day, index) => (
                  <div
                    key={index}
                    className="min-h-[500px] border-r border-gray-100 p-3 last:border-r-0 dark:border-gray-700/50"
                    onClick={() => handleDateClick(day)}
                  >
                    {getEventsForDay(day).map((event) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-2 cursor-pointer overflow-hidden rounded-lg p-3 text-white shadow-md transition-all duration-200 hover:shadow-lg"
                        style={{ backgroundColor: event.color }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEvent(event);
                          setIsEventDetailsOpen(true);
                        }}
                      >
                        <div className="font-medium">{event.title}</div>
                        <div className="text-xs opacity-90">
                          {formatTime(event.startTime)} -{" "}
                          {formatTime(event.endTime)}
                        </div>
                        {event.assignees.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {event.assignees.length > 0 && (
                              <span className="inline-flex items-center rounded-full bg-white/20 px-2 py-0.5 text-xs">
                                {event.assignees[0]}
                                {event.assignees.length > 1 &&
                                  ` +${event.assignees.length - 1}`}
                              </span>
                            )}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Month View */}
          {viewMode === "month" && (
            <div className="min-h-[600px]">
              <div className="grid grid-cols-7 border-b border-gray-100 dark:border-gray-700/50">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="p-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400"
                    >
                      {day}
                    </div>
                  ),
                )}
              </div>

              <div className="grid grid-cols-7">
                {getDaysOfMonth().map((dayObj, index) => (
                  <div
                    key={index}
                    className={`min-h-[120px] border-b border-r border-gray-100 p-2 last:border-r-0 dark:border-gray-700/50 ${
                      !dayObj.isCurrentMonth
                        ? "bg-gray-50/70 dark:bg-gray-700/30"
                        : isToday(dayObj.date)
                          ? "bg-indigo-50 dark:bg-indigo-900/20"
                          : ""
                    }`}
                    onClick={() => handleDateClick(dayObj.date)}
                  >
                    <div
                      className={`text-right text-sm ${
                        !dayObj.isCurrentMonth
                          ? "text-gray-400 dark:text-gray-500"
                          : isToday(dayObj.date)
                            ? "font-medium text-indigo-600 dark:text-indigo-400"
                            : "font-medium text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {dayObj.date.getDate()}
                    </div>

                    <div className="mt-1 space-y-1">
                      {getEventsForDay(dayObj.date)
                        .slice(0, 3)
                        .map((event) => (
                          <div
                            key={event.id}
                            className="cursor-pointer truncate rounded-md px-2 py-1 text-xs text-white shadow-sm transition-all duration-200 hover:shadow-md"
                            style={{ backgroundColor: event.color }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEvent(event);
                              setIsEventDetailsOpen(true);
                            }}
                          >
                            {event.title}
                          </div>
                        ))}

                      {getEventsForDay(dayObj.date).length > 3 && (
                        <div
                          className="cursor-pointer rounded-md bg-gray-100 px-2 py-1 text-center text-xs font-medium text-gray-600 shadow-sm transition-all duration-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Here you could show a modal with all events for this day
                          }}
                        >
                          +{getEventsForDay(dayObj.date).length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Add/Edit Event Modal */}
        <AnimatePresence>
          {(isAddingEvent || editingEvent) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {isAddingEvent ? "Add New Event" : "Edit Event"}
                  </h3>
                  <button
                    onClick={() => {
                      setIsAddingEvent(false);
                      setEditingEvent(null);
                      setSelectedDate(null);
                    }}
                    className="rounded-full p-2 text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="Event title"
                      className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2.5 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/50"
                      value={
                        isAddingEvent ? newEvent.title : editingEvent?.title
                      }
                      onChange={(e) =>
                        isAddingEvent
                          ? setNewEvent({ ...newEvent, title: e.target.value })
                          : setEditingEvent({
                              ...editingEvent!,
                              title: e.target.value,
                            })
                      }
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </label>
                    <textarea
                      className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2.5 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/50"
                      rows={3}
                      placeholder="Event description"
                      value={
                        isAddingEvent
                          ? newEvent.description
                          : editingEvent?.description
                      }
                      onChange={(e) =>
                        isAddingEvent
                          ? setNewEvent({
                              ...newEvent,
                              description: e.target.value,
                            })
                          : setEditingEvent({
                              ...editingEvent!,
                              description: e.target.value,
                            })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Start Time
                    </label>
                    <input
                      type="datetime-local"
                      className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2.5 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/50"
                      value={
                        isAddingEvent
                          ? newEvent.startTime
                            ? new Date(newEvent.startTime)
                                .toISOString()
                                .slice(0, 16)
                            : ""
                          : editingEvent?.startTime
                            ? new Date(editingEvent.startTime)
                                .toISOString()
                                .slice(0, 16)
                            : ""
                      }
                      onChange={(e) =>
                        isAddingEvent
                          ? setNewEvent({
                              ...newEvent,
                              startTime: e.target.value,
                            })
                          : setEditingEvent({
                              ...editingEvent!,
                              startTime: e.target.value,
                            })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      End Time
                    </label>
                    <input
                      type="datetime-local"
                      className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2.5 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/50"
                      value={
                        isAddingEvent
                          ? newEvent.endTime
                            ? new Date(newEvent.endTime)
                                .toISOString()
                                .slice(0, 16)
                            : ""
                          : editingEvent?.endTime
                            ? new Date(editingEvent.endTime)
                                .toISOString()
                                .slice(0, 16)
                            : ""
                      }
                      onChange={(e) =>
                        isAddingEvent
                          ? setNewEvent({
                              ...newEvent,
                              endTime: e.target.value,
                            })
                          : setEditingEvent({
                              ...editingEvent!,
                              endTime: e.target.value,
                            })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Category
                    </label>
                    <input
                      placeholder="Event category"
                      type="text"
                      className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2.5 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/50"
                      value={
                        isAddingEvent
                          ? newEvent.category
                          : editingEvent?.category
                      }
                      onChange={(e) =>
                        isAddingEvent
                          ? setNewEvent({
                              ...newEvent,
                              category: e.target.value,
                            })
                          : setEditingEvent({
                              ...editingEvent!,
                              category: e.target.value,
                            })
                      }
                      list="categories"
                    />
                    <datalist id="categories">
                      {getUniqueCategories().map((category) => (
                        <option key={category} value={category} />
                      ))}
                    </datalist>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Color
                    </label>
                    <input
                      type="color"
                      className="mt-1 h-10 w-full rounded-lg border border-gray-200 p-1 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:border-gray-700 dark:bg-gray-700"
                      value={
                        isAddingEvent ? newEvent.color : editingEvent?.color
                      }
                      onChange={(e) =>
                        isAddingEvent
                          ? setNewEvent({ ...newEvent, color: e.target.value })
                          : setEditingEvent({
                              ...editingEvent!,
                              color: e.target.value,
                            })
                      }
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Assignees
                    </label>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {(isAddingEvent
                        ? newEvent.assignees
                        : editingEvent?.assignees
                      )?.map((assignee) => (
                        <div
                          key={assignee}
                          className="flex items-center rounded-full bg-indigo-100 px-3 py-1.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
                        >
                          <span>{assignee}</span>
                          <button
                            onClick={() => handleRemoveAssignee(assignee)}
                            className="ml-1.5 rounded-full p-0.5 text-indigo-600 transition-colors duration-200 hover:bg-indigo-200 hover:text-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-800/50 dark:hover:text-indigo-300"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}

                      {isAddingAssignee ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            className="rounded-l-lg border border-gray-200 px-3 py-1.5 text-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/50"
                            value={newAssigneeName}
                            onChange={(e) => setNewAssigneeName(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleAddAssignee();
                              }
                            }}
                            placeholder="Enter assignee"
                            autoFocus
                            list="assignees"
                          />
                          <datalist id="assignees">
                            {getUniqueAssignees().map((assignee) => (
                              <option key={assignee} value={assignee} />
                            ))}
                          </datalist>
                          <button
                            onClick={handleAddAssignee}
                            className="rounded-r-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition-colors duration-200 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
                          >
                            Add
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setIsAddingAssignee(true)}
                          className="flex items-center rounded-full border border-dashed border-gray-300 px-3 py-1.5 text-xs text-gray-500 transition-colors duration-200 hover:border-indigo-300 hover:text-indigo-600 dark:border-gray-700 dark:text-gray-400 dark:hover:border-indigo-600/50 dark:hover:text-indigo-400"
                        >
                          <Plus className="mr-1 h-3 w-3" />
                          Add Assignee
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setIsAddingEvent(false);
                      setEditingEvent(null);
                      setSelectedDate(null);
                    }}
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={isAddingEvent ? handleAddEvent : handleUpdateEvent}
                    className="rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-200 hover:from-indigo-700 hover:to-violet-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:from-indigo-500 dark:to-violet-500 dark:hover:from-indigo-600 dark:hover:to-violet-600"
                  >
                    {isAddingEvent ? "Add Event" : "Update Event"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Event Details Modal */}
        <AnimatePresence>
          {isEventDetailsOpen && selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Event Details
                  </h3>
                  <button
                    onClick={() => setIsEventDetailsOpen(false)}
                    className="rounded-full p-2 text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {selectedEvent.title}
                    </h2>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingEvent(selectedEvent);
                          setIsEventDetailsOpen(false);
                        }}
                        className="rounded-full p-2 text-indigo-600 transition-colors duration-200 hover:bg-indigo-100 hover:text-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-300"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(selectedEvent.id)}
                        className="rounded-full p-2 text-rose-600 transition-colors duration-200 hover:bg-rose-100 hover:text-rose-800 dark:text-rose-400 dark:hover:bg-rose-900/30 dark:hover:text-rose-300"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span
                      className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium text-white"
                      style={{ backgroundColor: selectedEvent.color }}
                    >
                      {selectedEvent.category}
                    </span>

                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                      <Calendar className="mr-1 h-3 w-3" />
                      {formatDate(new Date(selectedEvent.startTime))}
                    </span>

                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                      <Clock className="mr-1 h-3 w-3" />
                      {formatTime(selectedEvent.startTime)} -{" "}
                      {formatTime(selectedEvent.endTime)}
                    </span>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </h4>
                    <p className="mt-2 whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-gray-600 dark:bg-gray-700/50 dark:text-gray-300">
                      {selectedEvent.description || "No description provided."}
                    </p>
                  </div>

                  {selectedEvent.assignees.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-700 dark:text-gray-300">
                        Assignees
                      </h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedEvent.assignees.map((assignee) => (
                          <div
                            key={assignee}
                            className="flex items-center rounded-full bg-indigo-100 px-3 py-1.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
                          >
                            <User className="mr-1 h-3 w-3" />
                            {assignee}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => setIsEventDetailsOpen(false)}
                      className="rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-200 hover:from-indigo-700 hover:to-violet-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:from-indigo-500 dark:to-violet-500 dark:hover:from-indigo-600 dark:hover:to-violet-600"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {isConfirmingDelete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800"
              >
                <div className="text-center">
                  <AlertCircle className="mx-auto h-12 w-12 text-rose-500" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                    Delete Event
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this event? This action
                    cannot be undone.
                  </p>
                </div>

                <div className="mt-6 flex justify-center space-x-3">
                  <button
                    onClick={() => setIsConfirmingDelete(false)}
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDeleteEvent}
                    className="rounded-lg bg-gradient-to-r from-rose-600 to-pink-600 px-4 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-200 hover:from-rose-700 hover:to-pink-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 dark:from-rose-500 dark:to-pink-500 dark:hover:from-rose-600 dark:hover:to-pink-600"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <style jsx>{`
        ::-webkit-scrollbar {
          height: 0.5rem;
          width: 0.5rem;
          background-color: transparent;
        }
        ::-webkit-scrollbar-thumb {
          border-radius: 1rem;
          background-color: rgba(107, 114, 128, 0.5);
        }
        ::-webkit-scrollbar-track {
          background-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default TimelineScheduler;
