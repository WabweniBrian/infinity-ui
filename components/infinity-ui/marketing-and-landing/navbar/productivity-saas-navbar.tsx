"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  User,
  Bell,
  Settings,
  BarChart2,
  Calendar,
  FileText,
  Users,
  MessageSquare,
  HelpCircle,
  Grid,
  Clock,
  Briefcase,
  Inbox,
  CheckSquare,
  PlusCircle,
  Zap,
  Layers,
} from "lucide-react";
import useMediaQuery from "@/hooks/use-media-query";

const ProductivitySaaSNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [notificationCount] = useState(3);
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navbarVariants = {
    initial: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
    },
    scrolled: {
      backgroundColor: "rgba(255, 255, 255, 0.98)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, height: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: { duration: 0.2 },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: { duration: 0.3 },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  const workspaceItems = [
    { name: "Dashboard", icon: <Grid className="h-5 w-5 text-blue-600" /> },
    { name: "Tasks", icon: <CheckSquare className="h-5 w-5 text-blue-600" /> },
    { name: "Calendar", icon: <Calendar className="h-5 w-5 text-blue-600" /> },
    { name: "Documents", icon: <FileText className="h-5 w-5 text-blue-600" /> },
    { name: "Projects", icon: <Briefcase className="h-5 w-5 text-blue-600" /> },
  ];

  const teamItems = [
    {
      name: "Team Chat",
      icon: <MessageSquare className="h-5 w-5 text-blue-600" />,
    },
    { name: "Meetings", icon: <Users className="h-5 w-5 text-blue-600" /> },
    {
      name: "Time Tracking",
      icon: <Clock className="h-5 w-5 text-blue-600" />,
    },
  ];

  return (
    <motion.nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${isScrolled ? "py-2" : "py-3"}`}
      initial="initial"
      animate={isScrolled ? "scrolled" : "initial"}
      variants={navbarVariants}
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <motion.div
              className="mr-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500"
              whileHover={{ scale: 1.05 }}
            >
              <Layers className="h-6 w-6 text-white" />
            </motion.div>
            <span className="bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-xl font-bold text-transparent">
              FlowSpace
            </span>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden items-center space-x-8 lg:flex">
              <div className="group relative" ref={dropdownRef}>
                <button
                  className="flex items-center text-gray-700 transition-colors hover:text-blue-600"
                  onClick={() => toggleDropdown("workspace")}
                >
                  <span className="mr-1 font-medium">Workspace</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${activeDropdown === "workspace" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === "workspace" && (
                    <motion.div
                      className="absolute left-0 z-50 mt-2 w-64 rounded-lg bg-white p-4 shadow-xl"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                    >
                      <div className="space-y-2">
                        {workspaceItems.map((item, index) => (
                          <a
                            key={index}
                            href="#"
                            className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                          >
                            {item.icon}
                            <span className="ml-2 text-gray-700">
                              {item.name}
                            </span>
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="group relative" ref={dropdownRef}>
                <button
                  className="flex items-center text-gray-700 transition-colors hover:text-blue-600"
                  onClick={() => toggleDropdown("team")}
                >
                  <span className="mr-1 font-medium">Team</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${activeDropdown === "team" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === "team" && (
                    <motion.div
                      className="absolute left-0 z-50 mt-2 w-64 rounded-lg bg-white p-4 shadow-xl"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                    >
                      <div className="space-y-2">
                        {teamItems.map((item, index) => (
                          <a
                            key={index}
                            href="#"
                            className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                          >
                            {item.icon}
                            <span className="ml-2 text-gray-700">
                              {item.name}
                            </span>
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="#"
                className="font-medium text-gray-700 transition-colors hover:text-blue-600"
              >
                Analytics
              </a>
              <a
                href="#"
                className="font-medium text-gray-700 transition-colors hover:text-blue-600"
              >
                Integrations
              </a>
            </div>
          )}

          {/* Right Side - Search, Notifications, User */}
          <div className="flex items-center space-x-1 md:space-x-4">
            {!isMobile && (
              <>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-40 rounded-full border border-gray-200 py-2 pl-9 pr-4 text-sm transition-all duration-300 focus:w-56 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
                <button className="flex items-center space-x-1 rounded-lg bg-blue-50 px-3 py-2 text-blue-600 transition-colors hover:bg-blue-100">
                  <PlusCircle className="h-4 w-4" />
                  <span className="font-medium">New</span>
                </button>
                <button className="relative rounded-full p-2 transition-colors hover:bg-gray-100">
                  <Bell className="h-5 w-5 text-gray-600" />
                  {notificationCount > 0 && (
                    <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                      {notificationCount}
                    </span>
                  )}
                </button>
              </>
            )}

            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center space-x-1 text-gray-700 transition-colors hover:text-blue-600"
                onClick={() => toggleDropdown("profile")}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-medium text-white">
                  JS
                </div>
                {!isMobile && (
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${activeDropdown === "profile" ? "rotate-180" : ""}`}
                  />
                )}
              </button>
              <AnimatePresence>
                {activeDropdown === "profile" && (
                  <motion.div
                    className="absolute right-0 z-50 mt-2 w-64 rounded-lg bg-white p-4 shadow-xl"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                  >
                    <div className="space-y-3">
                      <div className="border-b border-gray-100 pb-3">
                        <p className="font-medium text-gray-800">John Smith</p>
                        <p className="text-sm text-gray-500">
                          john.smith@example.com
                        </p>
                      </div>
                      <a
                        href="#"
                        className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                      >
                        <User className="mr-3 h-5 w-5 text-blue-600" />
                        <span>My Profile</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                      >
                        <Settings className="mr-3 h-5 w-5 text-blue-600" />
                        <span>Settings</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                      >
                        <HelpCircle className="mr-3 h-5 w-5 text-blue-600" />
                        <span>Help & Support</span>
                      </a>
                      <div className="mt-2 border-t border-gray-100 pt-2">
                        <a
                          href="#"
                          className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                        >
                          <Zap className="mr-3 h-5 w-5 text-blue-600" />
                          <span>Upgrade Plan</span>
                        </a>
                        <a
                          href="#"
                          className="flex items-center rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-50"
                        >
                          <span>Sign Out</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {isMobile && (
              <button
                className="rounded-md p-2 transition-colors hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 top-20 z-40 overflow-y-auto bg-white px-4 pb-4 pt-4 sm:mt-8"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="flex flex-col space-y-4">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 py-3">
                <a href="#" className="flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-gray-600" />
                  <span className="font-medium">Notifications</span>
                  {notificationCount > 0 && (
                    <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                      {notificationCount}
                    </span>
                  )}
                </a>
                <a href="#" className="flex items-center">
                  <Inbox className="mr-2 h-5 w-5 text-gray-600" />
                  <span className="font-medium">Inbox</span>
                </a>
              </div>

              <div className="border-b border-gray-100 pb-4">
                <button
                  className="flex w-full items-center justify-between py-3 font-medium"
                  onClick={() => toggleDropdown("mobile-workspace")}
                >
                  <span>Workspace</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${activeDropdown === "mobile-workspace" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === "mobile-workspace" && (
                    <motion.div
                      className="mt-2 space-y-3 pl-4"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                    >
                      {workspaceItems.map((item, index) => (
                        <a
                          key={index}
                          href="#"
                          className="flex items-center py-2"
                        >
                          {item.icon}
                          <span className="ml-2">{item.name}</span>
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="border-b border-gray-100 pb-4">
                <button
                  className="flex w-full items-center justify-between py-3 font-medium"
                  onClick={() => toggleDropdown("mobile-team")}
                >
                  <span>Team</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${activeDropdown === "mobile-team" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === "mobile-team" && (
                    <motion.div
                      className="mt-2 space-y-3 pl-4"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                    >
                      {teamItems.map((item, index) => (
                        <a
                          key={index}
                          href="#"
                          className="flex items-center py-2"
                        >
                          {item.icon}
                          <span className="ml-2">{item.name}</span>
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="#"
                className="flex items-center border-b border-gray-100 py-3"
              >
                <BarChart2 className="mr-2 h-5 w-5 text-blue-600" />
                <span className="font-medium">Analytics</span>
              </a>

              <a
                href="#"
                className="flex items-center border-b border-gray-100 py-3"
              >
                <Grid className="mr-2 h-5 w-5 text-blue-600" />
                <span className="font-medium">Integrations</span>
              </a>

              <div className="pt-4">
                <button className="flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-50 px-4 py-3 font-medium text-blue-600 transition-colors hover:bg-blue-100">
                  <PlusCircle className="h-5 w-5" />
                  <span>Create New</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default ProductivitySaaSNavbar;
