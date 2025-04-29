"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Plus,
  Zap,
  BookOpen,
  Lightbulb,
  Moon,
  Sun,
  User,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

interface ChatHistory {
  id: string;
  title: string;
  date: string;
  preview: string;
}

interface SuggestedPrompt {
  id: string;
  text: string;
  category: string;
}

const chatHistory: ChatHistory[] = [
  {
    id: "1",
    title: "Website Design Ideas",
    date: "2 hours ago",
    preview: "I need some creative ideas for my portfolio website...",
  },
  {
    id: "2",
    title: "Marketing Strategy",
    date: "Yesterday",
    preview: "Can you help me create a content calendar for...",
  },
  {
    id: "3",
    title: "Code Review",
    date: "3 days ago",
    preview: "Could you review this React component and suggest...",
  },
  {
    id: "4",
    title: "Product Description",
    date: "1 week ago",
    preview: "I need help writing compelling product descriptions...",
  },
];

const suggestedPrompts: SuggestedPrompt[] = [
  {
    id: "1",
    text: "Generate a creative blog post outline about sustainable living",
    category: "Content",
  },
  {
    id: "2",
    text: "Help me debug this JavaScript function that isn't working correctly",
    category: "Code",
  },
  {
    id: "3",
    text: "Create a weekly meal plan with shopping list for a family of four",
    category: "Lifestyle",
  },
  {
    id: "4",
    text: "Suggest 5 ways to improve my website's conversion rate",
    category: "Marketing",
  },
];

interface SidebarProps {
  isMobile: boolean;
  showMobileMenu: boolean;
  setShowMobileMenu: (show: boolean) => void;
}

export default function Sidebar({
  isMobile,
  showMobileMenu,
  setShowMobileMenu,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState<
    "chats" | "prompts" | "settings"
  >("chats");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <AnimatePresence>
      <div className={cn("flex h-screen bg-gray-50", isDarkMode && "dark")}>
        <motion.div
          className={cn(
            "relative h-full border-r border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900",
            isCollapsed ? "w-20" : "w-80",
          )}
          animate={{ width: isCollapsed ? 80 : 320 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center space-x-2"
                  >
                    <Sparkles className="h-6 w-6 text-purple-500" />
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      AI Assistant
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={toggleSidebar}
                className="rounded-full p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isCollapsed ? (
                  <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronLeft className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                )}
              </button>
            </div>

            {/* Navigation */}
            <div className="flex flex-col items-center space-y-1 py-4 sm:items-start">
              <button
                onClick={() => setActiveSection("chats")}
                className={cn(
                  "flex w-full items-center space-x-3 px-4 py-2 transition-colors",
                  activeSection === "chats"
                    ? "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                )}
              >
                <MessageSquare className="h-5 w-5" />
                {!isCollapsed && <span>Chats</span>}
              </button>
              <button
                onClick={() => setActiveSection("prompts")}
                className={cn(
                  "flex w-full items-center space-x-3 px-4 py-2 transition-colors",
                  activeSection === "prompts"
                    ? "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                )}
              >
                <Lightbulb className="h-5 w-5" />
                {!isCollapsed && <span>Prompts</span>}
              </button>
              <button
                onClick={() => setActiveSection("settings")}
                className={cn(
                  "flex w-full items-center space-x-3 px-4 py-2 transition-colors",
                  activeSection === "settings"
                    ? "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                )}
              >
                <Settings className="h-5 w-5" />
                {!isCollapsed && <span>Settings</span>}
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-2">
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeSection === "chats" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Recent Chats
                          </h3>
                          <button className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800">
                            <Plus className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          </button>
                        </div>
                        <div className="space-y-2">
                          {chatHistory.map((chat) => (
                            <div
                              key={chat.id}
                              className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                              <div className="flex items-start justify-between">
                                <span className="font-medium text-gray-900 dark:text-white">
                                  {chat.title}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {chat.date}
                                </span>
                              </div>
                              <p className="mt-1 line-clamp-1 text-xs text-gray-500 dark:text-gray-400">
                                {chat.preview}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeSection === "prompts" && (
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Suggested Prompts
                        </h3>
                        <div className="space-y-2">
                          {suggestedPrompts.map((prompt) => (
                            <div
                              key={prompt.id}
                              className="cursor-pointer rounded-lg border border-gray-200 p-3 transition-colors hover:border-purple-300 dark:border-gray-700 dark:hover:border-purple-700"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                                  {prompt.category}
                                </span>
                                <Zap className="h-3 w-3 text-yellow-500" />
                              </div>
                              <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                                {prompt.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeSection === "settings" && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                            Appearance
                          </h3>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              Dark Mode
                            </span>
                            <DarkModeToggle className="static left-0 top-0" />
                          </div>
                        </div>

                        <div>
                          <h3 className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                            Account
                          </h3>
                          <div className="space-y-2">
                            <div className="flex cursor-pointer items-center space-x-3 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                              <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                Profile Settings
                              </span>
                            </div>
                            <div className="flex cursor-pointer items-center space-x-3 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                              <BookOpen className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                Usage & Billing
                              </span>
                            </div>
                            <div className="flex cursor-pointer items-center space-x-3 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                              <LogOut className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                Sign Out
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 dark:border-gray-800">
              <AnimatePresence mode="wait">
                {!isCollapsed ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-pink-500 font-medium text-white">
                      A
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        Alex Morgan
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Pro Plan
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-center"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-pink-500 font-medium text-white">
                      A
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
