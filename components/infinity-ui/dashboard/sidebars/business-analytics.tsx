"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LayoutGrid,
  BarChart2,
  Users,
  Search,
  Menu,
  X,
  Settings,
  LogOut,
  ChevronRight,
  MessageSquare,
  Calendar,
  Clock,
  HelpCircle,
  Bell,
  FileText,
  Briefcase,
  PieChart,
  Sun,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import useMediaQuery from "@/hooks/use-media-query";
import Image from "next/image";

type NavItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
  active?: boolean;
};

export default function BusinessAnalyticsSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeItem, setActiveItem] = useState("business-overview");
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

  // Set initial collapsed state based on screen size
  useEffect(() => {
    setIsCollapsed(!isDesktop ? false : window.innerWidth < 1280);
  }, [isDesktop]);

  // Toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const mainNavItems: NavItem[] = [
    {
      name: "Business Overview",
      href: "#",
      icon: <LayoutGrid className="h-5 w-5" />,
      active: activeItem === "business-overview",
    },
    {
      name: "Analytics",
      href: "#",
      icon: <BarChart2 className="h-5 w-5" />,
      active: activeItem === "analytics",
    },
    {
      name: "Business Explore",
      href: "#",
      icon: <Briefcase className="h-5 w-5" />,
      active: activeItem === "business-explore",
    },
    {
      name: "Customers",
      href: "#",
      icon: <Users className="h-5 w-5" />,
      active: activeItem === "customers",
    },
  ];

  const settingsNavItems: NavItem[] = [
    {
      name: "Messages",
      href: "#",
      icon: <MessageSquare className="h-5 w-5" />,
      active: activeItem === "messages",
    },
    {
      name: "Customer Reviews",
      href: "#",
      icon: <FileText className="h-5 w-5" />,
      active: activeItem === "customer-reviews",
    },
    {
      name: "Settings",
      href: "#",
      icon: <Settings className="h-5 w-5" />,
      active: activeItem === "settings",
    },
    {
      name: "Help Centre",
      href: "#",
      icon: <HelpCircle className="h-5 w-5" />,
      active: activeItem === "help-centre",
    },
  ];

  // Current date for the calendar
  const currentDate = new Date();
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();

  // Generate calendar days
  const calendarDays = [];
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  // Upcoming events
  const upcomingEvents = [
    {
      title: "Business Sprint",
      time: "10:35 AM - 11:30 AM",
      date: "Today",
      tags: ["Business", "Meeting"],
    },
    {
      title: "Marketing Strategy",
      time: "2:00 PM - 3:30 PM",
      date: "Today",
      tags: ["Marketing", "Planning"],
    },
    {
      title: "Product Review",
      time: "9:00 AM - 10:00 AM",
      date: "Tomorrow",
      tags: ["Product", "Review"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 transition-colors duration-200 dark:bg-gray-900">
      {/* Mobile header */}
      <div className="fixed left-0 right-0 top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800 md:hidden">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="flex items-center space-x-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-500">
            <span className="text-sm font-bold text-black">D</span>
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Decko
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-lime-500"></span>
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
            <Image
              src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=32&width=32"
              alt="User"
              width={30}
              height={30}
              className="h-full w-full rounded-full object-cover"
            />
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
            initial={isDesktop ? undefined : { x: -280 }}
            animate={{ x: 0 }}
            exit={isDesktop ? undefined : { x: -280 }}
            transition={{ type: "spring", damping: 25 }}
            className={cn(
              "fixed bottom-0 left-0 top-0 z-40 flex flex-col",
              isCollapsed ? "w-20" : "w-64",
              "bg-black text-white transition-all duration-300",
              !isDesktop && "w-64",
            )}
          >
            {/* Sidebar header */}
            <div className="flex h-16 items-center justify-between px-4">
              <AnimatePresence mode="wait">
                {!isCollapsed ? (
                  <motion.div
                    key="full-logo"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-500">
                      <span className="text-sm font-bold text-black">D</span>
                    </div>
                    <span className="text-xl font-bold text-white">Decko</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="icon-logo"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mx-auto"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-500">
                      <span className="text-sm font-bold text-black">D</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isDesktop && (
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="rounded-md p-1 text-gray-400 hover:text-gray-300"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Search */}
            {!isCollapsed && (
              <div className="px-4 py-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search here..."
                    className="w-full rounded-md border-0 bg-gray-800 py-2 pl-10 pr-4 text-sm text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-lime-500"
                  />
                </div>
              </div>
            )}

            {/* Main Navigation */}
            <div className="px-3 py-4">
              {!isCollapsed && (
                <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  MAIN MENU
                </h3>
              )}
              <ul className="space-y-1">
                {mainNavItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() =>
                        setActiveItem(
                          item.name.toLowerCase().replace(/\s+/g, "-"),
                        )
                      }
                      className={cn(
                        "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        item.active
                          ? "bg-lime-500 text-black"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white",
                      )}
                    >
                      <div className="flex-shrink-0">{item.icon}</div>

                      {(!isCollapsed || !isDesktop) && (
                        <span className="ml-3">{item.name}</span>
                      )}

                      {/* Tooltip for collapsed state */}
                      {isCollapsed && isDesktop && (
                        <div className="invisible absolute left-full ml-6 -translate-x-3 rounded-md bg-gray-900 px-2 py-1 text-sm text-white opacity-0 transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100">
                          {item.name}
                          <div className="absolute -left-1 top-1/2 -translate-y-1/2 transform border-4 border-transparent border-r-gray-900" />
                        </div>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Settings Navigation */}
            <div className="px-3 py-4">
              {!isCollapsed && (
                <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  SETTINGS
                </h3>
              )}
              <ul className="space-y-1">
                {settingsNavItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() =>
                        setActiveItem(
                          item.name.toLowerCase().replace(/\s+/g, "-"),
                        )
                      }
                      className={cn(
                        "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        item.active
                          ? "bg-lime-500 text-black"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white",
                      )}
                    >
                      <div className="flex-shrink-0">{item.icon}</div>

                      {(!isCollapsed || !isDesktop) && (
                        <span className="ml-3">{item.name}</span>
                      )}

                      {/* Tooltip for collapsed state */}
                      {isCollapsed && isDesktop && (
                        <div className="invisible absolute left-full ml-6 -translate-x-3 rounded-md bg-gray-900 px-2 py-1 text-sm text-white opacity-0 transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100">
                          {item.name}
                          <div className="absolute -left-1 top-1/2 -translate-y-1/2 transform border-4 border-transparent border-r-gray-900" />
                        </div>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Calendar and Upcoming Events (only visible when not collapsed) */}
            {!isCollapsed && (
              <div className="mt-auto px-4 py-4">
                <div className="mb-4 rounded-lg bg-gray-800 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">
                      {currentDate.toLocaleString("default", { month: "long" })}{" "}
                      {currentDate.getFullYear()}
                    </h3>
                    <div className="flex space-x-1">
                      <button className="rounded-md p-1 text-gray-400 hover:bg-gray-700 hover:text-white">
                        <ChevronRight className="h-4 w-4 rotate-180" />
                      </button>
                      <button className="rounded-md p-1 text-gray-400 hover:bg-gray-700 hover:text-white">
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-xs">
                    {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                      <div key={i} className="py-1 font-medium text-gray-500">
                        {day}
                      </div>
                    ))}

                    {calendarDays.map((day, i) => (
                      <div
                        key={i}
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-full",
                          day === currentDate.getDate()
                            ? "bg-lime-500 font-medium text-black"
                            : day
                              ? "cursor-pointer text-gray-300 hover:bg-gray-700"
                              : "",
                        )}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg bg-gray-800 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">
                      Upcoming Event
                    </h3>
                    <Clock className="h-4 w-4 text-gray-400" />
                  </div>

                  <div className="space-y-3">
                    {upcomingEvents.map((event, i) => (
                      <div key={i} className="rounded-md bg-gray-700 p-2">
                        <div className="flex items-start justify-between">
                          <h4 className="text-sm font-medium text-white">
                            {event.title}
                          </h4>
                          <span className="text-xs text-gray-400">
                            {event.date}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-gray-400">
                          {event.time}
                        </p>
                        <div className="mt-2 flex space-x-1">
                          {event.tags.map((tag, j) => (
                            <span
                              key={j}
                              className="rounded bg-gray-600 px-1.5 py-0.5 text-xs text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-auto border-t border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-9 w-9 flex-shrink-0 rounded-full bg-gray-700">
                    <Image
                      src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=36&width=36"
                      alt="User"
                      width={34}
                      height={34}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>

                  {(!isCollapsed || !isDesktop) && (
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">
                        Anthony Alverizko
                      </p>
                      <p className="text-xs text-gray-400">
                        anthony.alve@gmail.com
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex">
                  {(!isCollapsed || !isDesktop) && (
                    <button
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className="rounded-md p-1.5 text-gray-400 hover:bg-gray-800 hover:text-gray-300"
                    >
                      {isDarkMode ? (
                        <Sun className="h-5 w-5" />
                      ) : (
                        <Moon className="h-5 w-5" />
                      )}
                    </button>
                  )}

                  {isCollapsed && isDesktop ? (
                    <button
                      onClick={() => setIsCollapsed(false)}
                      className="rounded-md p-1.5 text-gray-400 hover:bg-gray-800 hover:text-gray-300"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => isDesktop && setIsCollapsed(true)}
                      className="rounded-md p-1.5 text-gray-400 hover:bg-gray-800 hover:text-gray-300"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div
        className={cn(
          "pt-16 transition-all duration-300 md:pt-0",
          isDesktop && (isCollapsed ? "md:ml-20" : "md:ml-64"),
        )}
      >
        <div className="p-6">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
              <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Hello, Anthony!
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Here&apos;s your overview of your business!
              </p>

              {/* Sample dashboard content */}
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total Customers
                      </p>
                      <h3 className="mt-1 text-2xl font-bold">21,978</h3>
                    </div>
                    <span className="text-xs font-medium text-green-500">
                      +15% from last month
                    </span>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Active Customers
                      </p>
                      <h3 className="mt-1 text-2xl font-bold">10,369</h3>
                    </div>
                    <span className="text-xs font-medium text-red-500">
                      -9% from last month
                    </span>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Profit Total
                      </p>
                      <h3 className="mt-1 text-2xl font-bold">$64,981.97</h3>
                    </div>
                    <span className="text-xs font-medium text-green-500">
                      +7.2% from last month
                    </span>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Expense Total
                      </p>
                      <h3 className="mt-1 text-2xl font-bold">$18,158.21</h3>
                    </div>
                    <span className="text-xs font-medium text-red-500">
                      -2% from last month
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
