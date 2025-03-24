"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  User,
  Globe,
  MapPin,
  Plane,
  Hotel,
  Car,
  Umbrella,
  Calendar,
  CreditCard,
  Compass,
  Map,
  Heart,
  Settings,
  LogOut,
} from "lucide-react";
import useMediaQuery from "@/hooks/use-media-query";

const TravelBookingNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("flights");
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
      backgroundColor: "rgba(255, 255, 255)",
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

  const tabVariants = {
    inactive: { opacity: 0.7 },
    active: {
      opacity: 1,
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  const popularDestinations = [
    { name: "Paris", country: "France" },
    { name: "Tokyo", country: "Japan" },
    { name: "New York", country: "USA" },
    { name: "Rome", country: "Italy" },
    { name: "Bali", country: "Indonesia" },
    { name: "Barcelona", country: "Spain" },
  ];

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
              className="mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-r from-blue-500 to-cyan-400"
              whileHover={{ scale: 1.05 }}
            >
              <Plane className="h-6 w-6 text-white" />
            </motion.div>
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-xl font-bold text-transparent">
              TravelEase
            </span>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden items-center space-x-8 lg:flex">
              <div className="group relative" ref={dropdownRef}>
                <button
                  className="flex items-center text-gray-700 transition-colors hover:text-blue-600"
                  onClick={() => toggleDropdown("destinations")}
                >
                  <span className="mr-1 font-medium">Destinations</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${activeDropdown === "destinations" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === "destinations" && (
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
                            Popular Destinations
                          </h3>
                          <div className="grid grid-cols-2 gap-3">
                            {popularDestinations.map((destination, index) => (
                              <a key={index} href="#" className="group">
                                <div className="font-medium text-gray-800 transition-colors group-hover:text-blue-600">
                                  {destination.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {destination.country}
                                </div>
                              </a>
                            ))}
                          </div>
                          <a
                            href="#"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            View all destinations
                          </a>
                        </div>

                        <div className="space-y-4">
                          <h3 className="border-b border-gray-200 pb-2 font-bold text-gray-800">
                            Explore By Region
                          </h3>
                          <ul className="space-y-2">
                            <li>
                              <a
                                href="#"
                                className="flex items-center text-gray-700 transition-colors hover:text-blue-600"
                              >
                                <Globe className="mr-2 h-4 w-4 text-blue-500" />
                                <span>Europe</span>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="flex items-center text-gray-700 transition-colors hover:text-blue-600"
                              >
                                <Globe className="mr-2 h-4 w-4 text-blue-500" />
                                <span>Asia</span>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="flex items-center text-gray-700 transition-colors hover:text-blue-600"
                              >
                                <Globe className="mr-2 h-4 w-4 text-blue-500" />
                                <span>North America</span>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="flex items-center text-gray-700 transition-colors hover:text-blue-600"
                              >
                                <Globe className="mr-2 h-4 w-4 text-blue-500" />
                                <span>South America</span>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="flex items-center text-gray-700 transition-colors hover:text-blue-600"
                              >
                                <Globe className="mr-2 h-4 w-4 text-blue-500" />
                                <span>Africa</span>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="flex items-center text-gray-700 transition-colors hover:text-blue-600"
                              >
                                <Globe className="mr-2 h-4 w-4 text-blue-500" />
                                <span>Oceania</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="#"
                className="font-medium text-gray-700 transition-colors hover:text-blue-600"
              >
                Deals
              </a>

              <div className="group relative" ref={dropdownRef}>
                <button
                  className="flex items-center text-gray-700 transition-colors hover:text-blue-600"
                  onClick={() => toggleDropdown("travel-guides")}
                >
                  <span className="mr-1 font-medium">Travel Guides</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${activeDropdown === "travel-guides" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === "travel-guides" && (
                    <motion.div
                      className="absolute left-0 z-50 mt-2 w-64 rounded-lg bg-white p-4 shadow-xl"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                    >
                      <ul className="space-y-2">
                        <li>
                          <a
                            href="#"
                            className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                          >
                            <Compass className="mr-2 h-4 w-4 text-blue-500" />
                            <span>City Guides</span>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                          >
                            <Map className="mr-2 h-4 w-4 text-blue-500" />
                            <span>Travel Tips</span>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                          >
                            <Umbrella className="mr-2 h-4 w-4 text-blue-500" />
                            <span>Seasonal Recommendations</span>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                          >
                            <CreditCard className="mr-2 h-4 w-4 text-blue-500" />
                            <span>Budget Travel</span>
                          </a>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="#"
                className="font-medium text-gray-700 transition-colors hover:text-blue-600"
              >
                About Us
              </a>
              <a
                href="#"
                className="font-medium text-gray-700 transition-colors hover:text-blue-600"
              >
                Contact
              </a>
            </div>
          )}

          {/* Right Side - Account */}
          <div className="flex items-center space-x-4" ref={dropdownRef}>
            <div className="relative">
              <button
                className="flex items-center space-x-1 text-gray-700 transition-colors hover:text-blue-600"
                onClick={() => toggleDropdown("account")}
              >
                <User className="h-5 w-5" />
                {!isMobile && <span className="font-medium">Account</span>}
                {!isMobile && (
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${activeDropdown === "account" ? "rotate-180" : ""}`}
                  />
                )}
              </button>
              <AnimatePresence>
                {activeDropdown === "account" && (
                  <motion.div
                    className="absolute right-0 z-50 mt-2 w-64 rounded-lg bg-white p-4 shadow-xl"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                  >
                    <div className="space-y-3">
                      <a
                        href="#"
                        className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                      >
                        <User className="mr-3 h-5 w-5 text-blue-500" />
                        <span>My Profile</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                      >
                        <Calendar className="mr-3 h-5 w-5 text-blue-500" />
                        <span>My Bookings</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                      >
                        <Heart className="mr-3 h-5 w-5 text-blue-500" />
                        <span>Saved Trips</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                      >
                        <Settings className="mr-3 h-5 w-5 text-blue-500" />
                        <span>Settings</span>
                      </a>
                      <div className="mt-2 border-t border-gray-100 pt-2">
                        <a
                          href="#"
                          className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                        >
                          <LogOut className="mr-3 h-5 w-5 text-blue-500" />
                          <span>Sign Out</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {!isMobile && (
              <motion.button
                className="flex items-center space-x-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 font-medium text-white"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Book Now</span>
              </motion.button>
            )}

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

        {/* Booking Tabs - Desktop */}
        {!isMobile && !isScrolled && (
          <div className="mt-6 rounded-xl bg-white p-4 shadow-lg">
            <div className="mb-4 flex space-x-6">
              <motion.button
                className={`flex items-center space-x-2 rounded-lg px-4 py-2 ${activeTab === "flights" ? "text-blue-600" : "text-gray-600"}`}
                variants={tabVariants}
                animate={activeTab === "flights" ? "active" : "inactive"}
                onClick={() => setActiveTab("flights")}
              >
                <Plane className="h-5 w-5" />
                <span className="font-medium">Flights</span>
              </motion.button>

              <motion.button
                className={`flex items-center space-x-2 rounded-lg px-4 py-2 ${activeTab === "hotels" ? "text-blue-600" : "text-gray-600"}`}
                variants={tabVariants}
                animate={activeTab === "hotels" ? "active" : "inactive"}
                onClick={() => setActiveTab("hotels")}
              >
                <Hotel className="h-5 w-5" />
                <span className="font-medium">Hotels</span>
              </motion.button>

              <motion.button
                className={`flex items-center space-x-2 rounded-lg px-4 py-2 ${activeTab === "cars" ? "text-blue-600" : "text-gray-600"}`}
                variants={tabVariants}
                animate={activeTab === "cars" ? "active" : "inactive"}
                onClick={() => setActiveTab("cars")}
              >
                <Car className="h-5 w-5" />
                <span className="font-medium">Car Rentals</span>
              </motion.button>

              <motion.button
                className={`flex items-center space-x-2 rounded-lg px-4 py-2 ${activeTab === "packages" ? "text-blue-600" : "text-gray-600"}`}
                variants={tabVariants}
                animate={activeTab === "packages" ? "active" : "inactive"}
                onClick={() => setActiveTab("packages")}
              >
                <Umbrella className="h-5 w-5" />
                <span className="font-medium">Vacation Packages</span>
              </motion.button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="w-48">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Check-in"
                    className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Calendar className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="w-48">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Check-out"
                    className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Calendar className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <motion.button
                className="rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-3 font-medium text-white"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Search
              </motion.button>
            </div>
          </div>
        )}
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
                  placeholder="Where are you going?"
                  className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
              </div>

              <div className="flex space-x-2 overflow-x-auto pb-2">
                <motion.button
                  className={`flex items-center space-x-2 whitespace-nowrap rounded-lg px-4 py-2 ${activeTab === "flights" ? "bg-blue-50 text-blue-600" : "text-gray-600"}`}
                  variants={tabVariants}
                  animate={activeTab === "flights" ? "active" : "inactive"}
                  onClick={() => setActiveTab("flights")}
                >
                  <Plane className="h-5 w-5" />
                  <span className="font-medium">Flights</span>
                </motion.button>

                <motion.button
                  className={`flex items-center space-x-2 whitespace-nowrap rounded-lg px-4 py-2 ${activeTab === "hotels" ? "bg-blue-50 text-blue-600" : "text-gray-600"}`}
                  variants={tabVariants}
                  animate={activeTab === "hotels" ? "active" : "inactive"}
                  onClick={() => setActiveTab("hotels")}
                >
                  <Hotel className="h-5 w-5" />
                  <span className="font-medium">Hotels</span>
                </motion.button>

                <motion.button
                  className={`flex items-center space-x-2 whitespace-nowrap rounded-lg px-4 py-2 ${activeTab === "cars" ? "bg-blue-50 text-blue-600" : "text-gray-600"}`}
                  variants={tabVariants}
                  animate={activeTab === "cars" ? "active" : "inactive"}
                  onClick={() => setActiveTab("cars")}
                >
                  <Car className="h-5 w-5" />
                  <span className="font-medium">Car Rentals</span>
                </motion.button>

                <motion.button
                  className={`flex items-center space-x-2 whitespace-nowrap rounded-lg px-4 py-2 ${activeTab === "packages" ? "bg-blue-50 text-blue-600" : "text-gray-600"}`}
                  variants={tabVariants}
                  animate={activeTab === "packages" ? "active" : "inactive"}
                  onClick={() => setActiveTab("packages")}
                >
                  <Umbrella className="h-5 w-5" />
                  <span className="font-medium">Packages</span>
                </motion.button>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="mb-4">
                  <button
                    className="flex w-full items-center justify-between py-3 font-medium"
                    onClick={() => toggleDropdown("mobile-destinations")}
                  >
                    <span>Destinations</span>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${activeDropdown === "mobile-destinations" ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === "mobile-destinations" && (
                      <motion.div
                        className="mt-2 space-y-3 pl-4"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={dropdownVariants}
                      >
                        {popularDestinations.map((destination, index) => (
                          <a key={index} href="#" className="block py-2">
                            <div className="font-medium">
                              {destination.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {destination.country}
                            </div>
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <a
                  href="#"
                  className="block border-b border-gray-100 py-3 font-medium"
                >
                  Deals
                </a>

                <div className="mb-4">
                  <button
                    className="flex w-full items-center justify-between py-3 font-medium"
                    onClick={() => toggleDropdown("mobile-guides")}
                  >
                    <span>Travel Guides</span>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${activeDropdown === "mobile-guides" ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === "mobile-guides" && (
                      <motion.div
                        className="mt-2 space-y-3 pl-4"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={dropdownVariants}
                      >
                        <a href="#" className="flex items-center py-2">
                          <Compass className="mr-2 h-5 w-5 text-blue-500" />
                          <span>City Guides</span>
                        </a>
                        <a href="#" className="flex items-center py-2">
                          <Map className="mr-2 h-5 w-5 text-blue-500" />
                          <span>Travel Tips</span>
                        </a>
                        <a href="#" className="flex items-center py-2">
                          <Umbrella className="mr-2 h-5 w-5 text-blue-500" />
                          <span>Seasonal Recommendations</span>
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <a
                  href="#"
                  className="block border-b border-gray-100 py-3 font-medium"
                >
                  About Us
                </a>
                <a
                  href="#"
                  className="block border-b border-gray-100 py-3 font-medium"
                >
                  Contact
                </a>
              </div>

              <div className="pt-4">
                <motion.button
                  className="flex w-full items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-3 font-medium text-white"
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Book Now</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default TravelBookingNavbar;
