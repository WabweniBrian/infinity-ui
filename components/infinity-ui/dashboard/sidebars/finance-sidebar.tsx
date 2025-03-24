"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronRight,
  Home,
  BarChart2,
  DollarSign,
  CreditCard,
  PieChart,
  TrendingUp,
  Settings,
  Bell,
  Search,
  User,
  LogOut,
  HelpCircle,
  FileText,
  Briefcase,
  Lock,
  Shield,
  AlertTriangle,
  ExternalLink,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  href: string;
  badge?: {
    text: string;
    color: string;
  };
  children?: { name: string; href: string }[];
};

const FinanceDashboardSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [tooltipInfo, setTooltipInfo] = useState<{
    visible: boolean;
    text: string;
    x: number;
    y: number;
  }>({
    visible: false,
    text: "",
    x: 0,
    y: 0,
  });
  const pathname = usePathname();
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
        setIsCollapsed(window.innerWidth < 1280);
      } else {
        setIsSidebarOpen(false);
        setIsCollapsed(false);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [pathname]);

  const toggleExpanded = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((item) => item !== itemName)
        : [...prev, itemName],
    );
  };

  const isExpanded = (itemName: string) => expandedItems.includes(itemName);

  const showTooltip = (text: string, e: React.MouseEvent) => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }

    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setTooltipInfo({
      visible: true,
      text,
      x: rect.right + 10,
      y: rect.top + rect.height / 2,
    });
  };

  const hideTooltip = () => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }

    tooltipTimeoutRef.current = setTimeout(() => {
      setTooltipInfo((prev) => ({ ...prev, visible: false }));
    }, 100);
  };

  const navItems: NavItem[] = [
    {
      name: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      href: "#",
    },
    {
      name: "Accounts",
      icon: <Briefcase className="h-5 w-5" />,
      href: "#",
      children: [
        { name: "Checking", href: "#" },
        { name: "Savings", href: "#" },
        { name: "Investment", href: "#" },
        { name: "Retirement", href: "#" },
      ],
    },
    {
      name: "Transactions",
      icon: <CreditCard className="h-5 w-5" />,
      href: "#",
      badge: {
        text: "New",
        color: "bg-green-500",
      },
    },
    {
      name: "Investments",
      icon: <TrendingUp className="h-5 w-5" />,
      href: "#",
      children: [
        { name: "Portfolio", href: "#" },
        { name: "Stock Watchlist", href: "#" },
        { name: "Crypto Assets", href: "#" },
        { name: "Real Estate", href: "#" },
      ],
    },
    {
      name: "Budget",
      icon: <PieChart className="h-5 w-5" />,
      href: "#",
    },
    {
      name: "Reports",
      icon: <BarChart2 className="h-5 w-5" />,
      href: "#",
      children: [
        { name: "Income", href: "#" },
        { name: "Expenses", href: "#" },
        { name: "Cash Flow", href: "#" },
        { name: "Tax", href: "#" },
      ],
    },
    {
      name: "Bills & Payments",
      icon: <DollarSign className="h-5 w-5" />,
      href: "#",
      badge: {
        text: "3",
        color: "bg-red-500",
      },
    },
    {
      name: "Documents",
      icon: <FileText className="h-5 w-5" />,
      href: "#",
    },
    {
      name: "Security",
      icon: <Shield className="h-5 w-5" />,
      href: "#",
    },
    {
      name: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "#",
    },
    {
      name: "Help & Support",
      icon: <HelpCircle className="h-5 w-5" />,
      href: "#",
    },
  ];

  // Sidebar variants for animation
  const sidebarVariants = {
    open: {
      x: 0,
      width: isCollapsed ? 80 : 280,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "-100%",
      width: 280,
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Mobile menu button */}
        <div className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between bg-white px-4 py-3 shadow-sm dark:bg-gray-800 lg:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
            aria-label="Open sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 justify-center">
            <span className="text-xl font-bold text-emerald-600 dark:text-emerald-500">
              FinTrack
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button className="rounded-full p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">
              <Bell className="h-5 w-5" />
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
              <User className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
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

        {/* Tooltip */}
        <AnimatePresence>
          {tooltipInfo.visible && isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="fixed z-50 rounded bg-gray-900 px-2 py-1 text-xs font-medium text-white shadow-lg"
              style={{
                left: `${tooltipInfo.x}px`,
                top: `${tooltipInfo.y}px`,
                transform: "translateY(-50%)",
              }}
            >
              {tooltipInfo.text}
            </motion.div>
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
              className={cn(
                "fixed bottom-0 left-0 top-0 z-50 flex flex-col bg-white shadow-lg dark:bg-gray-800",
                isCollapsed ? "w-20" : "w-72",
              )}
            >
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
                  {!isCollapsed && (
                    <Link href="/" className="flex items-center">
                      <DollarSign className="mr-2 h-6 w-6 text-emerald-600 dark:text-emerald-500" />
                      <span className="text-xl font-bold text-emerald-600 dark:text-emerald-500">
                        FinTrack
                      </span>
                    </Link>
                  )}
                  {isCollapsed && (
                    <div className="mx-auto">
                      <DollarSign className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
                    </div>
                  )}
                  <div className="flex items-center">
                    {!isCollapsed && window.innerWidth >= 1280 && (
                      <button
                        onClick={() => setIsCollapsed(true)}
                        className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    )}
                    {isCollapsed && window.innerWidth >= 1024 && (
                      <button
                        onClick={() => setIsCollapsed(false)}
                        className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      >
                        <ChevronRight className="h-5 w-5 rotate-180 transform" />
                      </button>
                    )}
                    <button
                      onClick={() => setIsSidebarOpen(false)}
                      className="ml-1 rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:hidden"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* User Profile */}
                <div
                  className={cn(
                    "border-b border-gray-200 p-4 dark:border-gray-700",
                    isCollapsed ? "flex justify-center" : "",
                  )}
                >
                  {!isCollapsed ? (
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
                          <User className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Alex Morgan
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          Premium Account
                        </p>
                      </div>
                      <button className="ml-auto rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-400">
                        <Lock className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900"
                      onMouseEnter={(e) => showTooltip("Alex Morgan", e)}
                      onMouseLeave={hideTooltip}
                    >
                      <User className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  )}
                </div>

                {/* Search */}
                {!isCollapsed && (
                  <div className="border-b border-gray-200 p-4 dark:border-gray-700">
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                      />
                    </div>
                  </div>
                )}

                {isCollapsed && (
                  <div className="flex justify-center border-b border-gray-200 p-4 dark:border-gray-700">
                    <button
                      className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      onMouseEnter={(e) => showTooltip("Search", e)}
                      onMouseLeave={hideTooltip}
                    >
                      <Search className="h-5 w-5" />
                    </button>
                  </div>
                )}

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4">
                  <div className="space-y-1 px-4">
                    {navItems.map((item) => (
                      <div key={item.name}>
                        {item.children ? (
                          <div>
                            {!isCollapsed ? (
                              <>
                                <button
                                  onClick={() => toggleExpanded(item.name)}
                                  className={cn(
                                    "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                    activeItem === item.name.toLowerCase()
                                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white",
                                  )}
                                >
                                  <div className="flex items-center">
                                    <span className="mr-3">{item.icon}</span>
                                    {item.name}
                                    {item.badge && (
                                      <span
                                        className={cn(
                                          "ml-2 rounded-full px-1.5 py-0.5 text-xs text-white",
                                          item.badge.color,
                                        )}
                                      >
                                        {item.badge.text}
                                      </span>
                                    )}
                                  </div>
                                  <ChevronRight
                                    className={cn(
                                      "h-4 w-4 transition-transform",
                                      isExpanded(item.name) ? "rotate-90" : "",
                                    )}
                                  />
                                </button>

                                <AnimatePresence>
                                  {isExpanded(item.name) && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="ml-8 mt-1 space-y-1"
                                    >
                                      {item.children.map((child) => (
                                        <Link
                                          key={child.name}
                                          href={child.href}
                                          className="block rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                        >
                                          {child.name}
                                        </Link>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </>
                            ) : (
                              <div
                                className="flex flex-col items-center py-2"
                                onMouseEnter={(e) => showTooltip(item.name, e)}
                                onMouseLeave={hideTooltip}
                              >
                                <button
                                  onClick={() =>
                                    setActiveItem(item.name.toLowerCase())
                                  }
                                  className={cn(
                                    "rounded-md p-2",
                                    activeItem === item.name.toLowerCase()
                                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white",
                                  )}
                                >
                                  {item.icon}
                                </button>
                                {item.badge && (
                                  <span
                                    className={cn(
                                      "mt-1 rounded-full px-1.5 py-0.5 text-xs text-white",
                                      item.badge.color,
                                    )}
                                  >
                                    {item.badge.text}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        ) : (
                          <>
                            {!isCollapsed ? (
                              <button
                                onClick={() =>
                                  setActiveItem(item.name.toLowerCase())
                                }
                                className={cn(
                                  "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                  activeItem === item.name.toLowerCase()
                                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white",
                                )}
                              >
                                <span className="mr-3">{item.icon}</span>
                                {item.name}
                                {item.badge && (
                                  <span
                                    className={cn(
                                      "ml-2 rounded-full px-1.5 py-0.5 text-xs text-white",
                                      item.badge.color,
                                    )}
                                  >
                                    {item.badge.text}
                                  </span>
                                )}
                              </button>
                            ) : (
                              <div
                                className="flex flex-col items-center py-2"
                                onMouseEnter={(e) => showTooltip(item.name, e)}
                                onMouseLeave={hideTooltip}
                              >
                                <button
                                  onClick={() =>
                                    setActiveItem(item.name.toLowerCase())
                                  }
                                  className={cn(
                                    "rounded-md p-2",
                                    activeItem === item.name.toLowerCase()
                                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white",
                                  )}
                                >
                                  {item.icon}
                                </button>
                                {item.badge && (
                                  <span
                                    className={cn(
                                      "mt-1 rounded-full px-1.5 py-0.5 text-xs text-white",
                                      item.badge.color,
                                    )}
                                  >
                                    {item.badge.text}
                                  </span>
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </nav>

                {/* Footer */}
                <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                  {!isCollapsed ? (
                    <button className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300">
                      <LogOut className="mr-3 h-5 w-5" />
                      Sign Out
                    </button>
                  ) : (
                    <div className="flex justify-center">
                      <button
                        className="rounded-md p-2 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                        onMouseEnter={(e) => showTooltip("Sign Out", e)}
                        onMouseLeave={hideTooltip}
                      >
                        <LogOut className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main content */}
        <div
          className={cn(
            "flex-1 pt-16 transition-all duration-300 lg:pt-0",
            isSidebarOpen && !isCollapsed && "lg:ml-72",
            isSidebarOpen && isCollapsed && "lg:ml-20",
          )}
        >
          <div className="p-6">
            <div className="mx-auto max-w-7xl">
              <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                <div className="mb-6 flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Financial Dashboard
                  </h1>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"></span>
                      <Bell className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
                      <User className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </div>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Total Balance
                      </h3>
                      <DollarSign className="h-5 w-5 text-emerald-500" />
                    </div>
                    <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                      $24,563.85
                    </p>
                    <div className="mt-1 flex items-center text-green-600 dark:text-green-400">
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                      <p className="text-xs">+2.5% from last month</p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Income
                      </h3>
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                      $8,942.00
                    </p>
                    <div className="mt-1 flex items-center text-green-600 dark:text-green-400">
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                      <p className="text-xs">+4.3% from last month</p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Expenses
                      </h3>
                      <TrendingUp className="h-5 w-5 rotate-180 transform text-red-500" />
                    </div>
                    <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                      $5,127.35
                    </p>
                    <div className="mt-1 flex items-center text-red-600 dark:text-red-400">
                      <ArrowDownRight className="mr-1 h-3 w-3" />
                      <p className="text-xs">+1.8% from last month</p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Investments
                      </h3>
                      <BarChart2 className="h-5 w-5 text-blue-500" />
                    </div>
                    <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                      $12,842.50
                    </p>
                    <div className="mt-1 flex items-center text-green-600 dark:text-green-400">
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                      <p className="text-xs">+6.2% from last month</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                  <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 lg:col-span-2">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Cash Flow
                      </h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <div className="mr-1 h-3 w-3 rounded-full bg-emerald-500"></div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Income
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-1 h-3 w-3 rounded-full bg-red-500"></div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Expenses
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex h-64 items-end justify-between px-2">
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map(
                        (month, index) => (
                          <div
                            key={index}
                            className="flex w-1/6 flex-col items-center space-y-1"
                          >
                            <div className="flex w-full items-end space-x-1">
                              <div
                                className="w-1/2 rounded-t-md bg-emerald-500"
                                style={{
                                  height: `${[120, 150, 100, 180, 140, 160][index]}px`,
                                }}
                              ></div>
                              <div
                                className="w-1/2 rounded-t-md bg-red-500"
                                style={{
                                  height: `${[80, 100, 90, 110, 95, 105][index]}px`,
                                }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {month}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                      Upcoming Bills
                    </h3>
                    <div className="space-y-3">
                      {[
                        {
                          name: "Mortgage",
                          amount: "$1,450.00",
                          date: "Jun 15",
                          icon: <Home className="h-4 w-4" />,
                          color: "text-blue-500",
                        },
                        {
                          name: "Car Loan",
                          amount: "$385.00",
                          date: "Jun 18",
                          icon: <CreditCard className="h-4 w-4" />,
                          color: "text-purple-500",
                        },
                        {
                          name: "Electricity",
                          amount: "$124.50",
                          date: "Jun 20",
                          icon: <AlertTriangle className="h-4 w-4" />,
                          color: "text-yellow-500",
                        },
                        {
                          name: "Internet",
                          amount: "$79.99",
                          date: "Jun 22",
                          icon: <ExternalLink className="h-4 w-4" />,
                          color: "text-green-500",
                        },
                        {
                          name: "Phone Bill",
                          amount: "$65.00",
                          date: "Jun 25",
                          icon: <Phone className="h-4 w-4" />,
                          color: "text-red-500",
                        },
                      ].map((bill, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-md p-2 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <div className="flex items-center">
                            <div
                              className={`rounded-md p-2 ${bill.color} mr-3 bg-opacity-10 dark:bg-opacity-20`}
                            >
                              {bill.icon}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {bill.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {bill.amount}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3 text-gray-400 dark:text-gray-500" />
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {bill.date}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                      Investment Portfolio
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          name: "Stocks",
                          allocation: 45,
                          value: "$5,779.13",
                          change: "+3.2%",
                          color: "bg-blue-500",
                        },
                        {
                          name: "Bonds",
                          allocation: 30,
                          value: "$3,852.75",
                          change: "+1.1%",
                          color: "bg-green-500",
                        },
                        {
                          name: "Real Estate",
                          allocation: 15,
                          value: "$1,926.38",
                          change: "+2.5%",
                          color: "bg-yellow-500",
                        },
                        {
                          name: "Crypto",
                          allocation: 10,
                          value: "$1,284.25",
                          change: "+8.7%",
                          color: "bg-purple-500",
                        },
                      ].map((asset, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {asset.name}
                            </span>
                            <div className="flex items-center">
                              <span className="mr-2 text-xs text-gray-500 dark:text-gray-400">
                                {asset.value}
                              </span>
                              <span className="text-xs text-green-600 dark:text-green-400">
                                {asset.change}
                              </span>
                            </div>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                            <div
                              className={`h-full ${asset.color}`}
                              style={{ width: `${asset.allocation}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {asset.allocation}% allocation
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                      Recent Transactions
                    </h3>
                    <div className="space-y-3">
                      {[
                        {
                          name: "Grocery Store",
                          amount: "-$124.85",
                          date: "Today, 2:34 PM",
                          category: "Food & Dining",
                        },
                        {
                          name: "Amazon.com",
                          amount: "-$67.99",
                          date: "Yesterday, 11:42 AM",
                          category: "Shopping",
                        },
                        {
                          name: "Salary Deposit",
                          amount: "+$3,450.00",
                          date: "Jun 1, 9:00 AM",
                          category: "Income",
                        },
                        {
                          name: "Electric Bill",
                          amount: "-$94.27",
                          date: "May 29, 4:15 PM",
                          category: "Utilities",
                        },
                        {
                          name: "Netflix",
                          amount: "-$14.99",
                          date: "May 27, 12:00 AM",
                          category: "Entertainment",
                        },
                      ].map((transaction, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-md p-2 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {transaction.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {transaction.category}
                            </p>
                          </div>
                          <div className="text-right">
                            <p
                              className={`text-sm font-medium ${transaction.amount.startsWith("+") ? "text-green-600 dark:text-green-400" : "text-gray-900 dark:text-white"}`}
                            >
                              {transaction.amount}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {transaction.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                      Financial Goals
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          name: "Emergency Fund",
                          target: "$15,000",
                          current: "$12,000",
                          progress: 80,
                          color: "bg-emerald-500",
                        },
                        {
                          name: "Vacation",
                          target: "$5,000",
                          current: "$2,750",
                          progress: 55,
                          color: "bg-blue-500",
                        },
                        {
                          name: "New Car",
                          target: "$30,000",
                          current: "$9,000",
                          progress: 30,
                          color: "bg-purple-500",
                        },
                        {
                          name: "Home Down Payment",
                          target: "$60,000",
                          current: "$15,000",
                          progress: 25,
                          color: "bg-yellow-500",
                        },
                      ].map((goal, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {goal.name}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {goal.current} of {goal.target}
                            </span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                            <div
                              className={`h-full ${goal.color}`}
                              style={{ width: `${goal.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {goal.progress}% completed
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboardSidebar;
