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
  ShoppingCart,
  User,
  Laptop,
  Smartphone,
  Watch,
  Headphones,
  Camera,
  Tv,
  CreditCard,
  HelpCircle,
  FileText,
  Users,
  Heart,
} from "lucide-react";
import Image from "next/image";

const MegaMenuNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isMobileSubmenuOpen, setIsMobileSubmenuOpen] = useState<string | null>(
    null,
  );
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMegaMenu = (menu: string) => {
    if (activeMegaMenu === menu) {
      setActiveMegaMenu(null);
    } else {
      setActiveMegaMenu(menu);
    }
  };

  const toggleMobileSubmenu = (menu: string) => {
    if (isMobileSubmenuOpen === menu) {
      setIsMobileSubmenuOpen(null);
    } else {
      setIsMobileSubmenuOpen(menu);
    }
  };

  const handleMouseEnter = (menu: string) => {
    setActiveMegaMenu(menu);
  };

  const handleMouseLeave = () => {
    setActiveMegaMenu(null);
  };

  const megaMenus = {
    products: {
      title: "Products",
      columns: [
        {
          title: "Categories",
          items: [
            {
              name: "Laptops",
              icon: <Laptop className="h-5 w-5" />,
              href: "#",
            },
            {
              name: "Smartphones",
              icon: <Smartphone className="h-5 w-5" />,
              href: "#",
            },
            { name: "Watches", icon: <Watch className="h-5 w-5" />, href: "#" },
            {
              name: "Headphones",
              icon: <Headphones className="h-5 w-5" />,
              href: "#",
            },
            {
              name: "Cameras",
              icon: <Camera className="h-5 w-5" />,
              href: "#",
            },
            { name: "TVs", icon: <Tv className="h-5 w-5" />, href: "#" },
          ],
        },
        {
          title: "Collections",
          items: [
            { name: "New Arrivals", href: "#" },
            { name: "Best Sellers", href: "#" },
            { name: "Special Offers", href: "#" },
            { name: "Coming Soon", href: "#" },
          ],
        },
        {
          title: "Featured",
          items: [
            { name: "Summer Collection", href: "#" },
            { name: "Premium Series", href: "#" },
            { name: "Limited Edition", href: "#" },
          ],
        },
      ],
      featured: {
        title: "New Release",
        description: "Check out our latest product with advanced features",
        image:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        cta: "Learn More",
        href: "#",
      },
    },
    support: {
      title: "Support",
      columns: [
        {
          title: "Help Center",
          items: [
            {
              name: "FAQs",
              icon: <HelpCircle className="h-5 w-5" />,
              href: "#",
            },
            {
              name: "Contact Us",
              icon: <Users className="h-5 w-5" />,
              href: "#",
            },
            {
              name: "Documentation",
              icon: <FileText className="h-5 w-5" />,
              href: "#",
            },
          ],
        },
        {
          title: "Customer Service",
          items: [
            { name: "Returns & Refunds", href: "#" },
            { name: "Shipping Information", href: "#" },
            { name: "Order Status", href: "#" },
          ],
        },
        {
          title: "Resources",
          items: [
            { name: "Product Manuals", href: "#" },
            { name: "Tutorials", href: "#" },
            { name: "Community Forums", href: "#" },
          ],
        },
      ],
      featured: {
        title: "Need Help?",
        description: "Our support team is available 24/7 to assist you",
        image:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        cta: "Contact Support",
        href: "#",
      },
    },
  };

  const navLinks = [
    { name: "Products", megaMenu: "products" },
    { name: "Support", megaMenu: "support" },
    { name: "Pricing", href: "#" },
    { name: "About", href: "#" },
  ];

  return (
    <div className="bg-white">
      <header className="relative bg-white shadow-sm">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-gray-900">
                  Infinity
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
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 -ml-[400px] mt-0 w-screen max-w-7xl px-8"
                          >
                            <div className="overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                              <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-4">
                                {megaMenus[
                                  activeMegaMenu as keyof typeof megaMenus
                                ].columns.map((column, idx) => (
                                  <div key={idx}>
                                    <h3 className="mb-4 text-sm font-semibold text-gray-900">
                                      {column.title}
                                    </h3>
                                    <ul className="space-y-3">
                                      {column.items.map((item, itemIdx) => (
                                        <li key={itemIdx}>
                                          <Link
                                            href={item.href}
                                            className="flex items-center text-gray-600 hover:text-gray-900"
                                          >
                                            {"icon" in item && (
                                              <span className="mr-2 text-gray-500">
                                                {item.icon}
                                              </span>
                                            )}
                                            <span>{item.name}</span>
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}

                                {/* Featured section */}
                                <div className="md:col-span-1">
                                  <div className="rounded-lg bg-gray-50 p-6">
                                    <h3 className="mb-2 text-sm font-semibold text-gray-900">
                                      {
                                        megaMenus[
                                          activeMegaMenu as keyof typeof megaMenus
                                        ].featured.title
                                      }
                                    </h3>
                                    <p className="mb-4 text-sm text-gray-600">
                                      {
                                        megaMenus[
                                          activeMegaMenu as keyof typeof megaMenus
                                        ].featured.description
                                      }
                                    </p>
                                    <Image
                                      src={
                                        megaMenus[
                                          activeMegaMenu as keyof typeof megaMenus
                                        ].featured.image ||
                                        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                                      }
                                      alt="Featured"
                                      width={200}
                                      height={200}
                                      className="mb-4 w-[200px] rounded-md object-cover"
                                    />
                                    <Link
                                      href={
                                        megaMenus[
                                          activeMegaMenu as keyof typeof megaMenus
                                        ].featured.href
                                      }
                                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                                    >
                                      {
                                        megaMenus[
                                          activeMegaMenu as keyof typeof megaMenus
                                        ].featured.cta
                                      }
                                      <svg
                                        className="ml-1 h-4 w-4"
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

                              <div className="border-t border-gray-200 bg-gray-50 py-4">
                                <div className="container mx-auto flex flex-wrap items-center justify-between px-4 sm:px-6 lg:px-8">
                                  <div className="flex items-center space-x-6">
                                    <Link
                                      href="#"
                                      className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                                    >
                                      <Heart className="mr-1 h-4 w-4" />
                                      <span>Wishlist</span>
                                    </Link>
                                    <Link
                                      href="#"
                                      className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                                    >
                                      <CreditCard className="mr-1 h-4 w-4" />
                                      <span>Payment Options</span>
                                    </Link>
                                  </div>
                                  <button
                                    onClick={() => setActiveMegaMenu(null)}
                                    className="mt-2 text-sm text-gray-600 hover:text-gray-900 sm:mt-0"
                                  >
                                    Close Menu
                                  </button>
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
              <button
                className="rounded-full p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              <button
                className="rounded-full p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5" />
              </button>
              <button
                className="rounded-full p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </button>
              <button className="ml-4 rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800">
                Sign In
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
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
                    {link.megaMenu ? (
                      <div>
                        <button
                          onClick={() => toggleMobileSubmenu(link.megaMenu)}
                          className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        >
                          {link.name}
                          <ChevronDown
                            className={`ml-1 h-4 w-4 transition-transform ${
                              isMobileSubmenuOpen === link.megaMenu
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {isMobileSubmenuOpen === link.megaMenu && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="space-y-2 py-2 pl-4 pr-2"
                            >
                              {megaMenus[
                                link.megaMenu as keyof typeof megaMenus
                              ].columns.map((column) => (
                                <div key={column.title} className="mb-4">
                                  <h4 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    {column.title}
                                  </h4>
                                  <div className="space-y-1">
                                    {column.items.map((item, idx) => (
                                      <Link
                                        key={idx}
                                        href={item.href}
                                        className="flex items-center rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                      >
                                        {"icon" in item && (
                                          <span className="mr-2 text-gray-500">
                                            {item.icon}
                                          </span>
                                        )}
                                        {item.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}

                              <div className="mt-2 rounded-md bg-gray-50 px-3 py-2">
                                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                  Featured
                                </h4>
                                <div className="mb-2 text-sm text-gray-700">
                                  {
                                    megaMenus[
                                      link.megaMenu as keyof typeof megaMenus
                                    ].featured.title
                                  }
                                </div>
                                <Link
                                  href={
                                    megaMenus[
                                      link.megaMenu as keyof typeof megaMenus
                                    ].featured.href
                                  }
                                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                                >
                                  {
                                    megaMenus[
                                      link.megaMenu as keyof typeof megaMenus
                                    ].featured.cta
                                  }
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={link.href || "#"}
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
    </div>
  );
};

export default MegaMenuNavbar;
