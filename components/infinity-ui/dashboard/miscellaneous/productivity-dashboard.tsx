"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Calendar,
  BarChart,
  PieChart,
  LineChart,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Trophy,
  Target,
  ArrowUp,
  ArrowDown,
  Filter,
  Search,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProductivityMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  change: number;
  status: "good" | "warning" | "poor";
  icon: React.ReactNode;
}

interface TimeAllocation {
  category: string;
  hours: number;
  percentage: number;
  color: string;
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: string;
  timeSpent: number;
  dueDate?: Date;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: Date;
  icon: React.ReactNode;
  level: "bronze" | "silver" | "gold";
}

const ProductivityInsights = () => {
  const [metrics, setMetrics] = useState<ProductivityMetric[]>([]);
  const [timeAllocation, setTimeAllocation] = useState<TimeAllocation[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "time" | "tasks" | "achievements"
  >("overview");
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month">("week");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const mockMetrics: ProductivityMetric[] = [
          {
            id: "1",
            name: "Focus Time",
            value: 5.2,
            target: 6,
            unit: "hours",
            change: 12,
            status: "good",
            icon: <Clock className="h-5 w-5 text-blue-500" />,
          },
          {
            id: "2",
            name: "Task Completion",
            value: 78,
            target: 85,
            unit: "%",
            change: -5,
            status: "warning",
            icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          },
          {
            id: "3",
            name: "Meeting Time",
            value: 2.8,
            target: 2,
            unit: "hours",
            change: 15,
            status: "poor",
            icon: <Calendar className="h-5 w-5 text-purple-500" />,
          },
          {
            id: "4",
            name: "Productivity Score",
            value: 82,
            target: 80,
            unit: "",
            change: 8,
            status: "good",
            icon: <Target className="h-5 w-5 text-teal-500" />,
          },
        ];

        const mockTimeAllocation: TimeAllocation[] = [
          {
            category: "Deep Work",
            hours: 4.5,
            percentage: 37.5,
            color: "#3b82f6",
          },
          {
            category: "Meetings",
            hours: 2.8,
            percentage: 23.3,
            color: "#8b5cf6",
          },
          {
            category: "Email & Communication",
            hours: 1.7,
            percentage: 14.2,
            color: "#10b981",
          },
          {
            category: "Planning & Organization",
            hours: 1.2,
            percentage: 10,
            color: "#f59e0b",
          },
          {
            category: "Learning & Development",
            hours: 0.8,
            percentage: 6.7,
            color: "#ec4899",
          },
          { category: "Breaks", hours: 1, percentage: 8.3, color: "#6b7280" },
        ];

        const mockTasks: Task[] = [
          {
            id: "1",
            title: "Complete project proposal",
            completed: true,
            category: "Deep Work",
            timeSpent: 95,
            dueDate: new Date(new Date().setDate(new Date().getDate() - 1)),
          },
          {
            id: "2",
            title: "Weekly team meeting",
            completed: true,
            category: "Meetings",
            timeSpent: 60,
          },
          {
            id: "3",
            title: "Review client feedback",
            completed: false,
            category: "Deep Work",
            timeSpent: 45,
            dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
          },
          {
            id: "4",
            title: "Update documentation",
            completed: false,
            category: "Deep Work",
            timeSpent: 30,
            dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
          },
          {
            id: "5",
            title: "Respond to emails",
            completed: true,
            category: "Email & Communication",
            timeSpent: 25,
          },
          {
            id: "6",
            title: "Plan next sprint",
            completed: false,
            category: "Planning & Organization",
            timeSpent: 0,
            dueDate: new Date(new Date().setDate(new Date().getDate() + 3)),
          },
        ];

        const mockAchievements: Achievement[] = [
          {
            id: "1",
            title: "Focus Champion",
            description:
              "Maintained 4+ hours of focus time for 5 consecutive days",
            date: new Date(new Date().setDate(new Date().getDate() - 2)),
            icon: <Clock className="h-5 w-5" />,
            level: "gold",
          },
          {
            id: "2",
            title: "Task Master",
            description: "Completed 20 tasks in a single week",
            date: new Date(new Date().setDate(new Date().getDate() - 7)),
            icon: <CheckCircle className="h-5 w-5" />,
            level: "silver",
          },
          {
            id: "3",
            title: "Early Bird",
            description: "Started work before 8 AM for 10 days",
            date: new Date(new Date().setDate(new Date().getDate() - 14)),
            icon: <Calendar className="h-5 w-5" />,
            level: "bronze",
          },
        ];

        setMetrics(mockMetrics);
        setTimeAllocation(mockTimeAllocation);
        setTasks(mockTasks);
        setAchievements(mockAchievements);
        setError(null);
      } catch (err) {
        setError("Failed to load productivity data. Please try again later.");
        console.error("Error fetching productivity data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status: "good" | "warning" | "poor") => {
    switch (status) {
      case "good":
        return "text-green-500";
      case "warning":
        return "text-amber-500";
      case "poor":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = (status: "good" | "warning" | "poor") => {
    switch (status) {
      case "good":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "poor":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getAchievementColor = (level: "bronze" | "silver" | "gold") => {
    switch (level) {
      case "gold":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "silver":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case "bronze":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}m` : ""}`;
    }

    return `${mins}m`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const filteredTasks = searchQuery
    ? tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : tasks;

  const renderOverviewTab = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900"
              whileHover={{
                y: -4,
                boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                  {metric.icon}
                </div>
                <div className="flex items-center gap-1 text-sm">
                  {metric.change >= 0 ? (
                    <ArrowUp
                      className={`h-4 w-4 ${getStatusColor(metric.status)}`}
                    />
                  ) : (
                    <ArrowDown
                      className={`h-4 w-4 ${getStatusColor(metric.status)}`}
                    />
                  )}
                  <span className={getStatusColor(metric.status)}>
                    {Math.abs(metric.change)}%
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {metric.name}
                </h4>
                <div className="mt-1 flex items-end gap-1">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {metric.value}
                    <span className="text-sm">{metric.unit}</span>
                  </p>
                  <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">
                    / {metric.target}
                    {metric.unit}
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                  <motion.div
                    className={`h-full rounded-full ${
                      metric.status === "good"
                        ? "bg-green-500"
                        : metric.status === "warning"
                          ? "bg-amber-500"
                          : "bg-red-500"
                    }`}
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(metric.value / metric.target) * 100}%`,
                    }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-medium text-gray-900 dark:text-white">
                Time Allocation
              </h4>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                    {timeRange === "day"
                      ? "Today"
                      : timeRange === "week"
                        ? "This Week"
                        : "This Month"}
                    <Filter className="ml-1 h-3 w-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTimeRange("day")}>
                    Today
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTimeRange("week")}>
                    This Week
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTimeRange("month")}>
                    This Month
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex h-[200px] items-center justify-center">
              <div className="relative h-40 w-40">
                <svg
                  viewBox="0 0 100 100"
                  className="h-full w-full -rotate-90 transform"
                >
                  {timeAllocation.map((item, i) => {
                    const offset = timeAllocation
                      .slice(0, i)
                      .reduce((sum, curr) => sum + curr.percentage, 0);

                    return (
                      <motion.circle
                        key={item.category}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke={item.color}
                        strokeWidth="20"
                        strokeDasharray={`${item.percentage} ${100 - item.percentage}`}
                        strokeDashoffset={100 - offset}
                        initial={{ strokeDashoffset: 100 }}
                        animate={{ strokeDashoffset: 100 - offset }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {timeAllocation.reduce((sum, item) => sum + item.hours, 0)}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    hours
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {timeAllocation.map((item) => (
                <div key={item.category} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-sm"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex flex-1 items-center justify-between">
                    <span className="text-xs text-gray-700 dark:text-gray-300">
                      {item.category}
                    </span>
                    <span className="text-xs font-medium text-gray-900 dark:text-white">
                      {item.hours}h ({item.percentage}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-medium text-gray-900 dark:text-white">
                Recent Tasks
              </h4>
              <button
                className="text-xs font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
                onClick={() => setActiveTab("tasks")}
              >
                View all
              </button>
            </div>

            <div className="space-y-3">
              {tasks.slice(0, 4).map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-800"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full ${
                        task.completed
                          ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {task.completed ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          task.completed
                            ? "text-gray-500 line-through dark:text-gray-400"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>{task.category}</span>
                        {task.timeSpent > 0 && (
                          <span>• {formatTime(task.timeSpent)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {task.dueDate && (
                    <span
                      className={`text-xs ${
                        new Date() > task.dueDate && !task.completed
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {formatDate(task.dueDate)}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTimeTab = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900 dark:text-white">
            Time Allocation
          </h4>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                {timeRange === "day"
                  ? "Today"
                  : timeRange === "week"
                    ? "This Week"
                    : "This Month"}
                <Filter className="ml-1 h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTimeRange("day")}>
                Today
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("week")}>
                This Week
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("month")}>
                This Month
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h5 className="mb-4 font-medium text-gray-900 dark:text-white">
              Category Breakdown
            </h5>
            <div className="flex h-[250px] items-center justify-center">
              <div className="relative h-48 w-48">
                <svg
                  viewBox="0 0 100 100"
                  className="h-full w-full -rotate-90 transform"
                >
                  {timeAllocation.map((item, i) => {
                    const offset = timeAllocation
                      .slice(0, i)
                      .reduce((sum, curr) => sum + curr.percentage, 0);

                    return (
                      <motion.circle
                        key={item.category}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke={item.color}
                        strokeWidth="20"
                        strokeDasharray={`${item.percentage} ${100 - item.percentage}`}
                        strokeDashoffset={100 - offset}
                        initial={{ strokeDashoffset: 100 }}
                        animate={{ strokeDashoffset: 100 - offset }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {timeAllocation.reduce((sum, item) => sum + item.hours, 0)}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    hours
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h5 className="mb-4 font-medium text-gray-900 dark:text-white">
              Time by Category
            </h5>
            <div className="space-y-4">
              {timeAllocation.map((item, index) => (
                <motion.div
                  key={item.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-sm"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {item.category}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.hours}h ({item.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h5 className="mb-4 font-medium text-gray-900 dark:text-white">
            Daily Breakdown
          </h5>
          <div className="h-[300px]">
            {/* Simplified chart visualization */}
            <div className="flex h-full items-end justify-between gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day, index) => {
                  const height = 30 + Math.random() * 70;
                  return (
                    <div
                      key={day}
                      className="flex flex-1 flex-col items-center"
                    >
                      <motion.div
                        className="w-full rounded-t-md bg-violet-500 dark:bg-violet-600"
                        style={{ height: `${height}%` }}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        whileHover={{ backgroundColor: "#8b5cf6" }}
                      />
                      <span className="mt-2 text-xs font-medium text-gray-700 dark:text-gray-300">
                        {day}
                      </span>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTasksTab = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900 dark:text-white">
            Task Management
          </h4>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-md border border-gray-300 py-1.5 pl-9 pr-4 text-sm focus:border-violet-500 focus:ring-violet-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {searchQuery && (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 flex items-center justify-between">
              <h5 className="font-medium text-gray-900 dark:text-white">
                To Do
              </h5>
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                {filteredTasks.filter((task) => !task.completed).length}
              </span>
            </div>
            <div className="space-y-3">
              {filteredTasks
                .filter((task) => !task.completed)
                .map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-lg border border-gray-200 p-3 dark:border-gray-800"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <h6 className="text-sm font-medium text-gray-900 dark:text-white">
                        {task.title}
                      </h6>
                      <button
                        className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                        onClick={() => {
                          setTasks(
                            tasks.map((t) =>
                              t.id === task.id ? { ...t, completed: true } : t,
                            ),
                          );
                        }}
                      >
                        <CheckCircle className="h-3 w-3 text-gray-400" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        {task.category}
                      </span>
                      {task.dueDate && (
                        <span
                          className={
                            new Date() > task.dueDate
                              ? "text-red-600 dark:text-red-400"
                              : "text-gray-500 dark:text-gray-400"
                          }
                        >
                          Due {formatDate(task.dueDate)}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 flex items-center justify-between">
              <h5 className="font-medium text-gray-900 dark:text-white">
                Completed
              </h5>
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
                {filteredTasks.filter((task) => task.completed).length}
              </span>
            </div>
            <div className="space-y-3">
              {filteredTasks
                .filter((task) => task.completed)
                .map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-lg border border-gray-200 p-3 dark:border-gray-800"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <h6 className="text-sm font-medium text-gray-500 line-through dark:text-gray-400">
                        {task.title}
                      </h6>
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                        <CheckCircle className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                        {task.category}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {formatTime(task.timeSpent)}
                      </span>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 flex items-center justify-between">
              <h5 className="font-medium text-gray-900 dark:text-white">
                Task Analytics
              </h5>
            </div>
            <div className="space-y-6">
              <div>
                <h6 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Completion Rate
                </h6>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-gray-500 dark:text-gray-400">
                    This week
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {Math.round(
                      (filteredTasks.filter((task) => task.completed).length /
                        filteredTasks.length) *
                        100,
                    )}
                    %
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                  <motion.div
                    className="h-full rounded-full bg-green-500"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(filteredTasks.filter((task) => task.completed).length / filteredTasks.length) * 100}%`,
                    }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>

              <div>
                <h6 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tasks by Category
                </h6>
                <div className="space-y-2">
                  {Object.entries(
                    filteredTasks.reduce((acc, task) => {
                      acc[task.category] = (acc[task.category] || 0) + 1;
                      return acc;
                    }, {}),
                  ).map(([category, count], index) => (
                    <div key={category}>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-gray-700 dark:text-gray-300">
                          {category}
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {count}
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            backgroundColor:
                              timeAllocation.find(
                                (item) => item.category === category,
                              )?.color || "#6b7280",
                          }}
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(count / filteredTasks.length) * 100}%`,
                          }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAchievementsTab = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900 dark:text-white">
            Achievements & Milestones
          </h4>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900"
              whileHover={{
                y: -4,
                boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="mb-3 flex items-center justify-between">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${getAchievementColor(achievement.level)}`}
                >
                  {achievement.icon}
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${getAchievementColor(achievement.level)}`}
                >
                  {achievement.level.charAt(0).toUpperCase() +
                    achievement.level.slice(1)}
                </span>
              </div>
              <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
                {achievement.title}
              </h5>
              <p className="mb-4 flex-1 text-sm text-gray-500 dark:text-gray-400">
                {achievement.description}
              </p>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="mr-1 h-3 w-3" />
                <span>Achieved on {formatDate(achievement.date)}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h5 className="mb-4 font-medium text-gray-900 dark:text-white">
            Progress Tracker
          </h5>
          <div className="space-y-4">
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Focus Time Streak
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  5 / 10 days
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <motion.div
                  className="h-full rounded-full bg-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: "50%" }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Task Completion Goal
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  15 / 20 tasks
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <motion.div
                  className="h-full rounded-full bg-green-500"
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Weekly Productivity Score
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  82 / 100
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <motion.div
                  className="h-full rounded-full bg-violet-500"
                  initial={{ width: 0 }}
                  animate={{ width: "82%" }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-violet-600"></div>
          <p className="text-gray-500 dark:text-gray-400">
            Loading productivity insights...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <XCircle className="mx-auto h-10 w-10 text-red-500" />
          <p className="mt-2 text-gray-900 dark:text-white">{error}</p>
          <button
            className="mt-4 rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Productivity Insights
        </h3>
        <div className="mt-3 sm:mt-0">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              className={`rounded-l-md px-4 py-2 text-sm font-medium ${
                activeTab === "overview"
                  ? "bg-violet-600 text-white hover:bg-violet-700"
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`border-l border-r px-4 py-2 text-sm font-medium ${
                activeTab === "time"
                  ? "bg-violet-600 text-white hover:bg-violet-700"
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("time")}
            >
              Time
            </button>
            <button
              className={`border-r px-4 py-2 text-sm font-medium ${
                activeTab === "tasks"
                  ? "bg-violet-600 text-white hover:bg-violet-700"
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("tasks")}
            >
              Tasks
            </button>
            <button
              className={`rounded-r-md px-4 py-2 text-sm font-medium ${
                activeTab === "achievements"
                  ? "bg-violet-600 text-white hover:bg-violet-700"
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("achievements")}
            >
              Achievements
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "overview" && renderOverviewTab()}
          {activeTab === "time" && renderTimeTab()}
          {activeTab === "tasks" && renderTasksTab()}
          {activeTab === "achievements" && renderAchievementsTab()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProductivityInsights;
