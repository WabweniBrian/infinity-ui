"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  Reorder,
  useDragControls,
} from "framer-motion";
import {
  AlertCircle,
  Calendar,
  ChevronDown,
  Clock,
  Edit,
  Filter,
  GripVertical,
  Plus,
  Search,
  Tag,
  Trash2,
  User,
  X,
} from "lucide-react";

// Types for our data
interface Task {
  id: string;
  title: string;
  description: string;
  status: "backlog" | "todo" | "in-progress" | "review" | "done";
  priority: "low" | "medium" | "high" | "urgent";
  assignee?: string;
  dueDate?: string;
  tags: string[];
  createdAt: string;
}

interface Column {
  id: "backlog" | "todo" | "in-progress" | "review" | "done";
  title: string;
  color: string;
  limit?: number;
}

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [selectedAssignee, setSelectedAssignee] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    status: "backlog",
    priority: "medium",
    tags: [],
  });
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTagText, setNewTagText] = useState("");
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [isCompactView, setIsCompactView] = useState(false);
  const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const dragControls = useDragControls();

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
    // Sample columns
    const sampleColumns: Column[] = [
      {
        id: "backlog",
        title: "Backlog",
        color: "bg-gray-200 dark:bg-gray-700",
      },
      {
        id: "todo",
        title: "To Do",
        color: "bg-blue-100 dark:bg-blue-900/30",
        limit: 5,
      },
      {
        id: "in-progress",
        title: "In Progress",
        color: "bg-amber-100 dark:bg-amber-900/30",
        limit: 3,
      },
      {
        id: "review",
        title: "Review",
        color: "bg-purple-100 dark:bg-purple-900/30",
        limit: 3,
      },
      {
        id: "done",
        title: "Done",
        color: "bg-emerald-100 dark:bg-emerald-900/30",
      },
    ];

    // Sample tasks
    const sampleTasks: Task[] = [
      {
        id: "task-1",
        title: "Research competitors",
        description:
          "Analyze top 5 competitors and create a report on their features and pricing",
        status: "done",
        priority: "high",
        assignee: "Alex Johnson",
        dueDate: "2023-06-10",
        tags: ["marketing", "research"],
        createdAt: "2023-05-20",
      },
      {
        id: "task-2",
        title: "Design new landing page",
        description:
          "Create wireframes and mockups for the new product landing page",
        status: "review",
        priority: "medium",
        assignee: "Sarah Chen",
        dueDate: "2023-06-15",
        tags: ["design", "website"],
        createdAt: "2023-05-25",
      },
      {
        id: "task-3",
        title: "Fix navigation bug",
        description:
          "Address the issue with dropdown menu not working on mobile devices",
        status: "in-progress",
        priority: "urgent",
        assignee: "Miguel Rodriguez",
        dueDate: "2023-06-08",
        tags: ["bug", "frontend"],
        createdAt: "2023-06-01",
      },
      {
        id: "task-4",
        title: "Implement authentication",
        description: "Set up OAuth and user authentication flow",
        status: "todo",
        priority: "high",
        assignee: "Priya Patel",
        dueDate: "2023-06-20",
        tags: ["backend", "security"],
        createdAt: "2023-05-28",
      },
      {
        id: "task-5",
        title: "Write API documentation",
        description: "Document all API endpoints and parameters",
        status: "backlog",
        priority: "low",
        assignee: "James Wilson",
        tags: ["documentation", "api"],
        createdAt: "2023-05-15",
      },
      {
        id: "task-6",
        title: "Create onboarding tutorial",
        description:
          "Design and implement an interactive tutorial for new users",
        status: "todo",
        priority: "medium",
        assignee: "Sarah Chen",
        dueDate: "2023-06-25",
        tags: ["ux", "onboarding"],
        createdAt: "2023-05-30",
      },
      {
        id: "task-7",
        title: "Optimize database queries",
        description: "Improve performance of slow database queries",
        status: "in-progress",
        priority: "high",
        assignee: "Miguel Rodriguez",
        dueDate: "2023-06-12",
        tags: ["backend", "performance"],
        createdAt: "2023-06-02",
      },
      {
        id: "task-8",
        title: "Set up CI/CD pipeline",
        description: "Configure automated testing and deployment workflow",
        status: "backlog",
        priority: "medium",
        assignee: "James Wilson",
        tags: ["devops", "automation"],
        createdAt: "2023-05-18",
      },
      {
        id: "task-9",
        title: "Update privacy policy",
        description:
          "Review and update privacy policy to comply with new regulations",
        status: "review",
        priority: "high",
        assignee: "Alex Johnson",
        dueDate: "2023-06-18",
        tags: ["legal", "compliance"],
        createdAt: "2023-05-27",
      },
      {
        id: "task-10",
        title: "Create email templates",
        description:
          "Design and code responsive email templates for marketing campaigns",
        status: "todo",
        priority: "low",
        assignee: "Priya Patel",
        dueDate: "2023-06-30",
        tags: ["marketing", "design"],
        createdAt: "2023-06-03",
      },
    ];

    setColumns(sampleColumns);
    setTasks(sampleTasks);
  }, []);

  // Get all unique assignees
  const getUniqueAssignees = () => {
    const assignees = new Set<string>();
    tasks.forEach((task) => {
      if (task.assignee) {
        assignees.add(task.assignee);
      }
    });
    return Array.from(assignees);
  };

  // Get all unique tags
  const getUniqueTags = () => {
    const tags = new Set<string>();
    tasks.forEach((task) => {
      task.tags.forEach((tag) => {
        tags.add(tag);
      });
    });
    return Array.from(tags);
  };

  // Filter tasks based on search and filters
  const getFilteredTasks = () => {
    return tasks.filter((task) => {
      // Search filter
      const matchesSearch =
        !searchTerm ||
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Priority filter
      const matchesPriority =
        !selectedPriority || task.priority === selectedPriority;

      // Assignee filter
      const matchesAssignee =
        !selectedAssignee || task.assignee === selectedAssignee;

      // Tag filter
      const matchesTag = !selectedTag || task.tags.includes(selectedTag);

      return matchesSearch && matchesPriority && matchesAssignee && matchesTag;
    });
  };

  const filteredTasks = getFilteredTasks();

  // Get tasks for a specific column
  const getTasksForColumn = (columnId: string) => {
    return filteredTasks.filter((task) => task.status === columnId);
  };

  // Move task to a different column
  const moveTask = (
    taskId: string,
    newStatus: "backlog" | "todo" | "in-progress" | "review" | "done",
  ) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };

  // Add a new task
  const handleAddTask = () => {
    if (!newTask.title) return;

    const task: Task = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      description: newTask.description || "",
      status: newTask.status as
        | "backlog"
        | "todo"
        | "in-progress"
        | "review"
        | "done",
      priority: newTask.priority as "low" | "medium" | "high" | "urgent",
      assignee: newTask.assignee,
      dueDate: newTask.dueDate,
      tags: newTask.tags || [],
      createdAt: new Date().toISOString().split("T")[0],
    };

    setTasks((prevTasks) => [...prevTasks, task]);
    setNewTask({
      title: "",
      description: "",
      status: "backlog",
      priority: "medium",
      tags: [],
    });
    setIsAddingTask(false);
  };

  // Update an existing task
  const handleUpdateTask = () => {
    if (!editingTask || !editingTask.title) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editingTask.id ? editingTask : task,
      ),
    );
    setEditingTask(null);
  };

  // Delete a task
  const handleDeleteTask = (taskId: string) => {
    setTaskToDelete(taskId);
    setIsConfirmingDelete(true);
  };

  const confirmDeleteTask = () => {
    if (!taskToDelete) return;

    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskToDelete),
    );
    setTaskToDelete(null);
    setIsConfirmingDelete(false);
    setIsTaskDetailsOpen(false);
  };

  // Add a tag to a task
  const handleAddTag = () => {
    if (!newTagText || !editingTask) return;

    const updatedTags = [...(editingTask.tags || []), newTagText];
    setEditingTask({ ...editingTask, tags: updatedTags });
    setNewTagText("");
    setIsAddingTag(false);
  };

  // Remove a tag from a task
  const handleRemoveTag = (tag: string) => {
    if (!editingTask) return;

    const updatedTags = editingTask.tags.filter((t) => t !== tag);
    setEditingTask({ ...editingTask, tags: updatedTags });
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300";
      case "medium":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "high":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "urgent":
        return "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Check if a due date is overdue
  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const taskDueDate = new Date(dueDate);
    return taskDueDate < today;
  };

  // Toggle task expansion
  const toggleTaskExpansion = (taskId: string) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  // Open task details
  const openTaskDetails = (task: Task) => {
    setSelectedTask(task);
    setIsTaskDetailsOpen(true);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-white to-gray-50 px-4 py-10 dark:from-gray-950 dark:to-gray-900">
      <div className="mx-auto max-w-7xl rounded-2xl border border-gray-200/50 bg-white shadow-xl dark:border-gray-800/50 dark:bg-gray-800/90">
        {/* Header */}
        <div className="flex flex-col items-center justify-between border-b border-gray-100 p-6 dark:border-gray-700/50 sm:flex-row">
          <div>
            <h2 className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-2xl font-bold text-transparent dark:from-indigo-400 dark:to-violet-400">
              Task Board
            </h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Manage and track your team&apos;s tasks
            </p>
          </div>

          <div className="mt-4 flex items-center space-x-3 sm:mt-0">
            <button
              onClick={() => setIsAddingTask(true)}
              className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-200 hover:from-indigo-700 hover:to-violet-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:from-indigo-500 dark:to-violet-500 dark:hover:from-indigo-600 dark:hover:to-violet-600"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </button>

            <button
              onClick={() => setIsCompactView(!isCompactView)}
              className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              {isCompactView ? "Detailed View" : "Compact View"}
            </button>

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

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 bg-gray-50/50 p-4 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50 dark:backdrop-blur-sm">
          <div className="relative min-w-[240px] flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              className="block w-full rounded-full border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/50"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedPriority || ""}
              onChange={(e) => setSelectedPriority(e.target.value || null)}
              className="rounded-full border border-gray-200 bg-white p-2.5 text-sm text-gray-700 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/50"
            >
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
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

            <select
              value={selectedTag || ""}
              onChange={(e) => setSelectedTag(e.target.value || null)}
              className="rounded-full border border-gray-200 bg-white p-2.5 text-sm text-gray-700 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/50"
            >
              <option value="">All Tags</option>
              {getUniqueTags().map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>

            <button className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="overflow-x-auto">
          <div className="flex min-h-[600px] p-6">
            {columns.map((column) => (
              <div
                key={column.id}
                className="ml-3 flex h-full w-80 min-w-[320px] flex-col rounded-xl border border-gray-100 shadow-sm transition-all duration-200 last:mr-3 hover:shadow-md dark:border-gray-700/50"
              >
                {/* Column Header */}
                <div className={`rounded-t-xl p-4 ${column.color}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800 dark:text-white">
                      {column.title}
                    </h3>
                    <div className="flex items-center">
                      <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm backdrop-blur-sm dark:bg-gray-800/90 dark:text-gray-200">
                        {getTasksForColumn(column.id).length}
                        {column.limit && ` / ${column.limit}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Column Content */}
                <div className="flex-1 overflow-y-auto p-3">
                  <Reorder.Group
                    axis="y"
                    values={getTasksForColumn(column.id)}
                    onReorder={(newOrder) => {
                      // In a real app, you would update the order in your state
                      console.log("New order:", newOrder);
                    }}
                    className="space-y-3"
                  >
                    {getTasksForColumn(column.id).map((task) => (
                      <Reorder.Item
                        key={task.id}
                        value={task}
                        dragListener={false}
                        dragControls={dragControls}
                      >
                        <motion.div
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className={`cursor-pointer rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-700/50 dark:bg-gray-800 ${
                            expandedTask === task.id
                              ? "shadow-md ring-1 ring-indigo-500/10 dark:ring-indigo-400/10"
                              : ""
                          }`}
                          onClick={() => openTaskDetails(task)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center">
                                <div
                                  className="mr-2 cursor-move"
                                  onPointerDown={(e) => dragControls.start(e)}
                                >
                                  <GripVertical className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                                </div>
                                <h4 className="font-medium text-gray-900 dark:text-white">
                                  {task.title}
                                </h4>
                              </div>

                              {(!isCompactView || expandedTask === task.id) && (
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                  {task.description.length > 100
                                    ? `${task.description.substring(0, 100)}...`
                                    : task.description}
                                </p>
                              )}
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleTaskExpansion(task.id);
                              }}
                              className="ml-2 rounded-full p-1 text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                            >
                              <ChevronDown
                                className={`h-4 w-4 transform transition-transform duration-200 ${
                                  expandedTask === task.id ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                          </div>

                          {(!isCompactView || expandedTask === task.id) && (
                            <div className="mt-3">
                              <div className="flex flex-wrap items-center gap-2">
                                <span
                                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getPriorityColor(
                                    task.priority,
                                  )}`}
                                >
                                  {task.priority.charAt(0).toUpperCase() +
                                    task.priority.slice(1)}
                                </span>

                                {task.assignee && (
                                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                                    <User className="mr-1 h-3 w-3" />
                                    {task.assignee}
                                  </span>
                                )}

                                {task.dueDate && (
                                  <span
                                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                                      isOverdue(task.dueDate)
                                        ? "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300"
                                        : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                                    }`}
                                  >
                                    <Calendar className="mr-1 h-3 w-3" />
                                    {formatDate(task.dueDate)}
                                  </span>
                                )}
                              </div>

                              {task.tags.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                  {task.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
                                    >
                                      <Tag className="mr-1 h-3 w-3" />
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </motion.div>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                </div>

                {/* Add Task Button */}
                <div className="p-3">
                  <button
                    onClick={() => {
                      setNewTask({
                        ...newTask,
                        status: column.id as
                          | "backlog"
                          | "todo"
                          | "in-progress"
                          | "review"
                          | "done",
                      });
                      setIsAddingTask(true);
                    }}
                    className="flex w-full items-center justify-center rounded-lg border border-dashed border-gray-200 p-2.5 text-sm text-gray-500 transition-all duration-200 hover:border-indigo-300 hover:text-indigo-600 dark:border-gray-700 dark:text-gray-400 dark:hover:border-indigo-600/50 dark:hover:text-indigo-400"
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Add Task
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add/Edit Task Modal */}
        <AnimatePresence>
          {(isAddingTask || editingTask) && (
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
                    {isAddingTask ? "Add New Task" : "Edit Task"}
                  </h3>
                  <button
                    onClick={() => {
                      setIsAddingTask(false);
                      setEditingTask(null);
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
                      className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2.5 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/50"
                      value={isAddingTask ? newTask.title : editingTask?.title}
                      onChange={(e) =>
                        isAddingTask
                          ? setNewTask({ ...newTask, title: e.target.value })
                          : setEditingTask({
                              ...editingTask!,
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
                      value={
                        isAddingTask
                          ? newTask.description
                          : editingTask?.description
                      }
                      onChange={(e) =>
                        isAddingTask
                          ? setNewTask({
                              ...newTask,
                              description: e.target.value,
                            })
                          : setEditingTask({
                              ...editingTask!,
                              description: e.target.value,
                            })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Status
                    </label>
                    <select
                      className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2.5 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/50"
                      value={
                        isAddingTask ? newTask.status : editingTask?.status
                      }
                      onChange={(e) =>
                        isAddingTask
                          ? setNewTask({
                              ...newTask,
                              status: e.target.value as
                                | "backlog"
                                | "todo"
                                | "in-progress"
                                | "review"
                                | "done",
                            })
                          : setEditingTask({
                              ...editingTask!,
                              status: e.target.value as
                                | "backlog"
                                | "todo"
                                | "in-progress"
                                | "review"
                                | "done",
                            })
                      }
                    >
                      {columns.map((column) => (
                        <option key={column.id} value={column.id}>
                          {column.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Priority
                    </label>
                    <select
                      className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2.5 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/50"
                      value={
                        isAddingTask ? newTask.priority : editingTask?.priority
                      }
                      onChange={(e) =>
                        isAddingTask
                          ? setNewTask({
                              ...newTask,
                              priority: e.target.value as
                                | "low"
                                | "medium"
                                | "high"
                                | "urgent",
                            })
                          : setEditingTask({
                              ...editingTask!,
                              priority: e.target.value as
                                | "low"
                                | "medium"
                                | "high"
                                | "urgent",
                            })
                      }
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Assignee
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2.5 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/50"
                      value={
                        isAddingTask
                          ? newTask.assignee || ""
                          : editingTask?.assignee || ""
                      }
                      onChange={(e) =>
                        isAddingTask
                          ? setNewTask({ ...newTask, assignee: e.target.value })
                          : setEditingTask({
                              ...editingTask!,
                              assignee: e.target.value,
                            })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Due Date
                    </label>
                    <input
                      type="date"
                      className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2.5 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/50"
                      value={
                        isAddingTask
                          ? newTask.dueDate || ""
                          : editingTask?.dueDate || ""
                      }
                      onChange={(e) =>
                        isAddingTask
                          ? setNewTask({ ...newTask, dueDate: e.target.value })
                          : setEditingTask({
                              ...editingTask!,
                              dueDate: e.target.value,
                            })
                      }
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Tags
                    </label>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {(isAddingTask ? newTask.tags : editingTask?.tags)?.map(
                        (tag) => (
                          <div
                            key={tag}
                            className="flex items-center rounded-full bg-indigo-100 px-3 py-1.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
                          >
                            <span>{tag}</span>
                            <button
                              onClick={() => handleRemoveTag(tag)}
                              className="ml-1.5 rounded-full p-0.5 text-indigo-600 transition-colors duration-200 hover:bg-indigo-200 hover:text-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-800/50 dark:hover:text-indigo-300"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ),
                      )}

                      {isAddingTag ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            className="rounded-l-lg border border-gray-200 px-3 py-1.5 text-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/50"
                            value={newTagText}
                            onChange={(e) => setNewTagText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleAddTag();
                              }
                            }}
                            placeholder="Enter tag"
                            autoFocus
                          />
                          <button
                            onClick={handleAddTag}
                            className="rounded-r-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition-colors duration-200 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
                          >
                            Add
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setIsAddingTag(true)}
                          className="flex items-center rounded-full border border-dashed border-gray-300 px-3 py-1.5 text-xs text-gray-500 transition-colors duration-200 hover:border-indigo-300 hover:text-indigo-600 dark:border-gray-700 dark:text-gray-400 dark:hover:border-indigo-600/50 dark:hover:text-indigo-400"
                        >
                          <Plus className="mr-1 h-3 w-3" />
                          Add Tag
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setIsAddingTask(false);
                      setEditingTask(null);
                    }}
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={isAddingTask ? handleAddTask : handleUpdateTask}
                    className="rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-200 hover:from-indigo-700 hover:to-violet-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:from-indigo-500 dark:to-violet-500 dark:hover:from-indigo-600 dark:hover:to-violet-600"
                  >
                    {isAddingTask ? "Add Task" : "Update Task"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Task Details Modal */}
        <AnimatePresence>
          {isTaskDetailsOpen && selectedTask && (
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
                    Task Details
                  </h3>
                  <button
                    onClick={() => setIsTaskDetailsOpen(false)}
                    className="rounded-full p-2 text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {selectedTask.title}
                    </h2>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingTask(selectedTask);
                          setIsTaskDetailsOpen(false);
                        }}
                        className="rounded-full p-2 text-indigo-600 transition-colors duration-200 hover:bg-indigo-100 hover:text-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-300"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(selectedTask.id)}
                        className="rounded-full p-2 text-rose-600 transition-colors duration-200 hover:bg-rose-100 hover:text-rose-800 dark:text-rose-400 dark:hover:bg-rose-900/30 dark:hover:text-rose-300"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span
                      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${getPriorityColor(
                        selectedTask.priority,
                      )}`}
                    >
                      {selectedTask.priority.charAt(0).toUpperCase() +
                        selectedTask.priority.slice(1)}{" "}
                      Priority
                    </span>

                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                      <Clock className="mr-1 h-3 w-3" />
                      Created {formatDate(selectedTask.createdAt)}
                    </span>

                    {selectedTask.dueDate && (
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium ${
                          isOverdue(selectedTask.dueDate)
                            ? "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                        }`}
                      >
                        <Calendar className="mr-1 h-3 w-3" />
                        Due {formatDate(selectedTask.dueDate)}
                        {isOverdue(selectedTask.dueDate) && (
                          <AlertCircle className="ml-1 h-3 w-3" />
                        )}
                      </span>
                    )}
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </h4>
                    <p className="mt-2 whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-gray-600 dark:bg-gray-700/50 dark:text-gray-300">
                      {selectedTask.description || "No description provided."}
                    </p>
                  </div>

                  {selectedTask.assignee && (
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-700 dark:text-gray-300">
                        Assignee
                      </h4>
                      <div className="mt-2 flex items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                          {selectedTask.assignee.charAt(0).toUpperCase()}
                        </div>
                        <span className="ml-2 text-gray-900 dark:text-white">
                          {selectedTask.assignee}
                        </span>
                      </div>
                    </div>
                  )}

                  {selectedTask.tags.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-700 dark:text-gray-300">
                        Tags
                      </h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedTask.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
                          >
                            <Tag className="mr-1 h-3 w-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex justify-between">
                    <div className="flex space-x-2">
                      {columns.map((column) => (
                        <button
                          key={column.id}
                          onClick={() => {
                            moveTask(
                              selectedTask.id,
                              column.id as
                                | "backlog"
                                | "todo"
                                | "in-progress"
                                | "review"
                                | "done",
                            );
                            setIsTaskDetailsOpen(false);
                          }}
                          disabled={selectedTask.status === column.id}
                          className={`rounded-lg px-3 py-2 text-sm ${
                            selectedTask.status === column.id
                              ? "bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
                              : "bg-white text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                          } border border-gray-200 dark:border-gray-700`}
                        >
                          Move to {column.title}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setIsTaskDetailsOpen(false)}
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
                    Delete Task
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this task? This action
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
                    onClick={confirmDeleteTask}
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

export default KanbanBoard;
