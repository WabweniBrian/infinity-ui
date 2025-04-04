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
  Phone,
  Calendar,
  User,
  Clock,
  MapPin,
  Heart,
} from "lucide-react";

const HealthcareNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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
      name: "Services",
      href: "#",
      dropdown: [
        { name: "Primary Care", href: "#" },
        { name: "Specialty Care", href: "#" },
        { name: "Preventive Health", href: "#" },
        { name: "Telehealth", href: "#" },
        { name: "Lab Services", href: "#" },
      ],
    },
    {
      name: "Patients",
      href: "#",
      dropdown: [
        { name: "Patient Portal", href: "#" },
        { name: "Insurance", href: "#" },
        { name: "Forms & Records", href: "#" },
        { name: "Patient Resources", href: "#" },
      ],
    },
    { name: "Locations", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
  ];

  return (
    <header className="bg-white shadow-sm">
      {/* Top bar with contact info */}
      <div className="bg-teal-50 text-teal-800">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between py-2 text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Phone className="mr-1 h-4 w-4" />
                <span>Emergency: (800) 555-1234</span>
              </div>
              <div className="hidden items-center md:flex">
                <Clock className="mr-1 h-4 w-4" />
                <span>Mon-Fri: 8am-8pm</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="#"
                className="flex items-center transition-colors hover:text-teal-600"
              >
                <MapPin className="mr-1 h-4 w-4" />
                <span>Find a Location</span>
              </Link>
              <Link
                href="#"
                className="flex items-center transition-colors hover:text-teal-600"
              >
                <Calendar className="mr-1 h-4 w-4" />
                <span>Book Appointment</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="flex items-center">
                <Heart className="mr-2 h-8 w-8 text-teal-600" />
                <span className="text-2xl font-bold text-gray-900">
                  Health<span className="text-teal-600">Care</span>
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
                    className="flex items-center px-1 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-teal-600"
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
                    className="px-1 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-teal-600"
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
                        className="absolute left-0 z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <div className="py-1">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
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
            <button
              className="rounded-full p-2 text-gray-500 hover:bg-teal-50 hover:text-teal-600"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="#"
              className="rounded-full p-2 text-gray-500 hover:bg-teal-50 hover:text-teal-600"
              aria-label="Patient Portal"
            >
              <User className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="ml-4 rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-md p-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600"
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
                        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-600"
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
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-teal-50 hover:text-teal-600"
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
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-600"
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
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100">
                    <User className="h-6 w-6 text-teal-600" />
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    Patient Portal
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    Access your health records
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <Link
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                >
                  Sign In
                </Link>
                <Link
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                >
                  Register
                </Link>
                <Link
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                >
                  Book Appointment
                </Link>
                <Link
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                >
                  Emergency Contact
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default HealthcareNavbar;
