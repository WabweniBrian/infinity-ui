"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu,
  X,
  ChevronRight,
  Home,
  BarChart2,
  Users,
  Settings,
  HelpCircle,
  Bell,
  Search,
  User,
  Calendar,
  FileText,
  MessageSquare,
  Moon,
  Sun,
  Briefcase,
  CreditCard,
  ShoppingBag,
} from "lucide-react"
import type { JSX } from "react"

type NavItem = {
  name: string
  icon: JSX.Element
  href: string
  current?: boolean
  children?: { name: string; href: string }[]
}

const DashboardSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const pathname = usePathname()

  // Close sidebar on route change on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true)
      } else {
        setIsSidebarOpen(false)
      }
    }

    // Set initial state
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false)
    }
  }, [pathname])

  // Toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const toggleExpanded = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName) ? prev.filter((item) => item !== itemName) : [...prev, itemName],
    )
  }

  const isExpanded = (itemName: string) => expandedItems.includes(itemName)

  const navItems: NavItem[] = [
    {
      name: "Dashboard",
      icon: <Home className="w-5 h-5" />,
      href: "#",
      current: true,
    },
    {
      name: "Analytics",
      icon: <BarChart2 className="w-5 h-5" />,
      href: "#",
      current: false,
      children: [
        { name: "Overview", href: "#" },
        { name: "Real-time", href: "#" },
        { name: "Reports", href: "#" },
      ],
    },
    {
      name: "Team",
      icon: <Users className="w-5 h-5" />,
      href: "#",
      current: false,
      children: [
        { name: "Overview", href: "#" },
        { name: "Members", href: "#" },
        { name: "Calendar", href: "#" },
        { name: "Settings", href: "#" },
      ],
    },
    {
      name: "Calendar",
      icon: <Calendar className="w-5 h-5" />,
      href: "#",
      current: false,
    },
    {
      name: "Documents",
      icon: <FileText className="w-5 h-5" />,
      href: "#",
      current: false,
      children: [
        { name: "All Documents", href: "#" },
        { name: "Shared", href: "#" },
        { name: "Archived", href: "#" },
      ],
    },
    {
      name: "Messages",
      icon: <MessageSquare className="w-5 h-5" />,
      href: "#",
      current: false,
    },
    {
      name: "Projects",
      icon: <Briefcase className="w-5 h-5" />,
      href: "#",
      current: false,
    },
    {
      name: "Finances",
      icon: <CreditCard className="w-5 h-5" />,
      href: "#",
      current: false,
      children: [
        { name: "Overview", href: "#" },
        { name: "Transactions", href: "#" },
        { name: "Invoices", href: "#" },
        { name: "Payments", href: "#" },
      ],
    },
    {
      name: "Orders",
      icon: <ShoppingBag className="w-5 h-5" />,
      href: "#",
      current: false,
    },
    {
      name: "Settings",
      icon: <Settings className="w-5 h-5" />,
      href: "#",
      current: false,
      children: [
        { name: "Profile", href: "#" },
        { name: "Account", href: "#" },
        { name: "Security", href: "#" },
        { name: "Notifications", href: "#" },
      ],
    },
    {
      name: "Help",
      icon: <HelpCircle className="w-5 h-5" />,
      href: "#",
      current: false,
    },
  ]

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
  }

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
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        {/* Mobile menu button */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 shadow-sm px-4 py-3 flex items-center justify-between transition-colors duration-200">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Open sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex-1 flex justify-center">
            <span className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
              Infinity
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
              <Bell className="w-5 h-5" />
            </button>
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center transition-colors duration-200">
              <User className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-colors duration-200" />
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
              className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
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
              className="fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-50 flex flex-col transition-colors duration-200"
            >
              <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between transition-colors duration-200">
                <Link href="/" className="flex items-center">
                  <span className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
                    Infinity
                  </span>
                </Link>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                  >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="lg:hidden p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    aria-label="Close sidebar"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Search */}
              <div className="p-4 border-b dark:border-gray-700 transition-colors duration-200">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400 dark:text-gray-500 transition-colors duration-200" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.children ? (
                      <div>
                        <button
                          onClick={() => toggleExpanded(item.name)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                            item.current
                              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                              : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          <div className="flex items-center">
                            <span className="mr-3">{item.icon}</span>
                            {item.name}
                          </div>
                          <ChevronRight
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded(item.name) ? "rotate-90" : ""
                            }`}
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
                                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                >
                                  {child.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                          item.current
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                            : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* User profile */}
              <div className="p-4 border-t dark:border-gray-700 transition-colors duration-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center transition-colors duration-200">
                      <User className="w-5 h-5 text-blue-600 dark:text-blue-300 transition-colors duration-200" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
                      John Doe
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 transition-colors duration-200">
                      john@example.com
                    </p>
                  </div>
                  <button className="ml-auto p-1 rounded-full text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main content */}
        <div className={`transition-all duration-300 ${isSidebarOpen ? "lg:ml-64" : ""}`}>
          <div className="lg:py-6 lg:px-8 pt-16 lg:pt-0">
            {/* Page content would go here */}
            <div className="max-w-7xl mx-auto">
              {/* This is just a placeholder for demonstration */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 min-h-[calc(100vh-2rem)] transition-colors duration-200">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-200">
                  Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
                  This is a dashboard sidebar example with dark mode support. On desktop, the sidebar is always visible.
                  On mobile, it can be toggled with the menu button.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardSidebar

