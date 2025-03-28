"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Video,
  BarChart2,
  Calendar,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Upload,
  Grid,
  List,
  Filter,
  Clock,
  Star,
  Heart,
  MessageCircle,
  Eye,
  ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface MediaItem {
  id: string;
  type: "image" | "video" | "document";
  title: string;
  thumbnail: string;
  date: string;
  size: string;
  stats?: {
    views: number;
    likes: number;
    comments: number;
  };
}

const mediaItems: MediaItem[] = [
  {
    id: "1",
    type: "image",
    title: "Product Photoshoot",
    thumbnail:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=80&width=80",
    date: "2 days ago",
    size: "2.4 MB",
    stats: {
      views: 1240,
      likes: 84,
      comments: 12,
    },
  },
  {
    id: "2",
    type: "video",
    title: "Brand Introduction",
    thumbnail:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=80&width=80",
    date: "1 week ago",
    size: "24.8 MB",
    stats: {
      views: 3560,
      likes: 142,
      comments: 28,
    },
  },
  {
    id: "3",
    type: "document",
    title: "Content Strategy",
    thumbnail:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=80&width=80",
    date: "3 days ago",
    size: "1.2 MB",
  },
  {
    id: "4",
    type: "image",
    title: "Social Media Graphics",
    thumbnail:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=80&width=80",
    date: "Yesterday",
    size: "4.6 MB",
    stats: {
      views: 890,
      likes: 56,
      comments: 8,
    },
  },
];

const contentCategories = [
  { id: "all", name: "All Content", icon: <Grid className="h-4 w-4" /> },
  { id: "images", name: "Images", icon: <ImageIcon className="h-4 w-4" /> },
  { id: "videos", name: "Videos", icon: <Video className="h-4 w-4" /> },
  {
    id: "documents",
    name: "Documents",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: "scheduled",
    name: "Scheduled",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    id: "analytics",
    name: "Analytics",
    icon: <BarChart2 className="h-4 w-4" />,
  },
  { id: "audience", name: "Audience", icon: <Users className="h-4 w-4" /> },
  { id: "settings", name: "Settings", icon: <Settings className="h-4 w-4" /> },
];

export default function ContentCreatorSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"recent" | "popular">("recent");

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <motion.div
        className={cn(
          "relative h-full border-r border-gray-200 bg-white shadow-sm",
          isCollapsed ? "w-20" : "w-80",
        )}
        animate={{ width: isCollapsed ? 80 : 320 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center space-x-2"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-r from-pink-500 to-orange-500 font-bold text-white">
                    C
                  </div>
                  <span className="text-lg font-bold text-gray-900">
                    Creator Studio
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={toggleSidebar}
              className="rounded-full p-1 transition-colors hover:bg-gray-100"
            >
              {isCollapsed ? (
                <ChevronRight className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronLeft className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>

          {/* Create Button */}
          <div className="p-4">
            <AnimatePresence mode="wait">
              {!isCollapsed ? (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex w-full items-center justify-center space-x-2 rounded-md bg-gradient-to-r from-pink-500 to-orange-500 px-4 py-2 text-white transition-colors hover:from-pink-600 hover:to-orange-600"
                >
                  <Plus className="h-5 w-5" />
                  <span>Create New</span>
                </motion.button>
              ) : (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-pink-500 to-orange-500 p-2 text-white transition-colors hover:from-pink-600 hover:to-orange-600"
                >
                  <Plus className="h-5 w-5" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {contentCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "flex w-full items-center rounded-md px-3 py-2 transition-colors",
                    activeCategory === category.id
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  )}
                >
                  <span className="flex items-center justify-center">
                    {category.icon}
                  </span>
                  <AnimatePresence mode="wait">
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="ml-3 text-sm font-medium"
                      >
                        {category.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              ))}
            </nav>
          </div>

          {/* Storage Usage */}
          <div className="border-t border-gray-200 p-4">
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Storage</span>
                    <span className="text-xs font-medium text-gray-700">
                      65% used
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-pink-500 to-orange-500"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    6.5 GB of 10 GB used
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <input
                  type="text"
                  placeholder="Search content..."
                  className="rounded-md border border-gray-200 py-2 pl-10 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <button className="rounded-md border border-gray-200 bg-white p-2 hover:bg-gray-50">
                <Upload className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "rounded-md p-1.5",
                    viewMode === "grid"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-500 hover:bg-gray-50",
                  )}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "rounded-md p-1.5",
                    viewMode === "list"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-500 hover:bg-gray-50",
                  )}
                >
                  <List className="h-4 w-4" />
                </button>
                <div className="mx-2 h-6 border-r border-gray-200"></div>
                <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSortBy("recent")}
                  className={cn(
                    "text-sm",
                    sortBy === "recent"
                      ? "font-medium text-pink-500"
                      : "text-gray-500 hover:text-gray-900",
                  )}
                >
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>Recent</span>
                  </div>
                </button>
                <button
                  onClick={() => setSortBy("popular")}
                  className={cn(
                    "text-sm",
                    sortBy === "popular"
                      ? "font-medium text-pink-500"
                      : "text-gray-500 hover:text-gray-900",
                  )}
                >
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3" />
                    <span>Popular</span>
                  </div>
                </button>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4">
                {mediaItems.map((item) => (
                  <div
                    key={item.id}
                    className="group relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50 transition-colors hover:border-pink-300"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={
                          item.thumbnail ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                        }
                        fill
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="w-full truncate text-sm font-medium text-white">
                          {item.title}
                        </div>
                      </div>
                    </div>
                    {item.stats && (
                      <div className="absolute right-2 top-2 flex items-center space-x-1 rounded-full bg-black/60 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                        <Eye className="h-3 w-3" />
                        <span>{item.stats.views}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {mediaItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center p-4 transition-colors hover:bg-gray-50"
                  >
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={
                          item.thumbnail ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                        }
                        fill
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4 min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="truncate text-sm font-medium text-gray-900">
                          {item.title}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {item.date}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center text-xs text-gray-500">
                        <span>{item.type}</span>
                        <span className="mx-1">•</span>
                        <span>{item.size}</span>
                      </div>
                      {item.stats && (
                        <div className="mt-2 flex items-center space-x-3 text-xs">
                          <div className="flex items-center space-x-1 text-gray-500">
                            <Eye className="h-3 w-3" />
                            <span>{item.stats.views}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-500">
                            <Heart className="h-3 w-3" />
                            <span>{item.stats.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-500">
                            <MessageCircle className="h-3 w-3" />
                            <span>{item.stats.comments}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
