"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  BookOpen,
  GraduationCap,
  Users,
  Calendar,
  Globe,
} from "lucide-react";

const EducationNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

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
    {
      name: "Programs",
      href: "#",
      dropdown: [
        { name: "Undergraduate", href: "#" },
        { name: "Graduate", href: "#" },
        { name: "Online Courses", href: "#" },
        { name: "Professional Certificates", href: "#" },
        { name: "Summer Programs", href: "#" },
      ],
    },
    {
      name: "Academics",
      href: "#",
      dropdown: [
        { name: "Departments", href: "#" },
        { name: "Faculty", href: "#" },
        { name: "Research", href: "#" },
        { name: "Libraries", href: "#" },
        { name: "Academic Calendar", href: "#" },
      ],
    },
    {
      name: "Campus Life",
      href: "#",
      dropdown: [
        { name: "Housing", href: "#" },
        { name: "Dining", href: "#" },
        { name: "Athletics", href: "#" },
        { name: "Student Organizations", href: "#" },
        { name: "Events", href: "#" },
      ],
    },
    { name: "Admissions", href: "#" },
    { name: "About", href: "#" },
  ];

  return (
    <header className="bg-white shadow-sm">
      {/* Top bar with secondary links */}
      <div className="bg-blue-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between py-2 text-sm">
            <div className="hidden items-center space-x-6 md:flex">
              <Link href="#" className="transition-colors hover:text-blue-200">
                Current Students
              </Link>
              <Link href="#" className="transition-colors hover:text-blue-200">
                Faculty & Staff
              </Link>
              <Link href="#" className="transition-colors hover:text-blue-200">
                Alumni
              </Link>
              <Link href="#" className="transition-colors hover:text-blue-200">
                Parents
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="#"
                className="flex items-center transition-colors hover:text-blue-200"
              >
                <Calendar className="mr-1 h-4 w-4" />
                <span>Events</span>
              </Link>
              <Link
                href="#"
                className="flex items-center transition-colors hover:text-blue-200"
              >
                <Globe className="mr-1 h-4 w-4" />
                <span>Directory</span>
              </Link>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="flex items-center transition-colors hover:text-blue-200"
                aria-label="Search"
              >
                <Search className="mr-1 h-4 w-4" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="flex items-center">
                <GraduationCap className="mr-2 h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">
                  Edu<span className="text-blue-600">Learn</span>
                </span>
              </div>
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
                    className="flex items-center px-1 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
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
                    className="px-1 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
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
                        className="absolute left-0 z-10 mt-2 w-64 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <div className="py-1">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
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
              className="rounded-full p-2 text-gray-500 hover:bg-blue-50 hover:text-blue-600"
              aria-label="Student Portal"
            >
              <Users className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="rounded-full p-2 text-gray-500 hover:bg-blue-50 hover:text-blue-600"
              aria-label="Learning Resources"
            >
              <BookOpen className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="ml-4 rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-md p-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
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

      {/* Search overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-0 z-20 bg-white p-4 shadow-md"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center">
                <div className="flex-grow">
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search courses, programs, faculty..."
                      className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                  </div>
                </div>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="ml-4 rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  aria-label="Close search"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-gray-200 bg-white md:hidden"
          >
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(link.name)}
                        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
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
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-blue-50 hover:text-blue-600"
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
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 bg-gray-50 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    Student Portal
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    Access your courses and resources
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <Link
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  Sign In
                </Link>
                <Link
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  Register
                </Link>
                <Link
                  href="#"
                  className="mt-3 block w-full rounded-md bg-blue-900 px-3 py-3 text-center text-base font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default EducationNavbar;
