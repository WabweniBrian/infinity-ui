"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatHistory {
  id: string
  title: string
  date: string
  preview: string
}

interface SuggestedPrompt {
  id: string
  text: string
  category: string
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
]

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
]

export default function AIAssistantSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeSection, setActiveSection] = useState<"chats" | "prompts" | "settings">("chats")
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className={cn("flex h-screen bg-gray-50", isDarkMode && "dark")}>
      <motion.div
        className={cn(
          "relative h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-sm",
          isCollapsed ? "w-20" : "w-80",
        )}
        animate={{ width: isCollapsed ? 80 : 320 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center space-x-2"
                >
                  <Sparkles className="h-6 w-6 text-purple-500" />
                  <span className="font-bold text-lg text-gray-900 dark:text-white">AI Assistant</span>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isCollapsed ? (
                <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <ChevronLeft className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center sm:items-start py-4 space-y-1">
            <button
              onClick={() => setActiveSection("chats")}
              className={cn(
                "flex items-center w-full px-4 py-2 space-x-3 transition-colors",
                activeSection === "chats"
                  ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
              )}
            >
              <MessageSquare className="h-5 w-5" />
              {!isCollapsed && <span>Chats</span>}
            </button>
            <button
              onClick={() => setActiveSection("prompts")}
              className={cn(
                "flex items-center w-full px-4 py-2 space-x-3 transition-colors",
                activeSection === "prompts"
                  ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
              )}
            >
              <Lightbulb className="h-5 w-5" />
              {!isCollapsed && <span>Prompts</span>}
            </button>
            <button
              onClick={() => setActiveSection("settings")}
              className={cn(
                "flex items-center w-full px-4 py-2 space-x-3 transition-colors",
                activeSection === "settings"
                  ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
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
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Recent Chats</h3>
                        <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                          <Plus className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </button>
                      </div>
                      <div className="space-y-2">
                        {chatHistory.map((chat) => (
                          <div
                            key={chat.id}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                          >
                            <div className="flex justify-between items-start">
                              <span className="font-medium text-gray-900 dark:text-white">{chat.title}</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">{chat.date}</span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{chat.preview}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeSection === "prompts" && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Suggested Prompts</h3>
                      <div className="space-y-2">
                        {suggestedPrompts.map((prompt) => (
                          <div
                            key={prompt.id}
                            className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 cursor-pointer transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                                {prompt.category}
                              </span>
                              <Zap className="h-3 w-3 text-yellow-500" />
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{prompt.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeSection === "settings" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Appearance</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700 dark:text-gray-300">Dark Mode</span>
                          <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className={cn(
                              "p-1.5 rounded-full transition-colors",
                              isDarkMode ? "bg-purple-100 text-purple-600" : "bg-gray-100 text-gray-500",
                            )}
                          >
                            {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Account</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                            <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Profile Settings</span>
                          </div>
                          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                            <BookOpen className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Usage & Billing</span>
                          </div>
                          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                            <LogOut className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Sign Out</span>
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
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <AnimatePresence mode="wait">
              {!isCollapsed ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white font-medium">
                    A
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Alex Morgan</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Pro Plan</div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white font-medium">
                    A
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Main content area (placeholder) */}
      <div className="flex-1 p-8 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 h-[calc(100vh-4rem)]">
            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
              <p className="text-center">Select a chat or start a new conversation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

