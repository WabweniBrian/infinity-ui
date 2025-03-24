"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  User,
  Bell,
  ChevronDown,
  Shield,
  BarChart3,
  CreditCard,
  PiggyBank,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";
import useMediaQuery from "@/hooks/use-media-query";

const FinanceBankingNavbar = () => {
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
      backgroundColor: "rgba(255, 255, 255, 0)",
      boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
    },
    scrolled: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
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

  return (
    <motion.nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${isScrolled ? "py-2" : "py-4"}`}
      initial="initial"
      animate={isScrolled ? "scrolled" : "initial"}
      variants={navbarVariants}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <motion.div
              className="mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-r from-emerald-600 to-teal-500"
              whileHover={{ scale: 1.05 }}
            >
              <Shield className="h-6 w-6 text-white" />
            </motion.div>
            <span className="bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-xl font-bold text-transparent">
              SecureBank
            </span>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden items-center space-x-8 lg:flex">
              <div className="group relative" ref={dropdownRef}>
                <button
                  className="flex items-center text-gray-700 transition-colors hover:text-emerald-600"
                  onClick={() => toggleDropdown("banking")}
                >
                  <span className="mr-1 font-medium">Banking</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${activeDropdown === "banking" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === "banking" && (
                    <motion.div
                      className="absolute left-0 z-50 mt-2 w-64 rounded-lg bg-white p-4 shadow-xl"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                    >
                      <div className="grid grid-cols-1 gap-3">
                        <a
                          href="#"
                          className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                        >
                          <CreditCard className="mr-3 h-5 w-5 text-emerald-600" />
                          <div>
                            <p className="font-medium text-gray-800">
                              Checking & Savings
                            </p>
                            <p className="text-xs text-gray-500">
                              Manage your daily accounts
                            </p>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                        >
                          <BarChart3 className="mr-3 h-5 w-5 text-emerald-600" />
                          <div>
                            <p className="font-medium text-gray-800">
                              Credit Cards
                            </p>
                            <p className="text-xs text-gray-500">
                              Explore our card options
                            </p>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                        >
                          <PiggyBank className="mr-3 h-5 w-5 text-emerald-600" />
                          <div>
                            <p className="font-medium text-gray-800">
                              Loans & Mortgages
                            </p>
                            <p className="text-xs text-gray-500">
                              Find the right financing
                            </p>
                          </div>
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="group relative" ref={dropdownRef}>
                <button
                  className="flex items-center text-gray-700 transition-colors hover:text-emerald-600"
                  onClick={() => toggleDropdown("investing")}
                >
                  <span className="mr-1 font-medium">Investing</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${activeDropdown === "investing" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === "investing" && (
                    <motion.div
                      className="absolute left-0 z-50 mt-2 w-64 rounded-lg bg-white p-4 shadow-xl"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                    >
                      <div className="grid grid-cols-1 gap-3">
                        <a
                          href="#"
                          className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                        >
                          <BarChart3 className="mr-3 h-5 w-5 text-emerald-600" />
                          <div>
                            <p className="font-medium text-gray-800">
                              Investment Accounts
                            </p>
                            <p className="text-xs text-gray-500">
                              Start building your portfolio
                            </p>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                        >
                          <PiggyBank className="mr-3 h-5 w-5 text-emerald-600" />
                          <div>
                            <p className="font-medium text-gray-800">
                              Retirement Planning
                            </p>
                            <p className="text-xs text-gray-500">
                              Secure your future
                            </p>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                        >
                          <HelpCircle className="mr-3 h-5 w-5 text-emerald-600" />
                          <div>
                            <p className="font-medium text-gray-800">
                              Wealth Management
                            </p>
                            <p className="text-xs text-gray-500">
                              Personalized financial advice
                            </p>
                          </div>
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="#"
                className="font-medium text-gray-700 transition-colors hover:text-emerald-600"
              >
                Business
              </a>
              <a
                href="#"
                className="font-medium text-gray-700 transition-colors hover:text-emerald-600"
              >
                Resources
              </a>
            </div>
          )}

          {/* Right Side - Search, Notifications, User */}
          <div className="flex items-center space-x-4">
            {!isMobile && (
              <>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-40 rounded-full border border-gray-200 py-2 pl-9 pr-4 text-sm transition-all duration-300 focus:w-56 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
                <button className="relative rounded-full p-2 transition-colors hover:bg-gray-100">
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-emerald-500"></span>
                </button>
              </>
            )}

            <motion.button
              className="flex items-center space-x-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-4 py-2 font-medium text-white"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Online Banking</span>
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
            className="fixed inset-0 top-20 z-40 overflow-y-auto bg-white px-4 pt-6 md:pt-2"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full rounded-lg border border-gray-200 py-3 pl-9 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="mb-4">
                  <button
                    className="flex w-full items-center justify-between py-3 font-medium"
                    onClick={() => toggleDropdown("mobile-banking")}
                  >
                    <span>Banking</span>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${activeDropdown === "mobile-banking" ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === "mobile-banking" && (
                      <motion.div
                        className="mt-2 space-y-3 pl-4"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={dropdownVariants}
                      >
                        <a href="#" className="flex items-center py-2">
                          <CreditCard className="mr-3 h-5 w-5 text-emerald-600" />
                          <span>Checking & Savings</span>
                        </a>
                        <a href="#" className="flex items-center py-2">
                          <BarChart3 className="mr-3 h-5 w-5 text-emerald-600" />
                          <span>Credit Cards</span>
                        </a>
                        <a href="#" className="flex items-center py-2">
                          <PiggyBank className="mr-3 h-5 w-5 text-emerald-600" />
                          <span>Loans & Mortgages</span>
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mb-4">
                  <button
                    className="flex w-full items-center justify-between py-3 font-medium"
                    onClick={() => toggleDropdown("mobile-investing")}
                  >
                    <span>Investing</span>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${activeDropdown === "mobile-investing" ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === "mobile-investing" && (
                      <motion.div
                        className="mt-2 space-y-3 pl-4"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={dropdownVariants}
                      >
                        <a href="#" className="flex items-center py-2">
                          <BarChart3 className="mr-3 h-5 w-5 text-emerald-600" />
                          <span>Investment Accounts</span>
                        </a>
                        <a href="#" className="flex items-center py-2">
                          <PiggyBank className="mr-3 h-5 w-5 text-emerald-600" />
                          <span>Retirement Planning</span>
                        </a>
                        <a href="#" className="flex items-center py-2">
                          <HelpCircle className="mr-3 h-5 w-5 text-emerald-600" />
                          <span>Wealth Management</span>
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <a href="#" className="block py-3 font-medium">
                  Business
                </a>
                <a href="#" className="block py-3 font-medium">
                  Resources
                </a>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <motion.button
                  className="flex w-full items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 px-4 py-3 font-medium text-white"
                  whileTap={{ scale: 0.98 }}
                >
                  <User className="h-5 w-5" />
                  <span>Online Banking</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default FinanceBankingNavbar;
