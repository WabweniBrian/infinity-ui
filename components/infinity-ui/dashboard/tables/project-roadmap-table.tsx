"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  Download,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const ProjectRoadmapTable = () => {
  const [expandedQuarters, setExpandedQuarters] = useState<
    Record<string, boolean>
  >({
    Q1: true,
    Q2: true,
    Q3: true,
    Q4: true,
  });

  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Project phases with column spanning
  const quarters = [
    { id: "Q1", name: "Q1 2023", months: ["January", "February", "March"] },
    { id: "Q2", name: "Q2 2023", months: ["April", "May", "June"] },
    { id: "Q3", name: "Q3 2023", months: ["July", "August", "September"] },
    { id: "Q4", name: "Q4 2023", months: ["October", "November", "December"] },
  ];

  // Project tasks with timeline spanning
  const tasks = [
    {
      id: "task1",
      name: "Research & Planning",
      description: "Market research and initial planning phase",
      startMonth: "January",
      endMonth: "February",
      status: "completed",
      team: "Strategy",
      owner: "Alex Johnson",
      dependencies: [],
    },
    {
      id: "task2",
      name: "Design System",
      description: "Create unified design system for the product",
      startMonth: "February",
      endMonth: "March",
      status: "completed",
      team: "Design",
      owner: "Sarah Chen",
      dependencies: ["task1"],
    },
    {
      id: "task3",
      name: "Frontend Development",
      description: "Implement core frontend components",
      startMonth: "March",
      endMonth: "May",
      status: "in-progress",
      team: "Engineering",
      owner: "Michael Rodriguez",
      dependencies: ["task2"],
    },
    {
      id: "task4",
      name: "Backend API",
      description: "Develop backend services and APIs",
      startMonth: "March",
      endMonth: "June",
      status: "in-progress",
      team: "Engineering",
      owner: "Jessica Kim",
      dependencies: ["task1"],
    },
    {
      id: "task5",
      name: "Integration Testing",
      description: "Test frontend and backend integration",
      startMonth: "June",
      endMonth: "July",
      status: "planned",
      team: "QA",
      owner: "David Wilson",
      dependencies: ["task3", "task4"],
    },
    {
      id: "task6",
      name: "Beta Release",
      description: "Limited release to beta testers",
      startMonth: "August",
      endMonth: "August",
      status: "planned",
      team: "Product",
      owner: "Emily Taylor",
      dependencies: ["task5"],
    },
    {
      id: "task7",
      name: "User Feedback Collection",
      description: "Gather and analyze user feedback",
      startMonth: "September",
      endMonth: "October",
      status: "planned",
      team: "UX Research",
      owner: "Ryan Garcia",
      dependencies: ["task6"],
    },
    {
      id: "task8",
      name: "Refinement & Optimization",
      description: "Implement improvements based on feedback",
      startMonth: "October",
      endMonth: "November",
      status: "planned",
      team: "Engineering",
      owner: "Michael Rodriguez",
      dependencies: ["task7"],
    },
    {
      id: "task9",
      name: "Final Testing",
      description: "Comprehensive testing before launch",
      startMonth: "November",
      endMonth: "November",
      status: "planned",
      team: "QA",
      owner: "David Wilson",
      dependencies: ["task8"],
    },
    {
      id: "task10",
      name: "Public Launch",
      description: "Official product release",
      startMonth: "December",
      endMonth: "December",
      status: "planned",
      team: "All Teams",
      owner: "Emily Taylor",
      dependencies: ["task9"],
    },
  ];

  const toggleQuarter = (quarterId: string) => {
    setExpandedQuarters((prev) => ({
      ...prev,
      [quarterId]: !prev[quarterId],
    }));
  };

  const getMonthIndex = (month: string) => {
    const allMonths = quarters.flatMap((q) => q.months);
    return allMonths.indexOf(month);
  };

  const getTaskSpan = (startMonth: string, endMonth: string) => {
    const startIndex = getMonthIndex(startMonth);
    const endIndex = getMonthIndex(endMonth);
    return endIndex - startIndex + 1;
  };

  const getTaskStartColumn = (startMonth: string) => {
    const allMonths = quarters.flatMap((q) => q.months);
    return allMonths.indexOf(startMonth) + 1; // +1 for the first column with task details
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "planned":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      case "at-risk":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
        );
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      case "planned":
        return (
          <Calendar className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        );
      case "at-risk":
        return (
          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
        );
      default:
        return <Clock className="h-4 w-4 text-gray-600 dark:text-gray-400" />;
    }
  };

  // Filter tasks based on status and search term
  const filteredTasks = tasks.filter((task) => {
    if (filterStatus && task.status !== filterStatus) return false;
    if (
      searchTerm &&
      !task.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="min-h-screen overflow-hidden bg-white px-4 py-10 dark:bg-gray-950">
      {/* DarkMode Toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-7xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl transition-all duration-300 dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b border-gray-200 p-6 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Project Roadmap
          </h2>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Timeline view of project tasks and milestones
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700">
          <div className="relative min-w-[240px] flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-blue-400"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <select
              value={filterStatus || ""}
              onChange={(e) => setFilterStatus(e.target.value || null)}
              className="rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="planned">Planned</option>
              <option value="at-risk">At Risk</option>
            </select>
            <button className="dark:hover:bg-gray-650 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-blue-400">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </button>
            <button className="dark:hover:bg-gray-650 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-blue-400">
              <Download className="mr-2 h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="sticky left-0 z-10 w-64 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                  Task
                </th>
                {quarters.map((quarter) => (
                  <th
                    key={quarter.id}
                    colSpan={quarter.months.length}
                    className="border-l border-gray-200 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:border-gray-700 dark:text-gray-400"
                  >
                    <div
                      className="flex cursor-pointer items-center justify-center"
                      onClick={() => toggleQuarter(quarter.id)}
                    >
                      {expandedQuarters[quarter.id] ? (
                        <ChevronDown className="mr-2 h-4 w-4" />
                      ) : (
                        <ChevronUp className="mr-2 h-4 w-4" />
                      )}
                      {quarter.name}
                    </div>
                  </th>
                ))}
              </tr>
              <tr>
                <th className="sticky left-0 z-10 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                  Details
                </th>
                {quarters.map((quarter) =>
                  expandedQuarters[quarter.id] ? (
                    quarter.months.map((month, index) => (
                      <th
                        key={`${quarter.id}-${month}`}
                        className="border-l border-gray-200 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:border-gray-700 dark:text-gray-400"
                      >
                        {month}
                      </th>
                    ))
                  ) : (
                    <th
                      key={quarter.id}
                      colSpan={quarter.months.length}
                      className="border-l border-gray-200 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:border-gray-700 dark:text-gray-400"
                    >
                      (Collapsed)
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
              {filteredTasks.map((task, taskIndex) => {
                // Calculate which months are visible based on expanded quarters
                const allMonths = quarters.flatMap((q) =>
                  expandedQuarters[q.id] ? q.months : [q.name],
                );
                const startMonthVisible = allMonths.includes(task.startMonth);
                const startMonthIndex = allMonths.indexOf(task.startMonth);

                // Calculate span based on visible months
                let span = 1;
                if (startMonthVisible) {
                  const endMonthIndex = allMonths.indexOf(task.endMonth);
                  if (endMonthIndex >= 0) {
                    span = endMonthIndex - startMonthIndex + 1;
                  } else {
                    // End month is in a collapsed quarter
                    const endQuarter = quarters.find((q) =>
                      q.months.includes(task.endMonth),
                    );
                    if (endQuarter && !expandedQuarters[endQuarter.id]) {
                      const quarterIndex = allMonths.indexOf(endQuarter.name);
                      if (quarterIndex >= 0) {
                        span = quarterIndex - startMonthIndex + 1;
                      }
                    }
                  }
                }

                return (
                  <tr
                    key={task.id}
                    className={
                      taskIndex % 2 === 0
                        ? "bg-white dark:bg-gray-800"
                        : "bg-gray-50 dark:bg-gray-700"
                    }
                  >
                    <td className="sticky left-0 z-10 whitespace-nowrap border-r border-gray-200 bg-inherit px-6 py-4 text-sm font-medium text-gray-900 dark:border-gray-700 dark:text-white">
                      <div>
                        <div className="font-semibold">{task.name}</div>
                        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {task.description}
                        </div>
                        <div className="mt-2 flex items-center space-x-2">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(task.status)}`}
                          >
                            {getStatusIcon(task.status)}
                            <span className="ml-1 capitalize">
                              {task.status.replace("-", " ")}
                            </span>
                          </span>
                          <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Users className="mr-1 h-3 w-3" />
                            {task.team}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Render timeline cells */}
                    {startMonthVisible ? (
                      // If the start month is visible, render the task bar
                      <td colSpan={span} className="relative px-2 py-2">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          style={{ transformOrigin: "left" }}
                          className={`flex h-12 items-center justify-center rounded-md px-3 ${
                            task.status === "completed"
                              ? "border border-green-300 bg-green-100 dark:border-green-700 dark:bg-green-900/30"
                              : task.status === "in-progress"
                                ? "border border-blue-300 bg-blue-100 dark:border-blue-700 dark:bg-blue-900/30"
                                : task.status === "at-risk"
                                  ? "border border-red-300 bg-red-100 dark:border-red-700 dark:bg-red-900/30"
                                  : "border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700/50"
                          }`}
                        >
                          <span className="truncate text-xs font-medium">
                            {task.startMonth} - {task.endMonth}
                          </span>
                        </motion.div>
                      </td>
                    ) : (
                      // If the start month is not visible (in a collapsed quarter), show placeholder
                      <td
                        colSpan={allMonths.length}
                        className="px-2 py-2 text-center text-xs text-gray-500 dark:text-gray-400"
                      >
                        Task spans from {task.startMonth} to {task.endMonth}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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

export default ProjectRoadmapTable;
