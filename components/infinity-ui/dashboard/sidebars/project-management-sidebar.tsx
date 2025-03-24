"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  Menu,
  X,
  ChevronRight,
  Search,
  Plus,
  Calendar,
  CheckSquare,
  Check,
  MessageSquare,
  Users,
  Settings,
  HelpCircle,
  Bell,
  User,
  BarChart2,
  Clock,
  Star,
  Folder,
  MoreHorizontal,
  Filter,
  Moon,
  Sun,
  LogOut,
} from "lucide-react"

type Project = {
  id: string
  name: string
  color: string
  tasks: number
  progress: number
  members: number
  favorite?: boolean
}

type Task = {
  id: string
  title: string
  dueDate: string
  priority: "low" | "medium" | "high"
  completed: boolean
}

const ProjectManagementSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>(["projects", "favorites"])
  const [activeProject, setActiveProject] = useState<string | null>("project1")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "completed">("all")

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

  const toggleExpanded = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName) ? prev.filter((item) => item !== itemName) : [...prev, itemName],
    )
  }

  const isExpanded = (itemName: string) => expandedItems.includes(itemName)

  const toggleFavorite = (projectId: string) => {
    setProjects((prev) =>
      prev.map((project) => (project.id === projectId ? { ...project, favorite: !project.favorite } : project)),
    )
  }

  const toggleTaskStatus = (taskId: string) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const [projects, setProjects] = useState<Project[]>([
    {
      id: "project1",
      name: "Website Redesign",
      color: "bg-blue-500",
      tasks: 12,
      progress: 65,
      members: 4,
      favorite: true,
    },
    {
      id: "project2",
      name: "Mobile App Development",
      color: "bg-purple-500",
      tasks: 18,
      progress: 40,
      members: 6,
    },
    {
      id: "project3",
      name: "Marketing Campaign",
      color: "bg-green-500",
      tasks: 8,
      progress: 85,
      members: 3,
      favorite: true,
    },
    {
      id: "project4",
      name: "Product Launch",
      color: "bg-yellow-500",
      tasks: 15,
      progress: 25,
      members: 5,
    },
    {
      id: "project5",
      name: "Customer Research",
      color: "bg-red-500",
      tasks: 6,
      progress: 90,
      members: 2,
    },
  ])

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "task1",
      title: "Design homepage mockup",
      dueDate: "2023-04-15",
      priority: "high",
      completed: false,
    },
    {
      id: "task2",
      title: "Implement authentication",
      dueDate: "2023-04-18",
      priority: "medium",
      completed: true,
    },
    {
      id: "task3",
      title: "Create responsive layouts",
      dueDate: "2023-04-20",
      priority: "high",
      completed: false,
    },
    {
      id: "task4",
      title: "Write API documentation",
      dueDate: "2023-04-22",
      priority: "low",
      completed: false,
    },
    {
      id: "task5",
      title: "Set up analytics",
      dueDate: "2023-04-25",
      priority: "medium",
      completed: false,
    },
  ])

  const mainNavItems = [
    { id: "dashboard", name: "Dashboard", icon: <BarChart2 className="w-5 h-5" />, href: "#" },
    { id: "tasks", name: "My Tasks", icon: <CheckSquare className="w-5 h-5" />, href: "#" },
    { id: "calendar", name: "Calendar", icon: <Calendar className="w-5 h-5" />, href: "#" },
    { id: "messages", name: "Messages", icon: <MessageSquare className="w-5 h-5" />, href: "#" },
    { id: "team", name: "Team", icon: <Users className="w-5 h-5" />, href: "#" },
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

  // Task filter function
  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "all") return true
    if (filterStatus === "active") return !task.completed
    if (filterStatus === "completed") return task.completed
    return true
  })

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
            <span className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
              ProjectHub
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
              className="fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-gray-800 shadow-lg z-50 flex flex-col transition-colors duration-200"
            >
              <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between transition-colors duration-200">
                <Link href="/" className="flex items-center">
                  <span className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
                    ProjectHub
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

              {/* User Profile */}
              <div className="p-4 border-b dark:border-gray-700 transition-colors duration-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center transition-colors duration-200">
                      <User className="w-6 h-6 text-blue-600 dark:text-blue-300 transition-colors duration-200" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
                      John Doe
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 transition-colors duration-200">
                      Project Manager
                    </p>
                  </div>
                  <button className="ml-auto p-1 rounded-full text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200">
                    <MoreHorizontal className="w-4 h-4" />
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

              {/* Main Navigation */}
              <nav className="p-4 border-b dark:border-gray-700 transition-colors duration-200">
                <div className="space-y-1">
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.name}
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Projects Section */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 border-b dark:border-gray-700 transition-colors duration-200">
                  <button
                    onClick={() => toggleExpanded("projects")}
                    className="flex items-center justify-between w-full text-sm font-medium text-gray-900 dark:text-white mb-2 transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <Folder className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400 transition-colors duration-200" />
                      <span>Projects</span>
                    </div>
                    <div className="flex items-center">
                      <button className="p-1 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 mr-1 transition-colors duration-200">
                        <Plus className="w-4 h-4" />
                      </button>
                      <ChevronRight
                        className={`w-5 h-5 transition-transform duration-200 ${
                          isExpanded("projects") ? "rotate-90" : ""
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded("projects") && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-1"
                      >
                        {/* Favorites Section */}
                        <div className="mt-2 mb-1">
                          <button
                            onClick={() => toggleExpanded("favorites")}
                            className="flex items-center justify-between w-full px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
                          >
                            <span>Favorites</span>
                            <ChevronRight
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isExpanded("favorites") ? "rotate-90" : ""
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {isExpanded("favorites") && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-2 space-y-1 mt-1"
                              >
                                {projects
                                  .filter((project) => project.favorite)
                                  .map((project) => (
                                    <button
                                      key={project.id}
                                      onClick={() => setActiveProject(project.id)}
                                      className={`flex items-center justify-between w-full px-2 py-1.5 rounded-md text-sm ${
                                        activeProject === project.id
                                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                      } transition-colors duration-200`}
                                    >
                                      <div className="flex items-center">
                                        <div className={`w-2 h-2 rounded-full ${project.color} mr-2`}></div>
                                        <span>{project.name}</span>
                                      </div>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          toggleFavorite(project.id)
                                        }}
                                        className="text-yellow-400 hover:text-yellow-500 transition-colors duration-200"
                                      >
                                        <Star className="w-4 h-4 fill-current" />
                                      </button>
                                    </button>
                                  ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* All Projects */}
                        <div className="mt-2">
                          <div className="px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 transition-colors duration-200">
                            All Projects
                          </div>
                          <div className="space-y-1 mt-1">
                            {projects.map((project) => (
                              <button
                                key={project.id}
                                onClick={() => setActiveProject(project.id)}
                                className={`flex items-center justify-between w-full px-2 py-1.5 rounded-md text-sm ${
                                  activeProject === project.id
                                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                } transition-colors duration-200`}
                              >
                                <div className="flex items-center">
                                  <div className={`w-2 h-2 rounded-full ${project.color} mr-2`}></div>
                                  <span>{project.name}</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-xs text-gray-500 dark:text-gray-400 mr-2 transition-colors duration-200">
                                    {project.tasks}
                                  </span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      toggleFavorite(project.id)
                                    }}
                                    className={`${
                                      project.favorite
                                        ? "text-yellow-400 hover:text-yellow-500"
                                        : "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400"
                                    } transition-colors duration-200`}
                                  >
                                    <Star className={`w-4 h-4 ${project.favorite ? "fill-current" : ""}`} />
                                  </button>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t dark:border-gray-700 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <button className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                      <Settings className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                      <HelpCircle className="w-5 h-5" />
                    </button>
                  </div>
                  <button className="p-2 rounded-md text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main content */}
        <div className={`transition-all duration-300 ${isSidebarOpen ? "lg:ml-72" : ""}`}>
          <div className="lg:py-6 lg:px-8 pt-16 lg:pt-0">
            {/* Page content would go here */}
            <div className="max-w-7xl mx-auto">
              {/* Project Header */}
              {activeProject && (
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 mb-4 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${projects.find((p) => p.id === activeProject)?.color} mr-2`}
                      ></div>
                      <h1 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
                        {projects.find((p) => p.id === activeProject)?.name}
                      </h1>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                        <Users className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                        <BarChart2 className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 transition-colors duration-200">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{
                          width: `${projects.find((p) => p.id === activeProject)?.progress}%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">
                        Progress
                      </span>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
                        {projects.find((p) => p.id === activeProject)?.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Task Filters */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 mb-4 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-200">
                      Tasks
                    </h2>
                    <div className="ml-4 flex space-x-2">
                      <button
                        onClick={() => setFilterStatus("all")}
                        className={`px-3 py-1 text-sm rounded-md ${
                          filterStatus === "all"
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        } transition-colors duration-200`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setFilterStatus("active")}
                        className={`px-3 py-1 text-sm rounded-md ${
                          filterStatus === "active"
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        } transition-colors duration-200`}
                      >
                        Active
                      </button>
                      <button
                        onClick={() => setFilterStatus("completed")}
                        className={`px-3 py-1 text-sm rounded-md ${
                          filterStatus === "completed"
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        } transition-colors duration-200`}
                      >
                        Completed
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                      <Filter className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-md text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Task List */}
                <div className="mt-4 space-y-2">
                  {filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-colors duration-200"
                    >
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleTaskStatus(task.id)}
                          className={`flex-shrink-0 w-5 h-5 rounded border ${
                            task.completed
                              ? "bg-blue-500 border-blue-500 flex items-center justify-center"
                              : "border-gray-300 dark:border-gray-600"
                          } mr-3 transition-colors duration-200`}
                        >
                          {task.completed && <Check className="w-3 h-3 text-white" />}
                        </button>
                        <div>
                          <p
                            className={`text-sm font-medium ${
                              task.completed
                                ? "text-gray-500 dark:text-gray-400 line-through"
                                : "text-gray-900 dark:text-white"
                            } transition-colors duration-200`}
                          >
                            {task.title}
                          </p>
                          <div className="flex items-center mt-1">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                task.priority === "high"
                                  ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                                  : task.priority === "medium"
                                    ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                                    : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                              } mr-2 transition-colors duration-200`}
                            >
                              {task.priority}
                            </span>
                            <span className="flex items-center text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">
                              <Clock className="w-3 h-3 mr-1" />
                              Due {task.dueDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="p-1 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectManagementSidebar

