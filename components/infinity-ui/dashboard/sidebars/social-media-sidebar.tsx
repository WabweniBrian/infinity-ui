"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Home,
  Bell,
  MessageSquare,
  User,
  Users,
  Bookmark,
  Settings,
  TrendingUp,
  Search,
  Menu,
  X,
  Hash,
  Heart,
  ImageIcon,
  Video,
  Music,
  Calendar,
  MoreHorizontal,
  LogOut,
  Moon,
  Sun,
  Share,
} from "lucide-react";
import Image from "next/image";

const SocialMediaSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [unreadNotifications, setUnreadNotifications] = useState(5);
  const [unreadMessages, setUnreadMessages] = useState(3);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Handle mobile sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const mainNavItems = [
    { id: "home", name: "Home", icon: <Home className="h-6 w-6" />, href: "#" },
    {
      id: "notifications",
      name: "Notifications",
      icon: <Bell className="h-6 w-6" />,
      href: "#",
      badge: unreadNotifications,
    },
    {
      id: "messages",
      name: "Messages",
      icon: <MessageSquare className="h-6 w-6" />,
      href: "#",
      badge: unreadMessages,
    },
    {
      id: "profile",
      name: "Profile",
      icon: <User className="h-6 w-6" />,
      href: "#",
    },
    {
      id: "friends",
      name: "Friends",
      icon: <Users className="h-6 w-6" />,
      href: "#",
    },
    {
      id: "saved",
      name: "Saved",
      icon: <Bookmark className="h-6 w-6" />,
      href: "#",
    },
  ];

  const trendingTopics = [
    { id: "tech", name: "Technology", posts: "24.5K" },
    { id: "design", name: "Design", posts: "18.2K" },
    { id: "travel", name: "Travel", posts: "15.7K" },
    { id: "food", name: "Food", posts: "12.3K" },
    { id: "music", name: "Music", posts: "10.9K" },
  ];

  const suggestedFriends = [
    {
      id: "user1",
      name: "Jane Cooper",
      username: "@janecooper",
      avatar: "/images/1.png",
    },
    {
      id: "user2",
      name: "Alex Morgan",
      username: "@alexmorgan",
      avatar: "/images/1.png",
    },
    {
      id: "user3",
      name: "Robert Johnson",
      username: "@robertj",
      avatar: "/images/1.png",
    },
  ];

  // Sidebar variants for animation
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  // Overlay variants
  const overlayVariants = {
    open: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-50 transition-colors duration-200 dark:bg-gray-900">
        {/* Mobile header */}
        <div className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between bg-white px-4 py-3 shadow-sm transition-colors duration-200 dark:bg-gray-800 lg:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-md p-2 text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
            aria-label="Open sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 justify-center">
            <span className="text-xl font-bold text-gray-900 transition-colors duration-200 dark:text-white">
              SocialApp
            </span>
          </div>

          <button className="rounded-full p-2 text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">
            <Search className="h-6 w-6" />
          </button>
        </div>

        {/* Overlay */}
        <AnimatePresence>
          {isSidebarOpen && window.innerWidth < 1024 && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside
              initial={window.innerWidth < 1024 ? "closed" : "open"}
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className="fixed bottom-0 left-0 top-0 z-50 flex w-80 flex-col bg-white shadow-lg transition-colors duration-200 dark:bg-gray-800"
            >
              <div className="flex items-center justify-between border-b p-4 transition-colors duration-200 dark:border-gray-700">
                <Link href="/" className="flex items-center">
                  <span className="text-xl font-bold text-gray-900 transition-colors duration-200 dark:text-white">
                    SocialApp
                  </span>
                </Link>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="rounded-md p-2 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                    aria-label={
                      isDarkMode
                        ? "Switch to light mode"
                        : "Switch to dark mode"
                    }
                  >
                    {isDarkMode ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="rounded-md p-2 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:hidden"
                    aria-label="Close sidebar"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* User Profile */}
              <div className="border-b p-4 transition-colors duration-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-pink-500 text-lg font-bold text-white">
                      JD
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-base font-medium text-gray-800 transition-colors duration-200 dark:text-gray-200">
                      John Doe
                    </p>
                    <p className="text-sm text-gray-500 transition-colors duration-200 dark:text-gray-400">
                      @johndoe
                    </p>
                  </div>
                  <button className="ml-auto rounded-full p-2 text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-400">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4 flex justify-between text-sm">
                  <div className="text-center">
                    <p className="font-semibold text-gray-900 transition-colors duration-200 dark:text-white">
                      1,254
                    </p>
                    <p className="text-gray-500 transition-colors duration-200 dark:text-gray-400">
                      Following
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900 transition-colors duration-200 dark:text-white">
                      4,589
                    </p>
                    <p className="text-gray-500 transition-colors duration-200 dark:text-gray-400">
                      Followers
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900 transition-colors duration-200 dark:text-white">
                      892
                    </p>
                    <p className="text-gray-500 transition-colors duration-200 dark:text-gray-400">
                      Posts
                    </p>
                  </div>
                </div>
              </div>

              {/* Search */}
              <div className="border-b p-4 transition-colors duration-200 dark:border-gray-700">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5 text-gray-400 transition-colors duration-200 dark:text-gray-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full rounded-full border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 transition-colors duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {/* Main Navigation */}
                <nav className="border-b p-4 transition-colors duration-200 dark:border-gray-700">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 transition-colors duration-200 dark:text-gray-400">
                    Main
                  </h3>
                  <div className="space-y-1">
                    {mainNavItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                          activeTab === item.id
                            ? "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="mr-3">{item.icon}</span>
                          {item.name}
                        </div>
                        {item.badge && (
                          <span className="inline-flex items-center justify-center rounded-full bg-red-500 px-2 py-1 text-xs font-bold leading-none text-white">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </nav>
                {/* Trending Topics */}
                <div className="border-b p-4 transition-colors duration-200 dark:border-gray-700">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 transition-colors duration-200 dark:text-gray-400">
                      Trending
                    </h3>
                    <button className="text-xs font-medium text-purple-600 transition-colors duration-200 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300">
                      See All
                    </button>
                  </div>
                  <div className="space-y-2">
                    {trendingTopics.map((topic) => (
                      <Link
                        key={topic.id}
                        href="#"
                        className="flex items-center justify-between rounded-md px-2 py-1.5 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <div className="flex items-center">
                          <Hash className="mr-2 h-4 w-4 text-gray-500 transition-colors duration-200 dark:text-gray-400" />
                          <span className="text-sm text-gray-800 transition-colors duration-200 dark:text-gray-200">
                            {topic.name}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 transition-colors duration-200 dark:text-gray-400">
                          {topic.posts}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
                {/* Suggested Friends */}
                <div className="border-b p-4 transition-colors duration-200 dark:border-gray-700">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 transition-colors duration-200 dark:text-gray-400">
                      Suggested Friends
                    </h3>
                    <button className="text-xs font-medium text-purple-600 transition-colors duration-200 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300">
                      See All
                    </button>
                  </div>
                  <div className="space-y-3">
                    {suggestedFriends.map((friend) => (
                      <div
                        key={friend.id}
                        className="flex items-center justify-between rounded-md px-2 py-1.5 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <div className="flex items-center">
                          <Image
                            src={
                              friend.avatar ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                            }
                            alt={friend.name}
                            width={32}
                            height={32}
                            className="mr-2 h-8 w-8 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-800 transition-colors duration-200 dark:text-gray-200">
                              {friend.name}
                            </p>
                            <p className="text-xs text-gray-500 transition-colors duration-200 dark:text-gray-400">
                              {friend.username}
                            </p>
                          </div>
                        </div>
                        <button className="text-xs font-medium text-purple-600 transition-colors duration-200 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300">
                          Follow
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-auto border-t p-4 transition-colors duration-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    <button className="rounded-full p-2 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                      <Settings className="h-5 w-5" />
                    </button>
                    <button className="rounded-full p-2 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                      <Calendar className="h-5 w-5" />
                    </button>
                    <button className="rounded-full p-2 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                      <TrendingUp className="h-5 w-5" />
                    </button>
                  </div>
                  <button className="rounded-full p-2 text-red-500 transition-colors duration-200 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20">
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main content */}
        <div
          className={`transition-all duration-300 ${isSidebarOpen ? "lg:ml-80" : ""}`}
        >
          <div className="pt-16 lg:px-8 lg:py-6 lg:pt-6">
            {/* Page content would go here */}
            <div className="mx-auto max-w-3xl">
              {/* Content Header */}
              <div className="mb-4 rounded-lg bg-white p-4 shadow transition-colors duration-200 dark:bg-gray-800">
                <div className="flex items-center space-x-4">
                  <button className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                    <ImageIcon className="h-5 w-5" />
                  </button>
                  <button className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                    <Video className="h-5 w-5" />
                  </button>
                  <button className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                    <Music className="h-5 w-5" />
                  </button>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="What's on your mind?"
                      className="w-full rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 transition-colors duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* Feed Placeholder */}
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-lg bg-white shadow transition-colors duration-200 dark:bg-gray-800"
                  >
                    <div className="p-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200 transition-colors duration-200 dark:bg-gray-700"></div>
                        <div className="ml-3">
                          <div className="h-4 w-24 animate-pulse rounded bg-gray-200 transition-colors duration-200 dark:bg-gray-700"></div>
                          <div className="mt-1 h-3 w-16 animate-pulse rounded bg-gray-200 transition-colors duration-200 dark:bg-gray-700"></div>
                        </div>
                        <div className="ml-auto">
                          <div className="h-6 w-6 animate-pulse rounded bg-gray-200 transition-colors duration-200 dark:bg-gray-700"></div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="h-4 w-full animate-pulse rounded bg-gray-200 transition-colors duration-200 dark:bg-gray-700"></div>
                        <div className="mt-2 h-4 w-full animate-pulse rounded bg-gray-200 transition-colors duration-200 dark:bg-gray-700"></div>
                        <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-gray-200 transition-colors duration-200 dark:bg-gray-700"></div>
                      </div>
                    </div>
                    <div className="h-48 animate-pulse bg-gray-200 transition-colors duration-200 dark:bg-gray-700"></div>
                    <div className="border-t p-4 transition-colors duration-200 dark:border-gray-700">
                      <div className="flex justify-between">
                        <button className="flex items-center text-gray-500 transition-colors duration-200 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400">
                          <Heart className="mr-1 h-5 w-5" />
                          <span className="text-sm">Like</span>
                        </button>
                        <button className="flex items-center text-gray-500 transition-colors duration-200 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                          <MessageSquare className="mr-1 h-5 w-5" />
                          <span className="text-sm">Comment</span>
                        </button>
                        <button className="flex items-center text-gray-500 transition-colors duration-200 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400">
                          <Share className="mr-1 h-5 w-5" />
                          <span className="text-sm">Share</span>
                        </button>
                      </div>
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

export default SocialMediaSidebar;
