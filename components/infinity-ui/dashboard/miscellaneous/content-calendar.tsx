"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  Calendar,
  Clock,
  Edit,
  Trash2,
  Plus,
  Filter,
  Search,
  X,
  CheckCircle,
  AlertCircle,
  FileText,
  Video,
  Mic,
  ImageIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ContentStatus = "draft" | "scheduled" | "published" | "archived";
type ContentType = "blog" | "social" | "video" | "podcast" | "email";

interface ContentItem {
  id: string;
  title: string;
  description?: string;
  status: ContentStatus;
  type: ContentType;
  date: Date;
  author: {
    name: string;
    avatar: string;
  };
  tags: string[];
}

const ContentCalendar = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<ContentStatus | "all">(
    "all",
  );
  const [typeFilter, setTypeFilter] = useState<ContentType | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dragEnabled, setDragEnabled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const today = new Date();
        const mockContent: ContentItem[] = [
          {
            id: "1",
            title: "10 Tips for Better Productivity",
            description:
              "A comprehensive guide to improving your daily productivity",
            status: "published",
            type: "blog",
            date: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate() - 2,
            ),
            author: {
              name: "Alex Johnson",
              avatar:
                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
            },
            tags: ["productivity", "work", "tips"],
          },
          {
            id: "2",
            title: "New Product Launch Announcement",
            status: "scheduled",
            type: "social",
            date: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate() + 3,
            ),
            author: {
              name: "Sarah Williams",
              avatar:
                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
            },
            tags: ["product", "launch", "announcement"],
          },
          {
            id: "3",
            title: "Q3 Marketing Strategy",
            description: "Overview of our marketing plans for Q3",
            status: "draft",
            type: "email",
            date: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate() + 1,
            ),
            author: {
              name: "Michael Brown",
              avatar:
                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
            },
            tags: ["marketing", "strategy", "planning"],
          },
          {
            id: "4",
            title: "Interview with Industry Expert",
            description: "An in-depth conversation about industry trends",
            status: "scheduled",
            type: "podcast",
            date: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate() + 5,
            ),
            author: {
              name: "Emily Davis",
              avatar:
                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
            },
            tags: ["interview", "expert", "industry"],
          },
          {
            id: "5",
            title: "Product Demo Video",
            status: "draft",
            type: "video",
            date: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate() + 2,
            ),
            author: {
              name: "David Wilson",
              avatar:
                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
            },
            tags: ["product", "demo", "video"],
          },
          {
            id: "6",
            title: "Customer Success Story",
            description: "How our product helped a major client",
            status: "published",
            type: "blog",
            date: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate() - 1,
            ),
            author: {
              name: "Alex Johnson",
              avatar:
                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
            },
            tags: ["customer", "success", "case-study"],
          },
          {
            id: "7",
            title: "Weekly Newsletter",
            status: "scheduled",
            type: "email",
            date: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate() + 4,
            ),
            author: {
              name: "Sarah Williams",
              avatar:
                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
            },
            tags: ["newsletter", "weekly", "updates"],
          },
        ];

        setContent(mockContent);
        setError(null);
      } catch (err) {
        setError("Failed to load content data. Please try again later.");
        console.error("Error fetching content data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status: ContentStatus) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case "archived":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: ContentStatus) => {
    switch (status) {
      case "published":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "scheduled":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "draft":
        return <FileText className="h-4 w-4 text-gray-500" />;
      case "archived":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: ContentType) => {
    switch (type) {
      case "blog":
        return <FileText className="h-5 w-5 text-purple-500" />;
      case "social":
        return <ImageIcon className="h-5 w-5 text-blue-500" />;
      case "video":
        return <Video className="h-5 w-5 text-red-500" />;
      case "podcast":
        return <Mic className="h-5 w-5 text-green-500" />;
      case "email":
        return <FileText className="h-5 w-5 text-amber-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const filteredContent = content.filter((item) => {
    if (statusFilter !== "all" && item.status !== statusFilter) return false;
    if (typeFilter !== "all" && item.type !== typeFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        false ||
        item.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }
    return true;
  });

  // Calendar view helpers
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: null, date: null, isCurrentMonth: false });
    }

    // Add days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        day: i,
        date,
        isCurrentMonth: true,
        isToday: isSameDay(date, new Date()),
        content: content.filter((item) => isSameDay(item.date, date)),
      });
    }

    // Add empty cells to complete the grid (if needed)
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    for (let i = days.length; i < totalCells; i++) {
      days.push({ day: null, date: null, isCurrentMonth: false });
    }

    return days;
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <motion.div
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="border-b border-gray-200 p-4 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Content Calendar
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-800">
              <button
                className={`px-3 py-1 text-sm ${view === "calendar" ? "bg-gray-100 font-medium dark:bg-gray-800" : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900"}`}
                onClick={() => setView("calendar")}
              >
                Calendar
              </button>
              <button
                className={`px-3 py-1 text-sm ${view === "list" ? "bg-gray-100 font-medium dark:bg-gray-800" : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900"}`}
                onClick={() => setView("list")}
              >
                List
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-offset-gray-900"
            >
              <Plus className="mr-1 h-4 w-4" />
              New Content
            </motion.button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 rounded-md border border-gray-300 bg-white pl-9 pr-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
            />
            {searchQuery && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                <Filter className="mr-1 h-4 w-4" />
                Status: {statusFilter === "all" ? "All" : statusFilter}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("draft")}>
                Draft
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("scheduled")}>
                Scheduled
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("published")}>
                Published
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("archived")}>
                Archived
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                <Filter className="mr-1 h-4 w-4" />
                Type: {typeFilter === "all" ? "All" : typeFilter}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTypeFilter("all")}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter("blog")}>
                Blog
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter("social")}>
                Social
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter("video")}>
                Video
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter("podcast")}>
                Podcast
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter("email")}>
                Email
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {view === "list" && (
            <button
              className={`flex items-center rounded-md border border-gray-300 px-3 py-1.5 text-sm ${
                dragEnabled
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-400 dark:bg-indigo-900/20 dark:text-indigo-300"
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => setDragEnabled(!dragEnabled)}
            >
              {dragEnabled ? "Done Reordering" : "Reorder Items"}
            </button>
          )}
        </div>
      </div>

      <div className="p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <motion.div
              className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-indigo-500"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Loading content calendar...
            </p>
          </div>
        ) : error ? (
          <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
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
        ) : view === "calendar" ? (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                {currentMonth.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h4>
              <div className="flex items-center gap-2">
                <button
                  className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                  onClick={goToPreviousMonth}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-left"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <button
                  className="rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                  onClick={goToToday}
                >
                  Today
                </button>
                <button
                  className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                  onClick={goToNextMonth}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {/* Weekday headers */}
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  {day}
                </div>
              ))}

              {/* Calendar days */}
              <AnimatePresence>
                {generateCalendarDays().map((day, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`relative min-h-[100px] rounded-lg border p-1 ${
                      !day.isCurrentMonth
                        ? "border-transparent bg-gray-50 opacity-40 dark:bg-gray-900/50"
                        : day.isToday
                          ? "border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-900/20"
                          : "border-gray-200 bg-white hover:border-indigo-200 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-indigo-800"
                    }`}
                  >
                    {day.day && (
                      <>
                        <div className="mb-1 text-right text-xs font-medium text-gray-700 dark:text-gray-300">
                          {day.day}
                        </div>
                        <div className="space-y-1 overflow-y-auto">
                          {day.content?.map((item) => (
                            <motion.div
                              key={item.id}
                              whileHover={{ y: -2 }}
                              className={`cursor-pointer rounded px-1.5 py-0.5 text-xs ${getStatusColor(item.status)}`}
                              title={item.title}
                            >
                              <div className="flex items-center gap-1 truncate">
                                {getTypeIcon(item.type)}
                                <span className="truncate">{item.title}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div>
            {filteredContent.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Calendar className="mb-2 h-12 w-12 text-gray-400" />
                <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
                  No content found
                </h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {searchQuery || statusFilter !== "all" || typeFilter !== "all"
                    ? "Try adjusting your filters"
                    : "Add your first content item to get started"}
                </p>
                {(searchQuery ||
                  statusFilter !== "all" ||
                  typeFilter !== "all") && (
                  <button
                    className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("all");
                      setTypeFilter("all");
                    }}
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <Reorder.Group
                axis="y"
                values={filteredContent}
                onReorder={
                  dragEnabled ? (newOrder) => setContent(newOrder) : () => {}
                }
                className="space-y-3"
              >
                <AnimatePresence>
                  {filteredContent.map((item) => (
                    <Reorder.Item
                      key={item.id}
                      value={item}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 ${
                        dragEnabled ? "cursor-move" : ""
                      }`}
                      dragListener={dragEnabled}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                            {getTypeIcon(item.type)}
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white">
                              {item.title}
                            </h5>
                            {item.description && (
                              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                {item.description}
                              </p>
                            )}
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              <div
                                className={`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(item.status)}`}
                              >
                                {getStatusIcon(item.status)}
                                <span className="ml-1 capitalize">
                                  {item.status}
                                </span>
                              </div>
                              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                <Calendar className="mr-1 h-3.5 w-3.5" />
                                {formatDate(item.date)}
                              </div>
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 hover:text-red-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-red-400">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </Reorder.Item>
                  ))}
                </AnimatePresence>
              </Reorder.Group>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ContentCalendar;
