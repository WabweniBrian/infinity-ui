"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  ShoppingBag,
  MapPin,
  Clock,
  Phone,
} from "lucide-react";

const RestaurantNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const handleMouseEnter = (dropdown: string) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const navLinks = [
    { name: "Home", href: "#" },
    {
      name: "Menu",
      href: "#",
      dropdown: [
        { name: "Appetizers", href: "#" },
        { name: "Main Courses", href: "#" },
        { name: "Desserts", href: "#" },
        { name: "Drinks", href: "#" },
        { name: "Specials", href: "#" },
      ],
    },
    { name: "About", href: "#" },
    { name: "Gallery", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 bg-amber-900 transition-all duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      {/* Top bar with info */}
      <div
        className={`transition-all duration-300 ${isScrolled ? "bg-amber-50 py-1" : "bg-amber-100/80 py-2"}`}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between text-sm text-amber-900">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                <span>123 Gourmet Street, Foodville</span>
              </div>
              <div className="hidden items-center md:flex">
                <Clock className="mr-1 h-4 w-4" />
                <span>Open: 11am - 10pm</span>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="mr-1 h-4 w-4" />
              <span>(555) 123-4567</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div
        className={`transition-all duration-300 ${isScrolled ? "py-2" : "py-4"}`}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <span
                  className={`font-serif text-2xl font-bold ${isScrolled ? "text-amber-900" : "text-white"}`}
                >
                  Gusto
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:items-center md:space-x-8">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() =>
                    link.dropdown && handleMouseEnter(link.name)
                  }
                  onMouseLeave={handleMouseLeave}
                >
                  {link.dropdown ? (
                    <button
                      className={`flex items-center px-1 py-2 text-sm font-medium transition-colors ${
                        isScrolled
                          ? "text-amber-900 hover:text-amber-600"
                          : "text-white hover:text-amber-200"
                      }`}
                      aria-expanded={activeDropdown === link.name}
                    >
                      {link.name}
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition-transform ${
                          activeDropdown === link.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={`px-1 py-2 text-sm font-medium transition-colors ${
                        isScrolled
                          ? "text-amber-900 hover:text-amber-600"
                          : "text-white hover:text-amber-200"
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {link.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <div className="py-1">
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className="block px-4 py-2 text-sm text-amber-900 hover:bg-amber-50 hover:text-amber-600"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              <Link
                href="#"
                className={`rounded-full p-2 transition-colors ${
                  isScrolled
                    ? "text-amber-900 hover:bg-amber-50 hover:text-amber-600"
                    : "text-white hover:bg-white/10 hover:text-amber-200"
                }`}
                aria-label="Order Online"
              >
                <ShoppingBag className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className={`ml-4 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isScrolled
                    ? "bg-amber-600 text-white hover:bg-amber-700"
                    : "bg-white text-amber-900 hover:bg-amber-100"
                }`}
              >
                Reservations
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`rounded-md p-2 transition-colors ${
                  isScrolled
                    ? "text-amber-900 hover:bg-amber-50 hover:text-amber-600"
                    : "text-white hover:bg-white/10 hover:text-amber-200"
                }`}
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-amber-100 bg-white md:hidden"
          >
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(link.name)}
                        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-amber-900 hover:bg-amber-50 hover:text-amber-600"
                      >
                        {link.name}
                        <ChevronDown
                          className={`ml-1 h-4 w-4 transition-transform ${
                            activeDropdown === link.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {activeDropdown === link.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-1 py-1 pl-4 pr-2"
                          >
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className="block rounded-md px-3 py-2 text-base font-medium text-amber-700 hover:bg-amber-50 hover:text-amber-600"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-amber-900 hover:bg-amber-50 hover:text-amber-600"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-amber-100 bg-amber-50 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-amber-900">
                    Hours
                  </div>
                  <div className="text-sm font-medium text-amber-700">
                    Open: 11am - 10pm
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <Link
                  href="#"
                  className="flex items-center rounded-md px-3 py-2 text-base font-medium text-amber-900 hover:bg-amber-100 hover:text-amber-600"
                >
                  <MapPin className="mr-2 h-5 w-5 text-amber-600" />
                  <span>Find Us</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center rounded-md px-3 py-2 text-base font-medium text-amber-900 hover:bg-amber-100 hover:text-amber-600"
                >
                  <Phone className="mr-2 h-5 w-5 text-amber-600" />
                  <span>Call Us</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center rounded-md px-3 py-2 text-base font-medium text-amber-900 hover:bg-amber-100 hover:text-amber-600"
                >
                  <ShoppingBag className="mr-2 h-5 w-5 text-amber-600" />
                  <span>Order Online</span>
                </Link>
                <Link
                  href="#"
                  className="mt-3 block w-full rounded-md bg-amber-600 px-3 py-3 text-center text-base font-medium text-white transition-colors hover:bg-amber-700"
                >
                  Reservations
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default RestaurantNavbar;
