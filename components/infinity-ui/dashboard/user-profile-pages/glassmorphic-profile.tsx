"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Briefcase,
  Award,
  Star,
  MessageCircle,
  Heart,
  Share2,
  Bookmark,
  Edit,
  Settings,
  Users,
} from "lucide-react";
import Image from "next/image";

export default function GlassmorphicProfile() {
  const [activeTab, setActiveTab] = useState("overview");

  const user = {
    name: "Alexandra Reynolds",
    role: "Senior Product Designer",
    location: "San Francisco, CA",
    joined: "March 2020",
    email: "alex.reynolds@example.com",
    avatar:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    cover:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    bio: "Award-winning product designer with over 8 years of experience creating intuitive digital experiences for global brands.",
    stats: [
      { label: "Projects", value: 48 },
      { label: "Followers", value: 2.4, unit: "k" },
      { label: "Following", value: 562 },
      { label: "Likes", value: 15.7, unit: "k" },
    ],
    skills: [
      { name: "UI Design", level: 95 },
      { name: "UX Research", level: 85 },
      { name: "Prototyping", level: 90 },
      { name: "Design Systems", level: 88 },
      { name: "User Testing", level: 82 },
    ],
    projects: [
      {
        id: 1,
        title: "Finance Dashboard Redesign",
        image:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=200&width=300",
        category: "Web Design",
      },
      {
        id: 2,
        title: "Health & Fitness App",
        image:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=200&width=300",
        category: "Mobile App",
      },
      {
        id: 3,
        title: "E-commerce Design System",
        image:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=200&width=300",
        category: "Design System",
      },
    ],
    activity: [
      {
        id: 1,
        action: "Completed project",
        target: "Finance Dashboard Redesign",
        time: "2 hours ago",
      },
      {
        id: 2,
        action: "Added new skill",
        target: "Motion Design",
        time: "1 day ago",
      },
      {
        id: 3,
        action: "Received award",
        target: "Designer of the Month",
        time: "3 days ago",
      },
    ],
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "activity", label: "Activity" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4 sm:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Cover Image */}
        <div className="relative mb-24">
          <div className="relative h-64 w-full overflow-hidden rounded-3xl sm:h-80">
            <Image
              src={
                user.cover ||
                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
              }
              fill
              alt="Cover"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Avatar */}
          <motion.div
            className="absolute -bottom-16 left-1/2 z-20 -translate-x-1/2 transform"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="relative">
              <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-white">
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
                className="absolute -bottom-2 -right-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-blue-500"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit size={16} className="text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Profile Header */}
        <motion.div
          className="mb-6 rounded-3xl bg-white/10 p-6 text-center backdrop-blur-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h1 className="mb-2 text-3xl font-bold text-white">{user.name}</h1>
          <p className="mb-4 text-lg text-purple-200">{user.role}</p>

          <div className="mb-6 flex flex-wrap justify-center gap-4 text-sm text-purple-200">
            <div className="flex items-center">
              <MapPin size={16} className="mr-1" />
              <span>{user.location}</span>
            </div>
            <div className="flex items-center">
              <Mail size={16} className="mr-1" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              <span>Joined {user.joined}</span>
            </div>
          </div>

          <p className="mx-auto mb-6 max-w-2xl text-white">{user.bio}</p>

          <div className="flex flex-wrap justify-center gap-3">
            <motion.button
              className="flex items-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-2 font-medium text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle size={16} className="mr-2" />
              Message
            </motion.button>
            <motion.button
              className="flex items-center rounded-full bg-white/20 px-5 py-2 font-medium text-white backdrop-blur-sm"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart size={16} className="mr-2" />
              Follow
            </motion.button>
            <motion.button
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(255,255,255,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 size={16} />
            </motion.button>
            <motion.button
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(255,255,255,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Bookmark size={16} />
            </motion.button>
            <motion.button
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(255,255,255,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Settings size={16} />
            </motion.button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {user.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="rounded-3xl bg-white/10 p-4 text-center backdrop-blur-xl"
              whileHover={{
                y: -5,
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
              }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.p
                className="text-2xl font-bold text-white sm:text-3xl"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              >
                {stat.value}
                {stat.unit || ""}
              </motion.p>
              <p className="text-purple-200">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs */}
        <div className="mb-6 rounded-3xl bg-white/10 p-6 backdrop-blur-xl">
          <div className="hide-scrollbar mb-6 flex space-x-2 overflow-x-auto">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                className={`whitespace-nowrap rounded-full px-5 py-2 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                    : "bg-white/10 text-purple-200 hover:bg-white/20"
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
          <div className="min-h-[300px]">
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 gap-6 md:grid-cols-2"
              >
                {/* Recent Projects */}
                <div className="space-y-4">
                  <h3 className="mb-4 text-xl font-semibold text-white">
                    Recent Projects
                  </h3>
                  {user.projects.slice(0, 2).map((project) => (
                    <motion.div
                      key={project.id}
                      className="flex overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl"
                      whileHover={{
                        y: -5,
                        boxShadow:
                          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      <div className="relative h-24 w-24 flex-shrink-0">
                        <Image
                          src={
                            project.image ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                          }
                          fill
                          alt={project.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-white">
                          {project.title}
                        </h4>
                        <p className="text-sm text-purple-200">
                          {project.category}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Top Skills */}
                <div className="space-y-4">
                  <h3 className="mb-4 text-xl font-semibold text-white">
                    Top Skills
                  </h3>
                  {user.skills.slice(0, 3).map((skill, index) => (
                    <div key={skill.name} className="mb-3">
                      <div className="mb-1 flex justify-between">
                        <span className="text-purple-200">{skill.name}</span>
                        <span className="font-medium text-white">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="space-y-4 md:col-span-2">
                  <h3 className="mb-4 text-xl font-semibold text-white">
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    {user.activity.map((item) => (
                      <motion.div
                        key={item.id}
                        className="flex items-start rounded-2xl bg-white/5 p-4 backdrop-blur-xl"
                        whileHover={{
                          y: -3,
                          boxShadow:
                            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600">
                          {item.action.includes("Completed") && (
                            <Briefcase size={18} className="text-white" />
                          )}
                          {item.action.includes("Added") && (
                            <Star size={18} className="text-white" />
                          )}
                          {item.action.includes("Received") && (
                            <Award size={18} className="text-white" />
                          )}
                        </div>
                        <div>
                          <p className="text-white">
                            <span className="font-medium">{item.action}</span>{" "}
                            {item.target}
                          </p>
                          <p className="text-sm text-purple-200">{item.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "projects" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[...user.projects, ...user.projects].map(
                    (project, index) => (
                      <motion.div
                        key={`${project.id}-${index}`}
                        className="overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl"
                        whileHover={{
                          y: -5,
                          boxShadow:
                            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      >
                        <div className="relative h-40 w-full">
                          <Image
                            src={
                              project.image ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                            }
                            fill
                            alt={project.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="mb-1 text-lg font-medium text-white">
                            {project.title}
                          </h4>
                          <p className="mb-3 text-sm text-purple-200">
                            {project.category}
                          </p>
                          <div className="flex justify-between">
                            <div className="flex -space-x-2">
                              {[1, 2, 3].map((i) => (
                                <div
                                  key={i}
                                  className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-indigo-900"
                                >
                                  <Image
                                    src={`https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=50&width=50&text=${i}`}
                                    alt="Collaborator"
                                    fill
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                            <div className="flex space-x-2">
                              <motion.button
                                className="rounded-full bg-white/10 p-1.5 text-white"
                                whileHover={{
                                  scale: 1.1,
                                  backgroundColor: "rgba(255,255,255,0.2)",
                                }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Heart size={14} />
                              </motion.button>
                              <motion.button
                                className="rounded-full bg-white/10 p-1.5 text-white"
                                whileHover={{
                                  scale: 1.1,
                                  backgroundColor: "rgba(255,255,255,0.2)",
                                }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Bookmark size={14} />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ),
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "skills" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-6">
                    <h3 className="mb-4 text-xl font-semibold text-white">
                      Technical Skills
                    </h3>
                    {user.skills.map((skill, index) => (
                      <div key={skill.name} className="mb-4">
                        <div className="mb-2 flex justify-between">
                          <span className="text-purple-200">{skill.name}</span>
                          <span className="font-medium text-white">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ delay: index * 0.1, duration: 1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-6">
                    <h3 className="mb-4 text-xl font-semibold text-white">
                      Soft Skills
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { name: "Communication", level: 92 },
                        { name: "Teamwork", level: 88 },
                        { name: "Problem Solving", level: 95 },
                        { name: "Adaptability", level: 90 },
                        { name: "Time Management", level: 85 },
                        { name: "Leadership", level: 82 },
                      ].map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          className="relative overflow-hidden rounded-2xl bg-white/5 p-4 backdrop-blur-xl"
                          whileHover={{
                            y: -3,
                            boxShadow:
                              "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                          }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                          <div className="relative z-10">
                            <p className="mb-1 font-medium text-white">
                              {skill.name}
                            </p>
                            <p className="text-sm text-purple-200">
                              {skill.level}% Proficiency
                            </p>
                          </div>
                          <motion.div
                            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{
                              delay: 0.3 + index * 0.1,
                              duration: 1,
                            }}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "activity" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-6">
                  {["Today", "Yesterday", "Last Week"].map((day, dayIndex) => (
                    <div key={day} className="space-y-4">
                      <h3 className="text-xl font-semibold text-white">
                        {day}
                      </h3>
                      {[1, 2, 3].map((i) => {
                        const actions = [
                          "Completed project",
                          "Added new skill",
                          "Received award",
                          "Started new project",
                          "Updated profile",
                          "Joined team",
                        ];
                        const targets = [
                          "Finance Dashboard Redesign",
                          "Motion Design",
                          "Designer of the Month",
                          "E-commerce App",
                          "Portfolio",
                          "Product Design Team",
                        ];
                        const times = [
                          "2 hours ago",
                          "4 hours ago",
                          "8 hours ago",
                          "12 hours ago",
                          "Yesterday",
                          "2 days ago",
                        ];

                        const randomIndex = (dayIndex * 3 + i) % actions.length;

                        return (
                          <motion.div
                            key={`${day}-${i}`}
                            className="flex items-start rounded-2xl bg-white/5 p-4 backdrop-blur-xl"
                            whileHover={{
                              y: -3,
                              boxShadow:
                                "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                              backgroundColor: "rgba(255, 255, 255, 0.1)",
                            }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: (dayIndex * 3 + i) * 0.05,
                              duration: 0.5,
                            }}
                          >
                            <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600">
                              {actions[randomIndex].includes("Completed") && (
                                <Briefcase size={18} className="text-white" />
                              )}
                              {actions[randomIndex].includes("Added") && (
                                <Star size={18} className="text-white" />
                              )}
                              {actions[randomIndex].includes("Received") && (
                                <Award size={18} className="text-white" />
                              )}
                              {actions[randomIndex].includes("Started") && (
                                <Calendar size={18} className="text-white" />
                              )}
                              {actions[randomIndex].includes("Updated") && (
                                <User size={18} className="text-white" />
                              )}
                              {actions[randomIndex].includes("Joined") && (
                                <Users size={18} className="text-white" />
                              )}
                            </div>
                            <div>
                              <p className="text-white">
                                <span className="font-medium">
                                  {actions[randomIndex]}
                                </span>{" "}
                                {targets[randomIndex]}
                              </p>
                              <p className="text-sm text-purple-200">
                                {times[(dayIndex * 3 + i) % times.length]}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
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
