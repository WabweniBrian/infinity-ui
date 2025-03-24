"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Edit,
  PlusCircle,
  Trash,
  Filter,
  CalendarDays,
  List,
  X,
  Instagram,
  Twitter,
  LinkIcon,
  Video,
  Youtube,
  FileText,
  Layout,
  ImagePlus,
  ClockIcon,
  CalendarIcon,
} from "lucide-react";

// Types
type SocialPlatform =
  | "instagram"
  | "twitter"
  | "linkedin"
  | "tiktok"
  | "youtube"
  | "facebook";

type ContentType =
  | "image"
  | "video"
  | "carousel"
  | "text"
  | "story"
  | "reel"
  | "tweet";

type ContentStatus = "draft" | "scheduled" | "published" | "failed";

type ContentPost = {
  id: string;
  title: string;
  description: string;
  contentType: ContentType;
  platforms: SocialPlatform[];
  mediaUrls: string[];
  status: ContentStatus;
  scheduledDate?: Date;
  publishedDate?: Date;
  performance?: {
    likes: number;
    comments: number;
    shares: number;
    impressions: number;
    clicks?: number;
    engagement?: number;
    reach?: number;
  };
  tags: string[];
  color: string;
  author?: string;
  approvalStatus?: "pending" | "approved" | "rejected";
  notes?: string;
};

interface ContentCalendarProps {
  contentPosts: ContentPost[];
  onAddContent: () => void;
  onEditPost: (post: ContentPost) => void;
  onDeletePost: (postId: string) => void;
}

const ContentCalendar = ({
  contentPosts,
  onAddContent,
  onEditPost,
  onDeletePost,
}: ContentCalendarProps) => {
  // State for calendar navigation
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<"month" | "week" | "list">(
    "month",
  );
  const [showYearSelector, setShowYearSelector] = useState(false);
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ContentPost | null>(null);
  const [showPostDetails, setShowPostDetails] = useState(false);
  const [activePlatformFilter, setActivePlatformFilter] = useState<
    SocialPlatform | "all"
  >("all");
  const [activeStatusFilter, setActiveStatusFilter] = useState<
    ContentStatus | "all"
  >("all");
  const [showFilters, setShowFilters] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowYearSelector(false);
        setShowMonthSelector(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Helper functions
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPlatformIcon = (platform: SocialPlatform, size = 20) => {
    switch (platform) {
      case "instagram":
        return <Instagram size={size} />;
      case "twitter":
        return <Twitter size={size} />;
      case "linkedin":
        return <LinkIcon size={size} />;
      case "tiktok":
        return <Video size={size} />;
      case "youtube":
        return <Youtube size={size} />;
      case "facebook":
        return <Facebook size={size} />;
      default:
        return <LinkIcon size={size} />;
    }
  };

  // Custom Facebook icon since it's not in lucide-react
  const Facebook = ({ size = 24 }: { size?: number }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  );

  const getContentTypeIcon = (contentType: ContentType, size = 20) => {
    switch (contentType) {
      case "image":
        return <ImagePlus size={size} />;
      case "video":
        return <Video size={size} />;
      case "carousel":
        return <Layout size={size} />;
      case "text":
        return <FileText size={size} />;
      case "story":
        return <ClockIcon size={size} />;
      case "reel":
        return <Video size={size} />;
      case "tweet":
        return <Twitter size={size} />;
      default:
        return <FileText size={size} />;
    }
  };

  const getStatusColor = (status: ContentStatus) => {
    switch (status) {
      case "published":
        return "bg-green-500";
      case "scheduled":
        return "bg-yellow-500";
      case "draft":
        return "bg-gray-400";
      case "failed":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusDot = (status: ContentStatus, size = "w-2 h-2") => {
    return (
      <span
        className={`${size} ${getStatusColor(status)} inline-block shrink-0 rounded-full`}
        title={status.charAt(0).toUpperCase() + status.slice(1)}
      ></span>
    );
  };

  const getMonthName = (month: number) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[month];
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const getPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const getNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const getPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const getNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const selectYear = (year: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    setCurrentDate(newDate);
    setShowYearSelector(false);
  };

  const selectMonth = (month: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(month);
    setCurrentDate(newDate);
    setShowMonthSelector(false);
  };

  const handlePostClick = (post: ContentPost) => {
    setSelectedPost(post);
    setShowPostDetails(true);
  };

  // Filter posts based on active filters
  const filteredPosts = contentPosts.filter((post) => {
    if (activeStatusFilter !== "all" && post.status !== activeStatusFilter) {
      return false;
    }
    if (
      activePlatformFilter !== "all" &&
      !post.platforms.includes(activePlatformFilter)
    ) {
      return false;
    }
    return true;
  });

  // Get posts for a specific day
  const getPostsForDay = (day: number) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = new Date(year, month, day);

    return filteredPosts.filter((post) => {
      if (post.scheduledDate) {
        const postDate = new Date(post.scheduledDate);
        return (
          postDate.getFullYear() === year &&
          postDate.getMonth() === month &&
          postDate.getDate() === day
        );
      }
      if (post.publishedDate) {
        const postDate = new Date(post.publishedDate);
        return (
          postDate.getFullYear() === year &&
          postDate.getMonth() === month &&
          postDate.getDate() === day
        );
      }
      return false;
    });
  };

  // Get posts for a specific week
  const getPostsForWeek = () => {
    // Get the start of the week (Sunday)
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    // Get the end of the week (Saturday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return filteredPosts.filter((post) => {
      if (post.scheduledDate) {
        const postDate = new Date(post.scheduledDate);
        return postDate >= startOfWeek && postDate <= endOfWeek;
      }
      if (post.publishedDate) {
        const postDate = new Date(post.publishedDate);
        return postDate >= startOfWeek && postDate <= endOfWeek;
      }
      return false;
    });
  };

  // Get the days of the current week
  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }

    return days;
  };

  // Generate calendar grid
  const generateCalendarGrid = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="h-24 rounded-lg border border-gray-100 p-1 dark:border-gray-700"
        ></div>,
      );
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const postsForDay = getPostsForDay(day);
      const isToday =
        new Date().getFullYear() === year &&
        new Date().getMonth() === month &&
        new Date().getDate() === day;

      days.push(
        <div
          key={`day-${day}`}
          className={`h-24 rounded-lg border p-1 transition-colors ${
            isToday
              ? "border-purple-400 bg-purple-50/30 dark:border-purple-600 dark:bg-purple-900/10"
              : "border-gray-100 hover:bg-gray-50/50 dark:border-gray-700 dark:hover:bg-gray-700/20"
          }`}
        >
          <div
            className={`text-xs font-medium ${
              isToday
                ? "text-purple-600 dark:text-purple-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {day}
          </div>

          <div className="hide-scrollbar mt-1 flex flex-col gap-1 overflow-y-auto">
            {postsForDay.slice(0, 3).map((post) => (
              <motion.div
                key={post.id}
                className="cursor-pointer rounded-md p-1 text-xs"
                style={{ backgroundColor: `${post.color}20` }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePostClick(post)}
              >
                <div className="flex items-center">
                  <div className="mr-1 flex">
                    {getStatusDot(post.status, "w-1.5 h-1.5")}
                    <span className="ml-1 mr-0.5 flex">
                      {post.platforms.slice(0, 2).map((platform) => (
                        <span key={platform} className="mr-0.5">
                          {getPlatformIcon(platform, 8)}
                        </span>
                      ))}
                      {post.platforms.length > 2 && (
                        <span className="text-[8px]">
                          +{post.platforms.length - 2}
                        </span>
                      )}
                    </span>
                  </div>
                  <span className="truncate">{post.title}</span>
                </div>
              </motion.div>
            ))}
            {postsForDay.length > 3 && (
              <div className="text-center text-[10px] text-gray-500 dark:text-gray-400">
                +{postsForDay.length - 3} more
              </div>
            )}
          </div>
        </div>,
      );
    }

    // Add empty cells to complete the grid (if needed)
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    for (let i = firstDay + daysInMonth; i < totalCells; i++) {
      days.push(
        <div
          key={`empty-end-${i}`}
          className="h-24 rounded-lg border border-gray-100 p-1 dark:border-gray-700"
        ></div>,
      );
    }

    return days;
  };

  // Render month view
  const renderMonthView = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <motion.button
            className="mr-2 rounded-full bg-gray-100 p-1.5 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowMonthSelector(!showMonthSelector)}
          >
            <ChevronDown size={16} />
          </motion.button>
          <div className="relative">
            <h3
              className="cursor-pointer text-lg font-semibold dark:text-white"
              onClick={() => setShowMonthSelector(!showMonthSelector)}
            >
              {getMonthName(currentDate.getMonth())} {currentDate.getFullYear()}
            </h3>

            <AnimatePresence>
              {showMonthSelector && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 top-8 z-10 w-64 rounded-lg bg-white p-2 shadow-lg dark:bg-gray-800"
                  ref={dropdownRef}
                >
                  <div className="mb-2 flex items-center justify-between border-b border-gray-100 pb-2 dark:border-gray-700">
                    <button
                      className="text-sm font-medium text-gray-600 dark:text-gray-300"
                      onClick={() => {
                        const newDate = new Date(currentDate);
                        newDate.setFullYear(newDate.getFullYear() - 1);
                        setCurrentDate(newDate);
                      }}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span
                      className="cursor-pointer text-sm font-medium text-gray-800 dark:text-white"
                      onClick={() => {
                        setShowMonthSelector(false);
                        setShowYearSelector(true);
                      }}
                    >
                      {currentDate.getFullYear()}
                    </span>
                    <button
                      className="text-sm font-medium text-gray-600 dark:text-gray-300"
                      onClick={() => {
                        const newDate = new Date(currentDate);
                        newDate.setFullYear(newDate.getFullYear() + 1);
                        setCurrentDate(newDate);
                      }}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {Array.from({ length: 12 }).map((_, index) => (
                      <motion.button
                        key={index}
                        className={`rounded-md p-2 text-sm ${
                          currentDate.getMonth() === index
                            ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => selectMonth(index)}
                      >
                        {getMonthName(index).substring(0, 3)}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showYearSelector && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 top-8 z-10 w-64 rounded-lg bg-white p-2 shadow-lg dark:bg-gray-800"
                  ref={dropdownRef}
                >
                  <div className="mb-2 flex items-center justify-between border-b border-gray-100 pb-2 dark:border-gray-700">
                    <button
                      className="text-sm font-medium text-gray-600 dark:text-gray-300"
                      onClick={() => {
                        const newDate = new Date(currentDate);
                        newDate.setFullYear(newDate.getFullYear() - 12);
                        setCurrentDate(newDate);
                      }}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="text-sm font-medium text-gray-800 dark:text-white">
                      {currentDate.getFullYear() - 6} -{" "}
                      {currentDate.getFullYear() + 5}
                    </span>
                    <button
                      className="text-sm font-medium text-gray-600 dark:text-gray-300"
                      onClick={() => {
                        const newDate = new Date(currentDate);
                        newDate.setFullYear(newDate.getFullYear() + 12);
                        setCurrentDate(newDate);
                      }}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 12 }).map((_, index) => {
                      const year = currentDate.getFullYear() - 6 + index;
                      return (
                        <motion.button
                          key={year}
                          className={`rounded-md p-2 text-sm ${
                            currentDate.getFullYear() === year
                              ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                              : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => selectYear(year)}
                        >
                          {year}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            className="rounded-full bg-gray-100 p-1.5 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToToday}
          >
            <Calendar size={16} />
          </motion.button>
          <motion.button
            className="rounded-full bg-gray-100 p-1.5 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={getPreviousMonth}
          >
            <ChevronLeft size={16} />
          </motion.button>
          <motion.button
            className="rounded-full bg-gray-100 p-1.5 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={getNextMonth}
          >
            <ChevronRight size={16} />
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            {day}
          </div>
        ))}

        {generateCalendarGrid()}
      </div>
    </div>
  );

  // Render week view
  const renderWeekView = () => {
    const weekDays = getWeekDays();
    const weekPosts = getPostsForWeek();

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold dark:text-white">
              Week of {formatDate(weekDays[0])} - {formatDate(weekDays[6])}
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <motion.button
              className="rounded-full bg-gray-100 p-1.5 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={goToToday}
            >
              <Calendar size={16} />
            </motion.button>
            <motion.button
              className="rounded-full bg-gray-100 p-1.5 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={getPreviousWeek}
            >
              <ChevronLeft size={16} />
            </motion.button>
            <motion.button
              className="rounded-full bg-gray-100 p-1.5 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={getNextWeek}
            >
              <ChevronRight size={16} />
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day, index) => (
            <div key={index} className="flex flex-col">
              <div
                className={`text-center text-sm font-medium ${
                  day.toDateString() === new Date().toDateString()
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {day.toLocaleDateString("en-US", { weekday: "short" })}
                <div
                  className={`mt-1 rounded-full px-2 py-1 text-xs ${
                    day.toDateString() === new Date().toDateString()
                      ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  {day.getDate()}
                </div>
              </div>
              <div className="hide-scrollbar mt-2 flex flex-col gap-2 overflow-y-auto">
                {weekPosts
                  .filter((post) => {
                    const postDate = post.scheduledDate || post.publishedDate;
                    if (!postDate) return false;
                    return postDate.toDateString() === day.toDateString();
                  })
                  .slice(0, 5)
                  .map((post) => (
                    <motion.div
                      key={post.id}
                      className="cursor-pointer rounded-md p-2 text-xs"
                      style={{ backgroundColor: `${post.color}20` }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePostClick(post)}
                    >
                      <div className="flex items-center gap-1">
                        {getStatusDot(post.status)}
                        {getContentTypeIcon(post.contentType, 12)}
                      </div>
                      <div className="mt-1 truncate font-medium">
                        {post.title}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {post.platforms.slice(0, 3).map((platform) => (
                          <span key={platform}>
                            {getPlatformIcon(platform, 10)}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render list view
  const renderListView = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold dark:text-white">List of Posts</h3>
        <div className="flex items-center space-x-2">
          <select
            className="rounded-lg border border-gray-300 bg-white/80 px-3 py-1.5 text-sm backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white"
            value={activeStatusFilter}
            onChange={(e) =>
              setActiveStatusFilter(e.target.value as ContentStatus | "all")
            }
          >
            <option value="all">All Statuses</option>
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredPosts
          .sort((a, b) => {
            // Sort by status first (published, scheduled, draft)
            const statusOrder = {
              published: 0,
              scheduled: 1,
              draft: 2,
              failed: 3,
            };
            const statusDiff = statusOrder[a.status] - statusOrder[b.status];
            if (statusDiff !== 0) return statusDiff;

            // Then sort by date
            const dateA = a.scheduledDate || a.publishedDate || new Date(0);
            const dateB = b.scheduledDate || b.publishedDate || new Date(0);
            return dateB.getTime() - dateA.getTime();
          })
          .slice(0, 10)
          .map((post) => (
            <motion.div
              key={post.id}
              className="flex items-center justify-between rounded-lg border border-gray-100 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              onClick={() => handlePostClick(post)}
            >
              <div className="flex items-center">
                <div
                  className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${post.color}20` }}
                >
                  {getContentTypeIcon(post.contentType)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    {getStatusDot(post.status)}
                    <p className="font-medium dark:text-white">{post.title}</p>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="mr-2 flex">
                      {post.platforms.map((platform, idx) => (
                        <span key={platform} className="mr-1">
                          {getPlatformIcon(platform, 12)}
                        </span>
                      ))}
                    </span>
                    <span>
                      {post.scheduledDate
                        ? formatDate(post.scheduledDate) +
                          " at " +
                          formatTime(post.scheduledDate)
                        : post.publishedDate
                          ? formatDate(post.publishedDate)
                          : "Not scheduled"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <motion.button
                  className="rounded-full bg-gray-100 p-1.5 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditPost(post);
                  }}
                >
                  <Edit size={14} />
                </motion.button>
                <motion.button
                  className="rounded-full bg-gray-100 p-1.5 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeletePost(post.id);
                  }}
                >
                  <Trash size={14} />
                </motion.button>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );

  // Post Details Modal
  const PostDetailsModal = () => {
    if (!selectedPost) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        onClick={() => setShowPostDetails(false)}
      >
        <motion.div
          className="relative max-h-[80vh] w-full max-w-lg overflow-auto rounded-2xl bg-white/95 p-6 shadow-xl backdrop-blur-xl dark:bg-gray-800/95"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <motion.button
            className="absolute right-4 top-4 rounded-full bg-gray-100/80 p-2 text-gray-500 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
            onClick={() => setShowPostDetails(false)}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={20} />
          </motion.button>

          <div className="flex items-center">
            <div
              className="mr-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: `${selectedPost.color}20` }}
            >
              {getContentTypeIcon(selectedPost.contentType, 24)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                {getStatusDot(selectedPost.status)}
                <h2 className="text-xl font-bold dark:text-white">
                  {selectedPost.title}
                </h2>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span className="mr-2 flex">
                  {selectedPost.platforms.map((platform) => (
                    <span key={platform} className="mr-1">
                      {getPlatformIcon(platform, 14)}
                    </span>
                  ))}
                </span>
                <span>
                  {selectedPost.scheduledDate
                    ? formatDate(selectedPost.scheduledDate) +
                      " at " +
                      formatTime(selectedPost.scheduledDate)
                    : selectedPost.publishedDate
                      ? "Published on " + formatDate(selectedPost.publishedDate)
                      : "Not scheduled"}
                </span>
              </div>
            </div>
          </div>

          {selectedPost.mediaUrls.length > 0 && (
            <div className="mt-4 overflow-hidden rounded-lg">
              <Image
                src={selectedPost.mediaUrls[0] || "/default-image.jpg"}
                alt={selectedPost.title}
                width={400}
                height={300}
                className="h-auto w-full object-cover"
              />
            </div>
          )}

          <div className="mt-4">
            <h3 className="font-medium dark:text-white">Description</h3>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              {selectedPost.description}
            </p>
          </div>

          {selectedPost.author && (
            <div className="mt-4">
              <h3 className="font-medium dark:text-white">Author</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                {selectedPost.author}
              </p>
            </div>
          )}

          {selectedPost.approvalStatus && (
            <div className="mt-4">
              <h3 className="font-medium dark:text-white">Approval Status</h3>
              <div className="mt-1 flex items-center gap-2">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${
                    selectedPost.approvalStatus === "approved"
                      ? "bg-green-500"
                      : selectedPost.approvalStatus === "rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                  }`}
                ></span>
                <span className="capitalize text-gray-600 dark:text-gray-300">
                  {selectedPost.approvalStatus}
                </span>
              </div>
            </div>
          )}

          <div className="mt-4">
            <h3 className="font-medium dark:text-white">Tags</h3>
            <div className="mt-2 flex flex-wrap gap-1">
              {selectedPost.tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {selectedPost.notes && (
            <div className="mt-4">
              <h3 className="font-medium dark:text-white">Notes</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                {selectedPost.notes}
              </p>
            </div>
          )}

          {selectedPost.status === "published" && selectedPost.performance && (
            <div className="mt-4">
              <h3 className="font-medium dark:text-white">Performance</h3>
              <div className="mt-2 grid grid-cols-3 gap-2 rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Likes
                  </p>
                  <p className="font-medium dark:text-white">
                    {selectedPost.performance.likes.toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Comments
                  </p>
                  <p className="font-medium dark:text-white">
                    {selectedPost.performance.comments.toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Shares
                  </p>
                  <p className="font-medium dark:text-white">
                    {selectedPost.performance.shares.toLocaleString()}
                  </p>
                </div>
              </div>

              {(selectedPost.performance.engagement ||
                selectedPost.performance.reach) && (
                <div className="mt-2 grid grid-cols-2 gap-2 rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                  {selectedPost.performance.engagement && (
                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Engagement Rate
                      </p>
                      <p className="font-medium dark:text-white">
                        {selectedPost.performance.engagement.toFixed(1)}%
                      </p>
                    </div>
                  )}
                  {selectedPost.performance.reach && (
                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Reach
                      </p>
                      <p className="font-medium dark:text-white">
                        {selectedPost.performance.reach.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="mt-6 flex justify-end space-x-3">
            <motion.button
              className="rounded-xl border border-gray-300/80 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => setShowPostDetails(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>
            <motion.button
              className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:shadow-lg"
              onClick={() => {
                setShowPostDetails(false);
                onEditPost(selectedPost);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Edit Post
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-xl font-bold dark:text-white">Content Calendar</h2>
        <div className="flex w-full flex-wrap gap-2 sm:w-auto">
          <div className="flex items-center space-x-2">
            <motion.button
              className={`flex items-center rounded-lg px-3 py-1.5 text-sm font-medium ${
                currentView === "month"
                  ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentView("month")}
            >
              <CalendarDays size={16} className="mr-1" />
              Month
            </motion.button>
            <motion.button
              className={`flex items-center rounded-lg px-3 py-1.5 text-sm font-medium ${
                currentView === "week"
                  ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentView("week")}
            >
              <CalendarIcon size={16} className="mr-1" />
              Week
            </motion.button>
            <motion.button
              className={`flex items-center rounded-lg px-3 py-1.5 text-sm font-medium ${
                currentView === "list"
                  ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentView("list")}
            >
              <List size={16} className="mr-1" />
              List
            </motion.button>
            <motion.button
              className="flex items-center rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} className="mr-1" />
              Filter
            </motion.button>
          </div>
          <motion.button
            className="flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddContent}
          >
            <PlusCircle size={16} className="mr-1" />
            Add Content
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50"
          >
            <div className="flex flex-wrap gap-4">
              <div>
                <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Platform
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActivePlatformFilter("all")}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      activePlatformFilter === "all"
                        ? "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-200 dark:hover:bg-purple-900/50"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    All Platforms
                  </button>
                  {(
                    [
                      "instagram",
                      "twitter",
                      "linkedin",
                      "tiktok",
                      "facebook",
                      "youtube",
                    ] as SocialPlatform[]
                  ).map((platform) => (
                    <button
                      key={platform}
                      onClick={() => setActivePlatformFilter(platform)}
                      className={`flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                        activePlatformFilter === platform
                          ? "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-200 dark:hover:bg-purple-900/50"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      }`}
                    >
                      {getPlatformIcon(platform, 12)}
                      <span className="ml-1">
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveStatusFilter("all")}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      activeStatusFilter === "all"
                        ? "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-200 dark:hover:bg-purple-900/50"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    All Statuses
                  </button>
                  {(
                    [
                      "scheduled",
                      "published",
                      "draft",
                      "failed",
                    ] as ContentStatus[]
                  ).map((status) => (
                    <button
                      key={status}
                      onClick={() => setActiveStatusFilter(status)}
                      className={`flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                        activeStatusFilter === status
                          ? "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-200 dark:hover:bg-purple-900/50"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      }`}
                    >
                      {getStatusDot(status, "w-1.5 h-1.5")}
                      <span className="ml-1 capitalize">{status}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        {currentView === "month"
          ? renderMonthView()
          : currentView === "week"
            ? renderWeekView()
            : renderListView()}
      </div>

      <AnimatePresence>
        {showPostDetails && <PostDetailsModal />}
      </AnimatePresence>
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
        .scrollbar-hover::-webkit-scrollbar-thumb {
          background-color: transparent;
        }
        .scrollbar-hover:hover::-webkit-scrollbar-thumb {
          background-color: #c7c7c7;
        }
      `}</style>
    </div>
  );
};

export default ContentCalendar;
