"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Map,
  Compass,
  Scroll,
  Sword,
  Shield,
  PillBottleIcon as Potion,
  Star,
  Award,
  Gift,
  ChevronRight,
  X,
} from "lucide-react";
import Image from "next/image";

export default function AdventureGamifiedProfile() {
  const [activeTab, setActiveTab] = useState("quests");
  const [selectedQuest, setSelectedQuest] = useState<number | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [mapScale, setMapScale] = useState(1);

  const user = {
    name: "Elara Stormborn",
    title: "Dragonslayer",
    level: 24,
    class: "Arcane Ranger",
    xp: 4250,
    nextLevelXp: 5000,
    gold: 1842,
    avatar:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    joinDate: "Adventuring since 2023",
    stats: {
      strength: 65,
      dexterity: 78,
      intelligence: 82,
      charisma: 70,
      vitality: 60,
    },
    inventory: {
      potions: 12,
      scrolls: 8,
      gems: 5,
    },
  };

  const quests = [
    {
      id: 1,
      name: "The Dragon of Mistwood",
      description: "Defeat the ancient dragon terrorizing Mistwood Village",
      location: "Mistwood Mountains",
      difficulty: "Legendary",
      reward: "1000 Gold + Dragon Scale Armor",
      progress: 75,
      total: 100,
      status: "In Progress",
      steps: [
        { name: "Speak with the Village Elder", completed: true },
        { name: "Find the Dragon's Lair", completed: true },
        { name: "Collect Dragon Bane Herbs", completed: true },
        { name: "Defeat the Dragon", completed: false },
      ],
      mapLocation: { x: 320, y: 180 },
    },
    {
      id: 2,
      name: "Lost Library of Arcana",
      description: "Recover the ancient spellbooks from the forgotten library",
      location: "Whispering Woods",
      difficulty: "Hard",
      reward: "500 Gold + Rare Spell Scroll",
      progress: 33,
      total: 100,
      status: "In Progress",
      steps: [
        { name: "Find the Hidden Entrance", completed: true },
        { name: "Solve the Guardian's Riddle", completed: false },
        { name: "Navigate the Magical Maze", completed: false },
        { name: "Retrieve the Spellbooks", completed: false },
      ],
      mapLocation: { x: 180, y: 250 },
    },
    {
      id: 3,
      name: "The Merchant's Request",
      description: "Escort the merchant safely to Silverkeep",
      location: "Eastern Road",
      difficulty: "Medium",
      reward: "300 Gold + Merchant Discount",
      progress: 100,
      total: 100,
      status: "Completed",
      steps: [
        { name: "Meet the Merchant", completed: true },
        { name: "Defeat Roadside Bandits", completed: true },
        { name: "Navigate the Dangerous Pass", completed: true },
        { name: "Arrive at Silverkeep", completed: true },
      ],
      mapLocation: { x: 420, y: 280 },
    },
    {
      id: 4,
      name: "The Cursed Amulet",
      description: "Find and destroy the cursed amulet of Malgrim",
      location: "Shadowfen Swamp",
      difficulty: "Hard",
      reward: "600 Gold + Blessing of Light",
      progress: 0,
      total: 100,
      status: "Available",
      steps: [
        { name: "Speak with the Oracle", completed: false },
        { name: "Find the Witch's Hut", completed: false },
        { name: "Retrieve the Purification Ritual", completed: false },
        { name: "Locate and Destroy the Amulet", completed: false },
      ],
      mapLocation: { x: 120, y: 350 },
    },
  ];

  const achievements = [
    {
      id: 1,
      name: "First Steps",
      description: "Complete your first quest",
      icon: <Scroll className="h-5 w-5 text-amber-400" />,
      completed: true,
      date: "2023-05-10",
    },
    {
      id: 2,
      name: "Dragon Slayer",
      description: "Defeat your first dragon",
      icon: <Sword className="h-5 w-5 text-red-400" />,
      completed: false,
    },
    {
      id: 3,
      name: "Treasure Hunter",
      description: "Find 10 hidden treasures",
      icon: <Gift className="h-5 w-5 text-yellow-400" />,
      completed: true,
      date: "2023-07-22",
    },
    {
      id: 4,
      name: "Master of Magic",
      description: "Learn 20 different spells",
      icon: <Star className="h-5 w-5 text-purple-400" />,
      completed: false,
    },
    {
      id: 5,
      name: "Savior of Silverkeep",
      description: "Complete the main storyline in Silverkeep",
      icon: <Shield className="h-5 w-5 text-blue-400" />,
      completed: true,
      date: "2023-06-15",
    },
    {
      id: 6,
      name: "Potion Master",
      description: "Brew 50 potions",
      icon: <Potion className="h-5 w-5 text-green-400" />,
      completed: false,
    },
  ];

  const companions = [
    {
      id: 1,
      name: "Thorne",
      race: "Human",
      class: "Warrior",
      level: 22,
      relationship: "Trusted",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      skills: ["Tanking", "Sword Mastery", "Shield Wall"],
    },
    {
      id: 2,
      name: "Lyra",
      race: "Elf",
      class: "Mage",
      level: 25,
      relationship: "Best Friend",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      skills: ["Fireball", "Arcane Shield", "Teleport"],
    },
    {
      id: 3,
      name: "Grimm",
      race: "Dwarf",
      class: "Blacksmith",
      level: 20,
      relationship: "Ally",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      skills: ["Weapon Crafting", "Armor Repair", "Mining"],
    },
  ];

  // Handle map zoom and pan
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mapRef.current && activeTab === "map") {
        e.preventDefault();
        const newScale = Math.max(
          0.5,
          Math.min(2, mapScale + (e.deltaY > 0 ? -0.1 : 0.1)),
        );
        setMapScale(newScale);
      }
    };

    const mapElement = mapRef.current;
    if (mapElement) {
      mapElement.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (mapElement) {
        mapElement.removeEventListener("wheel", handleWheel);
      }
    };
  }, [mapScale, activeTab]);

  return (
    <div
      className="relative min-h-screen overflow-hidden px-4 py-12 text-amber-50 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          "linear-gradient(rgba(40,16,5,0.95), rgba(2,21,16,0.95)), url('/images/gamified3.jpg')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative mx-auto max-w-7xl">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-12"
        >
          <div className="rounded-xl border border-amber-800/30 bg-gradient-to-br from-amber-950/80 to-emerald-950/80 p-6 shadow-lg backdrop-blur-sm">
            <div className="flex flex-col gap-8 md:flex-row">
              {/* Avatar and basic info */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 opacity-70 blur-sm"></div>
                  <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-amber-600">
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
                  <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber-600 bg-amber-950 text-sm font-bold text-amber-400">
                    {user.level}
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <h2 className="text-xl font-bold text-amber-100">
                    {user.name}
                  </h2>
                  <p className="font-serif italic text-amber-400">
                    {user.title}
                  </p>
                  <p className="mt-1 text-sm text-amber-200/80">{user.class}</p>
                  <p className="mt-1 text-xs text-amber-200/50">
                    {user.joinDate}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Gift className="h-4 w-4" />
                    <span className="font-bold">{user.gold}</span>
                  </div>
                  <div className="h-4 w-px bg-amber-700/50"></div>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Scroll className="h-4 w-4" />
                    <span className="font-bold">{user.inventory.scrolls}</span>
                  </div>
                  <div className="h-4 w-px bg-amber-700/50"></div>
                  <div className="flex items-center gap-1 text-emerald-400">
                    <Potion className="h-4 w-4" />
                    <span className="font-bold">{user.inventory.potions}</span>
                  </div>
                </div>
              </div>

              {/* Stats and XP */}
              <div className="flex-1">
                <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                  {Object.entries(user.stats).map(([key, value]) => (
                    <div
                      key={key}
                      className="rounded-lg border border-amber-800/30 bg-amber-950/50 p-3 text-center"
                    >
                      <p className="text-xs uppercase tracking-wider text-amber-200/70">
                        {key}
                      </p>
                      <div className="relative mt-1 h-1.5 overflow-hidden rounded-full bg-amber-900/50">
                        <div
                          className="absolute left-0 top-0 h-full bg-gradient-to-r from-amber-500 to-emerald-500"
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                      <p className="mt-1 text-lg font-bold text-amber-100">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* XP Bar */}
                <div className="mb-2 flex justify-between text-xs text-amber-200/70">
                  <span>
                    Experience: {user.xp}/{user.nextLevelXp}
                  </span>
                  <span>
                    Level {user.level} → {user.level + 1}
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full border border-amber-800/30 bg-amber-950/70">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(user.xp / user.nextLevelXp) * 100}%`,
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-500"
                  />
                </div>

                {/* Next level reward */}
                <div className="mt-2 flex items-center gap-2 text-xs text-amber-200/70">
                  <Award className="h-4 w-4 text-amber-400" />
                  <span>
                    Next level reward: +5 Skill Points, New Quest Unlocked
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="scrollbar-hide mb-8 flex overflow-x-auto">
          <div className="flex space-x-1 rounded-lg border border-amber-800/30 bg-amber-950/50 p-1 backdrop-blur-sm">
            {["quests", "map", "achievements", "companions"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-amber-500/80 to-emerald-500/80 text-amber-950 shadow-lg"
                    : "text-amber-200 hover:bg-amber-800/30 hover:text-amber-100"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "quests" && (
            <motion.div
              key="quests"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {quests.map((quest) => (
                  <motion.div
                    key={quest.id}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 20px rgba(245, 158, 11, 0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    onClick={() => setSelectedQuest(quest.id)}
                    className={`relative cursor-pointer rounded-lg border p-4 ${
                      quest.status === "Completed"
                        ? "border-emerald-800/30 bg-gradient-to-br from-amber-950/80 to-emerald-950/80"
                        : quest.status === "In Progress"
                          ? "border-amber-800/30 bg-gradient-to-br from-amber-950/80 to-amber-900/30"
                          : "border-amber-800/20 bg-amber-950/70"
                    }`}
                  >
                    {quest.status === "Completed" && (
                      <div className="absolute right-2 top-2">
                        <Award className="h-5 w-5 text-emerald-400" />
                      </div>
                    )}

                    <h3
                      className={`mb-1 text-lg font-bold ${
                        quest.status === "Completed"
                          ? "text-emerald-200"
                          : "text-amber-100"
                      }`}
                    >
                      {quest.name}
                    </h3>

                    <p className="mb-3 text-sm text-amber-200/70">
                      {quest.description}
                    </p>

                    <div className="mb-3 flex items-center gap-2">
                      <Map className="h-4 w-4 text-amber-400" />
                      <span className="text-xs text-amber-200">
                        {quest.location}
                      </span>
                    </div>

                    <div className="mb-1 flex justify-between text-xs text-amber-200/70">
                      <span>Progress</span>
                      <span>{quest.progress}%</span>
                    </div>

                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-amber-900/50">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${quest.progress}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`h-full ${
                          quest.status === "Completed"
                            ? "bg-gradient-to-r from-amber-500 to-emerald-500"
                            : "bg-gradient-to-r from-amber-600 to-amber-400"
                        }`}
                      />
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          quest.difficulty === "Legendary"
                            ? "bg-purple-500/20 text-purple-300"
                            : quest.difficulty === "Hard"
                              ? "bg-red-500/20 text-red-300"
                              : "bg-amber-500/20 text-amber-300"
                        }`}
                      >
                        {quest.difficulty}
                      </span>
                      <ChevronRight className="h-4 w-4 text-amber-500" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quest details modal */}
              <AnimatePresence>
                {selectedQuest && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedQuest(null)}
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
                      className="w-full max-w-md rounded-xl border border-amber-800/30 bg-gradient-to-br from-amber-950 to-emerald-950/90 p-6 shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                    >
                      {(() => {
                        const quest = quests.find(
                          (q) => q.id === selectedQuest,
                        );
                        if (!quest) return null;

                        return (
                          <>
                            <div className="mb-4 flex items-start justify-between">
                              <h2 className="text-xl font-bold text-amber-100">
                                {quest.name}
                              </h2>
                              <button
                                onClick={() => setSelectedQuest(null)}
                                className="text-amber-500 hover:text-amber-300"
                              >
                                <X className="h-5 w-5" />
                              </button>
                            </div>

                            <p className="mb-4 text-amber-200/80">
                              {quest.description}
                            </p>

                            <div className="mb-6 grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs text-amber-200/70">
                                  Location
                                </p>
                                <p className="flex items-center gap-1 text-sm text-amber-100">
                                  <Map className="h-3 w-3 text-amber-400" />
                                  {quest.location}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs text-amber-200/70">
                                  Difficulty
                                </p>
                                <p
                                  className={`text-sm ${
                                    quest.difficulty === "Legendary"
                                      ? "text-purple-300"
                                      : quest.difficulty === "Hard"
                                        ? "text-red-300"
                                        : "text-amber-300"
                                  }`}
                                >
                                  {quest.difficulty}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs text-amber-200/70">
                                  Status
                                </p>
                                <p
                                  className={`text-sm ${
                                    quest.status === "Completed"
                                      ? "text-emerald-300"
                                      : quest.status === "In Progress"
                                        ? "text-amber-300"
                                        : "text-amber-200"
                                  }`}
                                >
                                  {quest.status}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs text-amber-200/70">
                                  Reward
                                </p>
                                <p className="text-sm text-amber-400">
                                  {quest.reward}
                                </p>
                              </div>
                            </div>

                            <div className="mb-6">
                              <h3 className="mb-2 text-sm font-medium text-amber-200">
                                Quest Steps
                              </h3>
                              <div className="space-y-2">
                                {quest.steps.map((step, index) => (
                                  <div
                                    key={index}
                                    className={`flex items-center gap-3 rounded-lg p-2 ${
                                      step.completed
                                        ? "border border-emerald-800/30 bg-emerald-900/20"
                                        : "border border-amber-800/20 bg-amber-900/20"
                                    }`}
                                  >
                                    <div
                                      className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                                        step.completed
                                          ? "bg-emerald-500 text-emerald-950"
                                          : "bg-amber-800/50 text-amber-200"
                                      }`}
                                    >
                                      {step.completed ? "✓" : index + 1}
                                    </div>
                                    <span
                                      className={`text-sm ${step.completed ? "text-emerald-200" : "text-amber-200"}`}
                                    >
                                      {step.name}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <button className="rounded-lg bg-amber-900/50 px-4 py-2 text-sm text-amber-200 transition-colors hover:bg-amber-800/50">
                                View on Map
                              </button>

                              {quest.status !== "Completed" && (
                                <button className="rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-sm font-medium text-amber-950 transition-colors hover:from-amber-600 hover:to-amber-700">
                                  {quest.status === "In Progress"
                                    ? "Continue Quest"
                                    : "Start Quest"}
                                </button>
                              )}
                            </div>
                          </>
                        );
                      })()}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {activeTab === "map" && (
            <motion.div
              key="map"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div
                ref={mapRef}
                className="relative h-[500px] cursor-move overflow-hidden rounded-xl border border-amber-800/30 bg-amber-950/50"
                onMouseDown={(e) => {
                  const startX = e.clientX;
                  const startY = e.clientY;
                  const startPosX = mapPosition.x;
                  const startPosY = mapPosition.y;

                  const handleMouseMove = (e: MouseEvent) => {
                    const dx = e.clientX - startX;
                    const dy = e.clientY - startY;
                    setMapPosition({
                      x: startPosX + dx,
                      y: startPosY + dy,
                    });
                  };

                  const handleMouseUp = () => {
                    document.removeEventListener("mousemove", handleMouseMove);
                    document.removeEventListener("mouseup", handleMouseUp);
                  };

                  document.addEventListener("mousemove", handleMouseMove);
                  document.addEventListener("mouseup", handleMouseUp);
                }}
              >
                {/* Map background */}
                <div
                  className="absolute inset-0 bg-amber-900/20 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=800&width=800')]"
                  style={{
                    transform: `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${mapScale})`,
                    transformOrigin: "center",
                    transition: "transform 0.1s ease-out",
                  }}
                >
                  {/* Quest markers */}
                  {quests.map((quest) => (
                    <motion.div
                      key={quest.id}
                      className="absolute"
                      style={{
                        left: `${quest.mapLocation.x}px`,
                        top: `${quest.mapLocation.y}px`,
                      }}
                      whileHover={{ scale: 1.2 }}
                    >
                      <div
                        className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded-full ${
                          quest.status === "Completed"
                            ? "bg-emerald-500 text-emerald-950"
                            : quest.status === "In Progress"
                              ? "bg-amber-500 text-amber-950"
                              : "bg-amber-800 text-amber-200"
                        }`}
                        onClick={() => setSelectedQuest(quest.id)}
                      >
                        {quest.status === "Completed" ? "✓" : "!"}
                      </div>
                      <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-full border border-amber-800/30 bg-amber-950/80 px-2 py-0.5 text-xs font-medium text-amber-200">
                        {quest.name}
                      </div>
                    </motion.div>
                  ))}

                  {/* Player marker */}
                  <div
                    className="absolute left-[250px] top-[220px]"
                    style={{
                      filter: "drop-shadow(0 0 8px rgba(245, 158, 11, 0.5))",
                    }}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-amber-300 bg-amber-500 text-amber-950">
                      <Compass className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                {/* Map controls */}
                <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                  <button
                    onClick={() => setMapScale(Math.min(2, mapScale + 0.1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-900/80 text-amber-200 transition-colors hover:bg-amber-800/80"
                  >
                    +
                  </button>
                  <button
                    onClick={() => setMapScale(Math.max(0.5, mapScale - 0.1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-900/80 text-amber-200 transition-colors hover:bg-amber-800/80"
                  >
                    -
                  </button>
                  <button
                    onClick={() => {
                      setMapPosition({ x: 0, y: 0 });
                      setMapScale(1);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-900/80 text-amber-200 transition-colors hover:bg-amber-800/80"
                  >
                    <Compass className="h-4 w-4" />
                  </button>
                </div>

                {/* Map legend */}
                <div className="absolute left-4 top-4 rounded-lg border border-amber-800/30 bg-amber-950/80 p-3 backdrop-blur-sm">
                  <h3 className="mb-2 text-sm font-medium text-amber-200">
                    Legend
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-amber-500"></div>
                      <span className="text-xs text-amber-200">
                        Active Quest
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-emerald-500"></div>
                      <span className="text-xs text-amber-200">
                        Completed Quest
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-amber-800"></div>
                      <span className="text-xs text-amber-200">
                        Available Quest
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-amber-300 bg-amber-500">
                        <Compass className="h-2 w-2 text-amber-950" />
                      </div>
                      <span className="text-xs text-amber-200">
                        Your Location
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center text-sm text-amber-200/70">
                <p>
                  Drag to pan the map. Use mouse wheel or buttons to zoom
                  in/out.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === "achievements" && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className={`rounded-lg border p-4 ${
                      achievement.completed
                        ? "border-amber-800/30 bg-gradient-to-br from-amber-950/80 to-amber-900/30"
                        : "border-amber-800/20 bg-amber-950/70 opacity-70"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`rounded-lg p-2 ${achievement.completed ? "bg-amber-900/50" : "bg-amber-950/50"}`}
                      >
                        {achievement.icon}
                      </div>

                      <div>
                        <h3
                          className={`font-bold ${achievement.completed ? "text-amber-100" : "text-amber-300/70"}`}
                        >
                          {achievement.name}
                        </h3>
                        <p className="text-sm text-amber-200/70">
                          {achievement.description}
                        </p>

                        {achievement.completed ? (
                          <p className="mt-2 text-xs text-emerald-400">
                            Completed on {achievement.date}
                          </p>
                        ) : (
                          <p className="mt-2 text-xs text-amber-500">
                            Not yet completed
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="mb-2 text-amber-200">Achievement Progress</p>
                <div className="inline-flex items-center gap-2">
                  <div className="h-2 w-32 overflow-hidden rounded-full bg-amber-900/50">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(achievements.filter((a) => a.completed).length / achievements.length) * 100}%`,
                      }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-amber-500 to-emerald-500"
                    />
                  </div>
                  <span className="font-medium text-amber-300">
                    {achievements.filter((a) => a.completed).length}/
                    {achievements.length}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "companions" && (
            <motion.div
              key="companions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {companions.map((companion) => (
                  <motion.div
                    key={companion.id}
                    whileHover={{ scale: 1.03, y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="rounded-xl border border-amber-800/30 bg-gradient-to-br from-amber-950/80 to-amber-900/30 p-5"
                  >
                    <div className="flex flex-col items-center">
                      <div className="relative mb-4">
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 opacity-70 blur-sm"></div>
                        <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-amber-600">
                          <Image
                            src={
                              companion.avatar ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                            }
                            alt={companion.name}
                            fill
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-amber-600 bg-amber-950 text-xs font-bold text-amber-400">
                          {companion.level}
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-amber-100">
                        {companion.name}
                      </h3>
                      <p className="text-sm text-amber-400">
                        {companion.race} {companion.class}
                      </p>
                      <p className="mt-1 text-xs text-amber-200/70">
                        Relationship: {companion.relationship}
                      </p>

                      <div className="mt-4 w-full">
                        <p className="mb-2 text-xs text-amber-200/70">Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {companion.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="rounded-full border border-amber-800/30 bg-amber-900/50 px-2 py-1 text-xs text-amber-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button className="mt-4 w-full rounded-lg bg-amber-800/50 py-2 text-sm font-medium text-amber-200 transition-colors hover:bg-amber-700/50">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button className="rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 px-6 py-2 text-amber-100 transition-colors hover:from-amber-700 hover:to-amber-800">
                  Find New Companions
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
