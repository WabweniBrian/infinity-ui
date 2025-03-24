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
  Users,
  Calendar,
  ClipboardList,
  Activity,
  PieChart,
  Settings,
  Bell,
  Search,
  User,
  LogOut,
  HelpCircle,
  Heart,
  Pill,
  Stethoscope,
  Thermometer,
  Clock,
  AlertCircle,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  href: string;
  badge?: {
    count: number;
    color: string;
  };
  children?: { name: string; href: string }[];
};

const HealthcareDashboardSidebar = () => {
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
      name: "Patients",
      icon: <Users className="h-5 w-5" />,
      href: "#",
      badge: {
        count: 5,
        color: "bg-blue-500",
      },
      children: [
        { name: "Patient List", href: "#" },
        { name: "Patient Records", href: "#" },
        { name: "Admissions", href: "#" },
        { name: "Discharge Summary", href: "#" },
      ],
    },
    {
      name: "Appointments",
      icon: <Calendar className="h-5 w-5" />,
      href: "#",
      badge: {
        count: 12,
        color: "bg-green-500",
      },
    },
    {
      name: "Medical Records",
      icon: <ClipboardList className="h-5 w-5" />,
      href: "#",
      children: [
        { name: "Lab Results", href: "#" },
        { name: "Prescriptions", href: "#" },
        { name: "Medical History", href: "#" },
        { name: "Imaging", href: "#" },
      ],
    },
    {
      name: "Monitoring",
      icon: <Activity className="h-5 w-5" />,
      href: "#",
    },
    {
      name: "Departments",
      icon: <Stethoscope className="h-5 w-5" />,
      href: "#",
      children: [
        { name: "Cardiology", href: "#" },
        { name: "Neurology", href: "#" },
        { name: "Pediatrics", href: "#" },
        { name: "Orthopedics", href: "#" },
        { name: "Oncology", href: "#" },
      ],
    },
    {
      name: "Pharmacy",
      icon: <Pill className="h-5 w-5" />,
      href: "#",
    },
    {
      name: "Analytics",
      icon: <PieChart className="h-5 w-5" />,
      href: "#",
    },
    {
      name: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "#",
    },
    {
      name: "Help",
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
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen bg-gray-50">
        {/* Mobile menu button */}
        <div className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between bg-white px-4 py-3 shadow-sm lg:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            aria-label="Open sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 justify-center">
            <span className="text-xl font-bold text-blue-600">MediCare</span>
          </div>

          <div className="flex items-center space-x-3">
            <button className="rounded-full p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
              <Bell className="h-5 w-5" />
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
              <User className="h-5 w-5 text-blue-600" />
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
                "fixed bottom-0 left-0 top-0 z-50 flex flex-col bg-white shadow-lg",
                isCollapsed ? "w-20" : "w-72",
              )}
            >
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b p-4">
                  {!isCollapsed && (
                    <Link href="/" className="flex items-center">
                      <Heart className="mr-2 h-6 w-6 text-red-500" />
                      <span className="text-xl font-bold text-blue-600">
                        MediCare
                      </span>
                    </Link>
                  )}
                  {isCollapsed && (
                    <div className="mx-auto">
                      <Heart className="h-8 w-8 text-red-500" />
                    </div>
                  )}
                  <div className="flex items-center">
                    {!isCollapsed && window.innerWidth >= 1280 && (
                      <button
                        onClick={() => setIsCollapsed(true)}
                        className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    )}
                    {isCollapsed && window.innerWidth >= 1024 && (
                      <button
                        onClick={() => setIsCollapsed(false)}
                        className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        <ChevronRight className="h-5 w-5 rotate-180 transform" />
                      </button>
                    )}
                    <button
                      onClick={() => setIsSidebarOpen(false)}
                      className="ml-1 rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 lg:hidden"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* User Profile */}
                <div
                  className={cn(
                    "border-b p-4",
                    isCollapsed ? "flex justify-center" : "",
                  )}
                >
                  {!isCollapsed ? (
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                          <User className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700">
                          Dr. Sarah Johnson
                        </p>
                        <p className="text-xs text-gray-500">Cardiologist</p>
                      </div>
                      <button className="ml-auto rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-100"
                      onMouseEnter={(e) => showTooltip("Dr. Sarah Johnson", e)}
                      onMouseLeave={hideTooltip}
                    >
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                  )}
                </div>

                {/* Search */}
                {!isCollapsed && (
                  <div className="border-b p-4">
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

                {isCollapsed && (
                  <div className="flex justify-center border-b p-4">
                    <button
                      className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
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
                                      ? "bg-blue-50 text-blue-700"
                                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
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
                                        {item.badge.count}
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
                                          className="block rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
                                      ? "bg-blue-50 text-blue-700"
                                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
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
                                    {item.badge.count}
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
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
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
                                    {item.badge.count}
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
                                      ? "bg-blue-50 text-blue-700"
                                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
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
                                    {item.badge.count}
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
                <div className="border-t p-4">
                  {!isCollapsed ? (
                    <button className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700">
                      <LogOut className="mr-3 h-5 w-5" />
                      Sign Out
                    </button>
                  ) : (
                    <div className="flex justify-center">
                      <button
                        className="rounded-md p-2 text-red-600 hover:bg-red-50 hover:text-red-700"
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
              <div className="rounded-lg bg-white p-6 shadow">
                <div className="mb-6 flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Healthcare Dashboard
                  </h1>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"></span>
                      <Bell className="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-lg bg-blue-50 p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-blue-700">
                        Total Patients
                      </h3>
                      <Users className="h-5 w-5 text-blue-500" />
                    </div>
                    <p className="mt-2 text-2xl font-bold text-gray-900">
                      1,248
                    </p>
                    <p className="mt-1 text-xs text-green-600">
                      +5.3% from last month
                    </p>
                  </div>

                  <div className="rounded-lg bg-green-50 p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-green-700">
                        Appointments Today
                      </h3>
                      <Calendar className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="mt-2 text-2xl font-bold text-gray-900">42</p>
                    <p className="mt-1 text-xs text-green-600">
                      +2.1% from yesterday
                    </p>
                  </div>

                  <div className="rounded-lg bg-purple-50 p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-purple-700">
                        Admitted Patients
                      </h3>
                      <Thermometer className="h-5 w-5 text-purple-500" />
                    </div>
                    <p className="mt-2 text-2xl font-bold text-gray-900">85</p>
                    <p className="mt-1 text-xs text-red-600">
                      -1.2% from last week
                    </p>
                  </div>

                  <div className="rounded-lg bg-orange-50 p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-orange-700">
                        Critical Cases
                      </h3>
                      <AlertCircle className="h-5 w-5 text-orange-500" />
                    </div>
                    <p className="mt-2 text-2xl font-bold text-gray-900">12</p>
                    <p className="mt-1 text-xs text-orange-600">
                      No change from yesterday
                    </p>
                  </div>
                </div>

                <div className="mb-6 rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-4 text-lg font-medium text-gray-900">
                    Patient Admissions (Last 7 Days)
                  </h3>
                  <div className="flex h-64 items-end justify-between px-2">
                    {[35, 42, 38, 45, 40, 48, 52].map((value, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className="w-8 rounded-t-md bg-blue-500"
                          style={{ height: `${value * 2}px` }}
                        ></div>
                        <span className="mt-1 text-xs text-gray-500">
                          {
                            ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][
                              index
                            ]
                          }
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div className="rounded-lg border border-gray-200 bg-white p-4">
                    <h3 className="mb-4 text-lg font-medium text-gray-900">
                      Recent Patients
                    </h3>
                    <div className="space-y-3">
                      {[
                        {
                          name: "Robert Johnson",
                          age: 45,
                          condition: "Hypertension",
                          time: "10:30 AM",
                        },
                        {
                          name: "Emily Davis",
                          age: 32,
                          condition: "Pregnancy Check-up",
                          time: "11:15 AM",
                        },
                        {
                          name: "Michael Smith",
                          age: 58,
                          condition: "Diabetes",
                          time: "12:00 PM",
                        },
                        {
                          name: "Sarah Wilson",
                          age: 27,
                          condition: "Allergies",
                          time: "1:30 PM",
                        },
                      ].map((patient, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-md p-2 hover:bg-gray-50"
                        >
                          <div className="flex items-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 font-medium text-gray-700">
                              {patient.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">
                                {patient.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {patient.age} yrs • {patient.condition}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {patient.time}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-white p-4">
                    <h3 className="mb-4 text-lg font-medium text-gray-900">
                      Department Status
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          name: "Emergency",
                          patients: 18,
                          capacity: 25,
                          color: "bg-yellow-500",
                        },
                        {
                          name: "ICU",
                          patients: 12,
                          capacity: 15,
                          color: "bg-red-500",
                        },
                        {
                          name: "Cardiology",
                          patients: 24,
                          capacity: 30,
                          color: "bg-blue-500",
                        },
                        {
                          name: "Pediatrics",
                          patients: 15,
                          capacity: 35,
                          color: "bg-green-500",
                        },
                      ].map((dept, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">
                              {dept.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {dept.patients}/{dept.capacity} beds
                            </span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                            <div
                              className={`h-full ${dept.color}`}
                              style={{
                                width: `${(dept.patients / dept.capacity) * 100}%`,
                              }}
                            ></div>
                          </div>
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

export default HealthcareDashboardSidebar;
