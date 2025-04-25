"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Star,
  Zap,
  Target,
  Award,
  Flame,
  Gift,
  Shield,
  Compass,
  ChevronRight,
  Heart,
  Share2,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";

export default function GamifiedProfile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedAchievement, setSelectedAchievement] = useState<number | null>(
    null,
  );
  const [xpProgress, setXpProgress] = useState(0);

  // Simulate XP progress animation on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setXpProgress(78);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const user = {
    name: "Wabz Braize",
    level: 42,
    title: "Code Architect",
    avatar:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    cover:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    xp: {
      current: 7800,
      next: 10000,
    },
    stats: [
      { label: "Achievements", value: 87, icon: Trophy },
      { label: "Streak", value: "28 days", icon: Flame },
      { label: "Rank", value: "Platinum", icon: Award },
      { label: "Followers", value: "3.2k", icon: Heart },
    ],
    achievements: [
      {
        id: 1,
        title: "Bug Hunter",
        description: "Fixed 100 critical bugs in production",
        icon: Shield,
        rarity: "Legendary",
        progress: 100,
        date: "2023-05-15",
        xp: 500,
        badge:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoeoxV9gBGZljIQpV8xdfgatbs5J3rcz1Tw6F2",
      },
      {
        id: 2,
        title: "Code Ninja",
        description: "Wrote 10,000 lines of clean code",
        icon: Zap,
        rarity: "Epic",
        progress: 100,
        date: "2023-04-22",
        xp: 350,
        badge:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo6c1aUbzvhV0osXNSKE3eCpjGD9ukzWbgBlRm",
      },
      {
        id: 3,
        title: "Team Player",
        description: "Collaborated on 50 team projects",
        icon: Target,
        rarity: "Rare",
        progress: 100,
        date: "2023-03-10",
        xp: 250,
        badge:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoV68jdwFJprS62IlXgenFT9i4m3NRbk5yCzYV",
      },
      {
        id: 4,
        title: "Early Adopter",
        description: "Used a technology before it was cool",
        icon: Compass,
        rarity: "Uncommon",
        progress: 100,
        date: "2023-02-05",
        xp: 150,
        badge:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypokt52nurPieNLljoZXDu7tSgcd5rJ2sYCBAxK",
      },
      {
        id: 5,
        title: "Night Owl",
        description: "Committed code at 3 AM",
        icon: Star,
        rarity: "Common",
        progress: 100,
        date: "2023-01-20",
        xp: 100,
        badge:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypokPPeungrPieNLljoZXDu7tSgcd5rJ2sYCBAx",
      },
    ],
    quests: [
      {
        id: 1,
        title: "Deploy to Production",
        description: "Successfully deploy 5 applications to production",
        progress: 80,
        reward: "200 XP",
        deadline: "2 days left",
      },
      {
        id: 2,
        title: "Code Review Master",
        description: "Review 20 pull requests from team members",
        progress: 65,
        reward: "150 XP",
        deadline: "5 days left",
      },
      {
        id: 3,
        title: "Documentation Hero",
        description: "Update documentation for 10 projects",
        progress: 30,
        reward: "100 XP",
        deadline: "1 week left",
      },
    ],
    skills: [
      { name: "JavaScript", level: 95, color: "from-yellow-400 to-yellow-600" },
      { name: "React", level: 90, color: "from-blue-400 to-blue-600" },
      { name: "Node.js", level: 85, color: "from-green-400 to-green-600" },
      { name: "TypeScript", level: 80, color: "from-blue-500 to-blue-700" },
      { name: "GraphQL", level: 75, color: "from-pink-400 to-pink-600" },
    ],
    badges: [
      { name: "MVP", icon: Trophy, color: "from-yellow-400 to-orange-500" },
      { name: "Innovator", icon: Zap, color: "from-blue-400 to-indigo-600" },
      { name: "Mentor", icon: Star, color: "from-purple-400 to-purple-600" },
    ],
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "achievements", label: "Achievements" },
    { id: "quests", label: "Quests" },
    { id: "skills", label: "Skills" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-4 text-white sm:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header with Level and XP */}
        <div className="relative mb-8 overflow-hidden rounded-3xl">
          <div className="relative h-[400px] sm:h-64">
            <Image
              src={
                user.cover ||
                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
              }
              fill
              alt="Cover"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          </div>

          <div className="absolute bottom-0 left-0 flex w-full flex-col items-center gap-4 p-6 sm:flex-row sm:items-end">
            <div className="relative">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-gray-900 bg-gray-800 sm:h-32 sm:w-32">
                <Image
                  src={
                    user.avatar ||
                    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                  }
                  fill
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <motion.div
                className="absolute -bottom-2 -right-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-lg font-bold text-gray-900"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                {user.level}
              </motion.div>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <div className="mb-3 flex items-center justify-center gap-2 sm:justify-start">
                <span className="rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 px-3 py-1 text-sm font-medium">
                  {user.title}
                </span>
              </div>

              <div className="w-full max-w-md">
                <div className="mb-1 flex justify-between text-sm">
                  <span>
                    XP: {user.xp.current}/{user.xp.next}
                  </span>
                  <span>{xpProgress}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-gray-700">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-400 to-blue-500"
                    initial={{ width: "0%" }}
                    animate={{ width: `${xpProgress}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
                <div className="mt-1 flex justify-between text-xs text-gray-400">
                  <span>Level {user.level}</span>
                  <span>Level {user.level + 1}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <motion.button
                className="flex items-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle size={16} className="mr-2" />
                Message
              </motion.button>
              <motion.button
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart size={16} />
              </motion.button>
              <motion.button
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 size={16} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {user.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center justify-center rounded-2xl bg-gray-800 p-4"
              whileHover={{ y: -5, backgroundColor: "#2d3748" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600">
                <stat.icon size={20} />
              </div>
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-8 rounded-3xl bg-gray-800 p-6">
          <div className="hide-scrollbar mb-6 flex space-x-2 overflow-x-auto">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                className={`whitespace-nowrap rounded-full px-5 py-2 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Recent Achievements */}
                <div className="mb-8">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold">Recent Achievements</h3>
                    <button className="flex items-center text-sm text-blue-400">
                      View All <ChevronRight size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {user.achievements.slice(0, 3).map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        className="flex flex-col items-center rounded-2xl bg-gray-700 p-4 text-center"
                        whileHover={{
                          y: -5,
                          boxShadow:
                            "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
                          backgroundColor: "#374151",
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                      >
                        <div className="relative mb-3 h-16 w-16">
                          <Image
                            src={
                              achievement.badge ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                            }
                            fill
                            alt={achievement.title}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <h4 className="mb-1 font-bold">{achievement.title}</h4>
                        <p className="mb-2 text-sm text-gray-400">
                          {achievement.description}
                        </p>
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${
                            achievement.rarity === "Legendary"
                              ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900"
                              : achievement.rarity === "Epic"
                                ? "bg-gradient-to-r from-purple-500 to-pink-500"
                                : achievement.rarity === "Rare"
                                  ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                                  : achievement.rarity === "Uncommon"
                                    ? "bg-gradient-to-r from-green-500 to-teal-500"
                                    : "bg-gradient-to-r from-gray-500 to-gray-600"
                          }`}
                        >
                          {achievement.rarity}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Active Quests */}
                <div className="mb-8">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold">Active Quests</h3>
                    <button className="flex items-center text-sm text-blue-400">
                      View All <ChevronRight size={16} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {user.quests.map((quest, index) => (
                      <motion.div
                        key={quest.id}
                        className="rounded-2xl bg-gray-700 p-4"
                        whileHover={{
                          y: -3,
                          boxShadow:
                            "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
                          backgroundColor: "#374151",
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                      >
                        <div className="mb-2 flex items-start justify-between">
                          <div>
                            <h4 className="font-bold">{quest.title}</h4>
                            <p className="text-sm text-gray-400">
                              {quest.description}
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-sm font-medium text-green-400">
                              {quest.reward}
                            </span>
                            <span className="text-xs text-gray-400">
                              {quest.deadline}
                            </span>
                          </div>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-600">
                          <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${quest.progress}%` }}
                            transition={{
                              delay: 0.5 + index * 0.1,
                              duration: 1,
                            }}
                          />
                        </div>
                        <div className="mt-1 flex justify-between text-xs">
                          <span className="text-gray-400">Progress</span>
                          <span>{quest.progress}%</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Skill Showcase */}
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold">Top Skills</h3>
                    <button className="flex items-center text-sm text-blue-400">
                      View All <ChevronRight size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {user.skills.slice(0, 3).map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        className="rounded-2xl bg-gray-700 p-4"
                        whileHover={{
                          y: -3,
                          boxShadow:
                            "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
                          backgroundColor: "#374151",
                        }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                      >
                        <div className="mb-2 flex justify-between">
                          <h4 className="font-medium">{skill.name}</h4>
                          <span className="text-sm">{skill.level}/100</span>
                        </div>
                        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-600">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${skill.color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{
                              delay: 0.3 + index * 0.1,
                              duration: 1,
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "achievements" && (
              <motion.div
                key="achievements"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {user.achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      className="relative flex cursor-pointer flex-col items-center overflow-hidden rounded-2xl bg-gray-700 p-5 text-center"
                      whileHover={{
                        y: -5,
                        boxShadow:
                          "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
                        backgroundColor: "#374151",
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      onClick={() => setSelectedAchievement(achievement.id)}
                    >
                      {/* Glow effect for legendary achievements */}
                      {achievement.rarity === "Legendary" && (
                        <div className="absolute inset-0 animate-pulse opacity-20">
                          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 blur-xl"></div>
                        </div>
                      )}

                      <div className="relative z-10 mb-4 h-20 w-20">
                        <Image
                          src={
                            achievement.badge ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                          }
                          fill
                          alt={achievement.title}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <h4 className="relative z-10 mb-2 text-lg font-bold">
                        {achievement.title}
                      </h4>
                      <p className="relative z-10 mb-3 text-sm text-gray-400">
                        {achievement.description}
                      </p>
                      <div className="relative z-10 mb-3 flex items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${
                            achievement.rarity === "Legendary"
                              ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900"
                              : achievement.rarity === "Epic"
                                ? "bg-gradient-to-r from-purple-500 to-pink-500"
                                : achievement.rarity === "Rare"
                                  ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                                  : achievement.rarity === "Uncommon"
                                    ? "bg-gradient-to-r from-green-500 to-teal-500"
                                    : "bg-gradient-to-r from-gray-500 to-gray-600"
                          }`}
                        >
                          {achievement.rarity}
                        </span>
                        <span className="text-xs text-gray-400">
                          +{achievement.xp} XP
                        </span>
                      </div>
                      <div className="relative z-10 text-xs text-gray-400">
                        Unlocked on{" "}
                        {new Date(achievement.date).toLocaleDateString()}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Achievement Detail Modal */}
                <AnimatePresence>
                  {selectedAchievement !== null && (
                    <motion.div
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setSelectedAchievement(null)}
                    >
                      <motion.div
                        className="w-full max-w-md rounded-3xl bg-gray-800 p-6"
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {user.achievements
                          .filter((a) => a.id === selectedAchievement)
                          .map((achievement) => (
                            <div key={achievement.id} className="text-center">
                              <div className="relative mx-auto mb-4 h-24 w-24">
                                <Image
                                  src={
                                    achievement.badge ||
                                    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                                  }
                                  fill
                                  alt={achievement.title}
                                  className="h-full w-full object-contain"
                                />
                                {achievement.rarity === "Legendary" && (
                                  <div className="absolute inset-0 -z-10 animate-pulse opacity-30">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 blur-xl"></div>
                                  </div>
                                )}
                              </div>
                              <h3 className="mb-2 text-2xl font-bold">
                                {achievement.title}
                              </h3>
                              <p className="mb-4 text-gray-300">
                                {achievement.description}
                              </p>
                              <div className="mb-4 flex items-center justify-center gap-3">
                                <span
                                  className={`rounded-full px-3 py-1 text-sm ${
                                    achievement.rarity === "Legendary"
                                      ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900"
                                      : achievement.rarity === "Epic"
                                        ? "bg-gradient-to-r from-purple-500 to-pink-500"
                                        : achievement.rarity === "Rare"
                                          ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                                          : achievement.rarity === "Uncommon"
                                            ? "bg-gradient-to-r from-green-500 to-teal-500"
                                            : "bg-gradient-to-r from-gray-500 to-gray-600"
                                  }`}
                                >
                                  {achievement.rarity}
                                </span>
                                <span className="rounded-full bg-gray-700 px-3 py-1 text-sm">
                                  +{achievement.xp} XP
                                </span>
                              </div>
                              <div className="mb-6 text-sm text-gray-400">
                                Unlocked on{" "}
                                {new Date(
                                  achievement.date,
                                ).toLocaleDateString()}
                              </div>
                              <div className="flex justify-center gap-3">
                                <motion.button
                                  className="flex items-center rounded-full bg-gray-700 px-4 py-2 text-white"
                                  whileHover={{
                                    scale: 1.05,
                                    backgroundColor: "#4B5563",
                                  }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Share2 size={16} className="mr-2" />
                                  Share
                                </motion.button>
                                <motion.button
                                  className="rounded-full bg-gray-700 px-4 py-2 text-white"
                                  whileHover={{
                                    scale: 1.05,
                                    backgroundColor: "#4B5563",
                                  }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => setSelectedAchievement(null)}
                                >
                                  Close
                                </motion.button>
                              </div>
                            </div>
                          ))}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {activeTab === "quests" && (
              <motion.div
                key="quests"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-4 text-xl font-bold">Active Quests</h3>
                    <div className="space-y-4">
                      {user.quests.map((quest, index) => (
                        <motion.div
                          key={quest.id}
                          className="rounded-2xl bg-gray-700 p-5"
                          whileHover={{
                            y: -3,
                            boxShadow:
                              "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
                            backgroundColor: "#374151",
                          }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                        >
                          <div className="mb-3 flex items-start justify-between">
                            <div>
                              <h4 className="text-lg font-bold">
                                {quest.title}
                              </h4>
                              <p className="text-gray-400">
                                {quest.description}
                              </p>
                            </div>
                            <div className="rounded-full bg-gray-800 px-3 py-1 text-sm font-medium text-green-400">
                              {quest.reward}
                            </div>
                          </div>
                          <div className="mb-2">
                            <div className="mb-1 flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{quest.progress}%</span>
                            </div>
                            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-600">
                              <motion.div
                                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                                initial={{ width: 0 }}
                                animate={{ width: `${quest.progress}%` }}
                                transition={{
                                  delay: 0.3 + index * 0.1,
                                  duration: 1,
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">
                              {quest.deadline}
                            </span>
                            <motion.button
                              className="rounded-full bg-gray-600 px-3 py-1 text-sm"
                              whileHover={{
                                scale: 1.05,
                                backgroundColor: "#4B5563",
                              }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Details
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-4 text-xl font-bold">Daily Challenges</h3>
                    <div className="space-y-4">
                      {[
                        {
                          id: 1,
                          title: "Code Review Sprint",
                          description: "Review 5 pull requests today",
                          progress: 60,
                          reward: "50 XP",
                          timeLeft: "8 hours left",
                        },
                        {
                          id: 2,
                          title: "Bug Squasher",
                          description: "Fix 3 bugs in the codebase",
                          progress: 33,
                          reward: "30 XP",
                          timeLeft: "8 hours left",
                        },
                        {
                          id: 3,
                          title: "Documentation Update",
                          description: "Update README files in 2 repositories",
                          progress: 50,
                          reward: "25 XP",
                          timeLeft: "8 hours left",
                        },
                      ].map((challenge, index) => (
                        <motion.div
                          key={challenge.id}
                          className="rounded-2xl bg-gray-700 p-5"
                          whileHover={{
                            y: -3,
                            boxShadow:
                              "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
                            backgroundColor: "#374151",
                          }}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                        >
                          <div className="mb-3 flex items-start justify-between">
                            <div>
                              <h4 className="text-lg font-bold">
                                {challenge.title}
                              </h4>
                              <p className="text-gray-400">
                                {challenge.description}
                              </p>
                            </div>
                            <div className="rounded-full bg-gray-800 px-3 py-1 text-sm font-medium text-green-400">
                              {challenge.reward}
                            </div>
                          </div>
                          <div className="mb-2">
                            <div className="mb-1 flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{challenge.progress}%</span>
                            </div>
                            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-600">
                              <motion.div
                                className="h-full bg-gradient-to-r from-green-500 to-teal-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${challenge.progress}%` }}
                                transition={{
                                  delay: 0.3 + index * 0.1,
                                  duration: 1,
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-orange-400">
                              {challenge.timeLeft}
                            </span>
                            <motion.button
                              className="rounded-full bg-gray-600 px-3 py-1 text-sm"
                              whileHover={{
                                scale: 1.05,
                                backgroundColor: "#4B5563",
                              }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Details
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <h3 className="mb-4 text-xl font-bold">
                      Weekly Challenges
                    </h3>
                    <div className="rounded-2xl bg-gray-700 p-6">
                      <div className="mb-6 flex flex-col items-start justify-between sm:flex-row sm:items-center">
                        <div>
                          <h4 className="mb-1 text-xl font-bold">
                            Team Collaboration Challenge
                          </h4>
                          <p className="text-gray-400">
                            Work with your team to complete 3 major features
                            this week
                          </p>
                        </div>
                        <div className="mt-2 rounded-full bg-gray-800 px-4 py-2 text-sm font-medium text-green-400 sm:mt-0">
                          Reward: 500 XP + Special Badge
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="mb-1 flex justify-between text-sm">
                          <span>Team Progress</span>
                          <span>2/3 Features</span>
                        </div>
                        <div className="h-4 w-full overflow-hidden rounded-full bg-gray-600">
                          <motion.div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                            initial={{ width: 0 }}
                            animate={{ width: "66.7%" }}
                            transition={{ delay: 0.5, duration: 1.5 }}
                          />
                        </div>
                      </div>

                      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="rounded-xl bg-gray-800 p-3">
                          <div className="mb-2 flex items-center justify-between">
                            <h5 className="font-medium">Feature 1</h5>
                            <span className="rounded-full bg-green-500 bg-opacity-20 px-2 py-1 text-xs text-green-400">
                              Completed
                            </span>
                          </div>
                          <p className="text-sm text-gray-400">
                            User Authentication System
                          </p>
                        </div>
                        <div className="rounded-xl bg-gray-800 p-3">
                          <div className="mb-2 flex items-center justify-between">
                            <h5 className="font-medium">Feature 2</h5>
                            <span className="rounded-full bg-green-500 bg-opacity-20 px-2 py-1 text-xs text-green-400">
                              Completed
                            </span>
                          </div>
                          <p className="text-sm text-gray-400">
                            Dashboard Analytics
                          </p>
                        </div>
                        <div className="rounded-xl bg-gray-800 p-3">
                          <div className="mb-2 flex items-center justify-between">
                            <h5 className="font-medium">Feature 3</h5>
                            <span className="rounded-full bg-yellow-500 bg-opacity-20 px-2 py-1 text-xs text-yellow-400">
                              In Progress
                            </span>
                          </div>
                          <p className="text-sm text-gray-400">
                            Payment Integration
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-orange-400">
                          3 days left
                        </span>
                        <motion.button
                          className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-sm font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Team Progress
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "skills" && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="mb-4 text-xl font-bold">Technical Skills</h3>
                    <div className="space-y-6">
                      {user.skills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                        >
                          <div className="mb-2 flex justify-between">
                            <h4 className="font-medium">{skill.name}</h4>
                            <div className="flex items-center">
                              <span className="mr-2 text-sm">
                                Level {Math.floor(skill.level / 10)}
                              </span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={14}
                                    className={
                                      i < Math.floor(skill.level / 20)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-600"
                                    }
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="h-3 w-full overflow-hidden rounded-full bg-gray-600">
                            <motion.div
                              className={`h-full bg-gradient-to-r ${skill.color}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{
                                delay: 0.3 + index * 0.1,
                                duration: 1,
                              }}
                            />
                          </div>
                          <div className="mt-1 flex justify-between text-xs">
                            <span className="text-gray-400">Proficiency</span>
                            <span>{skill.level}/100</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-4 text-xl font-bold">
                      Badges & Certifications
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {user.badges.map((badge, index) => (
                        <motion.div
                          key={badge.name}
                          className="flex items-center rounded-2xl bg-gray-700 p-4"
                          whileHover={{
                            y: -3,
                            boxShadow:
                              "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
                            backgroundColor: "#374151",
                          }}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                        >
                          <div
                            className={`h-12 w-12 rounded-full bg-gradient-to-r ${badge.color} mr-4 flex items-center justify-center`}
                          >
                            <badge.icon size={24} />
                          </div>
                          <div>
                            <h4 className="font-bold">{badge.name}</h4>
                            <p className="text-sm text-gray-400">
                              Earned in 2023
                            </p>
                          </div>
                        </motion.div>
                      ))}

                      {[
                        {
                          name: "React Advanced",
                          icon: Award,
                          color: "from-blue-400 to-cyan-400",
                        },
                        {
                          name: "GraphQL Expert",
                          icon: Shield,
                          color: "from-pink-400 to-purple-400",
                        },
                        {
                          name: "AWS Certified",
                          icon: Gift,
                          color: "from-orange-400 to-red-400",
                        },
                        {
                          name: "DevOps Pro",
                          icon: Zap,
                          color: "from-green-400 to-teal-400",
                        },
                      ].map((cert, index) => (
                        <motion.div
                          key={cert.name}
                          className="flex items-center rounded-2xl bg-gray-700 p-4"
                          whileHover={{
                            y: -3,
                            boxShadow:
                              "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
                            backgroundColor: "#374151",
                          }}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: 0.3 + index * 0.1,
                            duration: 0.3,
                          }}
                        >
                          <div
                            className={`h-12 w-12 rounded-full bg-gradient-to-r ${cert.color} mr-4 flex items-center justify-center`}
                          >
                            <cert.icon size={24} />
                          </div>
                          <div>
                            <h4 className="font-bold">{cert.name}</h4>
                            <p className="text-sm text-gray-400">
                              Certification
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-8">
                      <h3 className="mb-4 text-xl font-bold">Skill Tree</h3>
                      <div className="rounded-2xl bg-gray-700 p-4 text-center">
                        <p className="mb-4 text-gray-400">
                          Visualize your skill progression and unlock new
                          abilities
                        </p>
                        <motion.button
                          className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-sm font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Open Skill Tree
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
