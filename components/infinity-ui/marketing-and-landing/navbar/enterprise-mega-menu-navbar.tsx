"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Box,
  Code,
  Database,
  Globe,
  Monitor,
  Shield,
  BarChart,
  Server,
  Cpu,
  Network,
  Lock,
  RefreshCw,
} from "lucide-react";
import Image from "next/image";

const EnterpriseMegaMenuNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleMouseEnter = (menu: string) => {
    setActiveMegaMenu(menu);
  };

  const handleMouseLeave = () => {
    setActiveMegaMenu(null);
  };

  const megaMenus = {
    platform: {
      title: "Platform",
      sections: [
        {
          title: "Infrastructure",
          items: [
            {
              name: "Edge Network",
              description: "Global content delivery at the edge",
              icon: Globe,
              href: "#",
            },
            {
              name: "Compute",
              description: "Serverless functions and containers",
              icon: Server,
              href: "#",
            },
            {
              name: "Database",
              description: "Scalable database solutions",
              icon: Database,
              href: "#",
            },
          ],
        },
        {
          title: "Development",
          items: [
            {
              name: "CI/CD",
              description: "Automated deployment pipeline",
              icon: RefreshCw,
              href: "#",
            },
            {
              name: "Monitoring",
              description: "Real-time performance insights",
              icon: Monitor,
              href: "#",
            },
            {
              name: "Security",
              description: "Enterprise-grade protection",
              icon: Shield,
              href: "#",
            },
          ],
        },
      ],
      featured: {
        title: "New Release",
        description: "Introducing our latest enterprise features",
        image:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        cta: "Learn More",
        href: "#",
      },
    },
    solutions: {
      title: "Solutions",
      sections: [
        {
          title: "By Industry",
          items: [
            {
              name: "Financial Services",
              description: "Secure and compliant solutions",
              icon: Lock,
              href: "#",
            },
            {
              name: "Healthcare",
              description: "HIPAA-compliant infrastructure",
              icon: Shield,
              href: "#",
            },
            {
              name: "E-commerce",
              description: "Scale with customer demand",
              icon: Box,
              href: "#",
            },
          ],
        },
        {
          title: "By Use Case",
          items: [
            {
              name: "API Management",
              description: "Build and manage APIs",
              icon: Code,
              href: "#",
            },
            {
              name: "Analytics",
              description: "Data-driven insights",
              icon: BarChart,
              href: "#",
            },
            {
              name: "IoT",
              description: "Connect and manage devices",
              icon: Cpu,
              href: "#",
            },
          ],
        },
      ],
      featured: {
        title: "Customer Success",
        description: "See how enterprises achieve more",
        image:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        cta: "View Case Studies",
        href: "#",
      },
    },
  };

  const navLinks = [
    { name: "Platform", megaMenu: "platform" },
    { name: "Solutions", megaMenu: "solutions" },
    { name: "Pricing", href: "#" },
    { name: "Documentation", href: "#" },
  ];

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600">
                <Network className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                Enterprise
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
                  link.megaMenu && handleMouseEnter(link.megaMenu)
                }
                onMouseLeave={handleMouseLeave}
              >
                {link.megaMenu ? (
                  <button
                    className="flex items-center px-1 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
                    aria-expanded={activeMegaMenu === link.megaMenu}
                  >
                    {link.name}
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform ${
                        activeMegaMenu === link.megaMenu ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={link.href || "#"}
                    className="px-1 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
                  >
                    {link.name}
                  </Link>
                )}

                {/* Mega Menu */}
                {link.megaMenu &&
                  megaMenus[link.megaMenu as keyof typeof megaMenus] && (
                    <AnimatePresence>
                      {activeMegaMenu === link.megaMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 -ml-[400px] mt-0 w-screen max-w-7xl px-8"
                        >
                          <div className="overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="relative grid grid-cols-3 gap-x-8 gap-y-10 p-8">
                              {megaMenus[
                                link.megaMenu as keyof typeof megaMenus
                              ].sections.map((section, idx) => (
                                <div key={idx}>
                                  <h3 className="mb-4 text-sm font-semibold text-gray-900">
                                    {section.title}
                                  </h3>
                                  <ul className="space-y-6">
                                    {section.items.map((item, itemIdx) => (
                                      <li key={itemIdx}>
                                        <Link
                                          href={item.href}
                                          className="group"
                                        >
                                          <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                              <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
                                            </div>
                                            <div className="ml-4">
                                              <p className="text-sm font-medium text-gray-900 group-hover:text-indigo-600">
                                                {item.name}
                                              </p>
                                              <p className="mt-1 text-sm text-gray-500 group-hover:text-gray-600">
                                                {item.description}
                                              </p>
                                            </div>
                                          </div>
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}

                              {/* Featured Section */}
                              <div className="rounded-lg bg-gray-50 p-6">
                                <h3 className="mb-2 text-sm font-semibold text-gray-900">
                                  {
                                    megaMenus[
                                      link.megaMenu as keyof typeof megaMenus
                                    ].featured.title
                                  }
                                </h3>
                                <p className="mb-4 text-sm text-gray-500">
                                  {
                                    megaMenus[
                                      link.megaMenu as keyof typeof megaMenus
                                    ].featured.description
                                  }
                                </p>
                                <Image
                                  src={
                                    megaMenus[
                                      link.megaMenu as keyof typeof megaMenus
                                    ].featured.image || "/default-image.jpg"
                                  }
                                  alt="Featured"
                                  width={200}
                                  height={200}
                                  className="mb-4 w-[200px] rounded-md object-cover"
                                />
                                <Link
                                  href={
                                    megaMenus[
                                      link.megaMenu as keyof typeof megaMenus
                                    ].featured.href
                                  }
                                  className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  {
                                    megaMenus[
                                      link.megaMenu as keyof typeof megaMenus
                                    ].featured.cta
                                  }
                                  <svg
                                    className="ml-2 h-4 w-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </Link>
                              </div>
                            </div>
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
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Sign in
            </Link>
            <Link
              href="#"
              className="ml-8 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Start free trial
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
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
            className="md:hidden"
          >
            <div className="space-y-1 pb-3 pt-2">
              {Object.entries(megaMenus).map(([key, menu]) => (
                <div key={key} className="px-4 py-2">
                  <h3 className="mb-2 text-sm font-semibold text-gray-900">
                    {menu.title}
                  </h3>
                  {menu.sections.map((section) => (
                    <div key={section.title} className="mb-4">
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {section.title}
                      </h4>
                      <ul className="space-y-2">
                        {section.items.map((item, idx) => (
                          <li key={idx}>
                            <Link
                              href={item.href}
                              className="flex items-center rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            >
                              <item.icon className="mr-3 h-5 w-5 text-gray-400" />
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-xs text-gray-500">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="space-y-1 px-4">
                <Link
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                >
                  Sign in
                </Link>
                <Link
                  href="#"
                  className="block rounded-md bg-indigo-600 px-3 py-2 text-base font-medium text-white hover:bg-indigo-700"
                >
                  Start free trial
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default EnterpriseMegaMenuNavbar;
