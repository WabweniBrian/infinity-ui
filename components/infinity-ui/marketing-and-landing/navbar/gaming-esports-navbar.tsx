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
  Trophy,
  Gamepad2,
  Tv,
  Users,
  ShoppingCart,
  Zap,
  Gift,
  Flame,
  Crown,
  Monitor,
  Newspaper,
} from "lucide-react";
import useMediaQuery from "@/hooks/use-media-query";

const GamingEsportsNavbar = () => {
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
      backgroundColor: "rgba(15, 15, 25, 0.8)",
      boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
    },
    scrolled: {
      backgroundColor: "rgba(15, 15, 25, 0.95)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
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

  const glowEffect = {
    rest: {
      boxShadow: "0 0 0px rgba(124, 58, 237, 0)",
    },
    hover: {
      boxShadow: "0 0 15px rgba(124, 58, 237, 0.7)",
    },
  };

  const featuredGames = [
    { name: "League of Legends", category: "MOBA" },
    { name: "Valorant", category: "FPS" },
    { name: "Fortnite", category: "Battle Royale" },
    { name: "CS:GO", category: "FPS" },
    { name: "Dota 2", category: "MOBA" },
    { name: "Apex Legends", category: "Battle Royale" },
  ];

  return (
    <motion.nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${isScrolled ? "py-2" : "py-3"}`}
      initial="initial"
      animate={isScrolled ? "scrolled" : "initial"}
      variants={navbarVariants}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <motion.div
              className="mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-r from-violet-600 to-fuchsia-500"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Gamepad2 className="h-6 w-6 text-white" />
            </motion.div>
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-xl font-bold text-transparent">
              NexusGG
            </span>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden items-center space-x-8 lg:flex">
              <div className="group relative" ref={dropdownRef}>
                <button
                  className="flex items-center text-gray-300 transition-colors hover:text-violet-400"
                  onClick={() => toggleDropdown("games")}
                >
                  <span className="mr-1 font-medium">Games</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${activeDropdown === "games" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === "games" && (
                    <motion.div
                      className="absolute left-0 z-50 mt-2 w-[600px] rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-xl"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                    >
                      <div className="grid grid-cols-3 gap-6">
                        <div className="space-y-4">
                          <h3 className="border-b border-gray-700 pb-2 font-bold text-gray-200">
                            Featured Games
                          </h3>
                          <div className="space-y-3">
                            {featuredGames.map((game, index) => (
                              <a key={index} href="#" className="group block">
                                <div className="font-medium text-gray-300 transition-colors group-hover:text-violet-400">
                                  {game.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {game.category}
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="border-b border-gray-700 pb-2 font-bold text-gray-200">
                            Categories
                          </h3>
                          <ul className="space-y-2">
                            <li>
                              <a
                                href="#"
                                className="flex items-center text-gray-300 transition-colors hover:text-violet-400"
                              >
                                <Flame className="mr-2 h-4 w-4 text-violet-500" />
                                <span>Action</span>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="flex items-center text-gray-300 transition-colors hover:text-violet-400"
                              >
                                <Crown className="mr-2 h-4 w-4 text-violet-500" />
                                <span>RPG</span>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="flex items-center text-gray-300 transition-colors hover:text-violet-400"
                              >
                                <Zap className="mr-2 h-4 w-4 text-violet-500" />
                                <span>FPS</span>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="flex items-center text-gray-300 transition-colors hover:text-violet-400"
                              >
                                <Users className="mr-2 h-4 w-4 text-violet-500" />
                                <span>MOBA</span>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="flex items-center text-gray-300 transition-colors hover:text-violet-400"
                              >
                                <Monitor className="mr-2 h-4 w-4 text-violet-500" />
                                <span>Strategy</span>
                              </a>
                            </li>
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <h3 className="border-b border-gray-700 pb-2 font-bold text-gray-200">
                            Platforms
                          </h3>
                          <ul className="space-y-2">
                            <li>
                              <a
                                href="#"
                                className="text-gray-300 transition-colors hover:text-violet-400"
                              >
                                PC
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="text-gray-300 transition-colors hover:text-violet-400"
                              >
                                PlayStation
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="text-gray-300 transition-colors hover:text-violet-400"
                              >
                                Xbox
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="text-gray-300 transition-colors hover:text-violet-400"
                              >
                                Nintendo Switch
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="text-gray-300 transition-colors hover:text-violet-400"
                              >
                                Mobile
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
                  className="flex items-center text-gray-300 transition-colors hover:text-violet-400"
                  onClick={() => toggleDropdown("tournaments")}
                >
                  <span className="mr-1 font-medium">Tournaments</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${activeDropdown === "tournaments" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === "tournaments" && (
                    <motion.div
                      className="absolute left-0 z-50 mt-2 w-64 rounded-lg border border-gray-800 bg-gray-900 p-4 shadow-xl"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                    >
                      <ul className="space-y-2">
                        <li>
                          <a
                            href="#"
                            className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-800"
                          >
                            <Trophy className="mr-2 h-4 w-4 text-violet-500" />
                            <span className="text-gray-300">
                              Upcoming Tournaments
                            </span>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-800"
                          >
                            <Users className="mr-2 h-4 w-4 text-violet-500" />
                            <span className="text-gray-300">Create a Team</span>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-800"
                          >
                            <Flame className="mr-2 h-4 w-4 text-violet-500" />
                            <span className="text-gray-300">Leaderboards</span>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-800"
                          >
                            <Gift className="mr-2 h-4 w-4 text-violet-500" />
                            <span className="text-gray-300">
                              Prizes & Rewards
                            </span>
                          </a>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="#"
                className="font-medium text-gray-300 transition-colors hover:text-violet-400"
              >
                Streams
              </a>
              <a
                href="#"
                className="font-medium text-gray-300 transition-colors hover:text-violet-400"
              >
                News
              </a>
              <a
                href="#"
                className="font-medium text-gray-300 transition-colors hover:text-violet-400"
              >
                Shop
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
                    className="w-40 rounded-full border border-gray-700 bg-gray-800 py-2 pl-9 pr-4 text-sm text-gray-300 transition-all duration-300 focus:w-56 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                </div>
                <button className="relative rounded-full p-2 transition-colors hover:bg-gray-800">
                  <Bell className="h-5 w-5 text-gray-400" />
                  {notificationCount > 0 && (
                    <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-xs text-white">
                      {notificationCount}
                    </span>
                  )}
                </button>
                <button className="rounded-full p-2 transition-colors hover:bg-gray-800">
                  <ShoppingCart className="h-5 w-5 text-gray-400" />
                </button>
              </>
            )}

            <motion.button
              className="flex items-center space-x-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 font-medium text-white"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              initial="rest"
              variants={glowEffect}
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Sign In</span>
            </motion.button>

            {isMobile && (
              <button
                className="rounded-md p-2 transition-colors hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-gray-300" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-300" />
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
            className="fixed inset-0 top-16 z-40 overflow-y-auto bg-gray-900 px-4 pb-4 pt-6 md:pt-2"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="flex flex-col space-y-4">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search games, tournaments..."
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 py-3 pl-10 pr-4 text-sm text-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
              </div>

              <div className="flex items-center justify-between border-b border-gray-800 py-3">
                <a href="#" className="flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-gray-400" />
                  <span className="font-medium text-gray-300">
                    Notifications
                  </span>
                </a>
                <a href="#" className="flex items-center">
                  <ShoppingCart className="mr-2 h-5 w-5 text-gray-400" />
                  <span className="font-medium text-gray-300">Cart</span>
                </a>
              </div>

              <div className="border-b border-gray-800 pb-4">
                <button
                  className="flex w-full items-center justify-between py-3 font-medium text-gray-300"
                  onClick={() => toggleDropdown("mobile-games")}
                >
                  <span>Games</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${activeDropdown === "mobile-games" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === "mobile-games" && (
                    <motion.div
                      className="mt-2 space-y-3 pl-4"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                    >
                      {featuredGames.map((game, index) => (
                        <a
                          key={index}
                          href="#"
                          className="block py-2 text-gray-300"
                        >
                          <div className="font-medium">{game.name}</div>
                          <div className="text-xs text-gray-500">
                            {game.category}
                          </div>
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="border-b border-gray-800 pb-4">
                <button
                  className="flex w-full items-center justify-between py-3 font-medium text-gray-300"
                  onClick={() => toggleDropdown("mobile-tournaments")}
                >
                  <span>Tournaments</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${activeDropdown === "mobile-tournaments" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === "mobile-tournaments" && (
                    <motion.div
                      className="mt-2 space-y-3 pl-4"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                    >
                      <a
                        href="#"
                        className="flex items-center py-2 text-gray-300"
                      >
                        <Trophy className="mr-2 h-5 w-5 text-violet-500" />
                        <span>Upcoming Tournaments</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center py-2 text-gray-300"
                      >
                        <Users className="mr-2 h-5 w-5 text-violet-500" />
                        <span>Create a Team</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center py-2 text-gray-300"
                      >
                        <Flame className="mr-2 h-5 w-5 text-violet-500" />
                        <span>Leaderboards</span>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="#"
                className="flex items-center border-b border-gray-800 py-3 text-gray-300"
              >
                <Tv className="mr-2 h-5 w-5 text-violet-500" />
                <span className="font-medium">Streams</span>
              </a>

              <a
                href="#"
                className="flex items-center border-b border-gray-800 py-3 text-gray-300"
              >
                <Newspaper className="mr-2 h-5 w-5 text-violet-500" />
                <span className="font-medium">News</span>
              </a>

              <a
                href="#"
                className="flex items-center border-b border-gray-800 py-3 text-gray-300"
              >
                <ShoppingCart className="mr-2 h-5 w-5 text-violet-500" />
                <span className="font-medium">Shop</span>
              </a>

              <div className="pt-4">
                <motion.button
                  className="flex w-full items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 font-medium text-white"
                  whileTap={{ scale: 0.98 }}
                >
                  <User className="h-5 w-5" />
                  <span>Sign In</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default GamingEsportsNavbar;
