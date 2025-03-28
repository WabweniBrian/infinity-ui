"use client";

import type React from "react";

import {
  ChatMessage,
  COLORS,
  Course,
  courses,
  goals,
  initialChatMessages,
  LearningPath,
  learningPaths,
  progressTrendData,
  recommendations,
  subjectDistributionData,
  weeklyStudyData,
} from "@/data/ai-tutor";
import useMediaQuery from "@/hooks/use-media-query";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  Calendar,
  Check,
  Clock,
  Compass,
  FileText,
  Flame,
  GraduationCap,
  LayoutDashboard,
  Lightbulb,
  List,
  MessageSquare,
  Moon,
  PenTool,
  Plus,
  Search,
  Settings,
  Sparkles,
  Star,
  Sun,
  Target,
  Trash,
  TrendingUp,
  User,
  X,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function AIPersonalTutor() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [chatMessages, setChatMessages] =
    useState<ChatMessage[]>(initialChatMessages);
  const [userMessage, setUserMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [showPathDetails, setShowPathDetails] = useState(false);
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalDescription, setNewGoalDescription] = useState("");
  const [newGoalDeadline, setNewGoalDeadline] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);

  // Effects
  useEffect(() => {
    // Check system preference for dark mode
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = courses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          course.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
      setFilteredCourses(filtered);
    } else {
      if (activeCategory === "All") {
        setFilteredCourses(courses);
      } else {
        setFilteredCourses(
          courses.filter((course) => course.category === activeCategory),
        );
      }
    }
  }, [searchQuery, activeCategory]);

  // Handlers
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userMessage.trim() || isGenerating) return;

    // Add user message
    const newUserMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      content: userMessage,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, newUserMessage]);
    setUserMessage("");
    setIsGenerating(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "Based on your question, I recommend focusing on supervised learning algorithms first. The key concepts to understand are training data, features, labels, and model evaluation metrics like accuracy and precision.",
        "I've analyzed your learning patterns and noticed you&apos;re making great progress in JavaScript! To continue improving, I suggest practicing more with async/await patterns and exploring modern frameworks.",
        "Looking at your current goals, I see you&apos;re aiming to complete the Machine Learning course by May 30th. You&apos;re 65% through the course, which is excellent progress! Would you like me to create a study plan to help you complete it on time?",
        "I've found some great resources that might help with your current studies. There's an excellent article on neural networks that complements your Machine Learning course, and I've also identified some practice exercises for algorithm implementation.",
        "Based on your learning history, I notice you haven&apos;t practiced UX Design concepts recently. Would you like to schedule some time to review these concepts, or would you prefer to focus on your current priorities in Machine Learning and JavaScript?",
      ];

      const randomResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];

      const newAiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        content: randomResponse,
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, newAiMessage]);
      setIsGenerating(false);
    }, 1500);
  };

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setShowCourseDetails(true);
  };

  const handlePathClick = (path: LearningPath) => {
    setSelectedPath(path);
    setShowPathDetails(true);
  };

  const filterByCategory = (category: string) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(
        courses.filter((course) => course.category === category),
      );
    }
  };

  const addNewGoal = () => {
    // Implementation would go here
    setShowAddGoalModal(false);
    setNewGoalTitle("");
    setNewGoalDescription("");
    setNewGoalDeadline("");
  };

  // Chart rendering functions
  const renderStudyTimeChart = () => {
    return (
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={weeklyStudyData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis
              dataKey="day"
              tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
            />
            <YAxis
              tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
              label={{
                value: "Minutes",
                angle: -90,
                position: "insideLeft",
                style: { fill: darkMode ? "#e5e7eb" : "#4b5563" },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                borderColor: darkMode ? "#374151" : "#e5e7eb",
                color: darkMode ? "#e5e7eb" : "#4b5563",
              }}
            />
            <Area
              type="monotone"
              dataKey="minutes"
              stroke="#8b5cf6"
              fillOpacity={1}
              fill="url(#colorMinutes)"
              activeDot={{ r: 8 }}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderSubjectDistributionChart = () => {
    return (
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={subjectDistributionData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              animationDuration={1500}
            >
              {subjectDistributionData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, "Distribution"]} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderProgressTrendChart = () => {
    return (
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={progressTrendData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis
              dataKey="month"
              tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
            />
            <YAxis
              tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
              domain={[0, 100]}
              label={{
                value: "Progress %",
                angle: -90,
                position: "insideLeft",
                style: { fill: darkMode ? "#e5e7eb" : "#4b5563" },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                borderColor: darkMode ? "#374151" : "#e5e7eb",
                color: darkMode ? "#e5e7eb" : "#4b5563",
              }}
              formatter={(value) => [`${value}%`, "Progress"]}
            />
            <Line
              type="monotone"
              dataKey="progress"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  // View rendering functions
  const renderDashboard = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white shadow-lg dark:from-purple-800 dark:to-indigo-900"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Welcome back, Alex!</h2>
            <p className="mt-1 text-purple-100">
              Here&apos;s your learning summary for today
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-white/20 p-3 backdrop-blur-sm"
          >
            <Brain size={24} />
          </motion.div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-lg bg-white/10 p-3 backdrop-blur-sm"
          >
            <p className="text-sm text-purple-100">Study Streak</p>
            <p className="text-xl font-bold">7 days</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-lg bg-white/10 p-3 backdrop-blur-sm"
          >
            <p className="text-sm text-purple-100">Today&apos;s Goal</p>
            <p className="text-xl font-bold">2/3 hours</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-lg bg-white/10 p-3 backdrop-blur-sm"
          >
            <p className="text-sm text-purple-100">Courses</p>
            <p className="text-xl font-bold">4 active</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-lg bg-white/10 p-3 backdrop-blur-sm"
          >
            <p className="text-sm text-purple-100">Next Milestone</p>
            <p className="text-xl font-bold">2 days</p>
          </motion.div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold dark:text-white">
              Continue Learning
            </h3>
            <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
              65% Complete
            </span>
          </div>
          <div className="rounded-lg border border-gray-100 p-4 dark:border-gray-700">
            <div className="flex items-center">
              <div className="relative mr-4 h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={
                    courses[0].image ||
                    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                  }
                  alt={courses[0].title}
                  fill
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <h4 className="font-medium dark:text-white">
                  {courses[0].title}
                </h4>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {courses[0].category} •{" "}
                  {courses[0].level.charAt(0).toUpperCase() +
                    courses[0].level.slice(1)}
                </p>
              </div>
            </div>
            <div className="mt-3">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Progress
                </span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {courses[0].progress}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${courses[0].progress}%` }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="h-full rounded-full bg-purple-600"
                ></motion.div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-3 flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 py-2 text-sm font-medium text-white shadow transition-all hover:shadow-md"
              onClick={() => handleCourseClick(courses[0])}
            >
              Continue Learning
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
        >
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Today&apos;s Schedule
          </h3>
          <div className="space-y-3">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-gray-700"
            >
              <div className="flex items-center">
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="font-medium dark:text-white">
                    Machine Learning Algorithms
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    10:00 AM - 11:30 AM
                  </p>
                </div>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                <Check size={16} />
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-gray-700"
            >
              <div className="flex items-center">
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                  <FileText size={18} />
                </div>
                <div>
                  <p className="font-medium dark:text-white">
                    JavaScript Practice
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    2:00 PM - 3:30 PM
                  </p>
                </div>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-700">
                <Clock size={16} />
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-gray-700"
            >
              <div className="flex items-center">
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <p className="font-medium dark:text-white">
                    Study Group Meeting
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    5:00 PM - 6:00 PM
                  </p>
                </div>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-700">
                <Clock size={16} />
              </div>
            </motion.div>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-3 flex w-full items-center justify-center rounded-lg bg-gray-100 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            View Full Schedule
          </motion.button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
        >
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Weekly Study Time
          </h3>
          {renderStudyTimeChart()}
          <div className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            Total study time this week:{" "}
            {weeklyStudyData.reduce((sum, day) => sum + day.minutes, 0)} minutes
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
        >
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Subject Distribution
          </h3>
          {renderSubjectDistributionChart()}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold dark:text-white">
            AI Recommendations
          </h3>
          <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
            Personalized for you
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.slice(0, 3).map((recommendation, index) => (
            <motion.div
              key={recommendation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              className="rounded-lg border border-gray-100 p-4 transition-all hover:shadow-md dark:border-gray-700"
            >
              <div className="mb-2 flex items-center justify-between">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    recommendation.priority === "high"
                      ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                      : recommendation.priority === "medium"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                  }`}
                >
                  {recommendation.priority.charAt(0).toUpperCase() +
                    recommendation.priority.slice(1)}{" "}
                  Priority
                </span>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    recommendation.type === "course"
                      ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200"
                      : recommendation.type === "resource"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                        : recommendation.type === "practice"
                          ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200"
                          : "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200"
                  }`}
                >
                  {recommendation.type.charAt(0).toUpperCase() +
                    recommendation.type.slice(1)}
                </span>
              </div>
              <h4 className="font-medium dark:text-white">
                {recommendation.title}
              </h4>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {recommendation.description}
              </p>
              <p className="mt-2 text-xs italic text-gray-500 dark:text-gray-400">
                <span className="font-medium">Why:</span>{" "}
                {recommendation.reason}
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-3 flex w-full items-center justify-center rounded-lg bg-gray-100 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                View Details
              </motion.button>
            </motion.div>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-4 flex w-full items-center justify-center rounded-lg bg-gray-100 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          View All Recommendations
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
      >
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Learning Progress Trend
        </h3>
        {renderProgressTrendChart()}
        <div className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          Your learning progress has improved by 55% over the last 5 months!
        </div>
      </motion.div>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-xl font-bold dark:text-white">My Courses</h2>
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <div className="relative flex-grow sm:flex-grow-0">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-2 pr-10 backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white dark:placeholder-gray-400"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <Search size={16} className="text-gray-400" />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow transition-all hover:shadow-md"
          >
            <Plus size={16} className="mr-1" />
            Explore New Courses
          </motion.button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => filterByCategory("All")}
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            activeCategory === "All"
              ? "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-200 dark:hover:bg-purple-900/50"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          All
        </button>
        {Array.from(new Set(courses.map((course) => course.category))).map(
          (category) => (
            <button
              key={category}
              onClick={() => filterByCategory(category)}
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                activeCategory === category
                  ? "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-200 dark:hover:bg-purple-900/50"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {category}
            </button>
          ),
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
            className="overflow-hidden rounded-xl bg-white/80 shadow-md backdrop-blur-sm transition-all dark:bg-gray-800/80"
            onClick={() => handleCourseClick(course)}
          >
            <div className="relative h-40 w-full overflow-hidden">
              <Image
                src={
                  course.image ||
                  "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                }
                alt={course.title}
                fill
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {course.category}
                  </span>
                  <span className="flex items-center rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    <Star size={12} className="mr-1" />
                    {course.rating}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    course.level === "beginner"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                      : course.level === "intermediate"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                  }`}
                >
                  {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {course.duration} hours
                </span>
              </div>
              <h3 className="text-lg font-semibold dark:text-white">
                {course.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                {course.description}
              </p>

              {course.enrolled && (
                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Progress
                    </span>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-full rounded-full bg-purple-600"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="mt-3 flex flex-wrap gap-1">
                {course.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`mt-4 flex w-full items-center justify-center rounded-lg py-2 text-sm font-medium ${
                  course.enrolled
                    ? "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-200 dark:hover:bg-purple-900/50"
                    : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow hover:shadow-md"
                }`}
              >
                {course.enrolled
                  ? course.progress > 0
                    ? "Continue Learning"
                    : "Start Learning"
                  : "Enroll Now"}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderPaths = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold dark:text-white">Learning Paths</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow transition-all hover:shadow-md"
        >
          <Plus size={16} className="mr-1" />
          Create Custom Path
        </motion.button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {learningPaths.map((path, index) => (
          <motion.div
            key={path.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
            className="overflow-hidden rounded-xl bg-white/80 shadow-md backdrop-blur-sm transition-all dark:bg-gray-800/80"
            onClick={() => handlePathClick(path)}
          >
            <div className="relative p-5">
              <div className="mb-4 flex items-center justify-between">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    path.difficulty === "beginner"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                      : path.difficulty === "intermediate"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                  }`}
                >
                  {path.difficulty.charAt(0).toUpperCase() +
                    path.difficulty.slice(1)}
                </span>
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                  {path.estimatedTime} hours
                </span>
              </div>

              <h3 className="text-lg font-semibold dark:text-white">
                {path.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                {path.description}
              </p>

              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Progress
                  </span>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {path.progress}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-full rounded-full bg-purple-600"
                    style={{ width: `${path.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-4">
                <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Included Courses:
                </p>
                <div className="space-y-2">
                  {path.courses.map((courseId) => {
                    const course = courses.find((c) => c.id === courseId);
                    return course ? (
                      <div
                        key={course.id}
                        className="flex items-center rounded-lg border border-gray-100 p-2 dark:border-gray-700"
                      >
                        <div className="relative mr-2 h-8 w-8 flex-shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={
                              course.image ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                            }
                            alt={course.title}
                            fill
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 truncate">
                          <p className="truncate text-sm font-medium dark:text-white">
                            {course.title}
                          </p>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-4 flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 py-2 text-sm font-medium text-white shadow hover:shadow-md"
              >
                {path.progress > 0 ? "Continue Path" : "Start Path"}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderGoals = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold dark:text-white">My Learning Goals</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow transition-all hover:shadow-md"
          onClick={() => setShowAddGoalModal(true)}
        >
          <Plus size={16} className="mr-1" />
          Add New Goal
        </motion.button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
            className="overflow-hidden rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm transition-all dark:bg-gray-800/80"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
                {goal.completed ? "Completed" : "In Progress"}
              </span>
              <div className="flex items-center space-x-1">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  <PenTool size={14} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  <Trash size={14} />
                </motion.button>
              </div>
            </div>

            <h3 className="text-lg font-semibold dark:text-white">
              {goal.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {goal.description}
            </p>

            <div className="mt-3">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Progress
                </span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {goal.progress}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-full rounded-full bg-purple-600"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Calendar size={14} className="mr-1" />
                <span>
                  Deadline: {new Date(goal.deadline).toLocaleDateString()}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`rounded-lg px-3 py-1 text-xs font-medium ${
                  goal.completed
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                    : "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-200 dark:hover:bg-purple-900/50"
                }`}
              >
                {goal.completed ? "Completed" : "Update Progress"}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
      >
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          AI Goal Insights
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
            <div className="flex items-start">
              <div className="mr-3 mt-0.5 text-purple-600 dark:text-purple-400">
                <TrendingUp size={18} />
              </div>
              <div>
                <p className="font-medium text-purple-800 dark:text-purple-300">
                  Progress Analysis
                </p>
                <p className="mt-1 text-sm text-purple-700 dark:text-purple-200">
                  You&apos;re making excellent progress on your Machine Learning
                  goal. At your current pace, you&apos;ll complete it 5 days
                  ahead of schedule.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <div className="flex items-start">
              <div className="mr-3 mt-0.5 text-blue-600 dark:text-blue-400">
                <Zap size={18} />
              </div>
              <div>
                <p className="font-medium text-blue-800 dark:text-blue-300">
                  Productivity Boost
                </p>
                <p className="mt-1 text-sm text-blue-700 dark:text-blue-200">
                  I&apos;ve noticed you make the most progress on your React
                  Native goal during weekends. Consider allocating more weekend
                  time to accelerate your learning.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <div className="flex items-start">
              <div className="mr-3 mt-0.5 text-green-600 dark:text-green-400">
                <Lightbulb size={18} />
              </div>
              <div>
                <p className="font-medium text-green-800 dark:text-green-300">
                  Goal Recommendation
                </p>
                <p className="mt-1 text-sm text-green-700 dark:text-green-200">
                  Based on your interests and career aspirations, consider
                  adding a goal focused on cloud computing skills to complement
                  your current learning path.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderAITutor = () => (
    <div className="flex h-full flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 rounded-xl bg-white/80 p-4 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
      >
        <div className="flex items-center">
          <div className="mr-3 flex h-10 w-10 shrink-0 justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md sm:items-center">
            <Brain size={20} className="shrink-0" />
          </div>
          <div>
            <h2 className="text-xl font-bold dark:text-white">Aspira AI</h2>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              Ask me anything about your courses, get personalized
              recommendations, or help with difficult concepts.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        ref={chatContainerRef}
        className="max-h-[60vh] flex-1 overflow-y-auto rounded-xl bg-gray-50/80 p-4 backdrop-blur-sm dark:bg-gray-700/80"
      >
        <div className="space-y-4">
          {chatMessages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{
                opacity: 0,
                y: 10,
                x: message.sender === "user" ? -10 : 10,
              }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-start ${message.sender === "ai" ? "justify-end" : ""}`}
            >
              {message.sender === "user" && (
                <>
                  <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300">
                    <User size={16} />
                  </div>
                  <div className="max-w-[75%] rounded-lg rounded-tl-none bg-white px-4 py-2 shadow-sm dark:bg-gray-800">
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </>
              )}

              {message.sender === "ai" && (
                <>
                  <div className="max-w-[75%] rounded-lg rounded-tr-none bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-white shadow-sm">
                    <p className="whitespace-pre-wrap">{message.content}</p>

                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {message.attachments.map((attachment, i) => (
                          <div
                            key={i}
                            className="rounded-md bg-white/20 p-2 backdrop-blur-sm"
                          >
                            <div className="flex items-center">
                              {attachment.type === "course" && (
                                <BookOpen size={14} className="mr-2" />
                              )}
                              {attachment.type === "path" && (
                                <Compass size={14} className="mr-2" />
                              )}
                              {attachment.type === "resource" && (
                                <FileText size={14} className="mr-2" />
                              )}
                              <span className="text-sm font-medium">
                                {attachment.title}
                              </span>
                            </div>
                            <div className="mt-1 flex justify-end">
                              <button className="text-xs underline hover:text-white/80">
                                View Details
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                    <Sparkles size={16} className="shrink-0" />
                  </div>
                </>
              )}
            </motion.div>
          ))}

          {isGenerating && (
            <div className="flex items-start justify-end">
              <div className="rounded-lg rounded-tr-none bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-white shadow-sm">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-white"></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-white"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-white"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
              <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <Sparkles size={16} />
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-4"
      >
        <form
          onSubmit={handleSendMessage}
          className="flex items-center space-x-2"
        >
          <input
            ref={messageInputRef}
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Ask about your courses, concepts, or get recommendations..."
            className="flex-1 rounded-lg border border-gray-300 bg-white/80 px-4 py-2 backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white"
          />
          <motion.button
            type="submit"
            disabled={isGenerating || !userMessage.trim()}
            className="flex shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 font-medium text-white shadow transition-all hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isGenerating ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span className="hidden sm:block">Thinking...</span>
              </>
            ) : (
              "Ask"
            )}
          </motion.button>
        </form>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() =>
              setUserMessage(
                "What should I learn next based on my current progress?",
              )
            }
            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            What should I learn next?
          </button>
          <button
            onClick={() =>
              setUserMessage("Help me understand machine learning algorithms")
            }
            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Help with ML algorithms
          </button>
          <button
            onClick={() =>
              setUserMessage("Create a study plan for my JavaScript course")
            }
            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Create a study plan
          </button>
          <button
            onClick={() =>
              setUserMessage("Find resources to help with data structures")
            }
            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Find resources
          </button>
        </div>
      </motion.div>
    </div>
  );

  // Navigation items
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    { id: "courses", label: "Courses", icon: <BookOpen size={20} /> },
    { id: "paths", label: "Learning Paths", icon: <Compass size={20} /> },
    { id: "goals", label: "Goals", icon: <Target size={20} /> },
    { id: "ai-tutor", label: "AI Tutor", icon: <Brain size={20} /> },
  ];

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 transition-colors dark:from-gray-900 dark:to-gray-800 ${isMobile ? "pb-16" : ""}`}
    >
      <div className="container mx-auto p-4">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            {isMobile && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="mr-3 rounded-full bg-white/80 p-2 text-gray-600 shadow backdrop-blur-sm dark:bg-gray-800/80 dark:text-gray-300"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <List size={20} />
              </motion.button>
            )}
            <div className="flex items-center">
              <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-md">
                <GraduationCap size={20} />
              </div>
              <h1 className="hidden text-xl font-bold dark:text-white sm:block">
                Aspira
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="rounded-full bg-white/80 p-2 text-gray-600 shadow backdrop-blur-sm dark:bg-gray-800/80 dark:text-gray-300"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="rounded-full bg-white/80 p-2 text-gray-600 shadow backdrop-blur-sm dark:bg-gray-800/80 dark:text-gray-300"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings size={20} />
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
            >
              <User size={16} />
            </motion.div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
          {/* Sidebar Navigation */}
          <AnimatePresence>
            {(!isMobile || showMobileMenu) && (
              <motion.div
                initial={isMobile ? { x: -240 } : { opacity: 0 }}
                animate={isMobile ? { x: 0 } : { opacity: 1 }}
                exit={isMobile ? { x: -240 } : { opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className={`${
                  isMobile
                    ? "fixed inset-y-0 left-0 z-40 w-64 bg-white/80 p-5 shadow-lg backdrop-blur-sm dark:bg-gray-800/80"
                    : "rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
                }`}
              >
                <div className="mb-6 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md">
                    <GraduationCap size={24} />
                  </div>
                  <h1 className="ml-2 text-xl font-bold dark:text-white">
                    Aspira
                  </h1>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setActiveTab(item.id);
                        if (isMobile) setShowMobileMenu(false);
                      }}
                      className={`flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                        activeTab === item.id
                          ? "bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-700 dark:from-purple-500/30 dark:to-indigo-500/30 dark:text-purple-300"
                          : "text-gray-700 hover:bg-gray-100/80 dark:text-gray-300 dark:hover:bg-gray-700/50"
                      }`}
                    >
                      <div
                        className={`mr-3 ${activeTab === item.id ? "text-purple-600 dark:text-purple-400" : ""}`}
                      >
                        {item.icon}
                      </div>
                      {item.label}
                    </motion.button>
                  ))}
                </nav>

                <div className="mt-6 space-y-4">
                  <div className="rounded-xl bg-gradient-to-r from-purple-500/10 to-indigo-500/10 p-4 dark:from-purple-500/20 dark:to-indigo-500/20">
                    <div className="flex items-center">
                      <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                        <Flame size={16} />
                      </div>
                      <div>
                        <p className="font-medium dark:text-white">
                          7-Day Streak!
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          Keep it going!
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between">
                      {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                        <div
                          key={day}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-xs font-medium text-white"
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl bg-gradient-to-r from-purple-500/10 to-indigo-500/10 p-4 dark:from-purple-500/20 dark:to-indigo-500/20">
                    <h3 className="font-medium dark:text-white">
                      Today&apos;s Goal
                    </h3>
                    <div className="mt-2">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          2/3 hours
                        </span>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          67%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className="h-full rounded-full bg-purple-600"
                          style={{ width: "67%" }}
                        ></div>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                      1 more hour to reach your daily goal!
                    </p>
                  </div>
                </div>

                {isMobile && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-4 top-4 rounded-full bg-gray-100 p-1 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <X size={20} />
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <motion.main
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[80vh]"
          >
            {activeTab === "dashboard" && renderDashboard()}
            {activeTab === "courses" && renderCourses()}
            {activeTab === "paths" && renderPaths()}
            {activeTab === "goals" && renderGoals()}
            {activeTab === "ai-tutor" && renderAITutor()}
          </motion.main>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-gray-200/50 bg-white/80 py-2 backdrop-blur-md dark:border-gray-700/50 dark:bg-gray-800/80"
        >
          {navItems.slice(0, 5).map((item) => (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center p-2 ${
                activeTab === item.id
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {item.icon}
              <span className="mt-1 text-xs">{item.label}</span>
              {activeTab === item.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="mt-1 h-1 w-4 rounded-full bg-purple-600 dark:bg-purple-400"
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* --------------------------------------------------------------Modals------------------------------------------------------------------------------------------------------- */}
      {/* Path details */}
      <AnimatePresence>
        {showPathDetails && selectedPath && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setShowPathDetails(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-h-[80vh] w-full max-w-4xl overflow-auto rounded-2xl bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:bg-gray-800/90"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-4 top-4 rounded-full bg-gray-100 p-1 text-gray-500 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                onClick={() => setShowPathDetails(false)}
              >
                <X size={20} />
              </button>

              <div className="mb-4 flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    selectedPath.difficulty === "beginner"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                      : selectedPath.difficulty === "intermediate"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                  }`}
                >
                  {selectedPath.difficulty.charAt(0).toUpperCase() +
                    selectedPath.difficulty.slice(1)}
                </span>
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                  {selectedPath.estimatedTime} hours total
                </span>
                <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
                  {selectedPath.courses.length} courses
                </span>
              </div>

              <h2 className="text-2xl font-bold dark:text-white">
                {selectedPath.title}
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {selectedPath.description}
              </p>

              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Overall Progress
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {selectedPath.progress}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-full rounded-full bg-purple-600"
                    style={{ width: `${selectedPath.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="mb-4 text-lg font-semibold dark:text-white">
                  Path Curriculum
                </h3>
                <div className="space-y-4">
                  {selectedPath.courses.map((courseId, index) => {
                    const course = courses.find((c) => c.id === courseId);
                    return course ? (
                      <div
                        key={course.id}
                        className="rounded-lg border border-gray-100 p-4 dark:border-gray-700"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                          <div className="mb-3 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 md:mb-0">
                            <span className="text-xl font-bold">
                              {index + 1}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-lg font-semibold dark:text-white">
                                {course.title}
                              </h4>
                              <span
                                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                  course.level === "beginner"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                                    : course.level === "intermediate"
                                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                                }`}
                              >
                                {course.level.charAt(0).toUpperCase() +
                                  course.level.slice(1)}
                              </span>
                              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                                {course.duration} hours
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              {course.description}
                            </p>

                            <div className="mt-3">
                              <div className="mb-1 flex items-center justify-between">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  Progress
                                </span>
                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                  {course.progress}%
                                </span>
                              </div>
                              <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                <div
                                  className="h-full rounded-full bg-purple-600"
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 md:mt-0">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium ${
                                course.progress > 0
                                  ? "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-200 dark:hover:bg-purple-900/50"
                                  : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow hover:shadow-md"
                              }`}
                            >
                              {course.progress > 0 ? "Continue" : "Start"}
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5 text-purple-600 dark:text-purple-400">
                      <Compass size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-purple-800 dark:text-purple-300">
                        AI Path Recommendation
                      </p>
                      <p className="mt-1 text-sm text-purple-700 dark:text-purple-200">
                        Based on your learning patterns, I recommend completing
                        the courses in the suggested order. Your strengths in
                        data structures will help you progress faster through
                        the second course.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5 text-blue-600 dark:text-blue-400">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-blue-800 dark:text-blue-300">
                        Completion Timeline
                      </p>
                      <p className="mt-1 text-sm text-blue-700 dark:text-blue-200">
                        At your current pace, you&apos;ll complete this learning
                        path by October 15, 2023. Would you like me to create a
                        more detailed study schedule to help you finish sooner?
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-xl border border-gray-300/50 bg-white/50 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50/80 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:bg-gray-600/50"
                  onClick={() => setShowPathDetails(false)}
                >
                  Close
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow transition-all hover:shadow-md"
                >
                  {selectedPath.progress > 0 ? "Continue Path" : "Start Path"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md rounded-2xl bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:bg-gray-800/90"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-4 top-4 rounded-full bg-gray-100 p-1 text-gray-500 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                onClick={() => setShowSettings(false)}
              >
                <X size={20} />
              </button>

              <h2 className="text-xl font-bold dark:text-white">Settings</h2>

              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium dark:text-white">Dark Mode</span>
                  <button
                    onClick={toggleDarkMode}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      darkMode
                        ? "bg-purple-600"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        darkMode ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <label className="block font-medium dark:text-white">
                    Daily Study Goal
                  </label>
                  <div className="mt-1 flex items-center space-x-2">
                    <input
                      type="range"
                      min="1"
                      max="8"
                      step="0.5"
                      defaultValue="3"
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
                    />
                    <span className="w-12 text-center dark:text-white">3h</span>
                  </div>
                </div>

                <div>
                  <label className="block font-medium dark:text-white">
                    AI Tutor Personality
                  </label>
                  <select
                    defaultValue="balanced"
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white"
                  >
                    <option value="encouraging">Encouraging</option>
                    <option value="balanced">Balanced</option>
                    <option value="challenging">Challenging</option>
                    <option value="detailed">Detailed</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium dark:text-white">
                    Notification Preferences
                  </label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="notif-daily"
                        defaultChecked
                        className="form-checkbox h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-purple-400"
                      />
                      <label
                        htmlFor="notif-daily"
                        className="ml-2 text-sm dark:text-white"
                      >
                        Daily reminders
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="notif-recommendations"
                        defaultChecked
                        className="form-checkbox h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-purple-400"
                      />
                      <label
                        htmlFor="notif-recommendations"
                        className="ml-2 text-sm dark:text-white"
                      >
                        AI recommendations
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="notif-goals"
                        defaultChecked
                        className="form-checkbox h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-purple-400"
                      />
                      <label
                        htmlFor="notif-goals"
                        className="ml-2 text-sm dark:text-white"
                      >
                        Goal progress updates
                      </label>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5 text-purple-600 dark:text-purple-400">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-purple-800 dark:text-purple-300">
                        AI Settings Recommendation
                      </p>
                      <p className="mt-1 text-sm text-purple-700 dark:text-purple-200">
                        Based on your learning patterns, I recommend enabling
                        weekend study reminders to help maintain your streak and
                        reach your goals faster.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 py-2 text-sm font-medium text-white shadow hover:shadow-md"
                    onClick={() => setShowSettings(false)}
                  >
                    Save Settings
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Course details */}
      <AnimatePresence>
        {showCourseDetails && selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setShowCourseDetails(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-h-[80vh] w-full max-w-4xl overflow-auto rounded-2xl bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:bg-gray-800/90"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-4 top-4 rounded-full bg-gray-100 p-1 text-gray-500 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                onClick={() => setShowCourseDetails(false)}
              >
                <X size={20} />
              </button>

              <div className="flex flex-col md:flex-row md:gap-6">
                <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl md:mb-0 md:h-auto md:w-1/3">
                  <Image
                    src={
                      selectedCourse.image ||
                      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                    }
                    alt={selectedCourse.title}
                    fill
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        selectedCourse.level === "beginner"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                          : selectedCourse.level === "intermediate"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                      }`}
                    >
                      {selectedCourse.level.charAt(0).toUpperCase() +
                        selectedCourse.level.slice(1)}
                    </span>
                    <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
                      {selectedCourse.category}
                    </span>
                    <span className="flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                      <Star size={12} className="mr-1" />
                      {selectedCourse.rating}
                    </span>
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                      {selectedCourse.duration} hours
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold dark:text-white">
                    {selectedCourse.title}
                  </h2>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {selectedCourse.description}
                  </p>

                  {selectedCourse.enrolled && (
                    <div className="mt-4">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Progress
                        </span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {selectedCourse.progress}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className="h-full rounded-full bg-purple-600"
                          style={{ width: `${selectedCourse.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-1">
                    {selectedCourse.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-lg font-semibold dark:text-white">
                    Course Content
                  </h3>
                  <div className="space-y-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-gray-100 p-3 dark:border-gray-700"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div
                              className={`mr-3 flex h-8 w-8 items-center justify-center rounded-full ${
                                i < Math.floor(selectedCourse.progress / 20)
                                  ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                              }`}
                            >
                              {i < Math.floor(selectedCourse.progress / 20) ? (
                                <Check size={16} />
                              ) : (
                                <span>{i + 1}</span>
                              )}
                            </div>
                            <div>
                              <p className="font-medium dark:text-white">
                                Module {i + 1}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {
                                  [
                                    "Introduction",
                                    "Core Concepts",
                                    "Advanced Techniques",
                                    "Practical Applications",
                                    "Final Project",
                                  ][i]
                                }
                              </p>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {[30, 45, 60, 75, 90][i]} min
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold dark:text-white">
                    AI Study Recommendations
                  </h3>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5 text-purple-600 dark:text-purple-400">
                          <Sparkles size={18} />
                        </div>
                        <div>
                          <p className="font-medium text-purple-800 dark:text-purple-300">
                            Personalized Learning Path
                          </p>
                          <p className="mt-1 text-sm text-purple-700 dark:text-purple-200">
                            Based on your learning style and goals, I recommend
                            focusing on the practical exercises in Module 3
                            before moving to the theoretical concepts in Module
                            4.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5 text-blue-600 dark:text-blue-400">
                          <Lightbulb size={18} />
                        </div>
                        <div>
                          <p className="font-medium text-blue-800 dark:text-blue-300">
                            Suggested Resources
                          </p>
                          <p className="mt-1 text-sm text-blue-700 dark:text-blue-200">
                            I&apos;ve found supplementary materials that will
                            help reinforce the concepts you&apos;re currently
                            learning. Check the resources tab for details.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5 text-green-600 dark:text-green-400">
                          <Target size={18} />
                        </div>
                        <div>
                          <p className="font-medium text-green-800 dark:text-green-300">
                            Optimal Study Schedule
                          </p>
                          <p className="mt-1 text-sm text-green-700 dark:text-green-200">
                            Your learning data shows you&apos;re most productive
                            in the morning. I recommend scheduling 30-minute
                            focused sessions between 9-11 AM for this course.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                {selectedCourse.enrolled ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-xl border border-gray-300/50 bg-white/50 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50/80 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:bg-gray-600/50"
                    >
                      View Notes
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow transition-all hover:shadow-md"
                    >
                      Continue Learning
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow transition-all hover:shadow-md"
                  >
                    Enroll Now
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add goal */}
      <AnimatePresence>
        {showAddGoalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setShowAddGoalModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md rounded-2xl bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:bg-gray-800/90"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-4 top-4 rounded-full bg-gray-100 p-1 text-gray-500 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                onClick={() => setShowAddGoalModal(false)}
              >
                <X size={20} />
              </button>

              <h2 className="text-xl font-bold dark:text-white">
                Add New Learning Goal
              </h2>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Set a specific, measurable goal to track your progress
              </p>

              <form className="mt-4 space-y-4">
                <div>
                  <label
                    htmlFor="goal-title"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Goal Title
                  </label>
                  <input
                    type="text"
                    id="goal-title"
                    value={newGoalTitle}
                    onChange={(e) => setNewGoalTitle(e.target.value)}
                    placeholder="e.g., Complete Python Certification"
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white dark:placeholder-gray-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="goal-description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Description
                  </label>
                  <textarea
                    id="goal-description"
                    value={newGoalDescription}
                    onChange={(e) => setNewGoalDescription(e.target.value)}
                    placeholder="Describe your goal in detail..."
                    rows={3}
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white dark:placeholder-gray-400"
                  ></textarea>
                </div>

                <div>
                  <label
                    htmlFor="goal-deadline"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Deadline
                  </label>
                  <input
                    type="date"
                    id="goal-deadline"
                    value={newGoalDeadline}
                    onChange={(e) => setNewGoalDeadline(e.target.value)}
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white dark:placeholder-gray-400"
                  />
                </div>

                <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5 text-purple-600 dark:text-purple-400">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-purple-800 dark:text-purple-300">
                        AI Goal Suggestion
                      </p>
                      <p className="mt-1 text-sm text-purple-700 dark:text-purple-200">
                        Based on your current learning path, I recommend setting
                        a goal to complete the Machine Learning course by June
                        15th. This aligns with your career interests and current
                        progress.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    onClick={() => setShowAddGoalModal(false)}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:shadow-md"
                    onClick={addNewGoal}
                  >
                    Add Goal
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
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
      `}</style>
    </div>
  );
}
