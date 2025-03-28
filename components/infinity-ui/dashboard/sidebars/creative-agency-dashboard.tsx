"use client";

import useMediaQuery from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  Bell,
  Briefcase,
  Calendar,
  Clock,
  FileText,
  ImageIcon,
  Layers,
  Menu,
  MessageSquare,
  Moon,
  Palette,
  PenTool,
  Plus,
  Search,
  Sun,
  User,
  Users,
  X,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type NavItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  active?: boolean;
  color: string;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

export default function CreativeAgencyDashboardSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [activeTab, setActiveTab] = useState("projects");
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Handle clicks outside sidebar to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !isDesktop
      ) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDesktop]);

  // Toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const navSections: NavSection[] = [
    {
      title: "Projects",
      items: [
        {
          name: "Dashboard",
          href: "#",
          icon: <Layers className="h-5 w-5" />,
          active: activeItem === "dashboard",
          color: "from-purple-500 to-indigo-500",
        },
        {
          name: "Active Projects",
          href: "#",
          icon: <Briefcase className="h-5 w-5" />,
          badge: "12",
          active: activeItem === "active-projects",
          color: "from-blue-500 to-cyan-500",
        },
        {
          name: "Design Files",
          href: "#",
          icon: <PenTool className="h-5 w-5" />,
          active: activeItem === "design-files",
          color: "from-pink-500 to-rose-500",
        },
        {
          name: "Media Library",
          href: "#",
          icon: <ImageIcon className="h-5 w-5" />,
          active: activeItem === "media-library",
          color: "from-amber-500 to-orange-500",
        },
      ],
    },
    {
      title: "Team",
      items: [
        {
          name: "Members",
          href: "#",
          icon: <Users className="h-5 w-5" />,
          active: activeItem === "members",
          color: "from-emerald-500 to-green-500",
        },
        {
          name: "Messages",
          href: "#",
          icon: <MessageSquare className="h-5 w-5" />,
          badge: "5",
          active: activeItem === "messages",
          color: "from-violet-500 to-purple-500",
        },
        {
          name: "Calendar",
          href: "#",
          icon: <Calendar className="h-5 w-5" />,
          active: activeItem === "calendar",
          color: "from-red-500 to-pink-500",
        },
        {
          name: "Time Tracking",
          href: "#",
          icon: <Clock className="h-5 w-5" />,
          active: activeItem === "time-tracking",
          color: "from-blue-500 to-indigo-500",
        },
      ],
    },
    {
      title: "Resources",
      items: [
        {
          name: "Documents",
          href: "#",
          icon: <FileText className="h-5 w-5" />,
          active: activeItem === "documents",
          color: "from-teal-500 to-emerald-500",
        },
        {
          name: "Inspiration",
          href: "#",
          icon: <Zap className="h-5 w-5" />,
          badge: "New",
          active: activeItem === "inspiration",
          color: "from-yellow-500 to-amber-500",
        },
        {
          name: "Awards",
          href: "#",
          icon: <Award className="h-5 w-5" />,
          active: activeItem === "awards",
          color: "from-fuchsia-500 to-purple-500",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 transition-colors duration-200 dark:from-gray-900 dark:to-gray-800">
      {/* Mobile header */}
      <div className="fixed left-0 right-0 top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white/70 px-4 py-3 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/70 md:hidden">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
            <Palette className="h-4 w-4 text-white" />
          </div>
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-xl font-bold text-transparent dark:from-purple-400 dark:to-pink-400">
            Artistry
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-pink-500"></span>
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
            <User className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black md:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {(isMobileOpen || isDesktop) && (
          <motion.div
            ref={sidebarRef}
            initial={isDesktop ? false : { x: -320 }}
            animate={{ x: 0 }}
            exit={isDesktop ? undefined : { x: -280 }}
            transition={{ type: "spring", damping: 25 }}
            className={cn(
              "fixed bottom-0 left-0 top-0 z-40 flex w-72 flex-col",
              "border-r border-gray-200 bg-white/60 backdrop-blur-2xl dark:border-gray-800 dark:bg-gray-900/60",
              "shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(0,0,0,0.2)]",
            )}
          >
            {/* Sidebar header */}
            <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6 dark:border-gray-800">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                  <Palette className="h-4 w-4 text-white" />
                </div>
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-xl font-bold text-transparent dark:from-purple-400 dark:to-pink-400">
                  Artistry
                </span>
              </div>

              {!isDesktop && (
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* User Profile */}
            <div className="p-6">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                    <Image
                      src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=48&width=48"
                      alt="User"
                      fill
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-gray-900"></div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Alex Morgan
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Creative Director
                  </p>
                </div>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="ml-auto rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                >
                  {isDarkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              </div>

              <div className="mt-6 flex">
                <button className="flex flex-1 items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-200 hover:from-purple-700 hover:to-pink-700 hover:shadow-lg">
                  <Plus className="h-4 w-4" />
                  <span>New Project</span>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-4 px-4">
              <div className="flex rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
                <button
                  onClick={() => setActiveTab("projects")}
                  className={cn(
                    "flex-1 rounded-lg py-2 text-sm font-medium transition-all duration-200",
                    activeTab === "projects"
                      ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300",
                  )}
                >
                  Projects
                </button>
                <button
                  onClick={() => setActiveTab("clients")}
                  className={cn(
                    "flex-1 rounded-lg py-2 text-sm font-medium transition-all duration-200",
                    activeTab === "clients"
                      ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300",
                  )}
                >
                  Clients
                </button>
                <button
                  onClick={() => setActiveTab("team")}
                  className={cn(
                    "flex-1 rounded-lg py-2 text-sm font-medium transition-all duration-200",
                    activeTab === "team"
                      ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300",
                  )}
                >
                  Team
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="mb-6 px-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full rounded-xl border-0 bg-gray-100 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-400"
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-4 py-2">
              {navSections.map((section) => (
                <div key={section.title} className="mb-6">
                  <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {section.title}
                  </h3>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={() => setActiveItem(item.name.toLowerCase())}
                          className={cn(
                            "group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200",
                            item.active
                              ? "bg-gradient-to-r from-purple-50 to-pink-50 text-gray-900 dark:from-purple-900/20 dark:to-pink-900/20 dark:text-white"
                              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white",
                          )}
                        >
                          <div className="flex items-center">
                            <div
                              className={cn(
                                "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br",
                                item.color,
                                item.active
                                  ? "opacity-100"
                                  : "opacity-70 group-hover:opacity-100",
                              )}
                            >
                              <div className="text-white">{item.icon}</div>
                            </div>
                            <span className="ml-3">{item.name}</span>
                          </div>

                          {item.badge && (
                            <span
                              className={cn(
                                "ml-auto rounded-full px-2 py-0.5 text-xs",
                                typeof item.badge === "number" ||
                                  !isNaN(Number(item.badge))
                                  ? "bg-purple-100 font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                                  : "bg-pink-100 font-medium text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 dark:border-gray-800">
              <div className="rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 dark:from-purple-500/20 dark:to-pink-500/20">
                <h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Premium Plan
                </h4>
                <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">
                  Upgrade to access all features and get unlimited projects.
                </p>
                <button className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-2 text-xs font-medium text-white shadow-sm transition-all duration-200 hover:from-purple-700 hover:to-pink-700">
                  Upgrade Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div
        className={cn(
          "pt-16 transition-all duration-300 md:pt-0",
          isDesktop && "md:ml-72",
        )}
      >
        <div className="p-6">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-gray-200 bg-white/60 p-6 shadow-[0_0_15px_rgba(0,0,0,0.05)] backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/60 dark:shadow-[0_0_15px_rgba(0,0,0,0.2)]">
              <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Creative Agency Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Welcome to your creative workspace. Manage projects, team
                members, and resources all in one place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
