"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  Plus,
  X,
  MoreHorizontal,
  Calendar,
  Tag,
  Clock,
  Search,
  Filter,
  CheckCircle2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type TaskPriority = "low" | "medium" | "high" | "urgent";
type TaskColumn = "backlog" | "todo" | "in-progress" | "review" | "done";

interface KanbanTask {
  id: string;
  title: string;
  description?: string;
  column: TaskColumn;
  priority: TaskPriority;
  dueDate?: Date;
  tags?: string[];
  createdAt: Date;
}

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<KanbanTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showNewTaskInput, setShowNewTaskInput] = useState<TaskColumn | null>(
    null,
  );
  const [filterPriority, setFilterPriority] = useState<TaskPriority | "all">(
    "all",
  );
  const [filterTag, setFilterTag] = useState<string | "all">("all");

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1200));

        // Mock data
        const mockTasks: KanbanTask[] = [
          {
            id: "1",
            title: "Design new dashboard layout",
            description:
              "Create wireframes and mockups for the new admin dashboard",
            column: "done",
            priority: "high",
            dueDate: new Date(new Date().setDate(new Date().getDate() - 2)),
            tags: ["design", "ui"],
            createdAt: new Date(new Date().setDate(new Date().getDate() - 7)),
          },
          {
            id: "2",
            title: "Implement authentication flow",
            description:
              "Add login, registration and password reset functionality",
            column: "in-progress",
            priority: "urgent",
            dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
            tags: ["backend", "security"],
            createdAt: new Date(new Date().setDate(new Date().getDate() - 5)),
          },
          {
            id: "3",
            title: "Fix responsive layout issues",
            column: "todo",
            priority: "medium",
            tags: ["frontend", "bug"],
            createdAt: new Date(new Date().setDate(new Date().getDate() - 3)),
          },
          {
            id: "4",
            title: "Write API documentation",
            description: "Document all API endpoints and parameters",
            column: "review",
            priority: "low",
            dueDate: new Date(new Date().setDate(new Date().getDate() + 3)),
            tags: ["documentation"],
            createdAt: new Date(new Date().setDate(new Date().getDate() - 2)),
          },
          {
            id: "5",
            title: "Optimize database queries",
            column: "backlog",
            priority: "medium",
            tags: ["backend", "performance"],
            createdAt: new Date(new Date().setDate(new Date().getDate() - 10)),
          },
          {
            id: "6",
            title: "Set up CI/CD pipeline",
            column: "todo",
            priority: "high",
            tags: ["devops"],
            createdAt: new Date(new Date().setDate(new Date().getDate() - 4)),
          },
          {
            id: "7",
            title: "Create user onboarding flow",
            column: "backlog",
            priority: "medium",
            tags: ["ux", "frontend"],
            createdAt: new Date(new Date().setDate(new Date().getDate() - 8)),
          },
          {
            id: "8",
            title: "Implement dark mode",
            column: "in-progress",
            priority: "low",
            tags: ["ui", "frontend"],
            createdAt: new Date(new Date().setDate(new Date().getDate() - 3)),
          },
        ];

        setTasks(mockTasks);
        setError(null);
      } catch (err) {
        setError("Failed to load tasks. Please try again.");
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const columns: { id: TaskColumn; title: string }[] = [
    { id: "backlog", title: "Backlog" },
    { id: "todo", title: "To Do" },
    { id: "in-progress", title: "In Progress" },
    { id: "review", title: "Review" },
    { id: "done", title: "Done" },
  ];

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case "low":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      case "urgent":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    }
  };

  const getColumnTasks = (columnId: TaskColumn) => {
    return tasks
      .filter((task) => {
        // Apply filters
        if (task.column !== columnId) return false;
        if (
          searchQuery &&
          !task.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
          return false;
        if (filterPriority !== "all" && task.priority !== filterPriority)
          return false;
        if (filterTag !== "all" && !task.tags?.includes(filterTag))
          return false;
        return true;
      })
      .sort((a, b) => {
        // Sort by priority first, then by due date
        const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
        const priorityDiff =
          priorityOrder[a.priority] - priorityOrder[b.priority];
        if (priorityDiff !== 0) return priorityDiff;

        // If both have due dates, sort by due date
        if (a.dueDate && b.dueDate) {
          return a.dueDate.getTime() - b.dueDate.getTime();
        }

        // Tasks with due dates come before tasks without due dates
        if (a.dueDate) return -1;
        if (b.dueDate) return 1;

        // Finally, sort by creation date
        return a.createdAt.getTime() - b.createdAt.getTime();
      });
  };

  const moveTask = (taskId: string, targetColumn: TaskColumn) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, column: targetColumn } : task,
      ),
    );
  };

  const addTask = (column: TaskColumn, title: string) => {
    if (!title.trim()) return;

    const newTask: KanbanTask = {
      id: Date.now().toString(),
      title: title.trim(),
      column,
      priority: "medium",
      createdAt: new Date(),
    };

    setTasks((prev) => [newTask, ...prev]);
    setNewTaskTitle("");
    setShowNewTaskInput(null);
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const getAllTags = () => {
    const tags = new Set<string>();
    tasks.forEach((task) => {
      task.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const isDueSoon = (date?: Date) => {
    if (!date) return false;
    const today = new Date();
    const diff = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 2;
  };

  const isOverdue = (date?: Date) => {
    if (!date) return false;
    return date < new Date();
  };

  return (
    <motion.div
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="border-b border-gray-200 p-4 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Kanban Board
          </h3>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 rounded-md border border-gray-300 bg-white pl-9 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex h-9 items-center gap-1 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-2">
                  <div className="mb-2">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      Priority
                    </label>
                    <select
                      value={filterPriority}
                      onChange={(e) =>
                        setFilterPriority(
                          e.target.value as TaskPriority | "all",
                        )
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                    >
                      <option value="all">All Priorities</option>
                      <option value="urgent">Urgent</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      Tag
                    </label>
                    <select
                      value={filterTag}
                      onChange={(e) => setFilterTag(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                    >
                      <option value="all">All Tags</option>
                      {getAllTags().map((tag) => (
                        <option key={tag} value={tag}>
                          {tag}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <motion.div
            className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-blue-500"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>
      ) : error ? (
        <div className="m-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
          <p className="text-center text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
          <button
            className="mt-2 w-full rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="flex h-[calc(100vh-20rem)] min-h-[30rem] overflow-x-auto p-4">
          <div className="flex gap-4">
            {columns.map((column) => (
              <div
                key={column.id}
                className="flex h-full w-72 shrink-0 flex-col rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50"
              >
                <div className="flex items-center justify-between border-b border-gray-200 p-3 dark:border-gray-800">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {column.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                      {getColumnTasks(column.id).length}
                    </span>
                    <button
                      className="rounded-full p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                      onClick={() => setShowNewTaskInput(column.id)}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-2">
                  {showNewTaskInput === column.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-1 rounded-lg border border-blue-200 bg-blue-50 p-2 dark:border-blue-900/50 dark:bg-blue-900/20"
                    >
                      <input
                        type="text"
                        placeholder="Task title..."
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        className="mb-2 w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            addTask(column.id, newTaskTitle);
                          } else if (e.key === "Escape") {
                            setShowNewTaskInput(null);
                            setNewTaskTitle("");
                          }
                        }}
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                          onClick={() => {
                            setShowNewTaskInput(null);
                            setNewTaskTitle("");
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className="rounded-md bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                          onClick={() => addTask(column.id, newTaskTitle)}
                        >
                          Add
                        </button>
                      </div>
                    </motion.div>
                  )}

                  <AnimatePresence>
                    {getColumnTasks(column.id).map((task) => (
                      <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.2 }}
                        className="group cursor-pointer rounded-lg border border-gray-200 bg-white p-3 shadow-sm hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData("taskId", task.id);
                        }}
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${getPriorityColor(task.priority)}`}
                          >
                            {task.priority}
                          </span>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="rounded-full p-1 text-gray-400 opacity-0 hover:bg-gray-100 hover:text-gray-600 group-hover:opacity-100 dark:hover:bg-gray-800 dark:hover:text-gray-300">
                                <MoreHorizontal className="h-4 w-4" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {columns.map(
                                (col) =>
                                  col.id !== task.column && (
                                    <DropdownMenuItem
                                      key={col.id}
                                      onClick={() => moveTask(task.id, col.id)}
                                    >
                                      Move to {col.title}
                                    </DropdownMenuItem>
                                  ),
                              )}
                              <DropdownMenuItem
                                className="text-red-600 dark:text-red-400"
                                onClick={() => deleteTask(task.id)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <h5 className="mb-2 font-medium text-gray-900 dark:text-white">
                          {task.title}
                        </h5>

                        {task.description && (
                          <p className="mb-2 text-xs text-gray-600 dark:text-gray-400">
                            {task.description}
                          </p>
                        )}

                        <div className="flex flex-wrap gap-1">
                          {task.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {task.dueDate && (
                          <div
                            className={`mt-2 flex items-center text-xs ${
                              isOverdue(task.dueDate)
                                ? "text-red-600 dark:text-red-400"
                                : isDueSoon(task.dueDate)
                                  ? "text-amber-600 dark:text-amber-400"
                                  : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            <Calendar className="mr-1 h-3 w-3" />
                            <span>
                              {isOverdue(task.dueDate) ? "Overdue: " : "Due: "}
                              {formatDate(task.dueDate)}
                            </span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {getColumnTasks(column.id).length === 0 &&
                    !showNewTaskInput && (
                      <div className="flex h-24 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 text-center dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          No tasks
                        </p>
                        <button
                          className="mt-1 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                          onClick={() => setShowNewTaskInput(column.id)}
                        >
                          Add a task
                        </button>
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default KanbanBoard;
