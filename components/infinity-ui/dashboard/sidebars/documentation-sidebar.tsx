"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  Menu,
  X,
  ChevronRight,
  Search,
  Book,
  Copy,
  ChevronDown,
  Moon,
  Sun,
  Github,
  Twitter,
  Slack,
  ArrowLeft,
  ArrowRight,
} from "lucide-react"

type DocSection = {
  id: string
  title: string
  items: DocItem[]
}

type DocItem = {
  id: string
  title: string
  href: string
  subitems?: { id: string; title: string; href: string }[]
}

const DocumentationSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>(["getting-started"])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState("v2.0.0")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Handle mobile sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true)
      } else {
        setIsSidebarOpen(false)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  // Mock search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    const timer = setTimeout(() => {
      // Mock search results
      const results = [
        {
          id: "result1",
          title: "Getting Started with Installation",
          path: "getting-started/installation",
          excerpt: "Learn how to install and set up the library in your project...",
        },
        {
          id: "result2",
          title: "API Reference - Authentication",
          path: "api-reference/authentication",
          excerpt: "Detailed documentation about authentication methods and security...",
        },
        {
          id: "result3",
          title: "Components - Button",
          path: "components/button",
          excerpt: "Explore the button component and its various properties...",
        },
      ].filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))

      setSearchResults(results)
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const isExpanded = (itemId: string) => expandedItems.includes(itemId)

  const handleSearchFocus = () => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(true)
    }
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setSearchQuery("")
      searchInputRef.current?.blur()
    }
  }

  const docSections: DocSection[] = [
    {
      id: "getting-started",
      title: "Getting Started",
      items: [
        { id: "introduction", title: "Introduction", href: "#" },
        { id: "installation", title: "Installation", href: "#" },
        { id: "quick-start", title: "Quick Start", href: "#" },
        { id: "configuration", title: "Configuration", href: "#" },
      ],
    },
    {
      id: "core-concepts",
      title: "Core Concepts",
      items: [
        { id: "architecture", title: "Architecture", href: "#" },
        { id: "data-flow", title: "Data Flow", href: "#" },
        { id: "state-management", title: "State Management", href: "#" },
        {
          id: "routing",
          title: "Routing",
          href: "#",
          subitems: [
            { id: "basic-routing", title: "Basic Routing", href: "#" },
            { id: "nested-routes", title: "Nested Routes", href: "#" },
            { id: "route-guards", title: "Route Guards", href: "#" },
          ],
        },
      ],
    },
    {
      id: "components",
      title: "Components",
      items: [
        { id: "buttons", title: "Buttons", href: "#" },
        { id: "forms", title: "Forms", href: "#" },
        { id: "modals", title: "Modals", href: "#" },
        { id: "navigation", title: "Navigation", href: "#" },
        { id: "tables", title: "Tables", href: "#" },
      ],
    },
    {
      id: "api-reference",
      title: "API Reference",
      items: [
        { id: "authentication", title: "Authentication", href: "#" },
        { id: "data-fetching", title: "Data Fetching", href: "#" },
        { id: "error-handling", title: "Error Handling", href: "#" },
        { id: "webhooks", title: "Webhooks", href: "#" },
      ],
    },
    {
      id: "guides",
      title: "Guides",
      items: [
        { id: "deployment", title: "Deployment", href: "#" },
        { id: "testing", title: "Testing", href: "#" },
        { id: "performance", title: "Performance", href: "#" },
        { id: "security", title: "Security", href: "#" },
      ],
    },
  ]

  const versions = [
    { value: "v2.0.0", label: "v2.0.0 (Latest)" },
    { value: "v1.5.0", label: "v1.5.0" },
    { value: "v1.0.0", label: "v1.0.0" },
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
        {/* Mobile header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 shadow-sm px-4 py-3 flex items-center justify-between transition-colors duration-200">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Open sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex-1 flex justify-center">
            <span className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-200">Docs</span>
          </div>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
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
              className="fixed top-0 left-0 bottom-0 w-80 bg-white dark:bg-gray-800 shadow-lg z-50 flex flex-col transition-colors duration-200"
            >
              <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between transition-colors duration-200">
                <Link href="/" className="flex items-center">
                  <Book className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2 transition-colors duration-200" />
                  <span className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
                    Documentation
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

              {/* Version Selector */}
              <div className="p-4 border-b dark:border-gray-700 transition-colors duration-200">
                <div className="relative">
                  <select
                    value={selectedVersion}
                    onChange={(e) => setSelectedVersion(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  >
                    {versions.map((version) => (
                      <option key={version.value} value={version.value}>
                        {version.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400 transition-colors duration-200" />
                  </div>
                </div>
              </div>

              {/* Search */}
              <div className="p-4 border-b dark:border-gray-700 transition-colors duration-200">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400 dark:text-gray-500 transition-colors duration-200" />
                  </div>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search documentation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={handleSearchFocus}
                    onKeyDown={handleSearchKeyDown}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <X className="h-4 w-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200" />
                    </button>
                  )}
                </div>

                {/* Search Results */}
                <AnimatePresence>
                  {searchQuery && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-2 bg-white dark:bg-gray-700 rounded-md shadow-lg border border-gray-200 dark:border-gray-600 overflow-hidden transition-colors duration-200"
                    >
                      {isSearching ? (
                        <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                          Searching...
                        </div>
                      ) : searchResults.length > 0 ? (
                        <div className="max-h-60 overflow-y-auto">
                          {searchResults.map((result) => (
                            <Link
                              key={result.id}
                              href={`#${result.path}`}
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                              onClick={() => setSearchQuery("")}
                            >
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white transition-colors duration-200">
                                {result.title}
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-200">
                                {result.excerpt}
                              </p>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                          No results found for &quot;{searchQuery}&quot;
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto p-4 space-y-6">
                {docSections.map((section) => (
                  <div key={section.id}>
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 transition-colors duration-200">
                      {section.title}
                    </h3>
                    <div className="space-y-1">
                      {section.items.map((item) => (
                        <div key={item.id}>
                          {item.subitems ? (
                            <div>
                              <button
                                onClick={() => toggleExpanded(item.id)}
                                className="flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <span>{item.title}</span>
                                <ChevronRight
                                  className={`w-4 h-4 transition-transform duration-200 ${
                                    isExpanded(item.id) ? "rotate-90" : ""
                                  }`}
                                />
                              </button>

                              <AnimatePresence>
                                {isExpanded(item.id) && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="ml-4 mt-1 space-y-1"
                                  >
                                    {item.subitems.map((subitem) => (
                                      <Link
                                        key={subitem.id}
                                        href={subitem.href}
                                        className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                      >
                                        {subitem.title}
                                      </Link>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ) : (
                            <Link
                              href={item.href}
                              className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              {item.title}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>

              {/* Footer */}
              <div className="p-4 border-t dark:border-gray-700 transition-colors duration-200">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <Link
                      href="#"
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
                    >
                      <Github className="w-5 h-5" />
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
                    >
                      <Twitter className="w-5 h-5" />
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
                    >
                      <Slack className="w-5 h-5" />
                    </Link>
                  </div>
                  <Link
                    href="#"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                  >
                    Feedback
                  </Link>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main content */}
        <div className={`transition-all duration-300 ${isSidebarOpen ? "lg:ml-80" : ""}`}>
          <div className="lg:py-6 lg:px-8 pt-16 lg:pt-0">
            {/* Page content would go here */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 min-h-[calc(100vh-2rem)] transition-colors duration-200">
                <div className="prose dark:prose-invert max-w-none transition-colors duration-200">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-200">
                    Introduction
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
                    Welcome to our documentation. This guide will help you get started with our platform and explore its
                    features.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 transition-colors duration-200">
                    What is our platform?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
                    Our platform is a comprehensive solution for building modern web applications. It provides a set of
                    tools and libraries that help you create robust, scalable, and maintainable applications.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 transition-colors duration-200">
                    Key Features
                  </h2>
                  <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2 transition-colors duration-200">
                    <li>Component-based architecture for reusable UI elements</li>
                    <li>State management solutions for complex applications</li>
                    <li>Routing capabilities for single-page applications</li>
                    <li>API integration tools for connecting to backend services</li>
                    <li>Performance optimization techniques for fast user experiences</li>
                  </ul>

                  <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-4 my-6 transition-colors duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white transition-colors duration-200">
                        Example Code
                      </h3>
                      <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto transition-colors duration-200">
                      <code>{`import { createApp } from 'our-platform'

const app = createApp({
  // Configuration options
  debug: process.env.NODE_ENV !== 'production',
  plugins: [/* your plugins */]
})

app.mount('#app')`}</code>
                    </pre>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 transition-colors duration-200">
                    Next Steps
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
                    Continue to the installation guide to set up our platform in your project and start building your
                    application.
                  </p>

                  <div className="flex justify-between items-center mt-12 pt-6 border-t dark:border-gray-700 transition-colors duration-200">
                    <span className="text-gray-500 dark:text-gray-400 transition-colors duration-200">
                      Last updated: March 15, 2023
                    </span>
                    <div className="flex space-x-4">
                      <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        <span className="text-sm">Previous</span>
                      </button>
                      <button className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">
                        <span className="text-sm">Next</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocumentationSidebar

