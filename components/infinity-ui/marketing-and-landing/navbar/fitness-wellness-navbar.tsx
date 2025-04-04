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
  Heart,
  Dumbbell,
  Apple,
  BarChart2,
  Users,
  Calendar,
  Clock,
  Award,
  Utensils,
  Brain,
  Moon,
  Flame,
} from "lucide-react";
import useMediaQuery from "@/hooks/use-media-query";

const FitnessWellnessNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
    },
  };

  const workoutCategories = [
    {
      name: "Strength Training",
      icon: <Dumbbell className="h-5 w-5 text-teal-600" />,
    },
    { name: "Cardio", icon: <Flame className="h-5 w-5 text-teal-600" /> },
    {
      name: "Yoga & Flexibility",
      icon: <Users className="h-5 w-5 text-teal-600" />,
    },
    { name: "HIIT", icon: <Clock className="h-5 w-5 text-teal-600" /> },
    { name: "Recovery", icon: <Moon className="h-5 w-5 text-teal-600" /> },
  ];

  const wellnessCategories = [
    { name: "Nutrition", icon: <Apple className="h-5 w-5 text-teal-600" /> },
    { name: "Meditation", icon: <Brain className="h-5 w-5 text-teal-600" /> },
    { name: "Sleep", icon: <Moon className="h-5 w-5 text-teal-600" /> },
    {
      name: "Meal Planning",
      icon: <Utensils className="h-5 w-5 text-teal-600" />,
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
              className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-emerald-400"
              whileHover={{ scale: 1.05 }}
              animate={pulseAnimation}
            >
              <Heart className="h-6 w-6 text-white" />
            </motion.div>
            <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-xl font-bold text-transparent">
              FitLife
            </span>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden items-center space-x-8 lg:flex">
              <div className="group relative" ref={dropdownRef}>
                <button
                  className="flex items-center text-gray-700 transition-colors hover:text-teal-600"
                  onClick={() => toggleDropdown("workouts")}
                >
                  <span className="mr-1 font-medium">Workouts</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${activeDropdown === "workouts" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === "workouts" && (
                    <motion.div
                      className="absolute left-0 z-50 mt-2 w-[600px] rounded-lg bg-white p-6 shadow-xl"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                    >
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="border-b border-gray-200 pb-2 font-bold text-gray-800">
                            Workout Categories
                          </h3>
                          <div className="space-y-3">
                            {workoutCategories.map((category, index) => (
                              <a
                                key={index}
                                href="#"
                                className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                              >
                                {category.icon}
                                <span className="ml-2 text-gray-700">
                                  {category.name}
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="border-b border-gray-200 pb-2 font-bold text-gray-800">
                            Featured Programs
                          </h3>
                          <div className="space-y-3">
                            <a
                              href="#"
                              className="block rounded-lg bg-gradient-to-r from-teal-50 to-emerald-50 p-3 transition-colors hover:from-teal-100 hover:to-emerald-100"
                            >
                              <div className="font-medium text-gray-800">
                                30-Day Strength Challenge
                              </div>
                              <div className="mt-1 text-xs text-gray-500">
                                Transform your body in just 30 days
                              </div>
                            </a>
                            <a
                              href="#"
                              className="block rounded-lg bg-gradient-to-r from-teal-50 to-emerald-50 p-3 transition-colors hover:from-teal-100 hover:to-emerald-100"
                            >
                              <div className="font-medium text-gray-800">
                                Yoga for Beginners
                              </div>
                              <div className="mt-1 text-xs text-gray-500">
                                Start your yoga journey with confidence
                              </div>
                            </a>
                            <a
                              href="#"
                              className="block rounded-lg bg-gradient-to-r from-teal-50 to-emerald-50 p-3 transition-colors hover:from-teal-100 hover:to-emerald-100"
                            >
                              <div className="font-medium text-gray-800">
                                HIIT Cardio Blast
                              </div>
                              <div className="mt-1 text-xs text-gray-500">
                                Maximize calorie burn in minimal time
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="group relative" ref={dropdownRef}>
                <button
                  className="flex items-center text-gray-700 transition-colors hover:text-teal-600"
                  onClick={() => toggleDropdown("wellness")}
                >
                  <span className="mr-1 font-medium">Wellness</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${activeDropdown === "wellness" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === "wellness" && (
                    <motion.div
                      className="absolute left-0 z-50 mt-2 w-64 rounded-lg bg-white p-4 shadow-xl"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                    >
                      <ul className="space-y-2">
                        {wellnessCategories.map((category, index) => (
                          <li key={index}>
                            <a
                              href="#"
                              className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                            >
                              {category.icon}
                              <span className="ml-2 text-gray-700">
                                {category.name}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="#"
                className="font-medium text-gray-700 transition-colors hover:text-teal-600"
              >
                Nutrition
              </a>
              <a
                href="#"
                className="font-medium text-gray-700 transition-colors hover:text-teal-600"
              >
                Community
              </a>
              <a
                href="#"
                className="font-medium text-gray-700 transition-colors hover:text-teal-600"
              >
                Coaches
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
                    placeholder="Search workouts..."
                    className="w-40 rounded-full border border-gray-200 py-2 pl-9 pr-4 text-sm transition-all duration-300 focus:w-56 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
                <button className="relative rounded-full p-2 transition-colors hover:bg-gray-100">
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-teal-500"></span>
                </button>
                <button className="rounded-full p-2 transition-colors hover:bg-gray-100">
                  <Calendar className="h-5 w-5 text-gray-600" />
                </button>
              </>
            )}

            <motion.button
              className="flex items-center space-x-2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 px-4 py-2 font-medium text-white"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">My Account</span>
            </motion.button>

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
            className="fixed inset-0 top-20 z-40 overflow-y-auto bg-white px-4 pb-4 pt-6 md:pt-2"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="flex flex-col space-y-4">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search workouts..."
                  className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 py-3">
                <a href="#" className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-gray-600" />
                  <span className="font-medium">My Schedule</span>
                </a>
                <a href="#" className="flex items-center">
                  <BarChart2 className="mr-2 h-5 w-5 text-gray-600" />
                  <span className="font-medium">Progress</span>
                </a>
              </div>

              <div className="border-b border-gray-100 pb-4">
                <button
                  className="flex w-full items-center justify-between py-3 font-medium"
                  onClick={() => toggleDropdown("mobile-workouts")}
                >
                  <span>Workouts</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${activeDropdown === "mobile-workouts" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === "mobile-workouts" && (
                    <motion.div
                      className="mt-2 space-y-3 pl-4"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                    >
                      {workoutCategories.map((category, index) => (
                        <a
                          key={index}
                          href="#"
                          className="flex items-center py-2"
                        >
                          {category.icon}
                          <span className="ml-2">{category.name}</span>
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="border-b border-gray-100 pb-4">
                <button
                  className="flex w-full items-center justify-between py-3 font-medium"
                  onClick={() => toggleDropdown("mobile-wellness")}
                >
                  <span>Wellness</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${activeDropdown === "mobile-wellness" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === "mobile-wellness" && (
                    <motion.div
                      className="mt-2 space-y-3 pl-4"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                    >
                      {wellnessCategories.map((category, index) => (
                        <a
                          key={index}
                          href="#"
                          className="flex items-center py-2"
                        >
                          {category.icon}
                          <span className="ml-2">{category.name}</span>
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
                <Apple className="mr-2 h-5 w-5 text-teal-600" />
                <span className="font-medium">Nutrition</span>
              </a>

              <a
                href="#"
                className="flex items-center border-b border-gray-100 py-3"
              >
                <Users className="mr-2 h-5 w-5 text-teal-600" />
                <span className="font-medium">Community</span>
              </a>

              <a
                href="#"
                className="flex items-center border-b border-gray-100 py-3"
              >
                <Award className="mr-2 h-5 w-5 text-teal-600" />
                <span className="font-medium">Coaches</span>
              </a>

              <div className="pt-4">
                <motion.button
                  className="flex w-full items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-400 px-4 py-3 font-medium text-white"
                  whileTap={{ scale: 0.98 }}
                >
                  <User className="h-5 w-5" />
                  <span>My Account</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default FitnessWellnessNavbar;
