"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Trophy,
  Target,
  Zap,
  Bookmark,
  Heart,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

interface UserData {
  name: string;
  username: string;
  role: string;
  avatar: string;
  coverPhoto: string;
  bio: string;
  memberSince: string;
  location: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
    likes: number;
  };
  activityData: {
    labels: string[];
    datasets: number[];
  };
  engagementRate: number;
  completionRate: number;
  achievements: {
    icon: string;
    title: string;
    description: string;
    date: string;
  }[];
  recentActivities: {
    type: string;
    content: string;
    time: string;
  }[];
  skills: {
    name: string;
    level: number;
  }[];
  performanceMetrics: {
    category: string;
    value: number;
    change: number;
    trend: "up" | "down" | "neutral";
  }[];
}

type ColorOption =
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose";

interface DataVisualizationProfileProps {
  userData?: UserData;
}

const defaultUserData: UserData = {
  name: "Wabweni Brian",
  username: "@jordantaylor",
  role: "Digital Marketing Specialist",
  avatar:
    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
  coverPhoto:
    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  bio: "Digital marketing specialist with a passion for data-driven strategies. Helping brands tell their stories through engaging content and analytics.",
  memberSince: "Member since 2019",
  location: "New York, NY",
  stats: {
    posts: 248,
    followers: 15420,
    following: 562,
    likes: 8745,
  },
  activityData: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [65, 59, 80, 81, 56, 90],
  },
  engagementRate: 78,
  completionRate: 92,
  achievements: [
    {
      icon: "Trophy",
      title: "Top Contributor",
      description: "Recognized for exceptional contributions to the platform",
      date: "June 2023",
    },
    {
      icon: "Target",
      title: "Goal Crusher",
      description: "Exceeded quarterly targets by 35%",
      date: "March 2023",
    },
    {
      icon: "Sparkles",
      title: "Rising Star",
      description: "Fastest growing profile in the category",
      date: "January 2023",
    },
  ],
  recentActivities: [
    {
      type: "post",
      content: "Published a new article on data visualization techniques",
      time: "2 hours ago",
    },
    {
      type: "comment",
      content: "Commented on 'The Future of Digital Marketing'",
      time: "1 day ago",
    },
    {
      type: "like",
      content: "Liked 5 posts in Social Media Strategy",
      time: "3 days ago",
    },
  ],
  skills: [
    { name: "Content Strategy", level: 90 },
    { name: "SEO", level: 85 },
    { name: "Data Analysis", level: 80 },
    { name: "Social Media", level: 95 },
    { name: "Email Marketing", level: 75 },
  ],
  performanceMetrics: [
    { category: "Engagement", value: 87, change: 12, trend: "up" },
    { category: "Reach", value: 65, change: 8, trend: "up" },
    { category: "Conversion", value: 42, change: -3, trend: "down" },
    { category: "Retention", value: 78, change: 5, trend: "up" },
  ],
};

// Custom chart components
const BarChartComponent = ({ data }: { data: number[] }) => {
  const maxValue = Math.max(...data);

  return (
    <div className="flex h-32 items-end gap-1">
      {data.map((value, index) => (
        <motion.div
          key={index}
          initial={{ height: 0 }}
          animate={{ height: `${(value / maxValue) * 100}%` }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="w-full rounded-t bg-indigo-500"
        />
      ))}
    </div>
  );
};

const RadialProgress = ({
  value,
  size = 120,
  strokeWidth = 8,
  color = "indigo",
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: ColorOption;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const dash = (value * circumference) / 100;

  // Color mapping for stroke
  const colorMap = useMemo(() => {
    const colors: Record<ColorOption, string> = {
      slate: "#64748b",
      gray: "#6b7280",
      zinc: "#71717a",
      neutral: "#737373",
      stone: "#78716c",
      red: "#ef4444",
      orange: "#f97316",
      amber: "#f59e0b",
      yellow: "#eab308",
      lime: "#84cc16",
      green: "#22c55e",
      emerald: "#10b981",
      teal: "#14b8a6",
      cyan: "#06b6d4",
      sky: "#0ea5e9",
      blue: "#3b82f6",
      indigo: "#6366f1",
      violet: "#8b5cf6",
      purple: "#a855f7",
      fuchsia: "#d946ef",
      pink: "#ec4899",
      rose: "#f43f5e",
    };
    return colors;
  }, []);

  // Get the text color class safely
  const textColorClass = `text-${color}-500`;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90 transform"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={colorMap[color]}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - dash }}
          transition={{ duration: 1, ease: "easeInOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`text-xl font-bold ${textColorClass}`}
        >
          {value}%
        </motion.span>
      </div>
    </div>
  );
};

const SkillBar = ({
  name,
  level,
  index,
}: {
  name: string;
  level: number;
  index: number;
}) => {
  return (
    <div className="mb-3">
      <div className="mb-1 flex justify-between">
        <span className="text-sm font-medium text-gray-700">{name}</span>
        <span className="text-sm font-medium text-gray-500">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-gray-200">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
        />
      </div>
    </div>
  );
};

export default function DataVisualizationProfile({
  userData = defaultUserData,
}: DataVisualizationProfileProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [currentAchievementIndex, setCurrentAchievementIndex] = useState(0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // Cycle through achievements
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAchievementIndex((prev) =>
        prev === userData.achievements.length - 1 ? 0 : prev + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [userData.achievements.length]);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Trophy":
        return <Trophy className="h-5 w-5" />;
      case "Target":
        return <Target className="h-5 w-5" />;
      case "Sparkles":
        return <Sparkles className="h-5 w-5" />;
      default:
        return <Trophy className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative h-64 w-full overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600">
        <Image
          src={
            userData.coverPhoto ||
            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
          }
          fill
          alt="Cover"
          className="h-full w-full object-cover opacity-20 mix-blend-overlay"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-6 text-white sm:px-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 md:flex-row md:items-end"
          >
            <div className="relative">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg md:h-32 md:w-32">
                <Image
                  src={
                    userData.avatar ||
                    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                  }
                  fill
                  alt={userData.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green-500"
              >
                <Zap className="h-3 w-3 text-white" />
              </motion.div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-2xl font-bold md:text-3xl"
              >
                {userData.name}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-white/80"
              >
                {userData.username} • {userData.role}
              </motion.p>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-1 text-sm text-white/70"
              >
                {userData.location} • {userData.memberSince}
              </motion.p>
            </div>
            <div className="flex gap-3 pb-4 md:pb-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-indigo-700"
              >
                Edit Profile
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
              >
                Share
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="hide-scrollbar flex overflow-x-auto">
            {[
              "dashboard",
              "activity",
              "achievements",
              "analytics",
              "settings",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "border-b-2 border-indigo-600 text-indigo-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {/* Stats Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-4 md:col-span-3 md:grid-cols-4"
          >
            {Object.entries(userData.stats).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="flex flex-col items-center justify-center rounded-xl bg-white p-6 shadow-sm"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    delay: 0.2 + 0.1 * index,
                  }}
                  className="mb-1 text-3xl font-bold text-indigo-600"
                >
                  {value.toLocaleString()}
                </motion.div>
                <div className="text-sm capitalize text-gray-500">{key}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            variants={itemVariants}
            className="rounded-xl bg-white p-6 shadow-sm md:col-span-2"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Performance Metrics
              </h2>
              <div className="text-sm text-gray-500">Last 30 days</div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {userData.performanceMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">
                      {metric.category}
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {metric.value}%
                    </div>
                    <div
                      className={`flex items-center text-sm ${
                        metric.trend === "up"
                          ? "text-green-500"
                          : metric.trend === "down"
                            ? "text-red-500"
                            : "text-gray-500"
                      }`}
                    >
                      {metric.trend === "up" && (
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                      )}
                      {metric.trend === "down" && (
                        <ArrowUpRight className="mr-1 h-3 w-3 rotate-90 transform" />
                      )}
                      {metric.change > 0 ? "+" : ""}
                      {metric.change}%
                    </div>
                  </div>
                  <div className="h-16 w-16">
                    <RadialProgress
                      value={metric.value}
                      size={64}
                      strokeWidth={6}
                      color={
                        metric.trend === "up"
                          ? "green"
                          : metric.trend === "down"
                            ? "red"
                            : "gray"
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Activity Chart */}
          <motion.div
            variants={itemVariants}
            className="rounded-xl bg-white p-6 shadow-sm"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Activity</h2>
              <Activity className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex h-48 flex-col">
              <div className="flex-1">
                <BarChartComponent data={userData.activityData.datasets} />
              </div>
              <div className="mt-2 flex justify-between">
                {userData.activityData.labels.map((label, index) => (
                  <div key={index} className="text-xs text-gray-500">
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            variants={itemVariants}
            className="rounded-xl bg-white p-6 shadow-sm md:col-span-2"
          >
            <h2 className="mb-6 text-lg font-semibold text-gray-900">
              Skills & Expertise
            </h2>
            <div className="space-y-4">
              {userData.skills.map((skill, index) => (
                <SkillBar
                  key={index}
                  name={skill.name}
                  level={skill.level}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          {/* Engagement Rate */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center rounded-xl bg-white p-6 shadow-sm"
          >
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Engagement Rate
            </h2>
            <div className="my-4">
              <RadialProgress
                value={userData.engagementRate}
                size={150}
                strokeWidth={10}
                color="indigo"
              />
            </div>
            <p className="mt-2 text-center text-sm text-gray-500">
              Your engagement is{" "}
              {userData.engagementRate > 70 ? "excellent" : "good"} compared to
              similar profiles
            </p>
          </motion.div>

          {/* Achievements */}
          <motion.div
            variants={itemVariants}
            className="rounded-xl bg-white p-6 shadow-sm md:col-span-3"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Achievements
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentAchievementIndex((prev) =>
                      prev === 0 ? userData.achievements.length - 1 : prev - 1,
                    )
                  }
                  className="rounded-full bg-gray-100 p-1 hover:bg-gray-200"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={() =>
                    setCurrentAchievementIndex((prev) =>
                      prev === userData.achievements.length - 1 ? 0 : prev + 1,
                    )
                  }
                  className="rounded-full bg-gray-100 p-1 hover:bg-gray-200"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="relative h-32 overflow-hidden">
              {userData.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{
                    opacity: currentAchievementIndex === index ? 1 : 0,
                    x: currentAchievementIndex === index ? 0 : 100,
                  }}
                  transition={{ duration: 0.5 }}
                  className={`absolute inset-0 flex items-center ${currentAchievementIndex === index ? "pointer-events-auto" : "pointer-events-none"}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                      {getIconComponent(achievement.icon)}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {achievement.description}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {achievement.date}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 flex justify-center">
              {userData.achievements.map((_, index) => (
                <div
                  key={index}
                  className={`mx-1 h-1.5 w-8 rounded-full ${currentAchievementIndex === index ? "bg-indigo-500" : "bg-gray-200"}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            variants={itemVariants}
            className="rounded-xl bg-white p-6 shadow-sm md:col-span-2"
          >
            <h2 className="mb-6 text-lg font-semibold text-gray-900">
              Recent Activities
            </h2>
            <div className="space-y-4">
              {userData.recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-3 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100">
                    {activity.type === "post" && (
                      <Bookmark className="h-4 w-4 text-indigo-600" />
                    )}
                    {activity.type === "comment" && (
                      <MessageSquare className="h-4 w-4 text-indigo-600" />
                    )}
                    {activity.type === "like" && (
                      <Heart className="h-4 w-4 text-indigo-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">{activity.content}</p>
                    <p className="mt-1 text-xs text-gray-400">
                      {activity.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Completion Rate */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center rounded-xl bg-white p-6 shadow-sm"
          >
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Profile Completion
            </h2>
            <div className="my-4">
              <RadialProgress
                value={userData.completionRate}
                size={150}
                strokeWidth={10}
                color="green"
              />
            </div>
            <p className="mt-2 text-center text-sm text-gray-500">
              {userData.completionRate < 100
                ? "Complete your profile to increase visibility"
                : "Your profile is complete!"}
            </p>
          </motion.div>
        </motion.div>
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
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
