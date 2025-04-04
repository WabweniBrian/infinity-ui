"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Wallet,
  Grid,
  Zap,
  BarChart2,
  Layers,
  ShoppingBag,
  Heart,
  PlusCircle,
  Sparkles,
  Palette,
  Camera,
  Music,
  Globe,
  Hexagon,
  Users,
} from "lucide-react";
import useMediaQuery from "@/hooks/use-media-query";

const NFTMarketplaceNavbar = () => {
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
      backgroundColor: "rgba(15, 23, 42, 0.8)",
      boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
    },
    scrolled: {
      backgroundColor: "rgba(15, 23, 42, 0.95)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
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
      boxShadow: "0 0 0px rgba(139, 92, 246, 0)",
    },
    hover: {
      boxShadow: "0 0 15px rgba(139, 92, 246, 0.7)",
    },
  };

  const categories = [
    { name: "Art", icon: <Palette className="h-5 w-5 text-purple-500" /> },
    {
      name: "Photography",
      icon: <Camera className="h-5 w-5 text-purple-500" />,
    },
    { name: "Music", icon: <Music className="h-5 w-5 text-purple-500" /> },
    {
      name: "Virtual Worlds",
      icon: <Globe className="h-5 w-5 text-purple-500" />,
    },
    {
      name: "Collectibles",
      icon: <Layers className="h-5 w-5 text-purple-500" />,
    },
  ];

  const collections = [
    { name: "CryptoPunks", items: "10,000 items" },
    { name: "Bored Ape Yacht Club", items: "10,000 items" },
    { name: "Art Blocks", items: "Variable items" },
    { name: "Azuki", items: "10,000 items" },
  ];

  return (
    <motion.nav
      className="fixed left-0 right-0 top-0 z-50 py-3 transition-all duration-300"
      initial="initial"
      animate={isScrolled ? "scrolled" : "initial"}
      variants={navbarVariants}
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <motion.div
              className="mr-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Hexagon className="h-6 w-6 text-white" />
            </motion.div>
            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-xl font-bold text-transparent">
              NexusNFT
            </span>
          </div>

          {/* Search Bar - Center */}
          {!isMobile && (
            <div className="mx-8 max-w-md flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search items, collections, and accounts"
                  className="w-full rounded-full border border-slate-700 bg-slate-800 py-2 pl-10 pr-4 text-sm text-slate-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              </div>
            </div>
          )}

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden items-center space-x-8 lg:flex">
              <div className="group relative" ref={dropdownRef}>
                <button
                  className="flex items-center text-slate-300 transition-colors hover:text-purple-400"
                  onClick={() => toggleDropdown("explore")}
                >
                  <span className="mr-1 font-medium">Explore</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${activeDropdown === "explore" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === "explore" && (
                    <motion.div
                      className="absolute left-0 z-50 mt-2 w-[600px] rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-xl"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                    >
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="border-b border-slate-700 pb-2 font-bold text-slate-200">
                            Categories
                          </h3>
                          <div className="grid grid-cols-2 gap-3">
                            {categories.map((category, index) => (
                              <a
                                key={index}
                                href="#"
                                className="flex items-center rounded-md p-2 transition-colors hover:bg-slate-800"
                              >
                                {category.icon}
                                <span className="ml-2 text-slate-300">
                                  {category.name}
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="border-b border-slate-700 pb-2 font-bold text-slate-200">
                            Top Collections
                          </h3>
                          <div className="space-y-3">
                            {collections.map((collection, index) => (
                              <a
                                key={index}
                                href="#"
                                className="flex items-center justify-between rounded-md p-2 transition-colors hover:bg-slate-800"
                              >
                                <span className="text-slate-300">
                                  {collection.name}
                                </span>
                                <span className="text-xs text-slate-500">
                                  {collection.items}
                                </span>
                              </a>
                            ))}
                          </div>
                          <a
                            href="#"
                            className="text-sm text-purple-400 hover:underline"
                          >
                            View all collections
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="group relative" ref={dropdownRef}>
                <button
                  className="flex items-center text-slate-300 transition-colors hover:text-purple-400"
                  onClick={() => toggleDropdown("stats")}
                >
                  <span className="mr-1 font-medium">Stats</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${activeDropdown === "stats" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === "stats" && (
                    <motion.div
                      className="absolute left-0 z-50 mt-2 w-64 rounded-lg border border-slate-800 bg-slate-900 p-4 shadow-xl"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                    >
                      <ul className="space-y-2">
                        <li>
                          <a
                            href="#"
                            className="flex items-center rounded-md p-2 transition-colors hover:bg-slate-800"
                          >
                            <BarChart2 className="mr-2 h-4 w-4 text-purple-500" />
                            <span className="text-slate-300">Rankings</span>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="flex items-center rounded-md p-2 transition-colors hover:bg-slate-800"
                          >
                            <Zap className="mr-2 h-4 w-4 text-purple-500" />
                            <span className="text-slate-300">Activity</span>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="flex items-center rounded-md p-2 transition-colors hover:bg-slate-800"
                          >
                            <Sparkles className="mr-2 h-4 w-4 text-purple-500" />
                            <span className="text-slate-300">Trending</span>
                          </a>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="#"
                className="font-medium text-slate-300 transition-colors hover:text-purple-400"
              >
                Resources
              </a>
              <a
                href="#"
                className="font-medium text-slate-300 transition-colors hover:text-purple-400"
              >
                Community
              </a>
            </div>
          )}

          {/* Right Side - Create, Wallet, User */}
          <div className="flex items-center space-x-1 md:space-x-4">
            {!isMobile && (
              <>
                <button className="h-8 w-8 rounded-lg bg-slate-800 text-slate-300 transition-colors flex-center-center hover:bg-slate-700">
                  <PlusCircle className="h-4 w-4 text-purple-400" />
                </button>
                <button className="rounded-full p-2 transition-colors hover:bg-slate-800">
                  <Heart className="h-5 w-5 text-slate-400" />
                </button>
                <button className="rounded-full p-2 transition-colors hover:bg-slate-800">
                  <ShoppingBag className="h-5 w-5 text-slate-400" />
                </button>
              </>
            )}

            <motion.button
              className="flex items-center space-x-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 font-medium text-white"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              initial="rest"
              variants={glowEffect}
            >
              <Wallet className="h-4 w-4" />
              <span className="hidden sm:inline">Connect Wallet</span>
            </motion.button>

            {isMobile && (
              <button
                className="rounded-md p-2 transition-colors hover:bg-slate-800"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-slate-300" />
                ) : (
                  <Menu className="h-6 w-6 text-slate-300" />
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
            className="fixed inset-0 top-16 z-40 overflow-y-auto bg-slate-900 px-4 pb-4 pt-4"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="flex flex-col space-y-4">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search items, collections..."
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-sm text-slate-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 py-3">
                <a href="#" className="flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-slate-400" />
                  <span className="font-medium text-slate-300">Favorites</span>
                </a>
                <a href="#" className="flex items-center">
                  <ShoppingBag className="mr-2 h-5 w-5 text-slate-400" />
                  <span className="font-medium text-slate-300">Cart</span>
                </a>
              </div>

              <div className="border-b border-slate-800 pb-4">
                <button
                  className="flex w-full items-center justify-between py-3 font-medium text-slate-300"
                  onClick={() => toggleDropdown("mobile-explore")}
                >
                  <span>Explore</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${activeDropdown === "mobile-explore" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === "mobile-explore" && (
                    <motion.div
                      className="mt-2 space-y-3 pl-4"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                    >
                      {categories.map((category, index) => (
                        <a
                          key={index}
                          href="#"
                          className="flex items-center py-2 text-slate-300"
                        >
                          {category.icon}
                          <span className="ml-2">{category.name}</span>
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="border-b border-slate-800 pb-4">
                <button
                  className="flex w-full items-center justify-between py-3 font-medium text-slate-300"
                  onClick={() => toggleDropdown("mobile-stats")}
                >
                  <span>Stats</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${activeDropdown === "mobile-stats" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === "mobile-stats" && (
                    <motion.div
                      className="mt-2 space-y-3 pl-4"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                    >
                      <a
                        href="#"
                        className="flex items-center py-2 text-slate-300"
                      >
                        <BarChart2 className="mr-2 h-5 w-5 text-purple-500" />
                        <span>Rankings</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center py-2 text-slate-300"
                      >
                        <Zap className="mr-2 h-5 w-5 text-purple-500" />
                        <span>Activity</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center py-2 text-slate-300"
                      >
                        <Sparkles className="mr-2 h-5 w-5 text-purple-500" />
                        <span>Trending</span>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="#"
                className="flex items-center border-b border-slate-800 py-3 text-slate-300"
              >
                <Grid className="mr-2 h-5 w-5 text-purple-500" />
                <span className="font-medium">Resources</span>
              </a>

              <a
                href="#"
                className="flex items-center border-b border-slate-800 py-3 text-slate-300"
              >
                <Users className="mr-2 h-5 w-5 text-purple-500" />
                <span className="font-medium">Community</span>
              </a>

              <a
                href="#"
                className="flex items-center border-b border-slate-800 py-3 text-slate-300"
              >
                <PlusCircle className="mr-2 h-5 w-5 text-purple-500" />
                <span className="font-medium">Create</span>
              </a>

              <div className="pt-4">
                <motion.button
                  className="flex w-full items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-3 font-medium text-white"
                  whileTap={{ scale: 0.98 }}
                >
                  <Wallet className="h-5 w-5" />
                  <span>Connect Wallet</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NFTMarketplaceNavbar;
