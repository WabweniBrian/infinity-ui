"use client";

import DarkModeToggle from "@/components/common/dark-mode-toggle";
import { motion } from "framer-motion";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
} from "lucide-react";
import { useState } from "react";

const SimpleSchedule = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<null | {
    id: string;
    title: string;
    description: string;
    participants: string[];
    location: string;
  }>(null);

  // Days of the week
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Time slots
  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  // Events data with row and column spanning
  const events = [
    {
      id: "evt1",
      title: "Team Meeting",
      day: 0, // Monday
      startTime: 1, // 10:00 AM
      duration: 2, // 2 hours
      participants: [
        "Alex Johnson",
        "Maria Garcia",
        "James Wilson",
        "Sarah Chen",
      ],
      location: "Conference Room A",
      description: "Weekly team sync to discuss project progress and blockers",
      color:
        "bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-300",
    },
    {
      id: "evt2",
      title: "Product Demo",
      day: 2, // Wednesday
      startTime: 3, // 12:00 PM
      duration: 1, // 1 hour
      participants: ["Alex Johnson", "Client Team", "Product Manager"],
      location: "Demo Room",
      description: "Demonstration of new features to the client team",
      color:
        "bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700 text-purple-800 dark:text-purple-300",
    },
    {
      id: "evt3",
      title: "Design Workshop",
      day: 1, // Tuesday
      startTime: 5, // 2:00 PM
      duration: 3, // 3 hours
      participants: ["Design Team", "Product Manager", "Frontend Developers"],
      location: "Creative Space",
      description:
        "Collaborative workshop to finalize the new dashboard design",
      color:
        "bg-pink-100 dark:bg-pink-900/30 border-pink-300 dark:border-pink-700 text-pink-800 dark:text-pink-300",
    },
    {
      id: "evt4",
      title: "Client Call",
      day: 4, // Friday
      startTime: 0, // 9:00 AM
      duration: 1, // 1 hour
      participants: [
        "Account Manager",
        "Client Representative",
        "Project Lead",
      ],
      location: "Virtual Meeting",
      description: "Monthly progress update with the client",
      color:
        "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-800 dark:text-green-300",
    },
    {
      id: "evt5",
      title: "Planning Session",
      day: 3, // Thursday
      startTime: 6, // 3:00 PM
      duration: 2, // 2 hours
      participants: ["Project Managers", "Team Leads", "Stakeholders"],
      location: "Strategy Room",
      description: "Quarterly planning session for upcoming projects",
      color:
        "bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300",
    },
    {
      id: "evt6",
      title: "Lunch & Learn",
      day: 2, // Wednesday
      startTime: 2, // 11:00 AM
      duration: 1, // 1 hour
      participants: ["All Staff"],
      location: "Cafeteria",
      description: "Educational session during lunch about new technologies",
      color:
        "bg-teal-100 dark:bg-teal-900/30 border-teal-300 dark:border-teal-700 text-teal-800 dark:text-teal-300",
    },
    {
      id: "evt7",
      title: "All-Hands",
      day: 0, // Monday
      startTime: 7, // 4:00 PM
      duration: 1, // 1 hour
      participants: ["All Departments"],
      location: "Main Hall",
      description: "Company-wide meeting for important announcements",
      color:
        "bg-indigo-100 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700 text-indigo-800 dark:text-indigo-300",
    },
  ];

  const handlePreviousWeek = () => {
    setCurrentWeek(currentWeek - 1);
  };

  const handleNextWeek = () => {
    setCurrentWeek(currentWeek + 1);
  };

  // Get current week dates
  const getCurrentWeekDates = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1 + currentWeek * 7); // Monday of current week

    return days.map((day, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      return {
        day,
        date: date.getDate(),
        month: date.toLocaleString("default", { month: "short" }),
      };
    });
  };

  const weekDates = getCurrentWeekDates();

  return (
    <div className="min-h-screen overflow-hidden bg-white px-4 py-10 dark:bg-gray-950">
      {/* DarkMode Toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-7xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl transition-all duration-300 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-col items-center justify-center border-b border-gray-200 p-6 text-center dark:border-gray-700 sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Team Schedule
            </h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Weekly calendar view with events
            </p>
          </div>
          <div className="mt-4 flex items-center space-x-2 sm:mt-0">
            <button
              onClick={handlePreviousWeek}
              className="rounded-full p-2 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ChevronLeft className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
            <div className="flex items-center rounded-md bg-gray-100 px-3 py-1 dark:bg-gray-700">
              <Calendar className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {weekDates[0].month} {weekDates[0].date} - {weekDates[4].month}{" "}
                {weekDates[4].date}
              </span>
            </div>
            <button
              onClick={handleNextWeek}
              className="rounded-full p-2 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="w-20 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Time
                </th>
                {weekDates.map((date, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {date.day}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {date.month} {date.date}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
              {timeSlots.map((time, timeIndex) => (
                <tr
                  key={timeIndex}
                  className={
                    timeIndex % 2 === 0
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-50 dark:bg-gray-700"
                  }
                >
                  <td className="whitespace-nowrap border-r border-gray-200 px-4 py-4 text-sm font-medium text-gray-900 dark:border-gray-700 dark:text-white">
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-gray-400" />
                      {time}
                    </div>
                  </td>
                  {days.map((_, dayIndex) => {
                    // Find event that starts at this time slot and day
                    const event = events.find(
                      (e) => e.day === dayIndex && e.startTime === timeIndex,
                    );

                    // If there's an event and it's the starting time slot
                    if (event) {
                      return (
                        <td
                          key={`${dayIndex}-${timeIndex}`}
                          rowSpan={event.duration}
                          className={`relative px-2 py-1 ${event.color} m-1 rounded-md border-l-4`}
                        >
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="h-full cursor-pointer p-2"
                            onClick={() =>
                              setSelectedEvent({
                                id: event.id,
                                title: event.title,
                                description: event.description,
                                participants: event.participants,
                                location: event.location,
                              })
                            }
                          >
                            <h3 className="font-medium">{event.title}</h3>
                            <div className="mt-1 flex items-center text-xs">
                              <span>
                                {timeSlots[event.startTime]} -{" "}
                                {
                                  timeSlots[
                                    event.startTime + event.duration - 1
                                  ]
                                }
                              </span>
                            </div>
                            <div className="mt-1 flex items-center text-xs">
                              <Users className="mr-1 h-3 w-3" />
                              <span>
                                {event.participants.length} participants
                              </span>
                            </div>
                          </motion.div>
                        </td>
                      );
                    }

                    // Check if this cell is part of an event's duration (not the starting cell)
                    const isPartOfEvent = events.some(
                      (e) =>
                        e.day === dayIndex &&
                        e.startTime < timeIndex &&
                        e.startTime + e.duration > timeIndex,
                    );

                    // If it's not part of any event, render an empty cell
                    if (!isPartOfEvent) {
                      return (
                        <td
                          key={`${dayIndex}-${timeIndex}`}
                          className="whitespace-nowrap border border-gray-100 px-4 py-4 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400"
                        ></td>
                      );
                    }

                    // If it's part of an event but not the starting cell, return null (the rowSpan takes care of it)
                    return null;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="m-4 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-700"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedEvent.title}
              </h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ×
              </button>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {selectedEvent.description}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Location
                </h4>
                <p className="text-gray-800 dark:text-gray-200">
                  {selectedEvent.location}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Participants
                </h4>
                <ul className="text-gray-800 dark:text-gray-200">
                  {selectedEvent.participants.map((participant, index) => (
                    <li key={index} className="text-sm">
                      {participant}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <style jsx>{`
        ::-webkit-scrollbar {
          height: 0.5rem;
          width: 0.5rem;
          background-color: transparent;
        }
        ::-webkit-scrollbar-thumb {
          border-radius: 1rem;
          background-color: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default SimpleSchedule;
