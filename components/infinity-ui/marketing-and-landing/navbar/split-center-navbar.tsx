"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, ShoppingCart, User, ChevronDown } from "lucide-react";

const SplitCenterNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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

  const leftNavLinks = [
    {
      name: "Products",
      href: "#",
      dropdown: [
        { name: "All Products", href: "#" },
        { name: "Featured", href: "#" },
        { name: "New Arrivals", href: "#" },
        { name: "Best Sellers", href: "#" },
      ],
    },
    { name: "Collections", href: "#" },
    { name: "Sale", href: "#" },
  ];

  const rightNavLinks = [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    {
      name: "Support",
      href: "#",
      dropdown: [
        { name: "Contact Us", href: "#" },
        { name: "FAQs", href: "#" },
        { name: "Shipping", href: "#" },
        { name: "Returns", href: "#" },
      ],
    },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top bar with search and account */}
        <div className="flex h-10 items-center justify-end border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
            <Link href="#" className="text-gray-500 hover:text-gray-700">
              <ShoppingCart className="h-4 w-4" />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-700">
              <User className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Main navigation */}
        <div className="relative flex h-16 items-center justify-between md:h-20">
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
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

          {/* Left navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            {leftNavLinks.map((link) => (
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
                    className="flex items-center px-1 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
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
                    className="px-1 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
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
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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

          {/* Logo (centered) */}
          <div className="absolute left-1/2 -translate-x-1/2 transform">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">Infinity</span>
            </Link>
          </div>

          {/* Right navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            {rightNavLinks.map((link) => (
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
                    className="flex items-center px-1 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
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
                    className="px-1 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
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
                        className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <div className="py-1">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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

          {/* Mobile logo (right aligned) */}
          <div className="md:hidden">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">Infinity</span>
            </Link>
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
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-center">
                <div className="flex-grow">
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search for products..."
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
              {/* Combine left and right nav links for mobile */}
              {[...leftNavLinks, ...rightNavLinks].map((link) => (
                <div key={link.name}>
                  {link.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(link.name)}
                        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
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
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
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
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                    <User className="h-6 w-6 text-gray-500" />
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    Guest User
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    Sign in to your account
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <button className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                  Sign In
                </button>
                <button className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                  Create Account
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default SplitCenterNavbar;
