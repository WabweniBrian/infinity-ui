"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Menu,
  X,
  ChevronDown,
  Package,
  Truck,
  Headphones,
  Gift,
  Tag,
  Smartphone,
  Laptop,
  Watch,
  Camera,
  Tv,
  Home,
  Shirt,
  ShoppingBag,
} from "lucide-react";
import useMediaQuery from "@/hooks/use-media-query";

const EcommerceMegaMenuNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(3);
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
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
    },
    scrolled: {
      backgroundColor: "rgba(255, 255, 255, 0.98)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    },
  };

  const megaMenuVariants = {
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

  const categoryItems = [
    {
      icon: <Smartphone className="h-5 w-5" />,
      name: "Smartphones",
      featured: ["iPhone", "Samsung", "Google Pixel"],
    },
    {
      icon: <Laptop className="h-5 w-5" />,
      name: "Laptops",
      featured: ["MacBook", "Dell XPS", "HP Spectre"],
    },
    {
      icon: <Watch className="h-5 w-5" />,
      name: "Wearables",
      featured: ["Apple Watch", "Fitbit", "Samsung Galaxy Watch"],
    },
    {
      icon: <Camera className="h-5 w-5" />,
      name: "Cameras",
      featured: ["DSLR", "Mirrorless", "Action Cameras"],
    },
    {
      icon: <Tv className="h-5 w-5" />,
      name: "TVs & Home Theater",
      featured: ["OLED TVs", "Soundbars", "Streaming Devices"],
    },
    {
      icon: <Home className="h-5 w-5" />,
      name: "Smart Home",
      featured: ["Smart Speakers", "Security", "Lighting"],
    },
    {
      icon: <Shirt className="h-5 w-5" />,
      name: "Fashion",
      featured: ["Men's", "Women's", "Kids"],
    },
    {
      icon: <ShoppingBag className="h-5 w-5" />,
      name: "Accessories",
      featured: ["Bags", "Headphones", "Chargers"],
    },
  ];

  return (
    <motion.nav
      className="fixed left-0 right-0 top-0 z-50 pb-3 transition-all duration-300"
      initial="initial"
      animate={isScrolled ? "scrolled" : "initial"}
      variants={navbarVariants}
    >
      {/* Top Bar */}
      <div className="bg-violet-900 py-1 text-center text-xs text-white md:text-sm">
        <div className="container mx-auto max-w-7xl px-4">
          <p className="text-white">
            Free shipping on orders over $50 | Use code{" "}
            <span className="font-bold">WELCOME15</span> for 15% off your first
            order
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between border-b py-2 pb-3 md:!border-none md:pb-2">
          {/* Logo */}
          <div className="flex items-center">
            <motion.div
              className="mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-r from-violet-600 to-fuchsia-500"
              whileHover={{ scale: 1.05 }}
            >
              <ShoppingBag className="h-6 w-6 text-white" />
            </motion.div>
            <span className="bg-gradient-to-r from-violet-700 to-fuchsia-600 bg-clip-text text-xl font-bold text-transparent">
              ShopVerse
            </span>
          </div>

          {/* Search Bar - Center */}
          {!isMobile && (
            <div className="mx-8 max-w-xl flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products, brands and more..."
                  className="w-full rounded-full border border-gray-200 py-2 pl-10 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
          )}

          {/* Right Side - Cart, Wishlist, Account */}
          <div className="flex items-center space-x-1 md:space-x-4">
            {!isMobile && (
              <>
                <button className="rounded-full p-2 transition-colors hover:bg-gray-100">
                  <Heart className="h-5 w-5 text-gray-600" />
                </button>
                <button className="relative rounded-full p-2 transition-colors hover:bg-gray-100">
                  <ShoppingCart className="h-5 w-5 text-gray-600" />
                  {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-xs text-white">
                      {cartCount}
                    </span>
                  )}
                </button>
                <button className="rounded-full p-2 transition-colors hover:bg-gray-100">
                  <User className="h-5 w-5 text-gray-600" />
                </button>
              </>
            )}

            {isMobile && (
              <>
                <button className="relative rounded-full p-2 transition-colors hover:bg-gray-100">
                  <ShoppingCart className="h-5 w-5 text-gray-600" />
                  {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-xs text-white">
                      {cartCount}
                    </span>
                  )}
                </button>
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
              </>
            )}
          </div>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="flex items-center space-x-8 border-t border-gray-100 py-1">
            <div className="group relative" ref={dropdownRef}>
              <button
                className="flex items-center py-2 text-gray-700 transition-colors hover:text-violet-600"
                onClick={() => toggleDropdown("categories")}
              >
                <span className="mr-1 font-medium">Shop by Category</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${activeDropdown === "categories" ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {activeDropdown === "categories" && (
                  <motion.div
                    className="absolute left-0 z-50 mt-1 w-[800px] rounded-lg bg-white p-6 shadow-xl"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={megaMenuVariants}
                  >
                    <div className="grid grid-cols-4 gap-6">
                      {categoryItems.map((category, index) => (
                        <div key={index} className="space-y-3">
                          <a
                            href="#"
                            className="flex items-center space-x-2 font-medium text-gray-800 transition-colors hover:text-violet-600"
                          >
                            <span className="text-violet-600">
                              {category.icon}
                            </span>
                            <span>{category.name}</span>
                          </a>
                          <ul className="space-y-2 pl-7">
                            {category.featured.map((item, idx) => (
                              <li key={idx}>
                                <a
                                  href="#"
                                  className="text-sm text-gray-600 transition-colors hover:text-violet-600"
                                >
                                  {item}
                                </a>
                              </li>
                            ))}
                            <li>
                              <a
                                href="#"
                                className="text-sm text-violet-600 hover:underline"
                              >
                                View all
                              </a>
                            </li>
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 grid grid-cols-4 gap-4 border-t border-gray-100 pt-6">
                      <a
                        href="#"
                        className="flex items-center space-x-2 text-sm font-medium text-gray-700 transition-colors hover:text-violet-600"
                      >
                        <Tag className="h-4 w-4 text-violet-600" />
                        <span>Today&apos;s Deals</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center space-x-2 text-sm font-medium text-gray-700 transition-colors hover:text-violet-600"
                      >
                        <Gift className="h-4 w-4 text-violet-600" />
                        <span>Gift Cards</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center space-x-2 text-sm font-medium text-gray-700 transition-colors hover:text-violet-600"
                      >
                        <Truck className="h-4 w-4 text-violet-600" />
                        <span>Free Shipping</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center space-x-2 text-sm font-medium text-gray-700 transition-colors hover:text-violet-600"
                      >
                        <Package className="h-4 w-4 text-violet-600" />
                        <span>New Arrivals</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="#"
              className="py-2 font-medium text-gray-700 transition-colors hover:text-violet-600"
            >
              New Arrivals
            </a>
            <a
              href="#"
              className="py-2 font-medium text-gray-700 transition-colors hover:text-violet-600"
            >
              Deals
            </a>
            <a
              href="#"
              className="py-2 font-medium text-gray-700 transition-colors hover:text-violet-600"
            >
              Trending
            </a>
            <a
              href="#"
              className="py-2 font-medium text-gray-700 transition-colors hover:text-violet-600"
            >
              Brands
            </a>

            <div className="group relative ml-auto" ref={dropdownRef}>
              <button
                className="flex items-center py-2 text-gray-700 transition-colors hover:text-violet-600"
                onClick={() => toggleDropdown("help")}
              >
                <span className="mr-1 font-medium">Help</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${activeDropdown === "help" ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {activeDropdown === "help" && (
                  <motion.div
                    className="absolute right-0 z-50 mt-1 w-64 rounded-lg bg-white p-4 shadow-xl"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={megaMenuVariants}
                  >
                    <div className="space-y-3">
                      <a
                        href="#"
                        className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                      >
                        <Truck className="mr-3 h-5 w-5 text-violet-600" />
                        <div>
                          <p className="font-medium text-gray-800">
                            Track Order
                          </p>
                          <p className="text-xs text-gray-500">
                            Check your order status
                          </p>
                        </div>
                      </a>
                      <a
                        href="#"
                        className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                      >
                        <Package className="mr-3 h-5 w-5 text-violet-600" />
                        <div>
                          <p className="font-medium text-gray-800">Returns</p>
                          <p className="text-xs text-gray-500">
                            Easy returns & exchanges
                          </p>
                        </div>
                      </a>
                      <a
                        href="#"
                        className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                      >
                        <Headphones className="mr-3 h-5 w-5 text-violet-600" />
                        <div>
                          <p className="font-medium text-gray-800">
                            Customer Support
                          </p>
                          <p className="text-xs text-gray-500">
                            Get help from our team
                          </p>
                        </div>
                      </a>
                      <a
                        href="#"
                        className="flex items-center rounded-md p-2 transition-colors hover:bg-gray-50"
                      >
                        <Gift className="mr-3 h-5 w-5 text-violet-600" />
                        <div>
                          <p className="font-medium text-gray-800">
                            Gift Cards
                          </p>
                          <p className="text-xs text-gray-500">
                            Perfect for any occasion
                          </p>
                        </div>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 top-20 z-40 mt-12 overflow-y-auto bg-white px-4 pb-4 pt-4 sm:mt-8"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="flex flex-col space-y-4">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 py-3">
                <a href="#" className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-gray-600" />
                  <span className="font-medium">Account</span>
                </a>
                <a href="#" className="flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-gray-600" />
                  <span className="font-medium">Wishlist</span>
                </a>
              </div>

              <div className="border-b border-gray-100 pb-4">
                <button
                  className="flex w-full items-center justify-between py-3 font-medium"
                  onClick={() => toggleDropdown("mobile-categories")}
                >
                  <span>Shop by Category</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${activeDropdown === "mobile-categories" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === "mobile-categories" && (
                    <motion.div
                      className="mt-2 space-y-3 pl-4"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={megaMenuVariants}
                    >
                      {categoryItems.map((category, index) => (
                        <div key={index} className="py-2">
                          <a
                            href="#"
                            className="flex items-center space-x-2 font-medium"
                          >
                            <span className="text-violet-600">
                              {category.icon}
                            </span>
                            <span>{category.name}</span>
                          </a>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="#"
                className="flex items-center border-b border-gray-100 py-3"
              >
                <Tag className="mr-2 h-5 w-5 text-violet-600" />
                <span className="font-medium">Today&apos;s Deals</span>
              </a>

              <a
                href="#"
                className="flex items-center border-b border-gray-100 py-3"
              >
                <Package className="mr-2 h-5 w-5 text-violet-600" />
                <span className="font-medium">New Arrivals</span>
              </a>

              <a
                href="#"
                className="flex items-center border-b border-gray-100 py-3"
              >
                <Truck className="mr-2 h-5 w-5 text-violet-600" />
                <span className="font-medium">Track Order</span>
              </a>

              <a
                href="#"
                className="flex items-center border-b border-gray-100 py-3"
              >
                <Headphones className="mr-2 h-5 w-5 text-violet-600" />
                <span className="font-medium">Customer Support</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default EcommerceMegaMenuNavbar;
