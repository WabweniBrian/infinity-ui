"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Terminal,
  Code2,
  Boxes,
  BookOpen,
  Users,
  MessageSquare,
  Settings,
  BarChart,
  Zap,
  Github,
} from "lucide-react";

const DeveloperPlatformNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleMouseEnter = (dropdown: string) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Enterprise", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "Customers", href: "#" },
  ];

  const viewMoreLinks = {
    title: "View more",
    sections: [
      {
        title: "Company",
        items: [
          { name: "About us", href: "#", icon: Users },
          { name: "Careers", href: "#", icon: Zap },
          { name: "Blog", href: "#", icon: BookOpen },
          { name: "Contact us", href: "#", icon: MessageSquare },
        ],
      },
      {
        title: "Resources",
        items: [
          { name: "Documentation", href: "#", icon: Code2 },
          { name: "API Reference", href: "#", icon: Terminal },
          { name: "Status", href: "#", icon: BarChart },
          { name: "Settings", href: "#", icon: Settings },
        ],
      },
      {
        title: "Community",
        items: [
          { name: "GitHub", href: "#", icon: Github },
          { name: "Discord", href: "#", icon: MessageSquare },
          { name: "Templates", href: "#", icon: Boxes },
        ],
      },
    ],
  };

  return (
    <header className="border-b border-gray-800 bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
                <Terminal className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">DevPlatform</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-gray-300 transition-colors hover:text-white"
              >
                {link.name}
              </Link>
            ))}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("viewMore")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="flex items-center text-sm text-gray-300 transition-colors hover:text-white"
                aria-expanded={activeDropdown === "viewMore"}
              >
                View more
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === "viewMore" ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === "viewMore" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-[480px] rounded-lg border border-gray-800 bg-[#1A1A1A] shadow-xl"
                  >
                    <div className="grid grid-cols-3 gap-8 p-6">
                      {viewMoreLinks.sections.map((section, idx) => (
                        <div key={idx}>
                          <h3 className="mb-3 text-sm font-semibold text-gray-400">
                            {section.title}
                          </h3>
                          <ul className="space-y-2">
                            {section.items.map((item, itemIdx) => (
                              <li key={itemIdx}>
                                <Link
                                  href={item.href}
                                  className="flex items-center rounded-md p-1 text-sm text-gray-300 transition-colors hover:bg-[#272727] hover:text-white"
                                >
                                  <item.icon className="mr-2 h-4 w-4" />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              href="#"
              className="text-sm text-gray-300 transition-colors hover:text-white"
            >
              Login
            </Link>
            <Link
              href="#"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Get started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white"
              aria-expanded={isMobileMenuOpen}
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
            transition={{ duration: 0.2 }}
            className="bg-[#1A1A1A] md:hidden"
          >
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  {link.name}
                </Link>
              ))}

              {viewMoreLinks.sections.map((section) => (
                <div key={section.title} className="px-3 py-2">
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        className="flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-800 pb-3 pt-4">
              <div className="space-y-1 px-2">
                <Link
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  href="#"
                  className="block rounded-md bg-blue-600 px-3 py-2 text-base font-medium text-white hover:bg-blue-700"
                >
                  Get started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default DeveloperPlatformNavbar;
