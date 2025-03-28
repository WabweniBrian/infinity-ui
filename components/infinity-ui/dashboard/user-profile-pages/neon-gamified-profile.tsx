"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Trophy,
  Zap,
  Target,
  Star,
  Award,
  Shield,
  Flame,
  Gift,
} from "lucide-react";
import Image from "next/image";

export default function NeonGamifiedProfile() {
  const [activeTab, setActiveTab] = useState("achievements");
  const [selectedAchievement, setSelectedAchievement] = useState<number | null>(
    null,
  );

  const user = {
    name: "Alex Raider",
    handle: "cyberhunter",
    level: 42,
    xp: 8750,
    nextLevelXp: 10000,
    avatar:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    title: "Neon Stalker",
    joinDate: "Member since 2077",
    stats: {
      wins: 187,
      missions: 342,
      reputation: 4820,
      allies: 76,
    },
  };

  const achievements = [
    {
      id: 1,
      name: "Night City Legend",
      description: "Complete 100 night missions without detection",
      icon: <Shield className="h-6 w-6 text-cyan-400" />,
      progress: 100,
      total: 100,
      completed: true,
      rarity: "Legendary",
      reward: "5000 Credits + Legendary Gear",
      date: "2077-06-15",
    },
    {
      id: 2,
      name: "Hack the Planet",
      description: "Successfully breach 50 high-security systems",
      icon: <Zap className="h-6 w-6 text-purple-400" />,
      progress: 43,
      total: 50,
      completed: false,
      rarity: "Epic",
      reward: "2500 Credits + Rare Implant",
      date: "In progress",
    },
    {
      id: 3,
      name: "Ghost Protocol",
      description: "Complete a full mission without being detected",
      icon: <Trophy className="h-6 w-6 text-yellow-400" />,
      progress: 1,
      total: 1,
      completed: true,
      rarity: "Rare",
      reward: "1000 Credits + Stealth Mod",
      date: "2077-04-30",
    },
    {
      id: 4,
      name: "Blade Runner",
      description: "Eliminate 200 targets using blade weapons",
      icon: <Flame className="h-6 w-6 text-red-400" />,
      progress: 156,
      total: 200,
      completed: false,
      rarity: "Epic",
      reward: "3000 Credits + Legendary Blade",
      date: "In progress",
    },
    {
      id: 5,
      name: "Digital Nomad",
      description: "Visit all districts in Night City",
      icon: <Target className="h-6 w-6 text-green-400" />,
      progress: 6,
      total: 7,
      completed: false,
      rarity: "Uncommon",
      reward: "1500 Credits + Map Upgrade",
      date: "In progress",
    },
    {
      id: 6,
      name: "Chrome Junkie",
      description: "Install 15 cybernetic implants",
      icon: <Star className="h-6 w-6 text-blue-400" />,
      progress: 15,
      total: 15,
      completed: true,
      rarity: "Epic",
      reward: "2000 Credits + Exclusive Implant",
      date: "2077-05-22",
    },
  ];

  const missions = [
    {
      id: 1,
      name: "Corporate Infiltration",
      difficulty: "Extreme",
      reward: "5000 Credits",
      location: "Arasaka Tower",
      status: "Available",
      type: "Stealth",
    },
    {
      id: 2,
      name: "Data Heist",
      difficulty: "Hard",
      reward: "3000 Credits",
      location: "Night City Downtown",
      status: "In Progress",
      type: "Hacking",
    },
    {
      id: 3,
      name: "Street Cleanup",
      difficulty: "Medium",
      reward: "1500 Credits",
      location: "Watson District",
      status: "Available",
      type: "Combat",
    },
    {
      id: 4,
      name: "Rogue AI",
      difficulty: "Extreme",
      reward: "7500 Credits",
      location: "Netrunner Den",
      status: "Locked",
      type: "Hacking",
    },
  ];

  const leaderboard = [
    {
      rank: 1,
      name: "V",
      score: 15420,
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=50&width=50",
    },
    {
      rank: 2,
      name: "Johnny Silverhand",
      score: 14850,
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=50&width=50",
    },
    {
      rank: 3,
      name: "Judy Alvarez",
      score: 12340,
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=50&width=50",
    },
    {
      rank: 4,
      name: "Jackie Welles",
      score: 11780,
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=50&width=50",
    },
    {
      rank: 5,
      name: "Panam Palmer",
      score: 10950,
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=50&width=50",
    },
    {
      rank: 6,
      name: "Alex Raider",
      score: 8750,
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=50&width=50",
    },
    {
      rank: 7,
      name: "Rogue Amendiares",
      score: 8420,
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=50&width=50",
    },
    {
      rank: 8,
      name: "Takemura",
      score: 7650,
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=50&width=50",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900 px-4 py-12 text-gray-100 sm:px-6 lg:px-8">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(67,56,202,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.1),transparent_50%)]"></div>

      {/* Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header section */}
        <div className="relative z-10 mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-8 rounded-2xl border border-cyan-900/50 bg-gray-900/80 p-6 shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-xl md:flex-row md:items-start"
          >
            {/* Avatar and level */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 opacity-70 blur-lg"></div>
                <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-cyan-400">
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
                <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-cyan-400 bg-gray-900 text-sm font-bold text-cyan-400">
                  {user.level}
                </div>
              </div>

              <div className="mt-4 text-center">
                <h2 className="text-xl font-bold text-white">{user.name}</h2>
                <p className="font-mono text-cyan-400">@{user.handle}</p>
                <p className="mt-1 text-sm text-gray-400">{user.title}</p>
                <p className="mt-1 text-xs text-gray-500">{user.joinDate}</p>
              </div>
            </div>

            {/* Stats and XP */}
            <div className="flex-1">
              <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                {Object.entries(user.stats).map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-lg border border-gray-700 bg-gray-800/50 p-3 text-center"
                  >
                    <p className="text-xs uppercase tracking-wider text-gray-400">
                      {key}
                    </p>
                    <p className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-2xl font-bold text-transparent">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {/* XP Bar */}
              <div className="mb-2 flex justify-between text-xs text-gray-400">
                <span>
                  XP: {user.xp}/{user.nextLevelXp}
                </span>
                <span>{Math.round((user.xp / user.nextLevelXp) * 100)}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(user.xp / user.nextLevelXp) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-600"
                />
              </div>

              {/* Next level reward */}
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                <Gift className="h-4 w-4" />
                <span>Next level reward: Rare Cyberdeck + 2000 Credits</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="scrollbar-hide mb-8 flex overflow-x-auto">
          <div className="flex space-x-1 rounded-lg bg-gray-800/50 p-1 backdrop-blur-sm">
            {["achievements", "missions", "leaderboard"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "achievements" && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    onClick={() => setSelectedAchievement(achievement.id)}
                    className={`relative cursor-pointer rounded-lg border p-4 ${
                      achievement.completed
                        ? "border-cyan-900/50 bg-gradient-to-br from-gray-900 to-gray-800"
                        : "border-gray-800 bg-gray-900/80"
                    }`}
                  >
                    {achievement.completed && (
                      <div className="absolute right-2 top-2">
                        <Award className="h-5 w-5 text-cyan-400" />
                      </div>
                    )}

                    <div className="flex items-start gap-4">
                      <div
                        className={`rounded-lg p-2 ${
                          achievement.completed
                            ? "bg-gradient-to-br from-cyan-500/20 to-purple-600/20"
                            : "bg-gray-800"
                        }`}
                      >
                        {achievement.icon}
                      </div>

                      <div className="flex-1">
                        <h3
                          className={`font-bold ${achievement.completed ? "text-white" : "text-gray-300"}`}
                        >
                          {achievement.name}
                        </h3>
                        <p className="mb-2 text-sm text-gray-400">
                          {achievement.description}
                        </p>

                        <div className="mb-1 flex justify-between text-xs text-gray-500">
                          <span>
                            {achievement.progress}/{achievement.total}
                          </span>
                          <span>
                            {Math.round(
                              (achievement.progress / achievement.total) * 100,
                            )}
                            %
                          </span>
                        </div>

                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-800">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${(achievement.progress / achievement.total) * 100}%`,
                            }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`h-full ${
                              achievement.completed
                                ? "bg-gradient-to-r from-cyan-500 to-purple-600"
                                : "bg-gray-600"
                            }`}
                          />
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs ${
                              achievement.rarity === "Legendary"
                                ? "bg-yellow-500/20 text-yellow-300"
                                : achievement.rarity === "Epic"
                                  ? "bg-purple-500/20 text-purple-300"
                                  : achievement.rarity === "Rare"
                                    ? "bg-blue-500/20 text-blue-300"
                                    : "bg-green-500/20 text-green-300"
                            }`}
                          >
                            {achievement.rarity}
                          </span>
                          <ChevronRight className="h-4 w-4 text-gray-500" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Achievement details modal */}
              <AnimatePresence>
                {selectedAchievement && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedAchievement(null)}
                  >
                    <motion.div
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: 20 }}
                      transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 300,
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full max-w-md rounded-xl border border-cyan-900/50 bg-gray-900 p-6 shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                    >
                      {(() => {
                        const achievement = achievements.find(
                          (a) => a.id === selectedAchievement,
                        );
                        if (!achievement) return null;

                        return (
                          <>
                            <div className="mb-4 flex items-start justify-between">
                              <div
                                className={`rounded-lg p-3 ${
                                  achievement.completed
                                    ? "bg-gradient-to-br from-cyan-500/20 to-purple-600/20"
                                    : "bg-gray-800"
                                }`}
                              >
                                {achievement.icon}
                              </div>
                              <button
                                onClick={() => setSelectedAchievement(null)}
                                className="text-gray-500 hover:text-white"
                              >
                                ✕
                              </button>
                            </div>

                            <h2 className="mb-1 text-xl font-bold text-white">
                              {achievement.name}
                            </h2>
                            <p
                              className={`mb-3 inline-block rounded-full px-2 py-0.5 text-xs ${
                                achievement.rarity === "Legendary"
                                  ? "bg-yellow-500/20 text-yellow-300"
                                  : achievement.rarity === "Epic"
                                    ? "bg-purple-500/20 text-purple-300"
                                    : achievement.rarity === "Rare"
                                      ? "bg-blue-500/20 text-blue-300"
                                      : "bg-green-500/20 text-green-300"
                              }`}
                            >
                              {achievement.rarity}
                            </p>

                            <p className="mb-4 text-gray-300">
                              {achievement.description}
                            </p>

                            <div className="mb-4">
                              <div className="mb-1 flex justify-between text-xs text-gray-400">
                                <span>
                                  Progress: {achievement.progress}/
                                  {achievement.total}
                                </span>
                                <span>
                                  {Math.round(
                                    (achievement.progress / achievement.total) *
                                      100,
                                  )}
                                  %
                                </span>
                              </div>
                              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{
                                    width: `${(achievement.progress / achievement.total) * 100}%`,
                                  }}
                                  transition={{ duration: 1, ease: "easeOut" }}
                                  className={`h-full ${
                                    achievement.completed
                                      ? "bg-gradient-to-r from-cyan-500 to-purple-600"
                                      : "bg-gray-600"
                                  }`}
                                />
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div>
                                <h3 className="text-sm font-medium text-gray-400">
                                  Reward
                                </h3>
                                <p className="text-cyan-400">
                                  {achievement.reward}
                                </p>
                              </div>

                              <div>
                                <h3 className="text-sm font-medium text-gray-400">
                                  Completion Date
                                </h3>
                                <p className="text-white">{achievement.date}</p>
                              </div>

                              <div>
                                <h3 className="text-sm font-medium text-gray-400">
                                  Rarity
                                </h3>
                                <p className="text-white">
                                  Only 12% of players have this achievement
                                </p>
                              </div>
                            </div>

                            {achievement.completed && (
                              <div className="mt-6 text-center">
                                <button className="rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-4 py-2 font-medium text-white transition-opacity hover:opacity-90">
                                  Share Achievement
                                </button>
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {activeTab === "missions" && (
            <motion.div
              key="missions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {missions.map((mission) => (
                  <motion.div
                    key={mission.id}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 20px rgba(6, 182, 212, 0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className={`rounded-lg border p-4 ${
                      mission.status === "In Progress"
                        ? "border-cyan-900/50 bg-gradient-to-br from-gray-900 to-gray-800"
                        : mission.status === "Locked"
                          ? "border-gray-800/50 bg-gray-900/50 opacity-70"
                          : "border-gray-800 bg-gray-900/80"
                    }`}
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <h3 className="font-bold text-white">{mission.name}</h3>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          mission.status === "Available"
                            ? "bg-green-500/20 text-green-300"
                            : mission.status === "In Progress"
                              ? "bg-cyan-500/20 text-cyan-300"
                              : "bg-gray-500/20 text-gray-300"
                        }`}
                      >
                        {mission.status}
                      </span>
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-gray-400">Difficulty</p>
                        <p
                          className={`text-sm ${
                            mission.difficulty === "Extreme"
                              ? "text-red-400"
                              : mission.difficulty === "Hard"
                                ? "text-orange-400"
                                : "text-yellow-400"
                          }`}
                        >
                          {mission.difficulty}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">Type</p>
                        <p className="text-sm text-white">{mission.type}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">Location</p>
                        <p className="text-sm text-white">{mission.location}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">Reward</p>
                        <p className="text-sm text-cyan-400">
                          {mission.reward}
                        </p>
                      </div>
                    </div>

                    <button
                      className={`w-full rounded-lg py-2 text-sm font-medium transition-all ${
                        mission.status === "Locked"
                          ? "cursor-not-allowed bg-gray-800 text-gray-500"
                          : mission.status === "In Progress"
                            ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                            : "bg-gray-800 text-white hover:bg-gray-700"
                      }`}
                      disabled={mission.status === "Locked"}
                    >
                      {mission.status === "Available"
                        ? "Start Mission"
                        : mission.status === "In Progress"
                          ? "Continue Mission"
                          : "Locked"}
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "leaderboard" && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl border border-gray-800 bg-gray-900/80 p-6"
            >
              <h2 className="mb-6 text-xl font-bold text-white">
                Global Leaderboard
              </h2>

              <div className="space-y-4">
                {leaderboard.map((player, index) => (
                  <motion.div
                    key={player.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`flex items-center rounded-lg p-3 ${
                      player.name === user.name
                        ? "border border-cyan-900/50 bg-gradient-to-r from-cyan-900/30 to-purple-900/30"
                        : player.rank <= 3
                          ? "bg-gray-800/50"
                          : "bg-gray-900/50"
                    }`}
                  >
                    <div
                      className={`mr-4 flex h-8 w-8 items-center justify-center rounded-full font-bold ${
                        player.rank === 1
                          ? "bg-yellow-500/20 text-yellow-300"
                          : player.rank === 2
                            ? "bg-gray-300/20 text-gray-300"
                            : player.rank === 3
                              ? "bg-amber-600/20 text-amber-400"
                              : "bg-gray-700/50 text-gray-400"
                      }`}
                    >
                      {player.rank}
                    </div>

                    <div className="relative mr-4 h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={
                          player.avatar ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                        }
                        fill
                        alt={player.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3
                        className={`font-medium ${player.name === user.name ? "text-cyan-400" : "text-white"}`}
                      >
                        {player.name}
                      </h3>
                    </div>

                    <div className="text-right">
                      <p className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-mono text-lg font-bold text-transparent">
                        {player.score.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">POINTS</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button className="rounded-lg bg-gray-800 px-6 py-2 text-white transition-colors hover:bg-gray-700">
                  View Full Leaderboard
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
