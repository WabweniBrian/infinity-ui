"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Bell,
  User,
  Bookmark,
  Globe,
  Clock,
  TrendingUp,
  Newspaper,
  Radio,
  Tv,
  Film,
  Music,
  BookOpen,
  Award,
  Zap,
} from "lucide-react";
import useMediaQuery from "@/hooks/use-media-query";

const NewsPortalNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [currentDate] = useState(
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  );

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
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
    },
    scrolled: {
      backgroundColor: "rgba(255, 255, 255, 0.98)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    },
  };

  const megaMenuVariants = {
    hidden: { opacity: 0, y: -5, height: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: { duration: 0.3 },
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

  const breakingNews = [
    "Global climate summit reaches historic agreement",
    "Tech giant unveils revolutionary AI assistant",
    "Major economic reforms announced in federal budget",
  ];

  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % breakingNews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [breakingNews.length]);

  return (
    <motion.nav
      className="fixed left-0 right-0 top-0 z-50 pb-2 transition-all duration-300"
      initial="initial"
      animate={isScrolled ? "scrolled" : "initial"}
      variants={navbarVariants}
    >
      {/* Top Bar */}
      <div className="bg-red-700 py-1 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs md:text-sm">
              <Clock className="mr-1 h-3 w-3" />
              <span>{currentDate}</span>
            </div>

            {!isMobile && (
              <div className="flex h-6 items-center overflow-hidden">
                <Zap className="mr-2 h-4 w-4 flex-shrink-0 text-yellow-300" />
                <div className="relative w-64 md:w-[400px]">
                  {breakingNews.map((news, index) => (
                    <motion.div
                      key={index}
                      className="absolute -top-3 whitespace-nowrap font-medium"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{
                        opacity: currentNewsIndex === index ? 1 : 0,
                        x: currentNewsIndex === index ? 0 : -50,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      BREAKING: {news}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="text-xs transition-colors hover:text-red-200 md:text-sm"
              >
                Subscribe
              </a>
              <a
                href="#"
                className="text-xs transition-colors hover:text-red-200 md:text-sm"
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between border-b border-gray-200 py-3">
          {/* Logo */}
          <div className="flex items-center">
            <motion.div
              className="mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-r from-red-600 to-red-800"
              whileHover={{ scale: 1.05 }}
            >
              <Newspaper className="h-6 w-6 text-white" />
            </motion.div>
            <span className="text-2xl font-bold">NewsHub</span>
          </div>

          {/* Search Bar - Center */}
          {!isMobile && (
            <div className="mx-8 max-w-md flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for news..."
                  className="w-full rounded-full border border-gray-200 py-2 pl-10 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
          )}

          {/* Right Side - Notifications, Bookmarks, Account */}
          <div className="flex items-center space-x-1 md:space-x-4">
            {!isMobile && (
              <>
                <button className="rounded-full p-2 transition-colors hover:bg-gray-100">
                  <Bell className="h-5 w-5 text-gray-600" />
                </button>
                <button className="rounded-full p-2 transition-colors hover:bg-gray-100">
                  <Bookmark className="h-5 w-5 text-gray-600" />
                </button>
                <button className="rounded-full p-2 transition-colors hover:bg-gray-100">
                  <User className="h-5 w-5 text-gray-600" />
                </button>
              </>
            )}

            <motion.button
              className="hidden items-center space-x-2 rounded-full bg-red-600 px-4 py-2 font-medium text-white md:flex"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Subscribe Now</span>
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

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="flex items-center space-x-6 py-2">
            <a
              href="#"
              className="font-medium text-gray-800 transition-colors hover:text-red-600"
            >
              Home
            </a>

            <div className="group relative" ref={dropdownRef}>
              <button
                className="flex items-center text-gray-800 transition-colors hover:text-red-600"
                onClick={() => toggleDropdown("news")}
              >
                <span className="mr-1 font-medium">News</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${activeDropdown === "news" ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {activeDropdown === "news" && (
                  <motion.div
                    className="absolute left-0 z-50 mt-1 w-[700px] rounded-lg bg-white p-6 shadow-xl"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={megaMenuVariants}
                  >
                    <div className="grid grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <h3 className="border-b border-gray-200 pb-2 font-bold text-gray-800">
                          Top Stories
                        </h3>
                        <ul className="space-y-3">
                          <li>
                            <a
                              href="#"
                              className="text-sm text-gray-700 transition-colors hover:text-red-600"
                            >
                              Global climate summit reaches historic agreement
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="text-sm text-gray-700 transition-colors hover:text-red-600"
                            >
                              Tech giant unveils revolutionary AI assistant
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="text-sm text-gray-700 transition-colors hover:text-red-600"
                            >
                              Major economic reforms announced in federal budget
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="text-sm text-gray-700 transition-colors hover:text-red-600"
                            >
                              Healthcare breakthrough promises new treatment
                              options
                            </a>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="border-b border-gray-200 pb-2 font-bold text-gray-800">
                          Categories
                        </h3>
                        <ul className="space-y-3">
                          <li>
                            <a
                              href="#"
                              className="flex items-center text-sm text-gray-700 transition-colors hover:text-red-600"
                            >
                              <Globe className="mr-2 h-4 w-4 text-red-600" />
                              <span>World</span>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="flex items-center text-sm text-gray-700 transition-colors hover:text-red-600"
                            >
                              <TrendingUp className="mr-2 h-4 w-4 text-red-600" />
                              <span>Business</span>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="flex items-center text-sm text-gray-700 transition-colors hover:text-red-600"
                            >
                              <Radio className="mr-2 h-4 w-4 text-red-600" />
                              <span>Politics</span>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="flex items-center text-sm text-gray-700 transition-colors hover:text-red-600"
                            >
                              <Tv className="mr-2 h-4 w-4 text-red-600" />
                              <span>Technology</span>
                            </a>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="border-b border-gray-200 pb-2 font-bold text-gray-800">
                          Regions
                        </h3>
                        <ul className="space-y-3">
                          <li>
                            <a
                              href="#"
                              className="text-sm text-gray-700 transition-colors hover:text-red-600"
                            >
                              North America
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="text-sm text-gray-700 transition-colors hover:text-red-600"
                            >
                              Europe
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="text-sm text-gray-700 transition-colors hover:text-red-600"
                            >
                              Asia Pacific
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="text-sm text-gray-700 transition-colors hover:text-red-600"
                            >
                              Middle East
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="text-sm text-gray-700 transition-colors hover:text-red-600"
                            >
                              Africa
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="text-sm text-gray-700 transition-colors hover:text-red-600"
                            >
                              Latin America
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="group relative" ref={dropdownRef}>
              <button
                className="flex items-center text-gray-800 transition-colors hover:text-red-600"
                onClick={() => toggleDropdown("entertainment")}
              >
                <span className="mr-1 font-medium">Entertainment</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${activeDropdown === "entertainment" ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {activeDropdown === "entertainment" && (
                  <motion.div
                    className="absolute left-0 z-50 mt-1 w-64 rounded-lg bg-white p-4 shadow-xl"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={megaMenuVariants}
                  >
                    <ul className="space-y-2">
                      <li>
                        <a
                          href="#"
                          className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                        >
                          <Film className="mr-2 h-4 w-4 text-red-600" />
                          <span>Movies</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                        >
                          <Tv className="mr-2 h-4 w-4 text-red-600" />
                          <span>TV Shows</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                        >
                          <Music className="mr-2 h-4 w-4 text-red-600" />
                          <span>Music</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                        >
                          <BookOpen className="mr-2 h-4 w-4 text-red-600" />
                          <span>Books</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                        >
                          <Award className="mr-2 h-4 w-4 text-red-600" />
                          <span>Awards</span>
                        </a>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="#"
              className="font-medium text-gray-800 transition-colors hover:text-red-600"
            >
              Sports
            </a>
            <a
              href="#"
              className="font-medium text-gray-800 transition-colors hover:text-red-600"
            >
              Business
            </a>
            <a
              href="#"
              className="font-medium text-gray-800 transition-colors hover:text-red-600"
            >
              Technology
            </a>
            <a
              href="#"
              className="font-medium text-gray-800 transition-colors hover:text-red-600"
            >
              Science
            </a>
            <a
              href="#"
              className="font-medium text-gray-800 transition-colors hover:text-red-600"
            >
              Health
            </a>
            <a
              href="#"
              className="font-medium text-gray-800 transition-colors hover:text-red-600"
            >
              Opinion
            </a>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 top-20 z-40 mt-12 overflow-y-auto bg-white px-4 pb-4 pt-4 sm:mt-8"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="flex flex-col space-y-4">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search for news..."
                  className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 py-3">
                <a href="#" className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-gray-600" />
                  <span className="font-medium">Account</span>
                </a>
                <a href="#" className="flex items-center">
                  <Bookmark className="mr-2 h-5 w-5 text-gray-600" />
                  <span className="font-medium">Saved</span>
                </a>
              </div>

              <a href="#" className="border-b border-gray-100 py-3 font-medium">
                Home
              </a>

              <div className="border-b border-gray-100 pb-2">
                <button
                  className="flex w-full items-center justify-between py-3 font-medium"
                  onClick={() => toggleDropdown("mobile-news")}
                >
                  <span>News</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${activeDropdown === "mobile-news" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === "mobile-news" && (
                    <motion.div
                      className="mt-2 space-y-3 pl-4"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={megaMenuVariants}
                    >
                      <a href="#" className="flex items-center py-2">
                        <Globe className="mr-2 h-5 w-5 text-red-600" />
                        <span>World</span>
                      </a>
                      <a href="#" className="flex items-center py-2">
                        <TrendingUp className="mr-2 h-5 w-5 text-red-600" />
                        <span>Business</span>
                      </a>
                      <a href="#" className="flex items-center py-2">
                        <Radio className="mr-2 h-5 w-5 text-red-600" />
                        <span>Politics</span>
                      </a>
                      <a href="#" className="flex items-center py-2">
                        <Tv className="mr-2 h-5 w-5 text-red-600" />
                        <span>Technology</span>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="border-b border-gray-100 pb-2">
                <button
                  className="flex w-full items-center justify-between py-3 font-medium"
                  onClick={() => toggleDropdown("mobile-entertainment")}
                >
                  <span>Entertainment</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${activeDropdown === "mobile-entertainment" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === "mobile-entertainment" && (
                    <motion.div
                      className="mt-2 space-y-3 pl-4"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={megaMenuVariants}
                    >
                      <a href="#" className="flex items-center py-2">
                        <Film className="mr-2 h-5 w-5 text-red-600" />
                        <span>Movies</span>
                      </a>
                      <a href="#" className="flex items-center py-2">
                        <Tv className="mr-2 h-5 w-5 text-red-600" />
                        <span>TV Shows</span>
                      </a>
                      <a href="#" className="flex items-center py-2">
                        <Music className="mr-2 h-5 w-5 text-red-600" />
                        <span>Music</span>
                      </a>
                      <a href="#" className="flex items-center py-2">
                        <BookOpen className="mr-2 h-5 w-5 text-red-600" />
                        <span>Books</span>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a href="#" className="border-b border-gray-100 py-3 font-medium">
                Sports
              </a>
              <a href="#" className="border-b border-gray-100 py-3 font-medium">
                Business
              </a>
              <a href="#" className="border-b border-gray-100 py-3 font-medium">
                Technology
              </a>
              <a href="#" className="border-b border-gray-100 py-3 font-medium">
                Science
              </a>
              <a href="#" className="border-b border-gray-100 py-3 font-medium">
                Health
              </a>
              <a href="#" className="border-b border-gray-100 py-3 font-medium">
                Opinion
              </a>

              <div className="pt-4">
                <motion.button
                  className="flex w-full items-center justify-center space-x-2 rounded-lg bg-red-600 px-4 py-3 font-medium text-white"
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Subscribe Now</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NewsPortalNavbar;
